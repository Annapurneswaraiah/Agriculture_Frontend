import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface AgriDroneCanvasProps {
  isPaused?: boolean;
  reduceMotion?: boolean;
  onDroneScanUpdate?: (telemetry: {
    altitudeMeters: number;
    speedKmh: number;
    sensorCount: number;
    cropHealth: number;
    soilMoisture: number;
    heading: number;
  }) => void;
}

export const AgriDroneCanvas: React.FC<AgriDroneCanvasProps> = ({
  isPaused = false,
  reduceMotion = false,
  onDroneScanUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isSceneReady, setIsSceneReady] = useState(false);

  // Flight path definition: Loop through key waypoints
  // Sequence:
  // 1. Enter from upper-right
  // 2. Fly diagonally toward center
  // 3. Scan central crop plots
  // 4. Bank toward left
  // 5. Sweep along perimeter back to upper-right loop
  const waypoints = useRef([
    new THREE.Vector3(18, 7.5, -6),     // Upper right entry
    new THREE.Vector3(9, 5.2, -1),      // Descent diagonal
    new THREE.Vector3(0, 3.4, 3),       // Center field scan zone
    new THREE.Vector3(-8, 3.8, 1),      // Low crop pass
    new THREE.Vector3(-16, 5.5, -5),    // Far left turn
    new THREE.Vector3(-10, 7.2, -14),   // Rear boundary turn
    new THREE.Vector3(6, 8.0, -16),     // High perimeter return
    new THREE.Vector3(16, 7.8, -10),    // Pre-entry alignment
  ]);

  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null);

  useEffect(() => {
    // Build smooth closed spline curve
    curveRef.current = new THREE.CatmullRomCurve3(waypoints.current, true, 'catmullrom', 0.4);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Detect WebGL capability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.024);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 120);
    camera.position.set(0, 7.5, 18);
    camera.lookAt(0, 1.5, 0);

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: window.devicePixelRatio < 2,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
    } catch (e) {
      console.warn('WebGL init error, falling back:', e);
      setWebglSupported(false);
      return;
    }

    // Context loss safeguards
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
    };
    const handleContextRestored = () => {
      console.info('WebGL context restored');
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 3. Lighting System (Three-Point Studio + Sunrise Directional)
    const ambientLight = new THREE.AmbientLight(0x064e3b, 1.2);
    scene.add(ambientLight);

    // Sunrise golden directional light from distant horizon
    const sunriseLight = new THREE.DirectionalLight(0xffb042, 2.4);
    sunriseLight.position.set(25, 12, -25);
    scene.add(sunriseLight);

    // Subtle cool cyan fill light
    const fillLight = new THREE.DirectionalLight(0x06b6d4, 0.9);
    fillLight.position.set(-15, 8, 10);
    scene.add(fillLight);

    // Green laser/field bounce light
    const laserBounce = new THREE.PointLight(0x00ff88, 1.5, 15);
    laserBounce.position.set(0, 1, 0);
    scene.add(laserBounce);

    // 4. Digital Farm Landscape & Crop Fields
    // Ground terrain with subtle undulating contour
    const groundGeo = new THREE.PlaneGeometry(80, 80, 48, 48);
    groundGeo.rotateX(-Math.PI / 2);

    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      // Gentle slope and terraced crop bed elevation
      const elevation =
        Math.sin(x * 0.12) * 0.35 +
        Math.cos(z * 0.08) * 0.45 +
        Math.sin(x * 0.3 + z * 0.2) * 0.15;
      posAttr.setY(i, elevation - 1.2);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x071510,
      roughness: 0.85,
      metalness: 0.15,
      wireframe: false,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    // Digital Grid Lines (Precision Farm Plots)
    const gridHelper = new THREE.GridHelper(70, 35, 0x00ff88, 0x064e3b);
    gridHelper.position.y = -1.15;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Fine Crop Furrow Rows (Green luminous crop lines)
    const furrowGroup = new THREE.Group();
    const rowMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.2,
    });

    for (let r = -24; r <= 24; r += 2) {
      const points = [];
      points.push(new THREE.Vector3(-30, -1.12, r));
      points.push(new THREE.Vector3(30, -1.12, r));
      const furrowGeo = new THREE.BufferGeometry().setFromPoints(points);
      const furrowLine = new THREE.Line(furrowGeo, rowMaterial);
      furrowGroup.add(furrowLine);
    }
    scene.add(furrowGroup);

    // 5. IoT Sensor Nodes with Pulsing Beacons & Thin Data Lines
    const sensorCount = 18;
    const sensorGroup = new THREE.Group();
    const sensorPositions: THREE.Vector3[] = [];
    const sensorGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.6, 8);
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const beaconLightMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
    });

    // Random but deterministic layout across central plots
    const seededCoords = [
      [-12, -4], [-8, 2], [-4, -6], [-2, 4], [2, -2], [5, 6],
      [9, -3], [12, 3], [-10, -10], [-5, 8], [0, -8], [7, -12],
      [14, -8], [-14, 6], [11, 8], [-1, 10], [6, 1], [-7, -2],
    ];

    seededCoords.forEach(([sx, sz]) => {
      const sPos = new THREE.Vector3(sx, -0.85, sz);
      sensorPositions.push(sPos);

      const sensorBase = new THREE.Mesh(sensorGeo, sensorMat);
      sensorBase.position.copy(sPos);

      // Glowing tip
      const tipGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const tipMesh = new THREE.Mesh(tipGeo, beaconLightMat);
      tipMesh.position.set(0, 0.35, 0);
      sensorBase.add(tipMesh);

      sensorGroup.add(sensorBase);
    });
    scene.add(sensorGroup);

    // Thin glowing IoT connection network lines
    const networkLineMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.12,
    });
    const networkPoints: THREE.Vector3[] = [];
    for (let i = 0; i < sensorPositions.length; i++) {
      for (let j = i + 1; j < sensorPositions.length; j++) {
        const dist = sensorPositions[i].distanceTo(sensorPositions[j]);
        if (dist < 8.5) {
          networkPoints.push(sensorPositions[i]);
          networkPoints.push(sensorPositions[j]);
        }
      }
    }
    const networkGeo = new THREE.BufferGeometry().setFromPoints(networkPoints);
    const networkLines = new THREE.LineSegments(networkGeo, networkLineMat);
    scene.add(networkLines);

    // 6. Atmospheric Dust & Golden Sunrise Particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 55;
      particleCoords[i + 1] = Math.random() * 14 - 1;
      particleCoords[i + 2] = (Math.random() - 0.5) * 55;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x86efac,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Realistic Agricultural Drone Construction (Three.js Geometry)
    const droneGroup = new THREE.Group();

    // Central Fuselage (Sleek carbon-fiber aerodynamic pod)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.25,
    });
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x022c22,
      metalness: 0.5,
      roughness: 0.15,
      emissive: 0x00ff88,
      emissiveIntensity: 0.15,
    });

    const bodyGeo = new THREE.CylinderGeometry(0.45, 0.6, 0.3, 8);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    droneGroup.add(bodyMesh);

    // Top Aerodynamic Dome
    const domeGeo = new THREE.SphereGeometry(0.42, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const domeMesh = new THREE.Mesh(domeGeo, canopyMat);
    domeMesh.position.y = 0.15;
    droneGroup.add(domeMesh);

    // 4 Symmetrical Carbon-Fiber Rotor Arms
    const armMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const motorMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.1,
    });

    const armOffsets = [
      { x: 1.1, z: 1.1, rotY: Math.PI / 4, color: 0x00ff88 },       // Front Right (Starboard)
      { x: -1.1, z: 1.1, rotY: -Math.PI / 4, color: 0xef4444 },     // Front Left (Port)
      { x: 1.1, z: -1.1, rotY: (3 * Math.PI) / 4, color: 0x00ff88 },// Rear Right
      { x: -1.1, z: -1.1, rotY: -(3 * Math.PI) / 4, color: 0xef4444 }, // Rear Left
    ];

    const propellers: THREE.Group[] = [];
    const propBlurDiscs: THREE.Mesh[] = [];

    armOffsets.forEach((arm) => {
      // Carbon arm tube
      const armLength = 1.4;
      const armGeo = new THREE.CylinderGeometry(0.045, 0.05, armLength, 8);
      armGeo.rotateZ(Math.PI / 2);
      const armMesh = new THREE.Mesh(armGeo, armMat);
      armMesh.position.set(arm.x * 0.45, 0, arm.z * 0.45);
      armMesh.rotation.y = arm.rotY;
      droneGroup.add(armMesh);

      // Motor Pod Bell
      const motorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.16, 12);
      const motorMesh = new THREE.Mesh(motorGeo, motorMat);
      motorMesh.position.set(arm.x, 0.08, arm.z);
      droneGroup.add(motorMesh);

      // Navigation LED indicator under each arm
      const ledGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const ledMat = new THREE.MeshBasicMaterial({ color: arm.color });
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(arm.x, -0.05, arm.z);
      droneGroup.add(ledMesh);

      // Dual-Blade Propeller
      const propGroup = new THREE.Group();
      propGroup.position.set(arm.x, 0.18, arm.z);

      const bladeGeo = new THREE.BoxGeometry(0.95, 0.015, 0.08);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.6,
        roughness: 0.4,
      });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      propGroup.add(blade);

      // Propeller Motion Blur Disc (Realistic high-speed rotation effect)
      const blurGeo = new THREE.CircleGeometry(0.5, 16);
      blurGeo.rotateX(-Math.PI / 2);
      const blurMat = new THREE.MeshBasicMaterial({
        color: 0xa7f3d0,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      });
      const blurDisc = new THREE.Mesh(blurGeo, blurMat);
      blurDisc.position.y = 0.01;
      propGroup.add(blurDisc);

      droneGroup.add(propGroup);
      propellers.push(propGroup);
      propBlurDiscs.push(blurDisc);
    });

    // Landing Skid Struts
    const skidMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.3,
    });
    const skidGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 8);
    skidGeo.rotateX(Math.PI / 2);

    const leftSkid = new THREE.Mesh(skidGeo, skidMat);
    leftSkid.position.set(-0.7, -0.4, 0);
    droneGroup.add(leftSkid);

    const rightSkid = new THREE.Mesh(skidGeo, skidMat);
    rightSkid.position.set(0.7, -0.4, 0);
    droneGroup.add(rightSkid);

    // Vertical Skid Struts
    [-0.5, 0.5].forEach((zPos) => {
      const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.38, 8);
      const leftLeg = new THREE.Mesh(legGeo, skidMat);
      leftLeg.position.set(-0.55, -0.2, zPos);
      leftLeg.rotation.z = 0.25;
      droneGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, skidMat);
      rightLeg.position.set(0.55, -0.2, zPos);
      rightLeg.rotation.z = -0.25;
      droneGroup.add(rightLeg);
    });

    // High-Resolution Multispectral Gimbal Camera & Laser Unit Underbelly
    const gimbalGroup = new THREE.Group();
    gimbalGroup.position.set(0, -0.22, 0.15);

    const gimbalMountGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 8);
    const gimbalMount = new THREE.Mesh(gimbalMountGeo, motorMat);
    gimbalGroup.add(gimbalMount);

    const cameraGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const cameraMesh = new THREE.Mesh(cameraGeo, bodyMat);
    cameraMesh.position.set(0, -0.1, 0);

    // Optical Lens Element with Emerald Glass Antireflective Coating
    const lensGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x00ff88,
      emissiveIntensity: 0.3,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.position.set(0, 0, 0.1);
    cameraMesh.add(lensMesh);
    gimbalGroup.add(cameraMesh);

    droneGroup.add(gimbalGroup);

    // Navigation Strobe Beacon (Flashing white)
    const strobeGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const strobeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const strobeMesh = new THREE.Mesh(strobeGeo, strobeMat);
    strobeMesh.position.set(0, 0.28, -0.3);
    droneGroup.add(strobeMesh);

    // Initial position of drone (upper right corner entry)
    droneGroup.position.copy(waypoints.current[0]);
    droneGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(droneGroup);

    // 8. Dynamic Soft Shadow on Ground
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x021109,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.y = -1.14;
    scene.add(shadowMesh);

    // 9. Soft Green Laser Scanning Beam (Conical Projection + Ground Scan Rings)
    // Laser Volume Cone
    const coneHeight = 5.5;
    const coneGeo = new THREE.ConeGeometry(2.2, coneHeight, 24, 1, true);
    coneGeo.translate(0, -coneHeight / 2, 0);

    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const scanCone = new THREE.Mesh(coneGeo, coneMat);
    scene.add(scanCone);

    // Ground Laser Scan Rings (Wave pulses expanding across the crop field)
    const scanRingGroup = new THREE.Group();
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const rings: { mesh: THREE.Mesh; scale: number; baseOpacity: number }[] = [];
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.RingGeometry(0.3, 0.45, 32);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat.clone());
      ringMesh.position.y = -1.13;
      scanRingGroup.add(ringMesh);
      rings.push({
        mesh: ringMesh,
        scale: 1 + r * 1.2,
        baseOpacity: 0.7 - r * 0.2,
      });
    }
    scene.add(scanRingGroup);

    // Central crosshair on ground scan point
    const crossGeo = new THREE.RingGeometry(0.08, 0.16, 16);
    crossGeo.rotateX(-Math.PI / 2);
    const crossMat = new THREE.MeshBasicMaterial({
      color: 0x42f58d,
      transparent: true,
      opacity: 0.8,
    });
    const crosshair = new THREE.Mesh(crossGeo, crossMat);
    crosshair.position.y = -1.13;
    scene.add(crosshair);

    setIsSceneReady(true);

    // 10. Mouse Cursor Parallax Tracking (Gentle & Smooth)
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTargetX = Math.max(-1, Math.min(1, x));
      mouseTargetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener('mousemove', onMouseMove);

    // 11. Animation Loop State
    // Loop duration: 26 seconds for a cinematic, graceful, smooth flight
    const loopDuration = 26;
    let clock = new THREE.Clock();
    let animationFrameId: number;
    let strobeTimer = 0;
    let lastTelemetryUpdate = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Lerping (Subtle camera tracking)
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.04;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.04;

      if (!reduceMotion) {
        camera.position.x = mouseCurrentX * 1.4;
        camera.position.y = 7.5 + mouseCurrentY * 0.8;
        camera.lookAt(mouseCurrentX * 0.8, 1.5, 0);
      }

      // Propeller Continuous High-Speed Rotation (40 rad/s)
      const propSpeed = isPaused ? 0 : 38;
      propellers.forEach((prop, idx) => {
        const direction = idx % 2 === 0 ? 1 : -1;
        prop.rotation.y += propSpeed * delta * direction;
      });

      // Drone Flight Path Progression
      if (!isPaused && curveRef.current) {
        // Continuous normalized 0..1 progression along closed spline
        const loopT = (elapsedTime % loopDuration) / loopDuration;
        const currentPos = curveRef.current.getPointAt(loopT);
        const lookAheadPos = curveRef.current.getPointAt((loopT + 0.015) % 1);

        droneGroup.position.copy(currentPos);

        // Calculate velocity heading tangent
        const tangent = lookAheadPos.clone().sub(currentPos).normalize();

        // Natural banking and pitch during curved flight
        const targetRotY = Math.atan2(-tangent.z, tangent.x) + Math.PI / 2;
        droneGroup.rotation.y += (targetRotY - droneGroup.rotation.y) * 0.06;

        // Roll (bank) into turns
        const curvature = tangent.x * 0.25;
        droneGroup.rotation.z += (curvature - droneGroup.rotation.z) * 0.08;

        // Slight forward pitch during cruise
        droneGroup.rotation.x = Math.sin(elapsedTime * 2) * 0.04 + 0.08;

        // Ground shadow tracking
        shadowMesh.position.x = currentPos.x;
        shadowMesh.position.z = currentPos.z;
        const altitude = currentPos.y - (-1.14);
        const shadowScale = Math.max(0.6, 1.8 - altitude * 0.12);
        shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
        shadowMat.opacity = Math.max(0.2, 0.65 - altitude * 0.05);

        // Laser scan cone tracking
        scanCone.position.set(currentPos.x, currentPos.y - 0.2, currentPos.z);
        const groundHitY = -1.14;
        const beamHeight = currentPos.y - groundHitY;
        scanCone.scale.set(1, beamHeight / coneHeight, 1);

        // Scan wave rings on ground
        scanRingGroup.position.set(currentPos.x, -1.13, currentPos.z);
        crosshair.position.set(currentPos.x, -1.13, currentPos.z);

        rings.forEach((ring, idx) => {
          ring.scale += delta * 1.4;
          if (ring.scale > 3.8) {
            ring.scale = 0.4;
          }
          const lifeProgress = (ring.scale - 0.4) / 3.4;
          (ring.mesh.material as THREE.MeshBasicMaterial).opacity =
            ring.baseOpacity * (1 - lifeProgress);
          ring.mesh.scale.set(ring.scale, ring.scale, ring.scale);
        });

        // Pulsing laser bounce light
        laserBounce.position.set(currentPos.x, currentPos.y * 0.5, currentPos.z);
        laserBounce.intensity = 1.2 + Math.sin(elapsedTime * 6) * 0.5;

        // Floating particles subtle breeze drift
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let p = 1; p < positions.length; p += 3) {
          positions[p] += Math.sin(elapsedTime + p) * 0.002;
        }
        particleGeo.attributes.position.needsUpdate = true;

        // Strobe flash timer
        strobeTimer += delta;
        if (strobeTimer > 1.2) {
          strobeMat.color.setHex(0xffffff);
          if (strobeTimer > 1.28) strobeTimer = 0;
        } else {
          strobeMat.color.setHex(0x222222);
        }

        // Emit live telemetry to parent callback (throttled every 150ms)
        if (onDroneScanUpdate && elapsedTime - lastTelemetryUpdate > 0.15) {
          lastTelemetryUpdate = elapsedTime;
          const altM = Math.round(altitude * 12.5 * 10) / 10;
          const speedK = Math.round((38 + Math.sin(loopT * Math.PI * 2) * 6) * 10) / 10;
          const healthVal = Math.round((87.4 + Math.sin(loopT * 8) * 1.8) * 10) / 10;
          const moistVal = Math.round(64 + Math.cos(loopT * 6) * 3);
          const headingDeg = Math.round((((targetRotY * 180) / Math.PI + 360) % 360));

          onDroneScanUpdate({
            altitudeMeters: altM,
            speedKmh: speedK,
            sensorCount: 128,
            cropHealth: healthVal,
            soilMoisture: moistVal,
            heading: headingDeg,
          });
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 12. Responsive Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 700;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup resources upon unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      cancelAnimationFrame(animationFrameId);

      // Dispose geometries and materials
      groundGeo.dispose();
      groundMat.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      canopyMat.dispose();
      domeGeo.dispose();
      coneGeo.dispose();
      coneMat.dispose();
      renderer.dispose();
    };
  }, [isPaused, reduceMotion, onDroneScanUpdate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[580px] lg:min-h-[720px] overflow-hidden select-none"
    >
      {/* Three.js Canvas */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none block z-0"
        />
      ) : (
        /* Static 2D / Fallback Container for unsupported devices */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-[#0a140f] via-[#030712] to-[#022c22] p-8 text-center">
          <div className="max-w-md p-6 glass-panel rounded-2xl border border-[#00FF88]/20">
            <div className="w-12 h-12 rounded-full bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-white font-bold text-base mb-1 font-display">AgriAI Drone Scan Active</h4>
            <p className="text-xs text-[#94A3B8]">
              Operating in lightweight telemetry mode. High-resolution multispectral scan data streaming live.
            </p>
          </div>
        </div>
      )}

      {/* Atmospheric Horizon Gradient (Smooth Sunrise Blend Behind Drone) */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 75% 20%, rgba(255, 176, 66, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 30% 30%, rgba(0, 255, 136, 0.08) 0%, transparent 70%),
            linear-gradient(180deg, rgba(3, 7, 18, 0.2) 0%, rgba(3, 7, 18, 0.75) 70%, #030712 100%)
          `,
        }}
      />
    </div>
  );
};

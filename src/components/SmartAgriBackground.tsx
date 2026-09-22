import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Eye, EyeOff, Sparkles, Sliders } from 'lucide-react';

export type BgMotionMode = 'dynamic' | 'subtle' | 'static';

interface SensorNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  type: 'sensor' | 'weather' | 'probe' | 'moisture';
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface RainParticle {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

interface SporeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  wobbleSpeed: number;
  wobblePhase: number;
}

export const SmartAgriBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preference for motion mode (dynamic = full, subtle = slower/fewer particles, static = frozen/fallback)
  const [motionMode, setMotionMode] = useState<BgMotionMode>(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return 'static';
      const saved = localStorage.getItem('agri_bg_mode') as BgMotionMode;
      if (saved === 'dynamic' || saved === 'subtle' || saved === 'static') return saved;
    }
    return 'dynamic';
  });

  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Synchronize preference to localStorage
  const handleModeChange = (mode: BgMotionMode) => {
    setMotionMode(mode);
    try {
      localStorage.setItem('agri_bg_mode', mode);
    } catch {
      // Ignore in strict private mode
    }
  };

  // Mouse tracking with lerp smoothing for gentle natural parallax
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isHovering: false,
  });

  // Listen for reduced motion system changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMotionMode('static');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Main Canvas Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let time = 0;

    // Simulation entities
    let nodes: SensorNode[] = [];
    let packets: DataPacket[] = [];
    let rain: RainParticle[] = [];
    let spores: SporeParticle[] = [];

    // Screen-adaptive entity configuration
    const initEntities = (w: number, h: number) => {
      width = w;
      height = h;
      const isNarrow = w < 768;
      const particleScale = motionMode === 'subtle' ? 0.6 : 1;

      // 1. Sensor network nodes
      const nodeCount = Math.floor((isNarrow ? 16 : 38) * particleScale);
      nodes = [];
      const types: Array<SensorNode['type']> = ['sensor', 'weather', 'probe', 'moisture'];
      const colors = [
        'rgba(0, 255, 136, 0.75)',  // Emerald
        'rgba(16, 185, 129, 0.65)', // Bright Mint
        'rgba(52, 211, 153, 0.60)', // Leaf Green
        'rgba(56, 189, 248, 0.55)', // Navy Sky / Cyan
      ];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (motionMode === 'subtle' ? 0.15 : 0.35),
          vy: (Math.random() - 0.5) * (motionMode === 'subtle' ? 0.15 : 0.35),
          baseRadius: Math.random() * 1.8 + 1.2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          color: colors[i % colors.length],
          type: types[i % types.length],
        });
      }

      // 2. Active data packets
      packets = [];
      const maxPackets = isNarrow ? 4 : 10;
      for (let i = 0; i < maxPackets; i++) {
        const from = Math.floor(Math.random() * nodes.length);
        let to = Math.floor(Math.random() * nodes.length);
        if (to === from) to = (from + 1) % nodes.length;
        packets.push({
          fromNode: from,
          toNode: to,
          progress: Math.random(),
          speed: Math.random() * 0.008 + 0.004,
          color: 'rgba(0, 255, 136, 0.9)',
        });
      }

      // 3. Gentle rainfall moisture particles
      const rainCount = Math.floor((isNarrow ? 22 : 55) * particleScale);
      rain = [];
      for (let i = 0; i < rainCount; i++) {
        rain.push({
          x: Math.random() * (w + 200) - 100,
          y: Math.random() * h,
          length: Math.random() * 14 + 8,
          speed: Math.random() * 2.2 + 1.2,
          opacity: Math.random() * 0.08 + 0.03,
        });
      }

      // 4. Floating transpiration & soil spores
      const sporeCount = Math.floor((isNarrow ? 18 : 45) * particleScale);
      spores = [];
      for (let i = 0; i < sporeCount; i++) {
        spores.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -(Math.random() * 0.35 + 0.1), // Gentle natural upward transpiration drift
          radius: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.18 + 0.08,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobblePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Resize handler with devicePixelRatio clamping for crisp, performant rendering
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initEntities(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse & Touch Tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = width / 2;
      mouseRef.current.targetY = height / 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.isHovering = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Page Visibility API to save battery/power when user switches tabs
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && motionMode !== 'static') {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial mouse center position
    mouseRef.current.targetX = window.innerWidth / 2;
    mouseRef.current.targetY = window.innerHeight / 2;
    mouseRef.current.currentX = window.innerWidth / 2;
    mouseRef.current.currentY = window.innerHeight / 2;

    /**
     * Draw abstract botanical leaf vein motifs (subtle blueprint outlines)
     */
    const drawLeafMotif = (
      centerX: number,
      centerY: number,
      scale: number,
      angle: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
      ctx.lineWidth = 1.2;

      // Central stem / midrib curve
      ctx.beginPath();
      ctx.moveTo(0, 70);
      ctx.quadraticCurveTo(-15, 10, 0, -80);
      ctx.stroke();

      // Delicate lateral leaf veins
      const veinCount = 6;
      for (let i = 0; i < veinCount; i++) {
        const yPos = 50 - i * 22;
        const widthSpread = Math.sin((i / veinCount) * Math.PI) * 48 + 12;

        // Right vein
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.quadraticCurveTo(widthSpread * 0.5, yPos - 12, widthSpread, yPos - 8);
        ctx.stroke();

        // Left vein
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.quadraticCurveTo(-widthSpread * 0.5, yPos - 12, -widthSpread, yPos - 8);
        ctx.stroke();
      }

      // Leaf contour envelope
      ctx.strokeStyle = `rgba(5, 150, 105, ${alpha * 0.7})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 70);
      ctx.bezierCurveTo(45, 30, 40, -40, 0, -80);
      ctx.bezierCurveTo(-40, -40, -45, 30, 0, 70);
      ctx.stroke();

      ctx.restore();
    };

    /**
     * Draw undulating crop field furrow waves (terrace farming & agricultural topography)
     */
    const drawFieldContourWaves = (parallaxX: number, parallaxY: number) => {
      const waveCount = 4;
      const baseHeight = height * 0.65;
      const colors = [
        'rgba(6, 78, 59, 0.05)',   // Deep forest green
        'rgba(4, 120, 87, 0.07)',  // Emerald midground
        'rgba(16, 185, 129, 0.06)', // Fresh vegetative green
        'rgba(15, 23, 42, 0.08)',  // Deep navy soil horizon
      ];

      for (let w = 0; w < waveCount; w++) {
        const layerOffset = w * 45;
        const waveY = baseHeight + layerOffset + parallaxY * (0.015 * (w + 1));
        const speed = (w + 1) * 0.0006;
        const wavelength = 260 + w * 70;
        const amplitude = 14 + w * 6;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, waveY);

        for (let x = 0; x <= width + 20; x += 25) {
          const harmonic1 = Math.sin((x / wavelength) + (time * speed) + w) * amplitude;
          const harmonic2 = Math.cos((x / (wavelength * 1.7)) - (time * speed * 0.8)) * (amplitude * 0.4);
          const y = waveY + harmonic1 + harmonic2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Wave furrow contour stroke
        ctx.strokeStyle = colors[w % colors.length];
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Subtle gradient fill for topographical depth
        const grad = ctx.createLinearGradient(0, waveY - 20, 0, height);
        grad.addColorStop(0, colors[w % colors.length]);
        grad.addColorStop(1, 'rgba(10, 18, 13, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    /**
     * Draw micro soil coordinates & subtle agricultural grid stippling
     */
    const drawSoilTextureGrid = (parallaxX: number, parallaxY: number) => {
      const gridSize = 80;
      const startX = (parallaxX * 0.02) % gridSize;
      const startY = (parallaxY * 0.02) % gridSize;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.018)';
      for (let x = startX; x < width; x += gridSize) {
        for (let y = startY; y < height; y += gridSize) {
          // Tiny soil telemetry coordinate dot
          ctx.fillRect(x, y, 1.2, 1.2);

          // Subtle crop grid crosshair on every 3rd step
          if ((Math.round(x / gridSize) + Math.round(y / gridSize)) % 4 === 0) {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.025)';
            ctx.fillRect(x - 3, y, 7, 0.6);
            ctx.fillRect(x, y - 3, 0.6, 7);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.018)';
          }
        }
      }
    };

    // Main animation loop
    const render = () => {
      if (!isVisible) return;

      time += motionMode === 'subtle' ? 0.5 : 1.0;

      // Smooth mouse lerping
      const mouse = mouseRef.current;
      const lerpFactor = 0.04;
      mouse.currentX += (mouse.targetX - mouse.currentX) * lerpFactor;
      mouse.currentY += (mouse.targetY - mouse.currentY) * lerpFactor;

      const parallaxX = (mouse.currentX - width / 2);
      const parallaxY = (mouse.currentY - height / 2);

      // ==========================================
      // LAYER 1: Base Dark Canvas & Atmospheric Gradients
      // ==========================================
      // Base background: Obsidian & Deep Forest
      ctx.fillStyle = '#07120B';
      ctx.fillRect(0, 0, width, height);

      // Slow orbital ambient lights
      const orbit1X = (width * 0.25) + Math.sin(time * 0.0008) * (width * 0.12) + (parallaxX * 0.05);
      const orbit1Y = (height * 0.3) + Math.cos(time * 0.0007) * (height * 0.1) + (parallaxY * 0.05);
      const grad1 = ctx.createRadialGradient(orbit1X, orbit1Y, 10, orbit1X, orbit1Y, width * 0.45);
      grad1.addColorStop(0, 'rgba(16, 185, 129, 0.085)'); // Emerald core
      grad1.addColorStop(0.6, 'rgba(7, 43, 29, 0.04)');
      grad1.addColorStop(1, 'rgba(7, 18, 11, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Deep Navy / Midnight Blue Atmospheric Chamber
      const orbit2X = (width * 0.8) + Math.cos(time * 0.0006) * (width * 0.1) - (parallaxX * 0.04);
      const orbit2Y = (height * 0.25) + Math.sin(time * 0.0009) * (height * 0.12) - (parallaxY * 0.04);
      const grad2 = ctx.createRadialGradient(orbit2X, orbit2Y, 20, orbit2X, orbit2Y, width * 0.5);
      grad2.addColorStop(0, 'rgba(14, 116, 144, 0.08)'); // Deep cyan / navy sky
      grad2.addColorStop(0.5, 'rgba(11, 30, 58, 0.04)');
      grad2.addColorStop(1, 'rgba(7, 18, 11, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Terrestrial Soil / Deep Earth Foundation Glow
      const orbit3X = (width * 0.5) - (parallaxX * 0.02);
      const orbit3Y = height + 40;
      const grad3 = ctx.createRadialGradient(orbit3X, orbit3Y, 40, orbit3X, orbit3Y, height * 0.7);
      grad3.addColorStop(0, 'rgba(5, 150, 105, 0.06)');
      grad3.addColorStop(0.5, 'rgba(4, 47, 46, 0.03)');
      grad3.addColorStop(1, 'rgba(7, 18, 11, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // ==========================================
      // LAYER 2: Micro Soil Coordinates & Topography Grid
      // ==========================================
      drawSoilTextureGrid(parallaxX, parallaxY);

      // ==========================================
      // LAYER 3: Faint Botanical Leaf Motifs (Abstract Watermarks)
      // ==========================================
      const leafOffset = Math.sin(time * 0.001) * 8;
      // Top Right Botanical Outline
      drawLeafMotif(
        width * 0.88 + parallaxX * 0.015,
        height * 0.22 + parallaxY * 0.015 + leafOffset,
        1.1,
        0.35,
        0.045
      );
      // Mid-Left Botanical Outline
      drawLeafMotif(
        width * 0.08 - parallaxX * 0.012,
        height * 0.55 - parallaxY * 0.012 - leafOffset * 0.8,
        0.85,
        -0.45,
        0.038
      );

      // ==========================================
      // LAYER 4: Undulating Crop Field Waves & Terraces
      // ==========================================
      drawFieldContourWaves(parallaxX, parallaxY);

      // ==========================================
      // LAYER 5: Gentle Atmospheric Rainfall Particles
      // ==========================================
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.08)';
      ctx.lineWidth = 0.9;
      const rainAngle = 0.22; // ~12.6 degree gentle wind slant
      const dx = Math.sin(rainAngle);
      const dy = Math.cos(rainAngle);

      for (let i = 0; i < rain.length; i++) {
        const p = rain[i];
        p.y += p.speed * (motionMode === 'subtle' ? 0.6 : 1);
        p.x += p.speed * dx * (motionMode === 'subtle' ? 0.6 : 1);

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * (width + 200) - 100;
        }

        ctx.strokeStyle = `rgba(186, 230, 253, ${p.opacity})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + dx * p.length, p.y + dy * p.length);
        ctx.stroke();
      }

      // ==========================================
      // LAYER 6: Sensor-Network Paths & Glowing Connection Vectors
      // ==========================================
      const maxDistance = width < 768 ? 100 : 130;
      const maxDistSq = maxDistance * maxDistance;

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Soft screen bounce boundaries
        if (node.x < 10) {
          node.x = 10;
          node.vx = Math.abs(node.vx);
        } else if (node.x > width - 10) {
          node.x = width - 10;
          node.vx = -Math.abs(node.vx);
        }
        if (node.y < 10) {
          node.y = 10;
          node.vy = Math.abs(node.vy);
        } else if (node.y > height - 10) {
          node.y = height - 10;
          node.vy = -Math.abs(node.vy);
        }

        node.pulsePhase += node.pulseSpeed;
      }

      // Draw connection vectors between proximity nodes
      for (let i = 0; i < nodes.length; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nb = nodes[j];
          const distSq = (na.x - nb.x) * (na.x - nb.x) + (na.y - nb.y) * (na.y - nb.y);

          if (distSq < maxDistSq) {
            const ratio = 1 - Math.sqrt(distSq) / maxDistance;
            const lineAlpha = ratio * 0.13; // Soft, unobtrusive glow line

            ctx.strokeStyle = `rgba(0, 255, 136, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();
          }
        }
      }

      // Draw active telemetry data packets streaming along edges
      for (let p = 0; p < packets.length; p++) {
        const pkt = packets[p];
        pkt.progress += pkt.speed * (motionMode === 'subtle' ? 0.6 : 1);
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.fromNode = Math.floor(Math.random() * nodes.length);
          pkt.toNode = (pkt.fromNode + Math.floor(Math.random() * (nodes.length - 1)) + 1) % nodes.length;
        }

        const na = nodes[pkt.fromNode];
        const nb = nodes[pkt.toNode];
        if (na && nb) {
          const distSq = (na.x - nb.x) * (na.x - nb.x) + (na.y - nb.y) * (na.y - nb.y);
          if (distSq < maxDistSq * 1.5) {
            const px = na.x + (nb.x - na.x) * pkt.progress;
            const py = na.y + (nb.y - na.y) * pkt.progress;

            // Packet glow dot
            ctx.fillStyle = pkt.color;
            ctx.beginPath();
            ctx.arc(px, py, 1.4, 0, Math.PI * 2);
            ctx.fill();

            // Tiny trail
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.25)';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(px - (nb.x - na.x) * 0.04, py - (nb.y - na.y) * 0.04);
            ctx.lineTo(px, py);
            ctx.stroke();
          }
        }
      }

      // Draw sensor nodes with pulsing biological ring
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = (Math.sin(node.pulsePhase) + 1) * 0.5;
        const currentRadius = node.baseRadius + pulse * 0.8;

        // Proximity glow to cursor
        const mDistSq = (node.x - mouse.currentX) ** 2 + (node.y - mouse.currentY) ** 2;
        const isNearCursor = mDistSq < 150 * 150;
        const cursorBoost = isNearCursor ? 1.4 : 1.0;

        // Outer sensor beacon ring
        ctx.strokeStyle = `rgba(0, 255, 136, ${0.12 * pulse * cursorBoost})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 2.8, 0, Math.PI * 2);
        ctx.stroke();

        // Node core
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * (isNearCursor ? 1.2 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // LAYER 7: Transpiration & Spore Micronutrients
      // ==========================================
      for (let i = 0; i < spores.length; i++) {
        const s = spores[i];
        s.y += s.vy * (motionMode === 'subtle' ? 0.6 : 1);
        s.wobblePhase += s.wobbleSpeed;
        s.x += Math.sin(s.wobblePhase) * 0.35 + s.vx;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        const alpha = s.baseAlpha * (0.7 + Math.sin(s.wobblePhase) * 0.3);
        ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // LAYER 8: Contrast & Vignette Scrim (Protect Foreground Text & Charts)
      // ==========================================
      const vigGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      vigGrad.addColorStop(0, 'rgba(7, 18, 11, 0)');
      vigGrad.addColorStop(1, 'rgba(5, 12, 8, 0.45)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      // Loop if animated
      if (motionMode !== 'static') {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Render initial frame
    if (motionMode === 'static') {
      render();
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [motionMode]);

  return (
    <>
      {/* Static Fallback Canvas / CSS Container */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#07120B]"
        aria-hidden="true"
      >
        {/* CSS Static Gradient Layer (Visible immediately and during any canvas load/fallback) */}
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-1000"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.12) 0%, transparent 45%),
              radial-gradient(circle at 85% 30%, rgba(14, 116, 144, 0.10) 0%, transparent 50%),
              radial-gradient(circle at 50% 85%, rgba(6, 78, 59, 0.14) 0%, transparent 55%),
              linear-gradient(180deg, #07120B 0%, #050E09 50%, #040A06 100%)
            `,
          }}
        />

        {/* High-Performance Canvas for dynamic particles, telemetry & wave contours */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          style={{
            opacity: motionMode === 'static' ? 0.85 : 0.95,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />

        {/* Subtle grid pattern overlay for high-tech telemetry structure */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 255, 136, 0.7) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Accessible Ambient Motion Control Switcher (Discreet Floating Widget) */}
      <div
        className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5"
        role="region"
        aria-label="Background Motion Preferences"
      >
        {showControls && (
          <div className="flex items-center gap-1 p-1 bg-[#111827]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-xl text-[11px] animate-in fade-in slide-in-from-right-3 duration-200">
            <span className="text-[#94A3B8] px-2 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00FF88]" />
              <span>Agri-Canvas:</span>
            </span>

            <button
              type="button"
              id="bg-mode-dynamic-btn"
              onClick={() => handleModeChange('dynamic')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                motionMode === 'dynamic'
                  ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
              title="Full dynamic crop analytics particles and wave motion"
            >
              Dynamic
            </button>

            <button
              type="button"
              id="bg-mode-subtle-btn"
              onClick={() => handleModeChange('subtle')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                motionMode === 'subtle'
                  ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
              title="Gentle, reduced-rate ambient motion"
            >
              Subtle
            </button>

            <button
              type="button"
              id="bg-mode-static-btn"
              onClick={() => handleModeChange('static')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                motionMode === 'static'
                  ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
              title="Static background (conserves power and satisfies reduced motion)"
            >
              Static
            </button>
          </div>
        )}

        <button
          type="button"
          id="toggle-bg-settings-btn"
          onClick={() => setShowControls((prev) => !prev)}
          className="p-2 rounded-xl bg-[#111827]/80 hover:bg-[#111827] text-[#94A3B8] hover:text-[#00FF88] border border-white/10 hover:border-[#00FF88]/40 shadow-lg backdrop-blur-md transition-all cursor-pointer"
          title={`Smart Agriculture Canvas (${motionMode} mode) - Click to toggle motion settings`}
          aria-expanded={showControls}
          aria-label="Toggle background animation settings"
        >
          {motionMode === 'static' ? (
            <EyeOff className="w-4 h-4 text-[#94A3B8]" />
          ) : (
            <Sparkles className="w-4 h-4 text-[#00FF88]" />
          )}
        </button>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import {
  Camera,
  Cpu,
  TrendingUp,
  Send,
  Radio,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export const DroneWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: 'Capture',
      subtitle: 'Autonomous High-Altitude Photogrammetry',
      icon: Camera,
      badge: 'Step 01 // Airborne Sensor Suite',
      description:
        'Industrial quadcopters launch automatically from solar base stations, navigating waypoint grids at 45m AGL with RTK-corrected GNSS. Multispectral 6-band lenses capture synchronized red, green, blue, red-edge, near-infrared, and long-wave thermal frames.',
      specs: [
        { label: 'Ground Sample Distance', value: '1.8 cm / pixel' },
        { label: 'Flight Coverage', value: '160 Hectares / battery' },
        { label: 'Geotag Accuracy', value: 'Sub-inch RTK GNSS' },
        { label: 'Wind Resistance', value: 'Up to 12 m/s (Beaufort 6)' },
      ],
      output: 'Calibrated 16-bit GeoTIFF Multiband Raw Stream',
    },
    {
      id: 1,
      title: 'Analyze',
      subtitle: 'Edge AI Orthomosaic Processing',
      icon: Cpu,
      badge: 'Step 02 // Photogrammetric Computer Vision',
      description:
        'AgriAI stitches hundreds of aerial captures into an orthorectified terrain mosaic within minutes. Deep convolutional neural networks isolate individual crop canopies, filter out shadow artifacts, and calculate calibrated NDVI, NDRE, and canopy temperature matrices.',
      specs: [
        { label: 'Stitching Turnaround', value: '<15 minutes / 100 ha' },
        { label: 'Canopy Segmentation', value: '99.4% plant-soil accuracy' },
        { label: 'Radiometric Calibration', value: 'Solar Downwelling Sensor' },
        { label: 'Defect Recognition', value: 'Weeds, Lodging, Stand Counts' },
      ],
      output: 'Calibrated Multispectral Index Layers & Plant Density Map',
    },
    {
      id: 2,
      title: 'Predict',
      subtitle: 'Agronomic Yield & Disease Forecasting',
      icon: TrendingUp,
      badge: 'Step 03 // Predictive Agronomy Engine',
      description:
        'Machine learning models ingest historical soil records, weather projections, and current vegetative vigor curves to forecast dry-matter biomass, harvest dates, and localized fungal infection vulnerabilities up to 10 days before visible foliar damage occurs.',
      specs: [
        { label: 'Yield Variance Accuracy', value: '94.8% Harvest Correlation' },
        { label: 'Early Blight Warning', value: '7 to 10 Days Pre-Symptomatic' },
        { label: 'Water Deficit Profiling', value: 'Root Zone Evapotranspiration' },
        { label: 'Biomass Estimation', value: 'Dry matter kg/hectare curve' },
      ],
      output: 'Prescriptive Agronomy Yield & Stress Forecast Matrix',
    },
    {
      id: 3,
      title: 'Act',
      subtitle: 'Millimeter Variable-Rate Prescription',
      icon: Send,
      badge: 'Step 04 // Autonomous Machinery Execution',
      description:
        'AgriAI compiles variable-rate application (VRA) maps directly compatible with tractor ISOBUS consoles and autonomous DJI Agras spray drones. Liquid nitrogen and crop protection chemicals are applied with millimeter precision, cutting waste by up to 30%.',
      specs: [
        { label: 'File Compatibility', value: 'ISOXML, Shapefile, GeoJSON' },
        { label: 'Tractor Telematics', value: 'John Deere, Trimble, Raven' },
        { label: 'Chemical Reduction', value: '28.4% Average Fertilizer Cut' },
        { label: 'Worker Safety', value: '100% Remote Sprayer Guidance' },
      ],
      output: 'Ready-to-Spray Prescription Geo-Files & Sprayer Mission Plans',
    },
  ];

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-[#030712] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>End-to-End Operational Lifecycle</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            The AgriAI drone monitoring workflow.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] mt-4 leading-relaxed">
            From automated pre-flight takeoff to variable-rate tractor application: four seamlessly
            integrated phases engineered for maximum agronomic precision.
          </p>
        </div>

        {/* 4 Steps Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#102419] border-[#00FF88]/50 shadow-[0_0_20px_rgba(0,255,136,0.15)]'
                    : 'bg-[#07110C] border-white/10 hover:border-white/20 hover:bg-[#0c1912]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#00FF88] text-[#030712]' : 'bg-white/5 text-[#CBD5E1]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? 'text-[#00FF88]' : 'text-[#94A3B8]'
                    }`}
                  >
                    0{step.id + 1}
                  </span>
                </div>
                <div>
                  <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-white' : 'text-[#CBD5E1]'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">{step.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Bento Display */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-bold text-[#00FF88] uppercase tracking-wider block mb-2">
                {steps[activeStep].badge}
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white mb-3">
                {steps[activeStep].title}: {steps[activeStep].subtitle}
              </h3>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6">
                {steps[activeStep].description}
              </p>

              {/* Verified Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {steps[activeStep].specs.map((spec, i) => (
                  <div key={i} className="p-3 bg-[#030712]/80 rounded-xl border border-white/10">
                    <span className="text-[11px] text-[#94A3B8] block">{spec.label}</span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white mt-0.5 block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Output Pill */}
              <div className="p-3.5 bg-[#06180e] rounded-xl border border-[#00FF88]/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00FF88] shrink-0" />
                <div className="text-xs">
                  <span className="text-[#94A3B8] block">Generated Mission Deliverable:</span>
                  <span className="font-mono font-bold text-[#00FF88]">
                    {steps[activeStep].output}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Telemetry Console (5 cols) */}
            <div className="lg:col-span-5 bg-[#030712] rounded-2xl p-5 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[#00FF88] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  TELEMETRY CONSOLE
                </span>
                <span className="text-[#94A3B8]">STEP 0{activeStep + 1} / 04</span>
              </div>

              {/* Step-specific simulated HUD */}
              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                  <span className="text-[#94A3B8]">FLIGHT CONTROLLER:</span>
                  <span className="text-white font-bold">RTK FIXED &bull; 24 SATS</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                  <span className="text-[#94A3B8]">SPECTRAL SENSOR:</span>
                  <span className="text-[#00FF88] font-bold">6-BAND NIR CALIBRATED</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                  <span className="text-[#94A3B8]">INFERENCE ACCEL:</span>
                  <span className="text-[#06B6D4] font-bold">EDGE TENSOR CORE ACTIVE</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                  <span className="text-[#94A3B8]">LATENCY TO CONSOLE:</span>
                  <span className="text-white font-bold">42ms // REAL-TIME</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep((activeStep - 1 + steps.length) % steps.length)}
                  className="text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                >
                  &larr; Previous Step
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                  className="px-3 py-1.5 rounded-lg bg-[#00FF88] text-[#030712] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Compass,
  Cpu,
  Target,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingDown,
  Gauge
} from 'lucide-react';

export const FlightDataToDecisions: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      id: 0,
      number: '01',
      title: 'Autonomous Flight Capture',
      subtitle: 'Sub-centimeter GSD Photogrammetry',
      description:
        'Industrial drones fly pre-programmed raster flight grids with RTK centimeter geotagging, capturing 6 discrete spectral bands (Red, Green, Blue, RedEdge, NIR, Thermal) at 1.8 cm/pixel ground sampling distance.',
      metric: '1.8 cm/px',
      metricLabel: 'Spatial Ground Resolution',
      highlight: 'RTK Sub-inch Positioning',
    },
    {
      id: 1,
      number: '02',
      title: 'Radiometric AI Stitching',
      subtitle: 'Orthomosaic Calibration & Plant Segmentation',
      description:
        'Raw sensor captures are calibrated with sunlight irradiance data and processed through AgriAI computer vision algorithms to isolate individual plant canopies from background bare soil and weeds.',
      metric: '14 min',
      metricLabel: 'Processing per 100 Hectares',
      highlight: 'Automatic Solar Irradiance Normalization',
    },
    {
      id: 2,
      number: '03',
      title: 'Biomass & Disease Diagnosis',
      subtitle: 'Chlorophyll Stress & Hydric Profiling',
      description:
        'Machine learning algorithms compare current canopy reflectance against historical cohort curves, diagnosing nitrogen deficiency, stem rust, and root rot 7 to 10 days before visible symptoms emerge.',
      metric: '96.4%',
      metricLabel: 'Pre-Symptomatic Accuracy',
      highlight: '7-10 Days Early Warning',
    },
    {
      id: 3,
      number: '04',
      title: 'Variable-Rate Prescription',
      subtitle: 'Direct Sprayer / Spreader Export',
      description:
        'AI translates vegetation indexes into ISOXML and shapefile prescription zones, directly uploaded to John Deere, Case IH, or agricultural spray drones for automated millimeter-targeted application.',
      metric: '-28.4%',
      metricLabel: 'Average Nitrogen Savings',
      highlight: 'Compatible with Major Tractor Consoles',
    },
  ];

  return (
    <section
      id="flight-to-decisions"
      className="py-20 sm:py-28 bg-[#07110C] relative border-b border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00FF88]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Agronomic Intelligence</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            From flight data to field decisions.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] mt-4 leading-relaxed">
            Raw aerial imagery without machine interpretation is just pretty pictures. AgriAI
            closes the loop between high-altitude telemetry and autonomous variable-rate tractor
            sprayers.
          </p>
        </div>

        {/* Interactive 4-Stage Horizontal Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stage Selector List (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {stages.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(stage.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer border flex items-start gap-4 ${
                    isActive
                      ? 'bg-[#102419] border-[#00FF88]/40 shadow-[0_4px_20px_rgba(0,255,136,0.1)]'
                      : 'bg-[#0b1610]/70 border-white/5 hover:border-white/20 hover:bg-[#0e1c14]'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                      isActive ? 'bg-[#00FF88] text-[#030712]' : 'bg-white/5 text-[#94A3B8]'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-white' : 'text-[#CBD5E1]'}`}>
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5 truncate">{stage.subtitle}</p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-[#00FF88] mt-2 shrink-0 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Deep-Dive Card (Right 7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            {/* Top Bar of Card */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#00FF88]">
                    PHASE {stages[activeStage].number} // PIPELINE EXECUTION
                  </span>
                </div>
                <span className="text-xs text-[#94A3B8] font-mono">
                  Module {activeStage + 1} of 4
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                {stages[activeStage].title}
              </h3>
              <p className="text-sm font-semibold text-[#00FF88] mb-4">
                {stages[activeStage].subtitle}
              </p>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6">
                {stages[activeStage].description}
              </p>

              {/* Graphic Field Simulation Preview */}
              <div className="bg-[#030712]/90 rounded-2xl p-5 border border-white/10 relative overflow-hidden mb-6">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-mono text-[#94A3B8]">Telemetry Output Visualizer</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00FF88]/15 text-[#00FF88]">
                    {stages[activeStage].highlight}
                  </span>
                </div>

                {/* Simulated Data Canvas Matrix */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const health = 80 + ((i * 17) % 19);
                    const isDeficient = health < 85;
                    return (
                      <div
                        key={i}
                        className={`p-2.5 rounded-lg border transition-all ${
                          isDeficient
                            ? 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444]'
                            : 'bg-[#00FF88]/10 border-[#00FF88]/30 text-[#00FF88]'
                        }`}
                      >
                        <div className="text-[10px] text-[#94A3B8]">Zone #{i + 1}</div>
                        <div className="font-bold text-sm">{health}%</div>
                        <div className="text-[9px] mt-0.5">
                          {isDeficient ? 'Low N2' : 'Nominal'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Impact Metric Strip */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#00FF88]">
                  {stages[activeStage].metric}
                </div>
                <div className="text-xs text-[#94A3B8]">
                  {stages[activeStage].metricLabel}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStage((activeStage + 1) % stages.length)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              >
                <span>Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00FF88]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

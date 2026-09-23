import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Activity,
  Droplets,
  Sprout,
  Radio,
  Pause,
  Play,
  Eye,
  Sliders,
  Compass,
  Gauge,
  Layers,
  ChevronDown
} from 'lucide-react';
import { AgriDroneCanvas } from './AgriDroneCanvas';

interface AgriHeroProps {
  onExploreClick: () => void;
  onLiveIntelligenceClick: () => void;
  reduceMotion: boolean;
  onToggleReduceMotion: () => void;
}

export const AgriHero: React.FC<AgriHeroProps> = ({
  onExploreClick,
  onLiveIntelligenceClick,
  reduceMotion,
  onToggleReduceMotion,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [liveTelemetry, setLiveTelemetry] = useState({
    altitudeMeters: 42.5,
    speedKmh: 38.4,
    sensorCount: 128,
    cropHealth: 87.4,
    soilMoisture: 64,
    heading: 142,
  });

  return (
    <section
      aria-label="AgriAI Smart Farming Intelligence Hero"
      className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#030712] border-b border-[#00FF88]/15"
    >
      {/* 3D Drone & Digital Farm WebGL Canvas Canvas */}
      <div className="absolute inset-0 z-0">
        <AgriDroneCanvas
          isPaused={isPaused}
          reduceMotion={reduceMotion}
          onDroneScanUpdate={setLiveTelemetry}
        />
      </div>

      {/* Subtle overlay grid lines for precision farm aesthetic */}
      <div className="absolute inset-0 field-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Accessible Controls Bar (Top-Right Floating HUD) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between pointer-events-none">
        {/* Live Flight Telemetry Pill */}
        <div className="pointer-events-auto flex items-center gap-3 glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono text-[#CBD5E1] border border-white/10 shadow-lg">
          <span className="flex items-center gap-1.5 text-[#00FF88] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            LIVE FLIGHT
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">ALT: {liveTelemetry.altitudeMeters}m</span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline">SPEED: {liveTelemetry.speedKmh} km/h</span>
          <span className="hidden lg:inline text-white/30">|</span>
          <span className="hidden lg:inline">HDG: {liveTelemetry.heading}&deg;</span>
        </div>

        {/* Animation & Accessibility Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs font-medium text-[#CBD5E1] hover:text-white hover:border-[#00FF88]/40 transition-colors cursor-pointer"
            title={isPaused ? 'Resume 3D Drone Flight' : 'Pause 3D Drone Flight'}
            aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#00FF88]" /> : <Pause className="w-3.5 h-3.5 text-[#00FF88]" />}
            <span className="hidden sm:inline">{isPaused ? 'Resume Flight' : 'Pause Animation'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleReduceMotion}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
              reduceMotion
                ? 'bg-[#00FF88]/20 border-[#00FF88] text-[#00FF88]'
                : 'glass-panel text-[#CBD5E1] hover:text-white hover:border-[#00FF88]/40 border-white/10'
            }`}
            title="Toggle reduced motion for accessibility"
            aria-pressed={reduceMotion}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{reduceMotion ? 'Reduced Motion: ON' : 'Reduce Motion'}</span>
          </button>
        </div>
      </div>

      {/* Main Hero Content (Semantic HTML Layered Above Canvas) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col justify-center flex-grow">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#062016]/90 border border-[#00FF88]/30 mb-6 backdrop-blur-md"
          >
            <Radio className="w-3.5 h-3.5 text-[#00FF88] animate-pulse" />
            <span className="text-xs font-semibold text-[#00FF88] tracking-wide">
              AI-powered agriculture intelligence
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6"
            style={{ textWrap: 'balance' }}
          >
            See every field.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] via-[#42F58D] to-[#06B6D4]">
              Predict every opportunity.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-2xl mb-8"
          >
            AgriAI combines satellite imagery, drone monitoring, machine learning, and farm data
            to help growers make faster, smarter decisions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#030712] font-bold text-sm transition-all duration-200 shadow-[0_0_25px_rgba(0,255,136,0.3)] hover:shadow-[0_0_35px_rgba(0,255,136,0.5)] flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore AgriAI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              id="hero-intelligence-btn"
              onClick={onLiveIntelligenceClick}
              className="px-6 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer border border-white/15"
            >
              <Eye className="w-4 h-4 text-[#00FF88]" />
              <span>View live intelligence</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Staggered Animated Dashboard Metric Cards (Bottom Hero Dock) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {/* Metric 1: Crop Health */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-[#00FF88]/40 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1.5">
              <span className="font-medium">Crop health</span>
              <Activity className="w-4 h-4 text-[#00FF88]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {liveTelemetry.cropHealth}%
              </span>
              <span className="text-[11px] font-semibold text-[#00FF88]">+3.2% vs avg</span>
            </div>
            <div className="w-full bg-[#1e293b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#06B6D4] to-[#00FF88] h-full rounded-full transition-all duration-500"
                style={{ width: `${liveTelemetry.cropHealth}%` }}
              />
            </div>
          </div>

          {/* Metric 2: Soil Moisture */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-[#06B6D4]/40 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1.5">
              <span className="font-medium">Soil moisture</span>
              <Droplets className="w-4 h-4 text-[#06B6D4]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {liveTelemetry.soilMoisture}%
              </span>
              <span className="text-[11px] font-semibold text-[#06B6D4]">Optimal Field Zone</span>
            </div>
            <div className="w-full bg-[#1e293b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#06B6D4] h-full rounded-full transition-all duration-500"
                style={{ width: `${liveTelemetry.soilMoisture}%` }}
              />
            </div>
          </div>

          {/* Metric 3: Yield Forecast */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-[#F59E0B]/40 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1.5">
              <span className="font-medium">Yield forecast</span>
              <Sprout className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                4.8 tonnes
              </span>
              <span className="text-[11px] font-semibold text-[#10B981]">/ hectare</span>
            </div>
            <p className="text-[10px] text-[#94A3B8] mt-2 font-mono">
              Confidence: 94.8% &bull; Machine Learning
            </p>
          </div>

          {/* Metric 4: Active Field Sensors */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 hover:border-[#8B5CF6]/40 transition-all duration-200">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-1.5">
              <span className="font-medium">Active field sensors</span>
              <Radio className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {liveTelemetry.sensorCount}
              </span>
              <span className="text-[11px] font-semibold text-[#8B5CF6]">Mesh Connected</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[#94A3B8]">
              <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              <span>0 offline &bull; 100% telemetry synced</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smooth scroll down indicator */}
      <div className="relative z-10 pb-4 flex justify-center">
        <button
          type="button"
          onClick={onExploreClick}
          className="text-[#94A3B8] hover:text-[#00FF88] transition-colors p-1 cursor-pointer flex flex-col items-center gap-1 text-[11px]"
          aria-label="Scroll to exploration sections"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

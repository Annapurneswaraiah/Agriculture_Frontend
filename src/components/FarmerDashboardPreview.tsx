import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Plane,
  Activity,
  AlertCircle,
  BatteryCharging,
  Wifi,
  Radio,
  ArrowRight,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const FarmerDashboardPreview: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'mission' | 'fleet' | 'prescription'>('mission');

  return (
    <section id="dashboard-preview" className="py-20 sm:py-28 bg-[#030712] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Operations Command Center</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Farmer dashboard preview.
            </h2>
            <p className="text-base text-[#94A3B8] mt-3">
              Experience the unified AgriAI cockpit: track active autonomous missions, monitor
              canopy stress in real-time, and download spray maps with one click.
            </p>
          </div>

          <button
            type="button"
            id="launch-full-dashboard-btn"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-3 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#030712] font-bold text-xs transition-all duration-200 shadow-[0_0_20px_rgba(0,255,136,0.3)] flex items-center gap-2 self-start lg:self-auto cursor-pointer"
          >
            <span>Launch Full Operations Console</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Dashboard Shell Mockup */}
        <div className="glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
          {/* Top Browser / Window Chrome */}
          <div className="bg-[#0b1610] px-6 py-3.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]/60 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/60 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#00FF88]/60 inline-block" />
              </div>
              <span className="font-mono text-xs text-[#94A3B8] pl-2 border-l border-white/10">
                agriai.internal / operations-center / basin-west-4
              </span>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#00FF88]">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                RTK HIGH FIX (0.8cm)
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="hidden sm:flex items-center gap-1 text-[#CBD5E1]">
                <Wifi className="w-3.5 h-3.5 text-[#00FF88]" />
                99% TELEMETRY LINK
              </span>
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="bg-[#07110C] px-6 py-2.5 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('mission')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'mission'
                  ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Live Mission Stream</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('fleet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'fleet'
                  ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Autonomous Drone Fleet (3)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prescription')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'prescription'
                  ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Prescription Zones</span>
            </button>
          </div>

          {/* Dashboard Body Preview */}
          <div className="p-6 bg-[#040a07]">
            {activeTab === 'mission' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Flight Status (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-4 bg-[#071510] rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
                      <span>Airframe Telemetry</span>
                      <span className="text-[#00FF88] font-mono">DRONE-01 // ACTIVE</span>
                    </div>
                    <div className="space-y-2.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Battery Charge:</span>
                        <span className="text-white font-bold flex items-center gap-1">
                          <BatteryCharging className="w-3.5 h-3.5 text-[#00FF88]" />
                          84% (28 min rem)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Current Altitude:</span>
                        <span className="text-white font-bold">45.2 m AGL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Ground Speed:</span>
                        <span className="text-white font-bold">12.4 m/s (44.6 km/h)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94A3B8]">Waypoint Progress:</span>
                        <span className="text-[#00FF88] font-bold">24 / 32 Passed</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Automated Alerts */}
                  <div className="p-4 bg-[#140b07] rounded-2xl border border-[#F59E0B]/30">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Early Anomaly Alert #204</span>
                    </div>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      Sector B4 exhibits an unexpected 18% NDRE drop. Potential irrigation drip clog detected.
                    </p>
                    <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-[#94A3B8]">
                      <span>Dispatched: 6 mins ago</span>
                      <span className="text-[#00FF88] underline cursor-pointer">Dispatch Scout</span>
                    </div>
                  </div>
                </div>

                {/* Right Map & Telemetry Viz (8 cols) */}
                <div className="lg:col-span-8 bg-[#071510] rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4 text-xs font-mono">
                    <span className="text-white font-bold">LIVE ORTHOPHOTO OVERLAY: FIELD 12</span>
                    <span className="text-[#00FF88]">SCANNING ACTIVE &bull; 6-BAND NIR</span>
                  </div>

                  {/* Visual Map Area */}
                  <div className="relative w-full h-56 bg-[#030712] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                    <div className="absolute inset-0 field-grid-pattern opacity-40" />

                    {/* Raster flight grid path visual */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path
                        d="M 40,40 L 400,40 L 400,90 L 40,90 L 40,140 L 400,140 L 400,190 L 40,190"
                        fill="none"
                        stroke="#00FF88"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        opacity="0.6"
                      />
                    </svg>

                    {/* Moving Drone Icon along path */}
                    <div className="relative z-10 p-2.5 rounded-full bg-[#00FF88] text-[#030712] shadow-[0_0_20px_#00FF88] flex items-center gap-2">
                      <Plane className="w-4 h-4" />
                      <span className="text-[10px] font-bold font-mono">AGRI-01 SCANNING</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#94A3B8] mt-4 pt-3 border-t border-white/10 font-mono">
                    <span>Target: 142 Hectares Total</span>
                    <span>118 Hectares Scanned (83%)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fleet' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'HexaCopter Alpha', status: 'In Mission', battery: '84%', task: 'Multispectral Scanning' },
                  { name: 'QuadCopter Beta', status: 'Docked / Ready', battery: '100%', task: 'Standby Scouting' },
                  { name: 'Agras Spray Unit 01', status: 'Armed', battery: '95%', task: 'Prescription Spraying' },
                ].map((drone, i) => (
                  <div key={i} className="p-4 bg-[#071510] rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">{drone.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00FF88]/15 text-[#00FF88]">
                        {drone.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#94A3B8] space-y-1 font-mono">
                      <div>Battery: <span className="text-white">{drone.battery}</span></div>
                      <div>Role: <span className="text-white">{drone.task}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'prescription' && (
              <div className="p-6 bg-[#071510] rounded-xl border border-white/10 text-center">
                <Layers className="w-8 h-8 text-[#00FF88] mx-auto mb-2" />
                <h4 className="text-white font-bold text-sm">Variable Rate Nitrogen Prescription Loaded</h4>
                <p className="text-xs text-[#94A3B8] max-w-md mx-auto mt-1 mb-4">
                  Prescription zones generated from morning flight. Export format ready for John Deere GS4, Trimble TMX-2050, and Topcon consoles.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-xl bg-[#00FF88] text-[#030712] font-bold text-xs hover:bg-[#00FF88]/90 transition-colors cursor-pointer"
                >
                  Download ISOXML in Operations Console
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

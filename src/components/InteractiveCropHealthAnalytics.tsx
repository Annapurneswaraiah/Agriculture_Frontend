import React, { useState } from 'react';
import {
  Layers,
  Activity,
  Droplets,
  Thermometer,
  Eye,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Download,
  Info,
  ChevronRight
} from 'lucide-react';

interface FieldZone {
  id: string;
  name: string;
  areaHa: number;
  crop: string;
  ndvi: number;
  chlorophyllIndex: number;
  soilMoisturePercent: number;
  canopyTempC: number;
  status: 'optimal' | 'warning' | 'critical';
  recommendation: string;
  x: number; // percentage coordinate on map
  y: number;
  width: number;
  height: number;
}

export const InteractiveCropHealthAnalytics: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'ndre' | 'moisture' | 'thermal'>('ndvi');
  const [sliderPosition, setSliderPosition] = useState<number>(60);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-b');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const zones: FieldZone[] = [
    {
      id: 'zone-a',
      name: 'North Terrace Plot A1',
      areaHa: 14.2,
      crop: 'Winter Wheat',
      ndvi: 0.88,
      chlorophyllIndex: 0.79,
      soilMoisturePercent: 68,
      canopyTempC: 22.4,
      status: 'optimal',
      recommendation: 'Canopy density exceptional. Maintain standard irrigation schedule.',
      x: 10,
      y: 12,
      width: 38,
      height: 36,
    },
    {
      id: 'zone-b',
      name: 'Central Pivot B2 (Scanned)',
      areaHa: 26.5,
      crop: 'Soybeans',
      ndvi: 0.62,
      chlorophyllIndex: 0.48,
      soilMoisturePercent: 44,
      canopyTempC: 27.8,
      status: 'warning',
      recommendation: 'Early nitrogen deficiency detected in sector 4. Variable top-dress +25kg/ha advised.',
      x: 52,
      y: 12,
      width: 40,
      height: 38,
    },
    {
      id: 'zone-c',
      name: 'South Basin Plot C3',
      areaHa: 18.0,
      crop: 'Canola',
      ndvi: 0.82,
      chlorophyllIndex: 0.74,
      soilMoisturePercent: 62,
      canopyTempC: 23.1,
      status: 'optimal',
      recommendation: 'Flowering onset uniform. No fungal or pest signatures present.',
      x: 10,
      y: 52,
      width: 42,
      height: 38,
    },
    {
      id: 'zone-d',
      name: 'East Alluvial Plot D4',
      areaHa: 11.4,
      crop: 'Corn (Maize)',
      ndvi: 0.46,
      chlorophyllIndex: 0.35,
      soilMoisturePercent: 32,
      canopyTempC: 31.2,
      status: 'critical',
      recommendation: 'Acute moisture stress and high canopy heat. Inspect drip valve #4 immediately.',
      x: 56,
      y: 54,
      width: 36,
      height: 36,
    },
  ];

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const handleExportPrescription = () => {
    setExportNotice('Prescription shapefile (ISOXML) exported successfully for Field B2.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Color generator based on active layer
  const getZoneColor = (zone: FieldZone) => {
    if (activeLayer === 'ndvi') {
      if (zone.ndvi > 0.8) return 'rgba(0, 255, 136, 0.4)';
      if (zone.ndvi > 0.6) return 'rgba(234, 179, 8, 0.4)';
      return 'rgba(239, 68, 68, 0.45)';
    }
    if (activeLayer === 'ndre') {
      if (zone.chlorophyllIndex > 0.7) return 'rgba(6, 182, 212, 0.4)';
      if (zone.chlorophyllIndex > 0.45) return 'rgba(139, 92, 246, 0.4)';
      return 'rgba(244, 63, 94, 0.45)';
    }
    if (activeLayer === 'moisture') {
      if (zone.soilMoisturePercent > 60) return 'rgba(59, 130, 246, 0.45)';
      if (zone.soilMoisturePercent > 40) return 'rgba(16, 185, 129, 0.4)';
      return 'rgba(245, 158, 11, 0.5)';
    }
    // thermal
    if (zone.canopyTempC < 24) return 'rgba(16, 185, 129, 0.4)';
    if (zone.canopyTempC < 28) return 'rgba(245, 158, 11, 0.45)';
    return 'rgba(239, 68, 68, 0.55)';
  };

  return (
    <section id="crop-health" className="py-20 sm:py-28 bg-[#030712] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Multispectral Telemetry</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Interactive crop-health analytics.
            </h2>
            <p className="text-base text-[#94A3B8] mt-3">
              Switch spectral layers, inspect localized farm plots, and view real-time stress
              signatures captured by AgriAI autonomous drone flights.
            </p>
          </div>

          {/* Layer Selector Segmented Control */}
          <div className="flex items-center bg-[#07110C] p-1.5 rounded-2xl border border-white/10 overflow-x-auto self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setActiveLayer('ndvi')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'ndvi'
                  ? 'bg-[#00FF88] text-[#030712] shadow-sm font-bold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>NDVI Biomass</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('ndre')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'ndre'
                  ? 'bg-[#06B6D4] text-[#030712] shadow-sm font-bold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>NDRE Chlorophyll</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('moisture')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'moisture'
                  ? 'bg-[#3B82F6] text-white shadow-sm font-bold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Soil Moisture</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('thermal')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'thermal'
                  ? 'bg-[#EF4444] text-white shadow-sm font-bold'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>Thermal Stress</span>
            </button>
          </div>
        </div>

        {/* Export Notification Banner */}
        {exportNotice && (
          <div className="mb-6 p-4 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {exportNotice}
            </span>
            <button
              type="button"
              onClick={() => setExportNotice(null)}
              className="hover:underline font-mono text-[10px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Grid: Interactive Map (Left 8 Cols) + Zone Inspector Drawer (Right 4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Map Viewer Container */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-5 border border-white/10 relative overflow-hidden">
            {/* Map Top Status Bar */}
            <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                <span className="font-mono text-white">MISSION: FLIGHT-892 // SECTOR WEST</span>
              </div>
              <span className="font-mono">Resolution: 1.8cm GSD &bull; Altitude: 45m</span>
            </div>

            {/* Simulated Satellite / Drone Orthomosaic Map Canvas */}
            <div className="relative w-full aspect-[16/10] bg-[#071510] rounded-2xl overflow-hidden border border-white/10 shadow-inner group select-none">
              {/* Agricultural Farm Plots Graphic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#06180e] via-[#040f09] to-[#0a2015]">
                {/* Field Furrow Textures */}
                <div className="w-full h-full opacity-20 field-grid-pattern" />

                {/* Simulated contour lines */}
                <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
                  <path d="M 0,80 Q 200,60 400,120 T 800,90" fill="none" stroke="#00FF88" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M 0,180 Q 300,240 600,160 T 900,220" fill="none" stroke="#00FF88" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M 0,320 Q 250,280 500,340 T 900,300" fill="none" stroke="#00FF88" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Clickable Interactive Zones */}
              {zones.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                const zoneBg = getZoneColor(zone);

                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZoneId(zone.id)}
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`,
                      backgroundColor: zoneBg,
                    }}
                    className={`absolute rounded-xl border-2 transition-all cursor-pointer p-3 flex flex-col justify-between text-left ${
                      isSelected
                        ? 'border-white shadow-[0_0_20px_rgba(0,255,136,0.5)] z-20 scale-[1.01]'
                        : 'border-white/30 hover:border-white/70 z-10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#030712]/80 text-white">
                        {zone.id.toUpperCase()}
                      </span>
                      {zone.status === 'critical' && (
                        <span className="p-1 rounded bg-[#ef4444] text-white">
                          <AlertTriangle className="w-3 h-3" />
                        </span>
                      )}
                      {zone.status === 'optimal' && (
                        <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                      )}
                    </div>

                    <div className="bg-[#030712]/80 backdrop-blur-xs p-1.5 rounded-lg">
                      <div className="text-[11px] font-bold text-white truncate">{zone.name}</div>
                      <div className="text-[10px] text-[#94A3B8] font-mono flex items-center justify-between mt-0.5">
                        <span>{zone.crop}</span>
                        <span className="text-[#00FF88] font-bold">
                          {activeLayer === 'ndvi' && `NDVI: ${zone.ndvi}`}
                          {activeLayer === 'ndre' && `NDRE: ${zone.chlorophyllIndex}`}
                          {activeLayer === 'moisture' && `${zone.soilMoisturePercent}% H2O`}
                          {activeLayer === 'thermal' && `${zone.canopyTempC}°C`}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Dynamic Laser Scan Sweep Line */}
              <div className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-[#00FF88] to-transparent animate-pulse pointer-events-none opacity-60" style={{ left: '54%' }} />

              {/* Legend overlay inside map */}
              <div className="absolute bottom-3 left-3 bg-[#030712]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[10px] font-mono flex items-center gap-3">
                <span className="text-[#94A3B8]">Legend:</span>
                <span className="flex items-center gap-1 text-[#00FF88]">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88]" /> High Vigour
                </span>
                <span className="flex items-center gap-1 text-[#EAB308]">
                  <span className="w-2 h-2 rounded-full bg-[#EAB308]" /> Moderate
                </span>
                <span className="flex items-center gap-1 text-[#EF4444]">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" /> Deficit
                </span>
              </div>
            </div>

            {/* Slider to compare RGB orthomosaic vs Spectral Heatmap */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <span className="text-[#94A3B8] whitespace-nowrap">Spectral Blend:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#00FF88]"
                />
                <span className="font-mono text-white tabular-nums w-10 text-right">
                  {sliderPosition}%
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8]">
                Click any field sector to view precision agronomy prescription
              </span>
            </div>
          </div>

          {/* Right Column: Zone Inspector Deep-Dive Card */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase text-[#00FF88] font-bold">
                  Sector Inspection
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    selectedZone.status === 'optimal'
                      ? 'bg-[#00FF88]/15 text-[#00FF88]'
                      : selectedZone.status === 'warning'
                      ? 'bg-[#EAB308]/15 text-[#EAB308]'
                      : 'bg-[#EF4444]/15 text-[#EF4444]'
                  }`}
                >
                  {selectedZone.status}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-1">
                {selectedZone.name}
              </h3>
              <p className="text-xs text-[#94A3B8] mb-6">
                {selectedZone.areaHa} Hectares &bull; {selectedZone.crop}
              </p>

              {/* Spectral Metric Matrix */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#030712]/80 rounded-xl border border-white/10">
                  <div className="text-[11px] text-[#94A3B8] flex items-center justify-between">
                    <span>NDVI Index</span>
                    <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
                  </div>
                  <div className="font-mono text-xl font-bold text-white mt-1">
                    {selectedZone.ndvi}
                  </div>
                  <div className="text-[10px] text-[#00FF88] mt-0.5">Biomass Healthy</div>
                </div>

                <div className="p-3 bg-[#030712]/80 rounded-xl border border-white/10">
                  <div className="text-[11px] text-[#94A3B8] flex items-center justify-between">
                    <span>Chlorophyll</span>
                    <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
                  </div>
                  <div className="font-mono text-xl font-bold text-white mt-1">
                    {selectedZone.chlorophyllIndex}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">NDRE Red Edge</div>
                </div>

                <div className="p-3 bg-[#030712]/80 rounded-xl border border-white/10">
                  <div className="text-[11px] text-[#94A3B8] flex items-center justify-between">
                    <span>Soil Moisture</span>
                    <Droplets className="w-3.5 h-3.5 text-[#3B82F6]" />
                  </div>
                  <div className="font-mono text-xl font-bold text-white mt-1">
                    {selectedZone.soilMoisturePercent}%
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Root Zone Depth</div>
                </div>

                <div className="p-3 bg-[#030712]/80 rounded-xl border border-white/10">
                  <div className="text-[11px] text-[#94A3B8] flex items-center justify-between">
                    <span>Canopy Temp</span>
                    <Thermometer className="w-3.5 h-3.5 text-[#F59E0B]" />
                  </div>
                  <div className="font-mono text-xl font-bold text-white mt-1">
                    {selectedZone.canopyTempC}&deg;C
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">Thermal Baseline</div>
                </div>
              </div>

              {/* Agronomic AI Recommendation Box */}
              <div className="p-4 bg-[#102419] rounded-2xl border border-[#00FF88]/30 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00FF88] mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Agronomic Recommendation</span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {selectedZone.recommendation}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleExportPrescription}
                className="w-full py-3 px-4 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#030712] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,255,136,0.25)]"
              >
                <Download className="w-4 h-4" />
                <span>Export ISOXML Prescription</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  PieChart,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Cpu,
  BarChart3
} from 'lucide-react';

export const IncomePredictionAndSegmentation: React.FC = () => {
  const navigate = useNavigate();

  // Mini Income Estimator State
  const [farmSize, setFarmSize] = useState<number>(6.5);
  const [enterprise, setEnterprise] = useState<string>('cereal'); // cereal, oilseed, horticulture, mixed
  const [precisionTier, setPrecisionTier] = useState<string>('agriai'); // traditional, agriai

  // Segment Selection
  const [selectedCohort, setSelectedCohort] = useState<number>(0);

  // Form input unique IDs for accessibility
  const farmSizeId = useId();
  const enterpriseId = useId();

  // Calculations
  const baseYieldPerHa = {
    cereal: 4.8,
    oilseed: 2.6,
    horticulture: 18.5,
    mixed: 5.4,
  }[enterprise as 'cereal' | 'oilseed' | 'horticulture' | 'mixed'] || 4.8;

  const basePricePerTonne = {
    cereal: 24000,
    oilseed: 52000,
    horticulture: 38000,
    mixed: 30000,
  }[enterprise as 'cereal' | 'oilseed' | 'horticulture' | 'mixed'] || 24000;

  const yieldMultiplier = precisionTier === 'agriai' ? 1.22 : 1.0;
  const costSavingsPerHa = precisionTier === 'agriai' ? 14500 : 0;

  const projectedGross = Math.round(farmSize * baseYieldPerHa * yieldMultiplier * basePricePerTonne);
  const totalCost = Math.round(farmSize * 45000 - farmSize * costSavingsPerHa);
  const projectedNet = Math.max(0, projectedGross - totalCost);
  const valueAdded = Math.round(farmSize * costSavingsPerHa + farmSize * baseYieldPerHa * 0.22 * basePricePerTonne);

  const cohorts = [
    {
      id: 0,
      code: 'Cohort 0',
      name: 'Commercial Grain & Cereal Producers',
      share: '28%',
      avgLand: '14.5 ha',
      annualIncome: '₹18.5L',
      agriAdoption: 'High Precision Drone Sprayers',
      color: '#00FF88',
      description: 'Capital-equipped growers with mechanized combines and autonomous RTK sprayers, targeting maximum commodity margins.',
    },
    {
      id: 1,
      code: 'Cohort 1',
      name: 'High-Value Horticulture & Orchards',
      share: '22%',
      avgLand: '5.8 ha',
      annualIncome: '₹24.2L',
      agriAdoption: 'Thermal Canopy & Drip Automation',
      color: '#06B6D4',
      description: 'Intensive fruit, vegetable, and spice growers leveraging multispectral imagery for defect-free export grades.',
    },
    {
      id: 2,
      code: 'Cohort 2',
      name: 'Integrated Mixed Crop-Livestock',
      share: '20%',
      avgLand: '4.2 ha',
      annualIncome: '₹9.4L',
      agriAdoption: 'Forage Biomass & Nitrogen Mapping',
      color: '#8B5CF6',
      description: 'Synergistic farms recycling livestock manure and rotating pulses to maintain continuous seasonal cash flow.',
    },
    {
      id: 3,
      code: 'Cohort 3',
      name: 'Emerging Smallholder Innovators',
      share: '18%',
      avgLand: '2.4 ha',
      annualIncome: '₹4.8L',
      agriAdoption: 'Community Drone Co-op Flights',
      color: '#F59E0B',
      description: 'Forward-looking smallholders participating in collective aerial drone scouting to minimize pesticide costs.',
    },
    {
      id: 4,
      code: 'Cohort 4',
      name: 'Subsistence Household Farming',
      share: '12%',
      avgLand: '1.2 ha',
      annualIncome: '₹2.1L',
      agriAdoption: 'Satellite Advisory & SMS Alerts',
      color: '#EF4444',
      description: 'Family-centered plots focused on staple nutrition resilience, transitioning toward micro-market surpluses.',
    },
  ];

  return (
    <section id="income-segmentation" className="py-20 sm:py-28 bg-[#07110C] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Machine Learning Models</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Income prediction and farmer segmentation.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] mt-4 leading-relaxed">
            AgriAI classifies over 20,000 grower profiles to benchmark yields, anticipate input
            costs, and forecast net harvest profits before planting begins.
          </p>
        </div>

        {/* 2-Column Layout: Mini Predictor (Left 6 Cols) + Peer Cohorts (Right 6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Live Interactive Income Estimator */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00FF88]/15 text-[#00FF88] flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Harvest Profit Estimator</h3>
                    <p className="text-[11px] text-[#94A3B8]">Powered by AgriAI Regressor ML v2.4</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00FF88]/15 text-[#00FF88]">
                  94.8% ML R² Score
                </span>
              </div>

              {/* Input: Farm Size Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <label htmlFor={farmSizeId} className="text-[#CBD5E1] font-medium cursor-pointer">
                    Total Cultivated Land:
                  </label>
                  <span className="font-mono text-sm font-bold text-white tabular-nums">
                    {farmSize} Hectares
                  </span>
                </div>
                <input
                  id={farmSizeId}
                  type="range"
                  min="0.5"
                  max="35"
                  step="0.5"
                  value={farmSize}
                  onChange={(e) => setFarmSize(Number(e.target.value))}
                  className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#00FF88]"
                  aria-label="Cultivated land in hectares"
                />
                <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono mt-1">
                  <span>0.5 ha</span>
                  <span>15 ha</span>
                  <span>35 ha</span>
                </div>
              </div>

              {/* Input: Enterprise Type */}
              <div className="mb-6">
                <label htmlFor={enterpriseId} className="block text-xs text-[#CBD5E1] font-medium mb-2">
                  Primary Enterprise / Crop Category:
                </label>
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Primary Enterprise">
                  {[
                    { id: 'cereal', label: 'Cereal & Wheat' },
                    { id: 'oilseed', label: 'Soybean & Oilseed' },
                    { id: 'horticulture', label: 'High-Value Orchard' },
                    { id: 'mixed', label: 'Integrated Mixed' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEnterprise(item.id)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                        enterprise === item.id
                          ? 'bg-[#00FF88]/20 border-[#00FF88] text-white shadow-xs'
                          : 'bg-[#030712]/60 border-white/10 text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input: Precision Tier Toggle */}
              <div className="mb-8">
                <span className="block text-xs text-[#CBD5E1] font-medium mb-2">
                  Agronomy Technology Baseline:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPrecisionTier('traditional')}
                    className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      precisionTier === 'traditional'
                        ? 'bg-white/15 border-white/40 text-white'
                        : 'bg-[#030712]/60 border-white/10 text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Traditional Scouting
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrecisionTier('agriai')}
                    className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-center gap-1.5 ${
                      precisionTier === 'agriai'
                        ? 'bg-[#00FF88] text-[#030712] border-[#00FF88] font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                        : 'bg-[#030712]/60 border-white/10 text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AgriAI Drone Precision</span>
                  </button>
                </div>
              </div>

              {/* Calculated Outputs Card */}
              <div className="p-5 bg-[#030712]/90 rounded-2xl border border-white/10 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#94A3B8]">Projected Net Harvest Profit:</span>
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#00FF88] tabular-nums">
                    ₹{projectedNet.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10 text-[#CBD5E1]">
                  <span>AgriAI Value Protection:</span>
                  <span className="font-mono font-bold text-[#42F58D]">
                    +₹{valueAdded.toLocaleString('en-IN')} saved / gained
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs text-[#94A3B8]">
                  <span>Estimated Total Output:</span>
                  <span className="font-mono text-white">
                    {(farmSize * baseYieldPerHa * yieldMultiplier).toFixed(1)} tonnes
                  </span>
                </div>
              </div>
            </div>

            {/* Launch full ML income tool button */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#94A3B8]">Want to test 12 multi-factor variables?</span>
              <button
                type="button"
                id="cta-open-income-full-btn"
                onClick={() => navigate('/income-prediction')}
                className="px-4 py-2 rounded-xl bg-[#00FF88]/20 hover:bg-[#00FF88]/30 text-[#00FF88] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-[#00FF88]/40"
              >
                <span>Open Full ML Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Farmer Segmentation Cohorts Breakdown */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Farmer Segmentation Cohorts</h3>
                    <p className="text-[11px] text-[#94A3B8]">20,000 Agricultural Records Clustered</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/farmer-clustering')}
                  className="text-xs font-semibold text-[#00FF88] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Explore Clusters</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cohort Selector Tabs */}
              <div className="space-y-2.5 mb-6">
                {cohorts.map((cohort) => {
                  const isSelected = selectedCohort === cohort.id;
                  return (
                    <button
                      key={cohort.id}
                      type="button"
                      onClick={() => setSelectedCohort(cohort.id)}
                      className={`w-full p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#102419] border-[#00FF88]/50 shadow-sm'
                          : 'bg-[#030712]/50 border-white/5 hover:border-white/20 hover:bg-[#0a1610]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: cohort.color, boxShadow: `0 0 8px ${cohort.color}` }}
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">
                            {cohort.code} &ndash; {cohort.name}
                          </div>
                          <div className="text-[11px] text-[#94A3B8] font-mono mt-0.5">
                            {cohort.avgLand} avg &bull; {cohort.annualIncome}/yr
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white shrink-0">
                        {cohort.share}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Cohort Deep Dive Callout */}
              <div className="p-4 bg-[#030712]/90 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-white">
                    {cohorts[selectedCohort].code}: Strategic Profile
                  </span>
                  <span
                    className="font-mono font-bold text-xs"
                    style={{ color: cohorts[selectedCohort].color }}
                  >
                    {cohorts[selectedCohort].share} of Market
                  </span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed mb-3">
                  {cohorts[selectedCohort].description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#00FF88]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Deployment: {cohorts[selectedCohort].agriAdoption}</span>
                </div>
              </div>
            </div>

            {/* Navigation to Full Cluster Analytics */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#94A3B8]">K-Means 5-Cluster Model Verified</span>
              <button
                type="button"
                onClick={() => navigate('/cluster-summary')}
                className="text-xs font-bold text-[#00FF88] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View Full Peer Cohort Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

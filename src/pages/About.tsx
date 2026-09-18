import React, { useState } from 'react';
import {
  Info,
  Server,
  Cpu,
  Database,
  ExternalLink,
  CheckCircle2,
  Sliders,
  Sparkles,
  Zap,
  Tag,
  Copy,
  Check,
  Sprout
} from 'lucide-react';
import { motion } from 'motion/react';
import { getRenderBaseUrl, setRenderBaseUrl } from '../services/api';

export const About: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState(getRenderBaseUrl());
  const [savedStatus, setSavedStatus] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setRenderBaseUrl(currentUrl);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(text);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const modelFields = [
    {
      name: 'farming_system',
      type: 'Categorical',
      dataType: 'string',
      range: '5 defined systems',
      desc: 'Primary agricultural management framework (e.g. Commercial Crop, Mixed Farming, Livestock Specialist).',
    },
    {
      name: 'head_of_household_age',
      type: 'Demographic',
      dataType: 'integer',
      range: '18 – 95 years',
      desc: 'Age of primary farm decision-maker in completed years, acting as a proxy for generational agronomic experience.',
    },
    {
      name: 'land_owned_hectares',
      type: 'Acreage',
      dataType: 'float',
      range: '0.1 – 500.0 ha',
      desc: 'Total cultivable arable land holdings measured in metric hectares (1 hectare ≈ 2.471 standard acres).',
    },
    {
      name: 'fertilizer_used_kg_per_hectare',
      type: 'Chemical Inputs',
      dataType: 'float',
      range: '0 – 800 kg/ha',
      desc: 'Total applied Nitrogen, Phosphorus, Potassium (NPK) and micronutrient compound volumes per hectare.',
    },
    {
      name: 'goats_number',
      type: 'Small Ruminants',
      dataType: 'integer',
      range: '0 – 250 head',
      desc: 'Total count of owned herd goats contributing to short-cycle liquidity and organic manure generation.',
    },
    {
      name: 'sheep_number',
      type: 'Small Ruminants',
      dataType: 'integer',
      range: '0 – 250 head',
      desc: 'Total count of domestic sheep maintained for wool, meat, and seasonal festival markets.',
    },
    {
      name: 'livestock_eggs_per_week',
      type: 'Poultry Yield',
      dataType: 'integer',
      range: '0 – 2,500 eggs',
      desc: 'Weekly harvested poultry egg units yielding steady recurrent household operating cashflows.',
    },
    {
      name: 'livestock_milk_litres_per_week',
      type: 'Dairy Output',
      dataType: 'float',
      range: '0 – 1,500 litres',
      desc: 'Weekly dairy output in liquid litres supporting dietary sustenance and local cooperative sales.',
    },
    {
      name: 'predicted_income_ngn',
      type: 'Output Target (Regression)',
      dataType: 'float (NGN)',
      range: 'Annual Revenue',
      desc: 'Target regression outcome forecasting net agricultural earnings with parallel Indian Rupee (INR) conversion.',
    },
    {
      name: 'cluster_id & archetype',
      type: 'Output Target (Clustering)',
      dataType: 'integer (0 – 4)',
      range: '5 Cohorts',
      desc: 'K-Means unsupervised cluster index mapping household demographics into targeted support personas.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-5xl mx-auto space-y-6 pb-8"
    >
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 glass-card border border-white/10 shadow-2xl">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#00FF88]/10 blur-[90px] pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 opacity-5 pointer-events-none">
          <Sprout className="w-56 h-56 text-[#00FF88]" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-bold text-xs uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 text-[#00FF88]" />
            <span>About AgriAI Platform</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F1F5F9] tracking-tight leading-tight">
            Data-Driven Agriculture for a Greener Tomorrow
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            AgriAI is a dual-engine agricultural machine learning platform that empowers smallholders, commercial producers, and extension agents with predictive economic forecasts and demographic cohort clustering.
          </p>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model 1: Regression */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#00FF88]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F1F5F9]">Income Regression Model</h2>
              <span className="text-xs text-[#00FF88] font-semibold">
                R&sup2; Score: 0.86 &bull; Supervised ML
              </span>
            </div>
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Estimates annual net household revenue in Nigerian Naira (NGN) and converts to Indian Rupee (INR) based on 8 multivariate agricultural vectors: land size, chemical input rates, livestock quantities, and animal dairy/egg productivity.
          </p>

          {/* Endpoint Field */}
          <div className="p-3 bg-[#0B0F14] text-[#F1F5F9] rounded-xl border border-white/10 text-xs font-mono flex items-center justify-between">
            <span className="font-bold text-[#00FF88]">
              POST /predict
            </span>
            <span className="text-[10px] text-[#94A3B8] font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10">
              Regression Endpoint
            </span>
          </div>
        </div>

        {/* Model 2: Clustering */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] flex items-center justify-center">
              <Database className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F1F5F9]">Farmer Clustering Model</h2>
              <span className="text-xs text-[#06B6D4] font-semibold">
                Silhouette Score: 0.72 &bull; Unsupervised K-Means
              </span>
            </div>
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Groups farming households into 5 distinct behavioral archetypes: Commercial, Mixed, Livestock-Focused, Smallholder, and Subsistence, providing targeted agronomic interventions.
          </p>

          {/* Endpoint Field */}
          <div className="p-3 bg-[#0B0F14] text-[#F1F5F9] rounded-xl border border-white/10 text-xs font-mono flex items-center justify-between">
            <span className="font-bold text-[#06B6D4]">
              POST /cluster
            </span>
            <span className="text-[10px] text-[#94A3B8] font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10">
              Clustering Endpoint
            </span>
          </div>
        </div>
      </div>

      {/* Backend API Configuration */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-card border border-white/10 shadow-xl space-y-4">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-base sm:text-lg">
            <Server className="w-5 h-5 text-[#00FF88]" />
            <h2>Render Deployment &amp; Endpoint Config</h2>
          </div>
          <span className="self-start sm:self-auto text-[11px] font-bold text-[#00FF88] bg-[#00FF88]/15 px-3 py-1 rounded-full border border-[#00FF88]/30 flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Active Service URL
          </span>
        </div>

        <p className="relative z-10 text-xs text-[#94A3B8] leading-relaxed max-w-3xl">
          The machine learning models are deployed on Render running FastAPI and Uvicorn. You can customize the base endpoint below if you re-deploy or use a custom domain.
        </p>

        {/* URL Input Field */}
        <form onSubmit={handleSaveUrl} className="relative z-10 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="url"
              id="about-render-url-input"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs font-mono text-[#F1F5F9] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#00FF88] transition-all"
              placeholder="https://agriculture-ml-model-bb2i.onrender.com"
              required
            />
          </div>
          <button
            type="submit"
            id="about-update-url-btn"
            className="px-5 py-2.5 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black rounded-xl transition-all shadow-sm shadow-[#00FF88]/20 shrink-0 cursor-pointer"
          >
            {savedStatus ? '✓ Saved Successfully!' : 'Update Render URL'}
          </button>
        </form>

        <div className="relative z-10 pt-1 flex flex-wrap gap-4 text-xs">
          <a
            href="https://agriculture-ml-model-bb2i.onrender.com/docs"
            target="_blank"
            rel="noreferrer"
            className="text-[#00FF88] font-semibold hover:underline flex items-center space-x-1.5 transition-colors"
          >
            <span>Open FastAPI Interactive Swagger Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Feature Dictionary */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-card border border-white/10 shadow-xl space-y-5">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span>Model Feature Dictionary (10 Attributes)</span>
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Each variable below directly powers the neural regression equations and cluster centroids.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#8B5CF6] bg-[#8B5CF6]/15 px-3 py-1 rounded-full border border-[#8B5CF6]/30 shadow-xs w-fit">
            10 Model Inputs &amp; Outputs
          </span>
        </div>

        {/* Grid of Each Feature Field Card */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {modelFields.map((field) => {
            const isCopied = copiedField === field.name;
            return (
              <div
                key={field.name}
                id={`field-card-${field.name}`}
                onClick={() => handleCopy(field.name)}
                className="group relative p-4 rounded-2xl bg-[#0B0F14] border border-white/10 hover:border-[#00FF88]/50 transition-all cursor-pointer shadow-xs"
                title="Click to copy parameter name"
              >
                {/* Header of Field Card */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono font-bold text-xs text-[#F1F5F9] group-hover:text-[#00FF88] transition-colors truncate">
                      {field.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-semibold text-[#06B6D4] bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-2 py-0.5 rounded-full">
                      {field.type}
                    </span>
                    <button
                      type="button"
                      className="p-1 text-[#94A3B8] group-hover:text-white transition-colors rounded"
                      aria-label="Copy field name"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-[#00FF88]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#94A3B8] text-[11px] leading-relaxed mb-2.5">
                  {field.desc}
                </p>

                {/* Footer specs of the field */}
                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-white/10 font-mono">
                  <span className="text-[#00FF88] font-semibold">Type: {field.dataType}</span>
                  <span className="text-[#94A3B8] font-semibold">{field.range}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

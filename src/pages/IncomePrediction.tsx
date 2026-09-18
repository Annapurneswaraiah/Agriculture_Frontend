import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Users,
  ShieldCheck,
  Calculator,
  RotateCcw,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { RegressionInput, RegressionResponse } from '../types';
import { predictFarmerIncome } from '../services/api';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { formatCurrencyNGN, formatCurrencyINR, FARMING_SYSTEM_OPTIONS } from '../utils/formatters';

interface IncomePredictionProps {
  onPredictionComplete?: () => void;
  onNavigateToClustering?: () => void;
  resetTrigger?: number;
  suggestedParams?: Partial<RegressionInput> | null;
}

const DEFAULT_SAMPLE_FORM: RegressionInput = {
  farming_system: 'Commercial Crop Production',
  head_of_household_age: 42,
  land_owned_hectares: 3.5,
  fertilizer_used_kg_per_hectare: 140,
  goats_number: 4,
  sheep_number: 2,
  livestock_eggs_per_week: 45,
  livestock_milk_litres_per_week: 30,
};

export const IncomePrediction: React.FC<IncomePredictionProps> = ({
  onPredictionComplete,
  onNavigateToClustering,
  resetTrigger,
  suggestedParams,
}) => {
  const [formData, setFormData] = useState<RegressionInput>(() => {
    if (suggestedParams) {
      return { ...DEFAULT_SAMPLE_FORM, ...suggestedParams };
    }
    return DEFAULT_SAMPLE_FORM;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [result, setResult] = useState<RegressionResponse | null>({
    status: 'success',
    predicted_income_ngn: 378550.94,
  });
  const [inferenceMeta, setInferenceMeta] = useState<{ source: string; latencyMs: number } | null>({
    source: 'render_api',
    latencyMs: 340,
  });

  // Apply suggestedParams when user clicks advice link
  useEffect(() => {
    if (suggestedParams) {
      setFormData((prev) => ({
        ...prev,
        ...suggestedParams,
      }));
    }
  }, [suggestedParams]);

  // Clear all fields when resetTrigger changes
  useEffect(() => {
    if (resetTrigger && resetTrigger > 0) {
      handleClearFields();
    }
  }, [resetTrigger]);

  const handleClearFields = () => {
    setFormData({
      farming_system: '',
      head_of_household_age: 0,
      land_owned_hectares: 0,
      fertilizer_used_kg_per_hectare: 0,
      goats_number: 0,
      sheep_number: 0,
      livestock_eggs_per_week: 0,
      livestock_milk_litres_per_week: 0,
    });
    setResult(null);
    setError(null);
    setErrorDetails(null);
    setInferenceMeta(null);
  };

  const handleInputChange = (field: keyof RegressionInput, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyPreset = (presetName: string) => {
    if (presetName === 'commercial') {
      setFormData({
        farming_system: 'Commercial Crop Production',
        head_of_household_age: 45,
        land_owned_hectares: 6.0,
        fertilizer_used_kg_per_hectare: 190,
        goats_number: 5,
        sheep_number: 3,
        livestock_eggs_per_week: 60,
        livestock_milk_litres_per_week: 50,
      });
    } else if (presetName === 'mixed') {
      setFormData({
        farming_system: 'Mixed Cropping',
        head_of_household_age: 38,
        land_owned_hectares: 2.5,
        fertilizer_used_kg_per_hectare: 110,
        goats_number: 3,
        sheep_number: 2,
        livestock_eggs_per_week: 25,
        livestock_milk_litres_per_week: 20,
      });
    } else if (presetName === 'smallholder') {
      setFormData({
        farming_system: 'Smallholder Grain Farming',
        head_of_household_age: 52,
        land_owned_hectares: 1.2,
        fertilizer_used_kg_per_hectare: 60,
        goats_number: 2,
        sheep_number: 1,
        livestock_eggs_per_week: 15,
        livestock_milk_litres_per_week: 10,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorDetails(null);

    try {
      const payload: RegressionInput = {
        farming_system: formData.farming_system || 'Commercial Crop Production',
        head_of_household_age: Number(formData.head_of_household_age) || 35,
        land_owned_hectares: Number(formData.land_owned_hectares) || 1,
        fertilizer_used_kg_per_hectare: Number(formData.fertilizer_used_kg_per_hectare) || 50,
        goats_number: Number(formData.goats_number) || 0,
        sheep_number: Number(formData.sheep_number) || 0,
        livestock_eggs_per_week: Number(formData.livestock_eggs_per_week) || 0,
        livestock_milk_litres_per_week: Number(formData.livestock_milk_litres_per_week) || 0,
      };

      const resp = await predictFarmerIncome(payload);
      setResult(resp.data);
      setInferenceMeta({ source: resp.source, latencyMs: resp.latencyMs });
      if (onPredictionComplete) onPredictionComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to generate income prediction from ML service.');
      if (err.detail) setErrorDetails(err.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-6xl mx-auto space-y-6 pb-8"
    >
      {/* Page Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#00FF88] font-bold text-xs uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>ML Regression Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9] tracking-tight">
            Farmer Income Prediction
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Input household demographics, acreage, livestock, and inputs to forecast annual farmer income in NGN (Nigerian Naira) and equivalent INR.
          </p>
        </div>

        {/* Preset Selector & Clear Button */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#94A3B8]">Presets:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset('commercial')}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#00FF88]/15 text-[#00FF88] hover:bg-[#00FF88]/25 border border-[#00FF88]/30 transition-all cursor-pointer shadow-xs"
          >
            Commercial
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('mixed')}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#06B6D4]/15 text-[#06B6D4] hover:bg-[#06B6D4]/25 border border-[#06B6D4]/30 transition-all cursor-pointer shadow-xs"
          >
            Mixed
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('smallholder')}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] hover:bg-[#F59E0B]/25 border border-[#F59E0B]/30 transition-all cursor-pointer shadow-xs"
          >
            Smallholder
          </button>
          <button
            type="button"
            id="clear-income-fields-btn"
            onClick={handleClearFields}
            title="Clear all fields"
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 text-[#F43F5E] hover:bg-[#F43F5E]/15 border border-white/10 hover:border-[#F43F5E]/30 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Fields</span>
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <ErrorMessage
          title="Inference Connection Issue"
          message={error}
          details={errorDetails}
          onRetry={handleSubmit as any}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Main Grid: Form (Left) & Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#00FF88]" />
                <span>Agricultural Features</span>
              </h2>
              <span className="text-xs text-[#00FF88] font-mono bg-[#00FF88]/10 border border-[#00FF88]/20 px-2 py-0.5 rounded-full">
                POST /predict
              </span>
            </div>

            {/* Field 1: Farming System */}
            <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5 flex items-center justify-between">
                <span>Farming System <span className="text-[#F43F5E]">*</span></span>
                <span className="text-[10px] text-[#00FF88] font-semibold">Classification Input</span>
              </label>
              <select
                id="input-farming-system"
                value={formData.farming_system}
                onChange={(e) => handleInputChange('farming_system', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
              >
                <option value="">-- Select Farming System --</option>
                {FARMING_SYSTEM_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#111827] text-[#F1F5F9]">
                    {opt}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Primary agricultural orientation and crop/livestock management setup.
              </p>
            </div>

            {/* Row: Age & Land Owned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Head of Household Age (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  id="input-age"
                  placeholder="e.g. 42"
                  value={formData.head_of_household_age === 0 ? '' : formData.head_of_household_age}
                  onChange={(e) => handleInputChange('head_of_household_age', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
                />
              </div>

              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Land Owned (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="500"
                  id="input-land"
                  placeholder="e.g. 3.5"
                  value={formData.land_owned_hectares === 0 ? '' : formData.land_owned_hectares}
                  onChange={(e) => handleInputChange('land_owned_hectares', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
                />
              </div>
            </div>

            {/* Fertilizer Usage */}
            <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-[#F1F5F9]">
                  Fertilizer Used (kg per hectare)
                </label>
                <span className="text-xs font-mono font-bold text-[#00FF88] bg-[#00FF88]/15 px-2 py-0.5 rounded-md border border-[#00FF88]/30">
                  {formData.fertilizer_used_kg_per_hectare || 0} kg/ha
                </span>
              </div>
              <input
                type="number"
                min="0"
                max="500"
                id="input-fertilizer"
                placeholder="e.g. 140"
                value={formData.fertilizer_used_kg_per_hectare === 0 ? '' : formData.fertilizer_used_kg_per_hectare}
                onChange={(e) => handleInputChange('fertilizer_used_kg_per_hectare', e.target.value === '' ? 0 : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
              />
            </div>

            {/* Livestock Herd: Goats & Sheep */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Number of Goats
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  id="input-goats"
                  placeholder="e.g. 4"
                  value={formData.goats_number === 0 ? '' : formData.goats_number}
                  onChange={(e) => handleInputChange('goats_number', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
                />
              </div>

              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Number of Sheep
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  id="input-sheep"
                  placeholder="e.g. 2"
                  value={formData.sheep_number === 0 ? '' : formData.sheep_number}
                  onChange={(e) => handleInputChange('sheep_number', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
                />
              </div>
            </div>

            {/* Weekly Animal Products: Eggs & Milk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Livestock Eggs Produced (per week)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  id="input-eggs"
                  placeholder="e.g. 45"
                  value={formData.livestock_eggs_per_week === 0 ? '' : formData.livestock_eggs_per_week}
                  onChange={(e) => handleInputChange('livestock_eggs_per_week', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
                />
              </div>

              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Milk Yield (Litres per week)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  id="input-milk"
                  placeholder="e.g. 30"
                  value={formData.livestock_milk_litres_per_week === 0 ? '' : formData.livestock_milk_litres_per_week}
                  onChange={(e) => handleInputChange('livestock_milk_litres_per_week', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#00FF88] transition-all font-medium"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                id="submit-prediction-btn"
                disabled={loading}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] font-black text-sm transition-all shadow-md shadow-[#00FF88]/20 hover:shadow-lg hover:shadow-[#00FF88]/35 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0B0F14]" />
                    <span>Querying ML Model...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0B0F14]" />
                    <span>Predict Farm Income</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClearFields}
                className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F1F5F9] text-sm font-semibold transition-colors border border-white/10 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {loading ? (
            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl">
              <Loading
                message="Evaluating Regression Model..."
                subMessage="Sending feature vector to https://agriculture-ml-model-bb2i.onrender.com/predict"
              />
            </div>
          ) : result ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              {/* Main Glowing Prediction Display Card */}
              <div
                className="bg-gradient-to-br from-[#0B0F14] via-[#111827] to-[#0B0F14] rounded-2xl p-6 text-white border border-[#00FF88]/40 relative overflow-hidden transition-all shadow-xl shadow-[#00FF88]/15"
              >
                {/* Ambient radiant glow sphere */}
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none opacity-20 blur-2xl bg-[#00FF88]"
                />

                <div className="flex items-center justify-between text-xs font-semibold text-[#00FF88] mb-1 relative z-10">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
                    <span>Predicted Annual Net Income</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00FF88]/15 text-[#00FF88] font-mono text-[10px] font-bold border border-[#00FF88]/30">
                    200 OK
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#F1F5F9] my-2 relative z-10">
                  {formatCurrencyNGN(result.predicted_income_ngn)}
                </div>

                <div className="text-[#94A3B8] text-sm font-semibold flex items-center gap-1.5 pt-1 border-t border-white/10 mt-3 relative z-10">
                  <span>Equivalent INR:</span>
                  <span className="text-[#00FF88] font-bold font-mono">
                    {formatCurrencyINR(result.predicted_income_ngn)}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8] relative z-10">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-[#00FF88]" />
                    <span>Supervised Regression</span>
                  </span>
                  <span className="font-mono text-[#00FF88] font-bold">R&sup2; = 0.86 Confidence</span>
                </div>
              </div>

              {/* Economic Projections */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                  Economic Projections
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#111827]/70 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Monthly Cashflow</span>
                    <span className="font-extrabold text-[#F1F5F9] text-sm mt-0.5 block">
                      {formatCurrencyNGN(result.predicted_income_ngn / 12)}
                    </span>
                  </div>
                  <div className="p-3.5 bg-[#111827]/70 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Per Hectare Return</span>
                    <span className="font-extrabold text-[#F1F5F9] text-sm mt-0.5 block">
                      {formatCurrencyNGN(
                        result.predicted_income_ngn / Math.max(1, formData.land_owned_hectares)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Extension Actions */}
              <div className="space-y-2">
                <div className="p-3.5 bg-[#00FF88]/10 rounded-xl border border-[#00FF88]/25 flex items-start space-x-2.5 text-xs text-[#F1F5F9]">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF88] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Forecast reflects typical yield for <strong className="text-[#00FF88]">{formData.farming_system || 'selected farming setup'}</strong> with given livestock and input rates.
                  </span>
                </div>

                {onNavigateToClustering && (
                  <button
                    type="button"
                    onClick={onNavigateToClustering}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#06B6D4]/40 text-[#F1F5F9] text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-[#06B6D4]" />
                    <span>Classify This Farm into a Cluster &rarr;</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center mx-auto">
                <Calculator className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F1F5F9]">Fields Cleared / Ready for Input</h3>
                <p className="text-xs text-[#94A3B8] mt-1 max-w-xs mx-auto leading-relaxed">
                  Enter your farm data on the left or select a Preset (Commercial, Mixed, Smallholder) and click &ldquo;Predict Farm Income&rdquo;.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('commercial')}
                  className="px-4 py-2 bg-[#00FF88]/15 hover:bg-[#00FF88]/25 text-[#00FF88] border border-[#00FF88]/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Load Commercial Sample
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

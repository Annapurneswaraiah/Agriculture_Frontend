import React, { useState, useEffect } from 'react';
import {
  Users,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  Award,
  Layers,
  RotateCcw,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { ClusteringInput, ClusteringResponse } from '../types';
import { predictFarmerCluster } from '../services/api';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { getClusterData, CLUSTER_SEGMENTS, FARMING_SYSTEM_OPTIONS } from '../utils/formatters';

interface FarmerClusteringProps {
  onPredictionComplete?: () => void;
  onNavigateToSummary?: () => void;
  resetTrigger?: number;
  suggestedParams?: Partial<ClusteringInput> | null;
}

const DEFAULT_SAMPLE_CLUSTERING: ClusteringInput = {
  farming_system: 'Mixed Cropping',
  head_of_household_age: 38,
  land_owned_hectares: 2.8,
  fertilizer_used_kg_per_hectare: 110,
  goats_number: 4,
  sheep_number: 2,
  livestock_eggs_per_week: 30,
  livestock_milk_litres_per_week: 20,
  additionalProp1: {},
};

export const FarmerClustering: React.FC<FarmerClusteringProps> = ({
  onPredictionComplete,
  onNavigateToSummary,
  resetTrigger,
  suggestedParams,
}) => {
  const [formData, setFormData] = useState<ClusteringInput>(() => {
    if (suggestedParams) {
      return { ...DEFAULT_SAMPLE_CLUSTERING, ...suggestedParams };
    }
    return DEFAULT_SAMPLE_CLUSTERING;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClusteringResponse | null>({
    status: 'success',
    cluster: 1,
    farmer_segment: 'Group_1',
  });
  const [inferenceMeta, setInferenceMeta] = useState<{ source: string; latencyMs: number } | null>({
    source: 'render_api',
    latencyMs: 290,
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

  // Clear fields when resetTrigger changes (e.g. on logout)
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
      additionalProp1: {},
    });
    setResult(null);
    setError(null);
    setInferenceMeta(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyPreset = (clusterId: number) => {
    if (clusterId === 0) {
      setFormData({
        farming_system: 'Commercial Crop Production',
        head_of_household_age: 46,
        land_owned_hectares: 6.5,
        fertilizer_used_kg_per_hectare: 210,
        goats_number: 3,
        sheep_number: 2,
        livestock_eggs_per_week: 70,
        livestock_milk_litres_per_week: 45,
        additionalProp1: {},
      });
    } else if (clusterId === 1) {
      setFormData({
        farming_system: 'Mixed Cropping',
        head_of_household_age: 38,
        land_owned_hectares: 2.8,
        fertilizer_used_kg_per_hectare: 110,
        goats_number: 4,
        sheep_number: 2,
        livestock_eggs_per_week: 30,
        livestock_milk_litres_per_week: 20,
        additionalProp1: {},
      });
    } else if (clusterId === 2) {
      setFormData({
        farming_system: 'Livestock & Pastoral Farming',
        head_of_household_age: 44,
        land_owned_hectares: 1.8,
        fertilizer_used_kg_per_hectare: 40,
        goats_number: 14,
        sheep_number: 8,
        livestock_eggs_per_week: 80,
        livestock_milk_litres_per_week: 65,
        additionalProp1: {},
      });
    } else if (clusterId === 3) {
      setFormData({
        farming_system: 'Smallholder Grain Farming',
        head_of_household_age: 51,
        land_owned_hectares: 1.4,
        fertilizer_used_kg_per_hectare: 65,
        goats_number: 2,
        sheep_number: 1,
        livestock_eggs_per_week: 15,
        livestock_milk_litres_per_week: 10,
        additionalProp1: {},
      });
    } else {
      setFormData({
        farming_system: 'Subsistence Multi-Cropping',
        head_of_household_age: 58,
        land_owned_hectares: 0.8,
        fertilizer_used_kg_per_hectare: 20,
        goats_number: 1,
        sheep_number: 0,
        livestock_eggs_per_week: 5,
        livestock_milk_litres_per_week: 0,
        additionalProp1: {},
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await predictFarmerCluster(formData);
      setResult(resp.data);
      setInferenceMeta({ source: resp.source, latencyMs: resp.latencyMs });
      if (onPredictionComplete) onPredictionComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to infer farmer clustering.');
    } finally {
      setLoading(false);
    }
  };

  const currentSegment = result ? getClusterData(result.cluster ?? result.farmer_segment) : CLUSTER_SEGMENTS[1];

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
          <div className="flex items-center space-x-2 text-[#06B6D4] font-bold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>ML Unsupervised Clustering Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9] tracking-tight">
            Farmer Clustering &amp; Segmentation
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Identify which agricultural cohort and demographic peer group a farm belongs to using machine learning clustering centroids.
          </p>
        </div>

        {/* Presets & Clear Button with glowing segment colors */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#94A3B8]">Test Profiles:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset(0)}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#00FF88]/15 text-[#00FF88] hover:bg-[#00FF88]/25 border border-[#00FF88]/30 transition-all cursor-pointer shadow-xs"
          >
            Group 0 (Commercial)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset(1)}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#06B6D4]/15 text-[#06B6D4] hover:bg-[#06B6D4]/25 border border-[#06B6D4]/30 transition-all cursor-pointer shadow-xs"
          >
            Group 1 (Mixed)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset(2)}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 transition-all cursor-pointer shadow-xs"
          >
            Group 2 (Livestock)
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset(3)}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] hover:bg-[#F59E0B]/25 border border-[#F59E0B]/30 transition-all cursor-pointer shadow-xs"
          >
            Group 3 (Smallholder)
          </button>
          <button
            type="button"
            id="clear-clustering-fields-btn"
            onClick={handleClearFields}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 text-[#F43F5E] hover:bg-[#F43F5E]/15 border border-white/10 hover:border-[#F43F5E]/30 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Fields</span>
          </button>
        </div>
      </div>

      {error && (
        <ErrorMessage
          title="Clustering Service Error"
          message={error}
          onRetry={handleSubmit as any}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Main Grid: Form (Left) & Result (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#06B6D4]" />
                <span>Input Feature Vector</span>
              </h2>
              <span className="text-xs text-[#06B6D4] font-mono bg-[#06B6D4]/10 border border-[#06B6D4]/20 px-2 py-0.5 rounded-full">
                POST /cluster
              </span>
            </div>

            {/* Farming System */}
            <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5 flex items-center justify-between">
                <span>Farming System</span>
                <span className="text-[10px] text-[#06B6D4] font-semibold">Cohort Classification</span>
              </label>
              <select
                id="cluster-input-farming-system"
                value={formData.farming_system}
                onChange={(e) => handleInputChange('farming_system', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#06B6D4] transition-all font-medium"
              >
                <option value="">-- Select Farming System --</option>
                {FARMING_SYSTEM_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#111827] text-[#F1F5F9]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Land & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Land Owned (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="500"
                  id="cluster-input-land"
                  placeholder="e.g. 2.8"
                  value={formData.land_owned_hectares === 0 ? '' : formData.land_owned_hectares}
                  onChange={(e) => handleInputChange('land_owned_hectares', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#06B6D4] transition-all font-medium"
                />
              </div>

              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Household Age (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  id="cluster-input-age"
                  placeholder="e.g. 38"
                  value={formData.head_of_household_age === 0 ? '' : formData.head_of_household_age}
                  onChange={(e) => handleInputChange('head_of_household_age', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#06B6D4] transition-all font-medium"
                />
              </div>
            </div>

            {/* Fertilizer & Livestock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Fertilizer (kg / ha)
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  id="cluster-input-fertilizer"
                  placeholder="e.g. 110"
                  value={formData.fertilizer_used_kg_per_hectare === 0 ? '' : formData.fertilizer_used_kg_per_hectare}
                  onChange={(e) => handleInputChange('fertilizer_used_kg_per_hectare', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#06B6D4] transition-all font-medium"
                />
              </div>

              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Goats + Sheep Count
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  id="cluster-input-animals"
                  placeholder="e.g. 6"
                  value={
                    (formData.goats_number || 0) + (formData.sheep_number || 0) === 0
                      ? ''
                      : (formData.goats_number || 0) + (formData.sheep_number || 0)
                  }
                  onChange={(e) => {
                    const total = e.target.value === '' ? 0 : Number(e.target.value);
                    handleInputChange('goats_number', Math.ceil(total * 0.6));
                    handleInputChange('sheep_number', Math.floor(total * 0.4));
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#06B6D4] transition-all font-medium"
                />
              </div>
            </div>

            {/* Weekly Outputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Eggs Produced / Week
                </label>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  id="cluster-input-eggs"
                  placeholder="e.g. 30"
                  value={formData.livestock_eggs_per_week === 0 ? '' : formData.livestock_eggs_per_week}
                  onChange={(e) => handleInputChange('livestock_eggs_per_week', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#06B6D4] transition-all font-medium"
                />
              </div>

              <div className="field-card-glow p-3 rounded-2xl bg-[#111827]/60 border border-white/10 transition-all">
                <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">
                  Milk Produced (L / Week)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  id="cluster-input-milk"
                  placeholder="e.g. 20"
                  value={formData.livestock_milk_litres_per_week === 0 ? '' : formData.livestock_milk_litres_per_week}
                  onChange={(e) => handleInputChange('livestock_milk_litres_per_week', e.target.value === '' ? 0 : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-sm text-[#F1F5F9] focus:border-[#06B6D4] transition-all font-medium"
                />
              </div>
            </div>

            {/* Submit & Reset */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                id="submit-clustering-btn"
                disabled={loading}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0B0F14] font-black text-sm transition-all shadow-md shadow-[#06B6D4]/20 hover:shadow-lg hover:shadow-[#06B6D4]/35 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#0B0F14]" />
                    <span>Computing Cluster Centroids...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#0B0F14]" />
                    <span>Classify Farmer Segment</span>
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

        {/* Results Column (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {loading ? (
            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl">
              <Loading
                message="Mapping to K-Means Centroid..."
                subMessage="Matching household and agricultural inputs with 20,000 reference farmer profiles"
              />
            </div>
          ) : result ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              {/* Glowing Segment Result Card */}
              <div
                className="rounded-2xl p-6 text-white border border-white/20 relative overflow-hidden transition-all shadow-xl"
                style={{
                  backgroundColor: `${currentSegment.color}22`,
                  borderColor: currentSegment.color,
                  boxShadow: `0 0 30px ${currentSegment.color}35`,
                }}
              >
                {/* Ambient glow highlight corner */}
                <div
                  className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none opacity-20 blur-2xl"
                  style={{ backgroundColor: currentSegment.color }}
                />

                <div className="flex items-center justify-between text-xs font-semibold text-white/90 mb-2 relative z-10">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]" style={{ color: currentSegment.color }}>
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentSegment.color }} />
                    <span>Assigned Farmer Segment</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold border border-white/20">
                    Silhouette: 0.72
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#F1F5F9] my-1 flex items-center gap-2 relative z-10">
                  <span style={{ color: currentSegment.color }}>{result.farmer_segment || `Group_${result.cluster}`}</span>
                  <span className="opacity-60 font-light">&ndash;</span>
                  <span>{currentSegment.name}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed max-w-lg relative z-10 font-medium">
                  {currentSegment.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#94A3B8] relative z-10 font-medium">
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[#F1F5F9]">
                    Cluster ID: #{result.cluster ?? 1}
                  </span>
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-[#00FF88]">
                    Represents {currentSegment.percentage}% of Regional Population
                  </span>
                </div>
              </div>

              {/* Cohort Benchmark Characteristics */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#06B6D4]" />
                  <span>Cohort Characteristics</span>
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-[#111827]/70 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Typical Land Holding</span>
                    <span className="font-bold text-[#F1F5F9] mt-0.5 block">{currentSegment.characteristics.avgLand}</span>
                  </div>
                  <div className="p-3 bg-[#111827]/70 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Primary Activity</span>
                    <span className="font-bold text-[#F1F5F9] mt-0.5 block">{currentSegment.characteristics.primaryActivity}</span>
                  </div>
                  <div className="p-3 bg-[#111827]/70 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Fertilizer Intensity</span>
                    <span className="font-bold text-[#F1F5F9] mt-0.5 block">{currentSegment.characteristics.fertilizerUsage}</span>
                  </div>
                  <div className="p-3 bg-[#111827]/70 rounded-xl border border-white/10">
                    <span className="text-[#94A3B8] block text-[10px] uppercase font-semibold">Expected Annual Income</span>
                    <span className="font-bold text-[#00FF88] mt-0.5 block">{currentSegment.characteristics.annualIncomeRange}</span>
                  </div>
                </div>
              </div>

              {/* Extension Recommendations */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
                  <span>Strategic Recommendations</span>
                </h4>
                <div className="space-y-2">
                  {currentSegment.recommendations.map((rec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-start gap-2.5 text-xs text-[#F1F5F9]">
                      <CheckCircle2 className="w-4 h-4 text-[#00FF88] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Full Summary Action */}
              {onNavigateToSummary && (
                <button
                  onClick={onNavigateToSummary}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8B5CF6]/40 text-[#F1F5F9] text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <PieChart className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Explore All 5 Cluster Groups in Cluster Insights &rarr;</span>
                </button>
              )}
            </div>
          ) : (
            /* Empty state */
            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] flex items-center justify-center mx-auto">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F1F5F9]">Fields Cleared / Ready for Input</h3>
                <p className="text-xs text-[#94A3B8] mt-1 max-w-xs mx-auto leading-relaxed">
                  Enter your farm characteristics on the left or click one of the Test Profiles (Group 0 to 3) to classify.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyPreset(1)}
                  className="px-4 py-2 bg-[#06B6D4]/15 hover:bg-[#06B6D4]/25 text-[#06B6D4] border border-[#06B6D4]/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Load Group 1 Sample
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

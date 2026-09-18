import React, { useState } from 'react';
import {
  PieChart,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Search,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { CLUSTER_SEGMENTS } from '../utils/formatters';

interface ClusterSummaryProps {
  onSelectClusterForInference?: (clusterId: number) => void;
}

export const ClusterSummary: React.FC<ClusterSummaryProps> = ({
  onSelectClusterForInference,
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<number>(0);
  const [filterQuery, setFilterQuery] = useState('');

  const clusterList = Object.values(CLUSTER_SEGMENTS);
  const filteredClusters = clusterList.filter(
    (c) =>
      c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.groupCode.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const activeCluster = CLUSTER_SEGMENTS[selectedClusterId] || CLUSTER_SEGMENTS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-6xl mx-auto space-y-6 pb-8"
    >
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#8B5CF6] font-bold text-xs uppercase tracking-wider mb-1">
            <PieChart className="w-4 h-4" />
            <span>Dataset Cohorts &amp; Archetypes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9] tracking-tight">
            Cluster Insights &amp; Archetype Profiles
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Detailed breakdown of the 5 distinct farmer cohorts identified across the 20,000 farmer dataset by our unsupervised ML clustering algorithm.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search segments..."
            className="w-full pl-9 pr-3 py-2 bg-[#111827]/80 border border-white/15 rounded-xl text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#8B5CF6] transition-all"
          />
        </div>
      </div>

      {/* Cluster Pills Bar - Segment Glowing Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {clusterList.map((item) => {
          const isSelected = selectedClusterId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedClusterId(item.id)}
              style={{
                borderColor: isSelected ? item.color : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isSelected
                  ? `0 0 0 1px ${item.color}, 0 0 20px ${item.color}35`
                  : undefined,
              }}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#111827] font-semibold'
                  : 'bg-[#111827]/50 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Subtle ambient colored glow wash inside card on select */}
              {isSelected && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{ backgroundColor: item.color }}
                />
              )}

              <div className="flex items-center justify-between mb-2">
                <span
                  className="w-3.5 h-3.5 rounded-full transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}`,
                  }}
                />
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#F1F5F9] border border-white/10">
                  {item.percentage}%
                </span>
              </div>
              <div className="text-xs font-bold text-[#94A3B8]">{item.groupCode}</div>
              <div className="text-sm font-extrabold text-[#F1F5F9] truncate mt-0.5">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Cluster View - Glowing Feature Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Big Feature Card (7 cols) */}
        <div
          className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6 transition-all"
          style={{
            borderTop: `4px solid ${activeCluster.color}`,
            boxShadow: `0 0 35px ${activeCluster.color}20`,
          }}
        >
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className="w-3.5 h-3.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor: activeCluster.color,
                    boxShadow: `0 0 12px ${activeCluster.color}`,
                  }}
                />
                <span className="text-xs font-bold font-mono text-[#94A3B8]">
                  {activeCluster.groupCode}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${activeCluster.color}25`,
                    color: activeCluster.color,
                  }}
                >
                  Active Cohort
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#F1F5F9] mt-1.5">
                {activeCluster.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                {activeCluster.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div
                className="text-3xl font-black"
                style={{ color: activeCluster.color }}
              >
                {activeCluster.percentage}%
              </div>
              <div className="text-[11px] text-[#94A3B8] font-medium">of Population</div>
            </div>
          </div>

          {/* Key Characteristics Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              Archetype Benchmarks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#111827]/70 rounded-2xl border border-white/10">
                <span className="text-[#94A3B8] block text-[10px] font-semibold uppercase">Land Ownership</span>
                <span className="text-sm font-bold text-[#F1F5F9] mt-0.5 block">{activeCluster.characteristics.avgLand}</span>
              </div>
              <div className="p-3.5 bg-[#111827]/70 rounded-2xl border border-white/10">
                <span className="text-[#94A3B8] block text-[10px] font-semibold uppercase">Primary Enterprise</span>
                <span className="text-sm font-bold text-[#F1F5F9] mt-0.5 block">{activeCluster.characteristics.primaryActivity}</span>
              </div>
              <div className="p-3.5 bg-[#111827]/70 rounded-2xl border border-white/10">
                <span className="text-[#94A3B8] block text-[10px] font-semibold uppercase">Livestock Profile</span>
                <span className="text-sm font-bold text-[#F1F5F9] mt-0.5 block">{activeCluster.characteristics.avgLivestock}</span>
              </div>
              <div className="p-3.5 bg-[#111827]/70 rounded-2xl border border-white/10">
                <span className="text-[#94A3B8] block text-[10px] font-semibold uppercase">Fertilizer Rate</span>
                <span className="text-sm font-bold text-[#F1F5F9] mt-0.5 block">{activeCluster.characteristics.fertilizerUsage}</span>
              </div>
              <div className="sm:col-span-2 p-3.5 bg-[#00FF88]/10 rounded-2xl border border-[#00FF88]/25">
                <span className="text-[#00FF88] block text-[10px] font-semibold uppercase">Annual Net Income Range</span>
                <span className="text-base font-extrabold text-[#F1F5F9] mt-0.5 block">{activeCluster.characteristics.annualIncomeRange}</span>
              </div>
            </div>
          </div>

          {/* Policy & Extension Recommendations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              Agronomic &amp; Extension Interventions
            </h3>
            <div className="space-y-2">
              {activeCluster.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 bg-[#111827]/70 rounded-xl border border-white/10 flex items-start space-x-3 text-xs text-[#F1F5F9]">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF88] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Matrix & Dataset Distribution (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Population distribution summary */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#00FF88]" />
                <span>Regional Distribution (20,000 Total)</span>
              </h3>
            </div>

            <div className="space-y-3">
              {clusterList.map((c) => {
                const count = (c.percentage / 100) * 20000;
                const isSelected = selectedClusterId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedClusterId(c.id)}
                    className={`space-y-1.5 p-2.5 rounded-xl transition-all cursor-pointer ${
                      isSelected ? 'bg-white/10 border border-white/15' : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-[#94A3B8] flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: c.color,
                            boxShadow: `0 0 8px ${c.color}`,
                          }}
                        />
                        <span className={isSelected ? 'font-bold text-[#F1F5F9]' : ''}>
                          {c.groupCode} &ndash; {c.name}
                        </span>
                      </span>
                      <span className="font-bold text-[#F1F5F9] font-mono">
                        {count.toLocaleString()} ({c.percentage}%)
                      </span>
                    </div>
                    {/* Glowing progress bar */}
                    <div className="w-full bg-[#0B0F14] h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${c.percentage}%`,
                          backgroundColor: c.color,
                          boxShadow: isSelected ? `0 0 12px ${c.color}` : `0 0 6px ${c.color}80`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model Centroid Info */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-3 text-xs text-[#94A3B8]">
            <h4 className="font-bold text-[#F1F5F9] text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#06B6D4]" />
              <span>Unsupervised Centroid Algorithm</span>
            </h4>
            <p className="leading-relaxed">
              Clusters are partitioned using normalized K-Means clustering with optimal K=5 validated through silhouette scoring (0.72) and Davies-Bouldin index evaluation.
            </p>
            <div className="p-3 bg-[#0B0F14] rounded-xl border border-white/10 font-mono text-[11px] text-[#00FF88]">
              Endpoint: POST https://agriculture-ml-model-bb2i.onrender.com/cluster
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

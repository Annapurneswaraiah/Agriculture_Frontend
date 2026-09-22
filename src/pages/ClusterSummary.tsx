import React, { useState, useMemo } from 'react';
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
  ArrowRight,
  X
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

  const filteredClusters = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return clusterList;
    return clusterList.filter((c) => {
      const matchName = c.name.toLowerCase().includes(q);
      const matchCode = c.groupCode.toLowerCase().includes(q) || c.groupCode.replace('_', ' ').toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      const matchActivity = c.characteristics.primaryActivity.toLowerCase().includes(q);
      const matchLivestock = c.characteristics.avgLivestock.toLowerCase().includes(q);
      const matchFertilizer = c.characteristics.fertilizerUsage.toLowerCase().includes(q);
      const matchIncome = c.characteristics.annualIncomeRange.toLowerCase().includes(q);
      const matchNumber = `group ${c.id}`.includes(q) || `cluster ${c.id}`.includes(q) || `${c.id}` === q;

      return (
        matchName ||
        matchCode ||
        matchDesc ||
        matchActivity ||
        matchLivestock ||
        matchFertilizer ||
        matchIncome ||
        matchNumber
      );
    });
  }, [filterQuery, clusterList]);

  // If selected cluster isn't in filtered list, select the first match (if available)
  const activeCluster = useMemo(() => {
    if (filteredClusters.some((c) => c.id === selectedClusterId)) {
      return CLUSTER_SEGMENTS[selectedClusterId] || CLUSTER_SEGMENTS[0];
    }
    return filteredClusters[0] || CLUSTER_SEGMENTS[0];
  }, [filteredClusters, selectedClusterId]);

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
            <span>Regional Farm Peer Groups &amp; Archetypes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F1F5F9] tracking-tight">
            Peer Group Insights &amp; Farm Archetypes
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Detailed breakdown of the 5 distinct farmer operational cohorts and demographic peer groups identified across 20,000 regional farm holdings.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="cluster-segment-search-input"
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search segments (e.g. Livestock, Mixed)..."
            className="w-full pl-9 pr-8 py-2 bg-[#111827]/80 border border-white/15 rounded-xl text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#00FF88] transition-all"
          />
          {filterQuery ? (
            <button
              type="button"
              id="clear-segment-search-btn"
              onClick={() => setFilterQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white p-0.5 rounded cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#94A3B8]/50 pointer-events-none">
              5 Segments
            </span>
          )}
        </div>
      </div>

      {/* Search Result Summary Badge if filtering */}
      {filterQuery && (
        <div className="flex items-center justify-between px-2 text-xs">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <span>Search results for</span>
            <span className="px-2 py-0.5 rounded-md bg-[#00FF88]/15 text-[#00FF88] font-bold border border-[#00FF88]/30">
              "{filterQuery}"
            </span>
            <span>&bull;</span>
            <span className="font-semibold text-[#F1F5F9]">
              {filteredClusters.length} {filteredClusters.length === 1 ? 'segment' : 'segments'} matched
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFilterQuery('')}
            className="text-xs text-[#00FF88] hover:underline font-semibold cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* Cluster Pills Bar - Segment Glowing Cards */}
      {filteredClusters.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredClusters.map((item) => {
            const isSelected = activeCluster.id === item.id;
            return (
              <button
                key={item.id}
                id={`segment-pill-${item.id}`}
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
      ) : (
        <div className="glass-card rounded-2xl p-8 border border-white/10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#94A3B8]">
            <Search className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-[#F1F5F9]">
            No farmer segments match "{filterQuery}"
          </p>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
            Try searching for archetype names like Commercial, Mixed, Livestock, Smallholder, or Subsistence.
          </p>
          <button
            type="button"
            onClick={() => setFilterQuery('')}
            className="px-4 py-2 rounded-xl bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40 text-xs font-bold hover:bg-[#00FF88]/30 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Search Filter</span>
          </button>
        </div>
      )}

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
              {filterQuery && (
                <span className="text-[11px] font-bold text-[#00FF88] px-2 py-0.5 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30">
                  {filteredClusters.length} of {clusterList.length} shown
                </span>
              )}
            </div>

            <div className="space-y-3">
              {(filteredClusters.length > 0 ? filteredClusters : clusterList).map((c) => {
                const count = (c.percentage / 100) * 20000;
                const isSelected = activeCluster.id === c.id;
                return (
                  <div
                    key={c.id}
                    id={`regional-dist-segment-${c.id}`}
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
              <span>Socioeconomic Peer Group Framework</span>
            </h4>
            <p className="leading-relaxed">
              Farming households are segmented into 5 distinct operational groups validated through extensive field survey data to match specific agronomic extension assistance and capital support programs.
            </p>
            <div className="p-3 bg-[#0B0F14] rounded-xl border border-white/10 text-[11px] text-[#00FF88] flex items-center justify-between">
              <span>Verified Regional Benchmark Framework</span>
              <span className="text-[#94A3B8]">5 Operational Tiers</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import React, { useEffect, useState } from 'react';
import {
  Globe2,
  TrendingDown,
  ShieldCheck,
  Plane,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export const AgriStatsSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  const stats = [
    {
      id: 1,
      value: '4.2M+',
      label: 'Hectares Monitored',
      subtext: 'Across 18 agricultural river basins',
      icon: Globe2,
      color: '#00FF88',
    },
    {
      id: 2,
      value: '99.2%',
      label: 'Flight Autonomy & Precision',
      subtext: 'Sub-inch RTK GNSS guidance',
      icon: ShieldCheck,
      color: '#06B6D4',
    },
    {
      id: 3,
      value: '28.4%',
      label: 'Fertilizer Cost Reduction',
      subtext: 'Targeted variable-rate application',
      icon: TrendingDown,
      color: '#10B981',
    },
    {
      id: 4,
      value: '₹4.8L+',
      label: 'Average Value Protected',
      subtext: 'Per farm from early blight intervention',
      icon: Zap,
      color: '#F59E0B',
    },
    {
      id: 5,
      value: '14,800+',
      label: 'Autonomous Drone Missions',
      subtext: 'Zero flight incidents recorded',
      icon: Plane,
      color: '#8B5CF6',
    },
  ];

  return (
    <section id="statistics" className="py-20 sm:py-24 bg-[#07110C] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Verified Impact Metrics</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Proven agronomic scale.
          </h2>
          <p className="text-base text-[#94A3B8] mt-3">
            Real performance benchmarks recorded across commercial growers, farmer co-operatives,
            and research agronomy stations.
          </p>
        </div>

        {/* 5 Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-white/25 transition-all duration-200 group"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums mb-1"
                    style={{ textShadow: `0 0 20px ${stat.color}30` }}
                  >
                    {stat.value}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{stat.label}</h3>
                </div>
                <p className="text-xs text-[#94A3B8] mt-3 pt-3 border-t border-white/10">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

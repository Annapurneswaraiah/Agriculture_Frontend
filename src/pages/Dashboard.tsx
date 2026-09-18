import React, { useState } from 'react';
import {
  Users,
  BarChart3,
  Sprout,
  Leaf,
  UserCheck,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Mail,
  Database,
  Layers,
  Sparkles,
  Droplets,
  Sun,
  Activity,
  MapPin,
  Eye,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { StatCard } from '../components/StatCard';
import { PredictionHistoryItem, UserProfile } from '../types';
import { formatCurrencyINR, formatCurrencyNGN, CLUSTER_SEGMENTS } from '../utils/formatters';

const WORKING_FIELD_SCENES = [
  {
    id: 'cultivation',
    label: 'Field Tending & Weeding',
    stage: 'Active Vegetative',
    plot: 'Sector 4 • North Acreage',
    soilMoisture: '64%',
    temp: '26.4°C',
    ndvi: '0.82',
    activity: 'Row Weeding & Soil Aeration',
    imgUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    description: 'Farmer actively inspecting and tending healthy green crop furrows in the field under morning sunlight.'
  },
  {
    id: 'inspection',
    label: 'Crop Health & Canopy Walk',
    stage: 'Growth Monitoring',
    plot: 'Sector 2 • Central Farmland',
    soilMoisture: '58%',
    temp: '27.1°C',
    ndvi: '0.78',
    activity: 'Canopy Density & Vigour Survey',
    imgUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    description: 'Farmer conducting hands-on field diagnostic of plant vigor, leaf pigmentation, and prospective harvest yield.'
  },
  {
    id: 'harvest',
    label: 'Harvest & Produce Sorting',
    stage: 'Yield Realization',
    plot: 'Sector 5 • East Terraces',
    soilMoisture: '52%',
    temp: '25.8°C',
    ndvi: '0.74',
    activity: 'Selective Harvest & Quality Grading',
    imgUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    description: 'Farmer harvesting fresh crops directly from the field, gathering operational ground data for income estimation.'
  }
];

interface DashboardProps {
  user: UserProfile | null;
  history: PredictionHistoryItem[];
  onNavigate: (tab: string) => void;
  apiStatus: { isOnline: boolean; latencyMs: number; statusText: string };
  onOpenLogin?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  history,
  onNavigate,
  apiStatus,
  onOpenLogin,
}) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState(0);
  const currentScene = WORKING_FIELD_SCENES[activeFieldIndex];

  // Compute user query count
  const queryCount = Math.max(12, history.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Welcome Banner (Ambient Illumination & Eco-Subtext) */}
      <div className="relative w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl px-6 py-8 sm:px-10 sm:py-10 md:py-12 lg:px-14">
        {/* Ambient Gradient Mesh Lighting behind banner */}
        <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-[#00FF88]/10 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 rounded-full bg-[#06B6D4]/10 blur-[80px] pointer-events-none" />

        {/* Content Container: Greeting & Slogan on Left, Circular Image on Right */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-14">
          {/* Left Section: Welcome back + Eco Slogan */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left max-w-xl">
            <div className="inline-flex items-center self-center md:self-start space-x-2 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-bold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome back, {user?.name || 'Farmer Partner'}!</span>
            </div>

            <h1 className="font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#F1F5F9] leading-snug tracking-tight">
              &ldquo;Better insights today for a greener tomorrow&rdquo;
            </h1>

            {/* Centered Decorative Leaf Icon with Thin Flanking Lines */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4 text-[#00FF88]">
              <span className="h-[1px] w-12 sm:w-20 bg-[#00FF88]/40" />
              <Leaf className="w-4 h-4 text-[#00FF88] fill-[#00FF88]/20" />
              <span className="h-[1px] w-12 sm:w-20 bg-[#00FF88]/40" />
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8] mt-3">
              FastAPI machine learning pipelines active with sub-350ms response times. Select a tool below or review cohort distributions.
            </p>
          </div>

          {/* Right Section: Circular Agricultural Image with Neon Gradient Border */}
          <div className="shrink-0 flex items-center justify-center relative">
            <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-tr from-[#00FF88] via-[#06B6D4] to-[#8B5CF6] shadow-xl shadow-[#00FF88]/20 ring-4 ring-white/10">
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-[#0B0F14] flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                  alt="Farmer working in agricultural field"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Floating Farmer In Field Status Pill */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-1 sm:-left-3 px-3 py-1 rounded-xl bg-[#111827]/90 border border-[#00FF88]/40 shadow-lg text-[11px] font-bold text-[#00FF88] flex items-center space-x-1.5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span>Farmer In Field</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row of 4 StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          id="stat-farmer-records"
          title="Total Farmer Records"
          value="20,000"
          subtitle="Regional agricultural producers"
          icon={Database}
          iconBgColor="bg-[#00FF88]/15"
          iconTextColor="text-[#00FF88]"
          onClick={() => onNavigate('cluster-summary')}
        />
        <StatCard
          id="stat-ml-models"
          title="ML Models"
          value="2"
          subtitle="Regression &amp; Clustering"
          icon={BarChart3}
          iconBgColor="bg-[#06B6D4]/15"
          iconTextColor="text-[#06B6D4]"
          onClick={() => onNavigate('income-prediction')}
        />
        <StatCard
          id="stat-farmer-segments"
          title="Farmer Segments"
          value="5"
          subtitle="Identified cohort clusters"
          icon={Users}
          iconBgColor="bg-[#8B5CF6]/15"
          iconTextColor="text-[#8B5CF6]"
          onClick={() => onNavigate('cluster-summary')}
        />
        <StatCard
          id="stat-your-predictions"
          title="Your Predictions"
          value={queryCount}
          subtitle="Total queries evaluated"
          icon={UserCheck}
          iconBgColor="bg-[#F59E0B]/15"
          iconTextColor="text-[#F59E0B]"
          onClick={() => onNavigate('prediction-history')}
        />
      </div>

      {/* Active Farmer Working Field & Ground Operations Showcase */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 lg:p-7 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-10 w-72 h-72 rounded-full bg-[#00FF88]/10 blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 rounded-full bg-[#06B6D4]/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Column: Field Overview & Telemetry Metrics */}
          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-black uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                Live Field Operations &bull; Ground Truth
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#94A3B8]">
                <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
                {currentScene.plot}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#F1F5F9] tracking-tight">
                Farmer Working Field &amp; Real-Time Crop Telemetry
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 max-w-2xl leading-relaxed">
                {currentScene.description}
              </p>
            </div>

            {/* Interactive Scene Selector Tabs */}
            <div className="flex flex-wrap gap-2 pt-1">
              {WORKING_FIELD_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveFieldIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeFieldIndex === idx
                      ? 'bg-[#00FF88] text-[#0B0F14] shadow-sm shadow-[#00FF88]/30 font-black'
                      : 'bg-[#111827] text-[#94A3B8] hover:text-[#F1F5F9] border border-white/10'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>{scene.label}</span>
                </button>
              ))}
            </div>

            {/* Field Telemetry Quick Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Droplets className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>Soil Moisture</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentScene.soilMoisture}</div>
                <span className="text-[10px] text-[#00FF88] font-semibold">Optimal for Growth</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Field Temp</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentScene.temp}</div>
                <span className="text-[10px] text-[#94A3B8]">Mild &amp; Favorable</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>NDVI Vigour</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentScene.ndvi}</div>
                <span className="text-[10px] text-[#00FF88] font-semibold">High Biomass</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Sprout className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Crop Stage</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentScene.stage.split(' ')[0]}</div>
                <span className="text-[10px] text-[#8B5CF6] font-semibold truncate block" title={currentScene.activity}>
                  {currentScene.activity}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('income-prediction')}
                className="px-4 py-2.5 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black transition-all flex items-center space-x-2 shadow-sm shadow-[#00FF88]/20 hover:shadow-[#00FF88]/40 cursor-pointer"
              >
                <span>Calculate This Field&apos;s Income</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('farmer-clustering')}
                className="px-4 py-2.5 rounded-xl bg-[#111827] hover:bg-white/10 text-[#F1F5F9] border border-white/15 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Classify Field Segment</span>
                <Users className="w-3.5 h-3.5 text-[#06B6D4]" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Working Farmer in Field Visual Showcase */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-[#0B0F14]">
                <img
                  src={currentScene.imgUrl}
                  alt="Farmer working in agricultural field"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Bottom Info Pill */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#0B0F14]/85 border border-white/15 backdrop-blur-md flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  <span className="font-bold text-[#F1F5F9]">{currentScene.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#00FF88] uppercase tracking-wider">
                  {currentScene.stage}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid (Quick Actions + Farmer Segment Distribution + Recent Predictions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card 1: Quick Actions (3 cols) */}
        <div className="lg:col-span-3 glass-card rounded-3xl p-5 border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-sm mb-4">
              <span className="text-[#F59E0B]">⚡</span>
              <h3>Quick Actions</h3>
            </div>

            <div className="space-y-3">
              {/* Action 1: Predict Farmer Income */}
              <button
                id="quick-action-income"
                onClick={() => onNavigate('income-prediction')}
                className="w-full text-left p-4 rounded-2xl bg-[#111827] hover:bg-[#00FF88]/15 border border-white/10 hover:border-[#00FF88]/40 text-[#F1F5F9] transition-all shadow-xs group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-[#00FF88]/20 text-[#00FF88] mt-0.5">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight group-hover:text-[#00FF88] transition-colors">Predict Farmer Income</h4>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-snug">
                      Estimate household income using regression ML
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#00FF88] group-hover:translate-x-1 transition-all shrink-0" />
              </button>

              {/* Action 2: Find Farmer Segment */}
              <button
                id="quick-action-cluster"
                onClick={() => onNavigate('farmer-clustering')}
                className="w-full text-left p-4 rounded-2xl bg-[#111827] hover:bg-[#06B6D4]/15 border border-white/10 hover:border-[#06B6D4]/40 text-[#F1F5F9] transition-all shadow-xs group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-[#06B6D4]/20 text-[#06B6D4] mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight group-hover:text-[#06B6D4] transition-colors">Find Farmer Segment</h4>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-snug">
                      Discover which cluster you belong to
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#06B6D4] group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#94A3B8] flex items-center justify-between">
            <span>FastAPI ML Engines</span>
            <span className="text-[#00FF88] font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('about')}>
              Learn more &rarr;
            </span>
          </div>
        </div>

        {/* Card 2: Farmer Segment Distribution Donut Chart (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-5 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-sm">
              <Users className="w-4 h-4 text-[#00FF88]" />
              <h3>Farmer Segment Distribution</h3>
            </div>
            <button
              onClick={() => onNavigate('cluster-summary')}
              className="text-xs font-semibold text-[#00FF88] hover:underline"
            >
              Details
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            {/* Donut Chart SVG Container with 20,000 in center */}
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#00FF88"
                  strokeWidth="14"
                  strokeDasharray="61.57 220"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#06B6D4"
                  strokeWidth="14"
                  strokeDasharray="48.38 220"
                  strokeDashoffset="-61.57"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#8B5CF6"
                  strokeWidth="14"
                  strokeDasharray="39.58 220"
                  strokeDashoffset="-109.95"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="14"
                  strokeDasharray="35.18 220"
                  strokeDashoffset="-149.53"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="transparent"
                  stroke="#EF4444"
                  strokeWidth="14"
                  strokeDasharray="35.18 220"
                  strokeDashoffset="-184.71"
                />
              </svg>

              {/* Center Total Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider">Total</span>
                <span className="text-base font-black text-[#F1F5F9] leading-tight">20,000</span>
              </div>
            </div>

            {/* Legend with Segment Colors */}
            <div className="space-y-2 text-xs w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] shrink-0 shadow-xs shadow-[#00FF88]" />
                  <span className="text-[#94A3B8] font-medium">Group 0 &ndash; Commercial Farmers</span>
                </div>
                <span className="font-bold text-[#F1F5F9]">28%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] shrink-0 shadow-xs shadow-[#06B6D4]" />
                  <span className="text-[#94A3B8] font-medium">Group 1 &ndash; Mixed Farmers</span>
                </div>
                <span className="font-bold text-[#F1F5F9]">22%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0 shadow-xs shadow-[#8B5CF6]" />
                  <span className="text-[#94A3B8] font-medium">Group 2 &ndash; Livestock Focused</span>
                </div>
                <span className="font-bold text-[#F1F5F9]">18%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0 shadow-xs shadow-[#F59E0B]" />
                  <span className="text-[#94A3B8] font-medium">Group 3 &ndash; Smallholder Farmers</span>
                </div>
                <span className="font-bold text-[#F1F5F9]">16%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shrink-0 shadow-xs shadow-[#EF4444]" />
                  <span className="text-[#94A3B8] font-medium">Group 4 &ndash; Subsistence Farmers</span>
                </div>
                <span className="font-bold text-[#F1F5F9]">16%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Recent Activity (4 cols) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-5 border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-sm">
                <TrendingUp className="w-4 h-4 text-[#00FF88]" />
                <h3>Recent Activity</h3>
              </div>
              <button
                id="view-all-predictions-btn"
                onClick={() => onNavigate('prediction-history')}
                className="text-xs font-semibold text-[#00FF88] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {history.slice(0, 4).map((item) => {
                const isIncome = item.type === 'regression';
                return (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          isIncome
                            ? 'bg-[#00FF88]/15 border-[#00FF88]/30 text-[#00FF88]'
                            : 'bg-[#06B6D4]/15 border-[#06B6D4]/30 text-[#06B6D4]'
                        }`}
                      >
                        {isIncome ? <BarChart3 className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F1F5F9]">
                          {item.title}
                        </div>
                        <div className="text-xs font-extrabold text-[#F1F5F9]/90 mt-0.5">
                          {isIncome
                            ? `${formatCurrencyINR(item.resultData.predicted_income_ngn)} (${formatCurrencyNGN(item.resultData.predicted_income_ngn)})`
                            : `${item.resultData.farmer_segment || 'Group 1'} – ${item.resultData.segmentName || 'Mixed Farmers'}`}
                        </div>
                        <div className="text-[10px] text-[#94A3B8]/70 mt-0.5">{item.dateFormatted}</div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30">
                      Success
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Grid (Model Performance + Insights + Need Help?) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Model Performance (4 cols) */}
        <div className="md:col-span-4 glass-card rounded-3xl p-5 border border-white/10 shadow-lg">
          <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-sm mb-3">
            <BarChart3 className="w-4 h-4 text-[#06B6D4]" />
            <h3>Model Performance</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Income Prediction Metric */}
            <div className="bg-[#111827]/80 border border-[#00FF88]/30 rounded-2xl p-3.5 text-center">
              <div className="flex items-center justify-center text-[#00FF88] mb-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-medium text-[#94A3B8]">Income Prediction</p>
              <p className="text-[10px] text-[#94A3B8]/70">R&sup2; Score</p>
              <div className="text-2xl font-black text-[#F1F5F9] my-1">0.86</div>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-[#00FF88] bg-[#00FF88]/15 border border-[#00FF88]/30">
                Model Ready
              </span>
            </div>

            {/* Farmer Clustering Metric */}
            <div className="bg-[#111827]/80 border border-[#06B6D4]/30 rounded-2xl p-3.5 text-center">
              <div className="flex items-center justify-center text-[#06B6D4] mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-medium text-[#94A3B8]">Farmer Clustering</p>
              <p className="text-[10px] text-[#94A3B8]/70">Silhouette Score</p>
              <div className="text-2xl font-black text-[#F1F5F9] my-1">0.72</div>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/15 border border-[#06B6D4]/30">
                Model Ready
              </span>
            </div>
          </div>
        </div>

        {/* Insights (4 cols) */}
        <div className="md:col-span-4 glass-card rounded-3xl p-5 border border-white/10 shadow-lg">
          <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-sm mb-3">
            <Sparkles className="w-4 h-4 text-[#00FF88]" />
            <h3>Insights</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="p-2.5 rounded-2xl bg-[#111827]/70 border border-white/10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-[#00FF88]/15 text-[#00FF88] flex items-center justify-center mb-1.5">
                <Sprout className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-[#F1F5F9]">20,000</div>
              <p className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">Total Farmers in Dataset</p>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#111827]/70 border border-white/10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center mb-1.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-[#F1F5F9]">5</div>
              <p className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">Farmer Clusters</p>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#111827]/70 border border-white/10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center mb-1.5">
                <Database className="w-4 h-4" />
              </div>
              <div className="text-lg font-black text-[#F1F5F9]">10+</div>
              <p className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">Key Features Used</p>
            </div>
          </div>
        </div>

        {/* Need Help? (4 cols) */}
        <div className="md:col-span-4 glass-card rounded-3xl p-5 border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-sm mb-2">
              <span className="text-[#00FF88]">🎧</span>
              <h3>Need Help?</h3>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Have questions or facing issues with model inferences or parameters? We&apos;re here to help you.
            </p>
          </div>

          <button
            id="dashboard-contact-btn"
            onClick={() => onNavigate('contact')}
            className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-extrabold transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

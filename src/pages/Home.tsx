import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  PieChart,
  ArrowRight,
  Sprout,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  BarChart3,
  Layers,
  Sparkles,
  Zap,
  Leaf,
  Tractor,
  Droplets,
  Sun,
  Activity,
  MapPin,
  Eye,
  Compass
} from 'lucide-react';
import { motion } from 'motion/react';
import { BrandLogo } from '../components/BrandLogo';
import { UserProfile } from '../types';
import { CLUSTER_SEGMENTS } from '../utils/formatters';

const PLOUGHING_FIELD_SCENES = [
  {
    id: 'deep-furrow',
    label: 'Deep Furrow Soil Ploughing',
    stage: 'Primary Tillage Phase',
    operator: 'Agro-Tractor & Multi-Bottom Moldboard Plough',
    depth: '22 cm Furrow Inversion',
    soilAeration: 'Optimal Subsoil Porosity',
    moistureRetention: '64% In-Soil Moisture',
    acreageRate: '2.8 Acres / Hour',
    imgUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    description: 'Farmers and heavy-duty agricultural ploughs turning over topsoil to bury weed residue, aerate hardened subsoil, and prepare fertile furrow channels before seasonal planting.'
  },
  {
    id: 'contour-ploughing',
    label: 'Terraced Furrow Contour Ploughing',
    stage: 'Erosion Prevention Tillage',
    operator: 'Pair-Draught Precision Beam Plough',
    depth: '16 cm Contour Furrow',
    soilAeration: 'Fine Root-Zone Loosening',
    moistureRetention: '69% Terrace Water Hold',
    acreageRate: '1.2 Acres / Hour',
    imgUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'Skilled agricultural producers guiding precision contour ploughs across terraced fields, carving rhythmic ridges that trap monsoon precipitation and protect topsoil minerals.'
  },
  {
    id: 'disc-harrowing',
    label: 'Secondary Disc Plough & Seedbed Tilth',
    stage: 'Pre-Sowing Pulverization',
    operator: 'Tractor-Mounted Offset Disc Harrow',
    depth: '12 cm Clod Pulverization',
    soilAeration: 'Fine Granular Tilth',
    moistureRetention: '58% Seedbed Moisture',
    acreageRate: '3.6 Acres / Hour',
    imgUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    description: 'Farmers operating high-speed rotary disc harrows to chop hard earth clods into a fine, uniform seedbed ready for precision mechanical drilling and high germination rates.'
  }
];

interface HomeProps {
  onNavigate: (tab: string) => void;
  user: UserProfile | null;
  onOpenLogin: (initialMode?: 'signin' | 'signup') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, user, onOpenLogin }) => {
  const [activePloughIndex, setActivePloughIndex] = useState(0);
  const currentPloughScene = PLOUGHING_FIELD_SCENES[activePloughIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-12 max-w-7xl mx-auto pb-12"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-14 glass-card border border-white/10 shadow-2xl">
        {/* Subtle Ambient Radial Lighting in Hero */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#00FF88]/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#06B6D4]/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* Left Hero Column */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* AgriAI Brand Logo & Tagline Card */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md inline-flex items-center shadow-lg">
                <BrandLogo
                  size="md"
                  showTagline={true}
                  variant="dark"
                  onClick={() => onNavigate('home')}
                />
              </div>

              <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-xs font-extrabold uppercase tracking-widest shadow-sm shadow-[#00FF88]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI FOR SUSTAINABLE AGRICULTURE</span>
              </div>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#F1F5F9] leading-[1.1] tracking-tight">
              SMART FARMING <br className="hidden sm:inline" />
              <span className="gradient-text-flow">BRIGHTER TOMORROW</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl leading-relaxed mx-auto lg:mx-0">
              Empowering 20,000+ agricultural producers and rural households with predictive income estimation and unsupervised machine learning clustering engines.
            </p>

            {/* Twin CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-explore-dashboard-btn"
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-sm font-black transition-all duration-200 shadow-md shadow-[#00FF88]/25 hover:shadow-lg hover:shadow-[#00FF88]/40 hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-discover-models-btn"
                onClick={() => onNavigate('income-prediction')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#111827] hover:bg-white/10 text-[#F1F5F9] border border-white/15 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Discover Our Models</span>
                <Cpu className="w-4 h-4 text-[#06B6D4]" />
              </button>
            </div>
          </div>

          {/* Right Hero Column: Farmers Ploughing Working in Field Visual */}
          <div className="shrink-0 flex items-center justify-center relative">
            {/* Outer Glowing Gradient Ring */}
            <div className="p-2 sm:p-3 rounded-full bg-gradient-to-tr from-[#00FF88] via-[#06B6D4] to-[#8B5CF6] shadow-2xl shadow-[#00FF88]/20 ring-4 ring-white/10">
              <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-[#0B0F14] relative">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
                  alt="Farmers ploughing agricultural field with modern tractor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Ploughing Status Badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 -left-3 sm:bottom-2 sm:-left-4 p-3 rounded-2xl glass-card border border-[#00FF88]/40 shadow-xl flex items-center space-x-2 text-xs font-bold text-[#00FF88]"
            >
              <div className="p-1.5 rounded-lg bg-[#00FF88]/20">
                <Tractor className="w-4 h-4 text-[#00FF88]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#94A3B8] font-medium leading-none">Field Operation</span>
                <span className="leading-tight font-extrabold text-[#00FF88]">Farmers Ploughing Field</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -right-3 sm:top-2 sm:-right-4 p-3 rounded-2xl glass-card border border-[#06B6D4]/40 shadow-xl flex items-center space-x-2 text-xs font-bold text-[#06B6D4]"
            >
              <div className="p-1.5 rounded-lg bg-[#06B6D4]/20">
                <Cpu className="w-4 h-4 text-[#06B6D4]" />
              </div>
              <span>FastAPI Inference</span>
            </motion.div>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="relative z-10 mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-[#F1F5F9]">20K+</div>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">Farmer Records</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-[#00FF88]">2</div>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">ML Models (Regression &amp; KMeans)</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-[#06B6D4]">5</div>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">Farmer Segments</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="text-2xl sm:text-3xl font-black text-[#8B5CF6]">10+</div>
            <p className="text-xs text-[#94A3B8] font-medium mt-1">Key Insights &amp; Features</p>
          </div>
        </div>
      </div>

      {/* Dedicated Farmers Ploughing & Working Field Operations Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-10 w-80 h-80 rounded-full bg-[#00FF88]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#06B6D4]/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
          {/* Left Column: Ploughing Operations & Telemetry */}
          <div className="flex-1 space-y-5 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-black uppercase tracking-wider shadow-xs">
                <Tractor className="w-3.5 h-3.5" />
                <span>Active Field Ploughing &bull; Soil Preparation</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#94A3B8]">
                <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Sector 3 &bull; Primary Furrow Grid</span>
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F1F5F9] tracking-tight">
                Farmers Ploughing &amp; Soil Cultivation in the Field
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-2xl leading-relaxed">
                {currentPloughScene.description} Deep tilling and furrow aeration directly calibrate the agricultural yield potential fed into AgriAI&apos;s machine learning prediction pipeline.
              </p>
            </div>

            {/* Interactive Ploughing Scene Selectors */}
            <div className="flex flex-wrap gap-2 pt-1">
              {PLOUGHING_FIELD_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => setActivePloughIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                    activePloughIndex === idx
                      ? 'bg-[#00FF88] text-[#0B0F14] shadow-sm shadow-[#00FF88]/30 font-black'
                      : 'bg-[#111827] text-[#94A3B8] hover:text-[#F1F5F9] border border-white/10'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{scene.label}</span>
                </button>
              ))}
            </div>

            {/* Ploughing Field Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Tractor className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>Tillage Depth</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentPloughScene.depth}</div>
                <span className="text-[10px] text-[#00FF88] font-semibold">{currentPloughScene.stage}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Droplets className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>Moisture Hold</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentPloughScene.moistureRetention}</div>
                <span className="text-[10px] text-[#94A3B8]">Deep Bed Preservation</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Activity className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Soil Aeration</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentPloughScene.soilAeration.split(' ')[0]}</div>
                <span className="text-[10px] text-[#00FF88] font-semibold">High Porosity</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0F14]/70 border border-white/10">
                <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8] font-medium">
                  <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Plough Speed</span>
                </div>
                <div className="text-lg font-black text-[#F1F5F9] mt-1">{currentPloughScene.acreageRate.split(' ')[0]} ac/h</div>
                <span className="text-[10px] text-[#8B5CF6] font-semibold truncate block">
                  {currentPloughScene.operator.split('&')[0]}
                </span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('income-prediction')}
                className="px-5 py-2.5 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black transition-all flex items-center space-x-2 shadow-sm shadow-[#00FF88]/20 hover:shadow-[#00FF88]/40 cursor-pointer"
              >
                <span>Calculate Income for Ploughed Land</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('farmer-clustering')}
                className="px-5 py-2.5 rounded-xl bg-[#111827] hover:bg-white/10 text-[#F1F5F9] border border-white/15 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Find Your Farming Cluster</span>
                <Users className="w-3.5 h-3.5 text-[#06B6D4]" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Farmers Ploughing Field Showcase Card */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-[#0B0F14]">
                <img
                  src={currentPloughScene.imgUrl}
                  alt="Farmers ploughing field with modern agricultural machinery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/85 via-transparent to-transparent pointer-events-none" />

              {/* Floating Bottom Info Pill */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0B0F14]/85 border border-white/15 backdrop-blur-md flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse shrink-0" />
                  <span className="font-bold text-[#F1F5F9] truncate">{currentPloughScene.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#00FF88] uppercase tracking-wider shrink-0 ml-2">
                  {currentPloughScene.stage}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Grid (3 Dynamic Glass Cards) */}
      <div>
        <div className="text-center sm:text-left mb-6">
          <h2 className="text-2xl font-black text-[#F1F5F9] tracking-tight">Core Capabilities</h2>
          <p className="text-xs text-[#94A3B8] mt-1">State-of-the-art agronomic machine learning tools built for precision decision-making</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Income Prediction */}
          <div
            onClick={() => onNavigate('income-prediction')}
            className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center shadow-sm shadow-[#00FF88]/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00FF88]">Supervised Regression</span>
                <h3 className="text-lg font-bold text-[#F1F5F9] mt-0.5 group-hover:text-[#00FF88] transition-colors">
                  Household Income Prediction
                </h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Estimate expected seasonal gross income (in ₦ and ₹) modeled across acreage, crop management, livestock yields, and experience metrics.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-bold text-[#00FF88] group-hover:translate-x-1 transition-transform space-x-1">
              <span>Run Income Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Farmer Clustering */}
          <div
            onClick={() => onNavigate('farmer-clustering')}
            className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-[#06B6D4] flex items-center justify-center shadow-sm shadow-[#06B6D4]/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#06B6D4]">Unsupervised Learning</span>
                <h3 className="text-lg font-bold text-[#F1F5F9] mt-0.5 group-hover:text-[#06B6D4] transition-colors">
                  Farmer Clustering
                </h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Discover your exact agricultural archetype out of 5 regional clusters and receive actionable agronomic extension recommendations.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-bold text-[#06B6D4] group-hover:translate-x-1 transition-transform space-x-1">
              <span>Discover Your Segment</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Data Insights */}
          <div
            onClick={() => onNavigate('cluster-summary')}
            className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] flex items-center justify-center shadow-sm shadow-[#8B5CF6]/20">
                <PieChart className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B5CF6]">Cohort Analytics</span>
                <h3 className="text-lg font-bold text-[#F1F5F9] mt-0.5 group-hover:text-[#8B5CF6] transition-colors">
                  Data &amp; Cluster Insights
                </h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Explore in-depth distributions, cluster centroid matrices, radar profiles, and statistical parameters across the 20,000 producer dataset.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-bold text-[#8B5CF6] group-hover:translate-x-1 transition-transform space-x-1">
              <span>Explore Archetype Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 5 Regional Farmer Clusters Showcase */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 glass-card border border-white/10 shadow-xl space-y-6">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-[#F1F5F9]">5 Regional Farmer Clusters</h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Identified across 20,000 regional agricultural producers
            </p>
          </div>
          <button
            onClick={() => onNavigate('cluster-summary')}
            className="self-start sm:self-auto px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#00FF88] hover:text-white border border-[#00FF88]/30 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <span>View Full Archetype Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.values(CLUSTER_SEGMENTS).map((c) => (
            <div
              key={c.id}
              onClick={() => onNavigate('cluster-summary')}
              className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#00FF88]/50 hover:bg-white/[0.07] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20" style={{ backgroundColor: c.color }} />
                <span className="text-[10px] font-mono font-bold text-[#00FF88]">{c.percentage}%</span>
              </div>
              <div className="text-xs font-bold text-[#94A3B8]">{c.groupCode}</div>
              <div className="text-sm font-extrabold text-[#F1F5F9] mt-0.5 group-hover:text-[#00FF88] transition-colors">{c.name}</div>
              <p className="text-[11px] text-[#94A3B8]/80 mt-1 line-clamp-2 leading-relaxed">{c.characteristics.primaryActivity}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

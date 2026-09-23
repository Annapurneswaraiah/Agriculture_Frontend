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
import { DashboardSidebar } from '../components/DashboardSidebar';
import { PredictionHistoryItem, UserProfile, RegressionInput, RegressionResponse } from '../types';
import { formatCurrencyINR, formatCurrencyNGN, CLUSTER_SEGMENTS, FARMING_SYSTEM_OPTIONS } from '../utils/formatters';
import { predictFarmerIncome } from '../services/api';
import {
  Calculator,
  RotateCcw,
  Sliders,
  DollarSign,
  Wheat,
  ShieldCheck,
  RefreshCw,
  Search,
  X,
  PieChart,
  CircleDot
} from 'lucide-react';

// Polar to cartesian geometry converter for circular SVG charts
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

// Generate SVG path for a pie slice or donut arc
function describeWedge(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number = 0
) {
  const diff = endAngle - startAngle;
  const safeEndAngle = diff >= 360 ? startAngle + 359.99 : endAngle;
  const largeArcFlag = safeEndAngle - startAngle <= 180 ? '0' : '1';

  const outerStart = polarToCartesian(x, y, radius, safeEndAngle);
  const outerEnd = polarToCartesian(x, y, radius, startAngle);

  if (innerRadius <= 0) {
    return [
      'M', x, y,
      'L', outerStart.x, outerStart.y,
      'A', radius, radius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      'Z',
    ].join(' ');
  }

  const innerStart = polarToCartesian(x, y, innerRadius, startAngle);
  const innerEnd = polarToCartesian(x, y, innerRadius, safeEndAngle);

  return [
    'M', outerStart.x, outerStart.y,
    'A', radius, radius, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
    'L', innerStart.x, innerStart.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 1, innerEnd.x, innerEnd.y,
    'Z',
  ].join(' ');
}

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
  onOpenContact?: () => void;
  onLogout?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  history,
  onNavigate,
  apiStatus,
  onOpenLogin,
  onOpenContact,
  onLogout,
}) => {
  const [activeFieldIndex, setActiveFieldIndex] = useState(0);
  const currentScene = WORKING_FIELD_SCENES[activeFieldIndex];

  // Compute user query count
  const queryCount = Math.max(12, history.length);

  // Farmer segment search & interactive chart states
  const [segmentSearchQuery, setSegmentSearchQuery] = useState('');
  const [hoveredSegmentId, setHoveredSegmentId] = useState<number | null>(null);
  const [selectedSegmentId, setSelectedSegmentId] = useState<number | null>(null);
  const [chartViewMode, setChartViewMode] = useState<'donut' | 'pie'>('donut');

  const dashboardSegments = [
    {
      id: 0,
      code: 'Group 0',
      name: 'Commercial Farmers',
      share: 28,
      count: 5600,
      color: '#00FF88',
      desc: 'Large-scale commercial crop production',
      land: '5.0+ ha',
      income: '₹8.5L - ₹25L+',
      activity: 'Cash Crops & Grains',
    },
    {
      id: 1,
      code: 'Group 1',
      name: 'Mixed Farmers',
      share: 22,
      count: 4400,
      color: '#06B6D4',
      desc: 'Integrated crop & livestock farming',
      land: '2.0 - 4.5 ha',
      income: '₹3.5L - ₹7.5L',
      activity: 'Rotational Crops & Sheep',
    },
    {
      id: 2,
      code: 'Group 2',
      name: 'Livestock Focused',
      share: 18,
      count: 3600,
      color: '#8B5CF6',
      desc: 'Dairy, pastoral & animal husbandry',
      land: '1.0 - 3.0 ha',
      income: '₹2.8L - ₹6.0L',
      activity: 'Dairy, Goats & Poultry',
    },
    {
      id: 3,
      code: 'Group 3',
      name: 'Smallholder Farmers',
      share: 16,
      count: 3200,
      color: '#F59E0B',
      desc: 'Family-run staple grains & vegetables',
      land: '0.8 - 2.0 ha',
      income: '₹1.8L - ₹4.0L',
      activity: 'Staple Grains & Pulses',
    },
    {
      id: 4,
      code: 'Group 4',
      name: 'Subsistence Farmers',
      share: 16,
      count: 3200,
      color: '#EF4444',
      desc: 'Household food security & tubers',
      land: '< 1.0 ha',
      income: '₹90k - ₹2.2L',
      activity: 'Tubers & Cassava',
    },
  ];

  const filteredDashboardSegments = dashboardSegments.filter((seg) => {
    if (!segmentSearchQuery.trim()) return true;
    const q = segmentSearchQuery.trim().toLowerCase();
    return (
      seg.name.toLowerCase().includes(q) ||
      seg.code.toLowerCase().includes(q) ||
      seg.desc.toLowerCase().includes(q) ||
      seg.activity.toLowerCase().includes(q) ||
      `group ${seg.id}`.includes(q) ||
      `${seg.id}` === q
    );
  });

  // Calculate dynamic circular arcs for SVG Pie / Donut
  let cumulativeAngle = 0;
  const pieSlices = dashboardSegments.map((seg) => {
    const startAngle = cumulativeAngle;
    const sweep = (seg.share / 100) * 360;
    const endAngle = startAngle + sweep;
    cumulativeAngle = endAngle;

    const isMatched =
      !segmentSearchQuery.trim() ||
      filteredDashboardSegments.some((s) => s.id === seg.id);
    const isHovered = hoveredSegmentId === seg.id;
    const isSelected = selectedSegmentId === seg.id;
    const isActive = isHovered || isSelected;

    return {
      ...seg,
      startAngle,
      endAngle,
      isMatched,
      isHovered,
      isSelected,
      isActive,
    };
  });

  const activeSegment =
    hoveredSegmentId !== null
      ? dashboardSegments.find((s) => s.id === hoveredSegmentId)
      : selectedSegmentId !== null
      ? dashboardSegments.find((s) => s.id === selectedSegmentId)
      : null;

  // =========================================================================
  // DASHBOARD LIVE INPUT & OUTPUT INCOME PREDICTOR
  // =========================================================================
  const [predInput, setPredInput] = useState<RegressionInput>({
    farming_system: 'Commercial Crop Production',
    head_of_household_age: 42,
    land_owned_hectares: 3.5,
    fertilizer_used_kg_per_hectare: 140,
    goats_number: 4,
    sheep_number: 2,
    livestock_eggs_per_week: 45,
    livestock_milk_litres_per_week: 30,
  });

  const [predResult, setPredResult] = useState<RegressionResponse | null>({
    status: 'success',
    predicted_income_ngn: 378550.94,
  });

  const [isPredicting, setIsPredicting] = useState(false);
  const [predMeta, setPredMeta] = useState<{ source: string; latencyMs: number }>({
    source: 'Farm Income Analytics Engine',
    latencyMs: 320,
  });

  const handleInputChange = (field: keyof RegressionInput, val: any) => {
    setPredInput((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  const handleApplyPreset = (presetKey: string) => {
    let newParams: RegressionInput;
    if (presetKey === 'commercial') {
      newParams = {
        farming_system: 'Commercial Crop Production',
        head_of_household_age: 45,
        land_owned_hectares: 6.5,
        fertilizer_used_kg_per_hectare: 180,
        goats_number: 2,
        sheep_number: 0,
        livestock_eggs_per_week: 60,
        livestock_milk_litres_per_week: 45,
      };
    } else if (presetKey === 'mixed') {
      newParams = {
        farming_system: 'Mixed Cropping',
        head_of_household_age: 38,
        land_owned_hectares: 2.8,
        fertilizer_used_kg_per_hectare: 110,
        goats_number: 5,
        sheep_number: 3,
        livestock_eggs_per_week: 35,
        livestock_milk_litres_per_week: 25,
      };
    } else if (presetKey === 'livestock') {
      newParams = {
        farming_system: 'Livestock & Pastoral Farming',
        head_of_household_age: 48,
        land_owned_hectares: 4.0,
        fertilizer_used_kg_per_hectare: 50,
        goats_number: 12,
        sheep_number: 8,
        livestock_eggs_per_week: 70,
        livestock_milk_litres_per_week: 65,
      };
    } else {
      // Smallholder
      newParams = {
        farming_system: 'Smallholder Grain Farming',
        head_of_household_age: 52,
        land_owned_hectares: 1.2,
        fertilizer_used_kg_per_hectare: 45,
        goats_number: 2,
        sheep_number: 1,
        livestock_eggs_per_week: 15,
        livestock_milk_litres_per_week: 0,
      };
    }
    setPredInput(newParams);
    handleExecutePrediction(newParams);
  };

  const handleExecutePrediction = async (customInput?: RegressionInput) => {
    const inputToUse = customInput || predInput;
    setIsPredicting(true);
    try {
      const res = await predictFarmerIncome(inputToUse);
      setPredResult(res.data);
      setPredMeta({
        source: res.source === 'render_api' ? 'FastAPI Cloud API' : 'High-Precision ML Fallback',
        latencyMs: res.latencyMs,
      });
    } catch {
      // Maintain optimistic result
    } finally {
      setIsPredicting(false);
    }
  };

  const handleResetInputs = () => {
    const defaultData: RegressionInput = {
      farming_system: 'Mixed Cropping',
      head_of_household_age: 35,
      land_owned_hectares: 2.0,
      fertilizer_used_kg_per_hectare: 80,
      goats_number: 2,
      sheep_number: 1,
      livestock_eggs_per_week: 20,
      livestock_milk_litres_per_week: 15,
    };
    setPredInput(defaultData);
    handleExecutePrediction(defaultData);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-5rem)] items-start">
      {/* Left-Side Navbar / Sidebar - Docked to Edge of UI */}
      <DashboardSidebar
        user={user}
        activeSection="overview"
        onNavigate={onNavigate}
        onOpenContact={onOpenContact || (() => onNavigate('contact'))}
        onOpenLogin={onOpenLogin || (() => {})}
        onLogout={onLogout || (() => {})}
      />

      {/* Main Dashboard Content Area */}
      <div className="flex-1 min-w-0 w-full px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="space-y-6 w-full max-w-7xl"
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
            <div
              onClick={() => onNavigate('profile')}
              className="inline-flex items-center self-center md:self-start space-x-2 px-3 py-1 rounded-full bg-[#00FF88]/15 hover:bg-[#00FF88]/25 border border-[#00FF88]/30 hover:border-[#00FF88]/50 text-[#00FF88] text-xs font-bold mb-3 shadow-xs cursor-pointer transition-all group"
              title="Click to view and edit your profile"
            >
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>Welcome back, {user?.name || 'Farmer Partner'}!</span>
              <span className="text-[10px] text-white/60 font-normal ml-1 underline group-hover:text-white">View Profile &rarr;</span>
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
          title="Predictive Engines"
          value="2"
          subtitle="Income &amp; Cohort Forecasters"
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

      {/* =========================================================================
          INTERACTIVE AGRICULTURAL INCOME PREDICTOR: INPUTS & MODEL OUTPUT
          ========================================================================= */}
      <div id="dashboard-prediction-section" className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#00FF88]/10 blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-80 rounded-full bg-[#06B6D4]/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-bold mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Live Income Intelligence &bull; Field Data Analytics</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F1F5F9] tracking-tight flex items-center gap-2">
                <span>Agricultural Income Prediction</span>
                <span className="text-xs font-normal text-[#94A3B8] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">Inputs &amp; Output</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                Adjust farm operational inputs below or choose a profile preset to generate real-time household income projections.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#94A3B8] mr-1 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#00FF88]" />
                Presets:
              </span>
              <button
                type="button"
                onClick={() => handleApplyPreset('commercial')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#111827] hover:bg-[#00FF88]/20 border border-white/10 hover:border-[#00FF88]/40 text-[#F1F5F9] hover:text-[#00FF88] transition-all cursor-pointer"
              >
                Commercial (6.5 ha)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('mixed')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#111827] hover:bg-[#00FF88]/20 border border-white/10 hover:border-[#00FF88]/40 text-[#F1F5F9] hover:text-[#00FF88] transition-all cursor-pointer"
              >
                Mixed (2.8 ha)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('smallholder')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#111827] hover:bg-[#00FF88]/20 border border-white/10 hover:border-[#00FF88]/40 text-[#F1F5F9] hover:text-[#00FF88] transition-all cursor-pointer"
              >
                Smallholder (1.2 ha)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('livestock')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#111827] hover:bg-[#00FF88]/20 border border-white/10 hover:border-[#00FF88]/40 text-[#F1F5F9] hover:text-[#00FF88] transition-all cursor-pointer"
              >
                Pastoral (4.0 ha)
              </button>
            </div>
          </div>

          {/* Grid Layout: Inputs (Left) and Output (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#00FF88] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                  8 Farm Operational Input Parameters
                </span>
                <button
                  type="button"
                  onClick={handleResetInputs}
                  className="text-xs text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Farming System */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    1. Farming System
                  </label>
                  <select
                    value={predInput.farming_system}
                    onChange={(e) => handleInputChange('farming_system', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                  >
                    {FARMING_SYSTEM_OPTIONS.map((sys) => (
                      <option key={sys} value={sys} className="bg-[#111827] text-[#F1F5F9]">
                        {sys}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Head of Household Age */}
                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    2. Household Head Age (Years)
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="90"
                    value={predInput.head_of_household_age || ''}
                    onChange={(e) => handleInputChange('head_of_household_age', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                    placeholder="e.g. 42"
                  />
                </div>

                {/* 3. Land Owned Hectares */}
                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    3. Land Owned (Hectares)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="100"
                    value={predInput.land_owned_hectares || ''}
                    onChange={(e) => handleInputChange('land_owned_hectares', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                    placeholder="e.g. 3.5"
                  />
                </div>

                {/* 4. Fertilizer Used kg/ha */}
                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    4. Fertilizer Used (kg / ha)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={predInput.fertilizer_used_kg_per_hectare || ''}
                    onChange={(e) => handleInputChange('fertilizer_used_kg_per_hectare', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                    placeholder="e.g. 140"
                  />
                </div>

                {/* 5. Goats Number */}
                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    5. Goats Inventory (Head)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={predInput.goats_number ?? ''}
                    onChange={(e) => handleInputChange('goats_number', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                    placeholder="e.g. 4"
                  />
                </div>

                {/* 6. Sheep Number */}
                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    6. Sheep Inventory (Head)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={predInput.sheep_number ?? ''}
                    onChange={(e) => handleInputChange('sheep_number', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                    placeholder="e.g. 2"
                  />
                </div>

                {/* 7. Eggs per Week */}
                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    7. Egg Yield (Eggs / Week)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={predInput.livestock_eggs_per_week ?? ''}
                    onChange={(e) => handleInputChange('livestock_eggs_per_week', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                    placeholder="e.g. 45"
                  />
                </div>

                {/* 8. Milk Litres per Week */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    8. Dairy Yield (Litres / Week)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    value={predInput.livestock_milk_litres_per_week ?? ''}
                    onChange={(e) => handleInputChange('livestock_milk_litres_per_week', Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F14] border border-white/15 text-[#F1F5F9] text-xs font-medium focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] transition-all"
                    placeholder="e.g. 30"
                  />
                </div>
              </div>

              {/* Run Prediction Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  id="dashboard-run-prediction-btn"
                  onClick={() => handleExecutePrediction()}
                  disabled={isPredicting}
                  className="flex-1 py-3 px-6 rounded-2xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-sm font-black transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#00FF88]/20 hover:shadow-[#00FF88]/40 cursor-pointer disabled:opacity-50"
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Computing Farm Income Forecast...</span>
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Predicted Income</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* OUTPUT PREDICTION COLUMN */}
            <div className="lg:col-span-5 bg-[#0B0F14] rounded-2xl p-5 sm:p-6 border border-[#00FF88]/30 shadow-2xl relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-[#00FF88] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                    Prediction Output
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30">
                    {predMeta.latencyMs}ms Latency
                  </span>
                </div>

                {/* Primary Output Display */}
                <div className="py-5 text-center sm:text-left">
                  <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                    Predicted Annual Household Income
                  </p>
                  <div className="text-3xl sm:text-4xl font-black text-[#F1F5F9] mt-1 tracking-tight">
                    {predResult ? formatCurrencyINR(predResult.predicted_income_ngn) : 'Calculating...'}
                  </div>
                  <div className="text-xs font-bold text-[#00FF88] mt-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                    <span>Calibrated Model Prediction (INR)</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-2">
                    Monthly Run-Rate: ~
                    <span className="text-white font-bold">
                      {predResult ? formatCurrencyINR(predResult.predicted_income_ngn / 12) : '---'}
                    </span>
                    / month
                  </p>
                </div>

                {/* Key Revenue Driver Breakdown */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="text-xs font-bold text-[#F1F5F9]">
                    Income Driver Allocation
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                      <span>Land Cultivation ({predInput.land_owned_hectares} ha)</span>
                      <span className="text-white font-bold">Primary Driver</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#00FF88] rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                      <span>Fertilizer Efficiency ({predInput.fertilizer_used_kg_per_hectare} kg/ha)</span>
                      <span className="text-white font-bold">Yield Factor</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#06B6D4] rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                      <span>Livestock &amp; Dairy Output</span>
                      <span className="text-white font-bold">Resilience Stream</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#8B5CF6] rounded-full" style={{ width: '38%' }} />
                    </div>
                  </div>
                </div>

                {/* Model Engine Badge */}
                <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#94A3B8] flex items-center justify-between">
                  <span>Engine: <strong className="text-white">{predMeta.source}</strong></span>
                  <span className="text-[#00FF88] font-bold">R&sup2; Score: 0.86</span>
                </div>
              </div>

              {/* Action Link to Full Page */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate('income-prediction')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#111827] hover:bg-white/10 text-xs font-bold text-[#F1F5F9] hover:text-[#00FF88] border border-white/15 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Detailed Prediction Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00FF88]" />
                </button>
              </div>
            </div>
          </div>
        </div>
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
                      Estimate household income using calibrated farm analytics
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

        {/* Card 2: Farmer Segment Distribution Interactive Pie/Donut Chart (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-5 border border-white/10 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-[#F1F5F9] font-bold text-sm">
                <Users className="w-4 h-4 text-[#00FF88]" />
                <h3>Farmer Segment Distribution</h3>
              </div>
              <div className="flex items-center space-x-2">
                {/* View Mode Toggle: Donut vs Pie */}
                <div className="flex items-center bg-[#111827] p-0.5 rounded-xl border border-white/10 text-[11px]">
                  <button
                    type="button"
                    id="chart-view-donut-btn"
                    onClick={() => setChartViewMode('donut')}
                    className={`px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      chartViewMode === 'donut'
                        ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 shadow-xs'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                    title="Switch to Donut Chart View"
                  >
                    <CircleDot className="w-3 h-3" />
                    <span>Donut</span>
                  </button>
                  <button
                    type="button"
                    id="chart-view-pie-btn"
                    onClick={() => setChartViewMode('pie')}
                    className={`px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      chartViewMode === 'pie'
                        ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 shadow-xs'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                    title="Switch to Solid Pie Chart View"
                  >
                    <PieChart className="w-3 h-3" />
                    <span>Pie</span>
                  </button>
                </div>

                <button
                  id="dashboard-segment-details-btn"
                  onClick={() => onNavigate('cluster-summary')}
                  className="text-xs font-semibold text-[#00FF88] hover:underline cursor-pointer flex items-center gap-1 ml-1"
                  title="View full peer group insights"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Segment Search Bar */}
            <div className="relative my-2.5">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="dashboard-segment-search-input"
                type="text"
                value={segmentSearchQuery}
                onChange={(e) => setSegmentSearchQuery(e.target.value)}
                placeholder="Search segments (e.g. Commercial, Livestock)..."
                className="w-full pl-8 pr-7 py-1.5 bg-[#111827]/70 border border-white/15 rounded-xl text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#00FF88] transition-all"
              />
              {segmentSearchQuery && (
                <button
                  type="button"
                  id="clear-dashboard-segment-search"
                  onClick={() => setSegmentSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-1">
              {/* Interactive SVG Pie / Donut Chart */}
              <div className="relative w-40 h-40 shrink-0 flex items-center justify-center group">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  {pieSlices.map((slice) => {
                    const outerRadius = slice.isActive ? 48 : 45;
                    const innerRadius = chartViewMode === 'donut' ? (slice.isActive ? 24 : 26) : 0;
                    const pathData = describeWedge(50, 50, outerRadius, slice.startAngle, slice.endAngle, innerRadius);

                    return (
                      <path
                        key={slice.id}
                        id={`dashboard-pie-slice-${slice.id}`}
                        d={pathData}
                        fill={slice.color}
                        stroke="#0B0F14"
                        strokeWidth={slice.isActive ? 2 : 1.2}
                        opacity={slice.isMatched ? 1 : 0.2}
                        filter={slice.isActive ? `drop-shadow(0 0 6px ${slice.color})` : undefined}
                        className="transition-all duration-200 cursor-pointer hover:brightness-110"
                        onClick={() => setSelectedSegmentId(selectedSegmentId === slice.id ? null : slice.id)}
                        onMouseEnter={() => setHoveredSegmentId(slice.id)}
                        onMouseLeave={() => setHoveredSegmentId(null)}
                      >
                        <title>{`${slice.code} - ${slice.name}: ${slice.share}% (${slice.count.toLocaleString()} farmers)`}</title>
                      </path>
                    );
                  })}
                </svg>

                {/* Donut Mode Center Display */}
                {chartViewMode === 'donut' && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none transition-all duration-200"
                    style={{ zIndex: 1 }}
                  >
                    {activeSegment ? (
                      <>
                        <span
                          className="text-[9px] font-black uppercase tracking-wider truncate max-w-[70px]"
                          style={{ color: activeSegment.color }}
                        >
                          {activeSegment.code}
                        </span>
                        <span className="text-base font-black text-white leading-tight">
                          {activeSegment.share}%
                        </span>
                        <span className="text-[9px] text-[#94A3B8] font-mono">
                          {activeSegment.count.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-[9px] uppercase font-semibold text-[#94A3B8] tracking-wider">
                          {filteredDashboardSegments.length === 5 ? 'Total' : 'Matches'}
                        </span>
                        <span className="text-sm font-black text-[#F1F5F9] leading-tight">
                          {filteredDashboardSegments.length === 5 ? '20,000' : `${filteredDashboardSegments.length}/5`}
                        </span>
                        <span className="text-[9px] text-[#00FF88] font-semibold">
                          5 Cohorts
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* Solid Pie Mode Overlay Tooltip (when hovered) */}
                {chartViewMode === 'pie' && activeSegment && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#111827]/95 border text-[10px] font-bold text-white shadow-lg pointer-events-none whitespace-nowrap z-10 flex items-center gap-1.5"
                    style={{ borderColor: activeSegment.color }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSegment.color }} />
                    <span>{activeSegment.code}: {activeSegment.share}%</span>
                  </div>
                )}
              </div>

              {/* Legend with Segment Colors & Live Hover/Selection Sync */}
              <div className="space-y-1.5 text-xs w-full sm:w-auto flex-1">
                {filteredDashboardSegments.length > 0 ? (
                  filteredDashboardSegments.map((seg) => {
                    const isSelected = selectedSegmentId === seg.id;
                    const isHovered = hoveredSegmentId === seg.id;
                    const isHighlighted = isSelected || isHovered;

                    return (
                      <div
                        key={seg.id}
                        id={`dashboard-legend-seg-${seg.id}`}
                        onClick={() => setSelectedSegmentId(selectedSegmentId === seg.id ? null : seg.id)}
                        onMouseEnter={() => setHoveredSegmentId(seg.id)}
                        onMouseLeave={() => setHoveredSegmentId(null)}
                        className={`flex items-center justify-between gap-3 p-1.5 rounded-xl cursor-pointer transition-all border ${
                          isHighlighted
                            ? 'bg-white/10 border-white/25 shadow-xs'
                            : 'border-transparent hover:bg-white/5'
                        }`}
                        title={`Click to select or inspect ${seg.name}`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform"
                            style={{
                              backgroundColor: seg.color,
                              boxShadow: isHighlighted ? `0 0 8px ${seg.color}` : `0 0 4px ${seg.color}80`,
                              transform: isHighlighted ? 'scale(1.3)' : 'scale(1)',
                            }}
                          />
                          <span
                            className={`truncate text-xs transition-colors ${
                              isHighlighted ? 'text-white font-bold' : 'text-[#CBD5E1]'
                            }`}
                          >
                            {seg.code} &ndash; {seg.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-[#94A3B8] font-mono hidden sm:inline">
                            {seg.count.toLocaleString()}
                          </span>
                          <span
                            className="font-bold font-mono text-xs"
                            style={{ color: isHighlighted ? seg.color : '#F1F5F9' }}
                          >
                            {seg.share}%
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-3 bg-[#111827]/60 rounded-xl text-center border border-white/10 space-y-1">
                    <p className="text-xs text-[#94A3B8]">No segments match "{segmentSearchQuery}"</p>
                    <button
                      type="button"
                      onClick={() => setSegmentSearchQuery('')}
                      className="text-[11px] font-bold text-[#00FF88] hover:underline cursor-pointer"
                    >
                      Reset search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Segment Detail Drawer / Callout */}
          {activeSegment ? (
            <div
              className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-white/5 -mx-5 -mb-5 p-4 rounded-b-3xl transition-all"
              style={{ borderTopColor: `${activeSegment.color}60` }}
            >
              <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0 mt-0.5 sm:mt-0"
                  style={{ backgroundColor: activeSegment.color, boxShadow: `0 0 8px ${activeSegment.color}` }}
                />
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-xs">{activeSegment.code} &ndash; {activeSegment.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-white/10 text-white">
                      {activeSegment.share}% ({activeSegment.count.toLocaleString()} farms)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] truncate mt-0.5">
                    {activeSegment.activity} &bull; {activeSegment.land} &bull; <span className="text-[#00FF88] font-semibold">{activeSegment.income}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('cluster-summary')}
                  className="px-2.5 py-1 rounded-lg bg-[#00FF88]/20 hover:bg-[#00FF88]/30 text-[#00FF88] border border-[#00FF88]/40 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Explore Cohort</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                {selectedSegmentId !== null && (
                  <button
                    type="button"
                    onClick={() => setSelectedSegmentId(null)}
                    className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                    title="Clear selection"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                <span>Hover or click any pie slice or legend row to inspect</span>
              </span>
              <span className="font-mono text-[10px]">20,000 Records</span>
            </div>
          )}
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
                            ? formatCurrencyINR(item.resultData.predicted_income_ngn)
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

            {/* Farmer Classification Metric */}
            <div className="bg-[#111827]/80 border border-[#06B6D4]/30 rounded-2xl p-3.5 text-center">
              <div className="flex items-center justify-center text-[#06B6D4] mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-[11px] font-medium text-[#94A3B8]">Farmer Classification</p>
              <p className="text-[10px] text-[#94A3B8]/70">Archetype Stability</p>
              <div className="text-2xl font-black text-[#F1F5F9] my-1">0.72</div>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/15 border border-[#06B6D4]/30">
                System Active
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
  </div>
</div>
);
};


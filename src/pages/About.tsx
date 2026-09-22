import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  Wheat,
  HeartHandshake,
  TrendingUp,
  Globe2,
  Users,
  Layers,
  Droplets,
  DollarSign,
  Compass,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Database,
  BarChart2,
  Check,
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent text-[#F1F5F9]">
      {/* =========================================================================
          SECTION A: ABOUT HERO
          ========================================================================= */}
      <HeroSection
        compact
        badgeText="Domain Insights &amp; Purpose"
        title="Understanding Farmers. Exploring Agriculture. Enabling Better Decisions."
        subtitle="Learn about the farming realities, agricultural resources, and technology-driven opportunities that shape modern agriculture."
        backgroundImage="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80"
        buttons={[
          {
            label: 'Explore Our Mission',
            onClick: () => {
              const el = document.getElementById('our-mission');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            },
            variant: 'primary',
          },
        ]}
      />

      {/* =========================================================================
          SECTION B: ABOUT AGRICULTURE
          ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Essential Perspectives"
          title="The Integral Role of Agriculture"
          description="Agriculture is a multi-dimensional discipline intertwining environmental stewardship, family heritage, food chemistry, and local economic resilience."
          dark={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: 'Food Security',
              desc: 'Ensuring consistent, safe, and nutritious nourishment for households and urban centers across every continent.',
              icon: Wheat,
            },
            {
              title: 'Farmer Livelihoods',
              desc: 'Empowering millions of smallholder and commercial producers with dignified, sustainable economic independence.',
              icon: Users,
            },
            {
              title: 'Household Resources',
              desc: 'Transforming land, seeds, livestock, and labor into multi-generational stability and family well-being.',
              icon: HeartHandshake,
            },
            {
              title: 'Crop Cultivation',
              desc: 'Stewarding diverse grain, pulse, vegetable, and cash crops suited to regional climates and micro-environments.',
              icon: Sprout,
            },
            {
              title: 'Livestock Management',
              desc: 'Maintaining animal health, biological forage cycles, draught assistance, and daily dairy and egg harvesting.',
              icon: HeartHandshake,
            },
            {
              title: 'Rural Development',
              desc: 'Building infrastructure, local markets, transport corridors, and skilled agricultural extension services.',
              icon: Globe2,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="agri-card p-6 sm:p-7 flex flex-col justify-between bg-[#111F17] group border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center mb-4 group-hover:bg-[#00FF88] group-hover:text-[#0A120D] transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#00FF88] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION C: UNDERSTANDING FARMERS' REALITIES
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0D1811] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Contextual Realities"
            title="Understanding Farmers’ Realities"
            description="No two farms are identical. Farmers operate under diverse physical, social, and economic conditions that fundamentally shape their daily choices and long-term opportunities."
            dark={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Farming System */}
            <div className="agri-card p-6 sm:p-8 bg-[#111F17] flex flex-col justify-between border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all">
              <div>
                <div className="text-[11px] font-bold text-[#00FF88] uppercase tracking-wider mb-2">
                  System Context
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Farming System
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Whether a household engages in subsistence, mixed-crop livestock, or commercial cropping alters how labor is allocated throughout the year and how risks are managed during droughts or market shifts.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#00FF88] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                <span>Influences operational organization</span>
              </div>
            </div>

            {/* 2. Household Demographics */}
            <div className="agri-card p-6 sm:p-8 bg-[#111F17] flex flex-col justify-between border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all">
              <div>
                <div className="text-[11px] font-bold text-[#00FF88] uppercase tracking-wider mb-2">
                  Human Context
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Household Demographics
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Family size, generational knowledge, age distribution, and gender-shared responsibilities provide vital context for understanding labor capacity and consumption requirements on the farm.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#00FF88] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                <span>Defines labor and family needs</span>
              </div>
            </div>

            {/* 3. Land Ownership */}
            <div className="agri-card p-6 sm:p-8 bg-[#111F17] flex flex-col justify-between border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all">
              <div>
                <div className="text-[11px] font-bold text-[#00FF88] uppercase tracking-wider mb-2">
                  Acreage &amp; Tenure
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Land Ownership
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  The size of cultivated acreage and security of tenure directly dictate whether a farmer can plant long-term perennial fruit orchards, invest in irrigation lines, or rotate fallow pasture.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#00FF88] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                <span>Shapes capital investments &amp; scale</span>
              </div>
            </div>

            {/* 4. Fertilizer Usage */}
            <div className="agri-card p-6 sm:p-8 bg-[#111F17] flex flex-col justify-between border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all">
              <div>
                <div className="text-[11px] font-bold text-[#00FF88] uppercase tracking-wider mb-2">
                  Agronomic Inputs
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Fertilizer Usage
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Soil amendments, organic manures, compost tea, and commercial fertilizers must match the soil's natural chemistry. Managing inputs sustainably ensures soil productivity without unnecessary expense.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#00FF88] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                <span>Critical component of soil management</span>
              </div>
            </div>

            {/* 5. Livestock Resources */}
            <div className="agri-card p-6 sm:p-8 bg-[#111F17] flex flex-col justify-between border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all">
              <div>
                <div className="text-[11px] font-bold text-[#00FF88] uppercase tracking-wider mb-2">
                  Biological Capital
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Livestock Resources
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Ruminants, draught animals, and poultry serve as biological living savings accounts, converting agricultural stalks into milk, wool, meat, and organic fertilizer for the next cropping season.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#00FF88] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                <span>Contributes food, power &amp; buffers</span>
              </div>
            </div>

            {/* 6. Agricultural Income */}
            <div className="agri-card p-6 sm:p-8 bg-[#111F17] flex flex-col justify-between border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all">
              <div>
                <div className="text-[11px] font-bold text-[#00FF88] uppercase tracking-wider mb-2">
                  Financial Realities
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Agricultural Income
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Farm earnings are inherently seasonal, heavily influenced by weather volatility, post-harvest perishability, wholesale market access, and fluctuating input costs.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-xs text-[#00FF88] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                <span>Varies with seasons &amp; trade conditions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: CHALLENGES IN AGRICULTURE
          ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Realistic Landscape"
          title="Challenges That Shape Agricultural Livelihoods"
          description="Farmers navigate an intricate web of environmental, economic, and logistical factors. While every farmer’s experience is unique, understanding these shared challenges is the first step toward building supportive solutions."
          dark={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Editorial Image Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-white/10 h-80 sm:h-96 relative">
              <img
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
                alt="Farmer working diligently in field"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-semibold text-[#00FF88] uppercase tracking-wider mb-1">
                  Field Perspective
                </p>
                <p className="text-sm font-medium leading-snug">
                  Agricultural resilience requires balanced resources, agronomic knowledge, and seasonal adaptability.
                </p>
              </div>
            </div>

            <div className="bg-[#111F17] p-5 rounded-2xl border border-white/10 text-xs text-[#94A3B8] space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#00FF88]" />
                <span>Contextual Note</span>
              </div>
              <p>
                These represent common challenges observed across global agriculture. Individual farming holdings experience these pressures differently based on regional policy, soil geography, and community networks.
              </p>
            </div>
          </div>

          {/* Detailed Challenges List */}
          <div className="lg:col-span-7 space-y-3.5">
            {[
              {
                title: 'Limited Access to Agricultural Resources',
                desc: 'Access to certified seed varieties, modern soil testing services, and affordable mechanical hire equipment varies widely across rural areas.',
              },
              {
                title: 'Differences in Land Availability & Fragmentation',
                desc: 'Inheritance partitions and rural land pressures often leave smallholders with separated micro-plots that complicate mechanization and efficient watering.',
              },
              {
                title: 'Fertilizer & Input Price Volatility',
                desc: 'Fluctuating global fertilizer supply chains and transport surcharges create uncertainty when planning early-season planting budgets.',
              },
              {
                title: 'Livestock Management & Feed Expenses',
                desc: 'Dry seasons often deplete natural grazing forage, requiring supplemental grain feed and veterinary investments to prevent herd morbidity.',
              },
              {
                title: 'Weather & Environmental Uncertainty',
                desc: 'Unpredictable monsoon timing, erratic dry spells, and sudden pest pressures challenge traditional planting calendars.',
              },
              {
                title: 'Market Access & Price Fluctuations',
                desc: 'Perishable harvests must often be sold immediately at harvest time when regional supply is highest, depressing wholesale farm-gate prices.',
              },
              {
                title: 'Variations in Seasonal Household Cash Flow',
                desc: 'Income is realized only during harvest windows, while farming input costs and household living expenses occur continuously year-round.',
              },
            ].map((ch, idx) => (
              <div
                key={idx}
                className="bg-[#111F17] rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-[#00FF88]/50 transition-colors shadow-xs"
              >
                <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                  {ch.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {ch.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: WHY DATA MATTERS IN AGRICULTURE
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0D1811] border-y border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            badge="Informed Agriculture"
            title="Turning Agricultural Data into Understanding"
            description="Data in agriculture is not about replacing the farmer's intuition—it is about organizing observations, recognizing historical patterns, and supporting grounded decision-making."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Farming Systems',
                desc: 'Comparing how different management typologies—from specialized grain monocultures to multi-crop livestock holdings—adapt over multiple rainfall cycles.',
                icon: Layers,
              },
              {
                title: 'Land Ownership & Scale',
                desc: 'Analyzing how plot dimensions and tenure agreements correlate with crop diversity and long-term soil conservation investments.',
                icon: Compass,
              },
              {
                title: 'Agricultural Inputs',
                desc: 'Tracking fertilizer application rates, seed germination ratios, and compost additions to identify diminishing returns or under-nourishment.',
                icon: Sprout,
              },
              {
                title: 'Livestock Resources',
                desc: 'Recording livestock herd counts, daily fodder requirements, and reproductive health to balance grazing pressure with pasture regeneration.',
                icon: HeartHandshake,
              },
              {
                title: 'Farm Productivity',
                desc: 'Evaluating yield responses per hectare relative to seasonal rainfall to understand which farming practices demonstrate natural climate resilience.',
                icon: BarChart2,
              },
              {
                title: 'Household Income Trends',
                desc: 'Studying how diverse income streams—such as egg sales during crop gestation—stabilize family livelihoods against crop market volatility.',
                icon: DollarSign,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#111F17] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-md hover:border-[#00FF88]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-[#0A120D] border border-white/10 text-center max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              <span className="font-bold text-[#00FF88] block mb-1">A Balanced Perspective</span>
              Data alone does not cultivate crops or resolve systemic agricultural challenges. Its true value emerges when paired with the practical experience, local soil knowledge, and dedication of farmers in their own fields.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F: OUR MISSION
          ========================================================================= */}
      <section id="our-mission" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-semibold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5" />
            <span>Guiding Purpose</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our Mission Is to Make Agricultural Insights More Accessible
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mx-auto">
            We believe agricultural knowledge, research data, and sustainable practices should be clear, transparent, and readily available to farmers, students, and agricultural advocates worldwide.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: 'Farmer-Focused Thinking',
              desc: 'Every concept, guide, and data structure is grounded in the lived realities and practical priorities of farming households.',
            },
            {
              title: 'Accessible Knowledge',
              desc: 'Transforming complex agronomic terminology and scientific research into clear, actionable, and approachable explanations.',
            },
            {
              title: 'Responsible Use of Data',
              desc: 'Presenting data objectively without unrealistic claims, respecting farmer privacy, and acknowledging environmental limits.',
            },
            {
              title: 'Technology-Enabled Understanding',
              desc: 'Leveraging modern digital design to illustrate relationships between soil, fertilizer, livestock, and livelihoods.',
            },
            {
              title: 'Informed Agricultural Decisions',
              desc: 'Supporting producers and agricultural extension teams with the clarity needed to evaluate sustainable options.',
            },
            {
              title: 'Community Collaboration',
              desc: 'Fostering shared learning between local farmers, agricultural universities, and rural development organizations.',
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="agri-card p-6 sm:p-7 bg-[#111F17] border border-white/10 hover:border-[#00FF88]/50 rounded-2xl flex flex-col justify-between shadow-xl transition-all"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION G: OUR VISION
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0D1811] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-semibold uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Looking Ahead</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            A More Informed and Technology-Enabled Agricultural Future
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            We envision a world where every farming community has access to dependable agronomic perspectives, where digital tools celebrate and empower the farmer’s craft, and where sustainable land management ensures food security for generations to come.
          </p>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-[#111F17] p-6 rounded-2xl border border-white/10 shadow-xs">
              <span className="text-2xl font-black text-[#00FF88] block mb-1">Knowledge</span>
              <p className="text-xs text-[#94A3B8]">
                Accessible agricultural science for every grower, regardless of acreage or background.
              </p>
            </div>

            <div className="bg-[#111F17] p-6 rounded-2xl border border-white/10 shadow-xs">
              <span className="text-2xl font-black text-[#00FF88] block mb-1">Stewardship</span>
              <p className="text-xs text-[#94A3B8]">
                Preserving living topsoils, clean watersheds, and biodiverse rural ecosystems.
              </p>
            </div>

            <div className="bg-[#111F17] p-6 rounded-2xl border border-white/10 shadow-xs">
              <span className="text-2xl font-black text-[#00FF88] block mb-1">Resilience</span>
              <p className="text-xs text-[#94A3B8]">
                Equipping rural households to weather climate variability and market transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: CLOSING CTA
          ========================================================================= */}
      <CTASection
        variant="forest"
        badge="Join Our Journey"
        headline="Explore Agriculture from a New Perspective"
        supportingText="Learn how farming practices, resources, and agricultural data connect."
      />
    </div>
  );
};

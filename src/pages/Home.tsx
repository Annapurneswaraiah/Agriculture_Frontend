import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wheat,
  Sprout,
  Droplets,
  Layers,
  HeartHandshake,
  DollarSign,
  TrendingUp,
  Globe2,
  Users,
  CheckCircle,
  Sun,
  Calendar,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { SectionHeading } from '../components/SectionHeading';
import { FarmingSystemCard } from '../components/FarmingSystemCard';
import { CTASection } from '../components/CTASection';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const el = document.getElementById('farming-systems');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#F1F5F9]">
      {/* =========================================================================
          SECTION A: HERO BANNER
          ========================================================================= */}
      <HeroSection
        badgeText="Technology • Agriculture • Farmer Empowerment"
        title="Empowering Farmers Through Smarter Agriculture"
        subtitle="Discover how agricultural knowledge, farming insights, and modern technology can help build a more informed and sustainable farming future."
        backgroundImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=80"
        buttons={[
          {
            label: 'Explore Agriculture',
            onClick: handleExploreClick,
            variant: 'primary',
          },
          {
            label: 'Learn About Us',
            onClick: () => navigate('/about'),
            variant: 'secondary',
          },
        ]}
      />

      {/* =========================================================================
          SECTION: FARMING SYSTEMS
          ========================================================================= */}
      <section id="farming-systems" className="py-20 sm:py-28 bg-[#0D1811] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Farm Typologies"
            title="Different Ways of Farming"
            description="Farmers worldwide adapt their methods to their local terrain, available capital, land access, and family goals. These diverse systems shape how agriculture operates globally."
            dark={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 1. Subsistence Farming */}
            <FarmingSystemCard
              title="Subsistence Farming"
              category="Family & Household Food Security"
              description="In subsistence systems, agricultural production is primarily organized to meet the direct consumption needs of the farming household, with reliance on family labor and localized seed varieties."
              image="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
              icon={Sprout}
              highlights={[
                'Focus on household food security and staple crops',
                'Reliance on seasonal rains and traditional farming tools',
                'Surplus crops occasionally shared or bartered locally',
                'High resilience through diverse multi-crop garden plots',
              ]}
            />

            {/* 2. Mixed Farming */}
            <FarmingSystemCard
              title="Mixed Farming"
              category="Integrated Crops & Livestock"
              description="Mixed farming creates a mutually beneficial cycle where crop residues feed farm animals, and animal manure enriches the soil, diversifying household nutrition and smoothing seasonal income."
              image="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
              icon={HeartHandshake}
              highlights={[
                'Synergistic integration of crop fields and animal pens',
                'Livestock provides dairy, eggs, and organic compost',
                'Risk reduction through multiple agricultural revenue sources',
                'Efficient biological recycling of farm biomass and forage',
              ]}
            />

            {/* 3. Commercial Farming */}
            <FarmingSystemCard
              title="Commercial Farming"
              category="Market-Scale Production"
              description="Commercial agriculture organizes production for regional, national, and international markets, utilizing specialized equipment, structured input management, and commercial distribution channels."
              image="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80"
              icon={TrendingUp}
              highlights={[
                'Scale-oriented crop production aimed at formal markets',
                'Higher utilization of farm machinery and targeted inputs',
                'Emphasis on crop uniformity, post-harvest logistics, and quality',
                'Enterprise-level management of cash flow and operating costs',
              ]}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: THE FARMER'S JOURNEY
          ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Seasonal Lifecycle"
          title="Every Farm Has a Story"
          description="From the first turning of the soil to the final post-harvest market distribution, every agricultural season follows an interconnected series of dedicated steps."
          dark={true}
        />

        <div className="relative">
          {/* Subtle line connector for large screens */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-white/15 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {[
              {
                step: '01',
                title: 'Preparing the Land',
                desc: 'Clearing weeds, aerating the soil, testing moisture levels, and shaping beds or furrows.',
                icon: Layers,
              },
              {
                step: '02',
                title: 'Selecting Seeds & Crops',
                desc: 'Choosing resilient crop varieties adapted to regional rainfall, soil type, and growing season.',
                icon: Sprout,
              },
              {
                step: '03',
                title: 'Managing Fertilizer & Water',
                desc: 'Applying balanced organic and mineral nutrients while conserving and channeling water to root zones.',
                icon: Droplets,
              },
              {
                step: '04',
                title: 'Caring for Crops & Animals',
                desc: 'Monitoring for pests, disease outbreaks, weed competition, and providing animal health care.',
                icon: Sun,
              },
              {
                step: '05',
                title: 'Harvesting Products',
                desc: 'Gathering mature grains, fruits, forage, and livestock goods at the optimal moisture and peak quality.',
                icon: Wheat,
              },
              {
                step: '06',
                title: 'Managing Resources & Income',
                desc: 'Balancing family consumption reserves, seed storage, and sales to support household livelihoods.',
                icon: DollarSign,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="agri-card p-6 flex flex-col justify-between bg-[#111F17] text-center group border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] mx-auto flex items-center justify-center font-black text-sm mb-4 shadow-sm group-hover:bg-[#00FF88] group-hover:text-[#0A120D] transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-extrabold text-[#00FF88] uppercase tracking-widest block mb-1">
                    Step {item.step}
                  </span>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00FF88] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F: WHY AGRICULTURE MATTERS
          ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Global & Local Significance"
          title="Why Agriculture Matters"
          description="Agriculture is the bedrock of human civilization. Its ripple effects extend far beyond fields and pastures into economic stability, nutritional well-being, and ecological health."
          dark={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: 'Food Production',
              desc: 'Supplying the essential calories, proteins, and vitamins that sustain global populations and prevent food insecurity.',
              icon: Wheat,
            },
            {
              title: 'Rural Livelihoods',
              desc: 'Providing purposeful employment, family sustenance, and generational stability for billions of rural residents worldwide.',
              icon: Users,
            },
            {
              title: 'Household Income',
              desc: 'Enabling families to meet living expenses, invest in children’s education, and purchase vital healthcare and community goods.',
              icon: DollarSign,
            },
            {
              title: 'Livestock & Crop Resources',
              desc: 'Generating natural fibers, timber, dairy, leather, and organic matter that supply regional trade and manufacturing sectors.',
              icon: HeartHandshake,
            },
            {
              title: 'Local Economies',
              desc: 'Stimulating trade in rural towns by connecting agricultural produce to processing facilities, transporters, and open markets.',
              icon: Globe2,
            },
            {
              title: 'Sustainable Resource Care',
              desc: 'Encouraging responsible stewardship of freshwater watersheds, biodiversity, and soil organic carbon reserves.',
              icon: Sprout,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="agri-card p-6 sm:p-7 flex flex-col justify-between bg-[#111F17] group border border-white/10 hover:border-[#00FF88]/50 rounded-2xl shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center shrink-0 group-hover:bg-[#00FF88] group-hover:text-[#0A120D] transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-[#00FF88] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION G: CALL TO ACTION
          ========================================================================= */}
      <CTASection
        badge="Platform Mission"
        headline="Explore a Smarter Perspective on Agriculture"
        supportingText="Discover the connection between farming practices, agricultural resources, and technology."
      />
    </div>
  );
};

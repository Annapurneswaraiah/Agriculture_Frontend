import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgriHero } from '../components/AgriHero';
import { FlightDataToDecisions } from '../components/FlightDataToDecisions';
import { InteractiveCropHealthAnalytics } from '../components/InteractiveCropHealthAnalytics';
import { IncomePredictionAndSegmentation } from '../components/IncomePredictionAndSegmentation';
import { DroneWorkflowSection } from '../components/DroneWorkflowSection';
import { AgriStatsSection } from '../components/AgriStatsSection';
import { FarmerDashboardPreview } from '../components/FarmerDashboardPreview';
import { AgriCTASection } from '../components/AgriCTASection';
import { AgriAILoader } from '../components/AgriAILoader';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const handleExploreClick = () => {
    const el = document.getElementById('flight-to-decisions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLiveIntelligenceClick = () => {
    const el = document.getElementById('crop-health');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F1F5F9] relative selection:bg-[#00FF88] selection:text-[#030712]">
      {/* 1. Initial Loading Screen with Animated AgriAI Logo */}
      {!loadingFinished && (
        <AgriAILoader
          minDurationMs={1200}
          onComplete={() => setLoadingFinished(true)}
        />
      )}

      {/* 2. Hero Section with 3D Flying Drone, Live Scanning & Metrics */}
      <AgriHero
        onExploreClick={handleExploreClick}
        onLiveIntelligenceClick={handleLiveIntelligenceClick}
        reduceMotion={reduceMotion}
        onToggleReduceMotion={() => setReduceMotion((prev) => !prev)}
      />

      {/* 3. Section 2: "From flight data to field decisions" explanation section */}
      <FlightDataToDecisions />

      {/* 4. Section 3: Interactive crop-health analytics section */}
      <InteractiveCropHealthAnalytics />

      {/* 5. Section 4: Income prediction and farmer segmentation section */}
      <IncomePredictionAndSegmentation />

      {/* 6. Section 5: Drone monitoring workflow (Capture, Analyze, Predict, Act) */}
      <DroneWorkflowSection />

      {/* 7. Section 6: Statistics section with animated counters */}
      <AgriStatsSection />

      {/* 8. Section 7: Farmer dashboard preview */}
      <FarmerDashboardPreview />

      {/* 9. Section 8: Call-to-action section */}
      <AgriCTASection />
    </div>
  );
};

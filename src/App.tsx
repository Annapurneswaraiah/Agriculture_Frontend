import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SmartAgriBackground } from './components/SmartAgriBackground';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { IncomePrediction } from './pages/IncomePrediction';
import { FarmerClustering } from './pages/FarmerClustering';
import { ClusterSummary } from './pages/ClusterSummary';
import { PredictionHistory } from './pages/PredictionHistory';
import { ContactModal } from './components/ContactModal';
import { AuthModal } from './components/AuthModal';
import { LegalModal } from './components/LegalModal';
import { UserProfile, PredictionHistoryItem } from './types';
import { getPredictionHistory, clearPredictionHistory, checkApiHealth } from './services/api';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [contactOpen, setContactOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'signin' | 'signup';
  }>({
    isOpen: false,
    mode: 'signin',
  });
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms';
  }>({
    isOpen: false,
    type: 'privacy',
  });

  const [user, setUser] = useState<UserProfile | null>({
    name: 'Agricultural Specialist',
    role: 'Agricultural Specialist',
    email: 'agri.specialist@verdant.org',
    phone: '+234 801 234 5678',
    location: 'Kaduna Agricultural Basin',
    farmSizeHectares: 4.5,
    farmingSystem: 'Commercial Crop Production',
    memberSince: 'January 2026',
    avatarInitials: 'AS',
  });

  const [history, setHistory] = useState<PredictionHistoryItem[]>(() => getPredictionHistory());
  const [apiStatus, setApiStatus] = useState<{ isOnline: boolean; latencyMs: number; statusText: string }>({
    isOnline: true,
    latencyMs: 320,
    statusText: 'Engine Operational',
  });

  useEffect(() => {
    checkApiHealth().then((status: { isOnline: boolean; latencyMs: number }) => {
      setApiStatus({
        isOnline: status.isOnline,
        latencyMs: status.latencyMs,
        statusText: status.isOnline ? 'Online • 320ms' : 'Fallback Engine Active',
      });
    });
  }, []);


  const handleClearHistory = () => {
    clearPredictionHistory();
    setHistory([]);
  };

  const handleDashboardNavigate = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'income-prediction':
      case 'prediction':
        navigate('/prediction');
        break;
      case 'farmer-clustering':
      case 'clustering':
        navigate('/clustering');
        break;
      case 'cluster-summary':
        navigate('/cluster-summary');
        break;
      case 'prediction-history':
      case 'history':
        navigate('/history');
        break;
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Determine if current route is a data/dashboard view to optimize background styling
  const isDashboardRoute = [
    '/dashboard',
    '/prediction',
    '/income-prediction',
    '/clustering',
    '/farmer-clustering',
    '/cluster-summary',
    '/history',
    '/prediction-history',
  ].some((path) => location.pathname.startsWith(path));

  const isDashboardOnly = location.pathname === '/dashboard';

  return (
    <div className="flex flex-col min-h-screen antialiased bg-transparent text-[#F1F5F9] selection:bg-[#00FF88]/30 selection:text-[#00FF88] relative">
      <SmartAgriBackground />
      <ScrollToTop />

      {/* Global Navigation */}
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        onOpenSignIn={() => setAuthModal({ isOpen: true, mode: 'signin' })}
        onOpenGetStarted={() => navigate('/dashboard')}
      />

      {/* Main Content View with React Router */}
      <main className={`flex-1 w-full ${isDashboardOnly ? '' : isDashboardRoute ? 'p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                history={history}
                onNavigate={handleDashboardNavigate}
                apiStatus={apiStatus}
                onOpenLogin={() => setAuthModal({ isOpen: true, mode: 'signin' })}
                onOpenContact={() => setContactOpen(true)}
                onLogout={() => setUser(null)}
              />
            }
          />
          <Route
            path="/prediction"
            element={
              <IncomePrediction
                onPredictionComplete={() => setHistory(getPredictionHistory())}
                onNavigateToClustering={() => navigate('/clustering')}
              />
            }
          />
          <Route
            path="/income-prediction"
            element={<Navigate to="/prediction" replace />}
          />
          <Route
            path="/clustering"
            element={
              <FarmerClustering
                onPredictionComplete={() => setHistory(getPredictionHistory())}
                onNavigateToSummary={() => navigate('/cluster-summary')}
              />
            }
          />
          <Route
            path="/farmer-clustering"
            element={<Navigate to="/clustering" replace />}
          />
          <Route
            path="/cluster-summary"
            element={
              <ClusterSummary
                onSelectClusterForInference={() => navigate('/clustering')}
              />
            }
          />
          <Route
            path="/history"
            element={
              <PredictionHistory
                history={history}
                onClearHistory={handleClearHistory}
                onNavigate={handleDashboardNavigate}
              />
            }
          />
          <Route
            path="/prediction-history"
            element={<Navigate to="/history" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer
        onOpenContact={() => setContactOpen(true)}
        onOpenPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
        onOpenTerms={() => setLegalModal({ isOpen: true, type: 'terms' })}
      />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
      />

      <LegalModal
        isOpen={legalModal.isOpen}
        type={legalModal.type}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


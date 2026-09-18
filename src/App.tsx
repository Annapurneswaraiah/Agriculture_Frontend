import React, { useState, useEffect } from 'react';
import { Menu, Sprout } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { BrandLogo } from './components/BrandLogo';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';
import { IncomePrediction } from './pages/IncomePrediction';
import { FarmerClustering } from './pages/FarmerClustering';
import { ClusterSummary } from './pages/ClusterSummary';
import { PredictionHistory } from './pages/PredictionHistory';
import { About } from './pages/About';
import { ContactUs } from './pages/ContactUs';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';
import { AuthModal } from './pages/AuthModal';
import { UserProfile, PredictionHistoryItem, NotificationItem, QueryAdvisory } from './types';
import {
  getPredictionHistory,
  clearPredictionHistory,
  checkRenderApiHealth,
} from './services/api';
import { analyzeQueryProblemAndAdvise } from './services/advisoryService';

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 101,
    title: 'Query: Fertilizer Cost Diminishing Returns',
    time: '12m ago',
    desc: 'Farmer Query: "Applying 180 kg/ha chemical fertilizer but crop revenue is stagnant."',
    read: false,
    type: 'query',
    queryDetails: {
      name: 'Ramesh Kumar',
      phone: '+91 98765-43210',
      subject: 'Excessive fertilizer spending with diminishing yield returns',
      message: 'I am applying over 180 kg/ha of chemical fertilizer on my 2.5 hectare plot, but my yield and income are not improving. The input costs are eating up my profit.',
    },
    advisory: analyzeQueryProblemAndAdvise(
      'Excessive fertilizer spending with diminishing yield returns',
      'I am applying over 180 kg/ha of chemical fertilizer on my 2.5 hectare plot, but my yield and income are not improving. The input costs are eating up my profit.'
    ),
  },
  { id: 1, title: 'Income Prediction Ready', time: '25m ago', desc: 'Predicted ₦378,550.94 for Commercial farm', read: false, type: 'ml' },
  { id: 2, title: 'Cluster Model Evaluated', time: '1h ago', desc: 'Silhouette score improved to 0.72', read: false, type: 'ml' },
  { id: 3, title: 'Fertilizer Optimization Tip', time: '1d ago', desc: 'Reduce urea by 15% to increase profit margin', read: false, type: 'system' },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agri_ai_user_profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.name && parsed.name !== 'Nandyala') {
            return parsed;
          } else {
            localStorage.removeItem('agri_ai_user_profile');
          }
        } catch {}
      }
    }
    return null;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agri_ai_notifications');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return DEFAULT_NOTIFICATIONS;
  });

  const [history, setHistory] = useState<PredictionHistoryItem[]>(() => getPredictionHistory());
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);
  const [suggestedModelParams, setSuggestedModelParams] = useState<any>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('agri_ai_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const handleToggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('agri_ai_sidebar_collapsed', String(next));
      }
      return next;
    });
  };

  const [apiStatus, setApiStatus] = useState<{ isOnline: boolean; latencyMs: number; statusText: string }>({
    isOnline: true,
    latencyMs: 180,
    statusText: 'API Connected',
  });

  // Check API health on mount
  useEffect(() => {
    let isMounted = true;
    checkRenderApiHealth().then((res) => {
      if (isMounted) {
        setApiStatus(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefreshHistory = () => {
    setHistory(getPredictionHistory());
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your prediction history?')) {
      clearPredictionHistory();
      setHistory([]);
    }
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setUser(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agri_ai_user_profile', JSON.stringify(updated));
      localStorage.removeItem('agri_ai_logged_out');
    }
  };

  // Add notification handler (used for submitted queries, predictions, etc.)
  const handleAddNotification = (newNotif: {
    title: string;
    desc: string;
    type?: 'query' | 'system' | 'ml';
    queryDetails?: {
      name: string;
      phone: string;
      email?: string;
      subject: string;
      message: string;
    };
    advisory?: QueryAdvisory;
  }) => {
    const item: NotificationItem = {
      id: Date.now(),
      title: newNotif.title,
      desc: newNotif.desc,
      time: 'Just now',
      read: false,
      type: newNotif.type || 'query',
      queryDetails: newNotif.queryDetails,
      advisory: newNotif.advisory,
    };

    setNotifications((prev) => {
      const updated = [item, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('agri_ai_notifications', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      if (typeof window !== 'undefined') {
        localStorage.setItem('agri_ai_notifications', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      if (typeof window !== 'undefined') {
        localStorage.setItem('agri_ai_notifications', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleResetNotifications = () => {
    const reset = notifications.map((n) => ({ ...n, read: false }));
    setNotifications(reset);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agri_ai_notifications', JSON.stringify(reset));
    }
  };

  // Model recommendation application from query advisory
  const handleApplyModelRecommendation = (suggestedInputs: any, targetTab: string) => {
    if (suggestedInputs) {
      setSuggestedModelParams(suggestedInputs);
    }
    setCurrentTab(targetTab || 'income-prediction');
  };

  // Comprehensive Logout handler
  const handleLogout = () => {
    // 1. Clear user session
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agri_ai_user_profile');
      localStorage.setItem('agri_ai_logged_out', 'true');
    }

    // 2. Clear search input
    setSearchTerm('');

    // 3. Increment resetTrigger so forms clear all parameters
    setResetTrigger((prev) => prev + 1);

    // 4. Show friendly notification
    setLogoutMessage('Logged out successfully. You can sign in or register anytime.');
    setTimeout(() => {
      setLogoutMessage(null);
    }, 4000);
  };

  const handleRefreshApi = async () => {
    setApiStatus({ isOnline: false, latencyMs: 0, statusText: 'Connecting...' });
    const res = await checkRenderApiHealth();
    setApiStatus(res);
  };

  const isDashboardView = [
    'dashboard',
    'income-prediction',
    'farmer-clustering',
    'cluster-summary',
    'prediction-history',
    'profile',
  ].includes(currentTab);

  return (
    <div className="min-h-screen bg-[#0B0F14] flex text-[#F1F5F9] font-sans relative selection:bg-[#00FF88]/30 selection:text-[#00FF88]">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#00FF88]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#06B6D4]/5 blur-[120px]" />
      </div>

      {/* Left Sidebar - rendered when user is on dashboard or dashboard tools */}
      {isDashboardView && (
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          isOpenMobile={isOpenMobile}
          onCloseMobile={() => setIsOpenMobile(false)}
          onLogout={handleLogout}
          user={user}
          onOpenLogin={(mode) => handleOpenAuth(mode || 'signin')}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebarCollapse}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative z-10 ${
          isDashboardView
            ? isSidebarCollapsed
              ? 'lg:pl-20'
              : 'lg:pl-64'
            : 'w-full'
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          currentTab={currentTab}
          isDashboardView={isDashboardView}
          user={user}
          onOpenMobileSidebar={() => setIsOpenMobile(true)}
          onNavigate={setCurrentTab}
          onLogout={handleLogout}
          onOpenLogin={(mode) => handleOpenAuth(mode || 'signin')}
          apiStatus={apiStatus}
          onRefreshApi={handleRefreshApi}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onNotificationClick={handleNotificationClick}
          onResetNotifications={handleResetNotifications}
          onApplyModelRecommendation={handleApplyModelRecommendation}
        />

        {/* Optional Logout Notification Banner */}
        {logoutMessage && (
          <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-3.5 bg-[#111827] border border-[#00FF88]/30 text-[#F1F5F9] text-xs font-semibold rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              {logoutMessage}
            </span>
            <button
              onClick={() => handleOpenAuth('signin')}
              className="ml-3 px-3 py-1 bg-[#00FF88] text-[#0B0F14] rounded-xl text-xs font-black hover:bg-[#00FF88]/90 transition-colors cursor-pointer"
            >
              Sign In Again
            </button>
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <Dashboard
              user={user}
              history={history}
              onNavigate={setCurrentTab}
              apiStatus={apiStatus}
              onOpenLogin={() => handleOpenAuth('signin')}
            />
          )}

          {currentTab === 'income-prediction' && (
            <IncomePrediction
              onPredictionComplete={handleRefreshHistory}
              onNavigateToClustering={() => setCurrentTab('farmer-clustering')}
              resetTrigger={resetTrigger}
              suggestedParams={suggestedModelParams}
            />
          )}

          {currentTab === 'farmer-clustering' && (
            <FarmerClustering
              onPredictionComplete={handleRefreshHistory}
              onNavigateToSummary={() => setCurrentTab('cluster-summary')}
              resetTrigger={resetTrigger}
              suggestedParams={suggestedModelParams}
            />
          )}

          {currentTab === 'cluster-summary' && (
            <ClusterSummary
              onSelectClusterForInference={() => setCurrentTab('farmer-clustering')}
            />
          )}

          {currentTab === 'prediction-history' && (
            <PredictionHistory
              history={history}
              onClearHistory={handleClearHistory}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'profile' && (
            <Profile
              user={user}
              onUpdateUser={handleUpdateUser}
              onOpenLogin={() => handleOpenAuth('signin')}
            />
          )}

          {currentTab === 'home' && (
            <Home
              onNavigate={setCurrentTab}
              user={user}
              onOpenLogin={(mode) => handleOpenAuth(mode || 'signup')}
            />
          )}

          {currentTab === 'about' && <About />}

          {currentTab === 'contact' && (
            <ContactUs
              user={user}
              onNavigateToTab={(tab, inputs) => {
                if (inputs) {
                  setSuggestedModelParams(inputs);
                }
                setCurrentTab(tab);
              }}
              onSubmitInquiry={(inquiry) => {
                handleAddNotification({
                  title: `Query: ${inquiry.subject}`,
                  desc: `${inquiry.name} (${inquiry.phone}): "${inquiry.message.length > 70 ? inquiry.message.slice(0, 67) + '...' : inquiry.message}"`,
                  type: 'query',
                  queryDetails: {
                    name: inquiry.name,
                    phone: inquiry.phone,
                    email: inquiry.email,
                    subject: inquiry.subject,
                    message: inquiry.message,
                  },
                  advisory: inquiry.advisory,
                });
              }}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onNavigate={setCurrentTab} />
      </div>

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleUpdateUser}
      />
    </div>
  );
}

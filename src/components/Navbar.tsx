import React, { useState } from 'react';
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Radio,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Eye,
  Lightbulb,
  LayoutDashboard,
  Home as HomeIcon,
  Info,
  Mail
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UserProfile, NotificationItem } from '../types';
import { AdvisoryModal } from './AdvisoryModal';

interface NavbarProps {
  currentTab: string;
  isDashboardView?: boolean;
  user: UserProfile | null;
  onOpenMobileSidebar: () => void;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  onOpenLogin: (initialMode?: 'signin' | 'signup') => void;
  apiStatus: { isOnline: boolean; latencyMs: number; statusText: string };
  onRefreshApi: () => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onNotificationClick: (id: number) => void;
  onResetNotifications?: () => void;
  onApplyModelRecommendation?: (suggestedInputs: any, targetTab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  isDashboardView = false,
  user,
  onOpenMobileSidebar,
  onNavigate,
  onLogout,
  onOpenLogin,
  apiStatus,
  onRefreshApi,
  searchTerm = '',
  onSearchChange,
  notifications,
  onMarkAllRead,
  onNotificationClick,
  onResetNotifications,
  onApplyModelRecommendation,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedAdvisoryNotification, setSelectedAdvisoryNotification] = useState<NotificationItem | null>(null);
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleOpenAdvisoryModal = (n: NotificationItem) => {
    onNotificationClick(n.id);
    setSelectedAdvisoryNotification(n);
    setIsAdvisoryModalOpen(true);
    setShowNotifications(false);
  };

  const isDashboardActive = [
    'dashboard',
    'income-prediction',
    'farmer-clustering',
    'cluster-summary',
    'prediction-history',
    'profile',
  ].includes(currentTab);

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, isActive: currentTab === 'home' },
    { id: 'about', label: 'About Us', icon: Info, isActive: currentTab === 'about' },
    { id: 'contact', label: 'Contact', icon: Mail, isActive: currentTab === 'contact' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, isActive: isDashboardActive },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setIsMobileNavOpen(false);
    setShowUserMenu(false);
    setShowNotifications(false);
  };

  return (
    <header className="bg-[#0B0F14]/85 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Brand Logo & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Mobile Sidebar Toggle when in dashboard view */}
          {isDashboardView ? (
            <button
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Open dashboard sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {/* Brand Logo */}
          <div className={isDashboardView ? 'lg:hidden' : ''}>
            <BrandLogo
              variant="dark"
              size="md"
              onClick={() => handleNavClick('home')}
            />
          </div>
        </div>

        {/* Center: Main Navigation Links (Home, About Us, Contact, Dashboard) */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              id={`navbar-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                item.isActive
                  ? 'bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/40 shadow-sm shadow-[#00FF88]/20'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search Bar (Optional on wider screens in Dashboard view) */}
        {isDashboardView && onSearchChange && (
          <div className="relative hidden xl:block w-48">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="global-search-input"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#111827]/80 border border-white/10 rounded-full text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#00FF88] transition-all font-medium"
            />
          </div>
        )}

        {/* Right Side: Status Badge + Notifications + Sign In / Sign Up / User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Live API Status Pill */}
          <button
            type="button"
            onClick={onRefreshApi}
            title="Click to check Render backend connection"
            className="hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium border bg-[#111827]/90 text-[#F1F5F9] border-white/10 hover:border-[#00FF88]/40 transition-colors cursor-pointer shadow-xs"
          >
            <span className={`w-2 h-2 rounded-full ${apiStatus.isOnline ? 'bg-[#00FF88] shadow-sm shadow-[#00FF88] animate-pulse' : 'bg-[#F59E0B]'}`} />
            <span className="font-semibold text-xs">{apiStatus.statusText}</span>
            <span className="text-[10px] text-[#00FF88] font-mono hidden lg:inline">
              {apiStatus.latencyMs > 0 ? `(${apiStatus.latencyMs}ms)` : ''}
            </span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              id="notifications-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span
                  id="notification-badge-count"
                  className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-[#F43F5E] text-white rounded-full text-[10px] font-bold flex items-center justify-center border border-[#0B0F14] shadow-xs"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-84 sm:w-[420px] bg-[#111827]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                      Notifications &amp; Advisories
                    </span>
                    {unreadCount > 0 ? (
                      <span className="text-[10px] font-bold bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30 px-1.5 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#00FF88] bg-[#00FF88]/10 border border-[#00FF88]/30 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        All read
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 ? (
                    <button
                      type="button"
                      id="mark-all-read-btn"
                      onClick={onMarkAllRead}
                      className="text-[11px] font-bold text-[#00FF88] hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  ) : onResetNotifications ? (
                    <button
                      type="button"
                      onClick={onResetNotifications}
                      className="text-[10px] text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
                    >
                      Reset demo
                    </button>
                  ) : null}
                </div>

                <div className="divide-y divide-white/5 max-h-[420px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-[#94A3B8]">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onNotificationClick(n.id);
                          if (n.advisory) {
                            handleOpenAdvisoryModal(n);
                          }
                        }}
                        className={`p-3.5 transition-colors cursor-pointer ${
                          n.read ? 'bg-transparent hover:bg-white/5' : 'bg-[#00FF88]/5 hover:bg-[#00FF88]/10'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            {n.type === 'query' ? (
                              <div className="p-2 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 shrink-0 mt-0.5">
                                <HelpCircle className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="p-2 rounded-xl bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 shrink-0 mt-0.5">
                                <Sparkles className="w-4 h-4" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <h5 className={`text-xs font-bold leading-tight ${!n.read ? 'text-[#F1F5F9]' : 'text-[#94A3B8]'}`}>
                                  {n.title}
                                </h5>
                                {n.type === 'query' && (
                                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-[#F59E0B] text-black rounded-xs tracking-wider">
                                    Need Help Query
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">{n.desc}</p>

                              {/* Model Advisory Preview if query was diagnosed */}
                              {n.advisory && (
                                <div className="mt-2 p-2.5 bg-[#0B0F14]/90 border border-[#00FF88]/30 rounded-xl space-y-1.5 text-xs text-[#F1F5F9] shadow-xs">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[10px] font-bold text-[#00FF88] flex items-center gap-1">
                                      <Lightbulb className="w-3 h-3 text-[#F59E0B]" />
                                      <span>Model Problem Advisory</span>
                                    </span>
                                    <span className="text-[9px] px-1.5 py-0.2 bg-[#00FF88]/20 text-[#00FF88] font-bold rounded">
                                      {n.advisory.problemCategory}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-[#F1F5F9]/80 font-medium line-clamp-1">
                                    {n.advisory.actionSteps[0] || n.advisory.modelRecommendation}
                                  </p>

                                  <div className="pt-1 flex items-center justify-between">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenAdvisoryModal(n);
                                      }}
                                      className="text-[10px] font-bold text-[#00FF88] hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>View Full Diagnosis &amp; Steps</span>
                                    </button>

                                    {n.advisory.suggestedInputs && onApplyModelRecommendation && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onApplyModelRecommendation(
                                            n.advisory?.suggestedInputs,
                                            n.advisory?.recommendedTab || 'income-prediction'
                                          );
                                          setShowNotifications(false);
                                        }}
                                        className="text-[10px] font-bold text-[#00FF88] hover:underline flex items-center gap-0.5 cursor-pointer"
                                      >
                                        <span>Test in Model</span>
                                        <ArrowRight className="w-2.5 h-2.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[10px] text-[#94A3B8]/70 font-medium block">{n.time}</span>
                            {!n.read && (
                              <span className="inline-block w-2 h-2 rounded-full bg-[#00FF88] mt-1 shadow-xs shadow-[#00FF88]" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill or Sign In / Sign Up CTA */}
          {user ? (
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-full hover:bg-white/5 transition-colors border border-white/10 bg-[#111827]/80 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF88] to-[#06B6D4] text-[#0B0F14] flex items-center justify-center font-extrabold text-xs shadow-xs">
                  {user.avatarInitials}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#F1F5F9] leading-tight flex items-center gap-1">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] leading-tight font-medium">
                    {user.role}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#94A3B8] hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#111827]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-white/10">
                    <p className="text-xs font-bold text-[#F1F5F9]">{user.name}</p>
                    <p className="text-[11px] text-[#94A3B8] truncate">{user.phone}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-[#F1F5F9] hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#94A3B8]" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('prediction-history');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-[#F1F5F9] hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Radio className="w-4 h-4 text-[#94A3B8]" />
                      <span>My Predictions</span>
                    </button>
                    <a
                      href="https://agriculture-ml-model-bb2i.onrender.com/docs"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs text-[#F1F5F9] hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-[#94A3B8]" />
                      <span>FastAPI Swagger Docs</span>
                    </a>
                  </div>

                  <div className="border-t border-white/10 pt-1">
                    <button
                      id="navbar-logout-btn"
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                id="navbar-signin-btn"
                onClick={() => onOpenLogin('signin')}
                className="hidden sm:inline-flex items-center space-x-1.5 py-1.5 px-3.5 rounded-full border border-white/10 bg-[#111827]/80 hover:bg-white/5 text-[#F1F5F9] text-xs font-semibold transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Sign In</span>
              </button>
              <button
                id="navbar-signup-btn"
                onClick={() => onOpenLogin('signup')}
                className="flex items-center space-x-1.5 py-1.5 px-4 rounded-full bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-extrabold transition-all shadow-sm shadow-[#00FF88]/20 hover:shadow-[#00FF88]/40 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown for public pages */}
      {isMobileNavOpen && !isDashboardView && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col space-y-1 animate-in slide-in-from-top-2 duration-150">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2.5 ${
                item.isActive
                  ? 'bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
          {!user && (
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenLogin('signin');
                  setIsMobileNavOpen(false);
                }}
                className="w-full py-2 rounded-xl text-xs font-bold text-[#F1F5F9] bg-[#111827] border border-white/10 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => {
                  onOpenLogin('signup');
                  setIsMobileNavOpen(false);
                }}
                className="w-full py-2 rounded-xl text-xs font-bold text-[#0B0F14] bg-[#00FF88] flex items-center justify-center space-x-1.5 cursor-pointer font-extrabold shadow-sm shadow-[#00FF88]/30"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Advisory Modal for Detailed Diagnosis & Actions */}
      <AdvisoryModal
        notification={selectedAdvisoryNotification}
        isOpen={isAdvisoryModalOpen}
        onClose={() => setIsAdvisoryModalOpen(false)}
        onApplyModelRecommendation={onApplyModelRecommendation}
      />
    </header>
  );
};

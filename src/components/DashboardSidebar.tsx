import React, { useState } from 'react';
import {
  Home,
  Info,
  Mail,
  LogIn,
  LogOut,
  LayoutDashboard,
  TrendingUp,
  Users,
  History,
  Sprout,
  X,
  Menu,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  User
} from 'lucide-react';
import { UserProfile } from '../types';

interface DashboardSidebarProps {
  user: UserProfile | null;
  activeSection?: string;
  onNavigate: (tab: string) => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  user,
  activeSection = 'overview',
  onNavigate,
  onOpenContact,
  onOpenLogin,
  onLogout,
}) => {
  // Desktop state: extended (open) vs closed (collapsed)
  const [isExtended, setIsExtended] = useState(true);
  // Mobile drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleAction = (action: () => void) => {
    action();
    setMobileSidebarOpen(false);
  };

  // Content rendered inside the sidebar (supports both extended & closed modes)
  const renderSidebarInner = (isMobile = false) => {
    const extended = isMobile ? true : isExtended;

    return (
      <div className={`flex flex-col h-full justify-between ${extended ? 'p-4 sm:p-5' : 'p-3'} transition-all duration-300`}>
        {/* Top Header / Branding & Extend/Close Button */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#42F58D]/15">
            {extended ? (
              <div
                onClick={() => handleAction(() => onNavigate('dashboard'))}
                className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0"
                title="Go to Dashboard"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#42F58D]/15 border border-[#42F58D]/30 flex items-center justify-center shadow-none group-hover:scale-105 transition-transform shrink-0">
                  <Sprout className="w-5 h-5 text-[#42F58D]" />
                </div>
                <div className="truncate">
                  <div className="text-sm font-black tracking-tight text-[#F4F8F4] flex items-center gap-1.5">
                    <span className="truncate">AgriAI Telemetry</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#42F58D]/20 text-[#42F58D] border border-[#42F58D]/30 shrink-0">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A0B4A5] truncate">Precision Workspace</p>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsExtended(true)}
                className="w-10 h-10 mx-auto rounded-2xl bg-[#42F58D]/15 border border-[#42F58D]/30 flex items-center justify-center shadow-none cursor-pointer hover:scale-105 transition-transform"
                title="Extend Navbar (Click to open)"
              >
                <Sprout className="w-5 h-5 text-[#42F58D]" />
              </div>
            )}

            {/* Desktop: Extend / Close Toggle Button */}
            {!isMobile && (
              <button
                type="button"
                id="sidebar-toggle-button"
                onClick={() => setIsExtended(!isExtended)}
                className={`p-1.5 rounded-xl text-[#A0B4A5] hover:text-[#42F58D] hover:bg-[#12241A] border border-[#42F58D]/15 transition-colors cursor-pointer shrink-0 ${
                  !extended ? 'mt-2 mx-auto flex items-center justify-center' : 'ml-2'
                }`}
                title={extended ? 'Close / Collapse Navbar' : 'Extend / Open Navbar'}
                aria-label={extended ? 'Close Navbar' : 'Extend Navbar'}
              >
                {extended ? (
                  <PanelLeftClose className="w-4 h-4" />
                ) : (
                  <PanelLeftOpen className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Mobile: Close Drawer button */}
            {isMobile && (
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-xl text-[#A0B4A5] hover:text-[#F4F8F4] hover:bg-[#12241A] transition-colors"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Extend/Closed status chip when collapsed */}
          {!extended && !isMobile && (
            <div className="pt-2 pb-1 text-center">
              <button
                type="button"
                onClick={() => setIsExtended(true)}
                className="text-[9px] font-bold text-[#42F58D] hover:underline uppercase tracking-wider"
                title="Click to extend sidebar"
              >
                Extend &rarr;
              </button>
            </div>
          )}

          {/* Section 1: Main Pages */}
          <div className="mt-4 space-y-1">
            {extended && (
              <div className="text-[10px] font-black uppercase tracking-wider text-[#A0B4A5] px-3 mb-1.5">
                Main Pages
              </div>
            )}

            {/* 🏠 Home */}
            <button
              type="button"
              id="sidebar-link-home"
              onClick={() => handleAction(() => onNavigate('home'))}
              title="Home: Back to main website"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A] transition-all cursor-pointer group ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              }`}
            >
              <Home className="w-4 h-4 text-[#86D957] group-hover:text-[#42F58D] transition-colors shrink-0" />
              {extended && (
                <>
                  <span className="flex-1 text-left">Home</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A0B4A5]/40 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* ℹ️ About Us */}
            <button
              type="button"
              id="sidebar-link-about"
              onClick={() => handleAction(() => onNavigate('about'))}
              title="About Us: Platform mission & data"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A] transition-all cursor-pointer group ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              }`}
            >
              <Info className="w-4 h-4 text-[#86D957] group-hover:text-[#42F58D] transition-colors shrink-0" />
              {extended && (
                <>
                  <span className="flex-1 text-left">About Us</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A0B4A5]/40 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* 📊 Dashboard Overview */}
            <button
              type="button"
              id="sidebar-link-dashboard"
              onClick={() => handleAction(() => onNavigate('dashboard'))}
              title="Dashboard: Live farm workspace"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              } ${
                activeSection === 'overview'
                  ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30 shadow-none'
                  : 'text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#42F58D] shrink-0" />
              {extended && (
                <>
                  <span className="flex-1 text-left">Dashboard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#42F58D]" />
                </>
              )}
            </button>
          </div>

          {/* Section 2: Predictive & Analytical Tools */}
          <div className="mt-4 space-y-1">
            {extended && (
              <div className="text-[10px] font-black uppercase tracking-wider text-[#A0B4A5] px-3 mb-1.5">
                Smart Tools
              </div>
            )}

            {/* 📈 Income Prediction */}
            <button
              type="button"
              id="sidebar-link-income-pred"
              onClick={() => handleAction(() => onNavigate('income-prediction'))}
              title="Income Prediction Tool"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A] transition-all cursor-pointer group ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#42F58D] group-hover:scale-110 transition-transform shrink-0" />
              {extended && (
                <>
                  <span className="flex-1 text-left">Income Prediction</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30">
                    Tool
                  </span>
                </>
              )}
            </button>

            {/* 👥 Farmer Segments */}
            <button
              type="button"
              id="sidebar-link-farmer-segments"
              onClick={() => handleAction(() => onNavigate('cluster-summary'))}
              title="Farmer Segments (5 Cohorts)"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A] transition-all cursor-pointer group ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              }`}
            >
              <Users className="w-4 h-4 text-[#86D957] group-hover:scale-110 transition-transform shrink-0" />
              {extended && (
                <>
                  <span className="flex-1 text-left">Farmer Segments</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#86D957]/15 text-[#86D957] border border-[#86D957]/30">
                    5 Cohorts
                  </span>
                </>
              )}
            </button>

            {/* 🕒 Prediction History */}
            <button
              type="button"
              id="sidebar-link-history"
              onClick={() => handleAction(() => onNavigate('prediction-history'))}
              title="Prediction & Query History"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A] transition-all cursor-pointer group ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              }`}
            >
              <History className="w-4 h-4 text-[#86D957] group-hover:scale-110 transition-transform shrink-0" />
              {extended && (
                <span className="flex-1 text-left">Prediction History</span>
              )}
            </button>

            {/* 👤 My Profile */}
            <button
              type="button"
              id="sidebar-link-profile"
              onClick={() => handleAction(() => onNavigate('profile'))}
              title="Farmer Profile & Settings"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A] transition-all cursor-pointer group ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              } ${
                activeSection === 'profile'
                  ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30 shadow-none'
                  : ''
              }`}
            >
              <User className="w-4 h-4 text-[#86D957] group-hover:scale-110 transition-transform shrink-0" />
              {extended && (
                <>
                  <span className="flex-1 text-left">My Profile</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A0B4A5]/40 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Section 3: Inquiries & Support */}
          <div className="mt-4 space-y-1">
            {extended && (
              <div className="text-[10px] font-black uppercase tracking-wider text-[#A0B4A5] px-3 mb-1.5">
                Support
              </div>
            )}

            {/* ✉️ Contact */}
            <button
              type="button"
              id="sidebar-link-contact"
              onClick={() => handleAction(onOpenContact)}
              title="Contact: Agricultural specialist support"
              className={`w-full flex items-center gap-3 rounded-xl text-xs font-semibold text-[#F4F8F4] hover:text-[#42F58D] hover:bg-[#12241A] transition-all cursor-pointer group ${
                extended ? 'px-3 py-2.5' : 'p-2.5 justify-center'
              }`}
            >
              <Mail className="w-4 h-4 text-[#86D957] group-hover:text-[#42F58D] transition-colors shrink-0" />
              {extended && (
                <>
                  <span className="flex-1 text-left">Contact</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A0B4A5]/40 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Section: Profile, Sign In & Logout */}
        <div className="pt-4 border-t border-[#42F58D]/15 space-y-2.5">
          {/* User Profile Card */}
          {user ? (
            extended ? (
              <div
                onClick={() => handleAction(() => onNavigate('profile'))}
                className="p-3 rounded-2xl bg-[#12241A] border border-[#42F58D]/15 hover:border-[#42F58D]/40 transition-all cursor-pointer group"
                title="View & Edit Profile"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#42F58D]/20 border border-[#42F58D]/40 flex items-center justify-center text-xs font-black text-[#42F58D] shrink-0 group-hover:scale-105 transition-transform">
                    {user.avatarInitials || 'AS'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#F4F8F4] group-hover:text-[#42F58D] transition-colors truncate">{user.name}</div>
                    <div className="text-[10px] text-[#42F58D] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#42F58D] animate-pulse" />
                      <span className="truncate">{user.role}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A0B4A5]/40 group-hover:text-[#42F58D] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ) : (
              <div
                onClick={() => handleAction(() => onNavigate('profile'))}
                className="w-10 h-10 mx-auto rounded-full bg-[#42F58D]/20 border border-[#42F58D]/40 flex items-center justify-center text-xs font-black text-[#42F58D] relative cursor-pointer hover:scale-105 transition-transform"
                title={`${user.name} (${user.role}) - Click to view profile`}
              >
                {user.avatarInitials || 'AS'}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#42F58D] border-2 border-[#07110C]" />
              </div>
            )
          ) : null}

          {/* Action Buttons: Sign In / Switch */}
          <button
            type="button"
            id="sidebar-link-signin"
            onClick={() => handleAction(onOpenLogin)}
            title={user ? 'Switch / Sign In' : 'Sign In'}
            className={`w-full flex items-center rounded-xl text-xs font-bold bg-[#12241A] hover:bg-[#12241A]/80 border border-[#42F58D]/15 text-[#F4F8F4] hover:text-[#42F58D] transition-all cursor-pointer shadow-none ${
              extended ? 'justify-center gap-2 px-3 py-2' : 'p-2.5 justify-center'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-[#42F58D] shrink-0" />
            {extended && <span>{user ? 'Switch / Sign In' : 'Sign in'}</span>}
          </button>

          {/* Action Buttons: Logout */}
          {user && (
            <button
              type="button"
              id="sidebar-link-logout"
              onClick={() => handleAction(onLogout)}
              title="Logout session"
              className={`w-full flex items-center rounded-xl text-xs font-bold bg-red-950/30 hover:bg-red-900/50 border border-red-500/20 text-red-300 hover:text-red-200 transition-all cursor-pointer ${
                extended ? 'justify-center gap-2 px-3 py-2' : 'p-2.5 justify-center'
              }`}
            >
              <LogOut className="w-3.5 h-3.5 text-red-400 shrink-0" />
              {extended && <span>Logout</span>}
            </button>
          )}

          {/* Bottom Extend/Close Toggle Bar for Desktop */}
          {!isMobile && (
            <button
              type="button"
              id="sidebar-bottom-toggle"
              onClick={() => setIsExtended(!isExtended)}
              className={`w-full pt-1 text-[11px] font-semibold text-[#A0B4A5] hover:text-[#F4F8F4] flex items-center transition-colors cursor-pointer ${
                extended ? 'justify-between px-2' : 'justify-center py-1'
              }`}
              title={extended ? 'Close Sidebar (Collapse)' : 'Extend Sidebar (Expand)'}
            >
              {extended ? (
                <>
                  <span className="text-[10px] text-[#A0B4A5]/70">Navigation Width</span>
                  <span className="flex items-center gap-1 text-[#42F58D] hover:underline">
                    <span>Close</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </>
              ) : (
                <span className="flex items-center gap-1 text-[#42F58D]" title="Extend Navbar">
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Top Bar with Extend/Open Toggle */}
      <div className="lg:hidden w-full px-4 pt-4 pb-2">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0D1B13] border border-[#42F58D]/15 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#42F58D]/15 border border-[#42F58D]/30 flex items-center justify-center">
              <Sprout className="w-4 h-4 text-[#42F58D]" />
            </div>
            <div>
              <span className="text-xs font-black text-[#F4F8F4] block">Dashboard Menu</span>
              <span className="text-[10px] text-[#A0B4A5]">AgriAI Precision</span>
            </div>
          </div>
          <button
            type="button"
            id="mobile-sidebar-open-btn"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-[#12241A] text-[#42F58D] border border-[#42F58D]/20 hover:bg-[#12241A]/80 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4" />
            <span>Extend Menu</span>
          </button>
        </div>
      </div>

      {/* Desktop Persistent Left-Side Navbar Docked to the Edge of UI */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out border-r border-[#42F58D]/15 bg-[#0D1B13]/95 backdrop-blur-xl z-20 self-stretch min-h-[calc(100vh-5rem)] ${
          isExtended ? 'w-64' : 'w-20'
        }`}
      >
        <div className="sticky top-20 h-[calc(100vh-5rem)] flex flex-col justify-between overflow-y-auto overflow-x-hidden transition-all duration-300">
          {renderSidebarInner(false)}
        </div>
      </aside>

      {/* Mobile Drawer Overlay Docked to Left Edge */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer docked to left edge of screen */}
          <div className="relative w-72 max-w-[85vw] bg-[#0D1B13] border-r border-[#42F58D]/20 h-full z-10 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
            {renderSidebarInner(true)}
          </div>
        </div>
      )}
    </>
  );
};

import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  PieChart,
  History,
  User,
  Home,
  LogOut,
  LogIn,
  Sprout,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
  user: UserProfile | null;
  onOpenLogin: (initialMode?: 'signin' | 'signup') => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onLogout,
  user,
  onOpenLogin,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'income-prediction', label: 'Income Prediction', icon: TrendingUp },
    { id: 'farmer-clustering', label: 'Farmer Clustering', icon: Users },
    { id: 'cluster-summary', label: 'Cluster Insights', icon: PieChart },
    { id: 'prediction-history', label: 'History & Logs', icon: History },
    { id: 'profile', label: 'Profile & Security', icon: User },
  ];

  const secondaryNavItems = [
    { id: 'home', label: 'Home Page', icon: Home },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-[#111827] text-[#F1F5F9] flex flex-col justify-between border-r border-white/10 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${isOpenMobile ? 'translate-x-0 shadow-2xl shadow-black/80 w-64' : '-translate-x-full w-64'}`}
      >
        {/* Top Logo & Branding with Collapse Toggle */}
        <div className={`border-b border-white/10 ${isCollapsed ? 'p-3' : 'px-3.5 py-3.5 sm:px-4'}`}>
          <div className={`flex items-center ${isCollapsed ? 'flex-col gap-3 justify-center' : 'justify-between gap-2 min-w-0'}`}>
            <div className="min-w-0 flex-1 overflow-hidden">
              <BrandLogo
                variant="dark"
                size="sm"
                collapsed={isCollapsed}
                className="max-w-full"
                onClick={() => handleNavClick('dashboard')}
              />
            </div>

            {/* Desktop Collapse / Expand Toggle Button */}
            {onToggleCollapse && (
              <button
                type="button"
                id="sidebar-collapse-toggle-btn"
                onClick={onToggleCollapse}
                className="shrink-0 hidden lg:flex items-center justify-center p-1.5 rounded-lg text-[#94A3B8] hover:text-[#00FF88] hover:bg-white/5 transition-colors cursor-pointer"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="shrink-0 lg:hidden p-1.5 text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg hover:bg-white/10 cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links Scrollable Area */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-2' : 'px-3.5'} py-4 space-y-6`}>
          {/* Main ML & User Links */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#00FF88]/70">
                Core Modules
              </div>
            )}
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3.5 py-2.5'
                  } rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/40 shadow-sm shadow-[#00FF88]/20 font-bold'
                      : 'text-[#94A3B8] hover:bg-white/5 hover:text-[#F1F5F9]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00FF88]' : 'text-[#94A3B8]'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Section Divider */}
          <div className="pt-2 border-t border-white/10 space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]/60">
                Navigation
              </div>
            )}
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center p-3' : 'space-x-3 px-3.5 py-2.5'
                  } rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/40 font-bold'
                      : 'text-[#94A3B8] hover:bg-white/5 hover:text-[#F1F5F9]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00FF88]' : 'text-[#94A3B8]'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner with Quote & Logout / Login */}
        <div className={`border-t border-white/10 relative overflow-hidden bg-gradient-to-b from-transparent to-[#0B0F14] ${
          isCollapsed ? 'p-2.5' : 'p-4'
        }`}>
          {!isCollapsed && (
            <>
              {/* Subtle decorative leaf pattern in background */}
              <div className="absolute right-0 bottom-10 opacity-5 pointer-events-none translate-x-3 translate-y-3">
                <Sprout className="w-28 h-28 text-[#00FF88]" />
              </div>

              <p className="text-[11px] italic text-[#00FF88]/80 mb-3 text-center px-1 font-serif">
                &ldquo;Data-Driven Agriculture for a Greener Tomorrow&rdquo;
              </p>
            </>
          )}

          {user ? (
            <button
              id="sidebar-logout-btn"
              onClick={onLogout}
              title={`Logout (${user.name})`}
              className={`w-full flex items-center justify-center ${
                isCollapsed ? 'p-2.5' : 'space-x-2 py-2.5 px-3'
              } rounded-xl bg-white/5 hover:bg-[#F43F5E]/15 border border-white/10 hover:border-[#F43F5E]/40 text-[#94A3B8] hover:text-[#F43F5E] text-xs font-bold transition-all shadow-xs cursor-pointer`}
            >
              <LogOut className="w-4 h-4" />
              {!isCollapsed && <span>Log Out</span>}
            </button>
          ) : (
            <button
              id="sidebar-signin-btn"
              onClick={() => onOpenLogin('signin')}
              title="Sign In / Register"
              className={`w-full flex items-center justify-center ${
                isCollapsed ? 'p-2.5' : 'space-x-2 py-2.5 px-3'
              } rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-extrabold transition-all shadow-sm shadow-[#00FF88]/20 cursor-pointer`}
            >
              <LogIn className="w-4 h-4" />
              {!isCollapsed && <span>Sign In / Register</span>}
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

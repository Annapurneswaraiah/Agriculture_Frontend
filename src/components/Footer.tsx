import React from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0B0F14] text-xs text-[#94A3B8]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 max-w-full min-w-0">
          <div className="max-w-full min-w-0 px-1 sm:px-0">
            <BrandLogo
              size="sm"
              showTagline={true}
              className="max-w-full"
              onClick={() => onNavigate('home')}
            />
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/10 shrink-0" />
          <div className="flex items-center space-x-2 text-[11px] shrink-0 text-center sm:text-left">
            <span>&copy; 2026 AgriAI Systems</span>
            <span className="text-white/20">&bull;</span>
            <span className="text-[#00FF88] font-semibold">Dual-Engine ML Core</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium text-xs">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#00FF88] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-[#00FF88] transition-colors cursor-pointer"
          >
            About Platform
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-[#00FF88] transition-colors cursor-pointer"
          >
            Contact &amp; Advisory
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:text-[#00FF88] transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <span className="text-white/20 hidden sm:inline">|</span>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-[#F1F5F9] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-[#F1F5F9] transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
};

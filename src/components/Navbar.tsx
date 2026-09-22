import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sprout, Menu, X, ArrowRight, User } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenSignIn: () => void;
  onOpenGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenSignIn,
  onOpenGetStarted,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D1B13]/95 backdrop-blur-md border-b border-[#42F58D]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group transition-transform focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#42F58D]/15 border border-[#42F58D]/30 text-[#42F58D] flex items-center justify-center shadow-none group-hover:bg-[#42F58D] group-hover:text-[#07110C] transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#F4F8F4]">
                  AgriAI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#42F58D]" />
              </div>
              <p className="text-[10px] font-semibold text-[#86D957] uppercase tracking-wider -mt-0.5">
                Precision Telemetry Agriculture
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30 shadow-none'
                    : 'text-[#A0B4A5] hover:text-[#42F58D] hover:bg-[#12241A]'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30 shadow-none'
                    : 'text-[#A0B4A5] hover:text-[#42F58D] hover:bg-[#12241A]'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30 shadow-none'
                    : 'text-[#A0B4A5] hover:text-[#42F58D] hover:bg-[#12241A]'
                }`
              }
            >
              Dashboard
            </NavLink>

            <button
              type="button"
              onClick={onOpenContact}
              className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-[#A0B4A5] hover:text-[#42F58D] hover:bg-[#12241A] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              type="button"
              onClick={onOpenSignIn}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#F4F8F4] hover:bg-[#12241A] border border-transparent hover:border-[#42F58D]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-4 h-4 text-[#42F58D]" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={onOpenGetStarted}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#42F58D] hover:bg-[#86D957] text-[#07110C] transition-all shadow-none flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-xl text-[#F4F8F4] hover:bg-[#12241A] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#42F58D]/15 bg-[#0D1B13] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                isActive
                  ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30'
                  : 'text-[#A0B4A5] hover:bg-[#12241A]'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                isActive
                  ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30'
                  : 'text-[#A0B4A5] hover:bg-[#12241A]'
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                isActive
                  ? 'bg-[#42F58D]/15 text-[#42F58D] border border-[#42F58D]/30'
                  : 'text-[#A0B4A5] hover:bg-[#12241A]'
              }`
            }
          >
            Dashboard
          </NavLink>

          <button
            type="button"
            onClick={() => {
              closeMobileMenu();
              onOpenContact();
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-[#A0B4A5] hover:bg-[#12241A] cursor-pointer"
          >
            Contact
          </button>

          <div className="pt-3 border-t border-[#42F58D]/15 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                onOpenSignIn();
              }}
              className="w-full py-2.5 text-center rounded-xl text-sm font-semibold text-[#F4F8F4] bg-[#12241A] border border-[#42F58D]/15 hover:border-[#42F58D]/30 cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                onOpenGetStarted();
              }}
              className="w-full py-2.5 text-center rounded-xl text-sm font-bold bg-[#42F58D] hover:bg-[#86D957] text-[#07110C] shadow-none cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import {
  X,
  Sprout,
  Phone,
  Lock,
  User,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from '../components/BrandLogo';
import { UserProfile } from '../types';
import { recordLoginEvent } from '../utils/loginHistory';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Helper to load registered user registry
  const getRegisteredUsers = (): Record<string, UserProfile> => {
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem('agri_ai_registered_users');
        return data ? JSON.parse(data) : {};
      } catch {}
    }
    return {};
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);

    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setErrorNotice('Please enter a valid phone number.');
      return;
    }

    const registry = getRegisteredUsers();

    if (mode === 'signup') {
      const cleanName = name.trim();
      if (!cleanName) {
        setErrorNotice('Please enter your full name to register.');
        return;
      }

      const initials = cleanName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'FA';

      const userHandle = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');

      const newUser: UserProfile = {
        name: cleanName,
        role: 'Farmer/User',
        email: `${userHandle}@agriai.org`,
        phone: cleanPhone,
        location: 'Agricultural Region',
        farmSizeHectares: 3.5,
        farmingSystem: 'Commercial Crop Production',
        memberSince: 'Sep 2026',
        avatarInitials: initials,
      };

      // Save into registered registry
      registry[cleanPhone] = newUser;
      if (typeof window !== 'undefined') {
        localStorage.setItem('agri_ai_registered_users', JSON.stringify(registry));
      }

      recordLoginEvent({
        userName: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        location: newUser.location,
        method: 'Registration',
        status: 'Success',
      });

      onLoginSuccess(newUser);
      onClose();
    } else {
      // Sign In mode
      // Look up if this phone was previously registered
      const existing = registry[cleanPhone];
      if (existing) {
        recordLoginEvent({
          userName: existing.name,
          phone: existing.phone,
          email: existing.email,
          location: existing.location,
          method: 'Password Auth',
          status: 'Success',
        });
        onLoginSuccess(existing);
        onClose();
      } else {
        // If not registered yet, prompt them to register or use entered name if provided
        if (name.trim()) {
          const initials = name
            .trim()
            .split(' ')
            .filter(Boolean)
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'FA';

          const newUser: UserProfile = {
            name: name.trim(),
            role: 'Farmer/User',
            email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@agriai.org`,
            phone: cleanPhone,
            location: 'Agricultural Region',
            farmSizeHectares: 3.0,
            farmingSystem: 'Commercial Crop Production',
            memberSince: 'Sep 2026',
            avatarInitials: initials,
          };
          registry[cleanPhone] = newUser;
          if (typeof window !== 'undefined') {
            localStorage.setItem('agri_ai_registered_users', JSON.stringify(registry));
          }

          recordLoginEvent({
            userName: newUser.name,
            phone: newUser.phone,
            email: newUser.email,
            location: newUser.location,
            method: 'Registration',
            status: 'Success',
          });

          onLoginSuccess(newUser);
          onClose();
        } else {
          setErrorNotice('Phone number not found in registered accounts. Please switch to Register to create your account.');
          setMode('signup');
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F14]/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="glass-card rounded-3xl shadow-2xl border border-white/10 max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#111827] text-white p-6 relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 text-[#94A3B8] hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-3">
            <BrandLogo variant="dark" size="lg" />
          </div>

          <div className="flex items-center space-x-2 mt-4 p-1 bg-[#0B0F14] rounded-xl border border-white/10">
            <button
              type="button"
              id="auth-tab-signup"
              onClick={() => {
                setMode('signup');
                setErrorNotice(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-[#00FF88] text-[#0B0F14] shadow-sm shadow-[#00FF88]/20'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Register
            </button>
            <button
              type="button"
              id="auth-tab-signin"
              onClick={() => {
                setMode('signin');
                setErrorNotice(null);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-[#00FF88] text-[#0B0F14] shadow-sm shadow-[#00FF88]/20'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorNotice && (
            <div className="p-3 bg-[#F43F5E]/15 border border-[#F43F5E]/30 rounded-xl flex items-start space-x-2 text-xs text-[#F43F5E]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Full Name Field (Required on Register) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                Your Full Name <span className="text-[#F43F5E]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="auth-input-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
                />
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                This name will be displayed across your dashboard and profile.
              </p>
            </div>
          )}

          {/* Phone Number Field */}
          <div>
            <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
              Phone Number <span className="text-[#F43F5E]">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                id="auth-input-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit phone number"
                className="w-full pl-9 pr-3 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
              Password <span className="text-[#F43F5E]">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="auth-input-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-9 pr-3 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full py-3 px-4 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black transition-all flex items-center justify-center space-x-2 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
          >
            <span>{mode === 'signup' ? 'Register & Sign In' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-xs text-[#94A3B8]">
            {mode === 'signin' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  id="switch-to-register-btn"
                  onClick={() => {
                    setMode('signup');
                    setErrorNotice(null);
                  }}
                  className="font-bold text-[#00FF88] hover:underline cursor-pointer ml-1"
                >
                  Register New Account
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  id="switch-to-signin-btn"
                  onClick={() => {
                    setMode('signin');
                    setErrorNotice(null);
                  }}
                  className="font-bold text-[#00FF88] hover:underline cursor-pointer ml-1"
                >
                  Sign In with Phone
                </button>
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

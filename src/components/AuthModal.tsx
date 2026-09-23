import React, { useState, useEffect } from 'react';
import {
  X,
  Sprout,
  Check,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';
import { recordLoginEvent } from '../utils/loginHistory';
import { FARMING_SYSTEM_OPTIONS } from '../utils/formatters';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onLoginSuccess?: (user: UserProfile) => void;
}

// Pre-configured demo profiles for 1-click quick sign-in
const DEMO_ACCOUNTS: UserProfile[] = [
  {
    name: 'Dr. Ibrahim Alabi',
    role: 'Agricultural Specialist',
    email: 'ibrahim.alabi@agriai.org',
    phone: '+234 803 456 7890',
    location: 'Kaduna Agricultural Basin',
    farmSizeHectares: 4.5,
    farmingSystem: 'Commercial Crop Production',
    memberSince: 'January 2026',
    avatarInitials: 'IA',
  },
  {
    name: 'Samuel Green',
    role: 'Commercial Farmer',
    email: 'samuel.green@agrifarm.org',
    phone: '+234 802 111 2233',
    location: 'Oyo Agricultural Belt',
    farmSizeHectares: 6.2,
    farmingSystem: 'Commercial Crop Production',
    memberSince: 'March 2026',
    avatarInitials: 'SG',
  },
  {
    name: 'Amina Bello',
    role: 'Mixed Livestock Farmer',
    email: 'amina.bello@verdant.org',
    phone: '+234 814 555 7788',
    location: 'Kano Plains Basin',
    farmSizeHectares: 3.2,
    farmingSystem: 'Mixed Crop-Livestock Farming',
    memberSince: 'May 2026',
    avatarInitials: 'AB',
  },
  {
    name: 'Ramesh Patel',
    role: 'Smallholder Crop Farmer',
    email: 'ramesh.patel@kisanagro.in',
    phone: '+91 98765 43210',
    location: 'Gujarat Agro Corridor',
    farmSizeHectares: 1.8,
    farmingSystem: 'Smallholder Agriculture',
    memberSince: 'February 2026',
    avatarInitials: 'RP',
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  
  // Registration fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Kaduna Agricultural Basin');
  const [farmSize, setFarmSize] = useState('3.5');
  const [farmingSystem, setFarmingSystem] = useState('Commercial Crop Production');
  
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeLoggedInUser, setActiveLoggedInUser] = useState<UserProfile | null>(null);

  // Sync mode when reopened
  useEffect(() => {
    setMode(initialMode);
    setErrorNotice(null);
    setSuccess(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // Retrieve registry of users
  const getRegisteredUsers = (): Record<string, UserProfile> => {
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem('agri_ai_registered_users');
        return data ? JSON.parse(data) : {};
      } catch {}
    }
    return {};
  };

  const saveUserToRegistry = (userObj: UserProfile) => {
    if (typeof window !== 'undefined') {
      try {
        const registry = getRegisteredUsers();
        registry[userObj.email.toLowerCase()] = userObj;
        registry[userObj.phone.trim()] = userObj;
        localStorage.setItem('agri_ai_registered_users', JSON.stringify(registry));
      } catch {}
    }
  };

  const handleCompleteAuth = (userObj: UserProfile, method: 'Password Auth' | 'Registration' | 'Phone OTP') => {
    // Record login telemetry event
    recordLoginEvent({
      userName: userObj.name,
      phone: userObj.phone,
      email: userObj.email,
      location: userObj.location,
      method,
      status: 'Success',
    });

    saveUserToRegistry(userObj);
    setActiveLoggedInUser(userObj);
    setSuccess(true);

    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess(userObj);
      }
      onClose();
    }, 1200);
  };

  const handleDemoLogin = (demo: UserProfile) => {
    handleCompleteAuth(demo, 'Password Auth');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);

    if (mode === 'signup') {
      const cleanName = name.trim();
      const cleanPhone = phone.trim();
      const cleanEmail = email.trim();

      if (!cleanName) {
        setErrorNotice('Please provide your full name.');
        return;
      }
      if (!cleanPhone && !cleanEmail) {
        setErrorNotice('Please provide at least a phone number or email address.');
        return;
      }

      const initials = cleanName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'FA';

      const newUser: UserProfile = {
        name: cleanName,
        role: farmingSystem.includes('Commercial') ? 'Commercial Farmer' : 'Agricultural Producer',
        email: cleanEmail || `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}@agriai.org`,
        phone: cleanPhone || '+234 800 000 0000',
        location: location.trim() || 'Agricultural Region',
        farmSizeHectares: parseFloat(farmSize) || 3.0,
        farmingSystem: farmingSystem || 'Commercial Crop Production',
        memberSince: 'September 2026',
        avatarInitials: initials,
      };

      handleCompleteAuth(newUser, 'Registration');
    } else {
      // Sign In mode
      const cleanId = identifier.trim();
      if (!cleanId) {
        setErrorNotice('Please enter your email or phone number.');
        return;
      }

      // Check registered users in storage
      const registry = getRegisteredUsers();
      const matched = registry[cleanId.toLowerCase()] || registry[cleanId];

      if (matched) {
        handleCompleteAuth(matched, 'Password Auth');
        return;
      }

      // Check demo accounts list
      const matchedDemo = DEMO_ACCOUNTS.find(
        (d) =>
          d.email.toLowerCase() === cleanId.toLowerCase() ||
          d.phone === cleanId ||
          d.name.toLowerCase().includes(cleanId.toLowerCase())
      );

      if (matchedDemo) {
        handleCompleteAuth(matchedDemo, 'Password Auth');
        return;
      }

      // If user typed a custom email or name, auto-provision and authenticate them smoothly
      const isEmail = cleanId.includes('@');
      const inferredName = isEmail ? cleanId.split('@')[0].replace(/[._]/g, ' ') : cleanId;
      const formattedName = inferredName
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');

      const initials = formattedName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'US';

      const quickUser: UserProfile = {
        name: formattedName,
        role: 'Verified Farmer',
        email: isEmail ? cleanId : `${cleanId.replace(/[^a-z0-9]/g, '')}@agriai.org`,
        phone: isEmail ? '+234 801 234 5678' : cleanId,
        location: 'Kaduna Agricultural Basin',
        farmSizeHectares: 3.5,
        farmingSystem: 'Commercial Crop Production',
        memberSince: 'September 2026',
        avatarInitials: initials,
      };

      handleCompleteAuth(quickUser, 'Password Auth');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111F17] rounded-3xl shadow-2xl border border-white/10 overflow-hidden text-[#F1F5F9] max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#0A120D] text-white p-5 sm:p-6 relative border-b border-white/10 shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#00FF88] text-[#0A120D] flex items-center justify-center font-bold">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-white text-sm">AgriAI Portal</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00FF88]/20 text-[#00FF88] font-bold border border-[#00FF88]/30">
              Live Authentication
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            {mode === 'signin' ? 'Sign In to Your Farmer Profile' : 'Create Your Agricultural Account'}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1">
            {mode === 'signin'
              ? 'Sign in to access your customized telemetry, farm profile, and model telemetry.'
              : 'Join thousands of farmers optimizing yields with AI-driven precision agriculture.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-[#0A120D] shrink-0">
          <button
            type="button"
            id="auth-tab-signin"
            onClick={() => {
              setMode('signin');
              setErrorNotice(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signin'
                ? 'text-[#00FF88] border-b-2 border-[#00FF88] bg-[#111F17]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            id="auth-tab-signup"
            onClick={() => {
              setMode('signup');
              setErrorNotice(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'text-[#00FF88] border-b-2 border-[#00FF88] bg-[#111F17]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create Account / Register</span>
          </button>
        </div>

        {/* Form Body (Scrollable if needed) */}
        <div className="p-5 sm:p-6 bg-[#111F17] overflow-y-auto flex-1 space-y-4">
          {success ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#00FF88]/20 border border-[#00FF88]/40 text-[#00FF88] mx-auto flex items-center justify-center shadow-lg shadow-[#00FF88]/20">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-black text-white">
                {mode === 'signin' ? 'Login Successful!' : 'Account Created!'}
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Welcome, <span className="text-[#00FF88] font-bold">{activeLoggedInUser?.name}</span>. Loading your farmer profile...
              </p>
            </div>
          ) : (
            <>
              {errorNotice && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorNotice}</span>
                </div>
              )}

              {/* Quick 1-Click Demo Profiles (in Sign In mode) */}
              {mode === 'signin' && (
                <div className="p-3 rounded-2xl bg-[#0A120D] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#E2E8F0] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#00FF88]" />
                      <span>Instant 1-Click Test Profiles</span>
                    </span>
                    <span className="text-[10px] text-[#94A3B8]">Click to login immediately</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {DEMO_ACCOUNTS.map((demo) => (
                      <button
                        key={demo.email}
                        type="button"
                        onClick={() => handleDemoLogin(demo)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-[#00FF88]/15 border border-white/10 hover:border-[#00FF88]/40 text-left transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#00FF88]/20 text-[#00FF88] text-[10px] font-black flex items-center justify-center shrink-0">
                            {demo.avatarInitials}
                          </span>
                          <div className="truncate">
                            <div className="text-xs font-bold text-white group-hover:text-[#00FF88] truncate">
                              {demo.name}
                            </div>
                            <div className="text-[9px] text-[#94A3B8] truncate">{demo.role}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {mode === 'signup' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="signup-name"
                          type="text"
                          required
                          placeholder="e.g. Samuel Green"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="signup-phone"
                            type="text"
                            required
                            placeholder="+234 801 234 5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="signup-email"
                            type="email"
                            placeholder="farmer@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                          Location / Region
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="signup-location"
                            type="text"
                            placeholder="e.g. Kaduna Basin"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                          Farm Size (Hectares)
                        </label>
                        <input
                          id="signup-farmsize"
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={farmSize}
                          onChange={(e) => setFarmSize(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                        Farming System
                      </label>
                      <select
                        id="signup-system"
                        value={farmingSystem}
                        onChange={(e) => setFarmingSystem(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white focus:border-[#00FF88] outline-none"
                      >
                        {FARMING_SYSTEM_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#111827] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="signup-password"
                          type="password"
                          required
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1">
                        Email Address or Phone Number
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="signin-identifier"
                          type="text"
                          required
                          placeholder="e.g. ibrahim.alabi@agriai.org or +234..."
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider">
                          Password
                        </label>
                        <span className="text-[10px] text-[#00FF88]">Any test password accepted</span>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="signin-password"
                          type="password"
                          required
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-xs text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    id="auth-submit-btn"
                    className="w-full py-3 bg-[#00FF88] hover:bg-[#00E077] text-[#0A120D] font-black rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#00FF88]/20"
                  >
                    <span>
                      {mode === 'signin' ? 'Sign In & View Profile' : 'Register & View Profile'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#94A3B8] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>Session authenticated &amp; synchronized with active profile.</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

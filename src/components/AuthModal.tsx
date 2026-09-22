import React, { useState } from 'react';
import { X, Sprout, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  // Sync mode when reopened
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#111F17] rounded-3xl shadow-2xl border border-white/10 overflow-hidden text-[#F1F5F9]">
        {/* Top bar */}
        <div className="bg-[#0A120D] text-white p-6 relative border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#00FF88] text-[#0A120D] flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-white">AgriAI Portal</span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            {mode === 'signin' ? 'Welcome to AgriAI' : 'Join Our Agricultural Community'}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1">
            {mode === 'signin'
              ? 'Access agricultural resources, articles, and community insights.'
              : 'Create an account to explore sustainable farming guides and data.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-white/10 bg-[#0A120D]">
          <button
            type="button"
            onClick={() => { setMode('signin'); setSuccess(false); }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer ${
              mode === 'signin'
                ? 'text-[#00FF88] border-b-2 border-[#00FF88] bg-[#111F17]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setSuccess(false); }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'text-[#00FF88] border-b-2 border-[#00FF88] bg-[#111F17]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Create Account (Get Started)
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 bg-[#111F17]">
          {success ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                {mode === 'signin' ? 'Welcome Back!' : 'Account Created Successfully!'}
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Redirecting to agricultural resources...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Green"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-sm text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="farmer@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-sm text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-sm text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00FF88] hover:bg-[#00E077] text-[#0A120D] font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{mode === 'signin' ? 'Sign In to AgriAI' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#94A3B8] pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>Respectful, private, and secure agricultural data principles.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

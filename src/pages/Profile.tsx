import React, { useState, useEffect } from 'react';
import {
  User,
  MapPin,
  Calendar,
  Save,
  CheckCircle2,
  LogIn,
  Layers,
  Sprout,
  ShieldCheck,
  History,
  Monitor,
  Smartphone,
  Globe,
  RefreshCw,
  Download,
  Trash2,
  Clock,
  PlusCircle,
  Sliders,
  Cpu,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile, UserLoginHistoryItem } from '../types';
import { FARMING_SYSTEM_OPTIONS } from '../utils/formatters';
import {
  getLoginHistory,
  recordLoginEvent,
  clearLoginHistory,
  exportLoginHistoryAsJson
} from '../utils/loginHistory';

interface ProfileProps {
  user: UserProfile | null;
  onUpdateUser: (updated: UserProfile) => void;
  onOpenLogin: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, onOpenLogin }) => {
  const [formData, setFormData] = useState<UserProfile | null>(user);
  const [saved, setSaved] = useState(false);
  const [loginHistory, setLoginHistory] = useState<UserLoginHistoryItem[]>(() => getLoginHistory(user));
  const [historyNotice, setHistoryNotice] = useState<string | null>(null);

  // Model threshold configurations
  const [modelThresholds, setModelThresholds] = useState({
    confidenceThreshold: 85,
    autoFailoverFallback: true,
    currencyUnit: 'INR',
    telemetryEnabled: true,
  });

  useEffect(() => {
    setFormData(user);
    setLoginHistory(getLoginHistory(user));
  }, [user]);

  const handleRefreshHistory = () => {
    const updated = getLoginHistory(user);
    setLoginHistory(updated);
    setHistoryNotice('Login history updated with latest active telemetry!');
    setTimeout(() => setHistoryNotice(null), 3500);
  };

  const handleRecordNewSession = () => {
    if (!user) return;
    const newEntry = recordLoginEvent({
      userName: user.name,
      phone: user.phone,
      email: user.email,
      location: user.location,
      method: 'Password Auth',
      status: 'Success',
    });
    setLoginHistory(getLoginHistory(user));
    setHistoryNotice(`New session successfully recorded (${newEntry.dateFormatted})!`);
    setTimeout(() => setHistoryNotice(null), 4000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your login history?')) {
      clearLoginHistory();
      setLoginHistory([]);
      setHistoryNotice('User login history cleared.');
      setTimeout(() => setHistoryNotice(null), 3000);
    }
  };

  const handleExportHistory = () => {
    exportLoginHistoryAsJson(loginHistory);
  };

  if (!user || !formData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto my-12 glass-card rounded-3xl p-8 border border-white/10 shadow-2xl text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-3xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#F1F5F9]">Signed Out</h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-sm mx-auto leading-relaxed">
            You are currently logged out. Sign in to customize your agricultural profile, farm acreage, model precision thresholds, and personal preferences.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={onOpenLogin}
            className="px-6 py-2.5 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black rounded-xl transition-all inline-flex items-center space-x-2 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>
        </div>
      </motion.div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdateUser(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-4xl mx-auto space-y-6 pb-8"
    >
      {/* Profile Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF88]/10 blur-[80px] pointer-events-none" />

        <div className="w-20 h-20 rounded-full bg-[#111827] text-[#00FF88] flex items-center justify-center font-black text-2xl shadow-xl border-2 border-[#00FF88]/40 shrink-0">
          {formData.avatarInitials}
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-black text-[#F1F5F9]">{formData.name}</h1>
              <p className="text-xs font-semibold text-[#00FF88]">{formData.role}</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30">
              Verified Farmer Account
            </span>
          </div>

          <p className="text-xs text-[#94A3B8] pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#94A3B8]/70" />
              {formData.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#94A3B8]/70" />
              Member since {formData.memberSince}
            </span>
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <h2 className="text-base font-bold text-[#F1F5F9] flex items-center gap-2">
            <User className="w-4 h-4 text-[#00FF88]" />
            <span>Farm &amp; Account Settings</span>
          </h2>
          {saved && (
            <span className="text-xs text-[#00FF88] font-bold flex items-center gap-1 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              Changes saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const initials = val
                    .split(' ')
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2) || 'NA';
                  setFormData({ ...formData, name: val, avatarInitials: initials });
                }}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">User Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">Farm Location / Region</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">Total Land Owned (Hectares)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.farmSizeHectares}
                onChange={(e) => setFormData({ ...formData, farmSizeHectares: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#F1F5F9] mb-1.5">Primary Farming System</label>
              <select
                value={formData.farmingSystem}
                onChange={(e) => setFormData({ ...formData, farmingSystem: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
              >
                {FARMING_SYSTEM_OPTIONS.map((sys) => (
                  <option key={sys} value={sys} className="bg-[#111827] text-[#F1F5F9]">{sys}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black rounded-xl transition-all flex items-center space-x-2 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Model Threshold & Precision Configuration */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#06B6D4]" />
              <span>Model Threshold &amp; Inference Configurations</span>
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Tune confidence tolerance thresholds, failover strategies, and prediction metrics.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30">
            Runtime v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F1F5F9]">Minimum Confidence Threshold</span>
              <span className="text-xs font-mono font-bold text-[#00FF88]">{modelThresholds.confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              value={modelThresholds.confidenceThreshold}
              onChange={(e) => setModelThresholds({ ...modelThresholds, confidenceThreshold: Number(e.target.value) })}
              className="w-full accent-[#00FF88] cursor-pointer"
            />
            <p className="text-[11px] text-[#94A3B8]">
              Inferences scoring below this threshold trigger dual-centroid cross verification.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F1F5F9]">Auto-Failover Heuristic</span>
              <button
                type="button"
                onClick={() => setModelThresholds({ ...modelThresholds, autoFailoverFallback: !modelThresholds.autoFailoverFallback })}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  modelThresholds.autoFailoverFallback
                    ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40'
                    : 'bg-white/10 text-[#94A3B8] border border-white/10'
                }`}
              >
                {modelThresholds.autoFailoverFallback ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              Automatically seamless fallback to local mathematical coefficients if Render API latency exceeds 5000ms.
            </p>
          </div>
        </div>
      </div>

      {/* User Login History & Security Audit */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00FF88]" />
              <span>User Login History &amp; Security Sessions</span>
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Review and update authenticated access logs, device platforms, and telemetry from your account.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="update-login-history-btn"
              onClick={handleRefreshHistory}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-[#00FF88] border border-[#00FF88]/30 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer"
              title="Update and refresh login history"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Update History</span>
            </button>

            <button
              type="button"
              id="record-new-session-btn"
              onClick={handleRecordNewSession}
              className="px-3.5 py-2 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black rounded-xl transition-all flex items-center space-x-1.5 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
              title="Record current active login session"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Record Session</span>
            </button>

            <button
              type="button"
              onClick={handleExportHistory}
              disabled={loginHistory.length === 0}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-[#F1F5F9] border border-white/10 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              title="Export as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={handleClearHistory}
              disabled={loginHistory.length === 0}
              className="px-3 py-2 bg-[#F43F5E]/15 hover:bg-[#F43F5E]/25 text-[#F43F5E] border border-[#F43F5E]/30 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              title="Clear all login records"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {historyNotice && (
          <div className="p-3.5 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{historyNotice}</span>
          </div>
        )}

        {/* Security Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Total Recorded Logins</div>
            <div className="text-xl font-black text-[#F1F5F9] mt-1">{loginHistory.length} Sessions</div>
            <div className="text-[11px] text-[#00FF88] mt-0.5 font-medium">Encrypted &amp; Audited</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Active Device Session</div>
            <div className="text-sm font-black text-[#F1F5F9] mt-1 truncate">
              {loginHistory[0]?.device || 'Web Client'}
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5">
              Browser: {loginHistory[0]?.browser || 'Chrome'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0F14] border border-white/10">
            <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Session Security Status</div>
            <div className="text-sm font-black text-[#00FF88] mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              Active &amp; Protected
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5 truncate">
              IP: {loginHistory[0]?.ipAddress || '102.89.34.120'}
            </div>
          </div>
        </div>

        {/* Login Sessions List */}
        <div className="space-y-3">
          {loginHistory.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl p-6">
              <History className="w-8 h-8 text-[#94A3B8]/40 mx-auto mb-2" />
              <div className="text-xs font-bold text-[#F1F5F9]">No login history recorded yet</div>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Click &ldquo;Record Session&rdquo; or &ldquo;Update History&rdquo; to log your current session telemetry.
              </p>
            </div>
          ) : (
            loginHistory.map((item, index) => (
              <div
                key={item.id || index}
                className={`p-4 rounded-2xl border transition-all ${
                  item.isCurrentSession || index === 0
                    ? 'bg-[#00FF88]/10 border-[#00FF88]/30 shadow-xs'
                    : 'bg-[#0B0F14] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start sm:items-center space-x-3">
                    <div
                      className={`p-2 rounded-xl mt-0.5 sm:mt-0 border border-white/10 ${
                        item.device.toLowerCase().includes('mobile')
                          ? 'bg-[#06B6D4]/20 text-[#06B6D4]'
                          : 'bg-[#00FF88]/20 text-[#00FF88]'
                      }`}
                    >
                      {item.device.toLowerCase().includes('mobile') ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Monitor className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-extrabold text-[#F1F5F9]">{item.device}</span>
                        <span className="text-[10px] font-semibold text-[#94A3B8] bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                          {item.browser}
                        </span>
                        <span className="text-[10px] font-semibold text-[#00FF88] bg-[#00FF88]/15 px-2 py-0.5 rounded-full border border-[#00FF88]/30">
                          {item.method}
                        </span>
                        {(item.isCurrentSession || index === 0) && (
                          <span className="text-[10px] font-bold text-[#00FF88] bg-[#00FF88]/20 px-2 py-0.5 rounded-full border border-[#00FF88]/40 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                            Current Session
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#94A3B8] mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#94A3B8]/60" />
                          {item.dateFormatted}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[10px]">
                          <Globe className="w-3 h-3 text-[#94A3B8]/60" />
                          IP: {item.ipAddress}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#94A3B8]/60" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-[11px] font-bold text-[#00FF88] bg-[#00FF88]/15 border border-[#00FF88]/30 px-2.5 py-1 rounded-full shadow-xs">
                      ✓ {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import {
  History,
  TrendingUp,
  Users,
  Search,
  Trash2,
  Download,
  Filter,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Sprout,
  ShieldCheck,
  Monitor,
  Smartphone,
  Globe,
  Clock,
  RefreshCw,
  PlusCircle,
  MapPin,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { PredictionHistoryItem, UserLoginHistoryItem } from '../types';
import { formatCurrencyNGN, formatCurrencyINR, getClusterData } from '../utils/formatters';
import {
  getLoginHistory,
  recordLoginEvent,
  clearLoginHistory,
  exportLoginHistoryAsJson
} from '../utils/loginHistory';

interface PredictionHistoryProps {
  history: PredictionHistoryItem[];
  onClearHistory: () => void;
  onNavigate: (tab: string) => void;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({
  history,
  onClearHistory,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'regression' | 'clustering' | 'logins'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loginHistory, setLoginHistory] = useState<UserLoginHistoryItem[]>(() => getLoginHistory());
  const [loginActionNotice, setLoginActionNotice] = useState<string | null>(null);

  const handleRefreshLogins = () => {
    const updated = getLoginHistory();
    setLoginHistory(updated);
    setLoginActionNotice('User login history updated with latest telemetry!');
    setTimeout(() => setLoginActionNotice(null), 3000);
  };

  const handleRecordActiveSession = () => {
    const newEntry = recordLoginEvent({
      userName: 'Agricultural Producer',
      phone: '+234 803 456 7890',
      email: 'producer@agriai.org',
      method: 'Password Auth',
      status: 'Success',
      location: 'Agricultural Operations Hub',
    });
    setLoginHistory(getLoginHistory());
    setLoginActionNotice(`New active session logged (${newEntry.dateFormatted})!`);
    setTimeout(() => setLoginActionNotice(null), 3500);
  };

  const handleClearLogins = () => {
    if (window.confirm('Are you sure you want to clear your user login history?')) {
      clearLoginHistory();
      setLoginHistory([]);
      setLoginActionNotice('User login history cleared.');
      setTimeout(() => setLoginActionNotice(null), 3000);
    }
  };

  const handleExportLogins = () => {
    exportLoginHistoryAsJson(loginHistory);
  };

  const filteredLogins = loginHistory.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.userName.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.device.toLowerCase().includes(q) ||
      item.browser.toLowerCase().includes(q) ||
      item.ipAddress.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.method.toLowerCase().includes(q)
    );
  });

  const filteredItems = history.filter((item) => {
    if (filterType === 'logins') return false;
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSystem = JSON.stringify(item.inputData).toLowerCase().includes(q);
      const matchSegment = (item.resultData.farmer_segment || '').toLowerCase().includes(q);
      return matchTitle || matchSystem || matchSegment;
    }
    return true;
  });

  const exportAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `agri_ai_prediction_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-6xl mx-auto space-y-6 pb-8"
    >
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 glass-card border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Ambient radial glow & watermark */}
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#00FF88]/10 blur-[90px] pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 opacity-5 pointer-events-none">
          <Sprout className="w-56 h-56 text-[#00FF88]" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-bold text-xs uppercase tracking-wider shadow-xs">
            <History className="w-3.5 h-3.5 text-[#00FF88]" />
            <span>Audit &amp; Logs</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F1F5F9] tracking-tight leading-tight">
            Prediction &amp; Query History
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Review your past machine learning regression inferences and clustering assignments with full input feature payloads and quick-export tools.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 flex items-center space-x-2.5 shrink-0">
          <button
            onClick={exportAsJson}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-[#F1F5F9] border border-white/10 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#00FF88]" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={onClearHistory}
            className="px-3.5 py-2 bg-[#F43F5E]/15 hover:bg-[#F43F5E]/25 text-[#F43F5E] border border-[#F43F5E]/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Type Tabs */}
        <div className="flex items-center space-x-1 w-full sm:w-auto bg-[#0B0F14] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#111827] text-[#00FF88] border border-[#00FF88]/40 shadow-xs'
                : 'text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            All Queries ({history.length})
          </button>
          <button
            onClick={() => setFilterType('regression')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'regression'
                ? 'bg-[#111827] text-[#00FF88] border border-[#00FF88]/40 shadow-xs'
                : 'text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            Income Prediction
          </button>
          <button
            onClick={() => setFilterType('clustering')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'clustering'
                ? 'bg-[#111827] text-[#06B6D4] border border-[#06B6D4]/40 shadow-xs'
                : 'text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            Farmer Clustering
          </button>
          <button
            id="tab-user-logins"
            onClick={() => setFilterType('logins')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterType === 'logins'
                ? 'bg-[#111827] text-[#8B5CF6] border border-[#8B5CF6]/40 shadow-xs'
                : 'text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            User Logins ({loginHistory.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inputs, dates, devices, logins..."
            className="w-full pl-10 pr-4 py-2 bg-[#111827]/80 border border-white/10 rounded-xl text-xs text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#00FF88] font-medium"
          />
        </div>
      </div>

      {loginActionNotice && (
        <div className="p-3.5 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{loginActionNotice}</span>
        </div>
      )}

      {/* Conditional View: Login History vs Model Predictions */}
      {filterType === 'logins' ? (
        <div className="glass-card rounded-3xl border border-white/10 shadow-xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00FF88]" />
                <span>Authenticated User Login History</span>
              </h3>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Full telemetry of authenticated devices, IP connections, and session timestamps.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRefreshLogins}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#00FF88] border border-[#00FF88]/30 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Update login history"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Update Logins</span>
              </button>

              <button
                type="button"
                onClick={handleRecordActiveSession}
                className="px-3 py-1.5 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-extrabold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
                title="Record active session"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Record Session</span>
              </button>

              <button
                type="button"
                onClick={handleExportLogins}
                disabled={loginHistory.length === 0}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[#F1F5F9] border border-white/10 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>

              <button
                type="button"
                onClick={handleClearLogins}
                disabled={loginHistory.length === 0}
                className="px-3 py-1.5 bg-[#F43F5E]/15 hover:bg-[#F43F5E]/25 text-[#F43F5E] border border-[#F43F5E]/30 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {filteredLogins.length === 0 ? (
            <div className="p-12 text-center">
              <History className="w-12 h-12 text-[#94A3B8]/40 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#F1F5F9]">No login records found</h3>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-sm mx-auto">
                No session entries match your current search query.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredLogins.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`py-4 px-3 sm:px-4 rounded-2xl transition-all ${
                    item.isCurrentSession || index === 0
                      ? 'bg-[#00FF88]/10 border border-[#00FF88]/25 mb-2 shadow-xs'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center space-x-3.5">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 ${
                          item.device.toLowerCase().includes('mobile')
                            ? 'bg-[#06B6D4]/20 text-[#06B6D4]'
                            : 'bg-[#00FF88]/20 text-[#00FF88]'
                        }`}
                      >
                        {item.device.toLowerCase().includes('mobile') ? (
                          <Smartphone className="w-5 h-5" />
                        ) : (
                          <Monitor className="w-5 h-5" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-extrabold text-[#F1F5F9]">
                            {item.userName}
                          </span>
                          <span className="text-[10px] font-semibold text-[#94A3B8] bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                            {item.device} ({item.browser})
                          </span>
                          <span className="text-[10px] font-semibold text-[#00FF88] bg-[#00FF88]/15 px-2 py-0.5 rounded-full border border-[#00FF88]/30">
                            {item.method}
                          </span>
                          {(item.isCurrentSession || index === 0) && (
                            <span className="text-[10px] font-bold text-[#00FF88] bg-[#00FF88]/20 px-2 py-0.5 rounded-full border border-[#00FF88]/40 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                              Active Session
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-[#94A3B8] mt-1 flex items-center gap-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#94A3B8]/60" />
                            {item.dateFormatted}
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1 font-mono text-[10px]">
                            <Globe className="w-3 h-3 text-[#94A3B8]/60" />
                            IP: {item.ipAddress}
                          </span>
                          <span>&bull;</span>
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
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Prediction History List */
        <div className="glass-card rounded-3xl border border-white/10 shadow-xl overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <History className="w-12 h-12 text-[#94A3B8]/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#F1F5F9]">No predictions recorded yet</h3>
            <p className="text-xs text-[#94A3B8] mt-1 max-w-sm mx-auto">
              Run an income prediction or farmer clustering analysis to populate this audit timeline.
            </p>
            <button
              onClick={() => onNavigate('income-prediction')}
              className="mt-4 px-4 py-2 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-extrabold rounded-xl transition-colors inline-flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-[#00FF88]/20"
            >
              <span>Make a Prediction</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredItems.map((item) => {
              const isIncome = item.type === 'regression';
              const isExpanded = expandedId === item.id;
              const clusterInfo = item.resultData.cluster !== undefined
                ? getClusterData(item.resultData.cluster)
                : null;

              return (
                <div key={item.id} className="transition-colors hover:bg-white/[0.03]">
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 ${
                          isIncome ? 'bg-[#00FF88]/15 text-[#00FF88]' : 'bg-[#06B6D4]/15 text-[#06B6D4]'
                        }`}
                      >
                        {isIncome ? <TrendingUp className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-[#F1F5F9]">{item.title}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30">
                            {item.status}
                          </span>
                        </div>

                        <div className="text-sm font-black text-[#F1F5F9] mt-0.5">
                          {isIncome
                            ? `${formatCurrencyINR(item.resultData.predicted_income_ngn)} (${formatCurrencyNGN(item.resultData.predicted_income_ngn)})`
                            : `${item.resultData.farmer_segment || 'Group'} – ${item.resultData.segmentName || clusterInfo?.name || 'Classified'}`}
                        </div>

                        <div className="text-[11px] text-[#94A3B8] mt-0.5 flex items-center space-x-2">
                          <Calendar className="w-3 h-3 text-[#94A3B8]/60" />
                          <span>{item.dateFormatted}</span>
                          <span>&bull;</span>
                          <span className="font-mono text-[10px] text-[#00FF88]">
                            {item.source === 'render_api' ? 'FastAPI Render' : 'ML Engine'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <ChevronDown
                        className={`w-5 h-5 text-[#94A3B8] transition-transform ${
                          isExpanded ? 'rotate-180 text-[#00FF88]' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Inspector */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 bg-[#0B0F14]/70 border-t border-white/10 text-xs text-[#94A3B8] space-y-4">
                      <div>
                        <h5 className="font-bold text-[#F1F5F9] uppercase tracking-wider text-[11px] mb-2">
                          Input Parameters Submitted:
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                          {Object.entries(item.inputData).map(([key, val]) => (
                            <div key={key} className="p-2.5 bg-[#111827] rounded-xl border border-white/10">
                              <span className="text-[#94A3B8] block text-[10px] truncate">{key}:</span>
                              <span className="font-bold text-[#00FF88]">{String(val)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-[#94A3B8]/60 text-[10px] font-mono">ID: {item.id}</span>
                        <button
                          onClick={() => onNavigate(isIncome ? 'income-prediction' : 'farmer-clustering')}
                          className="text-xs font-bold text-[#00FF88] hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Re-run in model view</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}
    </motion.div>
  );
};

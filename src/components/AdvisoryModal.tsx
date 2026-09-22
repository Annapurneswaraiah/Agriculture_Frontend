import React from 'react';
import {
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Layers,
  HelpCircle,
  Lightbulb,
  Phone,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NotificationItem } from '../types';

interface AdvisoryModalProps {
  notification: NotificationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyModelRecommendation?: (suggestedInputs: any, targetTab: string) => void;
}

export const AdvisoryModal: React.FC<AdvisoryModalProps> = ({
  notification,
  isOpen,
  onClose,
  onApplyModelRecommendation,
}) => {
  if (!isOpen || !notification) return null;

  const advisory = notification.advisory;
  const query = notification.queryDetails;

  const severityColor =
    advisory?.severity === 'Urgent'
      ? 'bg-[#F43F5E]/15 text-[#F43F5E] border-[#F43F5E]/30'
      : advisory?.severity === 'Moderate'
      ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
      : 'bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0F14]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="glass-card rounded-3xl max-w-2xl w-full shadow-2xl border border-white/10 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#111827] text-white flex items-start justify-between border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00FF88]">
                AgriAI Model Diagnostic &amp; Problem Advisory
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#F1F5F9]">
              {advisory?.problemTitle || notification.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] pt-0.5">
              <span>Submitted by: <strong className="text-[#F1F5F9]">{query?.name || 'Farmer'}</strong></span>
              {query?.phone && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#00FF88]" />
                    {query.phone}
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Query Summary Card */}
          {query && (
            <div className="p-3.5 bg-[#0B0F14] border border-white/10 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-xs text-[#94A3B8] font-semibold">
                <span className="flex items-center gap-1.5 text-[#F1F5F9] font-bold">
                  <HelpCircle className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>Subject: {query.subject}</span>
                </span>
                <span className="text-[10px] text-[#94A3B8]/70">{notification.time}</span>
              </div>
              <p className="text-xs text-[#94A3B8] italic bg-white/5 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                &ldquo;{query.message}&rdquo;
              </p>
            </div>
          )}

          {/* Problem Diagnosis Section */}
          {advisory && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#F1F5F9]">Identified Problem:</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold">
                    {advisory.problemCategory}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${severityColor}`}>
                  Severity: {advisory.severity}
                </span>
              </div>

              {/* Diagnosis Box */}
              <div className="p-4 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-[#00FF88] font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Model Root-Cause Diagnosis</span>
                </div>
                <p className="text-xs text-[#F1F5F9] leading-relaxed">
                  {advisory.diagnosis}
                </p>
              </div>

              {/* Key Diagnostic Factors */}
              {advisory.keyFactors && advisory.keyFactors.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-[#F1F5F9] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                    <span>Key Contributing Factors</span>
                  </h4>
                  <ul className="space-y-1 pl-3 text-xs text-[#94A3B8] list-disc list-inside">
                    {advisory.keyFactors.map((factor, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actionable Recommendations */}
              {advisory.actionSteps && advisory.actionSteps.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#F1F5F9] flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                    <span>Recommended Agronomic Action Steps</span>
                  </h4>
                  <div className="space-y-2">
                    {advisory.actionSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 bg-[#0B0F14] border border-white/10 rounded-xl text-xs text-[#F1F5F9]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#00FF88] text-[#0B0F14] flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Potential Impact Box */}
              {advisory.potentialImpact && (
                <div className="p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/25 rounded-2xl flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] block">
                      Projected Economic Impact
                    </span>
                    <span className="text-xs font-bold text-[#F1F5F9]">
                      {advisory.potentialImpact}
                    </span>
                  </div>
                </div>
              )}

              {/* Model Integration Recommendation */}
              <div className="p-3.5 bg-[#0B0F14] border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-xs font-bold text-[#F1F5F9]">
                      ML Model Simulation Preset Available
                    </span>
                  </div>
                  {advisory.clusterTarget && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] rounded-full">
                      Target: {advisory.clusterTarget}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {advisory.modelRecommendation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#111827] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-[#F1F5F9] transition-colors cursor-pointer"
          >
            Close
          </button>

          {advisory?.suggestedInputs && onApplyModelRecommendation && (
            <button
              onClick={() => {
                onApplyModelRecommendation(
                  advisory.suggestedInputs,
                  advisory.recommendedTab || 'income-prediction'
                );
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
            >
              <span>Apply &amp; Test in {advisory.recommendedTab === 'farmer-clustering' ? 'Farmer Classification' : 'Income Prediction'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

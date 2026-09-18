import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Phone,
  Clock,
  CheckCircle2,
  Bell,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Layers,
  BookOpen,
  Sprout
} from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile, QueryAdvisory } from '../types';
import {
  analyzeQueryProblemAndAdvise,
  POPULAR_PROBLEM_PRESETS,
  ProblemPreset,
} from '../services/advisoryService';

interface ContactUsProps {
  user?: UserProfile | null;
  onSubmitInquiry?: (inquiry: {
    name: string;
    phone: string;
    email?: string;
    subject: string;
    message: string;
    advisory: QueryAdvisory;
  }) => void;
  onNavigateToTab?: (tab: string, suggestedInputs?: any) => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({
  user,
  onSubmitInquiry,
  onNavigateToTab,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    name: string;
    phone: string;
    subject: string;
    message: string;
  } | null>(null);
  const [generatedAdvisory, setGeneratedAdvisory] = useState<QueryAdvisory | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    subject: 'Excessive fertilizer spending with diminishing yield returns',
    message: 'I am applying over 180 kg/ha of chemical fertilizer on my 2.5 hectare plot, but my yield and income are not improving. The input costs are eating up my profit.',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleSelectPreset = (preset: ProblemPreset) => {
    setSelectedPresetId(preset.id);
    setFormData((prev) => ({
      ...prev,
      subject: preset.subject,
      message: preset.message,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submission = {
      name: formData.name.trim() || 'Farmer',
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    // Generate model problem diagnosis & advice
    const advisory = analyzeQueryProblemAndAdvise(submission.subject, submission.message);
    setGeneratedAdvisory(advisory);
    setLastSubmittedData(submission);
    setSubmitted(true);

    if (onSubmitInquiry) {
      onSubmitInquiry({
        ...submission,
        advisory,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-5xl mx-auto space-y-6 pb-8"
    >
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 glass-card border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#00FF88]/10 blur-[90px] pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 opacity-5 pointer-events-none">
          <Sprout className="w-56 h-56 text-[#00FF88]" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#00FF88]" />
            <span>Agronomic Advisory &amp; Query Desk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F1F5F9] tracking-tight leading-tight">
            Submit Query &amp; Get Model Advisory
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
            Have a question about low crop income, excessive fertilizer costs, herd yield, or cluster classification? Submit your query below to get an instant AI model problem diagnosis and actionable advice.
          </p>
        </div>

        <div className="relative z-10 shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-2xl text-xs text-[#00FF88] font-bold shadow-xs">
          <Bell className="w-4 h-4 text-[#00FF88] animate-bounce" />
          <span>Synced to Notifications</span>
        </div>
      </div>

      {/* Main Grid: Form + Info / Advisory Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {submitted && lastSubmittedData && generatedAdvisory ? (
            /* Advisory Diagnostic Result */
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              {/* Top Success confirmation */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#F1F5F9]">
                      Query Analyzed &amp; Logged!
                    </h2>
                    <p className="text-xs text-[#94A3B8]">
                      Submitted by <strong className="text-[#F1F5F9]">{lastSubmittedData.name}</strong> • Logged to notifications bell 🔔
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                  generatedAdvisory.severity === 'Urgent'
                    ? 'bg-[#F43F5E]/15 text-[#F43F5E] border-[#F43F5E]/30'
                    : generatedAdvisory.severity === 'Moderate'
                    ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                    : 'bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30'
                }`}>
                  {generatedAdvisory.severity} Severity
                </span>
              </div>

              {/* Problem Identification Card */}
              <div className="p-4 sm:p-5 bg-[#0B0F14] text-white rounded-2xl border border-white/10 shadow-xs space-y-2">
                <div className="flex items-center space-x-2 text-[#00FF88] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Model Problem Identification</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#F1F5F9] leading-snug">
                  {generatedAdvisory.problemTitle}
                </h3>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[#06B6D4] text-xs font-semibold">
                  Category: {generatedAdvisory.problemCategory}
                </div>
              </div>

              {/* Root Cause Diagnosis */}
              <div className="p-4 bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-[#00FF88] font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>AgriAI Model Root-Cause Diagnosis</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F1F5F9] leading-relaxed">
                  {generatedAdvisory.diagnosis}
                </p>
              </div>

              {/* Key Diagnostic Factors */}
              {generatedAdvisory.keyFactors && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                    <span>Contributing Factors</span>
                  </h4>
                  <div className="space-y-1.5">
                    {generatedAdvisory.keyFactors.map((factor, idx) => (
                      <div key={idx} className="text-xs text-[#94A3B8] flex items-start gap-2 bg-[#0B0F14] p-2.5 rounded-xl border border-white/10">
                        <span className="text-[#00FF88] font-bold">•</span>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable Model Recommendations */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                  <span>Recommended Actionable Steps</span>
                </h4>
                <div className="space-y-2">
                  {generatedAdvisory.actionSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#0B0F14] border border-white/10 rounded-xl text-xs text-[#F1F5F9] flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#00FF88] text-[#0B0F14] flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projected Economic Impact */}
              {generatedAdvisory.potentialImpact && (
                <div className="p-3.5 bg-[#F59E0B]/10 border border-[#F59E0B]/25 rounded-2xl flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F59E0B]/20 text-[#F59E0B] shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F59E0B] block">
                      Projected Outcome &amp; Impact
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#F1F5F9]">
                      {generatedAdvisory.potentialImpact}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {generatedAdvisory.suggestedInputs && onNavigateToTab && (
                  <button
                    type="button"
                    onClick={() =>
                      onNavigateToTab(
                        generatedAdvisory.recommendedTab || 'income-prediction',
                        generatedAdvisory.suggestedInputs
                      )
                    }
                    className="flex-1 py-3 px-4 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
                  >
                    <span>Test In {generatedAdvisory.recommendedTab === 'farmer-clustering' ? 'Farmer Clustering' : 'Income Prediction'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F1F5F9] border border-white/10 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Ask Another Question
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-5">
              {/* Preset Quick Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block">
                  Quick Select Common Problem Inquiries:
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_PROBLEM_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-[11px] px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer border ${
                        selectedPresetId === preset.id
                          ? 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88]/40 shadow-xs'
                          : 'bg-white/5 text-[#94A3B8] border-white/10 hover:border-white/20 hover:text-[#F1F5F9]'
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                      Your Name <span className="text-[#F43F5E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      id="query-input-name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                      Phone Number <span className="text-[#F43F5E]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      id="query-input-phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    Problem / Query Subject <span className="text-[#F43F5E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    id="query-input-subject"
                    placeholder="e.g. Excessive fertilizer costs, Low income on 2 hectares"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#F1F5F9] mb-1">
                    Describe Your Agricultural Problem or Question <span className="text-[#F43F5E]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    id="query-input-message"
                    placeholder="Explain your problem (e.g. crop yield, fertilizer amounts, animal health, income questions)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0B0F14] border border-white/15 rounded-xl text-xs text-[#F1F5F9] focus:outline-none focus:border-[#00FF88] font-medium leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-query-btn"
                  className="w-full py-3.5 px-4 bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#0B0F14] text-xs font-black rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm shadow-[#00FF88]/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Query &amp; Get Model Problem Advisory</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* How Model Advisory Works Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00FF88]" />
              <span>How AgriAI Problem Advisory Works</span>
            </h3>

            <p className="text-[#94A3B8] leading-relaxed text-[11px]">
              Our system applies ML regression curves and K-Means clustering centroid weights to analyze your specific question:
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#0B0F14] rounded-xl border border-white/10">
                <span className="w-5 h-5 rounded-full bg-[#00FF88]/20 text-[#00FF88] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <span className="font-bold text-[#F1F5F9] block">Problem Diagnostic</span>
                  <span className="text-[#94A3B8] text-[11px]">Identifies root causes like fertilizer diminishing returns or herd feeding deficits.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[#0B0F14] rounded-xl border border-white/10">
                <span className="w-5 h-5 rounded-full bg-[#00FF88]/20 text-[#00FF88] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <span className="font-bold text-[#F1F5F9] block">Actionable Problem Advice</span>
                  <span className="text-[#94A3B8] text-[11px]">Provides specific crop dosages, livestock management steps, and diversification targets.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[#0B0F14] rounded-xl border border-white/10">
                <span className="w-5 h-5 rounded-full bg-[#00FF88]/20 text-[#00FF88] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <span className="font-bold text-[#F1F5F9] block">Immediate Model Simulation</span>
                  <span className="text-[#94A3B8] text-[11px]">Pre-fills the ML Income Model so you can verify the projected revenue uplift.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support Channels */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#F1F5F9]">Direct Advisory Extension Officers</h3>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#00FF88]/15 text-[#00FF88] rounded-xl shrink-0 border border-[#00FF88]/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#F1F5F9] block">Farmer Toll-Free Helpline</span>
                  <span className="text-[#94A3B8]">+91 800-FARM-AI / +1 (800) 555-AGRI</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#06B6D4]/15 text-[#06B6D4] rounded-xl shrink-0 border border-[#06B6D4]/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#F1F5F9] block">Email Agronomic Desk</span>
                  <span className="text-[#94A3B8]">advisory@agriai.org</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#8B5CF6]/15 text-[#8B5CF6] rounded-xl shrink-0 border border-[#8B5CF6]/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#F1F5F9] block">Service Hours</span>
                  <span className="text-[#94A3B8]">Mon &ndash; Sat, 8:00 AM &ndash; 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

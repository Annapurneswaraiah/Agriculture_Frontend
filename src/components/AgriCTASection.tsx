import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Sparkles, Send, Radio } from 'lucide-react';

export const AgriCTASection: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [farmSize, setFarmSize] = useState('5-20');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#07110C] relative border-b border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#00FF88]/10 via-[#06B6D4]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold uppercase tracking-wider mb-6">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Deploy Precision Agronomy</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6">
          Transform flight data into your most profitable harvest yet.
        </h2>

        <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of modern growers and agronomy enterprises using AgriAI autonomous
          multispectral drone monitoring to cut chemical waste and maximize crop yields.
        </p>

        {/* Interactive Booking / Onboarding Card */}
        <div className="max-w-xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-left">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#00FF88]/20 text-[#00FF88] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Flight Briefing Dispatched!</h3>
              <p className="text-sm text-[#94A3B8]">
                We've sent initial airspace assessment coordinates to <span className="text-white font-mono">{email}</span>. An AgriAI regional flight specialist will contact you within 2 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#00FF88] hover:underline font-semibold mt-2 cursor-pointer inline-block"
              >
                Register another field or email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                  Agronomy Enterprise or Grower Email:
                </label>
                <input
                  type="email"
                  required
                  placeholder="grower@basin-farms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-white/15 text-white placeholder-[#64748B] text-sm focus:outline-hidden focus:border-[#00FF88] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                  Cultivated Land Size (Hectares):
                </label>
                <select
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#030712] border border-white/15 text-white text-sm focus:outline-hidden focus:border-[#00FF88] transition-colors cursor-pointer"
                >
                  <option value="1-5">1 &ndash; 5 Hectares (Smallholder / Pilot)</option>
                  <option value="5-20">5 &ndash; 20 Hectares (Commercial Farm)</option>
                  <option value="20-100">20 &ndash; 100 Hectares (Co-operative)</option>
                  <option value="100+">100+ Hectares (Enterprise Estate)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#00FF88] hover:bg-[#00FF88]/90 text-[#030712] font-bold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(0,255,136,0.3)] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Request Autonomous Drone Flight Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-2">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#00FF88]" />
                  ISO 27001 Agricultural Data Privacy
                </span>
                <span>No hardware purchase required</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

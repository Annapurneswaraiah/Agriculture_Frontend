import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111F17] rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[85vh] text-[#F1F5F9]">
        {/* Header */}
        <div className="bg-[#0A120D] text-white p-6 relative shrink-0 border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-[#00FF88] uppercase tracking-wider">
            {isPrivacy ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            <span>{isPrivacy ? 'Data Protection & Transparency' : 'Platform Guidelines'}</span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Updated September 2026 &bull; AgriAI Agricultural Information Platform
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#94A3B8] leading-relaxed bg-[#111F17]">
          {isPrivacy ? (
            <>
              <h4 className="font-bold text-white text-base">1. Commitment to Farmer Privacy</h4>
              <p>
                AgriAI is committed to transparent, responsible stewardship of agricultural information. We respect the autonomy and confidentiality of farming communities and agricultural practitioners.
              </p>

              <h4 className="font-bold text-white text-base">2. Information Collection</h4>
              <p>
                When interacting with educational content, inquiry forms, or platform guides, we collect only voluntarily provided contact information (such as name and email address) solely to respond to your agricultural queries.
              </p>

              <h4 className="font-bold text-white text-base">3. Responsible Data Use</h4>
              <p>
                Agricultural data patterns and educational benchmarks presented on this platform are used for illustrative and knowledge-sharing purposes. We do not sell or monetize personal farmer data.
              </p>

              <h4 className="font-bold text-white text-base">4. Inquiries and Rights</h4>
              <p>
                You may request deletion or updates to any submitted inquiry records by contacting our support team at contact@agriai.org.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-white text-base">1. Purpose of the Platform</h4>
              <p>
                AgriAI provides educational content, agricultural knowledge summaries, and contextual frameworks on farming systems, farm resources, and data-informed agriculture.
              </p>

              <h4 className="font-bold text-white text-base">2. Educational &amp; Advisory Notice</h4>
              <p>
                The information provided on this platform is intended for educational and general informational purposes. Because real-world farming outcomes depend on localized weather, soil chemistry, regional markets, and specific crop varieties, farmers should consult certified local agronomists and agricultural extension agents for critical farm management decisions.
              </p>

              <h4 className="font-bold text-white text-base">3. Intellectual Property</h4>
              <p>
                All original design elements, curated educational materials, and informational layouts are property of AgriAI. Visitors may freely share concepts for personal and educational farm improvement.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0A120D] border-t border-white/10 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#00FF88] hover:bg-[#00E077] text-[#0A120D] font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowRight, Sprout } from 'lucide-react';

interface CTASectionProps {
  headline: string;
  supportingText: string;
  buttonText?: string;
  onButtonClick?: () => void;
  badge?: string;
  variant?: 'forest' | 'cream';
}

export const CTASection: React.FC<CTASectionProps> = ({
  headline,
  supportingText,
  buttonText,
  onButtonClick,
  badge = 'Sustainable Future',
  variant = 'forest',
}) => {
  if (variant === 'cream') {
    return (
      <section className="py-20 sm:py-24 bg-[#111F17] border-y border-white/10 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A120D] rounded-3xl p-8 sm:p-14 border border-white/10 shadow-lg text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
              {headline}
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              {supportingText}
            </p>

            {buttonText && onButtonClick && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onButtonClick}
                  className="px-8 py-3.5 bg-[#00FF88] hover:bg-[#00E077] text-[#0A120D] font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0A120D] border-t border-white/10 text-white">
      {/* Organic Background Shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#00FF88]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#00FF88]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] text-xs font-semibold uppercase tracking-wider">
          <Sprout className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>{badge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {headline}
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          {supportingText}
        </p>

        {buttonText && onButtonClick && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onButtonClick}
              className="px-8 py-4 bg-[#00FF88] hover:bg-[#00E077] text-[#0A120D] font-bold rounded-xl text-sm transition-all duration-200 inline-flex items-center gap-2.5 shadow-lg shadow-[#00FF88]/20 cursor-pointer"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

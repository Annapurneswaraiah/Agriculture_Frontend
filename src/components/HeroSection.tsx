import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface HeroButton {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
}

interface HeroSectionProps {
  badgeText?: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  buttons?: HeroButton[];
  compact?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badgeText,
  title,
  subtitle,
  backgroundImage,
  buttons = [],
  compact = false,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0D241A] text-white">
      {/* Background Photography with subtle dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Agriculture landscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-60 contrast-105 scale-100 transform transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081A13]/90 via-[#0D241A]/75 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081A13] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Container */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center ${
          compact ? 'py-20 sm:py-28' : 'py-28 sm:py-36 lg:py-44'
        }`}
      >
        <div className="max-w-3xl space-y-6">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#B7E4C7] text-xs font-semibold tracking-wide uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
              <span>{badgeText}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-sm">
            {title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#D8F3DC]/90 leading-relaxed font-normal max-w-2xl">
            {subtitle}
          </p>

          {buttons.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {buttons.map((btn, idx) => {
                const isPrimary = btn.variant !== 'secondary';
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={btn.onClick}
                    className={`px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-md ${
                      isPrimary
                        ? 'bg-[#52B788] hover:bg-[#40916C] text-[#081A13] hover:text-white shadow-[#52B788]/20'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm'
                    }`}
                  >
                    <span>{btn.label}</span>
                    {btn.icon ? (
                      <btn.icon className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}) => {
  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
            dark
              ? 'bg-[#2D6A4F]/30 text-[#74C69D] border border-[#52B788]/30'
              : 'bg-[#D8F3DC] text-[#1B4332] border border-[#B7E4C7]'
          }`}
        >
          <span>{badge}</span>
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-[#143628]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3.5 text-sm sm:text-base leading-relaxed ${
            dark ? 'text-[#D8F3DC]/80' : 'text-[#4B5563]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

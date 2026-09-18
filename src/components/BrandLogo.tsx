import React, { useId } from 'react';

export interface AgriAiLogoIconProps {
  size?: number | string;
  className?: string;
  hasGlow?: boolean;
}

/**
 * AgriAI Standalone Tech-Agriculture Icon
 * Combines:
 * 1. Green leaf silhouette (organic agricultural fertility & sustainable growth)
 * 2. Agricultural field furrow contours at the base (plowed soil ridges in perspective)
 * 3. AI neural circuit branches, synaptic terminal nodes & central microprocessor nexus
 * 4. Vibrant neon green (#00F5A0) & electric cyan (#06B6D4) gradients with soft cyber-glow
 */
export const AgriAiLogoIcon: React.FC<AgriAiLogoIconProps> = ({
  size = 40,
  className = '',
  hasGlow = true,
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      style={{ width: dimension, height: dimension }}
      className={`relative shrink-0 flex items-center justify-center ${className}`}
    >
      {/* Ambient soft neon glow behind icon */}
      {hasGlow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-90"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,160,0.35) 0%, rgba(6,182,212,0.15) 60%, transparent 80%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 overflow-visible transition-transform duration-300 group-hover:scale-105"
        aria-label="AgriAI Logo Icon"
      >
        <defs>
          {/* Main Leaf Gradient: Neon Green to Deep Emerald to Tech Cyan */}
          <linearGradient
            id={`${id}-leaf`}
            x1="8"
            y1="6"
            x2="40"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#00F5A0" />
            <stop offset="55%" stopColor="#00D287" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Circuit Tech Gradient: Electric Cyan to Neon Green */}
          <linearGradient
            id={`${id}-circuit`}
            x1="24"
            y1="6"
            x2="42"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#00F5A0" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          {/* Soft neon green glow filter */}
          <filter id={`${id}-glow`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="#00F5A0" floodOpacity="0.8" />
          </filter>

          {/* Soft cyan glow filter */}
          <filter id={`${id}-glow-cyan`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="#06B6D4" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. Agricultural Field Furrow Contours at base (Cultivated crop rows meeting at the root) */}
        <path
          d="M13 41 C 17 39, 31 39, 35 41"
          stroke="#06B6D4"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M9 44 C 15 41.5, 33 41.5, 39 44"
          stroke="#00F5A0"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 2. Left Half: Organic & Geometric Leaf Blade */}
        <path
          d="M24 5 C 15 11, 8 20, 8 28.5 C 8 35.5, 14 40, 24 41 C 24 33, 24 18, 24 5 Z"
          fill={`url(#${id}-leaf)`}
          fillOpacity="0.95"
        />
        {/* Subtle geometric inner facet highlight */}
        <path
          d="M24 14 C 18 19, 14 25, 13 31"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 3"
          opacity="0.35"
        />

        {/* 3. Right Half: Futuristic AI Neural Circuit Network */}
        {/* Outer geometric contour boundary */}
        <path
          d="M24 5 L 33 13 L 38 21 L 37 32 L 31 38 L 24 41"
          stroke={`url(#${id}-circuit)`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#06B6D4"
          fillOpacity="0.08"
        />

        {/* Central Stem & Synaptic Energy Spine */}
        <path
          d="M24 41 L 24 5"
          stroke="#00F5A0"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter={`url(#${id}-glow)`}
        />

        {/* Circuit Pathway 1 (Upper Leaf Vein) */}
        <path
          d="M24 13 L 30 17 L 35 17"
          stroke="#06B6D4"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="35" cy="17" r="2.2" fill="#00F5A0" filter={`url(#${id}-glow)`} />
        <circle cx="30" cy="17" r="1.1" fill="#06B6D4" />

        {/* Circuit Pathway 2 (Middle Primary Synapse) */}
        <path
          d="M24 22 L 31 25 L 37 30"
          stroke="#00F5A0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="37" cy="30" r="2.6" fill="#06B6D4" filter={`url(#${id}-glow-cyan)`} />
        <circle cx="31" cy="25" r="1.2" fill="#00F5A0" />

        {/* Circuit Pathway 3 (Lower Root Synapse) */}
        <path
          d="M24 31 L 28 34 L 32 37"
          stroke="#06B6D4"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="37" r="2" fill="#00F5A0" filter={`url(#${id}-glow)`} />

        {/* 4. Central Neural Core Matrix (Where Agriculture Meets AI) */}
        <circle cx="24" cy="22" r="3.4" fill="#0B0F14" stroke="#00F5A0" strokeWidth="1.8" />
        <circle cx="24" cy="22" r="1.8" fill="#00F5A0" filter={`url(#${id}-glow)`} />

        {/* 5. Top Apex Sprout Energy Beacon */}
        <circle cx="24" cy="5" r="1.6" fill="#00F5A0" filter={`url(#${id}-glow)`} />
      </svg>
    </div>
  );
};

export interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  collapsed?: boolean;
  iconOnly?: boolean;
  className?: string;
  taglineClassName?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  collapsed = false,
  iconOnly = false,
  className = '',
  taglineClassName = '',
  onClick,
}) => {
  // Sizing mappings
  const iconPixelSize =
    size === 'sm' ? 30 : size === 'lg' ? 44 : size === 'xl' ? 52 : 36;

  const titleSize =
    size === 'sm'
      ? 'text-base sm:text-lg'
      : size === 'lg'
      ? 'text-2xl sm:text-3xl'
      : size === 'xl'
      ? 'text-3xl sm:text-4xl'
      : 'text-xl sm:text-2xl';

  const taglineSize =
    size === 'sm'
      ? 'text-[8.5px] sm:text-[9px]'
      : size === 'lg'
      ? 'text-xs'
      : size === 'xl'
      ? 'text-xs sm:text-sm'
      : 'text-[9.5px] sm:text-[10.5px]';

  // Standalone / Collapsed icon mode (used in compact sidebar and mobile icon headers)
  if (collapsed || iconOnly) {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center select-none group shrink-0 ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
        title="AgriAI - Smart Farming, Better Tomorrow"
        aria-label="AgriAI - Smart Farming, Better Tomorrow"
      >
        <div className="p-1 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F5A0]/40 transition-colors shadow-xs">
          <AgriAiLogoIcon size={iconPixelSize} hasGlow={true} />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 text-left group select-none max-w-full min-w-0 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      aria-label="AgriAI - Smart Farming, Better Tomorrow"
    >
      {/* Futuristic Tech-Agriculture Emblem */}
      <div className="p-1 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#00F5A0]/40 transition-colors shadow-xs shrink-0">
        <AgriAiLogoIcon size={iconPixelSize} hasGlow={true} />
      </div>

      {/* Brand Name & Tagline Stack */}
      <div className="flex flex-col justify-center min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center leading-none min-w-0">
          <span
            className={`${titleSize} font-black tracking-tight text-[#F1F5F9] group-hover:text-white transition-colors truncate`}
          >
            Agri
          </span>
          <span
            className={`${titleSize} font-black tracking-tight bg-gradient-to-r from-[#00F5A0] via-[#00F5A0] to-[#06B6D4] bg-clip-text text-transparent shrink-0`}
          >
            AI
          </span>
        </div>

        {showTagline && (
          <span
            className={`${taglineSize} font-semibold mt-0.5 sm:mt-1 leading-snug tracking-wide text-[#00F5A0] uppercase whitespace-normal break-words max-w-full opacity-90 group-hover:opacity-100 transition-opacity ${taglineClassName}`}
            title="Smart Farming, Better Tomorrow"
          >
            Smart Farming, Better Tomorrow
          </span>
        )}
      </div>
    </div>
  );
};

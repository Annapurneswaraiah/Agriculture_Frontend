import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AgriAILoaderProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const AgriAILoader: React.FC<AgriAILoaderProps> = ({
  onComplete,
  minDurationMs = 1200,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // allow fade out transition
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white"
        >
          {/* Animated Logo Mark with Rotating Scan Ring */}
          <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
            {/* Outer radar ping wave */}
            <div className="absolute inset-0 rounded-full border border-[#00FF88]/30 animate-ping opacity-30" />

            {/* Rotating multispectral gimbal ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00FF88] border-r-[#06B6D4]"
            />

            {/* Central Hexagon Drone Symbol */}
            <div className="w-16 h-16 rounded-2xl bg-[#062016] border border-[#00FF88]/40 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,136,0.3)]">
              <svg
                className="w-8 h-8 text-[#00FF88]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Custom Drone & Sprout Fusion Icon */}
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                <circle cx="12" cy="12" r="3" fill="#00FF88" fillOpacity="0.3" />
                <path d="M7 7l3 3M17 17l-3-3M7 17l3-3M17 7l-3 3" />
              </svg>
            </div>
          </div>

          {/* Typography */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Agri<span className="text-[#00FF88]">AI</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            </div>
            <p className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono font-medium">
              Initializing Autonomous Flight Systems
            </p>
          </div>

          {/* Progress Loading Bar */}
          <div className="w-48 h-1 bg-[#1e293b] rounded-full mt-6 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: minDurationMs / 1000, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#06B6D4] to-[#00FF88] rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Primary Emerald Glow Orb */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-[#00FF88]/10 blur-[120px]"
      />

      {/* Cyan/Teal Ambient Orb */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -right-40 w-96 h-96 sm:w-[550px] sm:h-[550px] rounded-full bg-[#06B6D4]/8 blur-[140px]"
      />

      {/* Purple/Violet Subtle Core Depth */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -30, 50, 0],
          scale: [0.95, 1.1, 1, 0.95],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/7 blur-[150px]"
      />

      {/* Subtle fine tech-grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};

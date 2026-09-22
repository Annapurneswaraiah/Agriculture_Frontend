import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FarmingSystemCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  icon: LucideIcon;
  highlights: string[];
}

export const FarmingSystemCard: React.FC<FarmingSystemCardProps> = ({
  title,
  category,
  description,
  image,
  icon: Icon,
  highlights,
}) => {
  return (
    <div className="agri-card overflow-hidden flex flex-col bg-[#111F17] group border border-white/10 hover:border-[#00FF88]/50 transition-all rounded-2xl shadow-xl">
      {/* High-quality Agricultural Image */}
      <div className="relative w-full h-56 overflow-hidden bg-[#0A120D]">
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
          <span className="text-xs font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/20 text-[#00FF88]">
            {category}
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#00FF88]/20 backdrop-blur-xs border border-[#00FF88]/30 flex items-center justify-center text-[#00FF88]">
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#00FF88] transition-colors mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 space-y-2">
          <span className="text-[11px] font-bold text-[#00FF88] uppercase tracking-wider block">
            Key Characteristics
          </span>
          <ul className="space-y-1.5">
            {highlights.map((item, idx) => (
              <li key={idx} className="text-xs text-[#CBD5E1] flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

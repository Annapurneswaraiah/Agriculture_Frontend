import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  imageAlt,
  tag,
  className = '',
}) => {
  return (
    <div
      className={`agri-card flex flex-col overflow-hidden bg-white group ${className}`}
    >
      {image && (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#F4EFE6]">
          <img
            src={image}
            alt={imageAlt || title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {tag && (
            <span className="absolute top-3 left-3 bg-[#143628]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
              {tag}
            </span>
          )}
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center shrink-0 group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors duration-200">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {!image && tag && (
                <span className="text-[11px] font-bold text-[#40916C] uppercase tracking-wider block mb-0.5">
                  {tag}
                </span>
              )}
              <h3 className="text-lg font-bold text-[#143628] leading-snug group-hover:text-[#2D6A4F] transition-colors">
                {title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconTextColor?: string;
  onClick?: () => void;
  id?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-[#42F58D]/15',
  iconTextColor = 'text-[#42F58D]',
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`glass-card rounded-2xl p-5 border border-[#42F58D]/15 flex items-center justify-between transition-all duration-300 ${
        onClick
          ? 'cursor-pointer hover:-translate-y-0.5 hover:border-[#42F58D]/40'
          : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-[#42F58D]/15 ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconTextColor}`} />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#A0B4A5] uppercase tracking-wider">{title}</p>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F4F8F4] tracking-tight mt-0.5">{value}</div>
          <p className="text-xs text-[#A0B4A5]/80 font-normal mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

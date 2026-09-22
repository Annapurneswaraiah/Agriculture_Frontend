import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, MapPin, Globe, Compass, Share2 } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-[#0D1B13] text-[#F4F8F4] border-t border-[#42F58D]/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#42F58D]/15">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#42F58D]/15 border border-[#42F58D]/30 text-[#42F58D] flex items-center justify-center shadow-none group-hover:bg-[#42F58D] group-hover:text-[#07110C] transition-colors">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-[#F4F8F4]">
                  AgriAI
                </span>
                <p className="text-[10px] font-semibold text-[#86D957] uppercase tracking-wider -mt-0.5">
                  Precision Telemetry Platform
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A0B4A5] leading-relaxed max-w-sm">
              Empowering farmers, agricultural learners, and rural communities through accessible agricultural knowledge, sustainable farming practices, and data-informed understanding.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {/* Telemetry network indicators */}
              <div
                title="Agricultural Knowledge Network"
                className="w-8 h-8 rounded-lg bg-[#12241A] border border-[#42F58D]/15 text-[#42F58D] flex items-center justify-center hover:bg-[#42F58D]/20 transition-colors cursor-default"
              >
                <Globe className="w-4 h-4" />
              </div>
              <div
                title="Farmer Extension Network"
                className="w-8 h-8 rounded-lg bg-[#12241A] border border-[#42F58D]/15 text-[#42F58D] flex items-center justify-center hover:bg-[#42F58D]/20 transition-colors cursor-default"
              >
                <Compass className="w-4 h-4" />
              </div>
              <div
                title="Community Outreach"
                className="w-8 h-8 rounded-lg bg-[#12241A] border border-[#42F58D]/15 text-[#42F58D] flex items-center justify-center hover:bg-[#42F58D]/20 transition-colors cursor-default"
              >
                <Share2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F4F8F4] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-[#A0B4A5] hover:text-[#42F58D] transition-colors block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#A0B4A5] hover:text-[#42F58D] transition-colors block py-1"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-[#A0B4A5] hover:text-[#42F58D] transition-colors block py-1 cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Topics & Understanding */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F4F8F4] uppercase tracking-wider">
              Agricultural Domains
            </h4>
            <ul className="space-y-2 text-xs text-[#A0B4A5]">
              <li>Crop &amp; Soil Cultivation</li>
              <li>Farming Systems &amp; Livelihoods</li>
              <li>Livestock Stewardship</li>
              <li>Water &amp; Resource Efficiency</li>
              <li>Data-Informed Insights</li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F4F8F4] uppercase tracking-wider">
              Platform &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-[#A0B4A5] hover:text-[#42F58D] transition-colors block py-1 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-[#A0B4A5] hover:text-[#42F58D] transition-colors block py-1 cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <div className="text-xs text-[#42F58D] flex items-center gap-1.5 pt-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@agriai.org</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A0B4A5]">
          <p>
            &copy; 2026 AgriAI. Dedicated to farmer empowerment and agricultural understanding.
          </p>
          <p className="text-right">
            Designed for farmers, agricultural students, and rural communities.
          </p>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, MapPin, Globe, Compass, Radio, Shield, Phone } from 'lucide-react';

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
    <footer className="bg-[#030712] text-[#F1F5F9] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] flex items-center justify-center transition-colors group-hover:bg-[#00FF88] group-hover:text-[#030712]">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-white">
                  Agri<span className="text-[#00FF88]">AI</span>
                </span>
                <p className="text-[10px] font-mono font-semibold text-[#00FF88] uppercase tracking-wider -mt-0.5">
                  Smart Farming Intelligence
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Combining satellite imagery, autonomous multispectral drone monitoring, and machine
              learning to help growers, agronomists, and farm enterprises make faster, smarter field
              decisions.
            </p>

            <div className="space-y-1.5 text-xs text-[#CBD5E1] pt-2 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>Agronomy Intelligence Basin, Sector 7A</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>intelligence@agriai.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>+1 (800) 459-AGRI</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Platform &amp; Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5">
                  Operations Dashboard
                </Link>
              </li>
              <li>
                <Link to="/income-prediction" className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5">
                  Income Prediction ML
                </Link>
              </li>
              <li>
                <Link to="/farmer-clustering" className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5">
                  Peer Group Clustering
                </Link>
              </li>
              <li>
                <Link to="/cluster-summary" className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5">
                  Segment Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Agronomy Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Intelligence Solutions
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>Autonomous Drone Telemetry</li>
              <li>Multispectral 6-Band NDVI</li>
              <li>NDRE Chlorophyll Profiling</li>
              <li>Root-Zone Hydric Moisture</li>
              <li>Variable-Rate Prescription ISOXML</li>
              <li>Pre-Symptomatic Blight Alert</li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Security &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5 cursor-pointer"
                >
                  Privacy &amp; Telemetry Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5 cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-[#94A3B8] hover:text-[#00FF88] transition-colors block py-0.5 cursor-pointer"
                >
                  Contact Agronomy Desk
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#00FF88] font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                <span>Flight Engine: Active 100%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>
            &copy; 2026 AgriAI — Smart Farming Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>ISO 27001 Certified</span>
            <span>&bull;</span>
            <span>RTK Sub-inch Accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, Sprout } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Agricultural Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', topic: 'Agricultural Inquiry', message: '' });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111F17] rounded-3xl shadow-2xl border border-white/10 overflow-hidden text-[#F1F5F9]">
        {/* Header */}
        <div className="bg-[#0A120D] text-white p-6 sm:p-7 relative border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00FF88] mb-1.5">
            <Sprout className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Agricultural Inquiries &amp; Support
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
            Have questions about sustainable farming practices or agricultural data insights? We'd love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 bg-[#111F17]">
          {submitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/30 text-[#00FF88] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Message Received!</h4>
              <p className="text-xs text-[#94A3B8] max-w-xs mx-auto">
                Thank you for reaching out. An agricultural specialist will review your note and get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Gonzalez or John Farmer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-sm text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-sm text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1.5">
                    Topic of Interest
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-sm text-white focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none"
                  >
                    <option value="Agricultural Inquiry" className="bg-[#0A120D] text-white">General Agricultural Inquiry</option>
                    <option value="Farming Systems" className="bg-[#0A120D] text-white">Farming Systems Discussion</option>
                    <option value="Data Insights" className="bg-[#0A120D] text-white">Agricultural Data Insights</option>
                    <option value="Educational Collaboration" className="bg-[#0A120D] text-white">Educational Collaboration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E2E8F0] uppercase tracking-wider mb-1.5">
                  Your Message or Question
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your farm, research, or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0A120D] text-sm text-white placeholder-slate-500 focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88] outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#94A3B8] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00FF88] hover:bg-[#00E077] text-[#0A120D] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Quick contact info */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00FF88]" />
              <span>contact@agriai.org</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00FF88]" />
              <span>Agricultural Research District</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

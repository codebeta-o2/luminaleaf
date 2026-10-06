import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  ArrowUp, 
  MessageCircle, 
  ExternalLink,
  Navigation,
  Clock
} from 'lucide-react';
import logoMark from '../assets/images/logo_H.png';

interface FooterProps {
  setView: (view: string) => void;
  darkMode: boolean;
}

export default function Footer({ setView, darkMode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (viewId: string) => {
    setView(viewId);
    scrollToTop();
  };

  return (
    <footer className={`transition-colors duration-300 border-t ${
      darkMode 
        ? 'bg-[#121118] text-gray-300 border-gray-800/80' 
        : 'bg-neutral-950 text-gray-300 border-neutral-800'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top Info Grid (3 Balanced Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Col 1: Logo & Company Story (5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-5">
            <div className="flex items-center cursor-pointer select-none py-1 group shrink-0" onClick={() => handleLinkClick('home')}>
              <img 
                src={logoMark} 
                alt="LuminaLeaf Energy" 
                className="object-contain transition-transform duration-200 group-hover:scale-105 shrink-0 w-[38px] h-[43px] sm:w-[48px] sm:h-[54px] md:w-[56px] md:h-[63px] lg:w-[65.5px] lg:h-[74px]"
                referrerPolicy="no-referrer" 
              />
              <div 
                className="ml-1.5 sm:ml-2 md:ml-2.5 flex flex-col justify-center leading-none"
                style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                <div className="flex items-center tracking-tight font-black text-lg sm:text-xl md:text-2xl lg:text-[29px]">
                  <span 
                    style={{ color: '#076939' }}
                    className="text-[#076939]"
                  >
                    LUMINA
                  </span>
                  <span 
                    style={{ color: '#8ac43f' }}
                    className="text-[#8ac43f]"
                  >
                    LEAF
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 tracking-tight leading-tight whitespace-nowrap text-[9.5px] sm:text-[13px] md:text-[16px] lg:text-[20px] font-extrabold -mt-0.5 sm:-mt-1 md:-mt-1.5 lg:-mt-[5px]">
                  <span 
                    className="text-white"
                    style={{ color: '#ffffff' }}
                  >
                    solution that keeps
                  </span>
                  <span 
                    className="text-[#8ac43f]"
                    style={{ color: '#8ac43f' }}
                  >
                    nature green
                  </span>
                </div>
              </div>
            </div>

            
            {/* Hours Chip */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs text-gray-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Mon – Sat: 9:30 AM – 6:30 PM (IST)</span>
            </div>

            {/* Social handles */}
            <div className="flex items-center space-x-2.5 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="p-2 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-lg text-gray-400 transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/luminaleafenergy?igsh=aG5jZDBzcWl5bWJh" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="p-2 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-lg text-gray-400 transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/luminaleaf/posts/?feedView=all&viewAsMember=true" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="p-2 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-lg text-gray-400 transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase mb-5 border-l-2 border-emerald-500 pl-3">
              Application Navigation
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="text-gray-400 hover:text-emerald-400 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="text-gray-400 hover:text-emerald-400 transition">
                  Core Solar Services
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="text-gray-400 hover:text-emerald-400 transition">
                  About Founders & Team
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('gallery')} className="text-gray-400 hover:text-emerald-400 transition">
                  Gallery & Commissioned Sites
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('blog')} className="text-gray-400 hover:text-emerald-400 transition">
                  Solar Engineering Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="text-gray-400 hover:text-emerald-400 transition font-medium">
                  Contact & Survey Consultation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts & Addresses (4 cols) */}
          <div className="md:col-span-8 lg:col-span-4 space-y-5">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase border-l-2 border-emerald-500 pl-3">
              Direct Contact & Support
            </h3>

            {/* Quick Contacts */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a 
                href="tel:+918240311712" 
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition group bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/5"
              >
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">+91 8240311712</span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded ml-auto">Direct</span>
              </a>

              <a 
                href="https://wa.me/918116463845?text=Hello%20LuminaLeaf%20Solar%20Team%2C%20I%20would%20like%20to%20inquire%20about%20solar%20solutions." 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition group bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/5"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">+91 8116463845</span>
                <span className="text-[10px] uppercase font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded ml-auto">WhatsApp</span>
              </a>

              <a 
                href="mailto:connect@luminaleaf.com" 
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition group bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/5"
              >
                <Mail className="h-4 w-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">connect@luminaleaf.com</span>
              </a>
            </div>

            {/* Address Details */}
            <div className="space-y-3 pt-1 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Central Headquarters:</p>
                  <p className="leading-relaxed">Bahargram, Panskura (R.S), East Medinipur, West Bengal - 721152</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Kolkata Regional Branch:</p>
                  <p className="leading-relaxed">South Dum Dum, Kolkata, West Bengal - 700055</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Interactive Map Showcase (Wide & Balanced) */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/60 overflow-hidden shadow-2xl backdrop-blur-sm">
          
          {/* Map Section Header */}
          <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02]">
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-white">
                Visit LuminaLeaf in Panskura, West Bengal
              </h4>
              <p className="text-xs text-gray-400">
                Bahargram, Panskura (R.S), East Medinipur — Pin 721152
              </p>
            </div>

            {/* Action buttons */}
            <div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=22.387847379623725,87.74058457529505"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20 transition"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="w-full h-64 sm:h-80 md:h-96 relative bg-neutral-950">
            <iframe
              title="LuminaLeaf Office Google Map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3506.559849582072!2d87.74058457529505!3d22.387847379623725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDIzJzE2LjMiTiA4N8KwNDQnMzUuNCJF!5e1!3m2!1sen!2sin!4v1791124198375!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full block"
            />
          </div>

        </div>

        {/* Divider & back to top */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2026 LuminaLeaf Energy Private Limited. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-emerald-500 px-3.5 py-1.5 rounded-lg transition"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>

      </div>

    </footer>
  );
}

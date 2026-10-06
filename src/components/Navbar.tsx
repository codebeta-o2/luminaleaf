import React, { useState, useRef } from 'react';
import { Menu, X, Sun, Moon, Zap, MessageSquare, Phone, Image as ImageIcon, ChevronDown } from 'lucide-react';
import logoMark from '../assets/images/logo_H.png';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

export const homeSubSections = [
  { id: 'hero-section', label: 'Hero section' },
  { id: 'introduction-section', label: 'Introduction' },
  { id: 'cross-industry-section', label: 'Cross Industry presence' },
  { id: 'strategic-phase-section', label: 'Strategic Phase and Risk Mitigation' },
  { id: 'certifications-section', label: 'Certifications' },
  { id: 'why-luminaleaf-section', label: 'Why Luminaleaf?' },
  { id: 'when-to-collaborate-section', label: 'When to Collaborate?' },
  { id: 'our-presence-section', label: 'Our Presence - Our Reliability' },
  { id: 'connect-with-us-section', label: 'Connect with Us' },
];

export default function Navbar({ currentView, setView, darkMode, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [mobileHomeExpanded, setMobileHomeExpanded] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'services', label: 'SERVICES' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'gallery', label: 'GALLERY & TOUR' },
    { id: 'blog', label: 'BLOG' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setMobileMenuOpen(false);
    setIsHomeDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionScroll = (sectionId: string) => {
    setIsHomeDropdownOpen(false);
    setMobileMenuOpen(false);

    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        if (sectionId === 'hero-section') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 150);
    } else {
      if (sectionId === 'hero-section') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 border-b ${
      darkMode 
        ? 'bg-[#1F1B24]/90 border-gray-800 text-white' 
        : 'bg-white/90 border-gray-200 text-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer select-none py-1 group shrink-0" 
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={logoMark} 
              alt="LuminaLeaf" 
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
                  className={darkMode ? 'text-white' : 'text-gray-900'}
                  style={{ color: darkMode ? '#ffffff' : '#111827' }}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;

              if (item.id === 'home') {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                      setIsHomeDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setIsHomeDropdownOpen(false);
                      }, 200);
                    }}
                  >
                    <button
                      onClick={() => handleNavClick('home')}
                      className={`inline-flex items-center gap-1.5 relative px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                        isActive
                          ? darkMode
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : 'text-emerald-600 bg-emerald-50'
                          : darkMode
                            ? 'text-gray-300 hover:text-emerald-400 hover:bg-white/5'
                            : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isHomeDropdownOpen ? 'rotate-180 text-emerald-500' : 'text-gray-400'
                        }`} 
                      />
                      {isActive && (
                        <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-500 rounded-full" />
                      )}
                    </button>

                    {/* Under the HOME button Dropdown */}
                    {isHomeDropdownOpen && (
                      <div 
                        className={`absolute left-0 top-full mt-1.5 w-80 rounded-2xl shadow-2xl border py-2 z-50 backdrop-blur-xl transition-all ${
                          darkMode 
                            ? 'bg-[#181a20]/95 border-gray-700/80 text-white shadow-black/70' 
                            : 'bg-white/98 border-gray-200 text-gray-800 shadow-xl shadow-emerald-950/10'
                        }`}
                      >
                        <div className="px-4 py-2 border-b border-gray-200/40 dark:border-gray-800/80">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            Home Sections
                          </p>
                        </div>
                        <div className="py-1 max-h-[75vh] overflow-y-auto">
                          {homeSubSections.map((sec) => (
                            <button
                              key={sec.id}
                              onClick={() => handleSectionScroll(sec.id)}
                              className={`w-full text-left px-4 py-2 text-xs font-medium transition-all flex items-center gap-2.5 group ${
                                darkMode 
                                  ? 'hover:bg-emerald-500/15 hover:text-emerald-300 text-gray-200' 
                                  : 'hover:bg-emerald-50 hover:text-emerald-800 text-gray-700'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 group-hover:scale-125 transition-all shrink-0" />
                              <span className="truncate group-hover:translate-x-0.5 transition-transform">
                                {sec.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? darkMode
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-emerald-600 bg-emerald-50'
                      : darkMode
                        ? 'text-gray-300 hover:text-emerald-400 hover:bg-white/5'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right utilities: Theme Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${
                darkMode 
                  ? 'bg-gray-800 text-amber-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button & mode trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 text-amber-400' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden transition-all border-b ${
          darkMode ? 'bg-[#1F1B24] border-gray-800' : 'bg-white border-gray-100'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => {
              if (item.id === 'home') {
                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleNavClick('home')}
                        className={`flex-1 text-left px-4 py-3 rounded-xl text-base font-medium tracking-wide ${
                          currentView === 'home'
                            ? darkMode
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : 'text-emerald-600 bg-emerald-50'
                            : darkMode
                              ? 'text-gray-300 hover:bg-white/5'
                              : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                      <button
                        onClick={() => setMobileHomeExpanded(!mobileHomeExpanded)}
                        className={`p-3 rounded-xl transition-colors ${
                          darkMode ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                        title="Toggle Home Sections"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileHomeExpanded ? 'rotate-180 text-emerald-500' : ''}`} />
                      </button>
                    </div>

                    {/* Mobile Home Subsections Accordion */}
                    {mobileHomeExpanded && (
                      <div className="pl-3 pr-2 py-1 space-y-1 border-l-2 border-emerald-500/40 ml-4 my-1">
                        {homeSubSections.map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => handleSectionScroll(sec.id)}
                            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              darkMode 
                                ? 'text-gray-300 hover:text-emerald-400 hover:bg-white/5' 
                                : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 shrink-0" />
                            <span>{sec.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium tracking-wide ${
                    currentView === item.id
                      ? darkMode
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-emerald-600 bg-emerald-50'
                      : darkMode
                        ? 'text-gray-300 hover:bg-white/5'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

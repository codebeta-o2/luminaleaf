import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import AboutView from './components/AboutView';
import GalleryView from './components/GalleryView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [contactPrefill, setContactPrefill] = useState<any>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme_preference');
    if (stored !== null) {
      return stored === 'dark';
    }
    return true; // Default to dark mode
  });

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const customEvent = e as CustomEvent<any>;
      if (customEvent.detail) {
        if (typeof customEvent.detail === 'string') {
          setView(customEvent.detail);
          setContactPrefill(null);
        } else if (typeof customEvent.detail === 'object') {
          setView(customEvent.detail.view);
          if (customEvent.detail.prefill) {
            setContactPrefill(customEvent.detail.prefill);
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('navigate-view', handleNavigation);
    return () => window.removeEventListener('navigate-view', handleNavigation);
  }, []);

  // Scroll to top automatically whenever currentView switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme_preference', newMode ? 'dark' : 'light');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView setView={setView} darkMode={darkMode} />;
      case 'services':
        return <ServicesView darkMode={darkMode} />;
      case 'about':
        return <AboutView darkMode={darkMode} />;
      case 'gallery':
        return <GalleryView darkMode={darkMode} />;
      case 'blog':
        return <BlogView darkMode={darkMode} />;
      case 'contact':
        return <ContactView darkMode={darkMode} prefillData={contactPrefill} />;
      default:
        return <HomeView setView={setView} darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${
      darkMode 
        ? 'bg-dark-ash text-gray-100 selection:bg-leaf-green selection:text-white dark-theme' 
        : 'bg-light-ash text-gray-900 selection:bg-leaf-green selection:text-white light-theme'
    }`}>
      
      {/* Responsive Navbar */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
      />

      {/* Main View Area with clean transition animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Quick Action Contacts */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Floating Quick Action Widgets */}
        <div className="flex flex-col items-end gap-2.5">
          <a
            href="https://wa.me/918116463845?text=Hello%20LuminaLeaf%20Solar%20Team%2C%20I%20would%20like%20to%20inquire%20about%20solar%20solutions."
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none"
            title="Chat on WhatsApp: +91 8116463845"
          >
            <MessageCircle className="h-5 w-5 fill-white" />
            <span className="hidden sm:inline font-bold">WhatsApp: +91 8116463845</span>
          </a>

          <a
            href="tel:+918240311712"
            className="pointer-events-auto flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-saffron hover:bg-opacity-90 text-white font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none"
            title="Call Our Solar Expert: +91 8240311712"
          >
            <Phone className="h-5 w-5" />
            <span className="hidden sm:inline font-black uppercase tracking-wider pr-1">Call +91 8240311712</span>
          </a>
        </div>

      </div>

      {/* Footer component */}
      <Footer setView={setView} darkMode={darkMode} />

    </div>
  );
}

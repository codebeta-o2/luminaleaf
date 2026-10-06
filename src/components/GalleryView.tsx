import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryItems, commissionedProjectSections } from '../data';
import { 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Camera,
  Building2,
  FolderGit2
} from 'lucide-react';
import { GalleryItem } from '../types';
import fallbackSolarBanner from '../assets/images/banner_rooftop_solar_1782053662586.jpg';

interface GalleryViewProps {
  darkMode: boolean;
}

const isWhatsAppName = (name?: string): boolean => {
  if (!name) return false;
  const lower = name.trim().toLowerCase();
  return lower.startsWith('whatsapp image') || lower.startsWith('whatsapp');
};

export default function GalleryView({ darkMode }: GalleryViewProps) {
  const [selectedProject, setSelectedProject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Filtered sections and items
  const filteredSections = useMemo(() => {
    return commissionedProjectSections
      .map(section => {
        // Project name filter
        if (selectedProject !== 'All' && section.projectName !== selectedProject) {
          return null;
        }

        // Filter individual items within section
        const matchingItems = section.items.filter(item => {
          if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            const tagMatch = item.tagline && !isWhatsAppName(item.tagline) ? item.tagline.toLowerCase().includes(q) : false;
            const projMatch = item.projectName?.toLowerCase().includes(q);
            return tagMatch || projMatch;
          }

          return true;
        });

        if (matchingItems.length === 0) return null;

        return {
          ...section,
          items: matchingItems
        };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);
  }, [selectedProject, searchQuery]);

  // Flattened list for lightbox pagination
  const allFilteredItems = useMemo(() => {
    const list: GalleryItem[] = [];
    filteredSections.forEach(sec => {
      list.push(...sec.items);
    });
    return list;
  }, [filteredSections]);

  // Active item index in flattened array
  const activeIndex = activeItem 
    ? allFilteredItems.findIndex(i => i.id === activeItem.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveItem(allFilteredItems[activeIndex - 1]);
    } else if (allFilteredItems.length > 0) {
      setActiveItem(allFilteredItems[allFilteredItems.length - 1]);
    }
  }, [activeIndex, allFilteredItems]);

  const handleNext = useCallback(() => {
    if (activeIndex >= 0 && activeIndex < allFilteredItems.length - 1) {
      setActiveItem(allFilteredItems[activeIndex + 1]);
    } else if (allFilteredItems.length > 0) {
      setActiveItem(allFilteredItems[0]);
    }
  }, [activeIndex, allFilteredItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, handlePrev, handleNext]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
          <Camera className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-500 font-bold text-xs tracking-wider uppercase">
            Project Commissioned Gallery ({galleryItems.length} Field Records)
          </span>
        </div>
        <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Commissioned Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Field Evidence</span>
        </h1>
        <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          On-ground execution photography classified by commissioned site files. Each photograph is cataloged directly by its milestone installation tagline.
        </p>
      </div>

      {/* Control Bar: Project Selector & Quick Search */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Select Project File:
            </span>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="gallery-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by project or milestone..."
              className={`w-full pl-10 pr-12 py-2 text-xs rounded-full border outline-none transition-all ${
                darkMode
                  ? 'bg-gray-800/80 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-sm'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-xs font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Quick-Jump Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className={`text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 pl-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-500" />
            Projects:
          </span>
          <button
            onClick={() => setSelectedProject('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedProject === 'All'
                ? 'bg-emerald-600 text-white shadow-sm'
                : darkMode
                  ? 'bg-gray-800 text-gray-400 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Commissioned ({commissionedProjectSections.length})
          </button>
          {commissionedProjectSections.map(sec => (
            <button
              key={sec.projectName}
              onClick={() => setSelectedProject(sec.projectName)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedProject === sec.projectName
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : darkMode
                    ? 'bg-gray-800 text-gray-400 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {sec.projectName} ({sec.items.length})
            </button>
          ))}
        </div>
      </div>

      {/* Summary status text */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <span>
          Displaying <strong className="text-emerald-400">{allFilteredItems.length}</strong> photos across{' '}
          <strong className="text-emerald-400">{filteredSections.length}</strong> project sections
        </span>
        {searchQuery && (
          <span className="text-amber-400 font-medium">Filtering for: "{searchQuery}"</span>
        )}
      </div>

      {/* Main Project Commissioned Sections */}
      {filteredSections.length === 0 ? (
        <div className={`p-16 text-center rounded-3xl border ${darkMode ? 'bg-gray-800/30 border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-semibold">No project photos match your current search or filters</p>
          <button
            onClick={() => { setSelectedProject('All'); setSearchQuery(''); }}
            className="mt-3 text-xs text-emerald-400 hover:underline font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredSections.map(section => (
            <div
              key={section.projectName}
              id={`section-${section.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`rounded-3xl p-6 sm:p-8 border transition-all ${
                darkMode ? 'bg-gray-900/50 border-gray-800/80 shadow-lg' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              {/* Project Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-200 dark:border-gray-800/80 mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-500" />
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      Commissioned Site File
                    </span>
                  </div>
                  <h2 className={`text-2xl font-extrabold tracking-tight ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.projectName}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {section.items.length} {section.items.length === 1 ? 'Photograph' : 'Photographs'}
                  </span>
                </div>
              </div>

              {/* Photos Grid within Project */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {section.items.map(item => (
                  <motion.div
                    key={item.id}
                    id={`gallery-item-${item.id}`}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setActiveItem(item)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all flex flex-col ${
                      darkMode 
                        ? 'bg-gray-800/40 border-gray-700/60 hover:border-emerald-500/50' 
                        : 'bg-neutral-50 border-gray-200 hover:border-emerald-500/50'
                    }`}
                  >
                    {/* Media preview container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.tagline || item.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (item.projectName && item.fileName && !target.dataset.triedPublic) {
                            target.dataset.triedPublic = 'true';
                            target.src = `/assets/Project Commissioned/${encodeURIComponent(item.projectName)}/${encodeURIComponent(item.fileName)}`;
                            return;
                          }
                          if (!target.dataset.failed) {
                            target.dataset.failed = 'true';
                            target.src = fallbackSolarBanner;
                          }
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 group-hover:opacity-100 transition-opacity" />

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-xl transform scale-95 group-hover:scale-100 transition">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </div>
                      </div>

                      {/* Bottom Tagline overlay on card (Hidden if name starts with 'WhatsApp Image' or is empty) */}
                      {item.tagline && !isWhatsAppName(item.tagline) && !isWhatsAppName(item.fileName) && (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <div className="bg-neutral-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 shadow-lg">
                            <p className="text-[11px] font-extrabold uppercase tracking-wide text-white truncate text-center">
                              {item.tagline}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card details caption */}
                    <div className="p-3 flex items-center justify-between text-[11px] border-t border-black/5 dark:border-white/5">
                      <span className="text-gray-400 font-medium truncate">
                        {item.projectName}
                      </span>
                      <span className="text-emerald-500 font-bold shrink-0 ml-1">
                        Verified
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
            onClick={() => setActiveItem(null)}
          >
            <div 
              className="relative max-w-5xl w-full bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="px-5 py-3.5 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between text-white">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="overflow-hidden">
                    {activeItem.tagline && !isWhatsAppName(activeItem.tagline) && !isWhatsAppName(activeItem.fileName) ? (
                      <>
                        <p className="text-sm font-bold text-white truncate">
                          {activeItem.tagline}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {activeItem.projectName}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-bold text-white truncate">
                        {activeItem.projectName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-xs text-gray-400 hidden sm:inline mr-2">
                    {activeIndex + 1} / {allFilteredItems.length}
                  </span>
                  <button
                    id="lightbox-prev-btn"
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    title="Previous (Left Arrow)"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    id="lightbox-next-btn"
                    onClick={handleNext}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    title="Next (Right Arrow)"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    id="lightbox-close-btn"
                    onClick={() => setActiveItem(null)}
                    className="p-2 ml-1 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 transition"
                    title="Close (Esc)"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Media viewer stream */}
              <div className="relative aspect-video sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.mediaUrl}
                  alt={activeItem.tagline || activeItem.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (activeItem.projectName && activeItem.fileName && !target.dataset.triedPublic) {
                      target.dataset.triedPublic = 'true';
                      target.src = `/assets/Project Commissioned/${encodeURIComponent(activeItem.projectName)}/${encodeURIComponent(activeItem.fileName)}`;
                      return;
                    }
                    if (!target.dataset.failed) {
                      target.dataset.failed = 'true';
                      target.src = fallbackSolarBanner;
                    }
                  }}
                  className="max-h-[65vh] w-full object-contain select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Left and Right navigation buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 backdrop-blur-sm transition hidden sm:flex items-center justify-center"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 backdrop-blur-sm transition hidden sm:flex items-center justify-center"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Media Bar with Project/Photo details */}
              <div className="p-4 sm:p-5 bg-neutral-950 text-white flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                <div className="space-y-0.5">
                  {activeItem.tagline && !isWhatsAppName(activeItem.tagline) && !isWhatsAppName(activeItem.fileName) ? (
                    <h4 className="text-base font-extrabold text-white">
                      {activeItem.tagline}
                    </h4>
                  ) : (
                    <h4 className="text-base font-extrabold text-white">
                      {activeItem.projectName}
                    </h4>
                  )}
                  <p className="text-xs text-gray-400">
                    Project: <strong className="text-gray-200">{activeItem.projectName}</strong>
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 hidden md:inline">
                    Use Left / Right arrow keys to navigate
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

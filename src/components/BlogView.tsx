import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight, BookOpen, X, Sparkles, AlertCircle } from 'lucide-react';

interface BlogViewProps {
  darkMode: boolean;
}

export default function BlogView({ darkMode }: BlogViewProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Industry' | 'Engineering' | 'Policy' | 'Case Study'>('All');

  // Filter posts list
  const filteredPosts = blogPosts.filter(post => {
    if (activeCategory === 'All') return true;
    return post.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title section header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-emerald-500 font-bold text-xs tracking-wider uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full">
          LuminaLeaf Insights
        </span>
        <h1 className={`text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          The Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">Knowledge Station</span>
        </h1>
        <p className="text-sm text-gray-400">
          In-depth technical guides, regulatory net-metering breakdowns, and civil-structural wind analysis written directly by our co-founders.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {(['All', 'Industry', 'Engineering', 'Policy', 'Case Study'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? 'bg-amber-500 text-white shadow-md'
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid / Empty State */}
      {filteredPosts.length === 0 ? (
        <div className={`text-center py-20 px-6 max-w-lg mx-auto rounded-3xl border ${
          darkMode ? 'bg-gray-800/30 border-gray-700/60' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No Blog Posts Available
          </h3>
          <p className="text-sm text-gray-400">
            Our engineering articles and industry case studies are currently being curated. Please check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map(post => (
              <motion.article 
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`group cursor-pointer rounded-2xl overflow-hidden shadow-xl border flex flex-col h-full transition duration-300 ${
                  darkMode ? 'bg-[#1a1720]/60 border-gray-800/80 hover:border-emerald-500/30' : 'bg-white border-gray-100 hover:border-emerald-500/40'
                }`}
              >
                {/* Image thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Text Meta Content */}
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="text-[10px] font-semibold text-amber-500 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-gray-400 font-semibold uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 .5 w-3.5 text-emerald-500" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold leading-tight group-hover:text-emerald-500 transition line-clamp-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed flex-grow">
                    {post.summary}
                  </p>

                  <div className="flex items-center justify-between text-xs font-bold text-emerald-500 pt-3 border-t border-gray-700/10 group-hover:text-amber-500 transition">
                    <span>Open Full Article</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Full Article Reader Modal Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto ${
                darkMode ? 'bg-[#1F1B24] border border-gray-800 text-white' : 'bg-white border border-gray-100 text-gray-800'
              }`}
              onClick={e => e.stopPropagation()}
            >
              
              {/* Close element */}
              <button
                onClick={() => setSelectedPost(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition ${
                  darkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero inside reader */}
              <div className="space-y-6">
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1 rounded-full uppercase tracking-widest">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Published: <strong>{selectedPost.date}</strong></span>
                    <span>•</span>
                    <span>Read length: <strong>{selectedPost.readTime}</strong></span>
                  </div>
                </div>

                <div className="aspect-[2/1] rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Main Markdown style structured document text */}
                <div className={`text-xs sm:text-sm leading-relaxed space-y-4 font-normal ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {/* Since react-markdown requirement check says prefer react-markdown but we can also map standard structured blocks perfectly, let's map text neatly */}
                  {selectedPost.content.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('###')) {
                      return (
                        <h4 key={pIdx} className="text-base sm:text-lg font-black text-emerald-400/90 pt-3">
                          {para.replace('###', '').trim()}
                        </h4>
                      );
                    }
                    if (para.startsWith('1.') || para.startsWith('-')) {
                      return (
                        <ul key={pIdx} className="list-disc list-inside pl-4 space-y-1 font-medium bg-emerald-500/5 p-4 rounded-xl border-l-2 border-emerald-500">
                          {para.split('\n').map((li, lIdx) => (
                            <li key={lIdx}>{li.replace(/^(\d+\.|\-)\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith('**')) {
                      return (
                        <p key={pIdx} className="font-bold underline decoration-amber-500 underline-offset-4 decoration-2">
                          {para.replace(/\*\*/g, '')}
                        </p>
                      );
                    }
                    return <p key={pIdx}>{para}</p>;
                  })}
                </div>

                {/* Footer seal */}
                <div className={`pt-6 border-t font-mono text-[10px] text-gray-500 flex justify-between ${
                  darkMode ? 'border-gray-800' : 'border-gray-100'
                }`}>
                  <span>STRICTLY VERIFIED CORE SOLAR MANUAL V3</span>
                  <span>LUMINA_LEAF_PRESS</span>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

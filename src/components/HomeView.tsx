import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, Award, Sparkles, Building2, Layout, Zap, Flame, CheckCircle, Check, X, ExternalLink, BatteryCharging, Network, Target, Eye, Heart, TreePine, Box, Settings, Activity, User, Search, BarChart3, Send, Lightbulb, Factory, Warehouse, Building, School, Home, PhoneCall, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import mapVideo from '../assets/LUMINA-VEDIO/MAP-VEDIO.mp4';
import homeVideo from '../assets/LUMINA-VEDIO/home_vedio.mp4';
import rooftopImage from '../assets/images/banner_rooftop_solar_1782053662586.jpg';
import iso1 from '../assets/images/iso1.png';
import iso2 from '../assets/images/iso2.png';
import iso3 from '../assets/images/iso3.png';

interface HomeViewProps {
  setView: (view: string) => void;
  darkMode: boolean;
}

export default function HomeView({ setView, darkMode }: HomeViewProps) {
  
  // Interactive state handlers for the newly requested visual segments:
  const [blueprintLayer, setBlueprintLayer] = useState<'structural' | 'wiring' | 'SCADA'>('structural');
  const [treeCarbonCapacity, setTreeCarbonCapacity] = useState<number>(150);
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null);

  // Video audio control state
  const [isHeroMuted, setIsHeroMuted] = useState<boolean>(true);
  const [isMapMuted, setIsMapMuted] = useState<boolean>(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const mapVideoRef = useRef<HTMLVideoElement>(null);

  const toggleHeroAudio = () => {
    if (heroVideoRef.current) {
      const nextMuted = !isHeroMuted;
      heroVideoRef.current.muted = nextMuted;
      setIsHeroMuted(nextMuted);
      if (!nextMuted) {
        heroVideoRef.current.play().catch(() => {});
      }
    }
  };

  const toggleMapAudio = () => {
    if (mapVideoRef.current) {
      const nextMuted = !isMapMuted;
      mapVideoRef.current.muted = nextMuted;
      setIsMapMuted(nextMuted);
      if (!nextMuted) {
        mapVideoRef.current.play().catch(() => {});
      }
    }
  };

  // Auto-scale handler for mobile vertical snake view
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.parentElement?.clientWidth || 360;
        const newScale = Math.min(1, (width - 16) / 600);
        setScale(newScale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scale handler for desktop horizontal snake view to prevent horizontal scroll entirely
  const [desktopScale, setDesktopScale] = useState(1);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (desktopContainerRef.current) {
        const width = desktopContainerRef.current.parentElement?.clientWidth || 1200;
        const newScale = Math.min(1, (width - 16) / 1580);
        setDesktopScale(newScale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full">
      
      {/* 1. Immersive Vide/Banner Hero Section */}
      <section 
        id="hero-section" 
        className="relative w-full aspect-video lg:aspect-auto lg:h-[calc(100vh-5.0625rem)] flex items-center justify-center overflow-hidden border-b border-cyan-400/40 shadow-[0_10px_35px_rgba(6,182,212,0.35)]"
      >
        {/* Glowing layer */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        
        {/* Ambient Video background in autoplay loop */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={heroVideoRef}
            src={homeVideo}
            autoPlay
            loop
            muted={isHeroMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center filter brightness-75 contrast-105"
          />
        </div>

        {/* Video Mute / Unmute Button for Hero Video */}
        <button
          onClick={toggleHeroAudio}
          type="button"
          aria-label={isHeroMuted ? "Unmute video sound" : "Mute video sound"}
          className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/65 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 cursor-pointer group active:scale-95"
        >
          {isHeroMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wide">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wide">Mute</span>
            </>
          )}
        </button>

        {/* Neon blue ambient bottom glow & luminous accent beam */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-cyan-500/25 via-blue-500/10 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee,0_0_30px_#06b6d4,0_0_45px_#3b82f6] pointer-events-none z-10" />

      </section>

      {/* 2. Regional Presence and Footprint Intro Section */}
      <section id="introduction-section" className={`py-16 md:py-20 relative overflow-hidden ${darkMode ? 'bg-gradient-to-b from-zinc-950/60 via-zinc-900/30 to-zinc-950/60 border-b border-[#50575F]/30' : 'bg-gradient-to-b from-white via-emerald-50/20 to-white border-b border-emerald-100/40'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 md:p-12 border relative overflow-hidden transition-all ${
            darkMode 
              ? 'bg-[#15171a]/90 border-zinc-800 shadow-2xl' 
              : 'bg-white/95 border-emerald-100 shadow-xl shadow-emerald-950/5'
          }`}>
            {/* Subtle decorative glow accents */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              
              {/* Header and Tagline */}
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-3">
                  <h1 
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-extrabold ${darkMode ? 'text-white' : 'text-[#103010]'}`}
                  >
                    Solar Project Execution <br className="hidden sm:inline" />
                    With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">Engineering Precision</span>
                  </h1>

                  <p 
                    className={`text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed ${darkMode ? 'text-gray-200' : 'text-black'}`}
                  >
                    We are specialized solar professionals delivering site survey, system design, liaisoning, commissioning, and SCADA monitoring for large EPCs.
                  </p>
                  <p 
                    className={`text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed ${darkMode ? 'text-gray-200' : 'text-black'}`}
                  >
                    Luminaleaf acts as the vital execution partner for tier-1 EPC players and commercial business developers. With specialized safety compliance, rapid turnaround speeds, and absolute technical competence, we carry your solar layouts from paper blueprints into live power injection.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/80 dark:border-zinc-800/80 space-y-2">
                  <h2 
                    className={`text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight font-extrabold ${darkMode ? 'text-white' : 'text-[#103010]'}`}
                  >
                    Our Presence <span className="text-emerald-500">& Clearances</span>
                  </h2>

                  <p className={`text-base sm:text-lg md:text-xl font-semibold tracking-tight ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Engineering you can trust. Execution you can depend on.
                  </p>
                </div>
              </div>

              {/* 5 Pillars of Presence & Clearances */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-2">
                {[
                  {
                    title: 'Multi-State Presence',
                    icon: Building2,
                    color: 'emerald',
                  },
                  {
                    title: 'DISCOM & Regulatory Compliance',
                    icon: CheckCircle,
                    color: 'emerald',
                  },
                  {
                    title: 'CEIG Coordination & Approvals',
                    icon: Shield,
                    color: 'amber',
                  },
                  {
                    title: 'High-Voltage & Industrial Project Expertise',
                    icon: Zap,
                    color: 'amber',
                  },
                  {
                    title: 'Safety-Driven Installation Practices',
                    icon: Award,
                    color: 'emerald',
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const isAmber = item.color === 'amber';
                  return (
                    <div
                      key={index}
                      className={`p-5 border transition-all duration-300 flex flex-col justify-between group ${
                        darkMode
                          ? isAmber
                            ? 'bg-zinc-900/80 border-zinc-800 hover:border-amber-500/50'
                            : 'bg-zinc-900/80 border-zinc-800 hover:border-emerald-500/50'
                          : isAmber
                            ? 'bg-amber-50/50 border-amber-100 hover:border-amber-300'
                            : 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300'
                      }`}
                    >
                      <div className="space-y-3">
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-none shrink-0 ${
                            isAmber
                              ? 'bg-amber-500/10 text-amber-500'
                              : 'bg-emerald-500/10 text-emerald-500'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className={`text-sm sm:text-base font-bold leading-snug ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. "image.png" LIKE COMPONENT: Worked on Projects across India for */}
      <section 
        id="cross-industry-section"
        className={`py-12 md:py-20 border-b relative ${darkMode ? 'bg-gradient-to-b from-[#0a0d14] via-[#0f141f] to-[#0a0d14] border-zinc-800/60' : 'bg-[#e0e4e8] border-emerald-100/30'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
            <h2 
              className={`text-2xl sm:text-4xl md:text-5xl tracking-tight ${darkMode ? 'text-white' : 'text-[#103010]'}`}
              style={{ fontWeight: 'normal' }}
            >
             Powering Industries Across India
            </h2>
            <p 
              className={`text-xs sm:text-sm mt-2 md:mt-3 max-w-xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}
              style={{ fontWeight: 'normal', color: darkMode ? '#ffffff' : '#000000' }}
            >
              Trusted by organizations across diverse industries to deliver efficient and future-ready solar energy solutions.            </p>
          </div>
 
          {/* Majestic Horizontal Grid Layout styled like image.png */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {[
  {
    num: "01",
    title: "Manufacturing Units",
    desc: "Heavy industries, tooling units, and manufacturing plants with high base loads.",
    outerBg: "bg-emerald-800 dark:bg-emerald-610",
    innerBg: "bg-leaf-green",
    titleColor: "text-emerald-600 dark:text-emerald-400",
    icon: <Factory className="text-white" style={{ fontSize: '20px', height: '36.5px', width: '40.5px' }} />
  },
  {
    num: "02",
    title: "Warehouse & Logistics",
    desc: "Large scale storage houses and transport networks seeking net zero pathways.",
    outerBg: "",
    innerBg: "",
    outerStyle: { backgroundColor: '#CC3E00' },
    innerStyle: { backgroundColor: '#FF4E00' },
    titleColor: "text-orange-600 dark:text-orange-400",
    icon: <Warehouse className="text-white" style={{ width: '40.5px', height: '36.5px' }} />
  },
  {
    num: "03",
    title: "Commercial Buildings",
    desc: "Enterprise IT parks, corporate headquarters, and shopping centers optimized for clean energy.",
    outerBg: "",
    innerBg: "",
    outerStyle: { backgroundColor: '#adafb3' },
    cardStyle: undefined,
    innerStyle: { backgroundColor: '#FFFFFF' },
    cardBg: "bg-[#FFFFFF] border-[#cfd5db] shadow-gray-400/70",
    textColor: "!text-black dark:!text-black",
    descStyle: { color: '#000000' },
    titleColor: "text-teal-600 dark:text-teal-400",
    icon: <Building className="!text-black dark:!text-black" style={{ width: '40.5px', height: '36.5px', color: '#000000' }} />
  },
  {
    num: "04",
    title: "Residential & Real Estate",
    desc: "Luxury housing societies, green townships, and private estate developers transitioning to solar.",
    outerBg: "bg-purple-900 dark:bg-purple-700",
    innerBg: "bg-purple-500 dark:bg-purple-600",
    titleColor: "text-purple-600 dark:text-purple-400",
    icon: <Building2 className="text-white" style={{ width: '40.5px', height: '36.6px' }} />
  },
  {
    num: "05",
    title: "Institutions & Academics",
    desc: "Schools, administrative universities, and public facilities fostering sustainable futures.",
    outerBg: "",
    innerBg: "",
    outerStyle: { backgroundColor: '#0D44D8' },
    innerStyle: { backgroundColor: '#1559F8' },
    titleColor: "text-sky-600 dark:text-sky-400",
    icon: <School className="text-white" style={{ width: '40.5px', height: '36.5px' }} />
  }
].map((sect, i) => (
  <div
    key={sect.title}
    style={sect.cardStyle}
    className="w-full relative rounded-none p-3 pt-3 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center min-h-[235px] transition-all duration-300 transform hover:-translate-y-2 bg-[#FFFFFF] border-[#cfd5db] shadow-gray-400/70"
  >
    {/* Colored Top Plate */}
    <div
      className={`absolute top-0 left-0 right-0 w-full h-12 ${sect.outerBg || ''} opacity-90 rounded-none z-0`}
      style={sect.outerStyle}
    />

    {/* Moving h3 tag to outer card head top */}
    <h3 
      className="relative z-10 text-xs md:text-sm tracking-tight text-white uppercase font-sans text-center mb-1 drop-shadow-sm"
      style={{ fontSize: '20.75px', fontWeight: 'normal' }}
    >
      {sect.title}
    </h3>

    {/* Floating Inner Card */}
    <div
      className={`relative z-10 w-full rounded-none shadow-xl flex flex-col overflow-hidden mt-0.5 flex-1 ${
        darkMode
          ? "bg-[#222426] border-[#50575F] shadow-black/50"
          : "bg-[#f4f6f8] border-[#d5dbe2] shadow-gray-300/60"
      }`}
    >
      {/* Inner Card Header */}
      <div
        className={`flex items-center justify-center gap-3 px-3 py-2 ${sect.textColor || 'text-white'} ${sect.innerBg || ''}`}
        style={sect.innerStyle}
      >
        <div className="flex items-center justify-center scale-90">
          {sect.icon}
        </div>
      </div>

      {/* Inner Card Body */}
      <div 
        className={`p-3.5 flex-1 flex flex-col justify-between relative overflow-hidden ${sect.innerBg || ''}`}
        style={sect.innerStyle}
      >
        <div className="relative z-10 text-center flex-1 flex flex-col justify-center">
     <p 
       className={`text-[8px] md:text-[9px] font-light leading-tight ${sect.textColor || 'text-white/90'}`}
       style={{ fontSize: '16.7px', ...(sect.descStyle || {}) }}
     >
  {sect.desc}
</p>
        </div>
      </div>
    </div>
  </div>
))
            }
          </div>
        </div>
      </section>

      {/* 4. "new.jpg" INFOGRAPHIC TIMELINE COMPONENT: A process designed to reduce risk. */}
      <section id="strategic-phase-section" className="relative py-16 md:py-24 border-b border-zinc-800/40 overflow-hidden">
        {/* Background image container with reduced dark overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={rooftopImage} 
            alt="Process Background" 
            className="h-full object-cover filter brightness-[0.55] saturate-[1.0] contrast-[1.0]"
            style={{ width: '1520.8px' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
              style={{ fontWeight: 'normal' }}
            >
              A process designed to reduce risk.
            </h2>
            <p className="text-xs sm:text-sm max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
              From site survey to commissioning, our six-step process minimizes risk, ensures quality, controls costs, and delivers reliable solar performance.
            </p>
          </div>

          {/* Responsive Layout for A process designed to reduce risk */}
          
          {/* 1. MOBILE & TABLET LAYOUT: Readable vertical process steps */}
          <div className="grid gap-3 md:hidden">
            <div className="mx-auto mb-1 inline-flex items-center gap-2 rounded-full border border-[#fb2c36]/30 bg-black/40 px-4 py-2 text-sm font-bold tracking-widest text-[#ff777d]">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#fb2c36]" />
              START
            </div>
            {[
              { number: '01', title: 'Site survey & Load assessment', color: '#fb2c36', icon: <User className="h-6 w-6" /> },
              { number: '02', title: 'Engineering checks & feasibility outcomes', color: '#fe6e00', icon: <Search className="h-6 w-6" /> },
              { number: '03', title: 'Transparent commercial proposals', color: '#ffd236', icon: <BarChart3 className="h-6 w-6" /> },
              { number: '04', title: 'Procurement coordination & controlled execution', color: '#84cc16', icon: <Zap className="h-6 w-6" /> },
              { number: '05', title: 'Scheduled commissioning & handover training', color: '#10b981', icon: <Send className="h-6 w-6" /> },
              { number: '06', title: 'Preventive maintenance & performance assurance', color: '#00c758', icon: <Activity className="h-6 w-6" /> },
            ].map((step) => (
              <div
                key={step.number}
                className="flex min-h-20 items-center gap-4 border border-white/15 bg-black/70 p-4 shadow-lg backdrop-blur-sm"
                style={{ borderLeft: `4px solid ${step.color}` }}
              >
                <span className="w-12 shrink-0 font-mono text-3xl font-black leading-none text-white">
                  {step.number}
                </span>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center"
                  style={{ color: step.color, backgroundColor: `${step.color}22` }}
                >
                  {step.icon}
                </div>
                <h3 className="text-left font-sans text-base font-bold leading-snug text-white">
                  {step.title}
                </h3>
              </div>
            ))}
            <div className="mx-auto mt-1 inline-flex items-center gap-2 rounded-full border border-[#00c758]/30 bg-black/40 px-4 py-2 text-sm font-bold tracking-widest text-[#59ef9d]">
              FINISH
              <span className="h-2.5 w-2.5 rounded-sm bg-[#00c758]" />
            </div>
          </div>

          <div ref={containerRef} className="hidden w-full overflow-hidden pb-4" style={{ height: `${1560 * scale}px` }}>
            <div 
              className="relative origin-top-left select-none mx-auto"
              style={{ 
                width: '600px', 
                height: '1560px', 
                transform: `scale(${scale})`,
              }}
            >
              {/* Vertical band behind the cards to tie the steps together */}
              <div className="absolute left-[212.5px] top-[130px] w-[175px] h-[1295px] bg-slate-100/10 dark:bg-zinc-800/10 rounded-2xl border border-dashed border-white/10 pointer-events-none z-20" />

              {/* START Pin and Top vertical thin indicator line */}
              <div className="absolute left-[300px] top-[20px] -translate-x-1/2 flex flex-col items-center z-30">
                <span className="text-[11px] font-black tracking-widest text-[#fb2c36] font-mono uppercase bg-[#fb2c36]/10 px-2.5 py-0.5 rounded-full mb-1">START</span>
                <div className="w-3.5 h-3.5 bg-[#fb2c36] rounded-sm shadow-sm" />
              </div>
              <div className="absolute left-[300px] top-[54px] w-0.5 h-[76px] bg-[#fb2c36] -translate-x-1/2 opacity-70 z-20" />

              {/* Beautiful, seamless vector gradient snake pipeline path for 6 steps (Vertical) */}
              <svg className="hidden absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 1560" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pipeline-gradient-6-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb2c36" />
                    <stop offset="20%" stopColor="#fe6e00" />
                    <stop offset="40%" stopColor="#ffd236" />
                    <stop offset="60%" stopColor="#84cc16" />
                    <stop offset="80%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#00c758" />
                  </linearGradient>
                </defs>
                <path
                  d="M 300 130 L 195 130 L 195 300 L 405 300 L 405 525 L 195 525 L 195 750 L 405 750 L 405 975 L 195 975 L 195 1200 L 405 1200 L 405 1425 L 300 1425"
                  fill="none"
                  stroke="url(#pipeline-gradient-6-vertical)"
                  strokeWidth="16"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="opacity-95 drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                />
              </svg>

              {/* FINISH Pin and vertical thin indicator line (symmetric to Start Pin at the bottom) */}
              <div className="absolute left-[300px] top-[1425px] w-0.5 h-[60px] bg-[#00c758] -translate-x-1/2 opacity-70 z-20" />
              <div className="absolute left-[300px] top-[1485px] -translate-x-1/2 flex flex-col items-center z-30">
                <div className="w-3.5 h-3.5 bg-[#00c758] rounded-sm shadow-sm mb-1" />
                <span className="text-[11px] font-bold tracking-widest text-[#00c758] font-mono uppercase bg-[#00c758]/10 px-2.5 py-0.5 rounded-full  inline-block">FINISH</span>
              </div>

              {/* --- TEXT CONTENT AND CONNECTING THIN PIN LINES (Left/Right alternating) --- */}

              {/* Row 1: Step 1 (Site Discovery - Right text) */}
              <div className="absolute left-[387.5px] top-[215px] w-[57.5px] h-0.5 bg-[#fb2c36] -translate-y-1/2 opacity-60 z-20" />
              <div className="absolute left-[445px] top-[215px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#fb2c36] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[465px] top-[215px] -translate-y-1/2 w-[135px] text-left space-y-1 z-30">
                <h3 className="text-sm font-black tracking-wider text-[#fb2c36] uppercase font-mono">
                 Site survey & Load assessment
                </h3>
            
              </div>

              {/* Row 2: Step 2 (Engineering & Design - Left text) */}
              <div className="absolute left-[155px] top-[440px] w-[57.5px] h-0.5 bg-[#fe6e00] -translate-y-1/2 opacity-60 z-20" />
              <div className="absolute left-[155px] top-[440px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#fe6e00] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[5px] top-[440px] -translate-y-1/2 w-[140px] text-right space-y-1 z-30">
                <h3 className="text-sm font-black tracking-wider text-[#fe6e00] uppercase font-mono">
                 Engineering checks & feasibility outcomes
                </h3>
           
              </div>

              {/* Row 3: Step 3 (Transparent Proposal - Right text) */}
              <div className="absolute left-[387.5px] top-[665px] w-[57.5px] h-0.5 bg-[#ffd236] -translate-y-1/2 opacity-60 z-20" />
              <div className="absolute left-[445px] top-[665px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#ffd236] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[465px] top-[665px] -translate-y-1/2 w-[135px] text-left space-y-1 z-30">
                <h3 className="text-sm font-black tracking-wider text-amber-400 uppercase font-mono">
                  Transparent commercial proposals
                </h3>
              
              </div>

              {/* Row 4: Step 4 (Execution & Installation - Left text) */}
              <div className="absolute left-[155px] top-[890px] w-[57.5px] h-0.5 bg-[#84cc16] -translate-y-1/2 opacity-60 z-20" />
              <div className="absolute left-[155px] top-[890px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#84cc16] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[5px] top-[890px] -translate-y-1/2 w-[140px] text-right space-y-1 z-30">
                <h3 className="text-sm font-black tracking-wider text-[#84cc16] uppercase font-mono">
                Procurement coordination & controlled execution
                </h3>
             
              </div>

              {/* Row 5: Step 5 (Commissioning & Handover - Right text) */}
              <div className="absolute left-[387.5px] top-[1115px] w-[57.5px] h-0.5 bg-[#10b981] -translate-y-1/2 opacity-60 z-20" />
              <div className="absolute left-[445px] top-[1115px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#10b981] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[465px] top-[1115px] -translate-y-1/2 w-[135px] text-left space-y-1 z-30">
                <h3 className="text-sm font-black tracking-wider text-[#10b981] uppercase font-mono">
                 scheduled commissioning & Handover traning
                </h3>
              
              </div>

              {/* Row 6: Step 6 (Preventive maintenance & Performance Assurance - Left text) */}
              <div className="absolute left-[155px] top-[1340px] w-[57.5px] h-0.5 bg-[#00c758] -translate-y-1/2 opacity-60 z-20" />
              <div className="absolute left-[155px] top-[1340px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#00c758] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[5px] top-[1340px] -translate-y-1/2 w-[140px] text-right space-y-1 z-30">
                <h3 className="text-sm font-black tracking-wider text-[#00c758] uppercase font-mono">
                  Preventive maintenance & Performance Assurance
                </h3>
                <p className="text-xs leading-relaxed font-medium text-white" style={{ color: '#ffffff' }}>
                
                </p>
              </div>

              {/* --- WHITE STEP CARDS (CENTERED ALONG THE MIDDLE COLUMN, Z-INDEX ABOVE PIPES) --- */}

              {/* Step 1 Card */}
              <div 
                className="absolute left-[212.5px] top-[130px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[36px] font-mono font-black leading-none text-slate-700">01</span>
                <span className="text-[20px] font-mono tracking-widest font-black text-slate-600 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#fb2c36]/10 text-[#fb2c36] rounded-none shadow-inner border border-[#fb2c36]/20">
                  <User className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 2 Card */}
              <div 
                className="absolute left-[212.5px] top-[355px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[36px] font-mono font-black leading-none text-slate-700">02</span>
                <span className="text-[20px] font-mono tracking-widest font-black text-slate-600 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#fe6e00]/10 text-[#fe6e00] rounded-none shadow-inner border border-[#fe6e00]/20">
                  <Search className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 3 Card */}
              <div 
                className="absolute left-[212.5px] top-[580px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[36px] font-mono font-black leading-none text-slate-700">03</span>
                <span className="text-[20px] font-mono tracking-widest font-black text-slate-600 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#ffd236]/10 text-amber-500 rounded-none shadow-inner border border-amber-500/20">
                  <BarChart3 className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 4 Card */}
              <div 
                className="absolute left-[212.5px] top-[805px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[36px] font-mono font-black leading-none text-slate-700">04</span>
                <span className="text-[20px] font-mono tracking-widest font-black text-slate-600 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#84cc16]/10 text-[#84cc16] rounded-none shadow-inner border border-[#84cc16]/20">
                  <Zap className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 5 Card */}
              <div 
                className="absolute left-[212.5px] top-[1030px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[36px] font-mono font-black leading-none text-slate-700">05</span>
                <span className="text-[20px] font-mono tracking-widest font-black text-slate-600 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#10b981]/10 text-[#10b981] rounded-none shadow-inner border border-[#10b981]/20">
                  <Send className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 6 Card */}
              <div 
                className="absolute left-[212.5px] top-[1255px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[36px] font-mono font-black leading-none text-slate-700">06</span>
                <span className="text-[20px] font-mono tracking-widest font-black text-slate-600 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#00c758]/10 text-[#00c758] rounded-none shadow-inner border border-[#00c758]/20">
                  <Activity className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

            </div>
          </div>

          {/* 2. DESKTOP LAYOUT: Wide Horizontal 6-Step Pipeline Snake Gradient Representation (shown on screens md and up) */}
          <div ref={desktopContainerRef} className="hidden md:block w-full overflow-hidden pb-8 pt-4" style={{ height: `${580 * desktopScale}px` }}>
            <div 
              className="relative origin-top-left select-none mx-auto"
              style={{ 
                width: '1580px', 
                height: '580px', 
                transform: `scale(${desktopScale})`,
              }}
            >
              
              {/* Horizontal band behind the cards to tie the steps together */}
              <div className="absolute left-[80px] top-[180px] w-[1420px] h-[170px] bg-slate-100/10 dark:bg-zinc-800/10 rounded-2xl border border-dashed border-white/10 pointer-events-none z-20" />

              {/* --- PIPELINE CHANNELS (SNAKE PATH) with 50px thickness & continuous gradient --- */}
              
              {/* START Pin and Left vertical thin indicator line */}
              <div className="absolute left-[105px] top-[30px] -translate-x-1/2 flex flex-col items-center z-30">
                <span 
                  className="text-[11px] font-black tracking-widest text-[#fb2c36] font-mono uppercase bg-[#fb2c36]/10 px-2.5 py-0.5 rounded-full mb-1"
                  style={{ fontSize: '27px' }}
                >
                  START
                </span>
                <div className="w-3.5 h-3.5 bg-[#fb2c36] rounded-sm shadow-sm" />
              </div>
              <div className="absolute left-[105px] top-[64px] w-0.5 h-[116px] bg-[#fb2c36] -translate-x-1/2 opacity-70 z-20" />

              {/* Beautiful, seamless vector gradient snake pipeline path for 6 steps */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1580 580" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pipeline-gradient-6" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb2c36" />
                    <stop offset="20%" stopColor="#fe6e00" />
                    <stop offset="40%" stopColor="#ffd236" />
                    <stop offset="60%" stopColor="#84cc16" />
                    <stop offset="80%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#00c758" />
                  </linearGradient>
                </defs>
                <path
                  d="M 105 180 L 105 375 L 330 375 L 330 155 L 555 155 L 555 375 L 780 375 L 780 155 L 1005 155 L 1005 375 L 1230 375 L 1230 155 L 1455 155 L 1455 375"
                  fill="none"
                  stroke="url(#pipeline-gradient-6)"
                  strokeWidth="16"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="opacity-95 drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                />
              </svg>

              {/* FINISH Pin and thin indicator line (symmetric to Start Pin on the right) */}
              <div className="absolute left-[1455px] top-[375px] w-0.5 h-[60px] bg-[#00c758] -translate-x-1/2 opacity-70 z-20" />
              <div className="absolute left-[1455px] top-[435px] -translate-x-1/2 flex flex-col items-center z-30">
                <div className="w-3.5 h-3.5 bg-[#00c758] rounded-sm shadow-sm mb-1" />
                <span 
                  className="text-[11px] font-bold tracking-widest text-[#00c758] font-mono uppercase bg-[#00c758]/10 px-2.5 py-0.5 rounded-full inline-block"
                  style={{ fontSize: '21px' }}
                >
                  FINISH
                </span>
              </div>


              {/* --- TEXT CONTENT AND CONNECTING THIN PIN LINES --- */}

              {/* Column 1: Step 1 (Site Discovery - Bottom text) */}
              <div className="absolute left-[217.5px] top-[350px] w-0.5 h-[95px] bg-[#fb2c36] -translate-x-1/2 opacity-60 z-20" />
              <div className="absolute left-[217.5px] top-[445px] -translate-x-1/2 w-3.5 h-3.5 bg-[#fb2c36] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[217.5px] top-[465px] -translate-x-1/2 w-[220px] text-center space-y-1 z-30">
                <h3 
                  className="text-lg tracking-wider text-[#fb2c36] uppercase font-mono"
                  style={{ fontSize: '23.25px', fontWeight: 'normal' }}
                >
                  Site survey & Load assessment
                </h3>
                
              </div>


              {/* Column 2: Step 2 (Engineering & Design - Top text) */}
              <div className="absolute left-[442.5px] top-[85px] w-0.5 h-[95px] bg-[#fe6e00] -translate-x-1/2 opacity-60 z-20" />
              <div className="absolute left-[442.5px] top-[75px] -translate-x-1/2 w-3.5 h-3.5 bg-[#fe6e00] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[442.5px] top-[10px] -translate-x-1/2 w-[220px] text-center space-y-1 z-30">
                <h3 
                  className="text-lg tracking-wider text-[#fe6e00] uppercase font-mono"
                  style={{ fontSize: '23.25px', fontWeight: 'normal' }}
                >
                 Engineering checks & feasibility outcomes
                </h3>
               
              </div>


              {/* Column 3: Step 3 (Transparent Proposal - Bottom text) */}
              <div className="absolute left-[667.5px] top-[350px] w-0.5 h-[95px] bg-[#ffd236] -translate-x-1/2 opacity-60 z-20" />
              <div className="absolute left-[667.5px] top-[445px] -translate-x-1/2 w-3.5 h-3.5 bg-[#ffd236] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[667.5px] top-[465px] -translate-x-1/2 w-[220px] text-center space-y-1 z-30">
                <h3 
                  className="text-lg tracking-wider text-amber-400 uppercase font-mono"
                  style={{ fontSize: '23.25px', fontWeight: 'normal' }}
                >
                  Transparent commercial proposals
                </h3>
              
              </div>


              {/* Column 4: Step 4 (Execution & Installation - Top text) */}
              <div className="absolute left-[892.5px] top-[85px] w-0.5 h-[95px] bg-[#84cc16] -translate-x-1/2 opacity-60 z-20" />
              <div className="absolute left-[892.5px] top-[75px] -translate-x-1/2 w-3.5 h-3.5 bg-[#84cc16] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[892.5px] top-[10px] -translate-x-1/2 w-[220px] text-center space-y-1 z-30">
                <h3 
                  className="text-lg tracking-wider text-[#84cc16] uppercase font-mono"
                  style={{ fontSize: '23.25px', width: '224px', fontWeight: 'normal' }}
                >
                Procurement coordination & controlled execution
                </h3>
                
              </div>


              {/* Column 5: Step 5 (Commissioning & Handover - Bottom text) */}
              <div className="absolute left-[1117.5px] top-[350px] w-0.5 h-[95px] bg-[#10b981] -translate-x-1/2 opacity-60 z-20" />
              <div className="absolute left-[1117.5px] top-[445px] -translate-x-1/2 w-3.5 h-3.5 bg-[#10b981] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[1117.5px] top-[465px] -translate-x-1/2 w-[220px] text-center space-y-1 z-30">
                <h3 
                  className="text-lg tracking-wider text-[#10b981] uppercase font-mono"
                  style={{ fontSize: '23.25px', fontWeight: 'normal' }}
                >
               scheduled commissioning & Handover traning
                </h3>
                
              </div>


              {/* Column 6: Step 6 (Preventive maintenance & Performance Assurance - Top text) */}
              <div className="absolute left-[1342.5px] top-[85px] w-0.5 h-[95px] bg-[#00c758] -translate-x-1/2 opacity-60 z-20" />
              <div className="absolute left-[1342.5px] top-[75px] -translate-x-1/2 w-3.5 h-3.5 bg-[#00c758] rounded-sm shadow-sm z-30" />
              <div className="absolute left-[1342.5px] top-[10px] -translate-x-1/2 w-[220px] text-center space-y-1 z-30">
                <h3 
                  className="text-lg tracking-wider text-[#00c758] uppercase font-mono"
                  style={{ fontSize: '23.25px', fontWeight: 'normal' }}
                >
                  Preventive maintenance & Performance Assurance
                </h3>
              
              </div>


              {/* --- WHITE STEP CARDS (CENTERED ALONG THE MIDDLE ROW, Z-INDEX ABOVE PIPES) --- */}
              
              {/* Step 1 Card */}
              <div 
                className="absolute left-[130px] top-[180px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[12px] font-mono font-bold text-gray-400">01</span>
                <span className="text-[10px] font-mono tracking-widest font-black text-gray-400 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#fb2c36]/10 text-[#fb2c36] rounded-none shadow-inner border border-[#fb2c36]/20">
                  <User className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 2 Card */}
              <div 
                className="absolute left-[355px] top-[180px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[12px] font-mono font-bold text-gray-400">02</span>
                <span className="text-[10px] font-mono tracking-widest font-black text-gray-400 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#fe6e00]/10 text-[#fe6e00] rounded-none shadow-inner border border-[#fe6e00]/20">
                  <Search className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 3 Card */}
              <div 
                className="absolute left-[580px] top-[180px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[12px] font-mono font-bold text-gray-400">03</span>
                <span className="text-[10px] font-mono tracking-widest font-black text-gray-400 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#ffd236]/10 text-amber-500 rounded-none shadow-inner border border-[#ffd236]/20">
                  <BarChart3 className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 4 Card */}
              <div 
                className="absolute left-[805px] top-[180px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[12px] font-mono font-bold text-gray-400">04</span>
                <span className="text-[10px] font-mono tracking-widest font-black text-gray-400 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#84cc16]/10 text-[#84cc16] rounded-none shadow-inner border border-[#84cc16]/20">
                  <Zap className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 5 Card */}
              <div 
                className="absolute left-[1030px] top-[180px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[12px] font-mono font-bold text-gray-400">05</span>
                <span className="text-[10px] font-mono tracking-widest font-black text-gray-400 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#10b981]/10 text-[#10b981] rounded-none shadow-inner border border-[#10b981]/20">
                  <Send className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

              {/* Step 6 Card */}
              <div 
                className="absolute left-[1255px] top-[180px] w-[175px] h-[170px] rounded-none border border-gray-200/50 flex flex-col items-center justify-center p-4 bg-white shadow-2xl shadow-black/30 hover:scale-105 transition duration-300 z-30 text-slate-900"
              >
                <span className="text-[12px] font-mono font-bold text-gray-400">06</span>
                <span className="text-[10px] font-mono tracking-widest font-black text-gray-400 uppercase mb-3">STEP</span>
                <div className="p-4.5 bg-[#00c758]/10 text-[#00c758] rounded-none shadow-inner border border-[#00c758]/20">
                  <Activity className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. ISO Logos / Certifications */}
      <section id="certifications-section" className={`py-12 md:py-16 transition-colors duration-300 border-b ${darkMode ? 'bg-[#0e1117] border-zinc-800/60' : 'bg-white border-emerald-100/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-emerald-500 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-widest font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-none border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-500" />
              <span>Accreditations & Compliance</span>
            </span>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase ${darkMode ? 'text-white' : 'text-[#103010]'}`}>
              We Are Certified By
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 pt-2">
            <img 
              src={iso1} 
              alt="ISO Certification 1" 
              className="h-20 sm:h-24 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <img 
              src={iso2} 
              alt="ISO Certification 2" 
              className="h-20 sm:h-24 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <img 
              src={iso3} 
              alt="ISO Certification 3" 
              className="h-20 sm:h-24 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 6. BANNER: Why choose Luminaleaf ? */}
      <section id="why-luminaleaf-section" className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-r from-[#0a2318] via-[#0f3825] to-[#124d31] text-white border-b border-emerald-500/20 shadow-2xl">
        {/* Decorative ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Banner Left Header & Hook */}
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Why choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">Luminaleaf ?</span>
              </h2>
              
              <p 
                className="text-sm sm:text-base max-w-xl leading-relaxed"
                style={{ borderColor: '#eeebeb', color: '#e7d9d9' }}
              >
                We combine precision structural engineering, Tier-1 solar technology, and seamless State DISCOM approvals to deliver guaranteed lifetime performance and maximum financial savings.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    setView('contact');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="px-6 py-3 bg-saffron hover:bg-opacity-90 text-white font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-saffron/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Free Site Feasibility</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 flex flex-col items-center lg:items-start space-y-1.5">
                <span 
                  style={{
                    color: '#f2eeee',
                    fontSize: '27.7px',
                    fontWeight: 'bold',
                    width: '427.55px',
                    minHeight: '39.1125px',
                    display: 'inline-block'
                  }}
                >
                  We don't just install. We engineer outcomes.
                </span>
                <p 
                  className="text-xs sm:text-sm max-w-md leading-relaxed"
                  style={{
                    color: '#f5efef',
                    marginTop: '0px',
                    paddingTop: '17px',
                    fontWeight: 'normal',
                    fontStyle: 'italic'
                  }}
                >
                  Every design choice is made deliberately to optimize lifetime yield efficiency, withstand storm currents, and assure strict safety controls.
                </p>
              </div>
            </div>

            {/* Banner Right Key Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-2xl">
              
              {/* Card 1: Tier-1 Components Only */}
              <div className="p-4 sm:p-5 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-none">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Tier-1 Components Only</h3>
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#f5efef' }}
                >
                  ALMM-listed high-efficiency mono PERC & TOPCon panels with certified smart inverters.
                </p>
              </div>

              {/* Card 2: 25-Yr Performance Guarantee (Swapped with Zero Subcontracting) */}
              <div className="p-4 sm:p-5 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-none">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">25-Yr Performance Guarantee</h3>
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#f7efef' }}
                >
                  Scheduled preventive health checks, thermal hotspot inspections, and live generation monitoring.
                </p>
              </div>

              {/* Card 3: Punctureless Installation */}
              <div className="p-4 sm:p-5 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-teal-500/20 text-teal-400 rounded-none">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Punctureless Installation</h3>
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#f8f3f3' }}
                >
                  Non-penetrative mounting techniques engineered for standing seam & industrial roofs, preserving building warranties and 100% leak-proof waterproofing.
                </p>
              </div>

              {/* Card 4: Zero Subcontracting (Swapped to position 4) */}
              <div className="p-4 sm:p-5 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-none">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Zero Subcontracting</h3>
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#f8f6f6' }}
                >
                  Direct in-house civil, electrical, and structural engineers oversee every installation.
                </p>
              </div>

              {/* Card 5: 24/7 Customer Support */}
              <div className="p-4 sm:p-5 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-none">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">24/7 Customer Support</h3>
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#f6f4f4' }}
                >
                  Dedicated round-the-clock technical helpline, swift query resolution, and rapid emergency on-ground dispatch.
                </p>
              </div>

              {/* Card 6: Safety & Ethical Standards */}
              <div className="p-4 sm:p-5 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-teal-500/20 text-teal-400 rounded-none">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Safety & Ethical Standards</h3>
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: '#f8f4f4' }}
                >
                  Strict on-site safety protocols and ethical practices.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. "box.png" LIKE COMPONENT: Partner Fit Framework */}
      <section id="when-to-collaborate-section" className={`py-16 md:py-20 border-b ${darkMode ? 'bg-dark-ash border-zinc-800/60' : 'bg-light-ash border-emerald-100/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Alternating Horizontal Banners matching image.png exactly (Two Columns on PC screens, light-ash color in light mode) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "We May Not Be the Right Partner If You",
                colorOnRight: false,
                lineBg: "bg-[#fb2c36]", // Red
                titleColor: "text-[#fb2c36]",
                rightBg: "bg-gradient-to-r from-[#fb2c36] to-[#b91c1c]",
                rightText: "We May Not Be the Right Partner If You",
                circle1: "bg-red-400/30",
                circle2: "bg-[#fb2c36]/20",
                points: [
                  "❌ Choose vendors based only on the lowest price over lasting performance",
                  "❌ Compromise on installation quality and engineering standards",
                  "❌ Ignore structural safety, stability and wind load analysis",
                  "❌ Overlook non-compliant or overloaded system designs to reduce costs",
                  "❌ Want to skip inspections, testing, or quality checks",
                  "❌ Focus only on ROI while ignoring long-term reliability",
                  "❌ Accept fire risks caused by poor workmanship"
                ]
              },
              {
                title: "We're the Right Partner If You",
                colorOnRight: true,
                lineBg: "bg-emerald-500", // Green
                titleColor: "text-emerald-500",
                rightBg: "bg-gradient-to-r from-emerald-600 to-green-500",
                rightText: "We're the Right Partner If You",
                circle1: "bg-emerald-400/40",
                circle2: "bg-green-300/30",
                points: [
                  "✅ Value quality, safe, reliable solar system over shortcuts",
                  "✅ Prefer long-term performance over low upfront cost",
                  "✅ Believe in proper engineering and structural design",
                  "✅ Expect professional installation and workmanship",
                  "✅ Prioritize electrical safety and compliance",
                  "✅ Need dependable after-sales support",
                  "✅ Want maximum energy generation with minimum risk"
                ]
              },
            
            ].map((card, idx) => {
              return (
                <div 
                  key={idx}
                 className={`w-full rounded-none shadow-xl overflow-hidden flex flex-col md:flex-row h-auto min-h-[200px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${
  darkMode
    ? "bg-[#1a1c1e] border border-[#50575F]"
    : "bg-[#e9ecf0] border border-gray-200/60"
}`}
                >
                  {/* If colorOnRight is false, render the colored section first on desktop */}
                  {!card.colorOnRight && (
                    <div className={`relative w-full md:w-[40%] min-h-[140px] md:min-h-0 flex items-center justify-center p-8 overflow-hidden shrink-0 ${card.rightBg}`}>
                      {/* Overlapping circular shapes styled exactly like image.png */}
                      <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full ${card.circle1} mix-blend-screen`} />
                      <div className={`absolute -left-10 -top-10 w-40 h-40 rounded-full ${card.circle2} mix-blend-screen`} />
                      <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2" />
                      
                      <p 
                        className="relative z-10 !text-white font-black text-center tracking-widest uppercase leading-tight max-w-[280px]"
                        style={{ color: '#ffffff', fontSize: '40px' }}
                      >
                        {card.rightText}
                      </p>
                    </div>
                  )}

                  {/* Text Section (Light-ash background in light mode, dark grey in dark mode) */}
                  <div className={`flex-1 p-6 md:p-8 flex flex-col justify-between rounded-none shadow-xl ${
  darkMode
    ? "bg-[#1a1c1e] text-white "
    : "bg-[#e9ecf0] text-slate-900 "
}`}>
                    <div className="space-y-3">
                      <h3 className={`text-xl md:text-2xl font-black tracking-tight ${card.titleColor}`}>
                        {card.title}
                      </h3>

                      {card.points && (
                        <div className="pt-2 grid grid-cols-1 gap-y-2.5 sm:gap-y-3">
                          {card.points.map((point, pIdx) => {
                            const isPositive = point.startsWith("✅");
                            const cleanText = point.replace(/^[❌✅]\s*/, '');
                            return (
                              <div key={pIdx} className="flex items-start gap-2.5">
                                <span className="shrink-0 mt-0.5 flex items-center justify-center">
                                  {isPositive ? (
                                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 dark:text-emerald-400 stroke-[2.5]" />
                                  ) : (
                                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 stroke-[2.5]" />
                                  )}
                                </span>
                                <span 
                                  className={`text-sm sm:text-[15px] md:text-base leading-snug font-medium ${
                                    darkMode ? "text-gray-100" : "text-black font-semibold"
                                  }`}
                                  style={{ color: darkMode ? '#ffffff' : '#000000' }}
                                >
                                  {cleanText}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    {/* Horizontal Line Indicator */}
                    <div className="pt-4 md:pt-6">
                      <div className={`w-16 h-1 rounded-full ${card.lineBg}`} />
                    </div>
                  </div>

                  {/* If colorOnRight is true, render the colored section second on desktop */}
                  {card.colorOnRight && (
                    <div className={`relative w-full md:w-[40%] min-h-[140px] md:min-h-0 flex items-center justify-center p-8 overflow-hidden shrink-0 ${card.rightBg}`}>
                      {/* Overlapping circular shapes styled exactly like image.png */}
                      <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full ${card.circle1} mix-blend-screen`} />
                      <div className={`absolute -left-10 -top-10 w-40 h-40 rounded-full ${card.circle2} mix-blend-screen`} />
                      <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2" />
                      
                      <p 
                        className="relative z-10 !text-white font-black text-center tracking-widest uppercase leading-tight max-w-[280px]"
                        style={{ color: '#ffffff', fontSize: '40px' }}
                      >
                        {card.rightText}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Our Presence Our Reliability / Footprints Overview */}
      <section id="our-presence-section" className={`py-16 md:py-20 border-b ${darkMode ? 'bg-black/20 border-zinc-800/60' : 'bg-light-ash border-emerald-100/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              OUR FOOTPRINTS. <span className="text-emerald-500">OUR RELIABILITY.</span>
            </h2>

            <div className="space-y-4">
              <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-gray-200' : 'text-black'}`}>
                Luminaleaf is expanding its footprint across diverse critical projects and locations, delivering dependable engineering and execution support.
              </p>
              <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-black'}`}>
                Each project reflects our commitment to quality, safety, ethical practices, and long-term asset performance—building trust that continues well beyond commissioning.
              </p>
            </div>

            <div className={`p-4 rounded-xl border-l-4 border-emerald-500 ${
              darkMode ? 'bg-emerald-950/20 border-gray-800' : 'bg-emerald-50/70 border-emerald-500'
            }`}>
              <p className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                “Growing across locations. Trusted through performance.”
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Graphic representation with real footprint video */}
            <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-emerald-500/30 flex items-center justify-center group">
              <video 
                ref={mapVideoRef}
                src={mapVideo} 
                autoPlay 
                loop 
                muted={isMapMuted} 
                playsInline
                className="w-full h-full object-contain"
              />
              <button
                onClick={toggleMapAudio}
                type="button"
                aria-label={isMapMuted ? "Unmute video sound" : "Mute video sound"}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 shadow-lg text-xs font-medium transition cursor-pointer active:scale-95"
              >
                {isMapMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Mute</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 9. QUICK STATS & TRUST / CONNECT WITH US */}
      <section className={`py-14 sm:py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-[#0f1115]' : 'bg-[#f4f7f6]'}`}>
        <div id="connect-with-us-section" className={`p-8 sm:p-12 rounded-none max-w-7xl mx-auto shadow-xl ${
          darkMode ? 'bg-gradient-to-r from-emerald-950/40 to-neutral-900 border border-emerald-900/30' : 'bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Ready to execute your solar project?
              </h3>
              <p className={`text-sm mt-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Partner with LuminaLeaf for end-to-end solar engineering, liaisoning, commissioning, and SCADA monitoring.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <button
                onClick={() => {
                  setView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-saffron hover:bg-opacity-90 text-white font-bold text-base rounded-none shadow-lg shadow-saffron/20 transition duration-200"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

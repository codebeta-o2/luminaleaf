import React from 'react';
import { leadershipMembers, executives } from '../data';
import { Linkedin, Mail, Award, Shield, Users, Compass, Target, Eye } from 'lucide-react';

interface AboutViewProps {
  darkMode: boolean;
}

export default function AboutView({ darkMode }: AboutViewProps) {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Title block */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-emerald-500 dark:text-emerald-400 font-bold text-xs tracking-wider uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full">
          The Leadership Wing
        </span>
        <h1 
          className={`text-4xl sm:text-5xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}
          style={{ fontWeight: 'normal' }}
        >
          Meet the Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500" style={{ fontWeight: 'normal' }}>LuminaLeaf</span>
        </h1>
        <p 
          className="text-sm sm:text-base text-gray-400"
          style={{ fontWeight: 'normal', color: darkMode ? '#ffffff' : '#000000' }}
        >
          Driven by engineering rigour, ethical execution, and a deep commitment to creating lasting value for people and a greener future.
        </p>
      </section>

      {/* LEADERSHIP SPOTLIGHTS (MRS. JAYANTI BERA & SURAJIT BERA) */}
      <div className="space-y-12">
        {/* Mrs. Jayanti Bera Spotlight */}
        <section className={`p-6 sm:p-10 rounded-3xl border shadow-xl overflow-hidden relative transition-colors ${
          darkMode 
            ? 'bg-gradient-to-br from-[#1b1e23] via-[#16181c] to-[#0f1216] border-gray-800 text-white' 
            : 'bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 border-gray-200 text-gray-900'
        }`}>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative group w-full max-w-sm mx-auto lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-amber-500/20 shadow-2xl">
                  <img
                    src={leadershipMembers[0].imageUrl}
                    alt="Mrs. Jayanti Bera — Founder & Director"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white card-overlay-text">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500 text-black mb-1.5 shadow-md">
                      <Award className="h-3.5 w-3.5" />
                      <span>Founder & Director</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black !text-white" style={{ color: '#ffffff' }}>Mrs. Jayanti Bera</h3>
                    <p className="text-xs !text-white font-medium" style={{ color: '#ffffff' }}>Inspiration & Guiding Force</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
                  “True success is not measured by what we build for ourselves, but by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-500">opportunities we create for others</span>.”
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-black dark:text-gray-300">
                <p>
                  The Founder and Director of <strong>LuminaLeaf</strong>, <strong>Mrs. Jayanti Bera</strong> is the inspiration, strength, and guiding force behind the organisation. Her unwavering belief in honesty, compassion, perseverance, and social responsibility gave LuminaLeaf the courage to dream bigger and move forward.
                </p>
                <p>
                  Her vision goes beyond building a successful company—to create opportunities, empower people, support communities, and contribute meaningfully to society. Her values continue to shape LuminaLeaf’s culture and inspire the organisation to grow with purpose, responsibility, and integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Surajit Bera Spotlight */}
        <section className={`p-6 sm:p-10 rounded-3xl border shadow-xl overflow-hidden relative transition-colors ${
          darkMode 
            ? 'bg-gradient-to-br from-[#1b1e23] via-[#16181c] to-[#0f1216] border-gray-800 text-white' 
            : 'bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 border-gray-200 text-gray-900'
        }`}>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative group w-full max-w-sm mx-auto lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-emerald-500/20 shadow-2xl">
                  <img
                    src={leadershipMembers[1].imageUrl}
                    alt="Surajit Bera — Co Founder & Managing Director"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white card-overlay-text">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500 text-black mb-1.5 shadow-md">
                      <Award className="h-3.5 w-3.5" />
                      <span>Co-Founder & Managing Director</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black !text-white" style={{ color: '#ffffff' }}>Surajit Bera</h3>
                    <p className="text-xs !text-white font-medium" style={{ color: '#ffffff' }}>Civil Engineer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
                  “A sustainable future is not built by vision alone—it is built by the people who <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">turn that vision into reality</span>.”
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-black dark:text-gray-300">
                <p>
                  A Civil Engineer with over 11 years of experience in infrastructure development, commercial projects, and commercial & industrial solar, <strong>Surajit Bera</strong> transformed a part-time entrepreneurial vision into <strong>LuminaLeaf</strong>, driven by a strong belief in creating a trusted and purpose-led organisation.
                </p>
                <p>
                  As the heart of LuminaLeaf, he brings together engineering, execution, customer trust, and people with one purpose—to deliver reliable solar solutions that create lasting value. His vision extends beyond business: to build a company where success creates opportunities for others and contributes to a greener future.
                </p>
              </div>

              {/* Direct Connect */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-800">
                <a
                  href={leadershipMembers[1].linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>Connect on LinkedIn</span>
                </a>
                <a
                  href="mailto:connect@luminaleaf.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 text-xs font-bold border border-amber-500/20 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>connect@luminaleaf.com</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ranajit Kumar Bera Spotlight */}
        <section className={`p-6 sm:p-10 rounded-3xl border shadow-xl overflow-hidden relative transition-colors ${
          darkMode 
            ? 'bg-gradient-to-br from-[#1b1e23] via-[#16181c] to-[#0f1216] border-gray-800 text-white' 
            : 'bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 border-gray-200 text-gray-900'
        }`}>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative group w-full max-w-sm mx-auto lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-amber-500/20 shadow-2xl">
                  <img
                    src={executives[1].imageUrl}
                    alt="Ranajit Kumar Bera — Co-founder & Director (Business Development)"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white card-overlay-text">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-400 text-black mb-1.5 shadow-md">
                      <Award className="h-3.5 w-3.5" />
                      <span>Co-founder & Director (Business Development)</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black !text-white" style={{ color: '#ffffff' }}>Ranajit Kumar Bera</h3>
                    <p className="text-xs !text-white font-medium" style={{ color: '#ffffff' }}>Project Engineering & Strategic Operations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
                  “Transforming sustainable ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-500">impactful solutions and scalable energy assets</span>.”
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-black dark:text-gray-300">
                <p>
                  Co-Founder of <strong>LuminaLeaf</strong> with a background in project engineering, <strong>Ranajit Kumar Bera</strong> is passionate about building innovative and sustainable clean energy solutions, with a sharp focus on operational excellence and strategic planning.
                </p>
                <p>
                  At LuminaLeaf, he leads strategic initiatives, project execution, and business development. He works closely with cross-functional teams to drive innovation, optimize operations, and deliver scalable turnkey solutions that create lasting value.
                </p>
              </div>

              {/* Direct Connect */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-800">
                <a
                  href={executives[1].linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>Connect on LinkedIn</span>
                </a>
                <a
                  href={`mailto:${executives[1].emailContact}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 text-xs font-bold border border-amber-500/20 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>{executives[1].emailContact}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Soumen Mondal Spotlight */}
        <section className={`p-6 sm:p-10 rounded-3xl border shadow-xl overflow-hidden relative transition-colors ${
          darkMode 
            ? 'bg-gradient-to-br from-[#1b1e23] via-[#16181c] to-[#0f1216] border-gray-800 text-white' 
            : 'bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 border-gray-200 text-gray-900'
        }`}>
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
              <div className="relative group w-full max-w-sm mx-auto lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900 border border-emerald-500/20 shadow-2xl">
                  <img
                    src={executives[0].imageUrl}
                    alt="Soumen Mondal — Co-Founder & Director – Engineering"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white card-overlay-text">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500 text-black mb-1.5 shadow-md">
                      <Award className="h-3.5 w-3.5" />
                      <span>Co-Founder & Director – Engineering</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black !text-white" style={{ color: '#ffffff' }}>Soumen Mondal</h3>
                    <p className="text-xs !text-white font-medium" style={{ color: '#ffffff' }}>Structural Engineer • Engineering & Operations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
                  “Clean energy made accessible through <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">reliable engineering and seamless project execution</span>.”
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-black dark:text-gray-300">
                <p>
                  A Structural Engineer by profession, <strong>Soumen Mondal</strong> co-founded <strong>LuminaLeaf Energy</strong> with a vision to make clean energy accessible through reliable engineering and seamless project execution.
                </p>
                <p>
                  He oversees engineering, technical operations, and project delivery, ensuring every installation meets the highest standards of structural safety, wind-load durability, and long-term generation performance.
                </p>
              </div>

              {/* Direct Connect */}
              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-800">
                <a
                  href={executives[0].linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>Connect on LinkedIn</span>
                </a>
                <a
                  href={`mailto:${executives[0].emailContact}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 text-xs font-bold border border-amber-500/20 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>{executives[0].emailContact}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      
      {/* Vision & Mission Section */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-amber-500 dark:text-amber-400 font-bold text-xs tracking-wider uppercase bg-amber-500/10 px-3.5 py-1.5 rounded-full">
            Our Purpose & Compass
          </span>
          <h2 
            className={`text-3xl sm:text-4xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}
            style={{ fontWeight: 'normal' }}
          >
            Vision & Mission
          </h2>
          <p 
            className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto"
            style={{ fontWeight: 'normal', color: darkMode ? '#ffffff' : '#000000' }}
          >
            Guiding our operational excellence, civil engineering rigors, and persistent green transition partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <div className={`p-8 rounded-3xl border shadow-xl flex flex-col space-y-6 ${
            darkMode ? 'bg-gray-800/25 border-gray-700/60' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Vision</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Where we are heading</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { num: "01", text: "Become the most trusted solar EPC execution partner." },
                { num: "02", text: "Accelerate the transition to clean and sustainable energy." },
                { num: "03", text: "Create lasting value for businesses, communities, and the environment." },
                { num: "04", text: "To be recognized as an innovation-driven engineering company that transforms challenges into sustainable opportunities." }
              ].map((item) => (
                <div key={item.num} className="flex gap-4 items-start group">
                  <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md mt-0.5">
                    {item.num}
                  </span>
                  <p 
                    className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
                    style={{ fontWeight: 'normal', color: darkMode ? '#d1d5db' : '#000000' }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Card */}
          <div className={`p-8 rounded-3xl border shadow-xl flex flex-col space-y-6 ${
            darkMode ? 'bg-gray-800/25 border-gray-700/60' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Mission</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Our daily focus & commitment</p>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { num: "01", text: "Deliver high-quality Engineering, Procurement, Installation, Liaisoning, and Commissioning services." },
                { num: "02", text: "Execute solar projects safely, efficiently, and on time." },
                { num: "03", text: "Drive innovation and sustainability in every project." },
                { num: "04", text: "Support environmental sustainability and build long-term partnerships through integrity, reliability, and excellence." }
              ].map((item) => (
                <div key={item.num} className="flex gap-4 items-start group">
                  <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md mt-0.5">
                    {item.num}
                  </span>
                  <p 
                    className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}
                    style={{ fontWeight: 'normal', color: darkMode ? '#d1d5db' : '#000000' }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LuminaLeaf Creed Principles */}
      <section className={`p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        darkMode ? 'bg-gray-800/25 border border-gray-700/60' : 'bg-gray-50 border border-gray-100'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-500">
            <Compass className="h-5 w-5" />
            <span className="text-xs font-extrabold tracking-widest uppercase">The LuminaLeaf Creed</span>
          </div>
          <h2 
            className={`text-3xl leading-tight ${darkMode ? 'text-white' : 'text-gray-950'}`}
            style={{ fontWeight: 'normal', color: darkMode ? '#ffffff' : '#00050e' }}
          >
            Sustainable Mindsets <br />
            Meet Rigid Deadlines
          </h2>
          <p 
            className="text-xs sm:text-sm text-gray-400 leading-relaxed"
            style={{ fontWeight: 'normal', color: darkMode ? '#ffffff' : '#000000' }}
          >
            We don't consider solar simply a transaction or business line. It is a severe commitment to modern civil engineering, localized grid safety, and ensuring Discom protocols are respected to protect factory assets. All of our co-founders maintain active on-site coordinates during physical synchronizations.
          </p>
          <div className="space-y-3">
            {[
              "100% compliant with CEIG safety standards guidelines.",
              "Strict 'Zero rooftop leak' warranties on active metal frames.",
              "Experienced handling of regional Indian state Discom systems.",
              "Fully automated monitoring stream calibrations."
            ].map(rule => (
              <div key={rule} className="flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
            <Users className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
            <span className={`block text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>35+ Engineers</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Field Installers</span>
          </div>
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
            <Award className="h-8 w-8 text-amber-400 mx-auto mb-2" />
            <span className={`block text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>120+ Grids</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Completed Syncs</span>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1 col-span-2">
            <Shield className="h-6 w-6 text-emerald-400 mx-auto mb-1" />
            <span className={`block text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Zero Structural Failures</span>
            <span className="text-[9px] text-gray-400 uppercase tracking-widest block">Safe Civil Foundation Design</span>
          </div>
        </div>
      </section>

    </div>
  );
}

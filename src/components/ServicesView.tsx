import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Home, 
  Zap, 
  ShieldCheck, 
  LineChart, 
  Wrench, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Gauge,
  Cpu
} from 'lucide-react';
import { Solar3DShadowAnalysis } from './Solar3DShadowAnalysis';

interface ServicesViewProps {
  darkMode: boolean;
}

export default function ServicesView({ darkMode }: ServicesViewProps) {
  // Services definitions precisely ordered to match the 2-column grid flow of "image.png":
  // Col 1: Step 01, Col 2: Step 04
  // Col 1: Step 02, Col 2: Step 05
  // Col 1: Step 03, Col 2: Step 06
  const services = [
    {
      id: 'residential',
      step: '01',
      title: "Residential Solar",
      subtitle: "Custom Engineered Solutions for Modern Homes",
      description: "Our residential rooftops leverage specialized lightweight mounting structures, Tier-1 smart microinverters, and high-efficiency mono-PERC solar modules.",
      benefits: ["Up to 90% bill reduction", "Anti-leak polymer clamps", "Seamless battery transfer", "Net-metering integration"],
      icon: <Home className="h-6 w-6 text-amber-500" />,
      colorClass: "from-amber-500 to-amber-600",
      accentBg: "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/10",
      accentText: "text-amber-600 dark:text-amber-400",
      triangleColor: "border-l-amber-600"
    },
    {
      id: 'liaison',
      step: '04',
      title: "DISCOM Approvals",
      subtitle: "Zero Hassle Utility Synchronizations",
      description: "We handle the entire regulatory bureaucracy, including state DISCOM load approvals, solar net-metering schemes, and CEIG safety certifications.",
      benefits: ["End-to-end liaisoning", "CEIG document submission", "Bi-directional meter prep", "State subsidy approvals"],
      icon: <ShieldCheck className="h-6 w-6 text-purple-500" />,
      colorClass: "from-purple-500 to-purple-600",
      accentBg: "bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/10",
      accentText: "text-purple-600 dark:text-purple-400",
      triangleColor: "border-l-purple-600"
    },
    {
      id: 'commercial',
      step: '02',
      title: "Commercial & Industrial",
      subtitle: "Scalable Solar EPC for Factories and Warehouses",
      description: "Heavy-duty industrial solar plants designed to offset massive baseloads. We support concrete decks, standing seam, and trapezoidal sheets.",
      benefits: ["Accelerated tax depreciation", "Certified 180 km/h wind resilience", "SCADA real-time net-zero logs", "State CEIG compliance audits"],
      icon: <Building2 className="h-6 w-6 text-orange-500" />,
      colorClass: "from-orange-500 to-orange-600",
      accentBg: "bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/10",
      accentText: "text-orange-600 dark:text-orange-400",
      triangleColor: "border-l-orange-600"
    },
    {
      id: 'commissioning',
      step: '05',
      title: "Grid Synchrony",
      subtitle: "Safe, Code-Compliant System Integration",
      description: "Seamless grid synchronization utilizing top-tier DC DBs, AC DBs, surge protection devices (SPDs), and dual-mode earthing pits.",
      benefits: ["Grounding grid resistance testing", "Type-2 surge protection devices", "Stable synchrony checks", "On-site code compliance approvals"],
      icon: <Wrench className="h-6 w-6 text-blue-500" />,
      colorClass: "from-blue-500 to-blue-600",
      accentBg: "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10",
      accentText: "text-blue-600 dark:text-blue-400",
      triangleColor: "border-l-blue-600"
    },
    {
      id: 'feasibility',
      step: '03',
      title: "Site & Load Survey",
      subtitle: "Precision Feasibility Inspections",
      description: "Before a single clamp is ordered, our engineers run load telemetry assessments, shadow-profile modeling, and structural wind calculations.",
      benefits: ["3D seasonal shadow casting", "Structural fatigue verification", "Telemetry load curve diagnostics", "Autonomous drone site scans"],
      icon: <Cpu className="h-6 w-6 text-pink-500" />,
      colorClass: "from-pink-500 to-pink-600",
      accentBg: "bg-pink-500/5 dark:bg-pink-500/10 border-pink-500/10",
      accentText: "text-pink-600 dark:text-pink-400",
      triangleColor: "border-l-pink-600"
    },
    {
      id: 'monitoring',
      step: '06',
      title: "O&M Yield Monitoring",
      subtitle: "Continuous SCADA & Analytics Support",
      description: "Every LuminaLeaf plant comes integrated with remote cloud-enabled SCADA monitoring. Get detailed daily generation trends.",
      benefits: ["24/7 client web dashboard access", "Instant automated alert logs", "Regular thermal drone hot-spot scans", "Preventive field support audits"],
      icon: <Gauge className="h-6 w-6 text-teal-500" />,
      colorClass: "from-teal-500 to-teal-600",
      accentBg: "bg-teal-500/5 dark:bg-teal-500/10 border-teal-500/10",
      accentText: "text-teal-600 dark:text-teal-400",
      triangleColor: "border-l-teal-600"
    }
  ];

  return (
    <div className="relative min-h-screen">
      
      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-widest font-bold bg-emerald-500/10 px-3 py-1.5 rounded-none inline-flex items-center gap-1.5 border border-emerald-500/25">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span>INFOGRAPHIC EPC WORKFLOW</span>
          </span>
          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight rounded-none ${darkMode ? 'text-white' : 'text-[#103010]'}`}>
            Our Core <span className="text-emerald-500">Solar Services</span>
          </h1>
          <p className={`text-sm md:text-base leading-relaxed max-w-2xl mx-auto rounded-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore our specialized vertical engineering modules, built exactly to deliver top-tier, compliant solar rooftop systems.
          </p>
        </div>

        {/* 2-Column Grid of Infographic Cards matching image.png */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex items-stretch rounded-none p-2 pr-4 border transition-all duration-300 relative shadow-sm h-full ${
                darkMode 
                  ? 'bg-[#181a1c]/90 border-zinc-800/80 hover:border-emerald-500/30' 
                  : 'bg-white border-emerald-100 hover:border-emerald-500/20'
              }`}
            >
              
              {/* 1. Colored Title Block (With Title integrated) */}
              <div 
                className={`flex flex-col items-center justify-center text-center text-white p-4 rounded-none min-w-[135px] sm:min-w-[160px] shrink-0 relative bg-gradient-to-b ${service.colorClass} shadow-none`}
              >
                <h3 className="text-sm sm:text-base font-black tracking-tight leading-tight text-white uppercase font-mono">
                  {service.title}
                </h3>
                
                {/* Overlapping triangular pointer pointing right */}
                <div className={`absolute right-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] ${service.triangleColor} z-20`} />
              </div>

              {/* 2. Middle Content Area (creamy/tinted inner capsule) - completely sharp */}
              <div className={`flex-1 ml-4 mr-3 p-4 rounded-none transition-colors duration-300 ${service.accentBg} flex flex-col justify-center`}>
                <div className="mb-2">
                  <p className={`text-xs sm:text-sm tracking-wide font-extrabold font-mono uppercase ${service.accentText}`}>
                    {service.subtitle}
                  </p>
                </div>

                <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-200' : 'text-zinc-700'}`}>
                  {service.description}
                </p>

                {/* Bullet points scope */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-dashed border-zinc-800/10 dark:border-zinc-800/30">
                  {service.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 shrink-0 ${service.accentText}`} />
                      <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-200' : 'text-zinc-700'}`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 3D Simulation CTA on Feasibility card */}
                {service.id === 'feasibility' && (
                  <div className="mt-4 pt-3 border-t border-dashed border-zinc-800/10 dark:border-zinc-800/30">
                    <button
                      onClick={() => {
                        const el = document.getElementById('solar-3d-shadow-analysis');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-mono uppercase bg-pink-500 hover:bg-pink-600 text-white transition-all cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Launch 3D Shadow Simulation Below</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Action Icon (Far Right) - completely sharp */}
              <div className="flex items-center justify-center p-3 rounded-none bg-slate-100 dark:bg-zinc-800 border border-slate-200/50 dark:border-zinc-750 shadow-none shrink-0 self-center mr-2">
                {service.icon}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 3D Rooftop Shadow Analysis & Sun Path Simulation Mode */}
      <div className="relative z-10 my-8">
        <Solar3DShadowAnalysis darkMode={darkMode} />
      </div>

      {/* Dynamic bottom controls section with sharp corners */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Quick survey request card */}
          <div className={`p-8 rounded-none border ${
            darkMode ? 'bg-gradient-to-br from-[#121c14] to-[#141517] border-emerald-500/10' : 'bg-gradient-to-br from-emerald-50/50 to-white border-emerald-100'
          }`}>
            <h3 className={`text-lg font-bold tracking-tight mb-2 rounded-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to Request a Comprehensive Site Survey?
            </h3>
            <p className={`text-xs leading-relaxed mb-6 rounded-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Partner with LuminaLeaf for precise on-site load estimation, physical shadow-analysis, and DISCOM grid-matching schemes. Our engineers provide detailed survey reports before committing to any project build.
            </p>
            <a
              href="tel:+918240311712"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-none text-xs font-bold bg-saffron hover:bg-opacity-90 text-white shadow-none transition-all cursor-pointer"
            >
              <span>Call Our Engineering Expert</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Technical Highlights Panel */}
          <div className={`p-8 rounded-none border ${
            darkMode ? 'bg-[#181a1c] border-zinc-800' : 'bg-slate-50 border-gray-200'
          }`}>
            <h4 className={`text-[10px] font-black tracking-widest uppercase font-mono mb-4 rounded-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              LUMINALEAF EPC INTEGRATIONS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="p-2 w-fit rounded-none bg-amber-500/10 text-amber-500">
                  <Zap className="h-4 w-4" />
                </div>
                <span className={`text-[11px] font-bold block rounded-none ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dual Structure Rails</span>
                <p className="text-[10px] text-gray-400">High-tensile rails certified to withstand Zone 5 wind limits.</p>
              </div>

              <div className="space-y-1">
                <div className="p-2 w-fit rounded-none bg-pink-500/10 text-pink-500">
                  <LineChart className="h-4 w-4" />
                </div>
                <span className={`text-[11px] font-bold block rounded-none ${darkMode ? 'text-white' : 'text-gray-800'}`}>SCADA Tracking</span>
                <p className="text-[10px] text-gray-400">Direct telemetry API integrations for live cell troubleshooting.</p>
              </div>

              <div className="space-y-1">
                <div className="p-2 w-fit rounded-none bg-purple-500/10 text-purple-500">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className={`text-[11px] font-bold block rounded-none ${darkMode ? 'text-white' : 'text-gray-800'}`}>Liaisoning Scheme</span>
                <p className="text-[10px] text-gray-400">Our regional team guarantees compliant DISCOM approvals.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

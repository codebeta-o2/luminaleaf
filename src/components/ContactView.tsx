import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send,
  Zap,
  Award,
  Sparkles,
  Building2,
  PhoneCall,
  Instagram,
  Linkedin,
  MessageCircle
} from 'lucide-react';
import { submitLeadToGoogleSheets, LeadSubmission } from '../lib/googleSheets';

interface ContactViewProps {
  darkMode: boolean;
  prefillData?: Partial<LeadSubmission> | null;
}

export default function ContactView({ darkMode, prefillData }: ContactViewProps) {
  // Form State
  const [formData, setFormData] = useState<LeadSubmission>({
    name: '',
    email: '',
    phone: '',
    sector: 'Rooftop Solar EPC',
    monthlyBill: '',
    message: '',
  });

  // Prefill values if supplied from navigation state
  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        name: prefillData.name !== undefined ? prefillData.name : prev.name,
        email: prefillData.email !== undefined ? prefillData.email : prev.email,
        phone: prefillData.phone !== undefined ? prefillData.phone : prev.phone,
        sector: prefillData.sector !== undefined ? prefillData.sector : prev.sector,
        monthlyBill: prefillData.monthlyBill !== undefined ? prefillData.monthlyBill : prev.monthlyBill,
        message: prefillData.message !== undefined ? prefillData.message : prev.message,
      }));
    }
  }, [prefillData]);

  // Action states
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await submitLeadToGoogleSheets(formData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        sector: 'Rooftop Solar EPC',
        monthlyBill: '',
        message: '',
      });
    } catch (err: any) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'Unable to submit your request at this moment. Please reach us directly via phone or email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      
      {/* Visual Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-emerald-500 dark:text-emerald-400 font-bold text-xs tracking-wider uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-emerald-500" />
          Turnkey EPC Engineering Consultation
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Request a Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-500">Solar Feasibility</span> Quote
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Connect directly with our engineering team for detailed 3D shadow analysis, State DISCOM net-metering approvals, and complete project estimations.
        </p>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Office Details & EPC Commitments */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Engineering Value Proposition */}
          <div className={`p-6 sm:p-8 rounded-none border space-y-5 ${
            darkMode ? 'bg-[#1D1B22] border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-none text-emerald-500">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>What to Expect</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Within 24 business hours</p>
              </div>
            </div>

            <ul className={`space-y-3.5 text-xs leading-relaxed pt-2 ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className={darkMode ? 'text-white' : 'text-black font-bold'}>Custom Engineering Layout:</strong> 3D solar array design with structural wind-load certification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className={darkMode ? 'text-white' : 'text-black font-bold'}>DISCOM Grid Feasibility:</strong> Sanctioned load assessment and net-metering documentation roadmap.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className={darkMode ? 'text-white' : 'text-black font-bold'}>Financial ROI Model:</strong> Generation forecasts, payback timelines, and accelerated depreciation analysis.</span>
              </li>
            </ul>
          </div>

          {/* Direct Office & Contact Card */}
          <div className={`p-6 sm:p-8 rounded-none border space-y-5 ${
            darkMode ? 'bg-[#1D1B22] border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-500">Direct Office Contacts</h4>
            </div>
            
            <ul className={`space-y-4 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-black font-bold'}`}>Central Head Office</p>
                  <p className="mt-0.5">Bahargram, Panskura (R.S), East Medinipur, West Bengal - 721152</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-black font-bold'}`}>Direct Phone Call</p>
                  <a href="tel:+918240311712" className="text-emerald-500 hover:underline font-bold mt-0.5 block">
                    +91 8240311712
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0 mt-1" />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-black font-bold'}`}>WhatsApp Support</p>
                  <a 
                    href="https://wa.me/918116463845?text=Hello%20LuminaLeaf%20Solar%20Team%2C%20I%20would%20like%20to%20inquire%20about%20solar%20solutions." 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#25D366] hover:underline font-bold mt-0.5 block"
                  >
                    +91 8116463845
                  </a>
                  <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Instant chat & engineering support</p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-black font-bold'}`}>Official Correspondence</p>
                  <a href="mailto:connect@luminaleaf.com" className="text-emerald-500 hover:underline font-bold mt-0.5 block">
                    connect@luminaleaf.com
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-black font-bold'}`}>Working Hours</p>
                  <p className="mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                </div>
              </li>

              <li className={`pt-2 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Connect On Social</p>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.instagram.com/luminaleafenergy?igsh=aG5jZDBzcWl5bWJh" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-emerald-500 hover:text-white rounded text-xs font-semibold text-gray-300 transition"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/luminaleaf/posts/?feedView=all&viewAsMember=true" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-emerald-500 hover:text-white rounded text-xs font-semibold text-gray-300 transition"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Public Quote & Consultation Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className={`p-6 sm:p-8 rounded-none border space-y-6 ${
            darkMode ? 'bg-[#1D1B22] border-gray-800' : 'bg-white border-gray-200'
          }`}>
            
            <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-2 flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Project Inquiry & Site Consultation</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Fill in your details below for a dedicated engineering response.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Quick Response
              </span>
            </div>

            {/* Error notifications */}
            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold">Submission Notice</p>
                  <p className="text-[11px] leading-relaxed mt-0.5">{submitError}</p>
                </div>
              </div>
            )}

            {/* Success Notification */}
            {submitSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <p className="text-sm font-bold">Inquiry Successfully Submitted!</p>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Thank you for reaching out to LuminaLeaf. Your project details have been safely received by our engineering team. We will review your site parameters and get in touch with you shortly.
                </p>
              </motion.div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-black'}`}>Full Name *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-none border outline-none transition-all ${
                      darkMode 
                        ? 'bg-[#252329] border-gray-800 focus:border-emerald-500 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 focus:border-emerald-500 text-black placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-black'}`}>Email Address *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="name@company.com"
                    className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-none border outline-none transition-all ${
                      darkMode 
                        ? 'bg-[#252329] border-gray-800 focus:border-emerald-500 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 focus:border-emerald-500 text-black placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-black'}`}>Phone Number *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-none border outline-none transition-all ${
                      darkMode 
                        ? 'bg-[#252329] border-gray-800 focus:border-emerald-500 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 focus:border-emerald-500 text-black placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Sector Select */}
              <div className="space-y-2">
                <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-black'}`}>Sector of Interest</label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className={`w-full py-2.5 px-3 text-xs rounded-none border outline-none transition-all ${
                    darkMode 
                      ? 'bg-[#252329] border-gray-800 focus:border-emerald-500 text-white' 
                      : 'bg-white border-gray-300 focus:border-emerald-500 text-black'
                  }`}
                >
                  <option value="Rooftop Solar EPC">Rooftop Solar EPC (Residential / Commercial)</option>
                  <option value="Industrial Solar EPC">Industrial Solar EPC (HT / Captive)</option>
                  <option value="Ground-Mounted Solar">Ground-Mounted Solar Farm</option>
                  <option value="Maintenance & Operations">Solar Operations & Maintenance (O&M)</option>
                  <option value="Custom Engineering Survey">Detailed Engineering Feasibility Survey</option>
                </select>
              </div>
            </div>

            {/* Estimated monthly bill */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-black'}`}>Average Monthly Electricity Bill (INR)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none text-xs font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  name="monthlyBill"
                  value={formData.monthlyBill}
                  onChange={handleInputChange}
                  placeholder="e.g. 15000"
                  className={`w-full py-2.5 pl-8 pr-4 text-xs rounded-none border outline-none transition-all ${
                    darkMode 
                      ? 'bg-[#252329] border-gray-800 focus:border-emerald-500 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 focus:border-emerald-500 text-black placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-black'}`}>Project Requirements / Location Details *</label>
              <div className="relative">
                <span className="absolute top-3 left-3.5 text-gray-400 pointer-events-none">
                  <FileText className="h-4 w-4" />
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Provide your site location, available rooftop/land area, sanctioned load, current DISCOM electricity provider, or any specific requirements..."
                  className={`w-full py-2.5 pl-10 pr-4 text-xs rounded-none border outline-none transition-all ${
                    darkMode 
                      ? 'bg-[#252329] border-gray-800 focus:border-emerald-500 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 focus:border-emerald-500 text-black placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Disclaimer & Submit */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <span className={`text-[10px] text-center sm:text-left flex items-center gap-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Strict confidentiality assured. No spam or third-party sharing.
              </span>
              
              <button
                type="submit"
                disabled={submitting}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-8 rounded-none text-xs font-bold transition transform active:translate-y-0 ${
                  submitting
                    ? 'bg-amber-500/50 text-white cursor-wait'
                    : 'bg-saffron hover:bg-opacity-90 text-white hover:-translate-y-0.5 shadow-md shadow-saffron/10 cursor-pointer'
                }`}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                    <span>Transmitting Details...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}

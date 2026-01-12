import React, { useState } from 'react';
import { Mail, Send, MapPin, ArrowRight, ShieldCheck, Headphones, Clock, Globe, Zap, CheckCircle2, Server } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contacts = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-6xl mx-auto px-4">
        
        {/* --- 1. HERO HEADER --- */}
        <div className="text-center mb-10 md:mb-20">
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Institutional Support</h4>
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Elite <span className="text-[#f99616]">Assistance</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] leading-relaxed italic">
            Connect with our global help desk. We provide tier-1 technical support for traders in over 190 countries.
          </p>
        </div>

        {/* --- 2. SUPPORT TIERS (NEW CONTENT) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 md:mb-20">
          {[
            { t: "Retail Support", d: "General inquiries and account setup.", i: <Zap/> },
            { t: "VIP Priority", d: "Direct line for high-volume traders.", i: <CheckCircle2/> },
            { t: "Affiliate Desk", d: "Partnership and commission queries.", i: <Server/> }
          ].map((item, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-100 shadow-md"}`}>
              <div className="text-[#f99616] mb-4">{item.i}</div>
              <h5 className="text-[11px] font-black uppercase italic mb-1">{item.t}</h5>
              <p className="text-[9px] text-gray-500 font-bold uppercase leading-tight">{item.d}</p>
            </div>
          ))}
        </div>

        {/* --- 3. MAIN GRID (FORM + INFO) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-12 mb-12 md:mb-24">
          
          {/* LEFT: INFO CARDS */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`p-6 md:p-10 rounded-[2.5rem] border h-full ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-200 shadow-xl"}`}>
              <h3 className="text-xl font-black uppercase italic mb-8">Contact <span className="text-[#f99616]">Details</span></h3>
              
              <div className="space-y-6">
                {[
                  { label: "Direct Email", val: "support@maxtrading.com", icon: <Mail size={18}/> },
                  { label: "Telegram Bot", val: "@Tradee_probot", icon: <Send size={18}/> },
                  { label: "Global HQ", val: "Kingstown, St. Vincent", icon: <MapPin size={18}/> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-5">
                    <div className="p-3 rounded-2xl bg-[#f99616]/10 text-[#f99616]">{item.icon}</div>
                    <div>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold tracking-tight uppercase">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-10 p-5 rounded-2xl border border-dashed ${darkMode ? "border-gray-800 bg-black/40" : "border-gray-200 bg-gray-50"}`}>
                 <div className="flex items-center gap-3 text-green-500 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase italic">Servers: Optimal</span>
                 </div>
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Our support bot is active and processing requests instantly.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: FORM (Design preserved as requested) */}
          <div className="lg:col-span-7">
            <div className={`p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-200 shadow-xl"}`}>
              <h3 className="text-xl md:text-2xl font-black uppercase italic mb-8">Direct <span className="text-[#f99616]">Message</span></h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" onChange={handleChange} required placeholder="NAME" className={`w-full p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest outline-none transition-all ${darkMode ? "bg-black border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200"}`} />
                  <input type="email" name="email" onChange={handleChange} required placeholder="EMAIL" className={`w-full p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest outline-none transition-all ${darkMode ? "bg-black border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200"}`} />
                </div>
                <select name="subject" onChange={handleChange} className={`w-full p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest outline-none transition-all ${darkMode ? "bg-black border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200"}`}>
                  <option>General Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Withdrawal Inquiry</option>
                </select>
                <textarea rows="5" name="message" onChange={handleChange} required placeholder="YOUR MESSAGE..." className={`w-full p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest outline-none transition-all ${darkMode ? "bg-black border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200"}`}></textarea>
                <button type="submit" className="w-full bg-[#f99616] text-white py-4 md:py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#e88a14] shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                  Submit Message <ArrowRight size={18}/>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- 4. GLOBAL REACH SECTION (NEW CONTENT) --- */}
        <div className={`p-10 md:p-16 rounded-[3rem] border text-center relative overflow-hidden mb-12 ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-100 border-gray-200"}`}>
           <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-black uppercase italic mb-4">Global <span className="text-[#f99616]">Presence</span></h3>
              <p className="max-w-xl mx-auto text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.3em] mb-10 leading-loose">
                Operating under international standards, we ensure that our support nodes are distributed globally for zero-latency communication.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { val: "190+", lab: "Countries" },
                   { val: "24/7", lab: "Active Support" },
                   { val: "15m", lab: "Response Time" },
                   { val: "100%", lab: "Secure Data" }
                 ].map((stat, i) => (
                   <div key={i}>
                      <p className="text-xl md:text-3xl font-black text-[#f99616] mb-1">{stat.val}</p>
                      <p className="text-[8px] font-black uppercase text-gray-400">{stat.lab}</p>
                   </div>
                 ))}
              </div>
           </div>
           <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#f99616]/5 w-[400px] h-[400px] pointer-events-none" />
        </div>

        {/* --- 5. TRUST BADGES (FOOTER) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30 grayscale">
           {[
             { i: <ShieldCheck size={14}/>, t: "SSL ENCRYPTED" },
             { i: <Headphones size={14}/>, t: "LIVE CHAT" },
             { i: <Clock size={14}/>, t: "GEO REDUNDANT" },
             { i: <Globe size={14}/>, t: "WORLDWIDE" }
           ].map((b, i) => (
             <div key={i} className="flex items-center justify-center gap-2">
                {b.i} <span className="text-[8px] font-black tracking-tighter uppercase">{b.t}</span>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default Contacts;
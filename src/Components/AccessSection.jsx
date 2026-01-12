import React from 'react';
import { Monitor, Send, CheckCircle2, ArrowRight, Shield, Zap, Globe, Cpu } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

const AccessSection = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- MAIN LABEL: ACCESS --- */}
        <div className="mb-16 text-center md:text-left">
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.4em] text-xs mb-4">Connectivity</h4>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
            Universal <span className="text-[#f99616]">Access</span>
          </h1>
          <p className="mt-6 text-gray-500 font-bold uppercase text-xs md:text-sm max-w-2xl leading-relaxed">
            Break the boundaries of traditional trading. Our Access ecosystem provides a dual-channel gateway to the markets, ensuring you stay connected whether you're at your desk or on the move.
          </p>
        </div>

        {/* --- INNER CONTENT: WEB & TELEGRAM --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
          {/* 1. Web Platform Card */}
          <div className={`group p-10 md:p-16 rounded-[3.5rem] border transition-all duration-500 overflow-hidden relative
            ${darkMode ? "bg-[#0d0d0d] border-gray-800 hover:border-[#f99616]/40 shadow-2xl" : "bg-gray-50 border-gray-100 shadow-xl"}`}>
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-[#f99616]/10 text-[#f99616] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Monitor size={40} />
              </div>
              <h2 className="text-4xl font-black uppercase italic mb-6">Web <span className="text-[#f99616]">Platform</span></h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
                No downloads, no installations. Our institutional-grade Web Terminal is optimized for Chrome, Safari, and Edge. Experience 0.01s execution speed with advanced multi-charting capabilities and 50+ technical indicators built-in.
              </p>
              
              <ul className="space-y-4 mb-10">
                {["One-Click Trading", "Multi-Chart Layout", "Advanced Drawing Tools"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[#f99616]">
                    <Zap size={14} fill="currentColor"/> {item}
                  </li>
                ))}
              </ul>

              <button className="w-full md:w-auto bg-[#f99616] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#e88a14] transition-all">
                Launch Terminal <ArrowRight size={16}/>
              </button>
            </div>
            {/* Design Element */}
            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-[#f99616]/5 transition-colors">
              <Monitor size={250} />
            </div>
          </div>

          {/* 2. Telegram Support Card */}
          <div className={`group p-10 md:p-16 rounded-[3.5rem] border transition-all duration-500 overflow-hidden relative
            ${darkMode ? "bg-[#0d0d0d] border-gray-800 hover:border-[#f99616]/40 shadow-2xl" : "bg-gray-50 border-gray-100 shadow-xl"}`}>
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <Send size={40} />
              </div>
              <h2 className="text-4xl font-black uppercase italic mb-6">Telegram <span className="text-[#0088cc]">Support</span></h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
                Direct access to our expert elite. Resolve queries instantly via our 24/7 Telegram channel. From withdrawal assistance to live market signals, our dedicated support bot and human experts are always one message away.
              </p>

              <div className={`p-6 rounded-3xl mb-8 flex items-center gap-4 ${darkMode ? "bg-black" : "bg-white"}`}>
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-[#0d0d0d] bg-gray-700"></div>)}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">5k+ Traders Online</p>
              </div>

              <button className="w-full md:w-auto bg-[#0088cc] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#0077b5] transition-all">
                Join Community <Send size={16}/>
              </button>
            </div>
            {/* Design Element */}
            <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-[#0088cc]/5 transition-colors">
              <Send size={250} />
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECURITY INFO --- */}
        <div className={`p-10 rounded-[3rem] border flex flex-col md:flex-row items-center gap-8 ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-100 border-gray-200"}`}>
           <div className="p-4 rounded-2xl bg-[#f99616]/10 text-[#f99616]"><Shield size={32}/></div>
           <div className="flex-1 text-center md:text-left">
              <h4 className="text-sm font-black uppercase italic mb-1">Encrypted Access Points</h4>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-tight">All connections via Web or Telegram are secured with SSL & End-to-End Encryption protocols.</p>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase text-green-500">Servers Online</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AccessSection;
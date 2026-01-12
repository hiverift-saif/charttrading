import React from 'react';
import { Target, Eye, Globe, Award, ShieldCheck, Zap, Clock, Rocket, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AbouttheCompany = () => {
  const { darkMode } = useTheme();

  const stats = [
    { n: "100+", t: "Assets", d: "Crypto & Forex" },
    { n: "50K+", t: "Traders", d: "Global Users" },
    { n: "0.01s", t: "Speed", d: "Execution" },
    { n: "24/7", t: "Support", d: "Live Desk" }
  ];

  return (
    <div className={`min-h-screen pt-20 pb-12 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-6xl mx-auto px-5">
        
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-20 mt-10">
          <div className="flex-1 space-y-5 text-center lg:text-left">
            <span className="text-[#f99616] font-black uppercase tracking-[0.3em] text-[10px] bg-[#f99616]/10 px-3 py-1 rounded-full ">Corporate Profile</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mt-2 ">
              Future of <br/> <span className="text-[#f99616]">Trading</span>
            </h1>
            <p className="text-gray-500 font-bold text-xs md:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              MaxTrading is a premier financial service provider, delivering professional trading technology to retail investors globally since 2018.
            </p>
          </div>
          
          <div className={`flex-1 w-full p-8 rounded-[2rem] border flex items-center justify-center gap-6 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-xl"}`}>
             <Rocket size={60} className="text-[#f99616]" />
             <div className="h-12 w-[1px] bg-gray-800 hidden md:block"></div>
             <div>
                <p className="text-2xl font-black italic">EST. 2018</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Market Excellence</p>
             </div>
          </div>
        </div>

        {/* --- COMPACT STATS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <div key={i} className={`p-6 rounded-2xl border text-center transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100 shadow-md"}`}>
               <p className="text-2xl font-black text-[#f99616] mb-1">{s.n}</p>
               <p className="text-[10px] font-black uppercase tracking-tighter">{s.t}</p>
               <p className="text-[8px] text-gray-500 font-bold uppercase">{s.d}</p>
            </div>
          ))}
        </div>

        {/* --- MISSION & VISION (Side-by-Side Responsive) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
           {[
             { t: "Our Mission", d: "To provide transparent liquidity and professional execution for every trader, regardless of their account size.", i: <Target className="text-[#f99616]"/> },
             { t: "Our Vision", d: "Building a borderless financial ecosystem with AI-integrated analytics and global accessibility.", i: <Eye className="text-[#f99616]"/> }
           ].map((item, i) => (
             <div key={i} className={`p-8 rounded-[2rem] border ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                <div className="mb-4">{item.i}</div>
                <h3 className="text-xl font-black uppercase italic mb-3">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium italic">{item.d}</p>
             </div>
           ))}
        </div>

        {/* --- CORE VALUES (Compact Cards) --- */}
        <div className="space-y-4 mb-20">
           <h2 className="text-2xl font-black uppercase italic text-center mb-8">The <span className="text-[#f99616]">Pillars</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: "Security", d: "SSL Encrypted & Segregated Funds.", i: <ShieldCheck size={20}/> },
                { t: "Reliability", d: "99.9% Server Uptime Cluster.", i: <Clock size={20}/> },
                { t: "Innovation", d: "Advanced HTML5 Web Engine.", i: <Zap size={20}/> }
              ].map((val, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-5 rounded-xl border ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                   <div className="text-[#f99616]">{val.i}</div>
                   <div>
                      <h5 className="text-[11px] font-black uppercase">{val.t}</h5>
                      <p className="text-[9px] text-gray-500 font-bold uppercase leading-tight">{val.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className={`p-8 md:p-12 rounded-[2.5rem] border text-center relative overflow-hidden ${darkMode ? "bg-gradient-to-r from-[#0d0d0d] to-black border-gray-800 shadow-2xl" : "bg-orange-50 border-orange-100 shadow-lg"}`}>
           <h3 className="text-2xl font-black uppercase italic mb-6 relative z-10">Start Your Journey <br/> <span className="text-[#f99616]">With MaxTrading</span></h3>
           <button className="relative z-10 bg-[#f99616] text-white px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2 mx-auto">
              Join Now <ChevronRight size={14}/>
           </button>
           <Globe className="absolute -right-10 -bottom-10 text-[#f99616]/5 w-48 h-48 rotate-12" />
        </div>

      </div>
    </div>
  );
};

export default AbouttheCompany;
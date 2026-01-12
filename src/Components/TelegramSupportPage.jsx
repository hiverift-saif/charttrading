import React from 'react';
import { Send, Headphones, Zap, Bell, ArrowRight, ShieldCheck, Info, MessageCircle, Bot } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TelegramSupportPage = () => {
  const { darkMode } = useTheme();
  const botUsername = "Tradee_probot";

  const handleLinkBot = () => {
    window.open(`https://t.me/${botUsername}`, "_blank");
  };

  const commands = [
    { cmd: "/start", desc: "Initialize your connection with the bot." },
    { cmd: "/help", desc: "Get a full list of available service commands." },
    { cmd: "/todaystats", desc: "View your real-time today stats summary." },
    { cmd: "/yesterdaystats", desc: "Get your previous day trading summary." },
    { cmd: "ID [Your_ID]", desc: "Retrieve specific user account details instantly." }
  ];

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f99616]/10 text-[#f99616] rounded-2xl flex items-center justify-center mb-6 border border-[#f99616]/20">
            <Bot size={32} className="md:size-10" />
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
            Official <span className="text-[#f99616]">Telegram</span>
          </h1>
          <p className="max-w-xl text-gray-500 font-bold text-[10px] md:text-sm tracking-widest uppercase italic">
            Direct Access to <span className="text-[#f99616]">@{botUsername}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* 🚀 BOT COMMANDS SECTION (RESPONSIVE FIX) */}
          <div className={`p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200 shadow-xl"}`}>
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-[#f99616]/10 text-[#f99616]"><Zap size={20} fill="currentColor"/></div>
                <h3 className="text-xl md:text-2xl font-black uppercase italic">Bot <span className="text-[#f99616]">Commands</span></h3>
             </div>
             
             <div className="space-y-3 mb-10">
                {commands.map((item, idx) => (
                  <div key={idx} className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl md:rounded-2xl border gap-2 md:gap-4 transition-all ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-sm"}`}>
                     <span className="text-[#f99616] font-black text-[11px] md:text-xs uppercase tracking-widest">
                       {item.cmd}
                     </span>
                     <span className={`font-bold text-[9px] md:text-[10px] uppercase tracking-tighter ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                       {item.desc}
                     </span>
                  </div>
                ))}
             </div>

             <button 
               onClick={handleLinkBot}
               className="w-full bg-[#f99616] text-white py-2 md:px-6 px-1 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#e88a14] shadow-xl shadow-orange-500/20 active:scale-95"
             >
                Link Account <Send size={16}/>
             </button>
          </div>

          {/* SUPPORT CARDS */}
          <div className="space-y-6">
             <div className={`p-8 rounded-[2rem] border flex items-center gap-6 group transition-all ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100 shadow-lg"}`}>
                <div className="text-[#f99616] shrink-0"><Headphones size={32}/></div>
                <div>
                   <h3 className="text-sm md:text-base font-black uppercase italic mb-1">24/7 Support</h3>
                   <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Connect with expert managers.</p>
                </div>
             </div>

             <div className={`p-8 rounded-[2rem] border flex items-center gap-6 group transition-all ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100 shadow-lg"}`}>
                <div className="text-[#f99616] shrink-0"><Bell size={32}/></div>
                <div>
                   <h3 className="text-sm md:text-base font-black uppercase italic mb-1">Signal Alerts</h3>
                   <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">85% accuracy trade signals.</p>
                </div>
             </div>
             
             {/* Security Box */}
             <div className={`p-8 rounded-[2rem] border border-dashed ${darkMode ? "border-gray-800 bg-white/5" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex items-center gap-4 text-green-500">
                   <ShieldCheck size={20}/>
                   <span className="text-[10px] font-black uppercase tracking-widest italic">SSL 256-bit Encrypted</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramSupportPage;
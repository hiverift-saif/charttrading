import React from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

const BonusContent = () => {
  const { darkMode } = useTheme(); // 🚀 Theme state access

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6 px-4 transition-colors duration-500">
      
      {/* PROMO CARD */}
      <div className={`p-6 md:p-10 rounded-2xl md:rounded-[32px] border text-center shadow-2xl relative overflow-hidden transition-all
        ${darkMode 
          ? "bg-[#0a0a0a] border-gray-800" 
          : "bg-white border-gray-200 shadow-xl"}`}>
        
        {/* Decorative Brand Glow */}
        <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] transition-opacity
          ${darkMode ? "bg-[#f99616]/10" : "bg-[#f99616]/5"}`}></div>
        
        {/* Icon with Brand Accent */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto border transition-colors
            ${darkMode 
              ? "bg-[#f99616]/10 border-[#f99616]/20" 
              : "bg-orange-50 border-orange-100"}`}>
            <Gift size={32} className="text-[#f99616] drop-shadow-[0_0_10px_rgba(249,150,22,0.5)]" />
          </div>
          <Sparkles className="absolute top-0 right-[35%] text-orange-400 animate-pulse" size={16} />
        </div>

        <h3 className={`font-black text-xl md:text-2xl uppercase tracking-tighter italic mb-2 transition-colors
          ${darkMode ? "text-white" : "text-slate-900"}`}>
          Redeem <span className="text-[#f99616]">Promo Code</span>
        </h3>
        <p className={`text-[10px] font-bold uppercase tracking-[2px] mb-8 transition-colors
          ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          Get extra bonus on your next deposit
        </p>

        {/* Input Field */}
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="ENTER PROMO CODE" 
            className={`w-full border rounded-xl md:rounded-2xl p-3.5 md:p-4 text-center font-black outline-none transition-all tracking-widest text-sm md:text-base uppercase
              ${darkMode 
                ? "bg-black border-gray-800 text-white placeholder:text-gray-700 focus:border-[#f99616]" 
                : "bg-gray-50 border-gray-200 text-black placeholder:text-gray-300 focus:border-[#f99616]"}`} 
          />
          
          <button className="w-full bg-[#f99616] hover:bg-[#e88914] py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-white uppercase tracking-widest text-[11px] md:text-xs shadow-lg shadow-orange-600/20 active:scale-[0.98] transition-all">
            Check Validity
          </button>
        </div>

        {/* Footer Note */}
        <p className={`mt-6 text-[9px] font-bold uppercase leading-relaxed px-4 transition-colors
          ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
          Bonuses are subject to <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} underline cursor-pointer`}>trading turnover requirements</span>. 
          Only one code can be active at a time.
        </p>
      </div>

      {/* QUICK INFO */}
      <div className={`border rounded-xl p-4 flex items-center justify-between transition-colors
        ${darkMode ? "bg-[#0d0d0d] border-gray-900" : "bg-gray-50 border-gray-100"}`}>
        <span className={darkMode ? "text-gray-500 text-[9px] font-black uppercase tracking-widest" : "text-gray-400 text-[9px] font-black uppercase tracking-widest"}>
          Active Bonus:
        </span>
        <span className="text-[#f99616] text-[10px] font-black uppercase">None</span>
      </div>
    </div>
  );
};

export default BonusContent;
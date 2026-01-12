import React from 'react';
import { Users, UserCheck, Play, ArrowRight, BarChart3, LineChart, Target, Repeat ,UserPlus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CopyTradingPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* HERO */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-none">Social <span className="text-[#f99616]">Trading</span> Evolution.</h1>
          <p className="text-gray-500 font-bold uppercase text-xs md:text-sm tracking-widest mb-10">Follow the masters. Copy their success. Grow your wealth.</p>
        </div>

        {/* STEP BY STEP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { step: "01", t: "Find a Master", d: "Browse through hundreds of pro traders and check their win-rate history.", icon: <UserPlus/> },
            { step: "02", t: "Set Investment", d: "Choose how much you want to allocate to their specific strategies.", icon: <Target/> },
            { step: "03", t: "Auto Copy", d: "Our system mirrors their trades in real-time. Sit back and watch.", icon: <Repeat/> }
          ].map((s, i) => (
            <div key={i} className="relative p-10 rounded-[3rem] border border-[#f99616]/20 bg-[#f99616]/5 overflow-hidden">
              <span className="absolute -top-4 -left-4 text-8xl font-black text-[#f99616]/5">{s.step}</span>
              <div className="text-[#f99616] mb-6">{s.icon}</div>
              <h3 className="text-xl font-black uppercase italic mb-2">{s.t}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-bold">{s.d}</p>
            </div>
          ))}
        </div>

        {/* PRO TRADER LEADERBOARD MOCKUP */}
        <div className={`p-8 md:p-12 rounded-[3rem] border ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100 shadow-2xl"}`}>
          <h2 className="text-2xl font-black uppercase italic mb-8">Top <span className="text-[#f99616]">Master Traders</span></h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`flex items-center justify-between p-6 rounded-2xl border ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-100"}`}>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#f99616]"></div>
                   <div>
                      <p className="text-xs font-black uppercase">Trader_ID_{i}42</p>
                      <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Stable Profitability</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-lg font-black text-[#f99616]">+284%</p>
                   <p className="text-[8px] text-gray-500 font-bold uppercase">ROI (All Time)</p>
                </div>
                <button className="hidden md:block bg-[#f99616] text-white px-6 py-2 rounded-lg font-black text-[10px] uppercase">Copy</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CopyTradingPage;
import React from 'react';
import { Zap, Clock, ShieldCheck, CreditCard, Wallet, Smartphone, History, Landmark , Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FastPaymentsPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* HERO */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="w-16 h-16 bg-[#f99616]/10 rounded-2xl flex items-center justify-center text-[#f99616] mb-6 animate-bounce">
            <Zap size={32} fill="currentColor"/>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">Lightning <span className="text-[#f99616]">Payouts</span></h1>
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest italic">Industry leading withdrawal speed</p>
        </div>

        {/* PAYMENT STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { label: "Withdrawal Speed", val: "15 Min", desc: "Average processing time", icon: <Clock/> },
            { label: "Monthly Volume", val: "$10M+", desc: "Transactions processed", icon: <History/> },
            { label: "Security Level", val: "Tier 1", desc: "Military grade encryption", icon: <Lock/> }
          ].map((stat, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] border text-center ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-xl"}`}>
              <div className="text-[#f99616] flex justify-center mb-4">{stat.icon}</div>
              <p className="text-3xl font-black italic mb-1">{stat.val}</p>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">{stat.label}</p>
              <p className="text-[9px] font-bold text-gray-400">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* METHODS SECTION */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black uppercase italic text-center mb-10">Supported <span className="text-[#f99616]">Methods</span></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "UPI Transfer", icon: <Smartphone/> },
              { name: "Bank Wire", icon: <Landmark/> },
              { name: "Crypto (USDT)", icon: <Wallet/> },
              { name: "Credit Cards", icon: <CreditCard/> }
            ].map((m, i) => (
              <div key={i} className={`p-6 rounded-2xl border flex flex-col items-center gap-4 ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                <div className="text-[#f99616]">{m.icon}</div>
                <span className="text-[10px] font-black uppercase">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FastPaymentsPage;
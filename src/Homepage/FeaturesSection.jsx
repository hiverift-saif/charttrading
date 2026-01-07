import React from "react";
import {
  Users,
  Globe,
  Layers,
  BanknoteArrowDown,
  Coins,
  Wallet,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Context Import

const FeaturesSection = () => {
  const { darkMode } = useTheme(); // Hook use kiya

  return (
    <section className={`w-full py-12 px-4 relative overflow-hidden transition-colors duration-500
      ${darkMode ? "bg-black" : "bg-white"}`}>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="py-5">
            <span className="text-[#ff8516] font-semibold tracking-wider text-sm md:text-6xl uppercase">
              Why Choose Us 
            </span>
          </div>

          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mt-3 mb-4 font-nunito-custom transition-colors
              ${darkMode ? "text-[#eceae9]" : "text-black"}`}>
              Trading conditions <br />
              <span className="text-gray-500 font-nunito-custom">you can't refuse.</span>
            </h2>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6">

          {/* 1. Active Users - Full Width */}
          <div className={`col-span-2 md:col-span-4 border rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden group hover:border-[#ff8516]/50 transition-all flex items-center gap-4 md:gap-6
            ${darkMode ? "bg-[#1b1817] border-[#2e2724]" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="bg-[#ff8516]/10 p-3 md:p-4 rounded-2xl shrink-0">
              <Users className="text-[#ff8516] w-8 h-8 md:w-16 md:h-16" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-[#ff8516]" />
                <h3 className={`text-[10px] md:text-xl font-medium uppercase tracking-wider ${darkMode ? "text-[#a1a1aa]" : "text-gray-500"}`}>
                  Global Trust
                </h3>
              </div>
              <span className={`text-3xl md:text-7xl font-bold group-hover:text-[#ff8516] transition-colors leading-none
                ${darkMode ? "text-white" : "text-black"}`}>
                30 lakh+
              </span>
              <p className={`mt-2 text-xs md:text-lg hidden xs:block ${darkMode ? "text-[#a1a1aa]" : "text-gray-500"}`}>
                Active users worldwide trading daily.
              </p>
            </div>
          </div>

          {/* 2. Countries */}
          <div className={`col-span-1 md:col-span-2 border rounded-2xl p-4 md:p-8 flex items-center gap-3 md:gap-5 group hover:border-[#ff8516]/50 transition-all
            ${darkMode ? "bg-[#1b1817] border-[#2e2724]" : "bg-white border-gray-100 shadow-sm"}`}>
            <Globe className="text-blue-500 shrink-0 w-8 h-8 md:w-20 md:h-20" />
            <div>
              <h3 className={`text-xl md:text-4xl font-bold leading-none ${darkMode ? "text-white" : "text-black"}`}>130</h3>
              <p className={`text-[10px] md:text-base uppercase mt-1 ${darkMode ? "text-[#a1a1aa]" : "text-gray-500"}`}>Countries</p>
            </div>
          </div>

          {/* 3. Monthly Payouts */}
          <div className={`col-span-1 md:col-span-3 border rounded-2xl p-4 md:p-8 flex items-center gap-3 md:gap-5 group hover:border-[#ff8516]/50 transition-all
            ${darkMode ? "bg-[#1b1817] border-[#2e2724]" : "bg-white border-gray-100 shadow-sm"}`}>
            <BanknoteArrowDown className="text-green-500 shrink-0 w-8 h-8 md:w-20 md:h-20" />
            <div>
              <h3 className={`text-xl md:text-4xl font-bold leading-none ${darkMode ? "text-white" : "text-black"}`}>₹170 Cr</h3>
              <p className={`text-[10px] md:text-base uppercase mt-1 ${darkMode ? "text-[#a1a1aa]" : "text-gray-500"}`}>Payouts</p>
            </div>
          </div>

          {/* 4. Assets */}
          <div className={`col-span-1 md:col-span-3 border rounded-2xl p-4 md:p-8 flex items-center gap-3 md:gap-5 group hover:border-[#ff8516]/50 transition-all
            ${darkMode ? "bg-[#1b1817] border-[#2e2724]" : "bg-white border-gray-100 shadow-sm"}`}>
            <Layers className="text-purple-500 shrink-0 w-8 h-8 md:w-20 md:h-20" />
            <div>
              <h3 className={`text-xl md:text-4xl font-bold leading-none ${darkMode ? "text-white" : "text-black"}`}>140+</h3>
              <p className={`text-[10px] md:text-base uppercase mt-1 ${darkMode ? "text-[#a1a1aa]" : "text-gray-500"}`}>Assets</p>
            </div>
          </div>

          {/* 5. Min Trade */}
          <div className={`col-span-1 md:col-span-3 border rounded-2xl p-4 md:p-8 flex items-center gap-3 md:gap-5 group hover:border-[#ff8516]/50 transition-all
            ${darkMode ? "bg-[#1b1817] border-[#2e2724]" : "bg-white border-gray-100 shadow-sm"}`}>
            <Coins className="text-yellow-500 shrink-0 w-8 h-8 md:w-20 md:h-20" />
            <div>
              <h3 className={`text-xl md:text-4xl font-bold leading-none ${darkMode ? "text-white" : "text-black"}`}>₹80</h3>
              <p className={`text-[10px] md:text-base uppercase mt-1 ${darkMode ? "text-[#a1a1aa]" : "text-gray-500"}`}>Min. Trade</p>
            </div>
          </div>

          {/* 6. Min Deposit */}
          <div className={`col-span-2 md:col-span-3 border rounded-2xl p-6 md:p-8 flex items-center justify-between group hover:border-[#ff8516]/50 transition-all
            ${darkMode ? "bg-[#1b1817] border-[#2e2724]" : "bg-white border-gray-100 shadow-sm"}`}>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="bg-[#ff8516]/10 p-3 md:p-4 rounded-xl shrink-0">
                <Wallet className="text-[#ff8516] w-8 h-8 md:w-20 md:h-20" />
              </div>
              <div>
                <h3 className={`text-2xl md:text-5xl font-bold leading-none ${darkMode ? "text-white" : "text-black"}`}>₹500</h3>
                <p className="text-xs md:text-lg text-gray-500 uppercase mt-1">Min. Deposit</p>
              </div>
            </div>
            <ArrowRight className="text-gray-700 group-hover:text-[#ff8516] transition-colors" size={24} />
          </div>

        </div>

        {/* Join Us Button */}
        <div className="mt-12 flex justify-center w-full">
          <button className="w-full md:w-fit md:px-16 bg-[#ff8516] hover:bg-[#ff9d42] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-lg transition-all active:scale-95 shadow-lg shadow-orange-500/20">
            Join Us Now <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
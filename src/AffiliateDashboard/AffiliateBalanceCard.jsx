import React from 'react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateBalanceCard({ metrics }) {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check

  return (
    <div
      className={`
        text-card-foreground flex flex-col gap-6 rounded-xl border transition-colors duration-500
        scale-[0.90]         /* ✅ mobile */
        sm:scale-[0.95]      /* ✅ small devices */
        md:scale-[1]         /* ✅ tablets & desktop normal */
        origin-top           /* ✅ scale clean from top */
        ${darkMode 
          ? "bg-black border-gray-800 shadow-none" 
          : "bg-white border-gray-200 shadow-sm"}
      `}
    >
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
        <h4 className={`leading-none text-base sm:text-lg transition-colors ${darkMode ? "text-white" : "text-slate-900 font-bold"}`}>
          Your Balance
        </h4>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric) => (
            <div 
              key={metric.label} 
              className={`text-center p-3 sm:p-4 rounded-lg transition-colors
                ${darkMode ? "bg-gray-800/20" : "bg-gray-50 border border-gray-100"}`}
            >
              <p className={`text-xs sm:text-sm mb-1 sm:mb-2 transition-colors ${darkMode ? "text-gray-400" : "text-gray-500 font-medium"}`}>
                {metric.label}
              </p>
              <p className={`text-lg sm:text-2xl transition-colors ${darkMode ? "text-white font-semibold" : "text-[#f99616] font-black"}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AffiliateBalanceCard;
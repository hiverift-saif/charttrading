import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateCommissionsCard({ amount }) {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check

  return (
    <div className={`
      text-card-foreground flex flex-col gap-6 rounded-xl border transition-colors duration-500
      ${darkMode 
        ? "bg-black border-blue-500/20 shadow-none" 
        : "bg-white border-blue-100 shadow-sm"}
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`mb-2 transition-colors ${darkMode ? "text-gray-400" : "text-gray-500 font-medium"}`}>
              Total Commissions Earned
            </p>
            <p className={`text-xl md:text-4xl transition-colors font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>
              {amount}
            </p>
          </div>
          
          {/* Icon container with background tweak for light mode */}
          <div className={`p-3 rounded-full transition-colors ${darkMode ? "bg-transparent" : "bg-green-50"}`}>
            <TrendingUp 
              className="w-10 h-10 md:w-16 md:h-16 text-green-500" 
              aria-hidden="true" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffiliateCommissionsCard;
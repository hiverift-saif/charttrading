import React from "react";
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateMetricsCard({ title, value, icon: Icon, iconColor }) {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check

  return (
    <div className={`
      p-4 sm:p-6 rounded-xl border transition-colors duration-500 flex items-center justify-between shadow-md
      ${darkMode 
        ? "bg-black border-gray-800 shadow-none" 
        : "bg-white border-gray-200 shadow-sm"}
    `}>
      <div>
        <p className={`text-xs sm:text-sm transition-colors ${darkMode ? "text-gray-400" : "text-gray-500 font-medium"}`}>
          {title}
        </p>
        <h2 className={`text-lg sm:text-2xl font-bold mt-1 transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}>
          {value}
        </h2>
      </div>

      <div
        className={`p-2 sm:p-3 rounded-lg transition-colors ${darkMode ? "bg-gray-800" : "bg-gray-100"} ${iconColor}`}
      >
        <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}

export default AffiliateMetricsCard;
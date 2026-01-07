import React from 'react';
import { Users } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

export default function AffiliateLevelsTable() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check

  const levels = [
    { name: 'Level 1', revenue: '35.00%', turnover: '2.00%', deposits: '0', ftd: '0-2' },
    { name: 'Level 2', revenue: '50.00%', turnover: '2.00%', deposits: '0', ftd: '2-19' },
    { name: 'Level 3', revenue: '60.00%', turnover: '2.00%', deposits: '0', ftd: '19-30' },
    { name: 'Level 4', revenue: '70.00%', turnover: '2.00%', deposits: '0', ftd: '30-50' },
    { name: 'Level 5', revenue: '80.00%', turnover: '2.00%', deposits: '0', ftd: '50-999' },
  ];

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className={`backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border transition-all duration-500
        ${darkMode 
          ? "bg-gray-800/95 border-gray-700 shadow-black/20" 
          : "bg-white border-gray-200 shadow-slate-200"}`}>

        {/* Header (Optional but good for clarity) */}
        <div className={`grid grid-cols-5 gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest border-b transition-colors
          ${darkMode ? "bg-black/40 border-gray-700 text-gray-500" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
          <div>Level</div>
          <div>Revenue</div>
          <div>Turnover</div>
          <div>Deposits</div>
          <div>FTD</div>
        </div>

        {/* Rows */}
        {levels.map((level, index) => (
          <div
            key={index}
            className={`grid grid-cols-5 gap-3 px-4 py-3 text-xs border-b transition-colors
              ${darkMode ? "border-gray-700/50" : "border-gray-100"}
              ${index === 0 
                ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50') 
                : (darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50')
              }`}
          >
            <div className={`font-medium transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}>
              {level.name}
            </div>
            <div className={`font-semibold transition-colors ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
              {level.revenue}
            </div>
            <div className={`transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {level.turnover}
            </div>
            <div className={`transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {level.deposits}
            </div>
            <div className={`transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {level.ftd}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className={`px-4 py-3 border-t transition-colors
          ${darkMode 
            ? "bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-gray-700" 
            : "bg-gray-50 border-gray-200"}`}>
          <p className={`text-xs transition-colors ${darkMode ? "text-gray-300" : "text-gray-600 font-medium"}`}>
            <span className="text-blue-500 font-bold">Level 6:</span> contact your personal manager
          </p>
        </div>
      </div>
    </div>
  );
}
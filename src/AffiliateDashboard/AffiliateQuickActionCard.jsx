import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateQuickActionCard({ icon: Icon, label, link, color }) {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check

  // Dynamic Styles based on Color and Theme Mode
  const colorStyles = {
    blue: darkMode 
      ? 'from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40 text-blue-400 shadow-none' 
      : 'from-blue-50 to-blue-100/50 border-blue-200 hover:border-blue-400 text-blue-600 shadow-sm',
    green: darkMode 
      ? 'from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 text-green-400 shadow-none' 
      : 'from-green-50 to-green-100/50 border-green-200 hover:border-green-400 text-green-600 shadow-sm',
    purple: darkMode 
      ? 'from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/40 text-purple-400 shadow-none' 
      : 'from-purple-50 to-purple-100/50 border-purple-200 hover:border-purple-400 text-purple-600 shadow-sm',
    orange: darkMode 
      ? 'from-orange-500/10 to-orange-500/5 border-orange-500/20 hover:border-orange-500/40 text-orange-400 shadow-none' 
      : 'from-orange-50 to-orange-100/50 border-orange-200 hover:border-orange-400 text-orange-600 shadow-sm',
  };

  const activeStyle = colorStyles[color] || colorStyles.blue;

  return (
    <NavLink
      to={link}
      className={`flex flex-col gap-6 rounded-xl border bg-gradient-to-br ${activeStyle} transition-all duration-500 cursor-pointer group`}
    >
      <div className="p-6 text-center">
        <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" aria-hidden="true" />
        <p className={`font-bold transition-colors ${darkMode ? "text-white" : "text-slate-800"}`}>
          {label}
        </p>
      </div>
    </NavLink>
  );
}

export default AffiliateQuickActionCard;
import React from 'react';
import TradePanel from '../chart/TradePanel';
import IconStrip from '../chart/IconStrip';
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

const SidebarRight = () => {
  const { darkMode } = useTheme(); // 🚀 Theme state access

  return (
    <aside 
      className={`hidden lg:flex w-95 border-l flex-row h-full relative select-none transition-colors duration-500
        ${darkMode 
          ? "bg-[#161413] border-gray-800 text-gray-300" 
          : "bg-white border-gray-200 text-slate-800 shadow-xl"}`}
    >
      <TradePanel />
      <IconStrip />
    </aside>
  );
};

export default SidebarRight;
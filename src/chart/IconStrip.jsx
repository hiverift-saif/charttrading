// src/chart/IconStrip.jsx

import React from 'react';
import { History, Users, Keyboard, Trophy, Send } from 'lucide-react';

const IconStrip = ({ isMobile = false }) => {
  const icons = [
    { icon: History, label: "Trades" },
    { icon: Users, label: "Social" },
    { icon: History, label: "Pending" },
    { icon: Keyboard, label: "Hotkeys" },
    { icon: Trophy, label: "Leader" },
    { icon: Send, label: "Official" },
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#161413] border-t border-gray-800 flex justify-around py-3 z-50">
        {icons.map(({ icon: Icon, label }) => (
          <button key={label} className="flex flex-col items-center gap-1 text-gray-500 hover:text-white">
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-16 flex flex-col items-center py-4 gap-6 bg-[#161413] border-l border-gray-800">
      {icons.map(({ icon: Icon, label }) => (
        <button key={label} className="flex flex-col items-center gap-1 group w-full">
          <div className="w-10 h-10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-[#2a2e39] rounded-lg transition-all">
            <Icon size={20} />
          </div>
          <span className="text-[9px] text-gray-500 group-hover:text-gray-300 font-bold text-center leading-tight">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default IconStrip;
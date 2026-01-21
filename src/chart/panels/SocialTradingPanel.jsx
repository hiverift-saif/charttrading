import React from 'react';
import { X, Award, ChevronDown } from 'lucide-react';

const SocialTradingPanel = ({ onClose, darkMode }) => {
  const topTraders = [
    { name: "Nkiru", profit: "1,625.4", winRate: "66%", img: "https://eqxadmin.com/storage/profiles/kQFRiWbNvpsEjMvg6ap71wkHRtJPLo5cz8HU5KV9.jpg" },
  ];

  return (
    <>
      <div className={`p-4 border-b flex justify-between items-center ${darkMode ? "bg-[#161413] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
        <h5 className="font-bold text-sm">Social Trading</h5>
        <button onClick={onClose} className="text-gray-500"><X size={18} /></button>
      </div>
      <div className="p-4 space-y-4">
        <button className="w-full bg-blue-600 text-white py-2 px-3 rounded flex justify-between text-[10px] font-bold uppercase"><Award size={14} /> Top recommended <ChevronDown size={14} /></button>
        {topTraders.map((trader, idx) => (
          <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between ${darkMode ? "bg-[#111] border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="flex items-center gap-3"><img src={trader.img} className="w-8 h-8 rounded-full" alt="" />
              <div className="text-xs font-bold">{trader.name}</div>
            </div>
            <div className="text-[9px] text-green-600">{trader.winRate}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SocialTradingPanel;
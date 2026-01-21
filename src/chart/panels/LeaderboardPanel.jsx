import React from 'react';
import { X, Trophy, Star, Crown } from 'lucide-react';

const LeaderboardPanel = ({ onClose, darkMode }) => {
  const winners = [
    { rank: 1, name: "Alexander V.", profit: "$42,900", color: "text-yellow-500" },
    { rank: 2, name: "Sarah K.", profit: "$38,150", color: "text-gray-400" },
    { rank: 3, name: "Rajesh M.", profit: "$31,400", color: "text-orange-500" },
  ];

  return (
    <>
      <div className={`p-4 border-b flex justify-between items-center ${darkMode ? "border-zinc-800" : "border-gray-100"}`}>
        <h5 className="font-bold text-sm flex items-center gap-2 uppercase tracking-tighter">Global Ranking <Trophy size={16} className="text-yellow-500"/></h5>
        <button onClick={onClose} className="text-gray-500"><X size={18} /></button>
      </div>
      <div className="p-4 space-y-3">
        {winners.map((w, i) => (
          <div key={i} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200 shadow-sm"}`}>
            <div className={`text-lg font-black ${w.color}`}>{w.rank === 1 ? <Crown size={20}/> : w.rank}</div>
            <div className="flex-1">
              <div className="text-[11px] font-black uppercase tracking-tight">{w.name}</div>
              <div className="text-[9px] text-gray-500 font-bold uppercase">Total Profit Today</div>
            </div>
            <div className="text-xs font-black text-green-500">{w.profit}</div>
          </div>
        ))}
        <div className="text-center pt-4">
           <span className="text-[8px] font-black text-gray-500 uppercase tracking-[4px]">Binovera Elite Club</span>
        </div>
      </div>
    </>
  );
};
export default LeaderboardPanel;
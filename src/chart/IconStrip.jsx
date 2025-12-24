import React, { useState } from 'react';
import { History, Users, Keyboard, Trophy, Send, X, List, Award, ChevronDown, Radio, HelpCircle, Settings } from 'lucide-react';

const IconStrip = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [activeTradeTab, setActiveTradeTab] = useState('opened');
  const [signalFilter, setSignalFilter] = useState('updates');

  const icons = [
    { id: 'trades', icon: History, label: "Trades" },
    { id: 'social', icon: Users, label: "Social" },
    { id: 'signals', icon: Radio, label: "Signals" },
    { id: 'hotkeys', icon: Keyboard, label: "Hotkeys" },
    { id: 'leader', icon: Trophy, label: "Leader" },
    { id: 'official', icon: Send, label: "Official" },
  ];

  const topTraders = [
    { name: "Nkiru", trades: 9, profit: "1,625.4", winRate: "66%", img: "https://eqxadmin.com/storage/profiles/kQFRiWbNvpsEjMvg6ap71wkHRtJPLo5cz8HU5KV9.jpg" },
    { name: "Larsya", trades: 4, profit: "1,527.6", winRate: "100%", img: "https://eqxadmin.com/storage/profiles/vjZVd9KrgsTV7vBsqLLyzRjIr6agkV73amrVuh9l.jpg" },
    { name: "Kartik", trades: 67, profit: "7,802.5", winRate: "43%", img: "https://eqxadmin.com/storage/profiles/pKzyfQhDespl4nSAlCRh7OHM49o5zXDn3xnhw0HE.jpg" },
  ];

  const signalsList = [
    { asset: "EUR/USD OTC", type: "up", time: "00:28", progress: 53, amount: "$10", copied: 51, lastSeen: "32 sec ago" },
    { asset: "EUR/USD OTC", type: "down", time: "12:48", progress: 71, amount: "$10", copied: 723, lastSeen: "32 min ago" },
  ];

  return (
    <div className="relative flex h-full">
      
      {/* ==================== 1. TRADES DRAWER ==================== */}
      {activePanel === 'trades' && (
        <div className="absolute right-full top-0 h-full w-[300px] bg-[#1b1817] border-l border-gray-800 shadow-2xl z-[60] animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#161413]">
            <h5 className="text-white font-bold text-sm flex items-center gap-2">Trades <List size={16} className="text-gray-500" /></h5>
            <button onClick={() => setActivePanel(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="flex border-b border-gray-800 bg-[#1b1817]">
            {['opened', 'closed'].map((tab) => (
              <button key={tab} onClick={() => setActiveTradeTab(tab)} className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest relative ${activeTradeTab === tab ? 'text-white' : 'text-gray-500'}`}>
                {tab}
                {activeTradeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>}
              </button>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-gray-600 text-[11px] font-medium">No {activeTradeTab} trades</p>
          </div>
        </div>
      )}

      {/* ==================== 2. SOCIAL TRADING DRAWER ==================== */}
      {activePanel === 'social' && (
        <div className="absolute right-full top-0 h-full w-[320px] bg-[#1b1817] border-l border-gray-800 shadow-2xl z-[60] animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-[#161413] flex justify-between items-center">
            <h5 className="text-white font-bold text-sm">Social Trading</h5>
            <button onClick={() => setActivePanel(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded flex items-center justify-between text-xs font-bold transition-colors">
              <div className="flex items-center gap-2 uppercase tracking-tighter"><Award size={14} /> Top recommended traders</div>
              <ChevronDown size={14} />
            </button>
            <h5 className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-4">Real trading</h5>
            <div className="bg-[#1f1d1c] p-4 rounded-xl border border-gray-800 space-y-4">
               {["Watching copied trades", "Hide stats of my profile", "Hide watching of my trading"].map((label, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <label className="text-[11px] text-gray-300 leading-tight">{label}</label>
                    <input type="checkbox" className="w-8 h-4 bg-gray-700 rounded-full appearance-none checked:bg-blue-500 cursor-pointer relative transition-all after:content-[''] after:absolute after:w-3 after:h-3 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-4.5" />
                 </div>
               ))}
            </div>
            <div className="space-y-2">
              {topTraders.map((trader, idx) => (
                <div key={idx} className="w-full bg-[#1f1d1c]/50 border border-gray-800/50 rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:bg-[#252833]">
                  <div className="flex items-center gap-3">
                    <img src={trader.img} alt="" className="w-8 h-8 rounded-full border border-gray-700 object-cover" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-white mb-0.5">{trader.name}</div>
                      <div className="text-[9px] text-gray-500 italic">Trades: <span className="text-gray-300">{trader.trades}</span></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-green-500">$ {trader.profit}</div>
                    <div className="text-[9px] text-gray-500">Win Rate: <span className="text-white">{trader.winRate}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. SIGNALS DRAWER ==================== */}
      {activePanel === 'signals' && (
        <div className="absolute right-full top-0 h-full w-[320px] bg-[#1b1817] border-l border-gray-800 shadow-2xl z-[60] animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-[#161413]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Signals</span>
                <HelpCircle size={16} className="text-gray-500 cursor-pointer" />
                <Settings size={16} className="text-gray-500 cursor-pointer" />
              </div>
              <button onClick={() => setActivePanel(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex bg-[#131722] rounded p-1">
              {['updates', 'all'].map(f => (
                <button key={f} onClick={() => setSignalFilter(f)} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded ${signalFilter === f ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {signalsList.map((sig, idx) => (
              <div key={idx} className="bg-[#1f1d1c] border border-gray-800 rounded-lg p-3 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-[11px] font-bold text-gray-200 uppercase">{sig.asset}</div>
                  <div className={`flex ${sig.type === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    <Radio size={14} className={sig.type === 'up' ? 'rotate-180' : ''} /><Radio size={14} className={sig.type === 'up' ? 'rotate-180' : ''} />
                  </div>
                  <div className="flex items-center gap-2 flex-1 ml-4">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full"><div className="h-full bg-blue-500" style={{ width: `${sig.progress}%` }}></div></div>
                    <span className="text-[10px] text-gray-400 font-mono">{sig.time}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white font-bold text-xs">{sig.amount}</div>
                  <div className={`text-[10px] font-bold ${sig.type === 'up' ? 'text-red-500' : 'text-green-500'}`}>{sig.type === 'up' ? '-$' : '+$'}</div>
                  <button className="bg-blue-600 text-white text-[10px] font-bold py-1.5 px-4 rounded">Copy signal</button>
                </div>
                <div className="flex justify-between text-[9px] text-gray-500 font-bold uppercase">
                  <div>Copied: {sig.copied}</div>
                  <div>{sig.lastSeen}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== ICON STRIP ==================== */}
      <div className="w-16 flex flex-col items-center py-4 gap-6 bg-[#161413] h-full border-l border-gray-800 relative z-[70]">
        {icons.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setActivePanel(activePanel === id ? null : id)} className="flex flex-col items-center gap-1 group w-full outline-none">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${activePanel === id ? 'text-white bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-gray-500 group-hover:text-white group-hover:bg-[#2a2e39]'}`}>
              <Icon size={20} />
            </div>
            <span className={`text-[9px] font-bold text-center leading-tight ${activePanel === id ? 'text-white' : 'text-gray-500'}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconStrip;
import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { useTheme } from "../context/ThemeContext"; // 🚀 Added
import { History, Users, Keyboard, Trophy, Send, X, List, Award, ChevronDown, Radio } from 'lucide-react';

const IconStrip = ({ isMobile, closeDrawer }) => {
  const { darkMode } = useTheme(); // 🚀 Theme state access
  const [activePanel, setActivePanel] = useState(null);
  const [activeTradeTab, setActiveTradeTab] = useState('opened');
  
  const { openTrades } = useSelector((state) => state.trading);

  const buyTrades = openTrades.filter(t => t.type === 'buy');
  const sellTrades = openTrades.filter(t => t.type === 'sell');

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

  const getPanelStyles = () => {
    const baseClasses = `transition-all duration-300 shadow-2xl z-[160] flex flex-col border-l ${
      darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
    }`;
    
    if (isMobile) {
      return `fixed right-16 top-0 bottom-0 w-[260px] ${baseClasses}`;
    }
    return `absolute right-full top-0 h-full w-[320px] ${baseClasses}`;
  };

  return (
    <div className={`relative flex h-full ${isMobile ? 'flex-row-reverse' : ''}`}>
      
      {/* ==================== 1. TRADES DRAWER ==================== */}
      {activePanel === 'trades' && (
        <div className={`${getPanelStyles()} animate-in slide-in-from-right`}>
          <div className={`p-4 border-b flex justify-between items-center transition-colors ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
            <h5 className={`font-bold text-sm flex items-center gap-2 ${darkMode ? "text-white" : "text-black"}`}>
              Trades <List size={16} className="text-gray-500" />
            </h5>
            <button onClick={() => setActivePanel(null)} className="text-gray-500 hover:text-red-500 transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className={`flex border-b transition-colors ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
            <button 
              onClick={() => setActiveTradeTab('opened')} 
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest relative transition-colors
              ${activeTradeTab === 'opened' ? (darkMode ? 'text-white' : 'text-blue-600') : 'text-gray-500'}`}
            >
              Opened ({buyTrades.length})
              {activeTradeTab === 'opened' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>}
            </button>
            <button 
              onClick={() => setActiveTradeTab('closed')} 
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest relative transition-colors
              ${activeTradeTab === 'closed' ? (darkMode ? 'text-white' : 'text-blue-600') : 'text-gray-500'}`}
            >
              Closed ({sellTrades.length})
              {activeTradeTab === 'closed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {(activeTradeTab === 'opened' ? buyTrades : sellTrades).length > 0 ? (
              (activeTradeTab === 'opened' ? buyTrades : sellTrades).map((trade) => (
                <div key={trade.id} className={`border rounded-lg p-3 mb-2 animate-in fade-in zoom-in-95 transition-colors
                  ${darkMode ? "bg-[#111] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-bold uppercase ${darkMode ? "text-white" : "text-gray-700"}`}>{trade.symbol}</span>
                    <span className={`text-[10px] font-black uppercase ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-500 uppercase">Amount</span>
                      <span className={`text-xs font-bold ${darkMode ? "text-white" : "text-black"}`}>${trade.quantity}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-gray-500 uppercase">Entry Price</span>
                      <div className="text-xs font-mono text-blue-500">{trade.entryPrice || trade.price}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <History size={40} className={darkMode ? "text-white" : "text-gray-400"} />
                <p className={`text-[10px] uppercase font-bold text-center ${darkMode ? "text-white" : "text-gray-500"}`}>
                  No {activeTradeTab === 'opened' ? 'Buy' : 'Sell'} Trades Found
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== 2. SOCIAL TRADING DRAWER ==================== */}
      {activePanel === 'social' && (
        <div className={`${getPanelStyles()} animate-in slide-in-from-right`}>
          <div className={`p-4 border-b flex justify-between items-center transition-colors ${darkMode ? "bg-[#161413] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
            <h5 className={`font-bold text-sm ${darkMode ? "text-white" : "text-black"}`}>Social Trading</h5>
            <button onClick={() => setActivePanel(null)} className="text-gray-500 hover:text-black transition-colors"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded flex items-center justify-between text-xs font-bold transition-all shadow-md active:scale-95">
              <div className="flex items-center gap-2 uppercase tracking-tighter"><Award size={14} /> Top recommended</div>
              <ChevronDown size={14} />
            </button>
            <div className="space-y-2">
              {topTraders.map((trader, idx) => (
                <div key={idx} className={`border rounded-xl p-3 flex items-center justify-between group cursor-pointer transition-all
                  ${darkMode ? "bg-[#1f1d1c]/50 border-gray-800/50 hover:bg-[#252833]" : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"}`}>
                  <div className="flex items-center gap-3">
                    <img src={trader.img} alt="" className="w-8 h-8 rounded-full border border-gray-300 shadow-sm object-cover" />
                    <div className="text-left">
                      <div className={`text-xs font-bold mb-0.5 ${darkMode ? "text-white" : "text-black"}`}>{trader.name}</div>
                      <div className="text-[9px] text-gray-500 italic">${trader.profit}</div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-600 font-bold">{trader.winRate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. SIGNALS DRAWER ==================== */}
      {activePanel === 'signals' && (
        <div className={`${getPanelStyles()} animate-in slide-in-from-right`}>
          <div className={`p-4 border-b transition-colors ${darkMode ? "bg-[#161413] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
            <div className="flex justify-between items-center">
              <span className={`font-bold text-sm ${darkMode ? "text-white" : "text-black"}`}>Signals</span>
              <button onClick={() => setActivePanel(null)} className="text-gray-500 hover:text-black"><X size={18} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {signalsList.map((sig, idx) => (
              <div key={idx} className={`border rounded-lg p-3 transition-colors ${darkMode ? "bg-[#1f1d1c] border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
                <div className={`text-[11px] font-bold uppercase mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{sig.asset}</div>
                <button className="w-full bg-blue-600 text-white text-[10px] font-bold py-1.5 rounded active:scale-95 transition-all">COPY SIGNAL</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== MAIN ICON STRIP BAR ==================== */}
      <div className={`w-16 flex flex-col items-center py-4 gap-6 h-full border-l relative z-[170] transition-colors
        ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-200 shadow-lg"}`}>
        
        {isMobile && (
          <button onClick={closeDrawer} className="mb-4 text-gray-500 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        )}

        {icons.map(({ id, icon: Icon, label }) => (
          <button 
            key={id} 
            onClick={() => setActivePanel(activePanel === id ? null : id)} 
            className="flex flex-col items-center gap-1 group w-full outline-none transition-all"
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all 
              ${activePanel === id 
                ? 'text-white bg-blue-600 shadow-md' 
                : darkMode 
                  ? 'text-gray-500 group-hover:text-white group-hover:bg-[#2a2e39]' 
                  : 'text-gray-400 group-hover:text-blue-600 group-hover:bg-white border border-transparent group-hover:border-gray-100 shadow-none group-hover:shadow-sm'
              }`}>
              <Icon size={18} />
            </div>
            <span className={`text-[8px] font-bold text-center leading-tight uppercase transition-colors
              ${activePanel === id ? 'text-blue-500' : 'text-gray-500'}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconStrip;
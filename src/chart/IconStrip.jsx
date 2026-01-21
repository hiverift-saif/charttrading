import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import { History, Users, Keyboard, Trophy, Send, X, Radio } from 'lucide-react';

// Unique Panel Imports
import LiveTradesPanel from './panels/LiveTradesPanel';
import SocialTradingPanel from './panels/SocialTradingPanel';
import MarketSignalsPanel from './panels/MarketSignalsPanel';
import HotkeysPanel from './panels/HotkeysPanel';
import LeaderboardPanel from './panels/LeaderboardPanel';
import OfficialSupportPanel from './panels/OfficialSupportPanel';

const IconStrip = ({ isMobile, closeDrawer }) => {
  const { darkMode } = useTheme();
  const [activePanel, setActivePanel] = useState(null);

  const icons = [
    { id: 'trades', icon: History, label: "Trades" },
    { id: 'social', icon: Users, label: "Social" },
    { id: 'signals', icon: Radio, label: "Signals" },
    { id: 'hotkeys', icon: Keyboard, label: "Hotkeys" },
    { id: 'leader', icon: Trophy, label: "Leader" },
    { id: 'official', icon: Send, label: "Official" },
  ];

  // 🛠️ Mobile Fix: Panel style logic updated
  const getPanelStyles = () => {
    const baseClasses = `transition-all duration-300 shadow-2xl z-[200] flex flex-col border-l overflow-hidden ${
      darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
    }`;
    
    if (isMobile) {
      // 🚀 Mobile par panel right se 64px (width of strip) hat kar dikhega
      return `fixed right-16 top-0 bottom-0 w-[calc(100vw-80px)] max-w-[300px] ${baseClasses}`;
    }
    return `absolute right-full top-0 h-full w-[320px] ${baseClasses}`;
  };

  const renderPanel = () => {
    const props = { onClose: () => setActivePanel(null), darkMode };
    switch (activePanel) {
      case 'trades': return <LiveTradesPanel {...props} />;
      case 'social': return <SocialTradingPanel {...props} />;
      case 'signals': return <MarketSignalsPanel {...props} />;
      case 'hotkeys': return <HotkeysPanel {...props} />;
      case 'leader': return <LeaderboardPanel {...props} />;
      case 'official': return <OfficialSupportPanel {...props} />;
      default: return null;
    }
  };

  return (
    <div className={`relative h-full flex ${isMobile ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Dynamic Panels (Overlay for mobile) */}
      {activePanel && (
        <>
          {/* 🚀 Mobile Backdrop: Taaki panel ke peeche touch na ho */}
          {isMobile && (
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]" 
              onClick={() => setActivePanel(null)}
            />
          )}
          
          <div className={`${getPanelStyles()} animate-in slide-in-from-right duration-200`}>
            {renderPanel()}
          </div>
        </>
      )}

      {/* Main Bar (Sidebar) */}
      <div className={`w-16 flex flex-col items-center py-4 gap-6 h-full border-l relative z-[170] transition-colors
        ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-200 shadow-lg"}`}>
        
        {/* 🚀 Mobile Close: Red button at the top */}
        {isMobile && (
          <button onClick={closeDrawer} className="p-2 mb-2 bg-red-500/10 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all">
            <X size={20} />
          </button>
        )}

        {icons.map(({ id, icon: Icon, label }) => (
          <button 
            key={id} 
            onClick={() => setActivePanel(activePanel === id ? null : id)} 
            className="flex flex-col items-center gap-1 group w-full outline-none"
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all 
              ${activePanel === id 
                ? 'text-white bg-[#f99616] shadow-[0_0_15px_rgba(249,150,22,0.3)]' 
                : darkMode 
                  ? 'text-gray-500 group-hover:text-white group-hover:bg-zinc-800' 
                  : 'text-gray-400 group-hover:text-blue-600 group-hover:bg-white border border-transparent'
              }`}>
              <Icon size={20} />
            </div>
            <span className={`text-[7px] font-black uppercase tracking-tighter ${activePanel === id ? 'text-[#f99616]' : 'text-gray-500'}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconStrip;
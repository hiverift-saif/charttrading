import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  User, LogOut, Settings, ShieldAlert, TrendingUp, ChevronDown, Plus, 
  RefreshCw, Wallet, Bell, Newspaper, Globe, Award
} from 'lucide-react';

const Header = ({ setActiveTab }) => {
  const { balance } = useSelector((state) => state.trading);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="w-full h-16 border-b border-gray-800 flex items-center justify-between px-3 md:px-6 bg-[#1b1817] z-[9999] relative">
      
      {/* LEFT: Logo */}
      <div className="flex items-center gap-4">
        <div onClick={() => setActiveTab('chart')} className="cursor-pointer">
          <h1 className="text-lg md:text-xl font-black text-white tracking-tighter uppercase">
            MAX<span className="text-blue-500">TRADING</span>
          </h1>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 md:gap-6">
        <button 
          onClick={() => setActiveTab('deposit')}
          className="bg-blue-600 px-3 md:px-6 py-2 rounded-lg font-black text-white text-[10px] md:text-sm hover:bg-blue-500 transition active:scale-95 flex items-center gap-2"
        >
          <Plus size={14} className="md:hidden" />
          <span className="hidden md:inline">Deposit</span>
        </button>

        <div className="flex flex-col items-end">
            <span className="text-[8px] md:text-[10px] text-green-500 font-bold uppercase tracking-widest leading-none">Live Account</span>
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <span className="text-white font-black text-sm md:text-lg leading-tight">
                ${balance?.toLocaleString() || "0.00"}
              </span>
              <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
        </div>

        <div className="relative" ref={menuRef}>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-gray-300 cursor-pointer border transition-all ${isProfileOpen ? 'bg-gray-700 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
          >
              <User size={18} />
              <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-500 border-2 border-[#1b1817] rounded-full"></div>
          </div>

          {/* --- DROP DOWN MENU --- */}
          {isProfileOpen && (
            <div className="fixed right-2 md:right-4 top-16 w-[290px] md:w-[450px] bg-[#2a2e39] border border-gray-700 rounded-lg shadow-2xl z-[10000] animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
              
              {/* FIX: Internal Scroll Wrapper */}
              <div className="flex flex-col md:flex-row w-full max-h-[85vh] overflow-y-auto custom-scrollbar">
                
                {/* LEFT SECTION (User Stats & Achievements) */}
                <div className="flex-1 p-4 bg-[#1f232c] border-b md:border-b-0 md:border-r border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-600 border-2 border-green-500 flex items-center justify-center overflow-hidden">
                          <img src="https://pocket-uploads.com/images/cabinet/no_avatar.png?w=100" alt="avatar" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#1f232c] p-1 rounded-full"><TrendingUp size={10} className="text-green-500" /></div>
                     </div>
                     <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-white font-bold text-xs truncate">Unknown client</span>
                          <img src="https://flagcdn.com/w20/in.png" className="w-4 h-3 flex-shrink-0" alt="India" />
                        </div>
                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Beginner</span>
                        <p className="text-gray-500 text-[9px]">id 118920962</p>
                     </div>
                  </div>

                  <div className="space-y-3 mb-4 border-t border-gray-700 pt-3">
                     <p className="text-[10px] text-gray-400 font-bold flex justify-between uppercase">Your Achievements <RefreshCw size={10} className="cursor-pointer" /></p>
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold border border-yellow-500/50 flex-shrink-0">1</div>
                        <div className="flex-1 min-w-0">
                           <div className="flex justify-between text-[9px] mb-1">
                              <span className="text-gray-300">XP Points</span>
                              <span className="text-white">0 / 100</span>
                           </div>
                           <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                              <div className="w-[10%] h-full bg-green-500"></div>
                           </div>
                        </div>
                     </div>
                     <div className="flex justify-between bg-black/20 p-2 rounded">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-orange-400"><Award size={12} /> 0/110</div>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400"><Award size={12} /> 0/16</div>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-yellow-400"><Award size={12} /> 0/24</div>
                     </div>
                  </div>

                  <div className="text-[10px] text-gray-400 space-y-1 bg-black/20 p-2.5 rounded border border-gray-700/50">
                     <p className="flex justify-between leading-none">Trades Today: <span className="text-white font-bold">0</span></p>
                     <p className="flex justify-between leading-none">Profit Today: <span className="text-green-500 font-bold">$0.00</span></p>
                  </div>
                </div>

                {/* RIGHT SECTION (Nav Links) */}
                <div className="w-full md:w-[170px] p-1.5 bg-[#2a2e39]">
                  <ul className="space-y-0.5">
                    <NavListItem icon={<User size={14} />} label="Profile" onClick={() => {setActiveTab('profile'); setIsProfileOpen(false)}} />
                    <NavListItem icon={<Wallet size={14} />} label="Deposit" onClick={() => {setActiveTab('deposit'); setIsProfileOpen(false)}} />
                    <NavListItem icon={<RefreshCw size={14} />} label="Withdrawal" />
                    <NavListItem icon={<Bell size={14} />} label="Notifications" />
                    <NavListItem icon={<Settings size={14} />} label="Settings" />
                    <div className="h-[1px] bg-gray-700 my-1 mx-2"></div>
                    <NavListItem 
                      icon={<LogOut size={14} />} 
                      label="Log Out" 
                      onClick={handleLogout} 
                      className="text-red-400 hover:bg-red-500/10" 
                    />
                  </ul>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const NavListItem = ({ icon, label, onClick, className = "" }) => (
  <li>
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2.5 rounded hover:bg-white/5 transition-colors text-left ${className}`}
    >
      <span className="text-gray-400 flex-shrink-0">{icon}</span>
      <span className="text-[11px] font-bold text-gray-200 truncate">{label}</span>
    </button>
  </li>
);

export default Header;
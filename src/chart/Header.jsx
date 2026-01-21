import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAccountType, setBalance, updateDemoBalance } from '../redux/tradingSlice';
import {
  User, LogOut, ChevronDown, Plus,
  Wallet, Award, Monitor, Menu, PanelRight,
  Sun, Moon, History, Settings
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import API_CONFIG from '../config';

const Header = ({ setActiveTab, toggleLeftSidebar, toggleRightSidebar }) => {
  const dispatch = useDispatch();
  const { darkMode, toggleTheme } = useTheme();

  const { balance, demoBalance, accountType, isSyncing } = useSelector((state) => state.trading);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "Trader", email: "" });
  const menuRef = useRef(null);

  const currentBalance = accountType === 'demo' ? demoBalance : balance;

  const formatBalance = (value) => {
    const num = parseFloat(value);
    if (isNaN(num) || num == null || !isFinite(num)) return "0.00";
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const fetchBalance = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token || isSyncing) return;

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/wallet/balance`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok && data.statusCode === 200) {
        dispatch(setBalance(data.result.realBalance ?? 0));
        dispatch(updateDemoBalance(data.result.demoBalance ?? 10000));
      }
    } catch (error) {
      console.error("Connection failed");
    }
  }, [isSyncing, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchBalance();
      const timer = setInterval(fetchBalance, 10000);
      return () => clearInterval(timer);
    }
  }, [fetchBalance]);

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    const savedEmail = localStorage.getItem('user_email');
    if (savedName || savedEmail) {
      setUserData({ name: savedName || "Trader", email: savedEmail || "" });
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleSwitchAccount = (type) => {
    dispatch(setAccountType(type));
    setIsProfileOpen(false);
  };

  return (
    <header className={`w-full h-14 md:h-16 border-b flex items-center justify-between px-2 md:px-6 z-[100] sticky top-0 select-none transition-all duration-300 
      ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
      
      {/* Left Section: Menu & Logo */}
      <div className="flex items-center gap-1 md:gap-4">
        {/* Toggle Sidebar (Screenshot menu open karega) */}
        <button 
          onClick={toggleLeftSidebar} 
          className={`p-2 rounded-lg transition-all active:scale-90 ${darkMode ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
        >
          <Menu size={20} className="md:w-[22px] md:h-[22px]" />
        </button>
        
        <div onClick={() => setActiveTab('chart')} className="cursor-pointer">
          <img 
            src={logo} 
            alt="Binovera" 
            className={`w-28 md:w-44 h-auto object-contain transition-all ${darkMode ? "brightness-110" : "brightness-0 invert"}`} 
          />
        </div>
      </div>

      {/* Right Section: Theme, Deposit, Account */}
      <div className="flex items-center gap-1.5 md:gap-4 h-full">
        
        {/* Theme Toggle (Hidden on very small screens to save space) */}
        <button onClick={toggleTheme} className={`hidden sm:flex p-2 rounded-lg transition-all active:scale-90 items-center justify-center border 
          ${darkMode ? "bg-zinc-800 border-zinc-700 text-yellow-400" : "bg-gray-100 border-gray-200 text-blue-600"}`}>
          {darkMode ? <Sun size={18} fill="currentColor" /> : <Moon size={18} fill="currentColor" />}
        </button>

        {/* Deposit Button */}
        <button 
          onClick={() => setActiveTab('deposit')} 
          className="bg-[#f99616] px-3 md:px-6 py-1.5 md:py-2 rounded-md md:rounded-lg font-black text-white text-[10px] md:text-sm hover:bg-[#e88914] transition-all active:scale-95 flex items-center gap-1 md:gap-2 shadow-lg shadow-orange-500/10"
        >
          <Plus size={14} className="md:w-4 md:h-4" />
          <span className="tracking-tight">DEPOSIT</span>
        </button>

        {/* Balance & Account Switcher */}
        <div className="flex flex-col items-end cursor-pointer group px-1" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <span className={`text-[6px] md:text-[9px] font-black uppercase tracking-tighter md:tracking-widest leading-none ${accountType === 'demo' ? 'text-orange-400' : 'text-[#f99616]'}`}>
            {accountType === 'demo' ? 'Demo' : 'Live'} Account
          </span>
          <div className="flex items-center gap-0.5 md:gap-1 mt-0.5">
            <span className={`font-black text-xs md:text-xl leading-tight transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              ${formatBalance(currentBalance)}
            </span>
            <ChevronDown size={12} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

       {/* Right Sidebar Trigger (Mobile + Desktop dono ke liye) */}
<div className="flex items-center gap-1 md:gap-3" ref={menuRef}>
  
  {/* 🚀 FIXED: 'hidden md:block' hata kar sirf 'flex' rakha hai */}
  <button 
    onClick={toggleRightSidebar} 
    className={`p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center
      ${darkMode ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
  >
    <PanelRight size={22} className="md:w-[24px] md:h-[24px]" />
  </button>

  {/* Profile Circle */}
  <div 
    onClick={() => setIsProfileOpen(!isProfileOpen)} 
    className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer border relative transition-all 
    ${isProfileOpen 
      ? (darkMode ? 'bg-gray-800 border-[#f99616] text-white' : 'bg-gray-100 border-[#f99616] text-black') 
      : (darkMode ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600')}`}
  >
    <User size={14} className="md:w-[18px] md:h-[18px]" />
    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#f99616] border border-black rounded-full"></div>
  </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className={`absolute right-1 top-12 md:top-14 w-[260px] md:w-[400px] border rounded-xl shadow-2xl z-[10000] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 
              ${darkMode ? "bg-[#0d0d0d] border-gray-800 text-white" : "bg-white border-gray-200 text-black"}`}>
              <div className="flex flex-col md:flex-row">
                <div className={`flex-1 p-3 md:p-4 border-b md:border-b-0 md:border-r ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                  <p className="text-[8px] md:text-[9px] text-gray-500 font-black uppercase mb-3 md:mb-4 tracking-widest">Account Type</p>
                  <div className="space-y-1.5 md:space-y-2">
                    <AccountOption active={accountType === 'real'} onClick={() => handleSwitchAccount('real')} label="Real Account" bal={balance} icon={<Wallet size={14} />} color="text-[#f99616]" darkMode={darkMode} formatBalance={formatBalance} />
                    <AccountOption active={accountType === 'demo'} onClick={() => handleSwitchAccount('demo')} label="Demo Account" bal={demoBalance} icon={<Monitor size={14} />} color="text-orange-400" darkMode={darkMode} formatBalance={formatBalance} />
                  </div>

                  <div className={`mt-4 md:mt-6 flex items-center gap-3 p-2 rounded-xl border ${darkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-zinc-800">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] md:text-xs truncate block">{userData.name}</span>
                      <p className="text-[8px] md:text-[9px] text-gray-500 truncate leading-tight">{userData.email}</p>
                    </div>
                  </div>
                </div>

                <div className={`w-full md:w-[150px] p-1.5 md:p-2 ${darkMode ? "bg-[#080808]" : "bg-gray-50"}`}>
                  <ul className="space-y-0.5">
                    <NavListItem icon={<User size={13} />} label="Profile" darkMode={darkMode} onClick={() => {setActiveTab('profile'); setIsProfileOpen(false)}} />
                    <NavListItem icon={<History size={13} />} label="Trades" darkMode={darkMode} onClick={() => {setActiveTab('chart'); setIsProfileOpen(false)}} />
                    <NavListItem icon={<Settings size={13} />} label="Settings" darkMode={darkMode} />
                    <div className={`h-[1px] my-1.5 md:my-2 mx-2 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                    <NavListItem icon={<LogOut size={13} />} label="Sign Out" onClick={handleLogout} darkMode={darkMode} className="text-red-500 hover:bg-red-500/10" />
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

const AccountOption = ({ active, onClick, label, bal, icon, color, darkMode, formatBalance }) => (
  <div onClick={onClick} className={`p-2.5 md:p-3 rounded-lg md:rounded-xl border transition-all cursor-pointer flex justify-between items-center ${active ? (darkMode ? 'bg-[#f99616]/10 border-[#f99616]' : 'bg-orange-50 border-[#f99616]') : (darkMode ? 'border-gray-800 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50')}`}>
    <div className="flex items-center gap-2 md:gap-3">
      <span className={active ? color : 'text-gray-500'}>{icon}</span>
      <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-tight ${darkMode ? "text-white" : "text-black"}`}>{label}</span>
    </div>
    <span className={`text-[10px] md:text-xs font-black ${darkMode ? "text-white" : "text-black"}`}>${formatBalance(bal)}</span>
  </div>
);

const NavListItem = ({ icon, label, onClick, className = "", darkMode }) => (
  <li>
    <button onClick={onClick} className={`w-full flex items-center gap-2.5 md:gap-3 p-2 md:p-2.5 rounded-lg transition-all text-left group ${className} ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-200"}`}>
      <span className="text-gray-500 group-hover:text-[#f99616] transition-colors">{icon}</span>
      <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-tight transition-colors ${darkMode ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-black"}`}>{label}</span>
    </button>
  </li>
);

export default Header;
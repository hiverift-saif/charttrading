import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAccountType, setBalance, updateDemoBalance } from '../redux/tradingSlice';
import {
  User, LogOut, ChevronDown, Plus,
  Wallet, Award, Monitor, Menu, PanelRight,
  Sun, Moon
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/Logo.png";
import API_CONFIG from '../config';

const Header = ({ setActiveTab, toggleLeftSidebar, toggleRightSidebar }) => {
  const dispatch = useDispatch();
  const { darkMode, toggleTheme } = useTheme();

  const { balance, demoBalance, accountType } = useSelector((state) => state.trading);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "Trader", email: "" });
  const menuRef = useRef(null);

  const currentBalance = accountType === 'demo' ? demoBalance : balance;

  // Safe balance formatting - prevents NaN, undefined, 0.00 bugs
  const formatBalance = (value) => {
    const num = parseFloat(value);
    if (isNaN(num) || num == null || !isFinite(num)) {
      return "0.00";
    }
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await fetch(`${API_CONFIG.baseURL}/wallet/balance`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        dispatch(setBalance(data.result.realBalance ?? 0));
        dispatch(updateDemoBalance(data.result.demoBalance ?? 10000));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();

    const savedName = localStorage.getItem('user_name');
    const savedEmail = localStorage.getItem('user_email');
    if (savedName || savedEmail) {
      setUserData({
        name: savedName || "Trader",
        email: savedEmail || ""
      });
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
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
    <header className={`w-full h-16 border-b flex items-center justify-between px-2 md:px-6 z-[100] relative select-none transition-all duration-500 
      ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
      
      <div className="flex items-center gap-1 md:gap-4 h-full">
        <button onClick={toggleLeftSidebar} className={`p-2 rounded-lg transition-all active:scale-90 ${darkMode ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}>
          <Menu size={22} />
        </button>
        <div onClick={() => setActiveTab('chart')} className="cursor-pointer hidden lg:flex items-center">
          <img src={logo} alt="Binovera" className={`w-40 md:w-48 h-auto object-contain transition-all ${darkMode ? "brightness-110" : "brightness-0"}`} />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 h-full">
        <button onClick={toggleTheme} className={`p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center border 
          ${darkMode ? "bg-zinc-800 border-zinc-700 text-yellow-400 hover:bg-zinc-700" : "bg-gray-100 border-gray-200 text-blue-600 hover:bg-gray-200"}`}>
          {darkMode ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
        </button>

        <button onClick={() => setActiveTab('deposit')} className="bg-[#f99616] px-4 md:px-6 py-2 rounded-lg font-black text-white text-[10px] md:text-sm hover:bg-[#e88914] transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-orange-500/10">
          <Plus size={16} className="hidden xs:block" />
          <span>DEPOSIT</span>
        </button>

        <div className="flex flex-col items-end cursor-pointer group px-1 pr-3 md:pr-0" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <span className={`text-[7px] md:text-[9px] font-black uppercase tracking-widest leading-none ${accountType === 'demo' ? 'text-orange-400' : 'text-[#f99616]'}`}>
            {accountType === 'demo' ? 'Demo Account' : 'Live Account'}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`font-black text-sm md:text-xl leading-tight transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              ${formatBalance(currentBalance)}
            </span>
            <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3" ref={menuRef}>
          <button onClick={toggleRightSidebar} className={`p-2 rounded-lg transition-all active:scale-90 ${darkMode ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}>
            <PanelRight size={22} />
          </button>

          <div onClick={() => setIsProfileOpen(!isProfileOpen)} className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer border relative transition-all 
            ${isProfileOpen 
              ? (darkMode ? 'bg-gray-800 border-[#f99616] text-white' : 'bg-gray-100 border-[#f99616] text-black') 
              : (darkMode ? 'bg-gray-900 border-gray-800 text-gray-300 hover:border-gray-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400')}`}>
            <User size={18} />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#f99616] border-2 border-black rounded-full shadow-[0_0_8px_rgba(249,150,22,0.6)]"></div>
          </div>

          {isProfileOpen && (
            <div className={`absolute right-0 top-14 w-[280px] md:w-[400px] border rounded-xl shadow-2xl z-[10000] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 
              ${darkMode ? "bg-[#0d0d0d] border-gray-800 text-white" : "bg-white border-gray-200 text-black"}`}>
              <div className="flex flex-col md:flex-row">
                <div className={`flex-1 p-4 border-b md:border-b-0 md:border-r ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                  <p className="text-[9px] text-gray-500 font-black uppercase mb-4 tracking-widest">Select Account</p>
                  <div className="space-y-2">
                    <AccountOption active={accountType === 'real'} onClick={() => handleSwitchAccount('real')} label="Real Account" bal={balance} icon={<Wallet size={16} />} color="text-[#f99616]" darkMode={darkMode} formatBalance={formatBalance} />
                    <AccountOption active={accountType === 'demo'} onClick={() => handleSwitchAccount('demo')} label="Demo Account" bal={demoBalance} icon={<Monitor size={16} />} color="text-orange-400" darkMode={darkMode} formatBalance={formatBalance} />
                  </div>

                  <div className={`mt-6 flex items-center gap-3 p-2 rounded-xl border ${darkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className={`font-bold text-xs truncate ${darkMode ? "text-white" : "text-black"}`}>{userData.name}</span>
                        <div className="w-3 h-2 bg-blue-500 rounded-sm"></div>
                      </div>
                      <p className="text-[9px] text-gray-500 truncate leading-tight mb-1">{userData.email}</p>
                      <span className="text-[8px] text-[#f99616] font-black uppercase tracking-widest">Verified Trader</span>
                    </div>
                  </div>
                </div>

                <div className={`w-full md:w-[150px] p-2 ${darkMode ? "bg-[#080808]" : "bg-gray-50"}`}>
                  <ul className="space-y-0.5">
                    <NavListItem icon={<User size={14} />} label="Profile" darkMode={darkMode} onClick={() => {setActiveTab('profile'); setIsProfileOpen(false)}} />
                    <NavListItem icon={<Wallet size={14} />} label="Finances" darkMode={darkMode} onClick={() => {setActiveTab('deposit'); setIsProfileOpen(false)}} />
                    <NavListItem icon={<Award size={14} />} label="Tournaments" darkMode={darkMode} />
                    <div className={`h-[1px] my-2 mx-2 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                    <NavListItem icon={<LogOut size={14} />} label="Sign Out" onClick={handleLogout} darkMode={darkMode} className="text-red-500 hover:bg-red-500/10" />
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
  <div onClick={onClick} className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${active ? (darkMode ? 'bg-[#f99616]/10 border-[#f99616]' : 'bg-orange-50 border-[#f99616]') : (darkMode ? 'border-gray-800 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50')}`}>
    <div className="flex items-center gap-3">
      <span className={active ? color : 'text-gray-500'}>{icon}</span>
      <span className={`text-[10px] font-black uppercase tracking-tight ${darkMode ? "text-white" : "text-black"}`}>{label}</span>
    </div>
    <span className={`text-xs font-black ${darkMode ? "text-white" : "text-black"}`}>${formatBalance(bal)}</span>
  </div>
);

const NavListItem = ({ icon, label, onClick, className = "", darkMode }) => (
  <li>
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left group ${className} ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-200"}`}>
      <span className="text-gray-500 group-hover:text-[#f99616] transition-colors">{icon}</span>
      <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${darkMode ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-black"}`}>{label}</span>
    </button>
  </li>
);

export default Header;
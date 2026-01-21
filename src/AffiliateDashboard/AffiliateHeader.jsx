import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, User, LogOut, Sun, Moon, X } from "lucide-react"; 
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext"; 

function AffiliateHeader({ pageTitle, onMenuClick }) {
  const { darkMode, toggleTheme } = useTheme(); 
  const [showLevelsPanel, setShowLevelsPanel] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [balance, setBalance] = useState(0.00);
  const [userEmail, setUserEmail] = useState("Partner"); // 🚀 Email state
  const [cryptoType] = useState("ETH"); 

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // 🚀 Helper: Decode JWT Token to get Email
  const getEmailFromToken = (token) => {
    try {
      if (!token) return null;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).email; // Adjust key name if your token uses 'userEmail' or 'sub'
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchBalance = async () => {
    const token = localStorage.getItem("affiliate_token");
    if (!token) return;

    try {
      const res = await fetch(`${API_CONFIG.baseURL}/wallet/balance`, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      
      if (data.statusCode === 200 && data.result) {
        const currentBalance = data.result[cryptoType] || 0;
        setBalance(Number(currentBalance)); 
      }
    } catch (err) {
      console.error("Balance fetch error:", err);
    }
  };

  useEffect(() => {
    // 🚀 Logic: Get Email from Storage or Token
    const token = localStorage.getItem("affiliate_token");
    const userData = localStorage.getItem("affiliate_user");
    
    if (userData) {
      setUserEmail(JSON.parse(userData).email);
    } else if (token) {
      const email = getEmailFromToken(token);
      if (email) setUserEmail(email);
    }

    fetchBalance();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/affiliateLogin");
  };

  return (
    <div className={`${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"} border-b sticky top-0 z-[60] backdrop-blur-xl transition-colors duration-500`}>
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Mobile Menu & Title */}
          <div className="flex w-full items-center justify-between md:hidden">
            <button onClick={onMenuClick} className={darkMode ? "text-white" : "text-gray-900"}>
              <Menu className="w-5 h-5" />
            </button>
            <h1 className={`text-sm font-semibold uppercase tracking-tighter italic ${darkMode ? "text-white" : "text-gray-900"}`}>
              {pageTitle || "Dashboard"}
            </h1>
            <div className="w-5" />
          </div>

          <div className="flex w-full items-center justify-end gap-3 text-xs sm:text-sm">
            
            {/* Main Balance Section */}
            <div className="flex flex-col items-end px-2">
              <div className="flex items-center gap-1.5 opacity-60">
                <div className="w-1 h-1 rounded-full bg-[#f99616] shadow-[0_0_5px_#f99616]"></div>
                <p className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[2px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Main Balance
                </p>
              </div>
              <p className={`text-lg sm:text-2xl font-black italic tracking-tighter leading-none mt-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
                <span className="text-[#f99616] not-italic mr-1 text-sm sm:text-lg">$</span>
                {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span className={`text-[10px] not-italic ml-1 opacity-40 font-bold uppercase tracking-widest`}>
                  {cryptoType}
                </span>
              </p>
            </div>

            {/* Level Section */}
            <button
              onClick={() => setShowLevelsPanel(true)}
              className={`text-xs md:text-sm uppercase font-black hover:text-[#f99616] transition border-l border-gray-800/50 pl-4 h-10 tracking-[3px] ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              LEVEL-1
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center border
                ${darkMode 
                  ? "bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700" 
                  : "bg-gray-100 border-gray-200 text-blue-600 hover:bg-gray-200"}`}
            >
              {darkMode ? <Sun size={18} fill="currentColor" /> : <Moon size={18} fill="currentColor" />}
            </button>

            {/* 🚀 Profile Dropdown (With Dynamic Email) */}
            <div className={`relative border-l pl-2 ${darkMode ? "border-gray-800" : "border-gray-200"}`} ref={dropdownRef}>
              <button onClick={() => setShowProfile(!showProfile)} className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-gray-900"}`}>
                <User className="w-5 h-5" />
              </button>

              {showProfile && (
                <div className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} absolute right-0 mt-3 w-56 rounded-lg shadow-lg border text-xs z-[70] animate-slideDown`}>
                  
                  {/* 🚀 Dynamic Email Display */}
                  <div className={`flex items-center gap-3 p-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <img className="w-6 h-4 rounded-sm" src="https://flagcdn.com/w40/in.png" alt="India" />
                    <p className="font-black uppercase tracking-tighter truncate text-[10px]">{userEmail}</p>
                  </div>
                  
                  <ul className="p-2 text-left">
                    <li>
                      <Link to="/affiliate/profile" onClick={() => setShowProfile(false)} className={`w-full flex items-center gap-2 py-2 px-2 rounded-md ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
                        <User className="w-4 h-4 text-gray-400" /> Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className={`w-full flex items-center gap-2 py-2 px-2 text-red-400 rounded-md ${darkMode ? "hover:bg-gray-800" : "hover:bg-red-50"}`}>
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Levels Side Panel (No UI Change) */}
      {showLevelsPanel && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLevelsPanel(false)}></div>
          <div className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} absolute right-4 top-20 w-80 md:w-96 border rounded-xl shadow-2xl z-[10000] animate-slideInRight p-4`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold uppercase font-black italic">Affiliate Levels</h3>
                <button onClick={() => setShowLevelsPanel(false)}><X size={18} /></button>
              </div>
              <table className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black"} w-full text-[11px] rounded-lg overflow-hidden border`}>
                <thead className={`${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}>
                  <tr><th className="p-3 text-left">Level</th><th className="p-3 text-left">Revenue</th></tr>
                </thead>
                <tbody>
                  <tr className={`${darkMode ? "border-gray-700" : "border-gray-200"} border-b`}>
                    <td className="p-3 text-[#f99616] font-bold">Level 1</td>
                    <td>35.00%</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => setShowLevelsPanel(false)} className={`w-full mt-4 py-2.5 rounded-lg text-xs font-bold transition-all ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"}`}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default AffiliateHeader;
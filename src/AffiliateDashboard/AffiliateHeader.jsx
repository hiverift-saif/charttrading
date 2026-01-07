import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, User, X, LogOut, Loader2, Sun, Moon } from "lucide-react"; // 🚀 Added Sun, Moon
import API_CONFIG from "../config";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

function AffiliateHeader({ pageTitle, onMenuClick }) {
  const { darkMode, toggleTheme } = useTheme(); // 🚀 Theme state and toggle function
  const [showDeposit, setShowDeposit] = useState(false);
  const [showLevelsPanel, setShowLevelsPanel] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [balance, setBalance] = useState(0.00);
  const [getuser, setUser] = useState(null);
  
  const [depositAmount, setDepositAmount] = useState("");
  const [cryptoType, setCryptoType] = useState("ETH");
  const [isDepositing, setIsDepositing] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  const handleDeposit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("affiliate_token");

    if (!depositAmount || depositAmount <= 0) {
      return Swal.fire({ 
        icon: "error", 
        title: "Invalid Amount", 
        background: darkMode ? "#111827" : "#fff", 
        color: darkMode ? "#fff" : "#000", 
        confirmButtonColor: "#f99616" 
      });
    }

    try {
      setIsDepositing(true);
      const res = await fetch(`${API_CONFIG.baseURL}/wallet/deposit`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          crypto: cryptoType,
          amount: depositAmount.toString()
        }),
      });

      const data = await res.json();
      setIsDepositing(false);

      if (data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Deposit Success",
          text: `Address: ${data.result.address}`,
          background: darkMode ? "#111827" : "#fff",
          color: darkMode ? "#fff" : "#000",
          confirmButtonColor: "#f99616"
        });
        setDepositAmount("");
        setShowDeposit(false);
        fetchBalance(); 
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setIsDepositing(false);
      Swal.fire({ 
        icon: "error", 
        title: "Deposit Failed", 
        text: err.message, 
        background: darkMode ? "#111827" : "#fff", 
        color: darkMode ? "#fff" : "#000", 
        confirmButtonColor: "#f99616" 
      });
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("affiliate_user");
    if (userData) setUser(JSON.parse(userData));
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
            
            {/* Balance Card */}
            <div className={`${darkMode ? "bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700/80 text-white" : "bg-gray-100 border-gray-200 text-gray-900"} border rounded-xl px-2 py-2 sm:px-4 sm:py-3 shadow-md backdrop-blur-md`}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-full bg-[#f99616]/10 border border-[#f99616]/30">
                  <span className="text-[#f99616] font-bold">$</span>
                </div>
                <p className={`text-[9px] sm:text-[11px] uppercase ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Main Balance ({cryptoType})</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-base sm:text-lg md:text-xl font-bold italic">
                  {balance.toFixed(2)}
                </p>
                <button 
                  onClick={() => setShowDeposit(true)}
                  className="bg-[#f99616] hover:bg-[#e88914] text-white text-[9px] sm:text-xs md:text-sm font-semibold px-2 sm:px-3 py-1.5 rounded-lg active:scale-95 transition-all"
                >
                  Deposit
                </button>
              </div>
            </div>

            {/* Level */}
            <button
              onClick={() => setShowLevelsPanel(true)}
              className={`text-sm md:text-md uppercase font-bold hover:text-[#f99616] transition border-l pl-4 h-10 tracking-widest ${darkMode ? "text-white border-gray-800" : "text-gray-900 border-gray-200"}`}
            >
              LEVEL-1
            </button>

            {/* 🚀 THEME TOGGLE BUTTON (Sun/Moon) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center border
                ${darkMode 
                  ? "bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700" 
                  : "bg-gray-100 border-gray-200 text-blue-600 hover:bg-gray-200"}`}
            >
              {darkMode ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
            </button>

            <div className={`relative border-l pl-2 ${darkMode ? "border-gray-800" : "border-gray-200"}`} ref={dropdownRef}>
              <button onClick={() => setShowProfile(!showProfile)} className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-gray-900"}`}>
                <User className="w-5 h-5" />
              </button>

              {showProfile && (
                <div className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} absolute right-0 mt-3 w-56 rounded-lg shadow-lg border text-xs z-[70] animate-slideDown`}>
                  <div className={`flex items-center gap-3 p-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <img className="w-6 h-4 rounded-sm" src="https://flagcdn.com/w40/in.png" alt="India" />
                    <p className="font-medium truncate">{getuser?.email || "Partner"}</p>
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

      {showDeposit && (
        <div className="fixed inset-0 z-[9999] flex justify-center items-start pt-20 p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowDeposit(false)}></div>
          
          <div className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} border rounded-2xl p-6 w-full max-w-md shadow-2xl relative z-[10000] animate-slideDown`}>
            <button onClick={() => setShowDeposit(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
            <h2 className="text-base sm:text-lg font-semibold mb-6 text-center uppercase tracking-widest font-black italic">Deposit Funds</h2>
            
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium uppercase">Select Crypto</label>
                <select 
                  value={cryptoType}
                  onChange={(e) => setCryptoType(e.target.value)}
                  className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200 text-black"} w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-[#f99616] outline-none text-sm`}
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium uppercase">Amount</label>
                <input 
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black"} w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-[#f99616] outline-none`} 
                  placeholder="222" 
                  type="number" 
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isDepositing}
                className="w-full py-3 rounded-lg font-bold bg-[#f99616] hover:bg-[#e88914] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 disabled:opacity-50 text-white"
              >
                {isDepositing ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Deposit"}
              </button>
            </form>

            <div className="mt-8 border-t border-gray-800 pt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Recent Transactions</h3>
              <div className="text-center py-4 text-gray-600 text-xs italic">
                Transaction history will appear here after sync.
              </div>
            </div>
          </div>
        </div>
      )}

      {showLevelsPanel && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLevelsPanel(false)}></div>
          <div className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} absolute right-4 top-20 w-80 md:w-96 border rounded-xl shadow-2xl z-[10000] animate-slideInRight p-4`}>
             <div className="flex justify-between items-center mb-4"><h3 className="font-semibold uppercase font-black italic">Affiliate Levels</h3><X className="cursor-pointer" size={18} onClick={() => setShowLevelsPanel(false)} /></div>
             <table className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black"} w-full text-[11px] rounded-lg overflow-hidden border`}>
                <thead className={`${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}><tr><th className="p-3 text-left">Level</th><th className="p-3 text-left">Revenue</th></tr></thead>
                <tbody><tr className={`${darkMode ? "border-gray-700" : "border-gray-200"} border-b`}><td className="p-3 text-[#f99616] font-bold">Level 1</td><td>35.00%</td></tr></tbody>
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
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default AffiliateHeader;
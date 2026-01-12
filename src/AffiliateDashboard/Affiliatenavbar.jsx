import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/Logo.png";

const Affiliatenavbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className={`w-full h-14 md:h-16 border-b flex items-center justify-between px-3 md:px-10 z-[100] transition-all duration-500 sticky top-0
      ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-200 shadow-sm"}`}>
      
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img 
          src={logo} 
          alt="Logo" 
          /* 🚀 LOGO BLACK FIX: Light mode mein ye classes force karengi */
          className={`w-28 md:w-44 h-auto object-contain cursor-pointer transition-all duration-300
            ${darkMode ? "brightness-100 invert-0" : "brightness-0"}`} 
          onClick={() => navigate("/")}
        />
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className={`p-2 rounded-lg border transition-all active:scale-90
            ${darkMode ? "bg-zinc-900 border-zinc-700 text-yellow-400" : "bg-gray-100 border-gray-200 text-blue-600"}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Buttons - Mobile par same size dikhenge */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <button 
            onClick={() => navigate("/AffiliateLogin")}
            className={`flex items-center justify-center gap-2 px-3 md:px-5 py-2 rounded-lg text-[10px] md:text-sm font-black transition-all active:scale-95 border
              ${darkMode 
                ? "border-zinc-800 text-gray-300 hover:bg-white/5" 
                : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}
          >
            <LogIn size={16} />
            <span className="hidden sm:inline">LOGIN</span>
          </button>

          <button 
            onClick={() => navigate("/AffiliateSignup")}
            className="bg-[#f99616] border border-[#f99616] px-3 md:px-5 py-2 rounded-lg font-black text-white text-[10px] md:text-sm hover:bg-[#e88914] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">SIGN UP</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Affiliatenavbar;
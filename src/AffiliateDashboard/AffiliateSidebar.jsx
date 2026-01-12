import React from 'react';
import { X } from 'lucide-react';
import logo from "../assets/logo.png"; 
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateSidebar({ navItems, activeComponent, setActiveComponent, onClose }) {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check

  return (
    <aside className={`w-full h-full flex flex-col backdrop-blur-xl relative transition-colors duration-500 border-r
      ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200 shadow-xl"}`}>
      
      {/* 🚀 CLOSE BUTTON */}
      <button 
        onClick={onClose} 
        className={`lg:hidden absolute right-4 top-5 p-2 transition-colors z-50
          ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
      >
        <X size={24} />
      </button>

      <div className="p-6">
        
        {/* 🚀 LOGO SECTION */}
        <div className="flex items-center px-2 mb-6">
          <img 
            src={logo} 
            alt="BINOVERA" 
            className={`w-8 md:w-100 h-auto object-contain brightness-110 
              ${!darkMode ? "invert-0 contrast-125" : ""}`} // Light mode mein logo clarity
          />
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = activeComponent === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveComponent(item.id);
                  if (window.innerWidth < 1024 && onClose) onClose(); 
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 border
                  ${isActive
                    ? 'bg-[#f99616]/10 text-[#f99616] border-[#f99616]/30 font-bold shadow-sm'
                    : darkMode 
                      ? 'text-gray-400 border-transparent hover:text-white hover:bg-gray-800/50' 
                      : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-50'
                  }`}
              >
                <item.icon className={`w-5 h-5 transition-colors 
                  ${isActive ? 'text-[#f99616]' : 'text-gray-500'}`} 
                />
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 🚀 BOTTOM FOOTER */}
      <div className={`mt-auto p-6 border-t transition-colors
        ${darkMode ? "border-gray-900/50" : "border-gray-100"}`}>
          <span className={`text-[10px] font-bold uppercase tracking-[2px] 
            ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
            Partner Program
          </span>
      </div>
    </aside>
  );
}

export default AffiliateSidebar;
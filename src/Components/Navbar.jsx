import React, { useState, useEffect, useRef } from "react";
import { Menu, MessageSquare, ChevronDown, X, Search, Check, Sun, Moon, UserPlus, LogIn } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

const allLanguages = [
  { name: "English", code: "en", flag: "gb" },
  { name: "Hindi (हिन्दी)", code: "hi", flag: "in" },
  { name: "Spanish (Español)", code: "es", flag: "es" },
  { name: "Russian (Русский)", code: "ru", flag: "ru" },
  { name: "Arabic (العربية)", code: "ar", flag: "sa" },
  { name: "French (Français)", code: "fr", flag: "fr" },
  { name: "German (Deutsch)", code: "de", flag: "de" },
  { name: "Chinese (简体中文)", code: "zh-CN", flag: "cn" },
  { name: "Portuguese (Português)", code: "pt", flag: "pt" },
  { name: "Italian (Italiano)", code: "it", flag: "it" },
  { name: "Indonesian (Bahasa Indo)", code: "id", flag: "id" },
  { name: "Vietnamese (Tiếng Việt)", code: "vi", flag: "vn" },
  { name: "Thai (ไทย)", code: "th", flag: "th" },
  { name: "Turkish (Türkçe)", code: "tr", flag: "tr" },
  { name: "Korean (한국어)", code: "ko", flag: "kr" },
  { name: "Japanese (日本語)", code: "ja", flag: "jp" },
  { name: "Urdu (اردو)", code: "ur", flag: "pk" },
  { name: "Bengali (বাংলা)", code: "bn", flag: "bd" },
];

const Navbar = ({ onOpenAuth }) => {
  const { darkMode, setDarkMode } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(allLanguages[0]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const location = useLocation();
  const desktopDropdownRef = useRef(null);

  const logoStyle = {
    filter: darkMode ? "none" : "invert(1)",
    transition: "filter 0.3s ease"
  };

  useEffect(() => {
    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: allLanguages.map((l) => l.code).join(","),
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
    setSearchQuery("");
    document.cookie = `googtrans=/auto/${lang.code}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/auto/${lang.code}; path=/;`;
    window.location.reload();
  };

  const filteredLanguages = allLanguages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const DropdownContent = () => (
    <div className={`absolute top-full left-0 mt-3 w-[280px] rounded-xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left z-50 
      ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
      <div className={`p-3 border-b ${darkMode ? "border-gray-800 bg-black" : "border-gray-100 bg-gray-50"}`}>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-sm pl-9 pr-3 py-2 rounded-lg border focus:border-[#3F8CFF] focus:outline-none 
              ${darkMode ? "bg-[#111] text-white border-gray-700" : "bg-white text-black border-gray-200"}`}
          />
        </div>
      </div>
      <div className={`max-h-[300px] overflow-y-auto custom-scrollbar ${darkMode ? "bg-black" : "bg-white"}`}>
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full flex items-center justify-between px-4 py-3 transition-colors border-b last:border-none group 
                ${darkMode ? "hover:bg-[#111] border-gray-900" : "hover:bg-gray-50 border-gray-50"} 
                ${selectedLang.code === lang.code ? (darkMode ? "bg-[#3F8CFF]/10" : "bg-[#3F8CFF]/5") : ""}`}
              onClick={() => handleLanguageChange(lang)}
            >
              <div className="flex items-center gap-3">
                <img src={`https://flagcdn.com/w40/${lang.flag}.png`} className="w-5 h-3.5 object-cover rounded-[2px]" alt={lang.name} />
                <span className={`text-sm ${selectedLang.code === lang.code ? "text-[#3F8CFF] font-medium" : (darkMode ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-black")}`}>
                  {lang.name}
                </span>
              </div>
              {selectedLang.code === lang.code && <Check size={16} className="text-[#3F8CFF]" />}
            </button>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">No language found</div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`sticky top-0 w-full h-[60px] flex items-center px-3 md:px-6 shadow-md border-b z-50 transition-colors duration-300
      ${darkMode ? "bg-black border-[#242d44]" : "bg-white border-gray-200"}`}>
      
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* --- LEFT SECTION --- */}
      <div className="flex items-center gap-4 z-20">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={26} className={darkMode ? "text-white" : "text-black"} /> : <Menu size={26} className={darkMode ? "text-white" : "text-black"} />}
        </button>

        {/* Mobile Logo */}
        <div className="md:hidden">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="logo" className="w-20 h-auto object-contain" style={logoStyle} />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative" ref={desktopDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-black/5"}`}
            >
              <img src={`https://flagcdn.com/w40/${selectedLang.flag}.png`} className="w-6 h-4 object-cover rounded-[2px]" alt="flag" />
              <ChevronDown size={14} className={`transition-transform ${darkMode ? "text-gray-300" : "text-gray-600"} ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            {isLangOpen && <DropdownContent />}
          </div>

          {/* 🚀 LEFT SIDE DARK MODE (Always Visible on Desktop) */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors ${darkMode ? "text-yellow-400 hover:bg-white/10" : "text-gray-600 hover:bg-black/5"}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center gap-2 text-[#3F8CFF]">
            <MessageSquare size={22} />
          </div>
        </div>
      </div>

      {/* --- CENTER SECTION (Desktop Logo) --- */}
{/* --- CENTER SECTION (Desktop Logo) --- */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <Link 
          to="/" 
          onClick={() => setIsMenuOpen(false)} // 🚀 FIXED: Click par menu close hoga
        >
          <img src={logo} alt="logo" className="h-32 w-auto object-contain" style={logoStyle} />
        </Link>
      </div>

      {/* --- RIGHT SECTION --- */}
      <div className="ml-auto flex items-center gap-1.5 md:gap-3 z-20">
        
        {/* 🚀 DARK MODE TOGGLE (Only visible on Mobile in the Right section) */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`md:hidden p-2 rounded-full transition-all active:scale-90 ${darkMode ? "text-yellow-400" : "text-gray-600"}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Sign Up Button */}
        <Link
          to="/signup"
          onClick={() => setIsMenuOpen(false)}
          className={`py-2 px-2.5 md:px-4 text-[10px] md:text-[11px] font-black uppercase tracking-tight rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap
            ${location.pathname === "/signup" 
              ? "bg-blue-600 text-white shadow-md" 
              : (darkMode ? "text-gray-300 border border-gray-700 hover:bg-white/5" : "text-gray-600 border border-gray-300 hover:bg-gray-50")}`}
        >
          <UserPlus size={14} className="shrink-0" /> 
          <span>Sign Up</span>
        </Link>

        {/* Log In Button */}
        <Link
          to="/login"
          onClick={() => setIsMenuOpen(false)}
          className={`py-2 px-2.5 md:px-4 text-[10px] md:text-[11px] font-black uppercase tracking-tight rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap
            ${location.pathname === "/login" 
              ? "bg-[#2d1f4a] text-white border border-purple-500 shadow-md" 
              : (darkMode ? "text-gray-300 border border-gray-700 hover:bg-white/5" : "text-gray-600 border border-gray-300 hover:bg-gray-50")}`}
        >
          <LogIn size={14} className="shrink-0" /> 
          <span>Log In</span>
        </Link>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <style>{` 
        body { top: 0px !important; }
        .goog-te-banner-frame, .goog-tooltip { display: none !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${darkMode ? '#111' : '#f1f1f1'}; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${darkMode ? '#333' : '#ccc'}; border-radius: 3px; }
      `}</style>
    </div>
  );
};

export default Navbar;
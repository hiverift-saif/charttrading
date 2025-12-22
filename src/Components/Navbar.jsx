import React, { useState, useEffect, useRef } from "react";
import { Menu, MessageSquare, ChevronDown, X, Search, Check } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";

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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(allLanguages[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("signup");

  const desktopDropdownRef = useRef(null);

  // --- Google Translate Logic ---
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
    const currentCookie = getCookie("googtrans");
    if (currentCookie) {
      const langCode = currentCookie.split("/")[2];
      const foundLang = allLanguages.find((l) => l.code === langCode);
      if (foundLang) setSelectedLang(foundLang);
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
    setSearchQuery("");
    document.cookie = `googtrans=/auto/${lang.code}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/auto/${lang.code}; path=/;`;
    window.location.reload();
  };

  useEffect(() => {
    const handler = (e) => {
      if (isLangOpen && desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isLangOpen]);

  const filteredLanguages = allLanguages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const DropdownContent = () => (
    <div className="absolute top-full left-0 mt-3 w-[280px] bg-black rounded-xl shadow-2xl border border-gray-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left z-50">
      <div className="p-3 border-b border-gray-800 bg-black">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full bg-[#111] text-white text-sm pl-9 pr-3 py-2 rounded-lg border border-gray-700 focus:border-[#3F8CFF] focus:outline-none placeholder-gray-600"
          />
        </div>
      </div>
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar bg-black">
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[#111] transition-colors border-b border-gray-900 last:border-none group ${
                selectedLang.code === lang.code ? "bg-[#3F8CFF]/10" : ""
              }`}
              onClick={() => handleLanguageChange(lang)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/w40/${lang.flag}.png`}
                  className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm"
                  alt={lang.name}
                />
                <span className={`text-sm ${selectedLang.code === lang.code ? "text-[#3F8CFF] font-medium" : "text-gray-300 group-hover:text-white"}`}>
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
    <div className="sticky top-0 w-full h-[60px] bg-black flex items-center px-3 md:px-6 shadow-md border-b border-[#242d44] z-50">
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* --- LEFT SECTION (Menu + Logo on Mobile | Menu + Lang + Chat on Desktop) --- */}
      <div className="flex items-center gap-4 z-20">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={26} className="text-white" /> : <Menu size={26} className="text-white" />}
        </button>

        {/* MOBILE LOGO: Only visible on mobile, positioned next to menu */}
        <div className="md:hidden">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <span className="text-white text-lg font-semibold notranslate font-nunito-custom">
              Max Trading
            </span>
          </Link>
        </div>

        {/* DESKTOP EXTRAS: Language & Chat (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative" ref={desktopDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded transition-colors"
            >
              <img
                src={`https://flagcdn.com/w40/${selectedLang.flag}.png`}
                className="w-6 h-4 object-cover rounded-[2px]"
                alt="flag"
              />
              <ChevronDown size={14} className={`text-gray-300 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            {isLangOpen && <DropdownContent />}
          </div>
          <div className="flex items-center gap-2 text-[#3F8CFF]">
            <MessageSquare size={22} />
          </div>
        </div>
      </div>

      {/* --- CENTER SECTION (Logo only on Desktop) --- */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <Link to="/">
          <span className="text-white text-xl font-semibold notranslate font-nunito-custom">
            Max Trading
          </span>
        </Link>
      </div>

      {/* --- RIGHT SECTION (Mobile Buttons) --- */}
      <div className="ml-auto flex items-center gap-2 z-20 md:hidden">
        <button
          onClick={() => { setActiveTab("signup"); onOpenAuth && onOpenAuth(); }}
          className={`py-1.5 px-2.5 text-[11px] font-medium rounded-lg transition-all flex items-center gap-1 ${
            activeTab === "signup"
              ? "bg-white text-purple-900 shadow-md"
              : "bg-transparent text-gray-400 border border-gray-700"
          }`}
        >
           Sign Up
        </button>

        <button
          onClick={() => { setActiveTab("login"); onOpenAuth && onOpenAuth(); }}
          className={`py-1.5 px-2.5 text-[11px] font-medium rounded-lg transition-all flex items-center gap-1 ${
            activeTab === "login"
              ? "bg-[#2d1f4a] text-white border border-purple-500"
              : "bg-transparent text-gray-400 border border-gray-700"
          }`}
        >
          Log In
        </button>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <style>{`
        body { top: 0px !important; }
        .goog-te-banner-frame, .goog-tooltip { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
        font { background-color: transparent !important; box-shadow: none !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>
    </div>
  );
};

export default Navbar;
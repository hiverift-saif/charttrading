import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Globe,
  MessageCircle,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const MobileMenu = ({ isOpen, onClose }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔍 Home page check (sirf yahin sidebar hota hai)
  const isHomePage = location.pathname === "/";

  const handleBtnClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    navigate("/trading", { state: { mode: "demo" } });
    onClose();
  };

  return (
    <div
      className={`
        fixed top-[60px] left-0 transition-all duration-500 ease-in-out
        z-[9999]
        ${isOpen
          ? "h-[calc(100vh-60px)] opacity-100 visible"
          : "h-0 opacity-0 invisible"
        }
        ${darkMode ? "bg-black" : "bg-white"}

        w-full
        ${isHomePage ? "xl:w-[calc(100%-320px)]" : "xl:w-full"}
      `}
    >
      {/* Scroll container */}
      <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-7xl mx-auto text-sm md:text-base">

          {/* HEADER */}
          <div className="mb-4 sm:mb-6">
            <h2
              className={`text-2xl md:text-4xl font-bold mb-1 transition-colors ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Navigation
            </h2>
            <div className="h-0.5 w-16 bg-blue-500"></div>
          </div>

          {/* AUTH BUTTONS */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button
              onClick={() => handleBtnClick("/signup")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700 text-white font-semibold
                py-2 px-4 rounded-md sm:rounded-lg transition-colors"
            >
              <UserPlus size={16} />
              Create Account
            </button>

            <button
              onClick={() => handleBtnClick("/login")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2
                bg-orange-600 hover:bg-orange-700 text-white font-semibold
                py-2 px-4 rounded-md sm:rounded-lg transition-colors"
            >
              <LogIn size={16} />
              Sign In
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* GET STARTED */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-200"} border rounded-lg p-4`}>
              <h3 className="text-gray-500 font-bold mb-3 uppercase text-sm">
                Get Started
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={handleDemoClick}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Demo Account
                  </button>
                </li>
                <li><Link to="/quickstart" onClick={onClose}>Quick Setup</Link></li>
                <li><Link to="/guides" onClick={onClose}>Beginner Guides</Link></li>
                <li><Link to="/tools" onClick={onClose}>Trading Tools</Link></li>
              </ul>
            </div>

            {/* PLATFORM FEATURES */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-200"} border rounded-lg p-4`}>
              <h3 className="text-gray-500 font-bold mb-3 uppercase text-sm">
                Platform Features
              </h3>
              <ul className="space-y-2">
                <li><Link to="/assets" onClick={onClose}>Multiple Assets</Link></li>
                <li><Link to="/payments" onClick={onClose}>Fast Payments</Link></li>
                <li><Link to="/rewards" onClick={onClose}>Offers & Rewards</Link></li>
                <li><Link to="/copy-trading" onClick={onClose}>Copy Trading</Link></li>
              </ul>
            </div>

            {/* ACCESS */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-200"} border rounded-lg p-4`}>
              <h3 className="text-gray-500 font-bold mb-3 uppercase text-sm">
                Access
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Globe size={16} />
                  <Link to="/trading" onClick={onClose}>Web Platform</Link>
                </li>
                <li className="flex items-center gap-2">
                  <Send size={16} />
                  <Link to="/TelegramSupportPage" onClick={onClose}>
                    Telegram Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-200"} border rounded-lg p-4`}>
              <h3 className="text-gray-500 font-bold mb-3 uppercase text-sm">
                Company
              </h3>
              <ul className="space-y-2">
                <li><Link to="/aboutthecompany" onClick={onClose}>About Us</Link></li>
                <li><Link to="/maxtradingblog" onClick={onClose}>Insights & Blog</Link></li>
                <li><Link to="/contacts" onClick={onClose}>Contact</Link></li>
                <li><Link to="/supportservice" onClick={onClose}>Support Center</Link></li>
                <li><Link to="/amlkycpolicy" onClick={onClose}>Terms of Service</Link></li>
                <li><Link to="/privacypolicy" onClick={onClose}>Privacy Policy</Link></li>
              </ul>
            </div>

          </div>

          {/* SOCIAL */}
          <div className={`mt-8 pt-6 border-t ${darkMode ? "border-zinc-800" : "border-gray-200"}`}>
            <div className="flex gap-5 justify-center flex-wrap">
              <Facebook size={20} />
              <Instagram size={20} />
              <Twitter size={20} />
              <Youtube size={20} />
              <Send size={20} />
              <MessageCircle size={20} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

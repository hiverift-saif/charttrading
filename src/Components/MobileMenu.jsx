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
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Context Import

const MobileMenu = ({ isOpen, onClose }) => {
  const { darkMode } = useTheme(); // Theme Hook
  const navigate = useNavigate();

  const handleBtnClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    navigate("/trading", { state: { mode: 'demo' } }); 
    onClose();
  };

  return (
    <div
      className={`fixed top-[60px] left-0 w-full transition-all duration-500 ease-in-out z-40 ${
        isOpen
          ? "h-[calc(100vh-60px)] opacity-100 visible"
          : "h-0 opacity-0 invisible"
      } ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <div className="h-full overflow-y-auto custom-scrollbar pb-10">
        <div className="p-6 md:p-8 max-w-6xl mx-auto text-sm md:text-base">

          {/* HEADER */}
          <div className="mb-6">
            <h2 className={`text-3xl md:text-4xl font-bold mb-2 font-nunito-custom transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Navigation
            </h2>
            <div className="h-0.5 w-16 bg-blue-500"></div>
          </div>

          {/* AUTH BUTTONS - ORIGINAL SIZES RESTORED */}
          <div className="flex gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => handleBtnClick("/signup")}
              className="flex items-center gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 sm:py-2.5 sm:px-6 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base transition-colors"
            >
              <UserPlus size={14} className="sm:size-[18px]" />
              Create Account
            </button>

            <button
              onClick={() => handleBtnClick("/login")}
              className="flex items-center gap-1.5 sm:gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-1.5 px-3 sm:py-2.5 sm:px-6 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base transition-colors"
            >
              <LogIn size={14} className="sm:size-[18px]" />
              Sign In
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* GET STARTED */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-100"} rounded-lg p-5 border transition-colors`}>
              <h3 className={`${darkMode ? "text-gray-400" : "text-gray-500"} font-bold mb-4 uppercase text-sm md:text-base`}>
                Get Started
              </h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={handleDemoClick} 
                    className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"} transition-colors`}
                  >
                    Demo Account
                  </button>
                </li>
                <li><Link to="/Affiliates" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Affiliates</Link></li>
                <li><Link to="/quickstart" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Quick Setup</Link></li>
                <li><Link to="/guides" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Beginner Guides</Link></li>
                <li><Link to="/tools" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Trading Tools</Link></li>
              </ul>
            </div>

            {/* Platform Features */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-100"} rounded-lg p-5 border transition-colors`}>
              <h3 className={`${darkMode ? "text-gray-400" : "text-gray-500"} font-bold mb-4 uppercase text-sm md:text-base`}>
                Platform Features
              </h3>
              <ul className="space-y-3">
                <li><Link to="/assets" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Multiple Assets</Link></li>
                <li><Link to="/payments" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Fast Payments</Link></li>
                <li><Link to="/rewards" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Offers & Rewards</Link></li>
                <li><Link to="/copy-trading" onClick={onClose} className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Copy Trading</Link></li>
              </ul>
            </div>

            {/* Access */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-100"} rounded-lg p-5 border transition-colors`}>
              <h3 className={`${darkMode ? "text-gray-400" : "text-gray-500"} font-bold mb-4 uppercase text-sm md:text-base`}>
                Access
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/web-platform" onClick={onClose} className={`flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
                    <Globe size={18} /> Web Platform
                  </Link>
                </li>
                <li>
                  <Link to="/telegram-support" onClick={onClose} className={`flex items-center gap-2 ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
                    <Send size={18} /> Telegram Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-100"} rounded-lg p-5 border transition-colors`}>
              <h3 className={`${darkMode ? "text-gray-400" : "text-gray-500"} font-bold mb-4 uppercase text-sm md:text-base`}>
                Company
              </h3>
              <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <li><Link to="/about" onClick={onClose} className="hover:text-blue-500">About Us</Link></li>
                <li><Link to="/blog" onClick={onClose} className="hover:text-blue-500">Insights & Blog</Link></li>
                <li><Link to="/contact" onClick={onClose} className="hover:text-blue-500">Contact</Link></li>
                <li><Link to="/support" onClick={onClose} className="hover:text-blue-500">Support Center</Link></li>
                <li><Link to="/terms" onClick={onClose} className="hover:text-blue-500">Terms of Service</Link></li>
                <li><Link to="/privacy" onClick={onClose} className="hover:text-blue-500">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>

          {/* SOCIAL */}
          <div className={`mt-8 pt-6 border-t ${darkMode ? "border-zinc-800" : "border-gray-200"}`}>
            <div className="flex gap-5 justify-center flex-wrap">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Facebook size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Send size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Instagram size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Twitter size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Youtube size={22} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><MessageCircle size={22} /></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
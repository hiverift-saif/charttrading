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

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleBtnClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      className={`fixed top-[60px] left-0 w-full bg-black transition-all duration-500 ease-in-out z-40 ${
        isOpen
          ? "h-[calc(100vh-60px)] opacity-100 visible"
          : "h-0 opacity-0 invisible"
      }`}
    >
      {/* Scrollable */}
      <div className="h-full overflow-y-auto custom-scrollbar pb-10">
        <div className="p-6 md:p-8 max-w-6xl mx-auto text-sm md:text-base">

          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 font-nunito-custom">
              Navigation
            </h2>
            <div className="h-0.5 w-16 bg-blue-500"></div>
          </div>

          {/* AUTH BUTTONS */}
<div className="flex gap-2 sm:gap-3 mb-8">
  <button
    onClick={() => handleBtnClick("/signup")}
    className="
      flex items-center gap-1.5 sm:gap-2
      bg-blue-600 hover:bg-blue-700
      text-white font-semibold
      py-1.5 px-3 sm:py-2.5 sm:px-6
      rounded-md sm:rounded-lg
      text-xs sm:text-sm md:text-base
    "
  >
    <UserPlus size={14} className="sm:size-[18px]" />
    Create Account
  </button>

  <button
    onClick={() => handleBtnClick("/login")}
    className="
      flex items-center gap-1.5 sm:gap-2
      bg-orange-600 hover:bg-orange-700
      text-white font-semibold
      py-1.5 px-3 sm:py-2.5 sm:px-6
      rounded-md sm:rounded-lg
      text-xs sm:text-sm md:text-base
    "
  >
    <LogIn size={14} className="sm:size-[18px]" />
    Sign In
  </button>
</div>


          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* GET STARTED */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 uppercase text-sm md:text-base">
                Get Started
              </h3>
              <ul className="space-y-3">
                <li><Link to="/demo" onClick={onClose} className="text-gray-300 hover:text-white">Practice Account</Link></li>
                <li><Link to="/quickstart" onClick={onClose} className="text-gray-300 hover:text-white">Quick Setup</Link></li>
                <li><Link to="/guides" onClick={onClose} className="text-gray-300 hover:text-white">Beginner Guides</Link></li>
                <li><Link to="/tools" onClick={onClose} className="text-gray-300 hover:text-white">Trading Tools</Link></li>
              </ul>
            </div>

            {/* FEATURES */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 uppercase text-sm md:text-base">
                Platform Features
              </h3>
              <ul className="space-y-3">
                <li><Link to="/assets" onClick={onClose} className="text-gray-300 hover:text-white">Multiple Assets</Link></li>
                <li><Link to="/payments" onClick={onClose} className="text-gray-300 hover:text-white">Fast Payments</Link></li>
                <li><Link to="/rewards" onClick={onClose} className="text-gray-300 hover:text-white">Offers & Rewards</Link></li>
                <li><Link to="/copy-trading" onClick={onClose} className="text-gray-300 hover:text-white">Copy Trading</Link></li>
              </ul>
            </div>

            {/* ACCESS */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 uppercase text-sm md:text-base">
                Access
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/web-platform"
                    onClick={onClose}
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    <Globe size={18} /> Web Platform
                  </Link>
                </li>
                <li>
                  <Link
                    to="/telegram-support"
                    onClick={onClose}
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    <Send size={18} /> Telegram Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 uppercase text-sm md:text-base">
                Company
              </h3>
              <ul className="space-y-3">
                <li><Link to="/about" onClick={onClose} className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/blog" onClick={onClose} className="text-gray-300 hover:text-white">Insights & Blog</Link></li>
                <li><Link to="/contact" onClick={onClose} className="text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link to="/reviews" onClick={onClose} className="text-gray-300 hover:text-white">User Reviews</Link></li>
                <li><Link to="/support" onClick={onClose} className="text-gray-300 hover:text-white">Support Center</Link></li>
                <li><Link to="/terms" onClick={onClose} className="text-gray-300 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" onClick={onClose} className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/compliance" onClick={onClose} className="text-gray-300 hover:text-white">Compliance</Link></li>
              </ul>
            </div>

          </div>

          {/* SOCIAL */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="flex gap-5 justify-center flex-wrap">
              <a className="text-gray-400 hover:text-white"><Facebook size={22} /></a>
              <a className="text-gray-400 hover:text-white"><Send size={22} /></a>
              <a className="text-gray-400 hover:text-white"><Instagram size={22} /></a>
              <a className="text-gray-400 hover:text-white"><Twitter size={22} /></a>
              <a className="text-gray-400 hover:text-white"><Youtube size={22} /></a>
              <a className="text-gray-400 hover:text-white"><MessageCircle size={22} /></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

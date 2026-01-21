import React from "react";
import { Link } from "react-router-dom"; // Links active karne ke liye
import logo from "../assets/logo.png"
import {
  MessageCircle,
  Phone,
  Send,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Apple,
  Play,
  Smartphone,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useTheme();
const logoStyle = {
    filter: darkMode ? "none" : "invert(1)",
    transition: "filter 0.3s ease"
  };
  return (
    <footer className={`transition-colors duration-500 pt-12 pb-6 border-t
      ${darkMode ? "bg-[#0a1929] text-gray-400 border-gray-800" : "bg-white text-gray-600 border-gray-200"}`}>
      
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ===== Main Footer Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* ===== Platform ===== */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Platform
            </h3>
            <ul className="space-y-3">
              <li><Link to="/aboutthecompany" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>About Platform</Link></li>
              <li><Link to="/amlkycpolicy" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Legal Information</Link></li>
              <li><Link to="/privacypolicy" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Privacy Policy</Link></li>
              <li><Link to="/termsandconditions" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* ===== Resources ===== */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Resources
            </h3>
            <ul className="space-y-3">
                              <li><Link to="/Affiliates"  className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>Affiliates</Link></li>
              
              <li><Link to="/supportservice" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Help Center</Link></li>
              <li><Link to="/guides" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Trading Guide</Link></li>
              <li><Link to="/maxtradingblog" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Market Insights</Link></li>
              <li><Link to="/assets" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Available Assets</Link></li>
            </ul>
          </div>

          {/* ===== Support ===== */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Support
            </h3>
            <div className="space-y-3">
              <Link to="/contacts" className="w-full">
                <button className={`w-full px-6 py-3 rounded-lg font-medium flex items-center gap-3 transition-all active:scale-95 border mb-3
                  ${darkMode ? "bg-white text-[#0a1929] border-transparent" : "bg-gray-100 text-black border-gray-200 hover:bg-gray-200"}`}>
                  <MessageCircle size={20} /> Live Chat
                </button>
              </Link>
              <Link to="/TelegramSupportPage" className="w-full">
                <button className={`w-full px-6 py-3 rounded-lg font-medium flex items-center gap-3 transition-all active:scale-95 border
                  ${darkMode ? "bg-white text-[#0a1929] border-transparent" : "bg-gray-100 text-black border-gray-200 hover:bg-gray-200"}`}>
                  <Send size={20} /> Telegram Support
                </button>
              </Link>
            </div>
          </div>

          {/* ===== Social & Apps ===== */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Community
            </h3>
            <div className="flex gap-3 mb-6">
              {[Instagram, Send, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border
                  ${darkMode ? "bg-white text-[#0a1929] border-transparent" : "bg-gray-100 text-gray-700 border-gray-200 hover:text-blue-600"}`}>
                  <Icon size={20} />
                </a>
              ))}
            </div>

            <h4 className={`font-semibold text-lg mb-3 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Mobile App
            </h4>
            <div className="flex gap-3">
              {[Apple, Play, Smartphone].map((Icon, i) => (
                <a key={i} href="#" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-sm border
                  ${darkMode ? "bg-white text-black border-transparent" : "bg-gray-900 text-white border-transparent"}`}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className={`border-t pt-8 transition-colors ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm space-y-1">
                <p className={`font-medium transition-colors ${darkMode ? "text-white" : "text-black"}`}>

<img src={logo} alt="Logo" className="h-16 w-auto object-contain mb-4" style={logoStyle} />                </p>
                <p>Registration No: 2025-XG-918</p>
                <p className="mt-3">Business Center Tower</p>
                <p>Financial District</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-sm leading-relaxed mb-4">
                <span className={`font-semibold transition-colors ${darkMode ? "text-white" : "text-black"}`}>
                  Risk Warning:
                </span>{" "}
                Trading digital and financial instruments involves substantial
                risk and may result in loss of invested capital.
              </p>
              <div className="flex gap-4 text-xs font-bold uppercase">
                {/* <Link to="/refundpolicy" className="hover:underline">Refund Policy</Link> */}
                <Link to="/paymentpolicy" className="hover:underline">Payment Policy</Link>
                {/* <Link to="/riskstatement" className="hover:underline">Risk Statement</Link> */}
              </div>
            </div>
          </div>

          <div className="text-sm text-center lg:text-left font-medium">
            © 2022–2026 MaxTrading. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
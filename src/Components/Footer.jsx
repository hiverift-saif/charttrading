import React from "react";
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
import { useTheme } from "../context/ThemeContext"; // Context Import

const Footer = () => {
  const { darkMode } = useTheme(); // Theme Hook

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
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>About Platform</a></li>
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Legal Information</a></li>
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Privacy Policy</a></li>
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Terms & Conditions</a></li>
            </ul>
          </div>

          {/* ===== Resources ===== */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Resources
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Help Center</a></li>
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Trading Guide</a></li>
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Market Insights</a></li>
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Economic Events</a></li>
              <li><a href="#" className={`hover:underline transition-colors ${darkMode ? "hover:text-white" : "hover:text-blue-600"}`}>Available Assets</a></li>
            </ul>
          </div>

          {/* ===== Support ===== */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Support
            </h3>
            <div className="space-y-3">
              {[
                { icon: <MessageCircle size={20} />, text: "Live Chat" },
                { icon: <Phone size={20} />, text: "Request Call" },
                { icon: <Send size={20} />, text: "Telegram Support" },
                { icon: <Mail size={20} />, text: "Email Support" }
              ].map((btn, i) => (
                <button 
                  key={i} 
                  className={`w-full px-6 py-3 rounded-lg font-medium flex items-center gap-3 transition-all active:scale-95 border
                    ${darkMode 
                      ? "bg-white text-[#0a1929] border-transparent" 
                      : "bg-gray-100 text-black border-gray-200 hover:bg-gray-200"}`}
                >
                  {btn.icon} {btn.text}
                </button>
              ))}
            </div>
          </div>

          {/* ===== Social & Apps ===== */}
          <div>
            <h3 className={`font-semibold text-lg mb-4 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
              Community
            </h3>
            <div className="flex gap-3 mb-6">
              {[Instagram, Send, Facebook, Youtube].map((Icon, i) => (
                <a key={i} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border
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
                <a key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-sm border
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

            {/* Language & Address */}
            <div>
              <div className="text-sm space-y-1">
                <p className={`font-medium transition-colors ${darkMode ? "text-white" : "text-black"}`}>
                  Global Trading Group Ltd.
                </p>
                <p>Registration No: 2025-XG-918</p>
                <p className="mt-3">Business Center Tower</p>
                <p>Financial District</p>
                <p>International Zone</p>
              </div>
            </div>

            {/* Risk Disclaimer */}
            <div className="lg:col-span-2">
              <p className="text-sm leading-relaxed mb-4">
                <span className={`font-semibold transition-colors ${darkMode ? "text-white" : "text-black"}`}>
                  Risk Warning:
                </span>{" "}
                Trading digital and financial instruments involves substantial
                risk and may result in loss of invested capital. This platform
                is intended for educational and informational purposes only.
                Please ensure you fully understand the risks before trading.
              </p>

              <p className="text-sm">
                Support:
                <a href="mailto:support@yourplatform.com" className={`ml-1 hover:underline transition-colors ${darkMode ? "text-white" : "text-blue-600"}`}>
                  support@yourplatform.com
                </a>
                {" | "}
                <a href="tel:+1234567890" className={`hover:underline transition-colors ${darkMode ? "text-white" : "text-blue-600"}`}>
                  +1 234 567 890
                </a>
              </p>
            </div>
          </div>

          <div className="text-sm text-center lg:text-left font-medium">
            © 2022–2025 YourPlatform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
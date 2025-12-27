import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  Send,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  ChevronDown,
  Apple,
  Play,
  Smartphone,
} from "lucide-react";

const Footer = () => {
 

  return (
    <footer className="bg-[#0a1929] text-gray-400 pt-12 pb-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ===== Main Footer Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* ===== Platform ===== */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white">About Platform</a></li>
              <li><a href="#" className="hover:text-white">Legal Information</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* ===== Resources ===== */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Trading Guide</a></li>
              <li><a href="#" className="hover:text-white">Market Insights</a></li>
              <li><a href="#" className="hover:text-white">Economic Events</a></li>
              <li><a href="#" className="hover:text-white">Available Assets</a></li>
            </ul>
          </div>

          {/* ===== Support ===== */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <div className="space-y-3">
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium flex items-center gap-3">
                <MessageCircle size={20} /> Live Chat
              </button>
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium flex items-center gap-3">
                <Phone size={20} /> Request Call
              </button>
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium flex items-center gap-3">
                <Send size={20} /> Telegram Support
              </button>
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium flex items-center gap-3">
                <Mail size={20} /> Email Support
              </button>
            </div>
          </div>

          {/* ===== Social & Apps ===== */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Community</h3>
            <div className="flex gap-3 mb-6">
              <a className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Instagram className="text-[#0a1929]" />
              </a>
              <a className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Send className="text-[#0a1929]" />
              </a>
              <a className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Facebook className="text-[#0a1929]" />
              </a>
              <a className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Youtube className="text-[#0a1929]" />
              </a>
            </div>

            <h4 className="text-white font-semibold text-lg mb-3">Mobile App</h4>
            <div className="flex gap-3">
              <a className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Apple className="text-black" />
              </a>
              <a className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Play className="text-black" />
              </a>
              <a className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Smartphone className="text-black" />
              </a>
            </div>
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* Language & Address */}
            <div>
       

              <div className="text-sm space-y-1">
                <p className="text-white font-medium">Global Trading Group Ltd.</p>
                <p>Registration No: 2025-XG-918</p>
                <p className="mt-3">Business Center Tower</p>
                <p>Financial District</p>
                <p>International Zone</p>
              </div>
            </div>

            {/* Risk Disclaimer */}
            <div className="lg:col-span-2">
              <p className="text-sm leading-relaxed mb-4">
                <span className="text-white font-semibold">Risk Warning:</span>{" "}
                Trading digital and financial instruments involves substantial
                risk and may result in loss of invested capital. This platform
                is intended for educational and informational purposes only.
                Please ensure you fully understand the risks before trading.
              </p>

              <p className="text-sm">
                Support:
                <a href="mailto:support@yourplatform.com" className="text-white ml-1 hover:underline">
                  support@yourplatform.com
                </a>
                {" | "}
                <a href="tel:+1234567890" className="text-white hover:underline">
                  +1 234 567 890
                </a>
              </p>
            </div>
          </div>

          <div className="text-sm text-center lg:text-left">
            © 2022–2025 YourPlatform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

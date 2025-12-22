import React, { useState } from 'react';
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
 Smartphone 
} from 'lucide-react';



const Footer = () => {
  const [language, setLanguage] = useState('english');

  return (
    <footer className="bg-[#0a1929] text-gray-400 pt-12 pb-6">
      {/* Chat Widget */}
  

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">About company</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Client agreement</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">For affiliates</h4>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-black">💡</span>
                </div>
                <span className="text-white font-bold text-lg">CLEVERAFF</span>
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Education</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Account types</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Strategies</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Economic calendar</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Trading sessions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Asset catalog</a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact us</h3>
            <div className="space-y-3">
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                <MessageCircle size={20} />
                <span>Online chat</span>
              </button>
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                <Phone size={20} />
                <span>Call</span>
              </button>
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                <Send size={20} />
                <span>Telegram Bot</span>
              </button>
              <button className="w-full bg-white text-[#0a1929] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-3">
                <Mail size={20} />
                <span>Send message</span>
              </button>
            </div>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Follow us</h3>
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Instagram size={24} className="text-[#0a1929]" />
              </a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Send size={24} className="text-[#0a1929]" />
              </a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Facebook size={24} className="text-[#0a1929]" />
              </a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Youtube size={24} className="text-[#0a1929]" />
              </a>
            </div>

            <h4 className="text-white font-semibold text-lg mb-3">Download app</h4>
<div className="flex gap-3">
  {/* Apple */}
  <a
    href="#"
    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
  >
    <Apple className="w-6 h-6 text-black" />
  </a>

  {/* Play / Video */}
  <a
    href="#"
    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
  >
    <Play className="w-6 h-6 text-black" />
  </a>

  {/* Mobile */}
  <a
    href="#"
    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
  >
    <Smartphone className="w-6 h-6 text-black" />
  </a>
</div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Language Selector & Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇬🇧</span>
                <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                  <span>Language: {language}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="text-sm space-y-1">
                <p className="text-white">Binarium Limited</p>
                <p>1599 CTD 2016</p>
                <p className="mt-3">Suite 305 Griffin</p>
                <p>Corporate Centre P.O.</p>
                <p>Box1510</p>
                <p className="mt-3">Beachmont, Kingstown</p>
                <p>St. Vincent and the</p>
                <p>Grenadines</p>
              </div>
            </div>

            {/* Risk Disclosure */}
            <div className="lg:col-span-2">
              <p className="text-sm leading-relaxed mb-4">
                <span className="text-white font-semibold">Risk disclosure.</span> Trading operations made on Binarium platform involve a significant risk of loss of a capital. Please, read carefully the general trading conditions on our website before making any investments. You are given the right of personal, non-commercial use of the information located on this site. The right to use is limited, not exclusive. The company's activities are conducted outside the Russian Federation. The place of conclusion of the agreement is the Republic of Cyprus.
              </p>
              
              <p className="text-sm">
                For more information, please contact customer support:{' '}
                <a href="mailto:support@binarium.com" className="text-white hover:underline">
                  support@binarium.com
                </a>
                ,{' '}
                <a href="tel:+35722052784" className="text-white hover:underline">
                  +357(22)052784
                </a>
                ,{' '}
                <a href="tel:+44203695705" className="text-white hover:underline">
                  +44(203)6957705
                </a>
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-center lg:text-left">
            <p>©2012–2025 Binarium</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
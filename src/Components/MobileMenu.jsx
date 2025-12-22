import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Send, Globe, MessageCircle, UserPlus, LogIn  } from "lucide-react";
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
      {/* Scrollable Container */}
      <div className="h-full overflow-y-auto custom-scrollbar pb-10">
        
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-white text-3xl font-bold mb-2 font-nunito-custom">Menu</h2>
            <div className="h-0.5 w-16 bg-blue-500"></div>
          </div>

      <div className="flex gap-3 mb-8">
  {/* Registration Button */}
  <button
    onClick={() => handleBtnClick('/signup')}
    className="
      flex items-center gap-2
      bg-blue-600 hover:bg-blue-700
      text-white font-semibold
      py-2.5 px-6 rounded-lg
      transition-colors
      text-sm font-nunito-custom
    "
  >
    <UserPlus size={18} />
    <span>Registration</span>
  </button>

  {/* Login Button */}
  <button
    onClick={() => handleBtnClick('/Login')}
    className="
      flex items-center gap-2
      bg-orange-600 hover:bg-orange-700
      text-white font-semibold
      py-2.5 px-6 rounded-lg
      transition-colors
      text-sm font-nunito-custom
    "
  >
    <LogIn size={18} />
    <span>Log In</span>
  </button>
</div>

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* HOW IT WORKS */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 text-sm uppercase font-nunito-custom">How it works</h3>
              <ul className="space-y-3">
                <li><Link to="/Freedemo" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Free demo</Link></li>
                <li><Link to="/Quickstart" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Quick start</Link></li>
                <li><Link to="/Education" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Education</Link></li>
                <li><Link to="/learning-tools" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Learning Tools</Link></li>
              </ul>
            </div>

            {/* WHY POCKET OPTION */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 text-sm uppercase font-nunito-custom">Why Pocket Option</h3>
              <ul className="space-y-3">
                <li><Link to="/tradinginstruments" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">100+ trading instruments</Link></li>
                <li><Link to="/seamless-trading" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Instant Deposits & Withdrawals</Link></li>
                <li><Link to="/PromoBonuses" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Promo & Bonuses</Link></li>
                <li><Link to="/SocialTrading" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Social Trading</Link></li>
              </ul>
            </div>

            {/* PLATFORMS */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 text-sm uppercase font-nunito-custom">Platforms</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/platform-designed" onClick={onClose} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-roboto">
                    <Globe size={18} /> Web App
                  </Link>
                </li>
                <li>
                  <Link to="/Contacts" onClick={onClose} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-roboto">
                    <Send size={18} /> Telegram bot
                  </Link>
                </li>
              </ul>
            </div>

            {/* ABOUT US */}
            <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <h3 className="text-gray-400 font-bold mb-4 text-sm uppercase font-nunito-custom">About us</h3>
              <ul className="space-y-3">
                <li><Link to="/AbouttheCompany" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">About the Company</Link></li>
                <li><Link to="/MaxtradingBlog" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Pocket Option Blog</Link></li>
                <li><Link to="/Contacts" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Contacts</Link></li>
                <li><Link to="/Reviews" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Reviews</Link></li>
                <li><Link to="/SupportService" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Support Service</Link></li>
                <li><Link to="/TermsandConditions" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Terms and Conditions</Link></li>
                <li><Link to="/AMLKYCpolicy" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">AML and KYC policy</Link></li>
                <li><Link to="/Privacypolicy" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Privacy policy</Link></li>
                <li><Link to="/Paymentpolicy" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Payment policy</Link></li>
                <li><Link to="/Informationdisclosure" onClick={onClose} className="text-gray-300 hover:text-white transition-colors text-sm font-roboto">Information disclosure</Link></li>
              </ul>
            </div>

          </div>
          
          {/* SOCIAL ICONS */}
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <div className="flex gap-5 justify-center flex-wrap">
              <a href="#" onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><Facebook size={22} /></a>
              <a href="#" onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><Send size={22} /></a>
              <a href="#" onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><Instagram size={22} /></a>
              <a href="#" onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><Twitter size={22} /></a>
              <a href="#" onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><Youtube size={22} /></a>
              <a href="#" onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><MessageCircle size={22} /></a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
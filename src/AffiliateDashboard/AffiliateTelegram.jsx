import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateTelegram() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Your Telegram Bot Username
  const botUsername = "Tradee_probot";

  const handleLinkBot = () => {
    window.open(`https://t.me/${botUsername}`, "_blank");
  };

  return (
      <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>

        {/* Linked Accounts Section */}
        <div className={`rounded-xl border p-6 shadow-lg transition-all duration-500
          ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
          <h4 className={`text-xs md:text-sm font-black uppercase tracking-[2px] mb-4 italic 
            ${darkMode ? "text-white" : "text-slate-800"}`}>
            Linked Telegram Accounts
          </h4>
          <div className="text-center py-8 text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-60">
            No Data Found
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`rounded-xl border p-6 shadow-lg transition-all duration-500
          ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
          <h4 className={`text-xs md:text-sm font-black uppercase tracking-[2px] mb-6 italic 
            ${darkMode ? "text-white" : "text-slate-800"}`}>
            How It Works
          </h4>

          <div className="space-y-4">
            {[
              'Click the "Link Telegram Account" button to start the bot.',
              'Use the /start command to start the Bot.',
              'Use the /help command to get list of commands.',
              'Use /todaystats to get Today Stats summary.',
              'Use /yesterdaystats for yesterday summary.',
              'Retrieve user details by typing a valid ID like: id 158 or 158.'
            ].map((text, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="w-8 h-8 bg-[#f99616]/10 border border-[#f99616]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#f99616] font-black text-xs">{index + 1}</span>
                </div>
                <p className={`text-xs font-bold leading-relaxed pt-1 transition-colors uppercase tracking-tight 
                  ${darkMode ? "text-gray-400 group-hover:text-white" : "text-slate-500 group-hover:text-slate-900"}`}>
                  {text}
                </p>
              </div>
            ))}

            <button
              onClick={handleLinkBot}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 py-2 w-full sm:w-auto rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#f99616] hover:bg-[#e88914] text-white mt-6 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <Send className="w-4 h-4 mr-2" aria-hidden="true" />
              Link Telegram Account
            </button>
          </div>
        </div>

        {/* Commissions Status Section */}
        <div className={`rounded-xl border p-6 shadow-lg transition-all duration-500
          ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
          <h4 className={`text-xs md:text-sm font-black uppercase tracking-[2px] mb-4 italic 
            ${darkMode ? "text-white" : "text-slate-800"}`}>
            Telegram Commissions Status
          </h4>
          <div className="text-center py-8 text-gray-500 text-[10px] font-bold uppercase tracking-widest opacity-60">
            No Data Found
          </div>
        </div>

      </div>
  );
}

export default AffiliateTelegram;
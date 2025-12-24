import React from 'react';
import { useSelector } from 'react-redux';
import { User } from 'lucide-react';

// Props mein setActiveTab receive karein
const Header = ({ setActiveTab }) => {
  const { balance } = useSelector((state) => state.trading);

  return (
    <header className="w-full h-16 border-b border-gray-800 flex items-center justify-between px-4 bg-[#1b1817] z-50">
      
      {/* LEFT: Logo - Click karne par Chart open hoga */}
      <div className="flex items-center gap-4">
        <div 
          onClick={() => setActiveTab('chart')} 
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">
            MAX<span className="text-blue-500">TRADING</span>
          </h1>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Deposit Button */}
        <button 
          onClick={() => setActiveTab('deposit')}
          className="bg-blue-600 px-4 md:px-6 py-2 rounded-lg font-bold text-white text-xs md:text-sm hover:bg-blue-500 transition shadow-lg active:scale-95"
        >
          Deposit
        </button>

        {/* Account Info */}
        <div className="flex flex-col items-end mr-1">
            <span className="text-[9px] md:text-[10px] text-green-500 font-bold uppercase tracking-widest">Live Account</span>
            <span className="text-white font-black text-sm md:text-lg leading-tight">
              ${balance?.toLocaleString() || "0.00"}
            </span>
        </div>

        {/* User Profile */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 cursor-pointer hover:bg-gray-700 border border-gray-700 transition-colors"
        >
            <User size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;
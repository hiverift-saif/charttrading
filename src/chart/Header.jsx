import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChartType } from '../redux/tradingSlice'; // Import action
import { ChevronDown, BarChart2, Activity, User } from 'lucide-react'; // Activity for Line chart

const Header = () => {
  const dispatch = useDispatch();
  const { balance, currentAsset, payoutPercentage, chartType } = useSelector((state) => state.trading);

  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4 bg-[#1b1817]">
      
      {/* Left: Asset & Chart Types */}
      <div className="flex items-center gap-4">
    
        
    
      </div>

      {/* Right: Balance */}
      <div className="flex items-center gap-4">
        <button className="bg-[#2c2d30] px-5 py-2 rounded font-bold text-white text-sm hover:bg-[#3d3e42] transition">
          Deposit
        </button>
        <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Live Account</span>
            <span className="text-white font-bold text-lg">${balance.toLocaleString()}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 cursor-pointer hover:bg-gray-700 border border-gray-700">
            <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
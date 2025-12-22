import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTradeAmount } from '../redux/tradingSlice';
import { TrendingUp, TrendingDown, Clock, Plus, Minus, ChevronUp } from 'lucide-react';

const MobileControls = () => {
  const dispatch = useDispatch();
  const { tradeAmount, payoutPercentage, tradeTime } = useSelector((state) => state.trading);
  const [showSettings, setShowSettings] = useState(false); // Toggle extra settings

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1e222d] border-t border-gray-800 z-50 flex flex-col pb-safe">
      
      {/* Expandable Settings (Time/Amount details) */}
      {showSettings && (
        <div className="bg-[#2a2e39] p-4 animate-slide-up border-b border-gray-700">
           <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">Amount</span>
              <div className="flex items-center gap-3">
                 <button onClick={() => dispatch(setTradeAmount(tradeAmount > 1 ? tradeAmount - 1 : 1))} className="p-2 bg-gray-700 rounded"><Minus size={16}/></button>
                 <span className="text-xl font-bold text-white">${tradeAmount}</span>
                 <button onClick={() => dispatch(setTradeAmount(tradeAmount + 1))} className="p-2 bg-gray-700 rounded"><Plus size={16}/></button>
              </div>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Time</span>
              <span className="text-white font-bold">{tradeTime}</span>
           </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <div className="flex items-center px-2 py-2 gap-2 h-16">
        
        {/* Toggle Settings Button */}
        <div 
            onClick={() => setShowSettings(!showSettings)}
            className="flex flex-col items-center justify-center bg-[#2a2e39] rounded px-2 py-1 h-full min-w-[70px] cursor-pointer"
        >
            <div className="flex items-center gap-1 text-white font-bold text-sm">
                ${tradeAmount} <ChevronUp size={14} className={`transition ${showSettings ? 'rotate-180' : ''}`}/>
            </div>
            <div className="text-[10px] text-gray-400">{tradeTime}</div>
        </div>

        {/* Profit Info */}
        <div className="flex flex-col items-center justify-center px-1 min-w-[50px]">
             <span className="text-green-500 font-bold text-xs">{payoutPercentage}%</span>
        </div>

        {/* ACTION BUTTONS (Big) */}
        <button className="flex-1 bg-[#2cac40] active:bg-[#259136] text-white h-full rounded flex items-center justify-center gap-1 shadow-lg transition-transform active:scale-95">
            <TrendingUp size={20} />
            <span className="font-bold uppercase text-sm">Call</span>
        </button>

        <button className="flex-1 bg-[#db4931] active:bg-[#b83d29] text-white h-full rounded flex items-center justify-center gap-1 shadow-lg transition-transform active:scale-95">
            <TrendingDown size={20} />
            <span className="font-bold uppercase text-sm">Put</span>
        </button>

      </div>
    </div>
  );
};

export default MobileControls;
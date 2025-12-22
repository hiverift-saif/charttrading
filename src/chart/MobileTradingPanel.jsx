import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTradeAmount } from '../../redux/tradingSlice';
import { ChevronUp, Minus, Plus, Info, Send, History } from 'lucide-react';

const MobileTradingPanel = () => {
  const dispatch = useDispatch();
  const { currentAsset, payoutPercentage, tradeAmount, balance } = useSelector(state => state.trading);

  const profit = (tradeAmount * (payoutPercentage / 100)).toFixed(2);
  const totalReturn = (Number(tradeAmount) + Number(profit)).toFixed(2);

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-[#161413] border-t-2 border-gray-800 shadow-2xl">
      
      {/* Collapsible Top Summary */}
      <div 
        onClick={() => setShowDetails(!showDetails)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer bg-[#1e1c1b] border-b border-gray-800"
      >
        <div className="flex items-center gap-3">
          <div className="text-sm font-bold text-white truncate max-w-32">
            {currentAsset}
          </div>
          <span className="text-green-500 text-sm font-bold">+{payoutPercentage}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">${tradeAmount}</span>
          <ChevronUp size={18} className={`text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="p-4 space-y-4 bg-[#1b1817] animate-in slide-in-from-bottom duration-300">
          
          {/* Time Selector */}
          <div className="bg-[#1e1c1b] rounded-lg overflow-hidden border border-gray-800">
            <div className="p-3 text-center border-b border-gray-800">
              <span className="text-xs text-gray-400 uppercase font-bold block mb-1">Time</span>
              <span className="text-xl font-bold text-white">00:01:00</span>
            </div>
            <div className="flex">
              <button className="flex-1 py-3 hover:bg-white/10 active:bg-gray-700 border-r border-gray-800">
                <Minus size={16} />
              </button>
              <button className="flex-1 py-3 hover:bg-white/10 active:bg-gray-700">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Amount Selector */}
          <div className="bg-[#1e1c1b] rounded-lg overflow-hidden border border-gray-800">
            <div className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-xs text-gray-400 uppercase font-bold">Amount</span>
                <Info size={12} className="text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-white">
                $<span className="text-green-500">{tradeAmount}</span>
              </div>
            </div>
            <div className="flex border-t border-gray-800">
              <button 
                onClick={() => dispatch(setTradeAmount(Math.max(1, tradeAmount - 1)))}
                className="flex-1 py-4 hover:bg-white/10 active:bg-gray-700 border-r border-gray-800"
              >
                <Minus size={18} />
              </button>
              <button 
                onClick={() => dispatch(setTradeAmount(tradeAmount + 1))}
                className="flex-1 py-4 hover:bg-white/10 active:bg-gray-700"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Payout Summary */}
          <div className="bg-[#1e1c1b]/50 rounded-lg p-4 space-y-2 border border-gray-800">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Payout:</span>
              <span className="text-white font-bold">${totalReturn}</span>
            </div>
            <div className="text-center text-3xl font-black text-green-500">
              +{payoutPercentage}%
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Profit:</span>
              <span className="text-green-500 font-bold">+${profit}</span>
            </div>
          </div>
        </div>
      )}

      {/* Buy / Sell Buttons - Always Visible */}
      <div className="flex gap-2 p-3 bg-[#161413]">
        <button className="flex-1 bg-white text-black py-5 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 active:scale-95 transition shadow-lg">
          <Send size={22} className="-rotate-45" />
          <span>Buy</span>
        </button>
        <button className="flex-1 bg-white text-black py-5 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 active:scale-95 transition shadow-lg">
          <History size={22} className="scale-x-[-1]" />
          <span>Sell</span>
        </button>
      </div>

      {/* Safe Area Bottom Padding for iPhone */}
      <div className="pb-safe" />
    </div>
  );
};

export default MobileTradingPanel;
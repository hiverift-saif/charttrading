import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addOpenTrade, 
  setTradeAmount, 
  setBalance,           // ← Added
  updateDemoBalance,     // ← Added
} from '../redux/tradingSlice';
import { TrendingUp, TrendingDown, Plus, Minus, X, Loader2, Zap } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';

const MobileControls = () => {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  // Added accountType and demoBalance
  const { 
    tradeAmount, 
    payoutPercentage, 
    currentAsset, 
    currentPrice, 
    balance, 
    demoBalance,
    accountType 
  } = useSelector((state) => state.trading);

  const [isPlacingTrade, setIsPlacingTrade] = useState(false);
  const [placingDirection, setPlacingDirection] = useState('');
  const [tradeTime, setTradeTime] = useState(1);
  
  const token = localStorage.getItem('access_token');
  const profit = (tradeAmount * (payoutPercentage / 100)).toFixed(2);

  // Current balance based on account type
  const currentBalance = accountType === 'demo' ? demoBalance : balance;

  const handleTrade = async (direction) => {
    if (isPlacingTrade) return;
    if (!token) return alert('Please login first!');
    if (currentBalance < tradeAmount) return alert('Insufficient Balance!');

    const apiDirection = direction === 'buy' ? 'up' : 'down';

    setIsPlacingTrade(true);
    setPlacingDirection(direction);

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/trade/open`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          asset: currentAsset?.displayName?.split('/')[0] || 'BTC',
          amount: Number(tradeAmount),
          direction: apiDirection,
          duration: tradeTime,
          type: accountType === 'demo' ? "demoBalance" : "realBalance" // ← Important: correct type
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Add to open trades
        dispatch(addOpenTrade({
          id: result.tradeId || Date.now(),
          symbol: currentAsset?.displayName?.split('/')[0],
          quantity: tradeAmount,
          type: direction, 
          entryPrice: Number(currentPrice || 0),
          profitPotential: profit,
          expiryTime: new Date(Date.now() + tradeTime * 60000).toISOString(),
        }));

        // CRITICAL: Update balance locally immediately
        const newBalance = currentBalance - tradeAmount;

        if (accountType === 'demo') {
          dispatch(updateDemoBalance(newBalance));
        } else {
          dispatch(setBalance(newBalance));
        }

        setIsOpen(false); // Close panel on success
      } else {
        alert(result.message || 'Trade failed!');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setIsPlacingTrade(false);
      setPlacingDirection('');
    }
  };

  return (
    <div className="lg:hidden">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onPointerDown={() => setIsOpen(true)}
          className="fixed bottom-8 right-6 w-12 h-12 bg-gradient-to-tr from-[#f99616] to-[#ffae34] text-black rounded-full shadow-[0_8px_20px_rgba(249,150,22,0.4)] z-[9999] flex items-center justify-center active:scale-90 transition-all border-2 border-white/20"
        >
          <Zap size={20} fill="currentColor" />
        </button>
      )}

      {/* Mobile Trade Panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9998]" onClick={() => setIsOpen(false)} />
          
          <div className={`fixed bottom-6 left-4 right-4 rounded-[24px] border transition-all duration-300 z-[9999] shadow-2xl animate-in slide-in-from-bottom-5
            ${darkMode ? "bg-[#121212]/95 border-white/10" : "bg-white/95 border-gray-200"}`}>
            
            <div className="flex justify-between items-center px-5 py-3 border-b border-white/5">
              <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-500">Quick Execute</span>
              <button onClick={() => setIsOpen(false)} className="p-1 text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex gap-3">
                {/* Amount */}
                <div className={`flex-1 p-2 rounded-2xl border ${darkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                  <p className="text-[8px] font-bold text-gray-400 uppercase text-center mb-1">Amount</p>
                  <div className="flex items-center justify-between px-1">
                    <button onPointerDown={() => dispatch(setTradeAmount(Math.max(1, tradeAmount - 1)))} className="text-[#f99616]">
                      <Minus size={14}/>
                    </button>
                    <span className="font-black text-sm">${tradeAmount}</span>
                    <button onPointerDown={() => dispatch(setTradeAmount(tradeAmount + 1))} className="text-[#f99616]">
                      <Plus size={14}/>
                    </button>
                  </div>
                </div>

                {/* Time */}
                <div className={`flex-1 p-2 rounded-2xl border ${darkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                  <p className="text-[8px] font-bold text-gray-400 uppercase text-center mb-1">Time</p>
                  <div className="flex items-center justify-between px-1">
                    <button onPointerDown={() => setTradeTime(Math.max(1, tradeTime - 1))} className="text-blue-400">
                      <Minus size={14}/>
                    </button>
                    <span className="font-black text-sm">{tradeTime}m</span>
                    <button onPointerDown={() => setTradeTime(tradeTime + 1)} className="text-blue-400">
                      <Plus size={14}/>
                    </button>
                  </div>
                </div>
              </div>

              {/* Buy / Sell Buttons */}
              <div className="flex gap-3">
                <button
                  onPointerDown={() => handleTrade('buy')}
                  disabled={isPlacingTrade || currentBalance < tradeAmount}
                  className="flex-1 h-14 bg-[#00c853] hover:bg-[#00e676] disabled:opacity-60 text-white rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-green-500/20 font-black uppercase text-xs tracking-wider"
                >
                  {isPlacingTrade && placingDirection === 'buy' ? <Loader2 className="animate-spin" size={18}/> : <><TrendingUp size={18} strokeWidth={3}/> Call</>}
                </button>

                <button
                  onPointerDown={() => handleTrade('sell')}
                  disabled={isPlacingTrade || currentBalance < tradeAmount}
                  className="flex-1 h-14 bg-[#ff3d00] hover:bg-[#ff6e40] disabled:opacity-60 text-white rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-red-500/20 font-black uppercase text-xs tracking-wider"
                >
                  {isPlacingTrade && placingDirection === 'sell' ? <Loader2 className="animate-spin" size={18}/> : <><TrendingDown size={18} strokeWidth={3}/> Put</>}
                </button>
              </div>

              {/* Profit & Payout Info */}
              <div className="flex justify-between items-center pt-1 px-1">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  Profit: <span className="text-green-500">+${profit}</span>
                </span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  Payout: {payoutPercentage}%
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileControls;
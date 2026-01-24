import React, { useState, useRef } from 'react';
import { ChevronDown, Info, Minus, Plus, Send, History, X, Delete } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addOpenTrade, setBalance, updateDemoBalance, setSyncing } from '../redux/tradingSlice'; 
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';

const TradePanel = () => {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  
  const { 
    currentAsset, 
    currentPrice, 
    payoutPercentage, 
    balance, 
    demoBalance, 
    accountType 
  } = useSelector((state) => state.trading);

  const [amount, setAmount] = useState(10);
  const [time, setTime] = useState('00:01:00');
  const [showKeypad, setShowKeypad] = useState(false);
  const [isPlacingTrade, setIsPlacingTrade] = useState(false);
  const [placingDirection, setPlacingDirection] = useState(''); 
  const [tradeError, setTradeError] = useState('');

  const tradeLock = useRef(false);
  const token = localStorage.getItem('access_token');

  const profit = (amount * (payoutPercentage / 100)).toFixed(2);
  const totalReturn = (Number(amount) + Number(profit)).toFixed(2);

  const getSafeBalance = () => {
    return accountType === 'demo' ? Number(demoBalance) : Number(balance);
  };

  const placeTrade = async (direction) => {
    if (tradeLock.current || isPlacingTrade) return;
    
    const currentBal = getSafeBalance();
    if (currentBal < amount) {
      setTradeError('Insufficient Balance!');
      return;
    }

    dispatch(setSyncing(true)); 

    const apiDirection = direction === 'buy' ? 'up' : 'down';
    if (!token) {
      setTradeError('Session expired. Please login again.');
      dispatch(setSyncing(false));
      return;
    }

    tradeLock.current = true;
    setIsPlacingTrade(true);
    setPlacingDirection(direction); 
    setTradeError('');

    const tradeData = {
      asset: currentAsset?.displayName?.split('/')[0] || 'BTC',
      amount: Number(amount),
      direction: apiDirection,
      type: accountType === 'demo' ? "demo" : "realBalance"
    };

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/trade/open`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tradeData),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(addOpenTrade({
          id: result.tradeId || Date.now(),
          symbol: tradeData.asset,
          quantity: tradeData.amount,
          type: direction, 
          entryPrice: Number(currentPrice || 0),
          profitPotential: profit,
          expiryTime: new Date(Date.now() + 60000).toISOString(),
        }));

        const newBalance = currentBal - amount;
        if (accountType === 'demo') {
          dispatch(updateDemoBalance(newBalance));
        } else {
          dispatch(setBalance(newBalance));
        }

        setShowKeypad(false);

        setTimeout(() => {
          dispatch(setSyncing(false));
          tradeLock.current = false;
        }, 7000);

      } else {
        setTradeError(result.message || 'Trade failed.');
        dispatch(setSyncing(false));
        tradeLock.current = false;
      }
    } catch (err) {
      setTradeError('Network error. Please try again.');
      dispatch(setSyncing(false));
      tradeLock.current = false;
    } finally {
      setIsPlacingTrade(false);
      setPlacingDirection('');
    }
  };

  const handleKeyClick = (val) => {
    if (val === 'del') {
      setAmount((prev) => {
        const str = prev.toString();
        return str.length > 1 ? Number(str.slice(0, -1)) || 10 : 10;
      });
    } else if (val === '.') {
      setAmount((prev) => {
        if (prev.toString().includes('.')) return prev;
        return prev + '.';
      });
    } else {
      setAmount((prev) => Number(prev === 10 ? val : prev.toString() + val));
    }
  };

  return (
    <div className={`flex-1 flex flex-col p-3 gap-3 overflow-y-auto no-scrollbar relative h-full transition-colors duration-500
      ${darkMode ? "bg-black" : "bg-white"}`}>
      
      <div className={`flex items-center justify-between p-3 rounded-lg border transition-colors
        ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
        <div className="flex items-center gap-2">
          <img src={currentAsset?.icon || 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'} alt="asset" className="w-6 h-6 rounded-full object-cover" />
          <div>
            <h5 className={`text-sm font-bold uppercase transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}>
              {currentAsset?.displayName || 'BTC/USD'}
            </h5>
            <small className="text-[10px] text-gray-500 uppercase">
              FT • <span className="text-green-500 font-bold">+{payoutPercentage}%</span>
            </small>
          </div>
        </div>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      <div className={`border rounded-lg overflow-hidden transition-colors ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className={`p-3 text-center border-b transition-colors ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-1">Time</span>
          <span className={`text-xl font-bold tracking-widest transition-colors ${darkMode ? "text-white" : "text-black"}`}>{time}</span>
        </div>
        <div className="flex">
          <button className={`flex-1 py-2 flex justify-center border-r transition-colors ${darkMode ? "border-gray-800 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"}`}><Minus size={16} /></button>
          <button className={`flex-1 py-2 flex justify-center transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}><Plus size={16} /></button>
        </div>
      </div>

      {/* Amount Control Container */}
      <div className="relative">
        <div className={`border rounded-lg overflow-hidden transition-all ${showKeypad ? 'border-green-500 ring-1 ring-green-500/20' : darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="p-3 cursor-pointer text-center" onClick={() => setShowKeypad(!showKeypad)}>
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Amount</span>
              <Info size={12} className="text-gray-400" />
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-green-500">$</span>
              <span className={`text-xl font-bold ml-1 transition-colors ${darkMode ? "text-white" : "text-black"}`}>{amount}</span>
            </div>
          </div>
          <div className={`flex border-t transition-colors ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
            <button onClick={() => setAmount(prev => Math.max(1, prev - 1))} className={`flex-1 py-3 flex justify-center border-r transition-colors ${darkMode ? "border-gray-800 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"}`}>
              <Minus size={18} />
            </button>
            <button onClick={() => setAmount(prev => prev + 1)} className={`flex-1 py-3 flex justify-center transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}>
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* 🚀 RESPONSIVE KEYPAD: Popover for Laptop, Bottom Sheet for Mobile */}
{showKeypad && (
  <div className={`fixed inset-x-0 bottom-0 sm:absolute sm:inset-x-0 sm:bottom-auto sm:top-full sm:mt-1 border-t sm:border border-green-500/30 p-2 rounded-t-xl sm:rounded-xl shadow-2xl z-50 transition-colors animate-in zoom-in-95 duration-200 ${darkMode ? "bg-[#1e1c1b]" : "bg-white"}`}>
    {/* Minimal Header */}
    <div className="flex justify-between items-center mb-1.5 px-1">
      <span className={`text-[8px] font-black uppercase tracking-[2px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Stake Terminal</span>
      <X size={14} className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setShowKeypad(false)} />
    </div>
    
    {/* Ultra Compact Grid */}
    <div className="grid grid-cols-3 gap-1 mb-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
        <button 
          key={num} 
          onClick={() => handleKeyClick(num)} 
          className={`h-10 rounded-md text-sm font-black transition-all active:scale-90 ${darkMode ? "bg-[#2a2e39] text-white hover:bg-[#363b4a]" : "bg-gray-100 text-black hover:bg-gray-200"}`}
        >
          {num}
        </button>
      ))}
      <button 
        onClick={() => handleKeyClick('del')} 
        className="h-10 bg-red-600/10 rounded-md flex items-center justify-center hover:bg-red-600/20 transition-all active:scale-90"
      >
        <Delete size={16} className="text-red-500" />
      </button>
    </div>
    
    <button 
      onClick={() => setShowKeypad(false)} 
      className="w-full py-1.5 bg-green-600 hover:bg-green-500 rounded-md text-[10px] font-black text-white uppercase tracking-widest transition-all active:scale-95"
    >
      Confirm
    </button>
  </div>
)}
      </div>

      <div className={`border rounded-lg p-3 space-y-2 transition-colors ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-gray-400">Payout:</span>
          <span className={darkMode ? "text-white" : "text-black"}>${totalReturn}</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-black text-green-500">+{payoutPercentage}%</span>
        </div>
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-gray-400">Profit:</span>
          <span className="text-green-500 font-black">+${profit}</span>
        </div>
      </div>

      {tradeError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-xs font-bold text-center animate-shake">
          {tradeError}
        </div>
      )}

      <div className="flex flex-col gap-3 mt-2">
        <button onClick={() => placeTrade('buy')} disabled={isPlacingTrade || !token || getSafeBalance() < amount}
          className="w-full bg-[#00c853] hover:bg-[#00e676] disabled:opacity-50 text-white py-4 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/20">
          {isPlacingTrade && placingDirection === 'buy' ? 'Placing...' : <><Send size={20} className="-rotate-45" /> Buy</>}
        </button>

        <button onClick={() => placeTrade('sell')} disabled={isPlacingTrade || !token || getSafeBalance() < amount}
          className="w-full bg-[#ff3d00] hover:bg-[#ff6e40] disabled:opacity-50 text-white py-4 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-500/20">
          {isPlacingTrade && placingDirection === 'sell' ? 'Placing...' : <><History size={20} className="scale-x-[-1]" /> Sell</>}
        </button>
      </div>
    </div>
  );
};

export default TradePanel;
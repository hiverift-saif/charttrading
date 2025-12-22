// src/chart/TradePanel.jsx

import React, { useState } from 'react';
import { ChevronDown, Info, Minus, Plus, Send, History, X, Delete } from 'lucide-react';
import { useSelector } from 'react-redux';

const TradePanel = () => {
  const [amount, setAmount] = useState(10);
  const [time, setTime] = useState("00:01:00");
  const [showKeypad, setShowKeypad] = useState(false);
  const payout = 95;

  const { currentAsset = "XRPUSDT", currentPrice = 0 } = useSelector(state => state.trading);
  const displayPrice = currentPrice > 0 ? currentPrice.toFixed(8) : 'Loading...';

  const profit = (amount * (payout / 100)).toFixed(2);
  const totalReturn = (Number(amount) + Number(profit)).toFixed(2);

  const handleKeyClick = (val) => {
    if (val === 'del') {
      setAmount(prev => prev.toString().slice(0, -1) || 0);
    } else if (val === '.') {
      if (!amount.toString().includes('.')) setAmount(prev => prev + '.');
    } else {
      setAmount(prev => prev === 0 ? val : prev.toString() + val);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto no-scrollbar">
      {/* Asset Header */}
      <div className="flex items-center justify-between bg-[#1e1c1b] p-3 rounded-lg border border-gray-800 cursor-pointer hover:bg-[#252322] transition active:scale-95">
        <div className="flex items-center gap-2">
          <img src="https://eqxadmin.com/public/images/xrp.svg" alt="XRP" className="w-6 h-6" />
          <div>
            <h5 className="text-sm font-bold text-white leading-none">{currentAsset.replace('USDT', ' - OTC')}</h5>
            <small className="text-[10px] text-gray-500 uppercase">FT • <span className="text-green-500">+{payout}%</span></small>
          </div>
        </div>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      {/* Time Box */}
      <div className="bg-[#1e1c1b] border border-gray-800 rounded-lg overflow-hidden">
        <div className="p-3 text-center border-b border-gray-800">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-1">Time</span>
          <span className="text-xl font-bold text-white tracking-widest">{time}</span>
        </div>
        <div className="flex">
          <button className="flex-1 py-2 flex justify-center hover:bg-white/5 border-r border-gray-800 transition active:bg-gray-800"><Minus size={16}/></button>
          <button className="flex-1 py-2 flex justify-center hover:bg-white/5 transition active:bg-gray-800"><Plus size={16}/></button>
        </div>
      </div>

      {/* Amount Box */}
      <div className={`bg-[#1e1c1b] border ${showKeypad ? 'border-green-500' : 'border-gray-800'} rounded-lg overflow-hidden transition-all`}>
        <div className="p-3 cursor-pointer text-center" onClick={() => setShowKeypad(!showKeypad)}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Amount</span>
            <Info size={12} className="text-gray-600" />
          </div>
          <div className="text-center">
            <span className="text-xl font-bold text-green-500">$</span>
            <span className="text-xl font-bold text-white ml-1">{amount}</span>
          </div>
        </div>
        <div className="flex border-t border-gray-800">
          <button onClick={() => setAmount(prev => Math.max(1, Number(prev) - 1))} className="flex-1 py-3 flex justify-center border-r border-gray-800 hover:bg-white/5 transition active:bg-gray-800">
            <Minus size={18} />
          </button>
          <button onClick={() => setAmount(prev => Number(prev) + 1)} className="flex-1 py-3 flex justify-center hover:bg-white/5 transition active:bg-gray-800">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Payout Info */}
      <div className="bg-[#1e1c1b]/50 border border-gray-800 rounded-lg p-3 space-y-2">
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-gray-400">Payout:</span>
          <span className="text-white">${totalReturn}</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-black text-green-500">+{payout}%</span>
        </div>
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-gray-400">Profit:</span>
          <span className="text-green-500">+${profit}</span>
        </div>
      </div>

      {/* Buy/Sell Buttons */}
      <div className="flex flex-col gap-3 mt-2">
        <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <Send size={20} className="-rotate-45" />
          <span>Buy</span>
        </button>
        <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <History size={20} className="scale-x-[-1]" />
          <span>Sell</span>
        </button>
      </div>

      {/* Keypad Overlay */}
      {showKeypad && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#1e1c1b] border-t border-gray-700 p-3 animate-in slide-in-from-bottom-5 duration-200 z-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Set Amount</span>
            <X size={16} className="cursor-pointer" onClick={() => setShowKeypad(false)} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
              <button key={num} onClick={() => handleKeyClick(num)} className="py-3 bg-[#2a2e39] rounded-lg text-lg font-bold hover:bg-gray-700 active:scale-90 transition">
                {num}
              </button>
            ))}
            <button onClick={() => handleKeyClick('del')} className="py-3 bg-red-500/20 text-red-500 rounded-lg flex justify-center items-center hover:bg-red-500/30">
              <Delete size={20} />
            </button>
          </div>
          <button className="w-full mt-3 bg-green-600 py-2 rounded-lg font-bold text-white uppercase text-xs" onClick={() => setShowKeypad(false)}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default TradePanel;
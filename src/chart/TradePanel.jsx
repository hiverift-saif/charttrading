import React, { useState, useRef } from 'react';
import { ChevronDown, Info, Minus, Plus, Send, History, X, Delete } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addOpenTrade } from '../redux/tradingSlice';
import API_CONFIG from '../config';

const TradePanel = () => {
  const dispatch = useDispatch();
  
  const { currentAsset, currentPrice, payoutPercentage, balance, openTrades } = useSelector((state) => state.trading);

  const [amount, setAmount] = useState(10);
  const [time, setTime] = useState('00:01:00');
  const [showKeypad, setShowKeypad] = useState(false);
  
  // 🔥 अलग-अलग loader के लिए नया state
  const [isPlacingTrade, setIsPlacingTrade] = useState(false);
  const [placingDirection, setPlacingDirection] = useState(''); // 'buy', 'sell' या ''

  const [tradeError, setTradeError] = useState('');

  // 🔥 Duplicate trade prevent करने के लिए global lock
  const tradeLock = useRef(false);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const profit = (amount * (payoutPercentage / 100)).toFixed(2);
  const totalReturn = (Number(amount) + Number(profit)).toFixed(2);

  const placeTrade = async (direction) => {
    if (tradeLock.current) {
      console.warn('Trade already in progress – blocked duplicate');
      return;
    }

    if (!token || !userId) {
      setTradeError('Session expired. Please login again.');
      alert('Please login first!');
      return;
    }

    if (balance < amount) {
      setTradeError('Insufficient Balance!');
      return;
    }

    // Lock + loader start
    tradeLock.current = true;
    setIsPlacingTrade(true);
    setPlacingDirection(direction); // ← यहीं direction set होता है
    setTradeError('');

    const tradeData = {
      userId,
      type: direction,
      symbol: currentAsset?.displayName || 'BTC/USD',
      quantity: Number(amount),
      price: Number(currentPrice || 0),
      entryPrice: Number(currentPrice || 0),
      expiryTime: new Date(Date.now() + 60000).toISOString(), // 1 minute expiry
      status: 'open',
      isPublic: true,
      stopLoss: 0,
      takeProfit: 0,
    };

    try {
      console.log(`Placing ${direction.toUpperCase()} trade:`, tradeData);

      const response = await fetch(`${API_CONFIG.baseURL}/trades/${direction}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tradeData),
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok || result.statusCode === 200 || result.message?.includes('success')) {
        dispatch(addOpenTrade({
          ...tradeData,
          id: Date.now(),
          profitPotential: profit,
        }));

        alert(`✅ Trade placed successfully!\n${direction.toUpperCase()} $${amount}`);
        setShowKeypad(false);
        setAmount(10); // optional reset
      } else {
        setTradeError(result.message || 'Trade failed. Please try again.');
      }
    } catch (err) {
      console.error('Trade Error:', err);
      setTradeError('Network error. Please check your connection.');
    } finally {
      // Always release lock & reset loader
      tradeLock.current = false;
      setIsPlacingTrade(false);
      setPlacingDirection(''); // ← reset direction
    }
  };

  // Keypad handler
  const handleKeyClick = (val) => {
    if (val === 'del') {
      setAmount((prev) => {
        const str = prev.toString();
        return str.length > 1 ? Number(str.slice(0, -1)) || 10 : 10;
      });
    } else if (val === '.') {
      setAmount((prev) => {
        if (prev.toString().includes('.')) return prev;
        return Number(prev + '.');
      });
    } else {
      setAmount((prev) => Number(prev === 10 ? val : prev.toString() + val));
    }
  };

  return (
    <div className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto no-scrollbar relative h-full">
      {/* Asset Header */}
      <div className="flex items-center justify-between bg-[#1e1c1b] p-3 rounded-lg border border-gray-800">
        <div className="flex items-center gap-2">
          <img
            src={currentAsset?.icon || 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'}
            alt="asset"
            className="w-6 h-6 rounded-full object-cover"
          />
          <div>
            <h5 className="text-sm font-bold text-white uppercase">{currentAsset?.displayName || 'BTC/USD'}</h5>
            <small className="text-[10px] text-gray-500 uppercase">
              FT • <span className="text-green-500">+{payoutPercentage}%</span>
            </small>
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
          <button className="flex-1 py-2 flex justify-center border-r border-gray-800"><Minus size={16} /></button>
          <button className="flex-1 py-2 flex justify-center"><Plus size={16} /></button>
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
          <button onClick={() => setAmount(prev => Math.max(10, prev - 1))} className="flex-1 py-3 flex justify-center border-r border-gray-800">
            <Minus size={18} />
          </button>
          <button onClick={() => setAmount(prev => prev + 1)} className="flex-1 py-3 flex justify-center">
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
          <span className="text-2xl font-black text-green-500">+{payoutPercentage}%</span>
        </div>
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-gray-400">Profit:</span>
          <span className="text-green-500">+${profit}</span>
        </div>
      </div>

      {/* Error Message */}
      {tradeError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm text-center">
          {tradeError}
        </div>
      )}

      {/* Buy / Sell Buttons - अब loader अलग-अलग दिखेगा */}
      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={() => placeTrade('buy')}
          disabled={isPlacingTrade || !token || balance < amount}
          className="w-full bg-[#00c853] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 hover:bg-[#00b04a] transition"
        >
          {isPlacingTrade && placingDirection === 'buy' ? 'Placing Buy...' : <><Send size={20} className="-rotate-45" /> Buy</>}
        </button>

        <button
          onClick={() => placeTrade('sell')}
          disabled={isPlacingTrade || !token || balance < amount}
          className="w-full bg-[#ff3d00] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase text-lg flex items-center justify-center gap-2 hover:bg-[#e53935] transition"
        >
          {isPlacingTrade && placingDirection === 'sell' ? 'Placing Sell...' : <><History size={20} className="scale-x-[-1]" /> Sell</>}
        </button>
      </div>

      {/* Open Trades */}
      <div className="mt-4">
        {openTrades.length > 0 && (
          <span className="text-[10px] text-gray-500 font-bold block mb-2 uppercase tracking-tighter">
            Open Trades ({openTrades.length})
          </span>
        )}
        <div className="space-y-1 max-h-32 overflow-y-auto no-scrollbar">
          {openTrades.map((trade) => (
            <div key={trade.id} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded border-l-4 border-blue-500">
              <span className="text-xs text-gray-300 font-mono">{trade.symbol}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">${trade.quantity}</span>
                <span className={`text-xs font-bold ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Numeric Keypad */}
      {showKeypad && (
        <div className="absolute inset-x-0 bottom-0 bg-[#1e1c1b] border-t-2 border-green-500 p-4 rounded-t-2xl shadow-2xl z-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-white">Enter Amount</span>
            <X size={20} className="text-gray-400 cursor-pointer hover:text-white" onClick={() => setShowKeypad(false)} />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button key={num} onClick={() => handleKeyClick(num)} className="py-4 bg-[#2a2e39] hover:bg-[#353942] rounded-xl text-xl font-bold text-white transition">
                {num}
              </button>
            ))}
            <button onClick={() => handleKeyClick('.')} className="py-4 bg-[#2a2e39] hover:bg-[#353942] rounded-xl text-xl font-bold text-white transition">.</button>
            <button onClick={() => handleKeyClick(0)} className="py-4 bg-[#2a2e39] hover:bg-[#353942] rounded-xl text-xl font-bold text-white transition">0</button>
            <button onClick={() => handleKeyClick('del')} className="py-4 bg-red-600/30 hover:bg-red-600/50 rounded-xl flex items-center justify-center transition">
              <Delete size={22} className="text-red-400" />
            </button>
          </div>
          <button
            onClick={() => setShowKeypad(false)}
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold text-white uppercase tracking-wider transition"
          >
            Confirm Amount
          </button>
        </div>
      )}
    </div>
  );
};

export default TradePanel;
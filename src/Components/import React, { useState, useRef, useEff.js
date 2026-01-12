import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Info, Minus, Plus, Send, History, X, Delete } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addOpenTrade } from '../redux/tradingSlice';
import API_CONFIG from '../config';

const TradePanel = () => {
  const dispatch = useDispatch();
  const { userId: reduxUserId, token: reduxToken } = useSelector((state) => state.trading);
  
  const [amount, setAmount] = useState(10);
  const [showKeypad, setShowKeypad] = useState(false);
  const [isPlacingTrade, setIsPlacingTrade] = useState(false);
  const [tradeError, setTradeError] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [direction, setDirection] = useState('buy'); // buy या sell
  
  // 🔥 MAIN FIX: Single global lock to prevent ANY duplicate trade calls
  const tradeLock = useRef(false);
  
  // Secure userId & token (Redux → localStorage fallback)
  const getUserId = () => reduxUserId || localStorage.getItem('userId');
  const getToken = () => reduxToken || localStorage.getItem('token');

  // ✅ Single reusable trade function with strict lock
  const placeTrade = async (tradeDirection) => {
    // 🚫 Prevent any duplicate or parallel calls
    if (tradeLock.current) {
      console.warn('⚠️ Trade already in progress – blocking duplicate request');
      return;
    }

    const userId = getUserId();
    const token = getToken();

    if (!userId || !token) {
      setTradeError('Login session expired. Please login again. 🔐');
      return;
    }

    if (amount < 1) {
      setTradeError('Amount must be at least $1');
      return;
    }

    // 🔒 Lock engaged
    tradeLock.current = true;
    setIsPlacingTrade(true);
    setTradeError('');

    try {
      const tradeData = {
        userId: userId,
        type: tradeDirection, // "buy" or "sell"
        symbol: selectedSymbol,
        quantity: amount,
        price: 180.5,
        entryPrice: 179.8,
        expiryTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 min from now
        status: "open",
        profitLoss: 0,
        stopLoss: tradeDirection === 'buy' ? 175.0 : 185.0,
        takeProfit: tradeDirection === 'buy' ? 190.0 : 170.0,
        txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        exitPrice: null,
        closeReason: null,
        isPublic: true
      };


      const response = await fetch(`${API_CONFIG.baseURL}/trades/${tradeDirection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tradeData),
      });

      const data = await response.json();
      console.log('data')
      if (response.ok && data.success) {
        console.log('response ok ')
        dispatch(addOpenTrade({ ...tradeData, _id: data.data._id || data.data.id }));
        
        // Success feedback
        alert(`${tradeDirection.toUpperCase()} order placed successfully! ✅\nAmount: $${amount}`);
        
        setAmount(10); // Reset
        setShowKeypad(false);
      } else {
        setTradeError(data.message || `Failed to place ${tradeDirection} trade`);
      }

    } catch (err) {
      console.error('Trade API Error:', err);
      setTradeError('Network error. Please try again.');
    } finally {
      // 🔓 Always release lock
      tradeLock.current = false;
      setIsPlacingTrade(false);
    }
  };

  // 🔥 Separate handlers – NO chance of both firing together
  const handleBuy = () => {
    setDirection('buy');
    placeTrade('buy');
  };

  const handleSell = () => {
    setDirection('sell');
    placeTrade('sell');
  };

  const handleConfirm = () => {
    placeTrade(direction);
  };

  // Amount keypad
  const updateAmount = (value) => {
    setAmount(prev => Math.max(1, prev + value));
  };

  const symbols = ['AAPL', 'BTCUSD', 'EURUSD', 'GBPUSD', 'GOLD'];

  return (
    <div className="bg-[#09090b]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-white to-[#ffae34] bg-clip-text text-transparent">
          Trade Panel
        </h3>
        <Info className="w-5 h-5 text-white/50" />
      </div>

      {/* Symbol Selector */}
      <div className="mb-6">
        <label className="block text-xs text-white/60 mb-2">Symbol</label>
        <select 
          value={selectedSymbol} 
          onChange={(e) => setSelectedSymbol(e.target.value)}
          className="w-full bg-[#18181b]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#ffae34]/50 focus:outline-none appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat' }}
        >
          {symbols.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* 🔥 QUICK BUY / SELL BUTTONS – Now 100% safe */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleBuy}
          disabled={isPlacingTrade || tradeLock.current}
          className="h-16 bg-gradient-to-br from-green-500/90 to-green-600/90 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm uppercase tracking-wider">Buy</span>
        </button>

        <button
          onClick={handleSell}
          disabled={isPlacingTrade || tradeLock.current}
          className="h-16 bg-gradient-to-br from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Minus className="w-6 h-6" />
          <span className="text-sm uppercase tracking-wider">Sell</span>
        </button>
      </div>

      {/* Amount Section */}
      <div className="mb-6">
        <label className="block text-xs text-white/60 mb-2 flex items-center justify-between">
          <span>Amount ($)</span>
          <span className="text-[#ffae34] font-bold">${amount}</span>
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full bg-[#18181b]/80 border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-mono text-right focus:border-[#ffae34]/50 focus:outline-none"
          min="1"
        />
      </div>

      {/* Keypad Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowKeypad(!showKeypad)}
          className="w-full py-3 bg-[#18181b]/80 border-2 border-dashed border-white/20 hover:border-[#ffae34]/50 text-white/70 hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          {showKeypad ? <X size={18} /> : <Plus size={18} />}
          <span>{showKeypad ? 'Hide' : 'Quick Amount'}</span>
        </button>

        {showKeypad && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[5, 10, 25, 50, 100, 250].map(v => (
              <button key={v} onClick={() => updateAmount(v)} className="h-12 bg-[#ffae34]/20 hover:bg-[#ffae34]/40 border border-[#ffae34]/40 text-[#ffae34] font-bold rounded-lg">
                +${v}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {tradeError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {tradeError}
        </div>
      )}

      {/* Direction Toggle + Confirm */}
      <div className="space-y-3">
        <div className="flex bg-[#18181b]/80 border border-white/10 rounded-xl p-1">
          <button
            onClick={() => setDirection('buy')}
            className={`flex-1 py-3 font-bold rounded-lg transition-all ${direction === 'buy' ? 'bg-green-600 text-white shadow-lg' : 'text-green-400'}`}
          >
            BUY ↑
          </button>
          <button
            onClick={() => setDirection('sell')}
            className={`flex-1 py-3 font-bold rounded-lg transition-all ${direction === 'sell' ? 'bg-red-600 text-white shadow-lg' : 'text-red-400'}`}
          >
            SELL ↓
          </button>
        </div>

        <button
          onClick={handleConfirm}
          disabled={isPlacingTrade || tradeLock.current}
          className="w-full h-14 bg-gradient-to-r from-[#ffae34] to-[#ff8c00] hover:from-[#e59d2e] hover:to-[#e67e22] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          {isPlacingTrade ? (
            <>Placing {direction.toUpperCase()}...</>
          ) : (
            <>Confirm {direction.toUpperCase()} ${amount}</>
          )}
          <Send size={18} />
        </button>
      </div>

      {/* History Link */}
      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <button className="text-[#ffae34] text-sm font-medium flex items-center justify-center gap-1 mx-auto">
          <History size={16} />
          View Trade History
        </button>
      </div>
    </div>
  );
};

export default TradePanel;
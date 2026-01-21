import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { X, List, History, TrendingUp, TrendingDown, Loader2, Clock } from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config';

const LiveTradesPanel = ({ onClose, darkMode }) => {
  const [tab, setTab] = useState('opened');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🚀 1. Redux se Live Trades (Opened) uthana
  const { openTrades } = useSelector((state) => state.trading || { openTrades: [] });

  // 🚀 2. API se Trade History (Closed) fetch karne ka logic
  const fetchTradeHistory = useCallback(async () => {
    const token = localStorage.getItem('access_token') || localStorage.getItem('affiliate_token');
    if (!token) return;

    try {
      setLoading(true);
      // Query param mode=realBalance ke sath call
      const response = await axios.get(`${API_CONFIG.baseURL}/trade/history?mode=realBalance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // JSON response: result array ko set karna
      setHistory(response.data.result || []);
    } catch (error) {
      console.error("Trade History Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Jab user 'closed' tab par click kare tabhi API call ho
  useEffect(() => {
    if (tab === 'closed') {
      fetchTradeHistory();
    }
  }, [tab, fetchTradeHistory]);

  return (
    <>
      {/* --- HEADER --- */}
      <div className={`p-4 border-b flex justify-between items-center transition-colors 
        ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100"}`}>
        <h5 className={`font-black text-xs flex items-center gap-2 uppercase tracking-widest 
          ${darkMode ? "text-white" : "text-slate-900"}`}>
          Asset Monitor <List size={14} className="text-[#f99616]" />
        </h5>
        <button onClick={onClose} className="text-gray-500 hover:text-[#f99616] transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* --- TABS --- */}
      <div className={`flex border-b transition-colors ${darkMode ? "bg-black border-zinc-800" : "bg-gray-50 border-gray-100"}`}>
        {['opened', 'closed'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[2px] relative transition-all ${
              tab === t 
                ? (darkMode ? 'text-white' : 'text-blue-600') 
                : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            {t} {tab === 'opened' ? `(${openTrades.length})` : ''}
            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f99616] shadow-[0_0_10px_#f99616]" />}
          </button>
        ))}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        {tab === 'opened' ? (
          // 🚀 OPENED TRADES (Redux)
          openTrades.length > 0 ? (
            openTrades.map((trade, idx) => (
              <TradeItem key={idx} data={trade} darkMode={darkMode} isLive={true} />
            ))
          ) : (
            <EmptyView darkMode={darkMode} msg="No active positions" />
          )
        ) : (
          // 🚀 CLOSED TRADES (API History)
          loading ? (
            <div className="h-40 flex flex-col items-center justify-center gap-2">
              <Loader2 className="animate-spin text-[#f99616]" size={24} />
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Decrypting History...</span>
            </div>
          ) : history.length > 0 ? (
            history.map((trade, idx) => (
              <TradeItem key={idx} data={trade} darkMode={darkMode} isLive={false} />
            ))
          ) : (
            <EmptyView darkMode={darkMode} msg="History is clear" />
          )
        )}
      </div>
    </>
  );
};

// --- Sub-Component: Individual Trade Item ---
const TradeItem = ({ data, darkMode, isLive }) => {
  const isUp = data.type === 'buy' || data.direction === 'up' || data.type === 'up';
  
  return (
    <div className={`p-3 rounded-xl border transition-all hover:scale-[1.02] ${
      darkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-gray-100 shadow-sm"
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-tight">
              {data.symbol || data.asset}
            </div>
            <div className="text-[8px] text-gray-500 font-bold flex items-center gap-1">
              <Clock size={8} /> {new Date(data.createdAt || data.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-xs font-black ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            ${data.amount || data.quantity}
          </div>
          <div className="text-[8px] font-mono text-zinc-600">
            {isLive ? 'PENDING' : (data.payout > 0 ? `+${data.payout}` : 'LOSE')}
          </div>
        </div>
      </div>
      
      {!isLive && (
        <div className="flex justify-between items-center pt-2 border-t border-gray-800/20 mt-1">
          <span className={`text-[8px] font-black uppercase tracking-widest ${data.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.resultStatus || (data.profit >= 0 ? 'ITM' : 'OTM')}
          </span>
          <span className="text-[9px] font-mono text-zinc-700">#{data._id?.slice(-6).toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

// --- Sub-Component: Empty State ---
const EmptyView = ({ darkMode, msg }) => (
  <div className="h-full flex flex-col items-center justify-center py-20 opacity-20">
    <History size={48} strokeWidth={1} className={darkMode ? "text-white" : "text-black"} />
    <p className="text-[10px] mt-2 font-black uppercase tracking-[2px]">{msg}</p>
  </div>
);

export default LiveTradesPanel;
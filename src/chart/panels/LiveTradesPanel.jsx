import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  X,
  List,
  History,
  TrendingUp,
  TrendingDown,
  Loader2,
  Clock
} from 'lucide-react';
import axios from 'axios';
import API_CONFIG from '../../config';

/* ================= TIME HELPERS ================= */
const formatTime = (d) =>
  new Date(d).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

/* ================= MAIN ================= */
const LiveTradesPanel = ({ onClose, darkMode }) => {
  const [tab, setTab] = useState('opened');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(Date.now());

  const { openTrades = [] } = useSelector(
    (state) => state.trading || {}
  );

  /* GLOBAL CLOCK */
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  /* LIVE TRADES (AUTO EXPIRE) */
  const liveTrades = openTrades.filter((t) => {
    if (!t.expiryTime) return false;
    return (
      t.status !== 'closed' &&
      new Date(t.expiryTime).getTime() > now
    );
  });

  /* CLOSED HISTORY */
  const fetchTradeHistory = useCallback(async () => {
    const token =
      localStorage.getItem('access_token') ||
      localStorage.getItem('affiliate_token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${API_CONFIG.baseURL}/trade/history?mode=realBalance`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory(
        (res.data.result || []).filter(
          (t) => t.status === 'closed'
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === 'closed') fetchTradeHistory();
  }, [tab, fetchTradeHistory]);

  return (
    <>
      {/* HEADER */}
      <div
        className={`p-4 border-b flex justify-between items-center ${
          darkMode ? 'bg-black border-zinc-800' : 'bg-white'
        }`}
      >
        <h5 className="text-xs font-black uppercase tracking-widest flex gap-2">
          Asset Monitor <List size={14} className="text-[#f99616]" />
        </h5>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* TABS */}
      <div className="flex border-b">
        {['opened', 'closed'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-xs font-black uppercase ${
              tab === t ? 'text-[#f99616]' : 'text-gray-500'
            }`}
          >
            {t} {t === 'opened' && `(${liveTrades.length})`}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-3 overflow-y-auto">
        {tab === 'opened' ? (
          liveTrades.length ? (
            liveTrades.map((t, i) => (
              <TradeCard
                key={i}
                data={t}
                now={now}
                live
                darkMode={darkMode}
              />
            ))
          ) : (
            <Empty msg="No active trades" />
          )
        ) : loading ? (
          <Loader />
        ) : history.length ? (
          history.map((t, i) => (
            <TradeCard
              key={i}
              data={t}
              darkMode={darkMode}
            />
          ))
        ) : (
          <Empty msg="No trade history" />
        )}
      </div>
    </>
  );
};

/* ================= CARD ================= */
const TradeCard = ({ data, live, now, darkMode }) => {
  const isUp = data.direction === 'up';

  const expiry = new Date(data.expiryTime).getTime();
  const created = new Date(data.createdAt).getTime();

  const total = expiry - created;
  const left = live ? expiry - now : 0;
  const seconds = Math.max(0, Math.floor(left / 1000));
  const percent = live ? Math.max(0, (left / total) * 100) : 0;

  return (
    <div
      className={`p-4 rounded-xl border ${
        darkMode
          ? 'bg-zinc-900 border-zinc-800'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* TOP */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div
            className={`w-9 h-9 flex items-center justify-center rounded-lg ${
              isUp
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isUp ? <TrendingUp /> : <TrendingDown />}
          </div>

          <div>
            <div className="font-black">{data.asset}</div>
            <div className="text-xs text-gray-500">
              {formatDate(data.createdAt)}
            </div>
          </div>
        </div>

        <div className="font-black">${data.amount}</div>
      </div>

      {/* PRICES */}
      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        <Info label="Open Price" value={data.openPrice} />
        <Info
          label={live ? 'Expires In' : 'Close Price'}
          value={live ? `${seconds}s` : data.closePrice}
          right
        />
      </div>

      {/* TIMES */}
      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <Info label="Open Time" value={formatTime(data.createdAt)} />
        <Info
          label={live ? 'Expiry Time' : 'Close Time'}
          value={
            live
              ? formatTime(data.expiryTime)
              : formatTime(data.updatedAt)
          }
          right
        />
      </div>

      {/* PROGRESS */}
      {live && (
        <div className="mt-2 h-1 bg-gray-700 rounded overflow-hidden">
          <div
            style={{ width: `${percent}%` }}
            className="h-full bg-[#f99616]"
          />
        </div>
      )}

      {/* RESULT */}
      {!live && (
        <div
          className={`mt-2 text-center text-xs font-black ${
            data.result === 'win'
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {data.result.toUpperCase()}
        </div>
      )}
    </div>
  );
};

/* ================= SMALL ================= */
const Info = ({ label, value, right }) => (
  <div
    className={`p-2 rounded bg-zinc-800/40 ${
      right ? 'text-right' : ''
    }`}
  >
    <div className="text-[10px] uppercase text-gray-500">
      {label}
    </div>
    <div className="font-black">{value}</div>
  </div>
);

const Loader = () => (  
  <div className="h-40 flex justify-center items-center">
    <Loader2 className="animate-spin text-[#f99616]" />
  </div>
);

const Empty = ({ msg }) => (
  <div className="h-40 flex justify-center items-center text-xs font-black text-gray-500">
    {msg}
  </div>
);

export default LiveTradesPanel;

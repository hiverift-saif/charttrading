import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Loader2, 
  History, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  User as UserIcon,
  Search,
  Filter
} from "lucide-react";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext";

const AdminTradeHistory = () => {
  const { darkMode } = useTheme();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("realBalance");

  useEffect(() => {
    fetchTradeHistory();
  }, [filterMode]);

  const fetchTradeHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      // 🚀 Using your provided URL and parameter
      const res = await axios.get(`${API_CONFIG.baseURL}/trade/history?mode=${filterMode}`, {
   
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Trade History Response:", res.data);
      setTrades(res.data?.result || []);
    } catch (err) {
      console.error("Trade History Error:", err);
      setTrades([]);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#f99616]" />
        <p className="text-[10px] mt-4 font-black uppercase tracking-[3px] text-gray-500">Decrypting Ledger Data</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
            Trade <span className="text-[#f99616]">Ledger</span>
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global Transaction Monitoring</p>
        </div>

        <div className="flex gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 w-full md:w-auto">
          <button 
            onClick={() => setFilterMode("realBalance")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterMode === 'realBalance' ? "bg-[#f99616] text-black" : "text-gray-500"}`}
          >
            Real Account
          </button>
          <button 
            onClick={() => setFilterMode("demoBalance")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterMode === 'demoBalance' ? "bg-zinc-800 text-white" : "text-gray-500"}`}
          >
            Demo View
          </button>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-[2.5rem] bg-zinc-900/10">
          <History size={48} className="mx-auto text-zinc-700 mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 italic">No trades recorded in this mode</p>
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW: COMPACT CARDS */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {trades.map((trade) => (
              <div key={trade._id} className={`p-5 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-xl"}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-xl ${trade.type === 'buy' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {trade.type === 'buy' ? <TrendingUp size={18} className="text-green-500"/> : <TrendingDown size={18} className="text-red-500"/>}
                     </div>
                     <div>
                        <p className="text-xs font-black uppercase italic">{trade.asset}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase">{new Date(trade.createdAt).toLocaleTimeString()}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className={`text-sm font-black italic ${trade.status === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.status === 'win' ? `+$${trade.payout}` : `-$${trade.amount}`}
                     </p>
                     <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{trade.status}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-800/30">
                   <div className="text-[9px] font-bold text-gray-500 uppercase">Invest: <span className="text-white">${trade.amount}</span></div>
                   <div className="text-[9px] font-bold text-gray-500 uppercase text-right">User: <span className="text-[#f99616]">{trade.userId?.email?.split('@')[0]}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: TERMINAL TABLE */}
          <div className="hidden lg:block border rounded-[2.5rem] overflow-hidden shadow-2xl border-zinc-800">
            <table className="w-full text-left">
              <thead className={`${darkMode ? "bg-zinc-900 text-zinc-500" : "bg-gray-50 text-gray-400"}`}>
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px]">Trader Identity</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px]">Asset/Pair</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px]">Investment</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px]">Timestamp</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px] text-center">Result</th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? "bg-black" : "bg-white"}`}>
                {trades.map((trade) => (
                  <tr key={trade._id} className={`border-t transition-colors ${darkMode ? "border-zinc-900 hover:bg-zinc-900/40" : "border-gray-50 hover:bg-gray-50"}`}>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800"><UserIcon size={14} className="text-[#f99616]"/></div>
                         <p className="text-xs font-black uppercase italic">{trade.userId?.email || "System User"}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="font-black text-sm italic tracking-tighter">{trade.asset}</span>
                      <span className={`ml-2 text-[10px] font-bold uppercase ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>{trade.type}</span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-black">${trade.amount}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 opacity-70 font-bold text-[10px] uppercase">
                        <Clock size={12}/>
                        <span>{new Date(trade.createdAt).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${trade.status === 'win' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                          {trade.status === 'win' ? `Profit +$${trade.payout}` : `Loss -$${trade.amount}`}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTradeHistory;
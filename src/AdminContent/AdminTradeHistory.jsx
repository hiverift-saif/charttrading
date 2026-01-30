import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Loader2, History, TrendingUp, TrendingDown, Clock, 
  User as UserIcon, Search, Download, ChevronLeft, ChevronRight,
  ArrowUpRight, ArrowDownLeft
} from "lucide-react";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext";

const AdminTradeHistory = () => {
  const { darkMode } = useTheme();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("realBalance");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchTradeHistory = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token"); // Admin token use karein
      const res = await axios.get(`${API_CONFIG.baseURL}/trade/history?mode=${filterMode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // API Response: res.data.result (jaisa aapne JSON diya)
      setTrades(res.data?.result || []);
    } catch (err) {
      console.error("Trade History Error:", err);
      setTrades([]);
    } finally {
      setLoading(false);
    }
  }, [filterMode]);

  useEffect(() => {
    fetchTradeHistory();
  }, [fetchTradeHistory]);

  // Client Side Filtering Logic
  const filteredTrades = trades.filter(trade => 
    trade.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage);
  const currentTrades = filteredTrades.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#f99616]" />
        <p className="text-[10px] mt-4 font-black uppercase tracking-[3px] text-gray-500 italic">Syncing Trade Nodes...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* HEADER & FILTERS */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Trade <span className="text-[#f99616]">Ledger</span>
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Monitoring {filterMode === 'realBalance' ? 'Live' : 'Demo'} Transactions</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Mode Switcher */}
          <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto">
            <button 
              onClick={() => { setFilterMode("realBalance"); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filterMode === 'realBalance' ? "bg-[#f99616] text-black" : "text-gray-500 hover:text-white"}`}
            >
              Real
            </button>
            <button 
              onClick={() => { setFilterMode("demoBalance"); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filterMode === 'demoBalance' ? "bg-zinc-800 text-white" : "text-gray-500 hover:text-white"}`}
            >
              Demo
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#f99616] transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search Asset or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-transparent border rounded-xl py-2.5 pl-10 pr-4 text-[10px] font-bold uppercase outline-none transition-all ${darkMode ? "border-zinc-800 focus:border-[#f99616] bg-black" : "border-gray-200 focus:border-[#f99616] bg-white"}`}
            />
          </div>
        </div>
      </div>

      {filteredTrades.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-[2.5rem] bg-zinc-900/10">
          <History size={48} className="mx-auto text-zinc-700 mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 italic">No matching records found in ledger</p>
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW: CARDS */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {currentTrades.map((trade) => (
              <div key={trade._id} className={`p-5 rounded-[2rem] border relative overflow-hidden transition-all ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-xl"}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${trade.direction === 'up' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      {trade.direction === 'up' ? <ArrowUpRight size={18} className="text-green-500"/> : <ArrowDownLeft size={18} className="text-red-500"/>}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase italic">{trade.asset}/USD</p>
                      <p className="text-[8px] text-gray-500 font-bold uppercase">{new Date(trade.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black italic ${trade.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.result === 'win' ? `+$${trade.payout}` : `-$${trade.amount}`}
                    </p>
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{trade.result}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-800/30">
                  <div className="text-[9px] font-bold text-gray-500 uppercase">Open: <span className="text-white">${trade.openPrice}</span></div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase text-right">Close: <span className="text-white">${trade.closePrice}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: TERMINAL TABLE */}
          <div className={`hidden lg:block border rounded-[2.5rem] overflow-hidden shadow-2xl ${darkMode ? "border-zinc-800 bg-black" : "border-gray-100 bg-white"}`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${darkMode ? "bg-zinc-900/50 text-zinc-500" : "bg-gray-50 text-gray-400"}`}>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest">Transaction ID</th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-center">Asset / Type</th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-center">Entry/Exit Price</th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-center">Investment</th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {currentTrades.map((trade) => (
                  <tr key={trade._id} className={`group transition-all ${darkMode ? "hover:bg-zinc-900/30" : "hover:bg-gray-50"}`}>
                    <td className="px-8 py-5">
                      <p className="text-[9px] font-mono text-gray-500 mb-1">{trade._id}</p>
                      <div className="flex items-center gap-2">
                        <UserIcon size={12} className="text-[#f99616]"/>
                        <p className="text-[10px] font-black uppercase italic tracking-tighter">UID: ...{trade.userId.slice(-6)}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <p className="text-xs font-black italic">{trade.asset}/USD</p>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${trade.direction === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {trade.direction === 'up' ? 'CALL' : 'PUT'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-gray-500">O: {trade.openPrice}</span>
                        <span className="text-[10px] font-bold text-white">C: {trade.closePrice}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center font-black text-sm text-[#f99616]">
                      ${trade.amount}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className={`inline-block px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${trade.result === 'win' ? 'bg-green-500/5 text-green-500 border-green-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                        {trade.result === 'win' ? `+$${trade.payout}` : `-$${trade.amount}`}
                      </div>
                      <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold">{new Date(trade.createdAt).toLocaleTimeString()}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 px-4">
            <p className="text-[10px] font-black uppercase text-gray-500 italic tracking-widest">
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredTrades.length)} of {filteredTrades.length} Nodes
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white disabled:opacity-20 hover:bg-[#f99616] hover:text-black transition-all"
              >
                <ChevronLeft size={16}/>
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${currentPage === i + 1 ? "bg-[#f99616] text-black" : "bg-zinc-900 text-gray-500 hover:text-white"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white disabled:opacity-20 hover:bg-[#f99616] hover:text-black transition-all"
              >
                <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTradeHistory;
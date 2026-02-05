import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Loader2, History, TrendingUp, TrendingDown, Clock, 
  User as UserIcon, Search, ChevronLeft, ChevronRight,
  ArrowUpRight, ArrowDownLeft, Lock, LayoutGrid, Eye
} from "lucide-react";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext";

const AdminTradeHistory = () => {
  const { darkMode } = useTheme();
  const [trades, setTrades] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMode, setFilterMode] = useState("realBalance");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchTradeHistory = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${API_CONFIG.baseURL}/trade/history?mode=${filterMode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data?.result || [];
      setTrades(data);
      setFilteredTrades(data);
    } catch (err) {
      console.error("Trade History Error:", err);
      setTrades([]);
    } finally {
      setLoading(false);
    }
  }, [filterMode]);

  useEffect(() => { fetchTradeHistory(); }, [fetchTradeHistory]);

  useEffect(() => {
    const result = trades.filter(trade => 
      (trade.asset?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (trade.userId?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (trade.result?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (trade._id || "").includes(searchTerm)
    );
    setFilteredTrades(result);
    setCurrentPage(1);
  }, [searchTerm, trades]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTrades.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* 🟢 HEADER SECTION - Match KYC Style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
            Trade <span className="text-[#f99616]">Ledger</span>
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic mt-1">
            Monitoring {filterMode === 'realBalance' ? 'Live' : 'Demo'} Nodes
          </p>
        </div>
        <div className="flex items-center gap-3">
             <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
                <button onClick={() => setFilterMode("realBalance")} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${filterMode === 'realBalance' ? "bg-[#f99616] text-black" : "text-gray-500 hover:text-white"}`}>Real</button>
                <button onClick={() => setFilterMode("demoBalance")} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${filterMode === 'demoBalance' ? "bg-zinc-800 text-white" : "text-gray-500 hover:text-white"}`}>Demo</button>
             </div>
             <span className="text-[10px] font-black bg-[#f99616]/10 text-[#f99616] px-3 py-1 rounded-md border border-[#f99616]/20">{filteredTrades.length} RECORDS</span>
        </div>
      </div>

      {/* 🔍 SEARCH BAR - Match KYC Style */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
         <Search size={16} className="text-gray-500 ml-2" />
         <input 
            type="text" 
            placeholder="Search by Asset, User ID or Transaction ID..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="bg-transparent outline-none text-xs font-bold w-full placeholder:text-gray-600" 
         />
      </div>

      {/* 💻 DESKTOP TABLE - Match KYC Design Reference */}
      <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} overflow-hidden shadow-2xl rounded-sm`}>
        <table className="w-full text-left">
          <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
            <tr>
              <th className="px-8 py-4 text-[10px] font-black uppercase">Transaction Node</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-center">Trade Specs</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-center">Execution Price</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-right">Result Ledger</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
            {currentItems.map((trade) => (
              <tr key={trade._id} className="hover:bg-[#f99616]/5 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                        <Lock size={16}/>
                    </div>
                    <div>
                        <p className="font-black text-xs uppercase italic text-[#f99616]">UID: ...{trade.userId?.slice(-8) || 'N/A'}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">TX: {trade._id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <div className="inline-flex flex-col items-center">
                    <p className={`text-[11px] font-black italic ${darkMode ? 'text-white' : 'text-black'}`}>{trade.asset}/USD</p>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded mt-1 uppercase ${trade.direction === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {trade.direction === 'up' ? 'CALL (BUY)' : 'PUT (SELL)'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <div className="flex flex-col items-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">O: <span className={darkMode ? "text-zinc-300" : "text-black"}>${trade.openPrice}</span></p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">C: <span className={darkMode ? "text-zinc-300" : "text-black"}>${trade.closePrice}</span></p>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div>
                    <p className={`text-sm font-black italic ${trade.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.result === 'win' ? `+$${trade.payout}` : `-$${trade.amount}`}
                    </p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase">{new Date(trade.createdAt).toLocaleTimeString()}</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE VIEW - Match KYC Design Reference */}
      <div className="grid grid-cols-1 gap-3 lg:hidden">
          {currentItems.map((trade) => (
            <div key={trade._id} className={`p-4 rounded-2xl border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-sm"}`}>
               <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${trade.direction === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {trade.direction === 'up' ? <ArrowUpRight size={16}/> : <ArrowDownLeft size={16}/>}
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase italic text-[#f99616]">{trade.asset}/USD</p>
                        <p className="text-[8px] text-gray-500 uppercase">UID: ...{trade.userId?.slice(-6)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-black italic ${trade.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.result === 'win' ? `+$${trade.payout}` : `-$${trade.amount}`}
                    </p>
                  </div>
               </div>
               <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
                  <p className="text-[9px] text-gray-500 font-bold">{new Date(trade.createdAt).toLocaleString()}</p>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${trade.result === 'win' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trade.result}
                  </span>
               </div>
            </div>
          ))}
      </div>

      {/* 📟 PAGINATION - Match KYC Design Reference */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-6 pb-10">
          <p className="text-[10px] font-black uppercase text-gray-500 italic">Sector {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTrades.length)}</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 border border-zinc-800 rounded-xl text-[#f99616] disabled:opacity-20"><ChevronLeft size={18}/></button>
            <div className="flex items-center px-4 font-black text-xs text-[#f99616]">{currentPage} / {totalPages}</div>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-zinc-800 rounded-xl text-[#f99616] disabled:opacity-20"><ChevronRight size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTradeHistory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Search, Download, ExternalLink, Loader2, Filter, ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";

const AdminFinanceHistory = () => {
  const { darkMode } = useTheme();
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔍 Search & Filter States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 🔢 Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const response = await axios.get(`${API_CONFIG.baseURL}/admin/deposits`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data.result || response.data || [];
        // Pending hata kar sirf processed transactions
        const processed = data.filter(t => t.status !== 'pending');
        setHistory(processed);
        setFiltered(processed);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchHistory();
  }, []);

  // 🚀 Logic: Apply Filters
  useEffect(() => {
    let result = history;
    if (search) {
      result = result.filter(h => 
        h.userId?.toLowerCase().includes(search.toLowerCase()) || 
        h.transactionId?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(h => h.status === statusFilter);
    }
    setFiltered(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [search, statusFilter, history]);

  // 🔢 Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className={`text-xl md:text-2xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Transaction <span className="text-[#f99616]">Archive</span>
        </h2>
        <span className="text-[10px] font-black bg-zinc-900 border border-zinc-800 text-gray-500 px-3 py-1 rounded-md uppercase">
          Total: {filtered.length}
        </span>
      </div>

      {/* 🚀 ORIGINAL FILTER DESIGN (Rounded-2xl) */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search UID or TXID..." 
            value={search}
            className={`w-full border rounded-xl py-3 pl-12 pr-4 text-xs font-bold outline-none transition-all ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-[#f99616]' : 'bg-gray-50 border-gray-100 text-slate-900 focus:border-[#f99616]'}`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest outline-none border ${darkMode ? 'bg-black border-zinc-800 text-gray-400' : 'bg-gray-50 border-gray-100'}`}
          >
            <option value="all">All History</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-none opacity-50">
          <p className="text-[10px] font-black uppercase">Archive Empty</p>
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW: COMPACT CARDS */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {currentItems.map((item) => (
              <div key={item._id} className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2">
                      <div className="p-2 bg-zinc-900 rounded-lg"><UserIcon size={14} className="text-[#f99616]" /></div>
                      <span className="text-[10px] font-black uppercase">UID: {item.userId?.slice(-10)}</span>
                   </div>
                   <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${item.status === 'approved' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>{item.status}</span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-sm font-black text-white">${item.amount?.toLocaleString()}</p>
                      <p className="text-[8px] font-bold text-gray-600 uppercase tracking-tighter">Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                   </div>
                   <span className="text-[9px] font-black text-gray-500 border border-zinc-800 px-2 py-1 rounded-lg uppercase">{item.method}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: SHARP BORDER TABLE (No Rounded Corners) */}
          <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} rounded-none overflow-hidden`}>
            <table className="w-full text-left">
              <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">Network Node / UID</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Protocol</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Value</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Timestamp</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
                {currentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-[#f99616]/5 transition-colors">
                    <td className="px-8 py-5">
                      <p className="font-black text-xs uppercase italic">UID: {item.userId}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">TX: {item.transactionId || 'N/A'}</p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1 rounded text-[9px] font-black uppercase ${darkMode ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-slate-100 text-slate-500'}`}>{item.method}</span>
                    </td>
                    <td className="px-8 py-5 text-center font-black text-sm text-white">
                      ${item.amount?.toLocaleString()}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center text-[10px] text-gray-500 font-bold uppercase">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔢 PAGINATION CONTROLS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filtered.length)} of {filtered.length} Entries
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 border rounded-xl transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:border-[#f99616] text-[#f99616]'}`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center px-4 font-black text-xs text-[#f99616]">
                {currentPage} / {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 border rounded-xl transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:border-[#f99616] text-[#f99616]'}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminFinanceHistory;
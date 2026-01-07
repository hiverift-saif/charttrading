import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, Search, Download, ExternalLink, Loader2 } from 'lucide-react';
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";

const AdminFinanceHistory = () => {
  const { darkMode } = useTheme();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const response = await axios.get(`${API_CONFIG.baseURL}/admin/deposits`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Filter out pending
        const data = response.data.result || response.data || [];
        setHistory(data.filter(t => t.status !== 'pending'));
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchHistory();
  }, []);

  const filtered = history.filter(h => h.userId?.toLowerCase().includes(search.toLowerCase()) || h.transactionId?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className={`text-2xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Transaction <span className="text-[#f99616]">Archive</span>
        </h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input 
            type="text" 
            placeholder="Search UID or TXID..." 
            className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-[11px] outline-none ${darkMode ? 'bg-[#0d0d0d] border-gray-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={`${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'} border rounded-3xl overflow-hidden shadow-2xl`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-black/50 border-gray-800' : 'bg-slate-50 border-slate-100'} border-b`}>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">User ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-900' : 'divide-slate-50'}`}>
              {filtered.map((item) => (
                <tr key={item._id} className={`${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'} transition-colors`}>
                  <td className={`px-6 py-4 font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>...{item.userId?.slice(-8)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${item.type === 'deposit' ? 'text-blue-500 bg-blue-500/10' : 'text-purple-500 bg-purple-500/10'}`}>{item.type}</span>
                  </td>
                  <td className={`px-6 py-4 font-black text-sm ${item.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>${item.amount?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-black uppercase ${item.status === 'success' ? 'text-green-500' : 'text-red-400'}`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-gray-500 font-bold">{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFinanceHistory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Download, Loader2, AlertCircle, Search, Filter, User as UserIcon } from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const AdminFinance = () => {
  const { darkMode } = useTheme();
  const [deposits, setDeposits] = useState([]);
  const [filteredDeposits, setFilteredDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");

  useEffect(() => {
    fetchDeposits();
  }, []);

  // 🔍 Filter Logic (Same as original)
  useEffect(() => {
    let result = deposits;
    if (searchQuery) {
      result = result.filter(d => 
        d.userId?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (methodFilter !== "all") {
      result = result.filter(d => d.method.toLowerCase() === methodFilter.toLowerCase());
    }
    setFilteredDeposits(result);
  }, [searchQuery, methodFilter, deposits]);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${API_CONFIG.baseURL}/admin/deposits`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const allData = response.data?.result || response.data || [];
      const pendingOnly = allData.filter(d => d.status === 'pending');
      setDeposits(pendingOnly);
      setFilteredDeposits(pendingOnly);
    } catch (err) {
      setDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, action) => {
    const result = await Swal.fire({
      title: `Confirm ${action}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#10b981' : '#ef4444',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000'
    });

    if (result.isConfirmed) {
      Swal.fire({ title: 'Processing...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
      try {
        const token = localStorage.getItem("admin_token");
        await axios.put(`${API_CONFIG.baseURL}/admin/deposit/${id}/${action}`, {}, { headers: { Authorization: `Bearer ${token}` }});
        Swal.fire({ icon: 'success', title: 'Action Success', timer: 1000, showConfirmButton: false });
        fetchDeposits();
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed', text: 'Update error' });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#f99616]" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black uppercase italic tracking-tighter">
          Pending <span className="text-[#f99616]">Deposits</span>
        </h2>
        <span className="text-xs font-black bg-[#f99616]/10 text-[#f99616] px-4 py-1.5 rounded-xl border border-[#f99616]/20">
          {filteredDeposits.length} Requests
        </span>
      </div>

      {/* 🚀 ORIGINAL FILTER DESIGN (NO CHANGE) */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row gap-4 ${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text"
            placeholder="Search by UID or Transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-black border-gray-800 focus:border-[#f99616]' : 'bg-gray-50 border-gray-100 focus:border-[#f99616]'}`}
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest outline-none border ${darkMode ? 'bg-black border-gray-800' : 'bg-gray-50 border-gray-100'}`}
          >
            <option value="all">All Methods</option>
            <option value="crypto">Crypto</option>
            <option value="upi">UPI</option>
          </select>
        </div>
      </div>

      {filteredDeposits.length === 0 ? (
        <div className="p-10 text-center border-2 border-dashed border-gray-800 rounded-3xl opacity-50">
          <p className="text-[10px] font-black uppercase">No pending transactions</p>
        </div>
      ) : (
        <>
          {/* 📱 COMPACT MOBILE CARDS */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {filteredDeposits.map((item) => (
              <div key={item._id} className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2 text-[#f99616]">
                      <Download size={14}/>
                      <span className="text-[10px] font-black">UID: {item.userId?.slice(-10)}</span>
                   </div>
                   <span className="text-[9px] font-bold opacity-50 uppercase tracking-widest">{item.method}</span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[14px] font-black italic text-white">${item.amount}</p>
                      <p className="text-[8px] font-bold opacity-30 truncate max-w-[150px]">TX: {item.transactionId || 'N/A'}</p>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => handleStatusUpdate(item._id, 'approve')} className="p-2.5 bg-green-600 text-white rounded-xl active:scale-90 transition-transform"><Check size={16}/></button>
                      <button onClick={() => handleStatusUpdate(item._id, 'reject')} className="p-2.5 bg-red-600 text-white rounded-xl active:scale-90 transition-transform"><X size={16}/></button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 SHARP DESKTOP TABLE (No rounded borders on container) */}
          <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} rounded-none overflow-hidden`}>
            <table className="w-full text-left">
              <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">User/Network</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Protocol</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Equity Value</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Authorization</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
                {filteredDeposits.map((item) => (
                  <tr key={item._id} className="hover:bg-[#f99616]/5 transition-colors">
                    <td className="px-8 py-5">
                      <p className="font-black text-xs uppercase italic">UID: {item.userId}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">TX: {item.transactionId || 'N/A'}</p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1 rounded text-[9px] font-black uppercase ${darkMode ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-slate-100 text-slate-500'}`}>{item.method}</span>
                    </td>
                    <td className="px-8 py-5 text-center font-black text-sm text-[#f99616]">
                      ${item.amount?.toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleStatusUpdate(item._id, 'approve')} className="p-2 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all"><Check size={18} /></button>
                        <button onClick={() => handleStatusUpdate(item._id, 'reject')} className="p-2 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"><X size={18} /></button>
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

export default AdminFinance;
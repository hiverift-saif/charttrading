import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Snowflake, Download, ShieldAlert, Search, Loader2, ExternalLink, User as UserIcon } from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const AdminWithdrawals = () => {
  const { darkMode } = useTheme();
  const [withdrawals, setWithdrawals] = useState([]);
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  // 🔍 Filter Logic (Same as other modules)
  useEffect(() => {
    const result = withdrawals.filter(item => 
      item.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWithdrawals(result);
  }, [searchTerm, withdrawals]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${API_CONFIG.baseURL}/admin/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && Array.isArray(response.data.result)) {
        setWithdrawals(response.data.result);
        setFilteredWithdrawals(response.data.result);
      } else {
        setWithdrawals([]);
        setFilteredWithdrawals([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action, userId = null) => {
    const config = {
      approve: { url: `withdrawal/${id}/approve`, color: '#10b981', title: 'Confirm Approval' },
      reject: { url: `withdrawal/${id}/reject`, color: '#ef4444', title: 'Confirm Rejection' },
      freeze: { url: `wallet/${userId}/freeze`, color: '#3b82f6', title: 'Freeze User Wallet' }
    };

    const confirm = await Swal.fire({
      title: config[action].title,
      icon: action === 'freeze' ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: config[action].color,
      background: darkMode ? '#000' : '#fff',
      color: darkMode ? '#fff' : '#000',
      confirmButtonText: `Confirm ${action}`
    });

    if (confirm.isConfirmed) {
      Swal.fire({
        title: 'Processing...',
        didOpen: () => Swal.showLoading(),
        background: darkMode ? '#000' : '#fff',
        color: darkMode ? '#fff' : '#000',
        allowOutsideClick: false
      });

      try {
        const token = localStorage.getItem("admin_token");
        await axios.put(`${API_CONFIG.baseURL}/admin/${config[action].url}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        Swal.fire({ icon: 'success', title: 'Action Successful', timer: 2000, showConfirmButton: false });
        fetchWithdrawals();
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Operation Failed', text: err.response?.data?.message || 'Error' });
      }
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" /></div>;

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Withdrawal <span className="text-[#f99616]">Queue</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Settlement Authorization Terminal</p>
        </div>
        <div className="bg-[#f99616]/10 border border-[#f99616]/20 px-4 py-2 rounded-xl">
           <p className="text-[#f99616] font-black text-xs uppercase">{filteredWithdrawals.length} Pending Actions</p>
        </div>
      </div>

      {/* 🚀 STANDARD FILTER BAR (Rounded-2xl) */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search by UID or Transaction ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-[#f99616]' : 'bg-gray-50 border-gray-100 text-black focus:border-[#f99616]'}`}
          />
        </div>
      </div>

      {filteredWithdrawals.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-none opacity-50">
          <ShieldAlert size={48} className="mx-auto mb-4" />
          <p className="text-[10px] font-black uppercase tracking-[3px]">No matching settlements found</p>
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW: COMPACT CARDS */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {filteredWithdrawals.map((item) => (
              <div key={item._id} className={`p-4 rounded-2xl border ${darkMode ? 'bg-black border-zinc-800' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2">
                      <div className="p-2 bg-zinc-900 rounded-lg"><UserIcon size={14} className="text-[#f99616]" /></div>
                      <span className="text-[10px] font-black uppercase italic">UID: {item.userId?.slice(-10)}</span>
                   </div>
                   <span className="text-[9px] font-black text-orange-500 uppercase">{item.method}</span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-sm font-black text-white">${Math.abs(item.amount).toLocaleString()}</p>
                      <p className="text-[8px] font-bold text-gray-600 uppercase">TX: {item.transactionId?.slice(-10) || 'N/A'}</p>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => handleAction(item._id, 'approve')} className="p-2 bg-green-600 text-white rounded-xl active:scale-90 transition-transform"><Check size={16}/></button>
                      <button onClick={() => handleAction(item._id, 'reject')} className="p-2 bg-red-600 text-white rounded-xl active:scale-90 transition-transform"><X size={16}/></button>
                      <button onClick={() => handleAction(null, 'freeze', item.userId)} className="p-2 bg-blue-600 text-white rounded-xl active:scale-90 transition-transform"><Snowflake size={16}/></button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: SHARP BORDER TABLE */}
          <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} rounded-none overflow-hidden shadow-2xl`}>
            <table className="w-full text-left">
              <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">User / Network Identity</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Protocol</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Value</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
                {filteredWithdrawals.map((item) => (
                  <tr key={item._id} className="hover:bg-[#f99616]/5 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-black text-xs uppercase italic tracking-tighter">UID: {item.userId}</p>
                      <span className="text-[9px] font-bold text-gray-500 uppercase flex items-center gap-1 mt-1">
                         TXID: {item.transactionId || 'N/A'} <ExternalLink size={8} />
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1 rounded text-[9px] font-black uppercase ${darkMode ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' : 'bg-slate-100 text-slate-500'}`}>{item.method}</span>
                    </td>
                    <td className="px-8 py-5 text-center font-black text-sm text-white italic">
                      ${Math.abs(item.amount).toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleAction(item._id, 'approve')} className="p-2.5 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-xl"><Check size={18} /></button>
                        <button onClick={() => handleAction(item._id, 'reject')} className="p-2.5 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"><X size={18} /></button>
                        <div className="w-[1px] h-4 bg-zinc-800 mx-1"></div>
                        <button onClick={() => handleAction(null, 'freeze', item.userId)} className="p-2.5 border border-blue-500/30 text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-xl" title="Freeze Wallet"><Snowflake size={18} /></button>
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

export default AdminWithdrawals;
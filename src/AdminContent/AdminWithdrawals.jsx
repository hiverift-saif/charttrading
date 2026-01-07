import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Snowflake, Download, ShieldAlert, Search, Loader2, ExternalLink } from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const AdminWithdrawals = () => {
  const { darkMode } = useTheme();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${API_CONFIG.baseURL}/admin/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && Array.isArray(response.data.result)) {
        setWithdrawals(response.data.result);
      } else {
        setWithdrawals([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredWithdrawals = Array.isArray(withdrawals) 
    ? withdrawals.filter(item => 
        item.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleAction = async (id, action, userId = null) => {
    const config = {
      approve: { url: `withdrawal/${id}/approve`, color: '#10b981', title: 'Confirm Approval' },
      reject: { url: `withdrawal/${id}/reject`, color: '#ef4444', title: 'Confirm Rejection' },
      freeze: { url: `wallet/${userId}/freeze`, color: '#3b82f6', title: 'Freeze User Wallet' }
    };

    const confirm = await Swal.fire({
      title: config[action].title,
      text: action === 'freeze' ? "This will restrict all financial activity for this user." : `Proceed with ${action}?`,
      icon: action === 'freeze' ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: config[action].color,
      cancelButtonColor: '#1a1a1a',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000',
      confirmButtonText: `Confirm ${action}`
    });

    if (confirm.isConfirmed) {
      Swal.fire({
        title: 'Updating Logs...',
        didOpen: () => Swal.showLoading(),
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        allowOutsideClick: false
      });

      try {
        const token = localStorage.getItem("admin_token");
        const response = await axios.put(
          `${API_CONFIG.baseURL}/admin/${config[action].url}`, 
          {}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          Swal.fire({
            title: 'Action Successful',
            text: response.data.message || 'Operation completed successfully.',
            icon: 'success',
            background: darkMode ? '#0d0d0d' : '#fff',
            color: darkMode ? '#fff' : '#000',
            timer: 2000,
            showConfirmButton: false
          });
          fetchWithdrawals();
        }
      } catch (err) {
        Swal.fire({
          title: 'Operation Failed',
          text: err.response?.data?.message || 'Server error occurred.',
          icon: 'error',
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] w-full">
        <Loader2 className="w-12 h-12 animate-spin text-[#f99616] mb-4" />
        <p className={`${darkMode ? 'text-gray-500' : 'text-slate-400'} font-black uppercase tracking-[4px] text-[10px]`}>Scanning Ledger...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Withdrawal <span className="text-[#f99616]">Queue</span>
          </h2>
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
            Financial Settlement Protocol
          </p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input 
            type="text" 
            placeholder="Search UID or Transaction..." 
            className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-[11px] outline-none transition-all font-bold
              ${darkMode 
                ? "bg-[#0d0d0d] border-gray-800 text-white focus:border-[#f99616]" 
                : "bg-white border-slate-200 text-slate-900 focus:border-[#f99616] shadow-sm"}`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      {filteredWithdrawals.length === 0 ? (
        <div className={`${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'} border rounded-3xl p-24 text-center shadow-2xl transition-all`}>
          <ShieldAlert size={56} className={`${darkMode ? 'text-gray-800' : 'text-slate-200'} mx-auto mb-4`} />
          <h3 className={`font-black uppercase italic text-lg mb-1 tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>Queue Clear</h3>
          <p className={`${darkMode ? 'text-gray-600' : 'text-slate-400'} text-[10px] font-bold uppercase tracking-[2px]`}>No pending settlements found</p>
        </div>
      ) : (
        <div className={`${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'} border rounded-3xl overflow-hidden shadow-2xl transition-all`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${darkMode ? 'bg-black/50 border-gray-800' : 'bg-slate-50 border-slate-100'} border-b`}>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">User / UID</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Method</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Review Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-900' : 'divide-slate-50'}`}>
                {filteredWithdrawals.map((item) => (
                  <tr key={item._id} className={`transition-colors group ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-red-500 transition-all shadow-inner 
                          ${darkMode ? 'bg-black border-gray-800 group-hover:border-red-500/30' : 'bg-slate-50 border-slate-200'}`}>
                          <Download size={18} className="rotate-180" />
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>UID: {item.userId?.slice(-8)}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1 ${darkMode ? 'text-gray-600' : 'text-slate-400'}`}>
                            TXID: {item.transactionId?.slice(-12) || 'N/A'} <ExternalLink size={8} />
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-colors
                        ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-400 group-hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-500 group-hover:text-slate-900'}`}>
                        {item.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <p className={`font-black text-sm tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>${Math.abs(item.amount).toLocaleString()}</p>
                        {item.riskFlag && <span className="text-[7px] text-red-500 font-black uppercase animate-pulse tracking-tighter">! Risk Detected</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full w-fit border
                        ${item.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                        {item.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <button 
                          onClick={() => handleAction(item._id, 'approve')}
                          className="p-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-lg"
                        >
                          <Check size={16} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => handleAction(item._id, 'reject')}
                          className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                        >
                          <X size={16} strokeWidth={3} />
                        </button>
                        <div className={`w-[1px] h-4 mx-1 ${darkMode ? 'bg-gray-800' : 'bg-slate-200'}`}></div>
                        <button 
                          onClick={() => handleAction(null, 'freeze', item.userId)} 
                          className={`p-2 rounded-xl border transition-all shadow-lg
                            ${darkMode 
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500 hover:text-white" 
                              : "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white"}`}
                          title="Freeze Wallet"
                        >
                          <Snowflake size={16} strokeWidth={2.5}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWithdrawals;
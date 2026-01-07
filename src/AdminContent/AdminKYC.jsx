import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Loader2, Check, X, User, Calendar, MessageCircle, Crown, ExternalLink, ShieldAlert } from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

const AdminKYC = () => {
  // 🚀 Theme Logic
  const { darkMode } = useTheme();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKYCQueue();
  }, []);

  const fetchKYCQueue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      
      const response = await axios.get(`${API_CONFIG.baseURL}/admin/kyc/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && Array.isArray(response.data.result)) {
        setPendingUsers(response.data.result);
      } else if (Array.isArray(response.data)) {
        setPendingUsers(response.data);
      } else {
        setPendingUsers([]);
      }
    } catch (err) {
      console.error("KYC Fetch Error:", err);
      setPendingUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action) => {
    const result = await Swal.fire({
      title: 'KYC Authorization',
      text: `Are you sure you want to ${action} this user's clearance?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#10b981' : '#ef4444',
      cancelButtonColor: '#1a1a1a',
      confirmButtonText: `Yes, ${action}`,
      background: darkMode ? '#0d0d0d' : '#fff', // 🚀 Theme aware alert
      color: darkMode ? '#fff' : '#000'
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Authorizing...',
        didOpen: () => Swal.showLoading(),
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        allowOutsideClick: false
      });

      try {
        const token = localStorage.getItem("admin_token");
        await axios.put(
          `${API_CONFIG.baseURL}/admin/kyc/${userId}/${action}`, 
          {}, 
          { headers: { Authorization: `Bearer ${token}` }}
        );

        Swal.fire({
          icon: 'success',
          title: 'Processed',
          text: `User clearance ${action}d successfully`,
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          timer: 2000,
          showConfirmButton: false
        });

        fetchKYCQueue(); 
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: err.response?.data?.message || 'Error processing request',
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
        <p className={`${darkMode ? 'text-gray-500' : 'text-slate-400'} font-black uppercase tracking-[4px] text-[10px]`}>Accessing Secure Queue...</p>
      </div>
    );
  }

  const safePendingUsers = Array.isArray(pendingUsers) ? pendingUsers : [];

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-black uppercase italic tracking-tighter">
             KYC <span className="text-[#f99616]">Queue</span>
           </h2>
           <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
             Manual Verification Protocol
           </p>
        </div>
        <div className="bg-[#f99616]/10 border border-[#f99616]/20 px-4 py-2 rounded-xl">
           <p className="text-[#f99616] font-black text-xs uppercase">{safePendingUsers.length} Pending</p>
        </div>
      </div>

      {safePendingUsers.length === 0 ? (
        <div className={`${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'} border rounded-3xl p-24 text-center shadow-2xl transition-all`}>
          <ShieldCheck size={56} className={`${darkMode ? 'text-gray-800' : 'text-slate-200'} mx-auto mb-4`} />
          <h3 className={`font-black uppercase italic text-lg mb-1 tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>Queue Clear</h3>
          <p className={`${darkMode ? 'text-gray-600' : 'text-slate-400'} text-[10px] font-bold uppercase tracking-[2px]`}>All documents have been processed</p>
        </div>
      ) : (
        <div className={`${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'} border rounded-3xl overflow-hidden shadow-2xl transition-all`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${darkMode ? 'bg-black/50 border-gray-800' : 'bg-slate-50 border-slate-100'} border-b`}>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">User Identity</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Tier</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Balance</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Review</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-900' : 'divide-slate-50'}`}>
                {safePendingUsers.map((user) => (
                  <tr key={user._id} className={`transition-colors group ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[#f99616] font-black text-lg relative transition-all shadow-inner 
                          ${darkMode ? 'bg-black border-gray-800 group-hover:border-[#f99616]/40' : 'bg-slate-50 border-slate-200 group-hover:border-[#f99616]'}`}>
                          {user.email?.charAt(0).toUpperCase()}
                          {user.isLeader && <Crown size={10} className="absolute -top-1 -right-1 text-[#f99616] fill-[#f99616]" />}
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.name || 'Anonymous'}</span>
                          <span className={`text-[10px] font-bold lowercase truncate max-w-[140px] ${darkMode ? 'text-gray-600' : 'text-slate-400'}`}>{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-colors
                        ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-400 group-hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-500 group-hover:text-slate-900'}`}>
                        {user.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-black text-sm tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>${user.realBalance?.toLocaleString()}</p>
                      <p className={`text-[8px] font-bold uppercase tracking-tighter flex items-center gap-1 ${darkMode ? 'text-gray-600' : 'text-slate-400'}`}>
                        ID: {user._id?.slice(-6)} <ExternalLink size={8} />
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MessageCircle size={14} className={user.whatsapp ? "text-green-500" : (darkMode ? "text-gray-800" : "text-slate-300")} />
                        <span className={`text-[11px] font-bold tracking-tight ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>{user.whatsapp || 'No Contact'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <button 
                          onClick={() => handleAction(user._id, 'approve')}
                          className="p-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-lg"
                        >
                          <Check size={16} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => handleAction(user._id, 'reject')}
                          className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                        >
                          <X size={16} strokeWidth={3} />
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

export default AdminKYC;
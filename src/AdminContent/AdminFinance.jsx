import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Download, Loader2, AlertCircle } from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const AdminFinance = () => {
  const { darkMode } = useTheme();
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${API_CONFIG.baseURL}/admin/deposits`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Sirf pending deposits filter kar rahe hain
      const allData = response.data?.result || response.data || [];
      const pendingOnly = allData.filter(d => d.status === 'pending');
      setDeposits(pendingOnly);
      
    } catch (err) {
      console.error("Finance Fetch Error:", err);
      setDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, action) => {
    const result = await Swal.fire({
      title: `Confirm ${action === 'approve' ? 'Approval' : 'Rejection'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#10b981' : '#ef4444',
      cancelButtonColor: '#1a1a1a',
      confirmButtonText: `Yes, ${action} it!`,
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000'
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Processing...',
        didOpen: () => Swal.showLoading(),
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        allowOutsideClick: false
      });

      try {
        const token = localStorage.getItem("admin_token");
        await axios.put(
          `${API_CONFIG.baseURL}/admin/deposit/${id}/${action}`, 
          {}, 
          { headers: { Authorization: `Bearer ${token}` }}
        );

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Deposit has been ${action}d.`,
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          timer: 2000,
          showConfirmButton: false
        });
        fetchDeposits(); // List refresh
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: err.response?.data?.message || 'Error processing transaction.',
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
        <p className={`${darkMode ? 'text-gray-500' : 'text-slate-400'} font-black uppercase tracking-[4px] text-[10px]`}>Scanning Pending Requests...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 animate-in fade-in duration-700 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            Pending <span className="text-[#f99616]">Deposits</span>
          </h2>
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
            Awaiting Administrative Approval
          </p>
        </div>
        <div className={`${darkMode ? 'bg-orange-500/10' : 'bg-orange-50'} border border-[#f99616]/20 px-4 py-2 rounded-xl`}>
           <p className="text-[#f99616] font-black text-xs uppercase">{deposits.length} Requests</p>
        </div>
      </div>

      {deposits.length === 0 ? (
        <div className={`${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200 shadow-sm'} border rounded-3xl p-24 text-center transition-all`}>
          <AlertCircle size={56} className={`${darkMode ? 'text-gray-800' : 'text-slate-200'} mx-auto mb-4`} />
          <h3 className={`font-black uppercase italic text-lg mb-1 tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>Queue Clear</h3>
          <p className={`${darkMode ? 'text-gray-600' : 'text-slate-400'} font-bold uppercase text-[10px] tracking-widest`}>No pending transactions to show</p>
        </div>
      ) : (
        <div className={`${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'} border rounded-3xl overflow-hidden shadow-2xl transition-all`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${darkMode ? 'bg-black/50 border-gray-800' : 'bg-slate-50 border-slate-100'} border-b`}>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Transaction / User</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Method</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Value</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Decision</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-900' : 'divide-slate-50'}`}>
                {deposits.map((item) => (
                  <tr key={item._id} className={`transition-colors group ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-orange-500 bg-orange-500/10 border-orange-500/20 shadow-inner`}>
                          <Download size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>UID: {item.userId?.slice(-8)}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-tighter ${darkMode ? 'text-gray-600' : 'text-slate-400'}`}>
                            TXID: {item.transactionId?.slice(-12) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${darkMode ? 'bg-black border-gray-800 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                        {item.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className={`font-black text-sm tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        ${item.amount?.toLocaleString()}
                      </p>
                      <span className="text-[8px] font-black uppercase text-orange-500 tracking-widest">Awaiting Approval</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(item._id, 'approve')}
                          className="p-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-lg"
                        >
                          <Check size={16} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(item._id, 'reject')}
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

export default AdminFinance;
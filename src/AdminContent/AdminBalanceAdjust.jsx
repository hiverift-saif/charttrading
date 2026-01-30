import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Wallet, Search, Loader2, RefreshCcw, ChevronLeft, 
  ChevronRight, ArrowUpRight, ArrowDownLeft, X, Check, Activity
} from 'lucide-react';
import Swal from 'sweetalert2';
import API_CONFIG from '../config';

const AdminBalanceAdjust = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustData, setAdjustData] = useState({ amount: "", reason: "" });
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const itemsPerPage = 10;

  // --- 🚀 1. FETCH USERS API ---
  const fetchUsers = useCallback(async () => {
    console.log("📡 Attempting to fetch users...");
    setLoading(true);
    const token = localStorage.getItem("admin_token");
    
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      console.log("✅ Fetch Users Response:", data);

      if (response.ok) {
        setUsers(data.result?.users || data.users || []);
      }
    } catch (err) { 
      console.error("🚨 Network Error:", err); 
    }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // --- 💰 2. ADJUST BALANCE API ---
  const handleAdjustBalance = async (e) => {
    e.preventDefault();
    if (!selectedUser || !adjustData.amount) return;

    const payload = {
      amount: Number(adjustData.amount),
      reason: adjustData.reason || "Administrative Adjustment"
    };

    setIsActionLoading(true);
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/admin/users/${selectedUser._id}/balance-adjust`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok || data.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Balance Adjusted',
          html: `New Balance: <b style="color:#f99616">$${data.result.newBalance}</b>`,
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
        });
        setSelectedUser(null);
        setAdjustData({ amount: "", reason: "" });
        fetchUsers(); 
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Network Failure' });
    } finally {
      setIsActionLoading(false);
    }
  };

  // --- 🔍 FILTER & PAGINATION LOGIC (FIXED) ---
  const filteredUsers = useMemo(() => users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || u._id?.includes(searchTerm)
  ), [users, searchTerm]);

  // ✅ Defining missing variables here
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">
          Balance <span className="text-[#f99616]">Adjuster</span>
        </h2>
        <span className="text-[10px] font-black bg-[#f99616]/10 text-[#f99616] px-3 py-1 rounded-md border border-[#f99616]/20">
          {filteredUsers.length} NODES
        </span>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" placeholder="Search user..." value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-[#f99616]' : 'bg-gray-50 border-gray-100'}`}
          />
        </div>
        <button onClick={fetchUsers} className="p-3 bg-[#f99616]/10 text-[#f99616] rounded-xl border border-[#f99616]/20 active:scale-95 transition-all">
          <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* 💻 DESKTOP TABLE */}
      <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} overflow-hidden shadow-2xl`}>
        <table className="w-full text-left">
          <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
            <tr>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">User Node</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">Current Credit</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-right">Adjustment</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
            {currentItems.map((user) => (
              <tr key={user._id} className="hover:bg-[#f99616]/5 transition-colors">
                <td className="px-8 py-5">
                  <p className="font-black text-xs uppercase italic">{user.email}</p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">UID: {user._id}</p>
                </td>
                <td className="px-8 py-5">
                   <span className="text-sm font-black text-[#f99616] tracking-tighter">${user.balance || 0}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button onClick={() => setSelectedUser(user)} className="px-4 py-2 bg-[#f99616] text-black text-[9px] font-black uppercase rounded-lg shadow-lg shadow-orange-500/10 active:scale-95 transition-all">
                    Adjust Balance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE CARDS */}
      <div className="grid grid-cols-1 gap-3 lg:hidden">
        {currentItems.map((user) => (
          <div key={user._id} className={`p-4 rounded-2xl border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-md"}`}>
             <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-black uppercase italic truncate max-w-[150px]">{user.email}</p>
                <span className="text-xs font-black text-[#f99616]">${user.balance || 0}</span>
             </div>
             <button onClick={() => setSelectedUser(user)} className="w-full py-3 bg-[#f99616]/10 text-[#f99616] border border-[#f99616]/20 rounded-xl text-[10px] font-black uppercase tracking-widest">Modify Credits</button>
          </div>
        ))}
      </div>

      {/* 🔢 PAGINATION CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 pb-10">
        <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
          Nodes {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length}
        </p>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className={`p-2 border rounded-xl transition-all ${currentPage === 1 ? 'opacity-20' : 'text-[#f99616]'}`}><ChevronLeft size={18} /></button>
          <div className="flex items-center px-4 font-black text-xs text-[#f99616]">{currentPage} / {totalPages}</div>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage >= totalPages} className={`p-2 border rounded-xl transition-all ${currentPage >= totalPages ? 'opacity-20' : 'text-[#f99616]'}`}><ChevronRight size={18} /></button>
        </div>
      </div>

      {/* 🚀 MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 lg:left-72 z-[700] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
          <div className={`relative w-full max-w-md rounded-[2.5rem] border p-10 shadow-2xl animate-in zoom-in-95 duration-200 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white text-black"}`}>
            <button onClick={() => setSelectedUser(null)} className="absolute right-6 top-6 text-gray-500 hover:text-red-500"><X size={20}/></button>
            
            <form onSubmit={handleAdjustBalance} className="flex flex-col space-y-6">
              <div className="flex flex-col items-center text-center space-y-2">
                 <div className="p-4 bg-[#f99616]/10 rounded-full text-[#f99616]"><Wallet size={32} /></div>
                 <h3 className="text-xl font-black uppercase italic italic tracking-tighter">Modify <span className="text-[#f99616]">Balance</span></h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{selectedUser.email}</p>
              </div>

              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Adjustment Amount</label>
                  <input 
                    type="number" required value={adjustData.amount} onChange={(e) => setAdjustData({...adjustData, amount: e.target.value})}
                    placeholder="e.g. 10 or -10"
                    className="w-full bg-zinc-900 border border-gray-800 rounded-2xl p-4 text-sm font-black text-white outline-none focus:border-[#f99616]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Internal Reason</label>
                  <input 
                    type="text" value={adjustData.reason} onChange={(e) => setAdjustData({...adjustData, reason: e.target.value})}
                    placeholder="Bonus, Correction, etc."
                    className="w-full bg-zinc-900 border border-gray-800 rounded-2xl p-4 text-sm font-black text-white outline-none focus:border-[#f99616]"
                  />
                </div>
              </div>

              <button disabled={isActionLoading} type="submit" className="w-full h-14 bg-[#f99616] text-black font-black rounded-2xl uppercase text-[11px] tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                {isActionLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Update User Balance"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBalanceAdjust;
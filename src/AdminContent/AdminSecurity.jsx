import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  Search, Loader2, RefreshCcw, ChevronLeft, ChevronRight, 
  ShieldAlert, Lock, Unlock, X, KeyRound, LogOut 
} from 'lucide-react';
import Swal from 'sweetalert2';
import API_CONFIG from '../config';

const AdminSecurity = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockReason, setBlockReason] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const isMounted = useRef(true);
  const itemsPerPage = 10; // As per your KYC reference

  // --- 🚀 FETCH USERS ---
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (isMounted.current && response.ok) {
        setUsers(data.result?.users || data.users || []);
      }
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      if (isMounted.current) setLoading(false); 
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchUsers();
    return () => { isMounted.current = false; };
  }, [fetchUsers]);

  // --- 🚪 FORCE LOGOUT ---
  const handleForceLogout = async (userId, email) => {
    const confirm = await Swal.fire({
      title: 'Force Logout?',
      text: `Terminate all active sessions for ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Logout User',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000',
    });

    if (confirm.isConfirmed) {
      setIsActionLoading(true);
      const token = localStorage.getItem("admin_token");
      try {
        const response = await fetch(`${API_CONFIG.baseURL}/admin/security/force-logout`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ userId: userId }) 
        });

        const data = await response.json();
        if (response.ok || data.statusCode === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Sessions Terminated',
            text: data.message,
            background: darkMode ? '#0d0d0d' : '#fff',
          });
        }
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Action Failed' });
      } finally { setIsActionLoading(false); }
    }
  };

  // --- 🛡️ BLOCK/UNBLOCK LOGIC ---
  const handleToggleBlock = async () => {
    if (!selectedUser) return;
    setIsActionLoading(true);
    const token = localStorage.getItem("admin_token");
    const currentlyBlocked = selectedUser.isBlocked === "true" || selectedUser.isBlocked === true;
    
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/admin/users/${selectedUser._id}/block`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          block: currentlyBlocked ? "false" : "true",
          reason: currentlyBlocked ? "Unblocked by Admin" : blockReason || "Security Violation"
        })
      });
      if (response.ok) {
        setSelectedUser(null);
        setBlockReason("");
        fetchUsers();
      }
    } finally { setIsActionLoading(false); }
  };

  // --- 🔑 RESET PASSWORD ---
  const handleResetPassword = async (userId, email) => {
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/admin/users/${userId}/reset-password`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({ 
          title: 'New Password Generated', 
          text: `Temp Password: ${data.result.newPassword}`, 
          icon: 'success',
          background: darkMode ? '#0d0d0d' : '#fff'
        });
      }
    } catch (err) { console.error(err); }
  };

  // --- 🔍 Filter & Pagination ---
  const filteredData = useMemo(() => {
    return users.filter(u => u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || u._id?.includes(searchTerm));
  }, [users, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading && users.length === 0) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
          Security <span className="text-[#f99616]">Terminal</span>
        </h2>
        <span className="text-[10px] font-black bg-[#f99616]/10 text-[#f99616] px-3 py-1 rounded-md border border-[#f99616]/20">
          {filteredData.length} NODES
        </span>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search security node by email or UID..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-[#f99616]' : 'bg-gray-50 border-gray-100 text-black focus:border-[#f99616]'}`}
          />
        </div>
        <button onClick={fetchUsers} className="p-3 bg-[#f99616]/10 text-[#f99616] rounded-xl border border-[#f99616]/20 active:scale-95 transition-all">
          <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {filteredData.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-none opacity-50">
          <ShieldAlert size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[3px]">Node Registry Empty</p>
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW: COMPACT CARDS */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {currentItems.map((user) => {
              const isBlocked = user.isBlocked === "true" || user.isBlocked === true;
              return (
                <div key={user._id} className={`p-4 rounded-2xl border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-md"}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f99616]/10 rounded-xl"><ShieldAlert size={18} className="text-[#f99616]" /></div>
                      <div className="max-w-[140px] overflow-hidden">
                        <p className="text-xs font-black uppercase italic truncate">{user.email}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">UID: {user._id.slice(-8)}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${isBlocked ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                      {isBlocked ? "Banned" : "Active"}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mb-2">
                     <button onClick={() => handleForceLogout(user._id, user.email)} className="flex-1 py-3 bg-red-600/10 text-red-500 rounded-xl font-black uppercase text-[9px] border border-red-500/20">Logout</button>
                     <button onClick={() => handleResetPassword(user._id, user.email)} className="flex-1 py-3 bg-orange-600/10 text-orange-500 rounded-xl font-black uppercase text-[9px] border border-orange-500/20">Reset</button>
                  </div>
                  <button onClick={() => setSelectedUser(user)} className={`w-full py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all ${isBlocked ? "border-green-500/30 text-green-500" : "border-red-500/30 text-red-500"}`}>
                    {isBlocked ? "Restore Access" : "Block"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* 💻 DESKTOP VIEW: SHARP BORDER TABLE */}
          <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} rounded-none overflow-hidden shadow-2xl`}>
            <table className="w-full text-left">
              <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">Node Identity</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Protocol Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Authorization</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
                {currentItems.map((user) => {
                  const isBlocked = user.isBlocked === "true" || user.isBlocked === true;
                  return (
                    <tr key={user._id} className="hover:bg-[#f99616]/5 transition-colors group">
                      <td className="px-8 py-5">
                        <p className="font-black text-xs uppercase italic tracking-tighter">{user.email}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">UID: {user._id}</p>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isBlocked ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-green-500/10 text-green-500 border border-green-500/20"}`}>
                          {isBlocked ? "Restricted" : "Authorized"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => handleForceLogout(user._id, user.email)} className="p-2.5 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90" title="Force Logout"><LogOut size={16} /></button>
                          <button onClick={() => handleResetPassword(user._id, user.email)} className="p-2.5 border border-orange-500/20 text-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-90" title="Reset Password"><KeyRound size={16}/></button>
                          <button onClick={() => setSelectedUser(user)} className={`px-4 py-2 border font-black uppercase text-[9px] transition-all active:scale-95 ${isBlocked ? "border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white" : "border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white"}`}>
                             {isBlocked ? "Restore" : "Block"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 🔢 PAGINATION */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 pb-10">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} Nodes
            </p>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className={`p-2 border rounded-xl transition-all ${currentPage === 1 ? 'opacity-20' : 'text-[#f99616]'}`}><ChevronLeft size={18} /></button>
              <div className="flex items-center px-4 font-black text-xs text-[#f99616]">{currentPage} / {totalPages}</div>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={`p-2 border rounded-xl transition-all ${currentPage === totalPages ? 'opacity-20' : 'text-[#f99616]'}`}><ChevronRight size={18} /></button>
            </div>
          </div>
        </>
      )}

      {/* 🚀 ACTION MODAL (Persistent Sidebar) */}
      {selectedUser && (
        <div className="fixed inset-0 lg:left-72 z-[700] flex items-center justify-center p-4 transition-all duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
          <div className={`relative w-full max-w-md rounded-[2.5rem] border p-10 shadow-2xl animate-in zoom-in-95 duration-200 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white"}`}>
            <button onClick={() => setSelectedUser(null)} className="absolute right-6 top-6 text-gray-500 hover:text-red-500"><X size={20}/></button>
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className={`p-5 rounded-full ${(selectedUser.isBlocked === "true" || selectedUser.isBlocked === true) ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                <ShieldAlert size={40} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase italic italic">{(selectedUser.isBlocked === "true" || selectedUser.isBlocked === true) ? "Restore" : "Restrict"} Access</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest">{selectedUser.email}</p>
              </div>

              {!(selectedUser.isBlocked === "true" || selectedUser.isBlocked === true) && (
                <div className="w-full space-y-2 text-left">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Protocol Violation Reason</label>
                  <textarea 
                    value={blockReason} onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="Enter reason for account restriction..."
                    className="w-full bg-zinc-900/50 border border-gray-800 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:border-red-500 transition-all"
                    rows="3"
                  />
                </div>
              )}

              <div className="flex gap-4 w-full pt-4">
                <button onClick={() => setSelectedUser(null)} className="flex-1 px-4 py-4 rounded-2xl border border-gray-800 text-[11px] font-black uppercase text-gray-500">Cancel</button>
                <button 
                  onClick={handleToggleBlock} 
                  disabled={isActionLoading || (!(selectedUser.isBlocked === "true" || selectedUser.isBlocked === true) && !blockReason)}
                  className={`flex-1 px-4 py-4 rounded-2xl text-[11px] font-black uppercase text-white shadow-lg active:scale-95 transition-all ${
                    (selectedUser.isBlocked === "true" || selectedUser.isBlocked === true) ? "bg-green-600 shadow-green-900/20" : "bg-red-600 shadow-red-900/20"
                  }`}
                >
                  {isActionLoading ? <Loader2 className="animate-spin" size={16} /> : "Execute Protocol"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSecurity;
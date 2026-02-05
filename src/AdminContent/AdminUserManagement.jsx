import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Loader2, Eye, X, MailCheck, MailWarning, 
  ShieldCheck, ShieldAlert, ChevronLeft, ChevronRight, 
  Search, Globe, Phone, Wallet, Activity, User as UserIcon
} from "lucide-react";
import API_CONFIG from "../config";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Ye import zaroori hai
import { useTheme } from "../context/ThemeContext";

const AdminUserManagement = ({ filterType }) => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetchUsers(pagination.page, filterType);
    setSearchQuery(""); 
  }, [pagination.page, filterType]);

  useEffect(() => {
    const result = users.filter(u => 
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u._id?.includes(searchQuery)
    );
    setFilteredUsers(result);
  }, [searchQuery, users]);

  const fetchUsers = async (page, filter) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const backendFilter = filter ? filter.replace('users_', '') : 'all';
      let url = `${API_CONFIG.baseURL}/user?page=${page}&limit=10`;
      if (backendFilter !== 'all') url += `&filter=${backendFilter}`;

      const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = res.data.data || [];
      setUsers(data);
      setFilteredUsers(data);
      setPagination({ page: res.data.page, totalPages: res.data.totalPages, total: res.data.total });
    } catch (err) { setUsers([]); } finally { setLoading(false); }
  };

  const fetchSingleUser = async (id) => {
    try {
      setDetailsLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${API_CONFIG.baseURL}/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setSelectedUser(res.data);
    } catch (err) { console.error(err); } finally { setDetailsLoading(false); }
  };

  if (loading && pagination.page === 1) return <div className="h-96 flex justify-center items-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <div className="space-y-6">
      {/* 🔍 HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter">
            Protocol: <span className="text-[#f99616]">{filterType ? filterType.replace('users_', '').replace('_', ' ') : 'Global Fleet'}</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">{pagination.total} Entities Found</p>
        </div>

        <div className={`p-2 rounded-2xl border flex items-center gap-2 w-full md:w-80 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <Search className="ml-3 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search email or UID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full p-2.5 text-xs font-bold outline-none bg-transparent ${darkMode ? 'text-white' : 'text-black'}`}
          />
        </div>
      </div>

      {/* 📱 MOBILE VIEW: DATA CARDS */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredUsers.map((u) => (
          <div key={u._id} className={`p-5 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-xl"}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* <img src={u.avatarPath || "/default.png"} className="w-12 h-12 rounded-2xl border border-zinc-800" /> */}
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-100 border-gray-200"}`}>
  <UserIcon size={24} className="text-[#f99616]" />
</div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${u.accountBlocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                </div>
                <div>
                  <p className="font-black text-xs uppercase italic truncate max-w-[150px]">{u.email.split('@')[0]}</p>
                  <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">{u.email}</p>
                </div>
              </div>
              <button onClick={() => fetchSingleUser(u._id)} className="p-3 bg-[#f99616]/10 rounded-2xl text-[#f99616]"><Eye size={18} /></button>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-zinc-900 pt-4">
              <div className="p-3 bg-zinc-900/40 rounded-2xl border border-zinc-800/50">
                 <p className="text-[8px] font-bold text-gray-500 uppercase mb-1">Equity</p>
                 <p className="text-xs font-black text-[#f99616]">${u.realBalance?.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-zinc-900/40 rounded-2xl border border-zinc-800/50">
                 <p className="text-[8px] font-bold text-gray-500 uppercase mb-1">KYC Status</p>
                 <p className={`text-[9px] font-black uppercase ${u.kycStatus === 'approved' ? 'text-green-500' : 'text-orange-500'}`}>{u.kycStatus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 DESKTOP VIEW: SHARP TABLE */}
      <div className={`hidden lg:block border rounded-none overflow-hidden ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white shadow-2xl'}`}>
        <table className="w-full text-left">
          <thead className={`text-[10px] font-black uppercase text-gray-500 border-b border-zinc-800 ${darkMode ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-8 py-4">Identity</th>
              <th className="px-8 py-4 text-center">Protocol</th>
              <th className="px-8 py-4 text-center">Real Equity</th>
              <th className="px-8 py-4 text-center">KYC Status</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {filteredUsers.map(u => (
              <tr key={u._id} className="hover:bg-[#f99616]/5 transition-colors">
                <td className="px-8 py-5">
                   <div className="flex items-center gap-3">
                      <div className="relative">
                         {/* <img src={u.avatarPath || "/default.png"} className="w-8 h-8 rounded-lg border border-zinc-800" /> */}
                         <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-100 border-gray-200"}`}>
  <UserIcon size={18} className="text-[#f99616]" />
</div>
                         <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-black ${u.accountBlocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      </div>
                      <p className="text-xs font-black italic uppercase">{u.email}</p>
                   </div>
                </td>
                <td className="px-8 py-5 text-center uppercase font-black text-[10px] opacity-60">{u.role}</td>
                <td className="px-8 py-5 text-center font-black text-[#f99616] italic text-xs">${u.realBalance?.toLocaleString()}</td>
                <td className="px-8 py-5 text-center">
                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase ${u.kycStatus === 'approved' ? 'text-green-500 bg-green-500/10' : 'text-orange-500 bg-orange-500/10'}`}>
                      {u.kycStatus}
                   </div>
                </td>
                <td className="px-8 py-5 text-right">
                   <button onClick={() => fetchSingleUser(u._id)} className="p-2 border border-zinc-800 rounded-xl hover:text-[#f99616] transition-all"><Eye size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔢 PAGINATION */}
      <div className="flex justify-between items-center p-4 bg-zinc-900/10 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-gray-500">
         <span>Fleet Page {pagination.page} / {pagination.totalPages}</span>
         <div className="flex gap-2">
            <button disabled={pagination.page === 1} onClick={() => setPagination(p => ({...p, page: p.page - 1}))} className="p-2 border border-zinc-800 rounded-xl disabled:opacity-20 hover:border-[#f99616] transition-colors"><ChevronLeft size={16}/></button>
            <button disabled={pagination.page === pagination.totalPages} onClick={() => setPagination(p => ({...p, page: p.page + 1}))} className="p-2 border border-zinc-800 rounded-xl disabled:opacity-20 hover:border-[#f99616] transition-colors"><ChevronRight size={16}/></button>
         </div>
      </div>

      {/* 🚀 OPERATIONAL MODAL */}
<AnimatePresence>
  {selectedUser && (
    <motion.div 
      // Background Overlay
initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 lg:left-72 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
    >


      <motion.div 
        // Modal Body (Smooth Zoom & Slide)
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl border border-zinc-800 bg-black p-6 md:p-8 rounded-[2rem] shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
           <h3 className="font-black uppercase italic text-xl text-[#f99616] flex items-center gap-3">
              <Activity size={20}/> Operational Analytics
           </h3>
           <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded-xl transition-all"><X size={20}/></button>
        </div>
        
        {/* Stat Boxes & Info Rows (Same as before) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
           <StatBox label="Total Trades" value={selectedUser.totalTrades || 0} />
           <StatBox label="Active Orders" value={selectedUser.totalOrders || 0} />
           <StatBox label="Real Equity" value={`$${selectedUser.realBalance}`} color="#f99616" />
           <StatBox label="Wallet Bal" value={`$${selectedUser.walletBalance}`} color="#f99616" />
        </div>

        <div className="space-y-3">
           <InfoRow label="Email Identity" value={selectedUser.email} />
           <InfoRow label="Contact Node" value={selectedUser.phone || 'N/A'} />
           <InfoRow label="Tier Protocol" value={selectedUser.tier} />
           <InfoRow label="Region" value={selectedUser.country} />
        </div>
      </motion.div>

    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

const StatBox = ({ label, value, color }) => (
  <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
    <p className="text-[8px] font-black text-gray-500 uppercase mb-1">{label}</p>
    <p className="text-lg font-black italic" style={{ color: color || 'white' }}>{value}</p>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 border-b border-zinc-900/50">
     <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
     <span className="text-[10px] font-black uppercase text-white italic text-right truncate max-w-[60%]">{value}</span>
  </div>
);

export default AdminUserManagement;
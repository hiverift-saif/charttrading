import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { 
  Users, Search, ChevronLeft, ChevronRight, Loader2, 
  TrendingUp, MousePointer2, UserPlus, Wallet2, 
  UserCircle2, ShieldCheck, ShieldAlert 
} from "lucide-react";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext";

const ReferralTree = () => {
  const { darkMode } = useTheme();
  const [referralLogs, setReferralLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchReferralLogs = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${API_CONFIG.baseURL}/referral/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // API returns an array directly based on your JSON
      const data = Array.isArray(res.data) ? res.data : [];
      setReferralLogs(data);
      setFilteredLogs(data);
    } catch (err) {
      console.error("Referral Logs Error:", err);
      setReferralLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReferralLogs(); }, [fetchReferralLogs]);

  useEffect(() => {
    const result = referralLogs.filter(user => 
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.referralCode?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user._id || "").includes(searchTerm)
    );
    setFilteredLogs(result);
    setCurrentPage(1);
  }, [searchTerm, referralLogs]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  // Global Stats Calculation
  const totalEarnings = referralLogs.reduce((acc, curr) => acc + (curr.totalReferralEarnings || 0), 0);
  const totalRegistrations = referralLogs.reduce((acc, curr) => acc + (curr.referralRegistrations || 0), 0);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* 📊 TOP STATS CARDS (Based on JSON Fields) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Network Reg.", val: totalRegistrations, icon: UserPlus, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Disbursed Earnings", val: `₹${totalEarnings.toLocaleString()}`, icon: Wallet2, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Total Nodes Active", val: referralLogs.length, icon: Users, color: "text-[#f99616]", bg: "bg-[#f99616]/10" }
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-[2rem] border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-slate-100 shadow-sm"}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 mb-1">{stat.label}</p>
                <h4 className="text-2xl font-black italic tracking-tighter">{stat.val}</h4>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon size={20} /></div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔍 HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Affiliate <span className="text-[#f99616]">Protocols</span></h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic mt-1">Surveillance of Referral Commissions & Network Expansion</p>
        </div>
        <div className={`flex-1 max-w-md w-full p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
           <Search size={16} className="text-gray-500 ml-2" />
           <input 
              type="text" 
              placeholder="Search by Email, Code or UID..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="bg-transparent outline-none text-xs font-bold w-full" 
           />
        </div>
      </div>

      {/* 💻 DESKTOP TABLE (Terminal Design) */}
      <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} overflow-hidden shadow-2xl rounded-sm`}>
        <table className="w-full text-left">
          <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
            <tr>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest">Affiliate Node</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-center">Network Stats</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-center">Commission</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-right">Node ID</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
            {currentItems.map((user) => (
              <tr key={user._id} className="hover:bg-[#f99616]/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${darkMode ? 'bg-zinc-900' : 'bg-slate-50'}`}>
                      <UserCircle2 size={24} className={user.role === 'admin' ? 'text-[#f99616]' : 'text-zinc-500'} />
                    </div>
                    <div>
                      <p className={`font-black text-xs uppercase italic ${darkMode ? 'text-white' : 'text-slate-800'}`}>{user.email}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] font-black bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 uppercase tracking-tighter">Code: {user.referralCode}</span>
                        {user.kycStatus === 'approved' ? <ShieldCheck size={12} className="text-green-500" /> : <ShieldAlert size={12} className="text-yellow-500" />}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center gap-6">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-blue-500">{user.referralClicks || 0}</p>
                      <p className="text-[7px] font-bold text-gray-500 uppercase">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-purple-500">{user.referralRegistrations || 0}</p>
                      <p className="text-[7px] font-bold text-gray-500 uppercase">Reg.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-[#f99616]">{user.referralDeposits || 0}</p>
                      <p className="text-[7px] font-bold text-gray-500 uppercase">Dep.</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                   <p className="text-xs font-black text-green-500">₹{user.totalReferralEarnings || 0}</p>
                   <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">{user.commissionRate}% Rate</p>
                </td>
                <td className="px-8 py-6 text-right font-mono text-[9px] text-gray-600">
                  {user._id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE CARDS */}
      <div className="grid grid-cols-1 gap-3 lg:hidden">
        {currentItems.map((user) => (
          <div key={user._id} className={`p-5 rounded-[2rem] border ${darkMode ? 'bg-black border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-3">
                  <UserCircle2 size={20} className="text-[#f99616]"/>
                  <p className="text-xs font-black uppercase italic truncate w-32">{user.email.split('@')[0]}</p>
               </div>
               <span className="text-[10px] font-black text-green-500">₹{user.totalReferralEarnings}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-zinc-900/50">
               <div className="text-center"><p className="text-[9px] font-bold text-blue-400">{user.referralClicks}</p><p className="text-[7px] uppercase text-gray-500">Clicks</p></div>
               <div className="text-center"><p className="text-[9px] font-bold text-purple-400">{user.referralRegistrations}</p><p className="text-[7px] uppercase text-gray-500">Reg.</p></div>
               <div className="text-center"><p className="text-[9px] font-bold text-[#f99616]">{user.referralCode}</p><p className="text-[7px] uppercase text-gray-500">Code</p></div>
            </div>
          </div>
        ))}
      </div>

      {/* 📟 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center py-6 pb-10">
          <p className="text-[10px] font-black uppercase text-gray-500 italic">Sector {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredLogs.length)}</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 border border-zinc-800 rounded-xl text-[#f99616] disabled:opacity-20 transition-all"><ChevronLeft size={18}/></button>
            <div className="flex items-center px-4 font-black text-xs text-[#f99616]">{currentPage} / {totalPages}</div>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-zinc-800 rounded-xl text-[#f99616] disabled:opacity-20 transition-all"><ChevronRight size={18}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralTree;
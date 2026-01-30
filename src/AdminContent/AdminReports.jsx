import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, Search, BellRing, Send, X, Loader2, 
  ChevronLeft, ChevronRight, Globe, UserCircle, ChevronDown, Clock, Activity, RefreshCcw
} from 'lucide-react';
import Swal from 'sweetalert2';
import API_CONFIG from '../config';

const AdminReports = ({ darkMode, activeSubTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [usersList, setUsersList] = useState([]); 
  const [notifLogs, setNotifLogs] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10; // Consistent with KYC standard

  const [notifData, setNotifData] = useState({
    userId: "", 
    title: "",
    message: "",
    type: "success",
    actionUrl: "/wallet/history"
  });

  // --- 🚀 FETCH NOTIFICATION LOGS ---
  const fetchNotifLogs = async () => {
    if (activeSubTab !== 'reports_notifications') return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_CONFIG.baseURL}/notifications/logs`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setNotifLogs(data.result || []);
      }
    } catch (err) {
      console.error("Failed to fetch logs");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 🚀 FETCH USERS FOR DROPDOWN ---
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_CONFIG.baseURL}/admin/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.result && data.result.users) {
        setUsersList(data.result.users);
      }
    } catch (err) {
      console.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchNotifLogs();
  }, [activeSubTab]);

  useEffect(() => {
    if (isModalOpen) fetchUsers();
  }, [isModalOpen]);

  // --- 🚀 SEND NOTIFICATION ---
  const handleSendNotification = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const token = localStorage.getItem("admin_token");
    const bodyPayload = {
      title: notifData.title,
      message: notifData.message,
      type: notifData.type,
      actionUrl: notifData.actionUrl
    };
    if (notifData.userId !== "") bodyPayload.userId = notifData.userId;

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/notifications/send`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
      const data = await response.json();
      if (response.status === 201 || data.statusCode === 201) {
        Swal.fire({ icon: 'success', title: 'Sent!', background: darkMode ? '#0d0d0d' : '#fff', color: darkMode ? '#fff' : '#000' });
        setIsModalOpen(false);
        setNotifData({ userId: "", title: "", message: "", type: "success", actionUrl: "/wallet/history" });
        fetchNotifLogs();
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: '500 Error', background: darkMode ? '#0d0d0d' : '#fff', color: darkMode ? '#fff' : '#000' });
    } finally { setIsSending(false); }
  };

  // --- FILTER & PAGINATION LOGIC ---
  const filteredLogs = useMemo(() => {
    return notifLogs.filter(log => 
      log.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notifLogs, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  if (isLoading && notifLogs.length === 0) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
            {activeSubTab?.split('_')[1]} <span className="text-[#f99616]">Control</span>
          </h2>
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Binovera Audit Protocol</p>
        </div>
        <div className="flex items-center gap-3">
           {activeSubTab === 'reports_notifications' && (
            <button onClick={() => setIsModalOpen(true)} className="bg-[#f99616] text-black px-4 py-2.5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-orange-500/10">
              <Send size={14} /> New Broadcast
            </button>
          )}
          <span className="hidden md:inline-block text-[10px] font-black bg-[#f99616]/10 text-[#f99616] px-3 py-1 rounded-md border border-[#f99616]/20">
            {filteredLogs.length} LOGS
          </span>
        </div>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search logs by title or message..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-[#f99616]' : 'bg-gray-50 border-gray-100 text-black focus:border-[#f99616]'}`}
          />
        </div>
        <button onClick={fetchNotifLogs} className="p-3 bg-[#f99616]/10 text-[#f99616] rounded-xl border border-[#f99616]/20 active:scale-95 transition-all">
          <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {filteredLogs.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-none opacity-50">
          <Activity size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[3px]">Protocol History Empty</p>
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW: COMPACT CARDS */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {currentLogs.map((log, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-md"}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#f99616]/10 rounded-xl"><BellRing size={18} className="text-[#f99616]" /></div>
                    <div className="max-w-[150px]">
                      <p className="text-xs font-black uppercase italic truncate">{log.title}</p>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">{new Date(log.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${log.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                    {log.type}
                  </span>
                </div>
                <div className="bg-zinc-900/30 p-3 rounded-xl border border-zinc-800/50">
                   <p className="text-[10px] font-bold text-gray-400 italic line-clamp-2">"{log.message}"</p>
                </div>
                <div className="mt-4 flex justify-between items-center text-[9px] font-black uppercase text-gray-500">
                   <span className="flex items-center gap-1">{log.userId ? <><UserCircle size={10}/> User</> : 'Broadcast'}</span>
                   <span className="flex items-center gap-1"><Clock size={10}/> {new Date(log.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: SHARP BORDER TABLE */}
          <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} rounded-none overflow-hidden shadow-2xl`}>
            <table className="w-full text-left">
              <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">Protocol Type</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">Title & Message Payload</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Recipient Node</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
                {currentLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-[#f99616]/5 transition-colors group">
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${log.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-black text-xs uppercase italic tracking-tighter text-white">{log.title}</p>
                      <p className="text-[10px] text-gray-500 font-bold italic truncate max-w-sm">{log.message}</p>
                    </td>
                    <td className="px-8 py-5 text-center">
                       <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 italic">
                          {log.userId ? <><UserCircle size={14} className="text-[#f99616]"/> Private User</> : <><Globe size={14} className="text-blue-500"/> Global Broadcast</>}
                       </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <p className="text-[10px] font-black text-gray-500 uppercase">{new Date(log.createdAt).toLocaleDateString()}</p>
                      <p className="text-[9px] font-mono text-gray-700">{new Date(log.createdAt).toLocaleTimeString()}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔢 PAGINATION CONTROLS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 pb-10">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredLogs.length)} of {filteredLogs.length} Records
            </p>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className={`p-2 border rounded-xl transition-all ${currentPage === 1 ? 'opacity-20' : 'text-[#f99616] hover:border-[#f99616]'}`}><ChevronLeft size={18} /></button>
              <div className="flex items-center px-4 font-black text-xs text-[#f99616]">{currentPage} / {totalPages}</div>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={`p-2 border rounded-xl transition-all ${currentPage === totalPages ? 'opacity-20' : 'text-[#f99616] hover:border-[#f99616]'}`}><ChevronRight size={18} /></button>
            </div>
          </div>
        </>
      )}

      {/* 🚀 FIXED BROADCASTER MODAL (Persistent Sidebar logic) */}
      {isModalOpen && (
        <div className="fixed inset-0 lg:left-72 z-[700] flex items-center justify-center p-4 transition-all duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className={`relative w-full max-w-lg rounded-[2.5rem] border p-8 shadow-2xl animate-in zoom-in-95 duration-300 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white"}`}>
            <button onClick={() => setIsModalOpen(false)} className="absolute right-8 top-8 text-gray-500 hover:text-red-500 transition-colors"><X size={24}/></button>
            
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-8 bg-[#f99616] rounded-full"></div>
                 <h3 className="text-xl font-black uppercase italic tracking-tighter">Signal Broadcaster</h3>
              </div>

              <form onSubmit={handleSendNotification} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Target Identity</label>
                  <select value={notifData.userId} onChange={(e) => setNotifData({...notifData, userId: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:border-[#f99616] transition-all">
                    <option value="">🚀 All Nodes (Global Broadcast)</option>
                    {Array.isArray(usersList) && usersList.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Subject Header</label>
                   <input required value={notifData.title} onChange={(e) => setNotifData({...notifData, title: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:border-[#f99616] transition-all" placeholder="Enter signal title..." />
                </div>

                <div className="space-y-1">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Message Payload</label>
                   <textarea required rows="3" value={notifData.message} onChange={(e) => setNotifData({...notifData, message: e.target.value})} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:border-[#f99616] transition-all" placeholder="Enter detailed message..." />
                </div>

                <button disabled={isSending} type="submit" className="w-full h-14 bg-[#f99616] text-black font-black py-4 rounded-2xl uppercase text-[11px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3">
                  {isSending ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18}/> Execute Broadcast</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
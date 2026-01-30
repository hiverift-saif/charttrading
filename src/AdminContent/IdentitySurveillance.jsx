import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Loader2, RefreshCcw, Monitor, Activity,
  Globe, ShieldAlert, ChevronLeft, ChevronRight, MapPin, MousePointer2
} from 'lucide-react';
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";

const IdentitySurveillance = () => {
  const { darkMode } = useTheme();
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/admin/security/logins`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        const logData = data.result?.logs || [];
        setLogs(logData);
        setFilteredLogs(logData);
      }
    } catch (err) {
      console.error("Audit Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  useEffect(() => {
    const result = logs.filter(log => 
      log.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.ip?.includes(searchTerm) ||
      log.reason?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(result);
    setCurrentPage(1); 
  }, [searchTerm, logs]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
          Identity <span className="text-[#f99616]">Surveillance</span>
        </h2>
        <button onClick={fetchLogs} className="p-2 bg-[#f99616]/10 text-[#f99616] rounded-xl border border-[#f99616]/20 active:scale-90 transition-all">
          <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <Search className="text-gray-500 ml-2" size={18} />
        <input 
          type="text" placeholder="Scan Email, IP or Breach Reason..." value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="bg-transparent outline-none text-xs font-bold w-full" 
        />
      </div>

      {filteredLogs.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 opacity-50 uppercase font-black text-[10px] tracking-widest">No Security Breaches Traced</div>
      ) : (
        <>
          {/* 💻 DESKTOP VIEW */}
          <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} overflow-hidden shadow-2xl`}>
            <table className="w-full text-left">
              <thead className="bg-zinc-900/50 text-[10px] font-black uppercase text-gray-500 border-b border-zinc-800">
                <tr>
                  <th className="px-8 py-5">Node Identity</th>
                  <th className="px-8 py-5">Network & Location</th>
                  <th className="px-8 py-5">Platform Metadata</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">Auth Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {currentItems.map((log) => (
                  <tr key={log._id} className="hover:bg-[#f99616]/5 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-xs uppercase italic text-white truncate max-w-[180px]">{log.email}</p>
                      <p className="text-[9px] text-gray-500 font-bold">{new Date(log.createdAt).toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1 text-[10px] font-black uppercase">
                        <div className="flex items-center gap-2 text-blue-500"><Globe size={12}/> {log.ip}</div>
                        <div className="flex items-center gap-2 text-red-500"><MapPin size={12}/> {log.country}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[9px] text-gray-400 font-bold max-w-[200px] truncate uppercase">{log.userAgent}</p>
                      <p className="text-[8px] text-gray-600 font-black mt-1 flex items-center gap-1 uppercase"><Monitor size={10}/> {log.device}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase border ${log.status === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className={`text-[10px] font-black uppercase ${log.status === 'failed' ? 'text-[#f99616]' : 'text-gray-400 italic'}`}>
                        {log.reason || 'Clear Clearance'}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📱 MOBILE VIEW */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {currentItems.map((log) => (
              <div key={log._id} className={`p-5 rounded-[2rem] border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-md"}`}>
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <p className="text-xs font-black uppercase italic truncate max-w-[150px]">{log.email}</p>
                      <p className="text-[9px] text-gray-500 font-bold mt-1">{new Date(log.createdAt).toLocaleString()}</p>
                   </div>
                   <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${log.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {log.status}
                   </span>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-zinc-900/30 p-3 rounded-2xl mb-4 border border-zinc-800/50">
                   <div className="text-[9px] font-black text-blue-500 flex items-center gap-1"><Globe size={10}/> {log.ip}</div>
                   <div className="text-[9px] font-black text-red-500 flex items-center gap-1 uppercase"><MapPin size={10}/> {log.country}</div>
                   <div className="text-[9px] font-black text-gray-400 flex items-center gap-1 uppercase"><Monitor size={10}/> {log.device}</div>
                </div>
                <div className={`p-3 rounded-xl text-center text-[10px] font-black uppercase italic ${log.status === 'failed' ? 'bg-orange-500/10 text-orange-500' : 'bg-zinc-800 text-gray-500'}`}>
                   Reason: {log.reason || 'Verified Auth'}
                </div>
              </div>
            ))}
          </div>

          {/* 🔢 PAGINATION */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 pb-20">
            <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest italic">Surveillance Range: {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredLogs.length)}</p>
            <div className="flex gap-3">
              <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="p-3 border border-zinc-800 rounded-2xl text-[#f99616] disabled:opacity-20 active:scale-90 transition-all"><ChevronLeft size={20}/></button>
              <div className="flex items-center px-6 bg-zinc-900 border border-zinc-800 rounded-2xl font-black text-xs text-[#f99616] italic">{currentPage} / {totalPages}</div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage >= totalPages} className="p-3 border border-zinc-800 rounded-2xl text-[#f99616] disabled:opacity-20 active:scale-90 transition-all"><ChevronRight size={20}/></button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IdentitySurveillance;
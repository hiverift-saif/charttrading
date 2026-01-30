import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Loader2, RefreshCcw, ChevronLeft, ChevronRight, 
  BarChart3, Wallet, Activity, BellRing, Download, 
  ArrowUpRight, TrendingUp, FileSpreadsheet, HardDriveDownload, FileDown, Users
} from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';

const MasterReports = ({ darkMode, activeSubTab }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- 📡 FETCH LOGIC (For Tables) ---
  const fetchData = async () => {
    if (activeSubTab === 'reports_export') return; 
    setIsLoading(true);
    let endpoint = "";
    if (activeSubTab === 'reports_finance') endpoint = "/reports/finance";
    if (activeSubTab === 'reports_trade') endpoint = "/reports/trade";
    if (activeSubTab === 'reports_notifications') endpoint = "/notifications/logs";

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      if (response.ok) {
        if (activeSubTab === 'reports_finance') setData(resData.result?.transactions || []);
        else if (activeSubTab === 'reports_trade') setData(resData.result?.trades || []);
        else setData(resData.result || []);
      }
    } catch (err) { 
      console.error("Sync Error:", err); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, [activeSubTab]);

  // --- 📥 EXCEL EXPORT HANDLER (🚀 401 Unauthorized Fix) ---
  const handleExport = (type) => {
    const token = localStorage.getItem("admin_token");
    
    // 🔥 FIXED: Token query param mein bhej rahe hain taaki naye tab mein Auth mil jaye
    const exportUrl = `${API_CONFIG.baseURL}/reports/export?type=${type}&token=${token}`;
    
    Swal.fire({
      title: 'Initialize Export?',
      text: `Downloading full ${type.toUpperCase()} registry in CSV/Excel format.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      confirmButtonText: 'Download Excel',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000',
    }).then((result) => {
      if (result.isConfirmed) {
        // Direct trigger as the backend will now read token from query
        window.open(exportUrl, '_blank');
        
        Swal.fire({ 
           icon: 'success', 
           title: 'Export Triggered', 
           toast: true, 
           position: 'top-end', 
           timer: 3000, 
           showConfirmButton: false 
        });
      }
    });
  };

  // --- 🔍 FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const search = searchTerm.toLowerCase();
      const email = item.userId?.email || item.title || item.asset || "";
      return email.toLowerCase().includes(search);
    });
  }, [data, searchTerm]);

  // --- 🔢 PAGINATION LOGIC (Fixed ReferenceError) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  // --- 📤 EXPORT HUB UI (Card-based Dashboard) ---
  if (activeSubTab === 'reports_export') {
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col gap-2">
           <h2 className="text-2xl font-black uppercase italic italic tracking-tighter">System <span className="text-[#f99616]">Bulk Exporter</span></h2>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px]">Authorized Node Data Extraction Hub</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { type: 'trade', label: 'Trade Registry', icon: <TrendingUp size={32}/>, color: 'text-blue-500' },
            { type: 'finance', label: 'Financial Ledger', icon: <Wallet size={32}/>, color: 'text-green-500' },
            { type: 'user', label: 'Node Database', icon: <Users size={32}/>, color: 'text-[#f99616]' }
          ].map((item) => (
            <div key={item.type} className={`group p-10 rounded-[3rem] border transition-all hover:scale-[1.02] ${darkMode ? "bg-black border-zinc-800 hover:border-[#f99616]/50" : "bg-white shadow-2xl"}`}>
              <div className={`p-5 rounded-full bg-zinc-900/50 w-fit mb-8 ${item.color} group-hover:bg-[#f99616] group-hover:text-black transition-all mx-auto`}>
                {item.icon}
              </div>
              <h3 className="font-black uppercase italic text-xl mb-2 text-center">{item.label}</h3>
              <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-10 italic text-center opacity-60">Full CSV extraction including UID and metrics.</p>
              
              <button 
                onClick={() => handleExport(item.type)}
                className="w-full py-5 bg-[#f99616] text-black font-black uppercase text-[11px] rounded-2xl tracking-widest shadow-xl shadow-orange-500/10 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <FileDown size={18} /> Export Excel
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- 💻 DATA TABLE UI (Finance, Trade, Signals) ---
  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
      
      {/* HEADER BLOCK */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/10 p-6 rounded-[2rem] border border-gray-800/30">
        <div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter italic">{activeSubTab?.split('_')[1]} <span className="text-[#f99616]">Registry</span></h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest tracking-widest">Authorized Surveillance Telemetry</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Direct Excel Trigger in Table View */}
          <button 
            onClick={() => handleExport(activeSubTab.split('_')[1])}
            className="flex items-center gap-2 px-5 py-3 bg-green-600/10 text-green-500 border border-green-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all shadow-xl"
          >
            <FileSpreadsheet size={16} /> Excel Sheet
          </button>
          
          <button onClick={fetchData} className="p-3 bg-zinc-900 border border-zinc-800 text-[#f99616] rounded-xl active:scale-95 transition-all">
            <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <Search className="text-gray-500 ml-2" size={18} />
        <input 
          type="text" placeholder="Scan registry logs..." value={searchTerm} 
          onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} 
          className="bg-transparent outline-none text-xs font-bold w-full" 
        />
      </div>

      {/* UNIFIED DATA TABLE */}
      <div className={`border ${darkMode ? 'border-zinc-800 bg-black' : 'bg-white shadow-2xl'} overflow-hidden shadow-2xl rounded-none`}>
        <table className="w-full text-left">
          <thead className="bg-zinc-900/50 text-[10px] font-black uppercase text-gray-500 border-b border-zinc-800">
            <tr>
              <th className="px-8 py-5 italic">Identity Node</th>
              <th className="px-8 py-5 text-center italic">Metric</th>
              <th className="px-8 py-5 text-center italic">Status</th>
              <th className="px-8 py-5 text-right italic">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {isLoading ? (
              <tr><td colSpan="4" className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#f99616]" /></td></tr>
            ) : currentItems.length === 0 ? (
              <tr><td colSpan="4" className="py-20 text-center text-gray-600 font-black uppercase tracking-widest text-[10px]">No data retrieved from node</td></tr>
            ) : currentItems.map((item, idx) => (
              <tr key={item._id || idx} className="hover:bg-[#f99616]/5 transition-colors group">
                <td className="px-8 py-6">
                   <p className="font-black text-xs italic uppercase truncate max-w-[200px] text-white">
                      {item.userId?.email || item.title || item.asset}
                   </p>
                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">{item.type || item.direction || 'System Event'}</p>
                </td>
                <td className="px-8 py-6 text-center font-black text-[#f99616] text-sm tracking-tighter">
                   {item.amount ? `$${item.amount}` : '--'}
                </td>
                <td className="px-8 py-6 text-center">
                   <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase border ${item.status === 'success' || item.result === 'win' ? 'bg-green-500/5 text-green-500 border-green-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                      {item.status || item.result || 'Logged'}
                   </span>
                </td>
                <td className="px-8 py-6 text-right text-[10px] text-gray-500 font-black">
                   {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔢 PAGINATION */}
      <div className="flex justify-between items-center px-4 py-4 pb-10">
         <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Node Sector {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)}</p>
         <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="p-2 border border-zinc-800 rounded-lg text-[#f99616] disabled:opacity-20 active:scale-90 transition-all"><ChevronLeft size={18}/></button>
            <div className="px-4 flex items-center font-black text-xs text-[#f99616]">{currentPage} / {totalPages}</div>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage >= totalPages} className="p-2 border border-zinc-800 rounded-lg text-[#f99616] disabled:opacity-20 active:scale-90 transition-all"><ChevronRight size={18}/></button>
         </div>
      </div>
    </div>
  );
};

export default MasterReports;
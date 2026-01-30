import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Loader2, RefreshCcw, ChevronLeft, ChevronRight, 
  BarChart3, Wallet, Activity, BellRing, Download, 
  TrendingUp, FileSpreadsheet, FileDown, Users
} from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';

const NexusAnalytics = ({ darkMode, activeSubTab }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exportType, setExportType] = useState("trade");
  const itemsPerPage = 10;
console.log('ldoneondonoenodnonro',activeSubTab);
  // --- 📡 FETCH LOGIC ---
  const fetchData = async () => {
    if (activeSubTab === 'reports_export') return; 
    setIsLoading(true);
    
    // Mapping tabs to endpoints
    const endpointMap = {
      'reports_finance': '/reports/finance',
      'reports_trade': '/reports/trade',
      'reports_nexus': '/reports/finance' // Defaulting nexus to finance logic
    };

    const endpoint = endpointMap[activeSubTab] || '/reports/finance';

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const resData = await response.json();
      console.log("Fetched Data:", resData.result?.trades);
      if (response.ok) {
        if (activeSubTab === 'reports_finance' || activeSubTab === 'reports_nexus') {
          setData(resData.result?.transactions || []);
        } else if (activeSubTab === 'reports_trade') {
          setData(resData.result?.trades || []);
        } else {
          setData(resData.result || []);
        }
      }
    } catch (err) { 
      console.error("Sync Error:", err); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => { fetchData(); }, [activeSubTab]);

  // --- 📥 EXCEL EXPORT (Blob fix for 401) ---
  const handleExport = async (typeToExport = exportType) => {
    const token = localStorage.getItem("admin_token");
    Swal.fire({ 
      title: 'Generating Excel...', 
      didOpen: () => Swal.showLoading(),
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000'
    });

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/reports/export?type=${typeToExport}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Unauthorized");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `nexus_report_${typeToExport}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      Swal.close();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Export Failed', text: '401 Unauthorized Session' });
    }
  };

  // --- FILTER & PAGINATION ---
  const filteredData = useMemo(() => {
    console.log("Filtering data with searchTerm:", data);
    return (data || []).filter(item => {
      const search = searchTerm.toLowerCase();
      const email = item.userId?.email || item.title || item.asset || "";
      return email.toLowerCase().includes(search);
    });
  }, [data, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  // --- 📤 EXPORT HUB VIEW ---
  if (activeSubTab === 'reports_export') {
    return (
      <div className="space-y-10 max-w-4xl mx-auto py-10 animate-in zoom-in-95">
        <div className="text-center space-y-2">
           <h2 className="text-3xl font-black uppercase italic tracking-tighter">System <span className="text-[#f99616]">Exporter</span></h2>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[3px]">Authorized Data Extraction Hub</p>
        </div>
        <div className={`p-10 rounded-[3rem] border ${darkMode ? "bg-black border-zinc-800 shadow-2xl" : "bg-white shadow-2xl"}`}>
          <div className="space-y-6">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 italic">Select Module</label>
            <select 
              value={exportType} 
              onChange={(e) => setExportType(e.target.value)} 
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-black uppercase text-xs outline-none focus:border-[#f99616]"
            >
              <option value="trade">Trade Data Stream</option>
              <option value="finance">Financial Ledger</option>
              <option value="user">User Node Database</option>
            </select>
            <button 
              onClick={() => handleExport()} 
              className="w-full py-6 bg-[#f99616] text-black font-black uppercase rounded-2xl shadow-xl shadow-orange-500/10 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <FileDown size={20} /> Download Excel Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 💻 TABLE VIEW ---
  return (
    <div className="space-y-6 animate-in fade-in duration-700 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/10 p-6 rounded-[2rem] border border-gray-800/30">
        <h2 className="text-xl font-black uppercase italic tracking-tighter">
          {activeSubTab?.split('_')[1]} <span className="text-[#f99616]">Registry</span>
        </h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleExport(activeSubTab.split('_')[1])} 
            className="flex items-center gap-2 px-5 py-3 bg-green-600/10 text-green-500 border border-green-500/20 rounded-xl font-black text-[10px] uppercase hover:bg-green-600 hover:text-white transition-all"
          >
            <FileSpreadsheet size={16} /> Excel Sheet
          </button>
          <button onClick={fetchData} className="p-3 bg-zinc-900 border border-zinc-800 text-[#f99616] rounded-xl active:scale-95 transition-all">
            <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white shadow-sm'}`}>
        <Search className="text-gray-500 ml-2" size={18} />
        <input 
          type="text" placeholder="Scan logs..." value={searchTerm} 
          onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} 
          className="bg-transparent outline-none text-xs font-bold w-full" 
        />
      </div>

      <div className={`border ${darkMode ? 'border-zinc-800 bg-black' : 'bg-white shadow-2xl'} overflow-hidden shadow-2xl rounded-none`}>
        <table className="w-full text-left">
          <thead className="bg-zinc-900/50 text-[10px] font-black uppercase text-gray-500 border-b border-zinc-800">
            <tr>
              <th className="px-8 py-5 italic">Identity</th>
              <th className="px-8 py-5 text-center italic">Metric</th>
              <th className="px-8 py-5 text-center italic">Status</th>
              <th className="px-8 py-5 text-right italic">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {currentItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#f99616]/5 transition-colors group">
                <td className="px-8 py-6">
                   <p className="font-black text-xs italic uppercase truncate max-w-[200px] text-white">
                      {item.userId?.email || item.title || item.asset}
                   </p>
                   <p className="text-[9px] text-gray-600 font-bold uppercase">{item.type || item.direction || 'Event'}</p>
                </td>
                <td className="px-8 py-6 text-center font-black text-[#f99616] text-sm tracking-tighter italic">
                   {item.amount ? `$${item.amount}` : '--'}
                </td>
                <td className="px-8 py-6 text-center">
                   <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase border ${item.status === 'success' || item.result === 'win' ? 'bg-green-500/5 text-green-500' : 'bg-red-500/5 text-red-500'}`}>
                      {item.status || item.result || 'Logged'}
                   </span>
                </td>
                <td className="px-8 py-6 text-right text-[10px] text-gray-500 font-black italic">
                   {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-4 py-4 pb-10">
         <p className="text-[9px] font-black text-gray-500 uppercase italic">Page {currentPage} of {totalPages}</p>
         <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="p-2 border border-zinc-800 rounded-lg text-[#f99616] disabled:opacity-20 active:scale-90 transition-all"><ChevronLeft size={18}/></button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage >= totalPages} className="p-2 border border-zinc-800 rounded-lg text-[#f99616] disabled:opacity-20 active:scale-90 transition-all"><ChevronRight size={18}/></button>
         </div>
      </div>
    </div>
  );
};

export default NexusAnalytics;
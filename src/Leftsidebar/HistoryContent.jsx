import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, Loader2, CheckCircle2, 
  XCircle, Clock, AlertCircle, Download 
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';

const HistoryPage = () => {
  const { darkMode } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_CONFIG.baseURL}/wallet/history`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const jsonResponse = await response.json();
        
        if (response.ok) {
          // Aapka JSON "result.data" format follow kar raha hai
          setTransactions(jsonResponse.result?.data || []);
        } else {
          setError(jsonResponse.message || "Failed to load history");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // --- 🚀 DOWNLOAD LOGIC (CSV) ---
  const downloadCSV = () => {
    if (transactions.length === 0) return;

    // Header row
    const headers = ["ID", "Type", "Amount", "Status", "Method", "Date", "Description"];
    
    // Data rows
    const rows = transactions.map(item => [
      item.id,
      item.type,
      item.amount,
      item.status,
      item.method,
      new Date(item.date).toLocaleString(),
      item.description
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TradePro_History_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = transactions.filter(item => {
    if (filter === 'all') return true;
    return item.type?.toLowerCase() === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      fullDate: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  const getStatusConfig = (status) => {
    const s = status?.toLowerCase();
    if (s === 'success') return { text: 'text-green-500', bg: 'bg-green-500/10', icon: <CheckCircle2 size={14} /> };
    if (s === 'pending') return { text: 'text-[#f99616]', bg: 'bg-[#f99616]/10', icon: <Clock size={14} /> };
    return { text: 'text-red-500', bg: 'bg-red-500/10', icon: <XCircle size={14} /> };
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-gray-50 text-slate-900"}`}>
      
      {/* Header & Download Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-2">
            Wallet <span className="text-[#f99616]">History</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Manage your transaction records</p>
        </div>

        <button 
          onClick={downloadCSV}
          disabled={transactions.length === 0}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all
            ${darkMode ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-white text-black border border-gray-200 shadow-sm hover:bg-gray-50"} 
            disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
        >
          <Download size={18} className="text-[#f99616]" />
          Download CSV
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto flex gap-2 mb-8 overflow-x-auto no-scrollbar">
        {['all', 'deposit', 'withdraw'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all
              ${filter === f 
                ? 'bg-[#f99616] text-white shadow-lg shadow-orange-500/20' 
                : darkMode ? 'bg-zinc-900 text-gray-500 border border-gray-800' : 'bg-white text-gray-400 border border-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#f99616]" />
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto text-center py-10 bg-red-500/5 rounded-3xl border border-red-500/20">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
          <p className="text-red-500 font-bold">{error}</p>
        </div>
      ) : filteredData.length > 0 ? (
        <div className={`max-w-7xl mx-auto rounded-[2rem] border overflow-hidden transition-all
          ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-200 shadow-xl"}`}>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${darkMode ? "bg-zinc-900/50" : "bg-gray-50"} border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                  <th className="p-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transaction</th>
                  <th className="p-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Amount</th>
                  <th className="p-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                  <th className="p-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Method</th>
                  <th className="p-5 text-[10px] font-black uppercase text-gray-500 tracking-widest">Date & Time</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                {filteredData.map((item) => {
                  const { fullDate, time } = formatDate(item.date);
                  const status = getStatusConfig(item.status);
                  const isDeposit = item.type === 'deposit';

                  return (
                    <tr key={item.id} className={`transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDeposit ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {isDeposit ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                          </div>
                          <span className="font-black uppercase text-xs tracking-tight">{item.type}</span>
                        </div>
                      </td>
                      <td className={`p-5 font-black text-sm ${isDeposit ? 'text-green-500' : 'text-red-500'}`}>
                        {isDeposit ? '+' : ''}{item.amount.toLocaleString()}
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${status.bg} ${status.text}`}>
                          {status.icon} {item.status}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-tighter">{item.method}</span>
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-black">{fullDate}</span>
                          <span className="text-[10px] text-gray-500 font-bold">{time}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <Clock className="mx-auto text-gray-700 mb-4" size={60} />
          <p className="text-gray-500 font-black uppercase tracking-widest">No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
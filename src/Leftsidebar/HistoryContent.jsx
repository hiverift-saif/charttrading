import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added
import API_CONFIG from '../config';

const HistoryPage = () => {
  const { darkMode } = useTheme(); // 🚀 Theme state access
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log("History Token Status:", token ? "Found" : "Not Found");
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_CONFIG.baseURL}/wallet/history`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok) {
          setTransactions(result.data || []);
        } else {
          setError(result.message || "Failed to load history");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredData = transactions.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'deposit') return item.type === 'deposit';
    if (filter === 'withdraw') return item.type === 'withdraw';
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { day, month, year, time };
  };

  const getStatusConfig = (status) => {
    const s = status.toLowerCase();
    if (s === 'success' || s === 'approved') {
      return { 
        text: 'text-green-500', 
        bg: darkMode ? 'bg-green-500/10' : 'bg-green-50', 
        border: darkMode ? 'border-green-500/30' : 'border-green-200', 
        icon: <CheckCircle2 size={14} /> 
      };
    }
    if (s === 'pending') {
      return { 
        text: 'text-yellow-600', 
        bg: darkMode ? 'bg-yellow-500/10' : 'bg-yellow-50', 
        border: darkMode ? 'border-yellow-500/30' : 'border-yellow-200', 
        icon: <Clock size={14} /> 
      };
    }
    return { 
      text: 'text-red-500', 
      bg: darkMode ? 'bg-red-500/10' : 'bg-red-50', 
      border: darkMode ? 'border-red-500/30' : 'border-red-200', 
      icon: <XCircle size={14} /> 
    };
  };

  const getAmountColor = (type, amount) => {
    return type === 'deposit' || amount > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      {/* Header */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-3 italic">
            Transaction <span className="text-[#ffae34]">History</span>
          </h1>
          <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-sm uppercase tracking-wider font-bold`}>Deposits • Withdrawals • Records</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-4 mb-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {['all', 'deposit', 'withdraw'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 ${
                filter === f 
                  ? 'bg-[#ffae34] text-black shadow-lg' 
                  : darkMode 
                    ? 'bg-[#111111] text-gray-400 border border-gray-800' 
                    : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : f === 'deposit' ? 'Deposits' : 'Withdrawals'}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-16 h-16 animate-spin text-[#ffae34]" />
          <p className="text-gray-400 mt-6 text-lg font-bold">Loading history...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-500 font-bold text-lg">{error}</p>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      {!loading && !error && filteredData.length > 0 && (
        <>
          <div className="hidden lg:block px-4 sm:px-6 lg:px-8 mb-20">
            <div className={`max-w-7xl mx-auto rounded-2xl border overflow-hidden shadow-2xl transition-colors
              ${darkMode ? "bg-[#0f0f0f] border-gray-800" : "bg-white border-gray-200"}`}>
              <table className="w-full">
                <thead className={`border-b transition-colors ${darkMode ? "bg-[#111] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                  <tr>
                    {['Type', 'Method', 'Amount', 'Status', 'Date', 'TXID'].map((head) => (
                      <th key={head} className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-500">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                  {filteredData.map((item) => {
                    const { day, month, year, time } = formatDate(item.date);
                    const statusConfig = getStatusConfig(item.status);
                    return (
                      <tr key={item.id} className={`transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-lg ${item.type === 'deposit' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                              {item.type === 'deposit' ? <ArrowUpRight className="text-green-500" size={18} /> : <ArrowDownRight className="text-red-500" size={18} />}
                            </div>
                            <span className={`font-bold capitalize ${darkMode ? "text-white" : "text-black"}`}>{item.type}</span>
                          </div>
                        </td>
                        <td className={`px-8 py-6 font-medium capitalize ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{item.method || '-'}</td>
                        <td className={`px-8 py-6 font-black text-lg ${getAmountColor(item.type, item.amount)}`}>
                          {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toLocaleString()}
                        </td>
                        <td className="px-8 py-6">
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                            {statusConfig.icon}
                            <span className="uppercase">{item.status}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div>
                            <p className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>{day} {month} '{year}</p>
                            <p className="text-gray-500 text-xs">{time}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-mono text-gray-500 break-all">{item.id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile & Tablet Cards */}
          <div className="lg:hidden px-4 pb-10">
            <div className="max-w-xl mx-auto space-y-4">
              {filteredData.map((item) => {
                const { day, month, year, time } = formatDate(item.date);
                const statusConfig = getStatusConfig(item.status);
                return (
                  <div key={item.id} className={`p-5 border rounded-2xl shadow-sm transition-colors
                    ${darkMode ? "bg-[#0f0f0f] border-gray-800" : "bg-white border-gray-200"}`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${item.type === 'deposit' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                          {item.type === 'deposit' ? <ArrowUpRight className="text-green-500" size={20} /> : <ArrowDownRight className="text-red-500" size={20} />}
                        </div>
                        <div>
                          <p className={`font-black text-sm uppercase ${darkMode ? "text-white" : "text-black"}`}>{item.type}</p>
                          <p className="text-gray-500 text-xs capitalize">{item.method || '-'}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                        {statusConfig.icon}
                        <span className="uppercase">{item.status}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className={`text-3xl font-black ${getAmountColor(item.type, item.amount)}`}>
                        {item.amount > 0 ? '+' : '-'}${Math.abs(item.amount).toLocaleString()}
                      </p>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${darkMode ? "text-white" : "text-black"}`}>{day} {month} '{year}</p>
                        <p className="text-gray-500 text-xs">{time}</p>
                      </div>
                    </div>
                    <div className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                      <p className="text-gray-500 text-[10px] uppercase mb-1 font-bold">Transaction ID</p>
                      <p className="text-[#ffae34] font-mono text-xs break-all">{item.id}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && !error && filteredData.length === 0 && (
        <div className="text-center py-32 px-4 animate-in fade-in duration-700">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 transition-colors ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <Clock size={48} className="text-gray-400" />
          </div>
          <h3 className={`text-2xl font-black mb-3 ${darkMode ? "text-white" : "text-black"}`}>No Transactions Yet</h3>
          <p className="text-gray-500 text-sm font-bold">Your deposit & withdrawal history will appear here</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
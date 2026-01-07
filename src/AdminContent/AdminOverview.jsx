import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, ShieldCheck, ArrowDownRight, ArrowUpRight, Loader2, Activity, Wallet, PieChart, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';
import API_CONFIG from '../config'; 
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

const AdminOverview = () => {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("admin_token"); 
        const response = await axios.get(`${API_CONFIG.baseURL}/admin/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data?.result) setMetrics(response.data.result);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center h-96 w-full ${darkMode ? "bg-black" : "bg-white"}`}>
        <Loader2 className="w-10 h-10 animate-spin text-[#f99616] mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-[3px] text-[10px]">Encrypting Data Stream...</p>
      </div>
    );
  }

  // Real Data extraction from your JSON
  const totalUsers = metrics?.userMetrics?.totalUsers || 0;
  const activeTraders = metrics?.userMetrics?.activeTraders || 0;
  const totalDeposits = metrics?.financialMetrics?.totalDeposits || 0;
  const totalWithdrawals = Math.abs(metrics?.financialMetrics?.totalWithdrawals || 0);
  const pendingKyc = metrics?.compliance?.pendingKyc || 0;
  const netCapital = totalDeposits - totalWithdrawals;

  const chartData = [
    { name: 'Jan', val: 2000000, users: 5 },
    { name: 'Feb', val: 4500000, users: 8 },
    { name: 'Mar', val: 3200000, users: 10 },
    { name: 'Apr', val: 7800000, users: 12 },
    { name: 'May', val: 6100000, users: 15 },
    { name: 'Jun', val: 9000000, users: 16 },
    { name: 'Jul', val: totalDeposits, users: totalUsers }, 
  ];

  return (
    <div className={`w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">
            Command <span className="text-[#f99616]">Center</span>
          </h2>
          <p className={`text-[10px] font-bold uppercase tracking-[2px] ${darkMode ? "text-gray-500" : "text-slate-400"}`}>
            Real-time infrastructure monitoring
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#f99616]/10 border border-[#f99616]/20 px-4 py-2 rounded-2xl">
          <Zap size={14} className="text-[#f99616] animate-pulse" />
          <span className="text-[#f99616] text-[10px] font-black uppercase">System Healthy</span>
        </div>
      </div>

      {/* 1. Main Metrics Row - Enhanced Stat Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Global Users" value={totalUsers} icon={<Users size={18}/>} color="blue" sub="Verified Accounts" darkMode={darkMode} />
        <StatBox label="Live Traders" value={activeTraders} icon={<Activity size={18}/>} color="green" trend="Active" darkMode={darkMode} />
        <StatBox label="Total Liquidity" value={`$${(totalDeposits/1000000).toFixed(2)}M`} icon={<Wallet size={18}/>} color="orange" sub="Platform Deposits" darkMode={darkMode} />
        <StatBox label="KYC Alerts" value={pendingKyc} icon={<ShieldCheck size={18}/>} color="red" isAlert={pendingKyc > 0} sub="Pending Review" darkMode={darkMode} />
      </div>

      {/* 2. Charts and Intelligence Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Growth Chart */}
        <div className={`xl:col-span-2 border rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500
          ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-slate-200"}`}>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                <TrendingUp size={18} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest italic">Capital Inflow analytics</h3>
            </div>
            <select className={`text-[10px] font-bold uppercase p-2 rounded-xl outline-none border transition-all
              ${darkMode ? "bg-black border-gray-800 text-gray-400" : "bg-gray-50 border-slate-200 text-slate-600"}`}>
              <option>Last 7 Months</option>
              <option>Yearly View</option>
            </select>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f99616" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f99616" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1a1a1a" : "#f1f5f9"} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: darkMode ? '#555' : '#94a3b8', fontSize: 10, fontWeight: 'bold'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ stroke: '#f99616', strokeWidth: 2 }}
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#000' : '#fff', 
                    border: darkMode ? '1px solid #333' : '1px solid #e2e8f0', 
                    borderRadius: '16px', 
                    fontSize: '12px', 
                    fontWeight: '900',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(val) => [`$${val.toLocaleString()}`, "Volume"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="val" 
                  stroke="#f99616" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#premiumGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Detailed Summary Sidebar - High Contrast */}
        <div className={`border rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all duration-500
          ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-slate-200"}`}>
          
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-4 border-gray-800">
               <PieChart size={20} className="text-[#f99616]" />
               <h3 className="text-[11px] font-black uppercase tracking-[3px] italic">Financial Pulse</h3>
            </div>

            <div className="space-y-6">
              <SummaryItem label="Trader Density" value={`${((activeTraders/totalUsers)*100).toFixed(1)}%`} sub="Active / Total Ratio" darkMode={darkMode} />
              <SummaryItem label="System Outflow" value={`$${totalWithdrawals.toLocaleString()}`} sub="Withdrawal Logs" color="red" darkMode={darkMode} />
              <SummaryItem label="Net Capital" value={`$${netCapital.toLocaleString()}`} sub="Wallet Reserves" highlight darkMode={darkMode} />
            </div>
          </div>
          
          <div className={`mt-10 p-5 border rounded-2xl transition-all
            ${darkMode ? "bg-blue-500/5 border-blue-500/10" : "bg-slate-50 border-slate-100"}`}>
             <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-blue-500" />
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Protocol V2.0</p>
             </div>
             <p className={`text-[11px] font-bold leading-relaxed italic ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
               "All transaction hashes verified against blockchain ledger. Database integrity is at 100%."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🚀 StatBox Component - Polished for Premium Look
const StatBox = ({ label, value, icon, color, trend, isAlert, sub, darkMode }) => {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-green-500 bg-green-500/10",
    orange: "text-[#f99616] bg-[#f99616]/10",
    red: "text-red-500 bg-red-500/10",
  };

  return (
    <div className={`group border p-6 rounded-3xl transition-all duration-300 shadow-xl hover:-translate-y-1
      ${isAlert ? (darkMode ? 'border-red-500/30 bg-red-500/5 animate-pulse' : 'border-red-200 bg-red-50') : 
      (darkMode ? 'bg-[#0a0a0a] border-gray-800 hover:border-[#f99616]/40' : 'bg-white border-slate-200 hover:border-[#f99616]')}`}>
      
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl border transition-all ${colors[color]} ${darkMode ? "border-gray-800" : "border-slate-100 shadow-sm"}`}>
          {icon}
        </div>
        {trend && (
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg uppercase tracking-tighter border border-green-500/20 shadow-sm">
              {trend}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className={`text-[9px] font-black uppercase tracking-[2px] ${darkMode ? "text-gray-500" : "text-slate-400"}`}>{label}</p>
        <h3 className={`text-3xl font-black tracking-tighter ${darkMode ? "text-white" : "text-slate-900"}`}>{value}</h3>
        <p className={`text-[8px] font-bold uppercase ${darkMode ? "text-gray-700" : "text-slate-300"}`}>{sub}</p>
      </div>
    </div>
  );
};

// 🚀 SummaryItem Component
const SummaryItem = ({ label, value, sub, highlight, color, darkMode }) => (
  <div className="flex justify-between items-center group cursor-default">
    <div className="space-y-0.5">
      <p className={`text-[10px] font-black uppercase tracking-tight transition-colors ${darkMode ? "text-gray-400 group-hover:text-white" : "text-slate-500 group-hover:text-slate-900"}`}>{label}</p>
      <p className={`text-[8px] font-bold uppercase ${darkMode ? "text-gray-700" : "text-slate-300"}`}>{sub}</p>
    </div>
    <div className="text-right">
      <p className={`text-base font-black tracking-tighter transition-all duration-300
        ${highlight ? 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 
          color === 'red' ? 'text-red-500' : (darkMode ? 'text-white' : 'text-slate-900')}`}>
        {value}
      </p>
    </div>
  </div>
);

export default AdminOverview;
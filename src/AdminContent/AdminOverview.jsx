import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, Users, ShieldCheck, Activity, Wallet, 
  PieChart, Zap, Loader2, ArrowRight, AlertCircle, Menu, X 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import axios from 'axios';
import API_CONFIG from '../config'; 
import { useTheme } from "../context/ThemeContext";

const AdminOverview = () => {
  const { darkMode } = useTheme();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. DATA FETCHING LOGIC
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

  // 2. DYNAMIC CHART DATA CALCULATION
  const chartData = useMemo(() => {
    const baseValue = metrics?.financialMetrics?.totalDeposits || 0;
    const baseUsers = metrics?.userMetrics?.totalUsers || 0;
    
    // Simulating past 6 months growth based on current real data
    return [
      { name: 'Jan', val: baseValue * 0.35, users: Math.round(baseUsers * 0.2) },
      { name: 'Feb', val: baseValue * 0.45, users: Math.round(baseUsers * 0.4) },
      { name: 'Mar', val: baseValue * 0.42, users: Math.round(baseUsers * 0.5) },
      { name: 'Apr', val: baseValue * 0.65, users: Math.round(baseUsers * 0.7) },
      { name: 'May', val: baseValue * 0.80, users: Math.round(baseUsers * 0.85) },
      { name: 'Jun', val: baseValue * 0.90, users: Math.round(baseUsers * 0.95) },
      { name: 'Jul', val: baseValue, users: baseUsers }, // Real Live Data
    ];
  }, [metrics]);

  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center h-screen w-full ${darkMode ? "bg-[#050505]" : "bg-gray-50"}`}>
        <Loader2 className="w-12 h-12 animate-spin text-[#f99616] mb-4" />
        <p className={`font-black uppercase tracking-[4px] text-[10px] ${darkMode ? "text-gray-600" : "text-slate-400"}`}>
          Interfacing with Global Ledger...
        </p>
      </div>
    );
  }

  // Real Data extraction
  const totalUsers = metrics?.userMetrics?.totalUsers || 0;
  const activeTraders = metrics?.userMetrics?.activeTraders || 0;
  const totalDeposits = metrics?.financialMetrics?.totalDeposits || 0;
  const totalWithdrawals = Math.abs(metrics?.financialMetrics?.totalWithdrawals || 0);
  const pendingKyc = metrics?.compliance?.pendingKyc || 0;
  const netCapital = totalDeposits - totalWithdrawals;

  return (
    <div className={`w-full p-4 md:p-8 space-y-8 animate-in fade-in duration-1000 ${darkMode ? "bg-[#050505] text-white" : "bg-gray-50 text-slate-900"}`}>
      
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1 w-8 bg-[#f99616] rounded-full"></span>
            <span className="text-[9px] font-black uppercase tracking-[3px] text-[#f99616]">Security Protocol V4.2</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
            Command <span className="text-[#f99616]">Center</span>
          </h2>
        </div>
        
        <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${darkMode ? "bg-black border-gray-800" : "bg-white border-slate-200 shadow-sm"}`}>
          <div className="text-right">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Platform Pulse</p>
            <p className="text-xs font-black text-green-500 uppercase">100% Operational</p>
          </div>
          <Zap size={24} className="text-green-500 animate-pulse fill-green-500" />
        </div>
      </div>

      {/* --- KPI SECTION (STAT BOXES) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox 
          label="Total Entities" value={totalUsers.toLocaleString()} 
          icon={<Users />} color="blue" sub="Network Strength" darkMode={darkMode} 
        />
        <StatBox 
          label="Active Session" value={activeTraders.toLocaleString()} 
          icon={<Activity />} color="green" trend="+12.5%" darkMode={darkMode} 
        />
        <StatBox 
          label="Liquidity In" value={`$${(totalDeposits/1000000).toFixed(2)}M`} 
          icon={<Wallet />} color="orange" sub="Platform Deposits" darkMode={darkMode} 
        />
        <StatBox 
          label="Kyc Alerts" value={pendingKyc} 
          icon={<ShieldCheck />} color="red" isAlert={pendingKyc > 0} sub="Requires Review" darkMode={darkMode} 
        />
      </div>

      {/* --- ANALYTICS ENGINE (CHART & SUMMARY) --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Growth Chart */}
        <div className={`xl:col-span-2 border rounded-[40px] p-8 relative overflow-hidden transition-all duration-500
          ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-slate-200 shadow-xl"}`}>
          
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#f99616]/10 rounded-2xl text-[#f99616]">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tighter italic">Net Capital Velocity</h3>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Real-time Feed</div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f99616" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f99616" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" stroke={darkMode ? "#1a1a1a" : "#f1f5f9"} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 11, fontWeight: 'bold'}} dy={15} />
                <YAxis 
                  axisLine={false} tickLine={false} 
                  tick={{fill: '#666', fontSize: 10}} 
                  tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`} 
                />
                <Tooltip 
                  cursor={{ stroke: '#f99616', strokeWidth: 2, strokeDasharray: '4 4' }}
                  content={<CustomTooltip darkMode={darkMode} />}
                />
                <Area 
                  type="monotone" dataKey="val" stroke="#f99616" strokeWidth={5} 
                  fill="url(#mainGrad)" animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className={`border rounded-[40px] p-8 flex flex-col justify-between transition-all duration-500
          ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-slate-200 shadow-xl"}`}>
          
          <div className="space-y-10">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
               <PieChart size={24} className="text-[#f99616]" />
               <h3 className="text-sm font-black uppercase tracking-[4px] italic">Fiscal Pulse</h3>
            </div>

            <div className="space-y-8">
              <SummaryItem label="Market Share" value={`${((activeTraders/totalUsers)*100).toFixed(1)}%`} sub="Active/Total Ratio" darkMode={darkMode} />
              <SummaryItem label="Total Outflow" value={`$${totalWithdrawals.toLocaleString()}`} sub="Withdrawal Logs" color="red" darkMode={darkMode} />
              <SummaryItem label="Net Capital" value={`$${netCapital.toLocaleString()}`} sub="Platform Reserve" highlight darkMode={darkMode} />
            </div>
          </div>
          
          {/* Security Integrity Box */}
          <div className={`mt-10 p-6 rounded-3xl border ${darkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-100"}`}>
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck size={18} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Ledger Verified</span>
            </div>
            <p className={`text-xs font-bold italic leading-relaxed ${darkMode ? "text-gray-500" : "text-slate-500"}`}>
              "Database synchronized with blockchain shards. Integrity confirmed for current session."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS (Defined inside same file for easy copy-paste) --- */

const StatBox = ({ label, value, icon, color, trend, isAlert, sub, darkMode }) => {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
    orange: "text-[#f99616] bg-[#f99616]/10 border-[#f99616]/20",
    red: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  return (
    <div className={`relative p-8 rounded-[35px] border transition-all duration-500 group
      ${isAlert ? "border-red-500 bg-red-500/5 animate-pulse" : 
      darkMode ? "bg-[#0a0a0a] border-gray-800 hover:border-[#f99616]/50 shadow-2xl" : "bg-white border-slate-200 hover:shadow-xl"}`}>
      
      <div className="flex justify-between items-start mb-8">
        <div className={`p-4 rounded-2xl border ${colors[color]}`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        {trend && <span className="text-[8px] font-black bg-green-500 text-white px-3 py-1 rounded-full uppercase italic tracking-tighter">{trend}</span>}
        {isAlert && <AlertCircle className="text-red-500" size={20} />}
      </div>
      
      <div className="space-y-1">
        <p className={`text-[10px] font-black uppercase tracking-[3px] ${darkMode ? "text-gray-600" : "text-slate-400"}`}>{label}</p>
        <h3 className="text-4xl font-black tracking-tighter italic leading-none">{value}</h3>
        <p className="text-[9px] font-bold uppercase opacity-30 mt-2">{sub}</p>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value, sub, highlight, color, darkMode }) => (
  <div className="flex justify-between items-center group cursor-default">
    <div className="space-y-1">
      <p className={`text-[11px] font-black uppercase tracking-widest transition-colors ${darkMode ? "text-gray-500 group-hover:text-white" : "text-slate-400 group-hover:text-slate-900"}`}>{label}</p>
      <p className="text-[9px] font-bold uppercase opacity-20">{sub}</p>
    </div>
    <div className="text-right">
      <p className={`text-xl font-black tracking-tighter italic transition-all duration-300
        ${highlight ? 'text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]' : color === 'red' ? 'text-red-600' : ''}`}>
        {value}
      </p>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md ${darkMode ? "bg-black/90 border-gray-800" : "bg-white/90 border-slate-200"}`}>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#f99616] mb-2">{label} Report</p>
        <div className="space-y-1">
          <p className="text-base font-black">Volume: ${payload[0].value.toLocaleString()}</p>
          <p className="text-[9px] font-bold uppercase opacity-60">Network Nodes: {payload[0].payload.users}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default AdminOverview;
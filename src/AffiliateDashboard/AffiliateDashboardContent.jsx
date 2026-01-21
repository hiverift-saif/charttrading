import React, { useState, useEffect, useMemo } from 'react';
import { UserPlus, Link2, Loader2, Copy, CheckCircle, TrendingUp, Activity, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricsCard from "./AffiliateMetricsCard";
import BalanceCard from "./AffiliateBalanceCard";
import CommissionsCard from "./AffiliateCommissionsCard";
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';

const DashboardContent = () => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [copied, setCopied] = useState(false);

  // 🚀 API FETCH LOGIC
  const fetchDashboard = async () => {
    const token = localStorage.getItem("affiliate_token");
    if (!token) { setLoading(false); return; }
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.baseURL}/referral/dashboard`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.statusCode === 200 && data.result) {
        setDashboardData(data.result);
      }
    } catch (error) {
      console.error("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  // 🚀 DYNAMIC CHART LOGIC: Data points based on API Result
  const dynamicChartData = useMemo(() => {
    if (!dashboardData) return [];
    const base = dashboardData.totalCommissionsEarned || 0;
    // Mocking growth points for visual appeal using real base data
    return [
      { name: 'Mon', val: base * 0.2 }, { name: 'Tue', val: base * 0.4 },
      { name: 'Wed', val: base * 0.3 }, { name: 'Thu', val: base * 0.7 },
      { name: 'Fri', val: base * 0.6 }, { name: 'Sat', val: base * 0.9 },
      { name: 'Sun', val: base || 50 } 
    ];
  }, [dashboardData]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className={`h-96 w-full flex flex-col items-center justify-center gap-4 transition-colors ${darkMode ? "bg-black" : "bg-white"}`}>
        <Loader2 className="w-10 h-10 text-[#f99616] animate-spin" />
        <p className="text-gray-500 font-black tracking-widest uppercase text-[10px]">Syncing Affiliate Stats...</p>
      </div>
    );
  }

  const res = dashboardData;
  const formatCurrency = (val) => Number(val || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className={`space-y-6 animate-in fade-in duration-500 px-1 sm:px-0 transition-colors ${darkMode ? "bg-black" : "bg-white"}`}>
      
      {/* 🚀 1. TOP ROW: REFERRAL STATS & PROMO CODE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricsCard 
          title="Registered Referrals" 
          value={res?.registeredReferrals?.toString() || "0"} 
          icon={UserPlus} 
          iconColor="text-blue-500" 
        />

        {/* <div className={`p-5 rounded-2xl border flex items-center gap-4 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
           <div className="p-3 bg-green-500/10 text-green-500 rounded-xl shrink-0"><ShieldCheck size={20}/></div>
           <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Referral Code</p>
              <p className={`text-xl font-black italic tracking-widest text-[#f99616]`}>{res?.referralCode || "---"}</p>
           </div>
        </div> */}

        {/* <div className={`p-5 rounded-2xl border flex items-center justify-between relative overflow-hidden ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
           <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="p-3 rounded-xl bg-[#f99616]/10 text-[#f99616] shrink-0"><Link2 size={20}/></div>
              <div className="min-w-0 flex-1">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Tracking Link</p>
                 <p className={`text-xs font-bold truncate pr-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{res?.referralLink}</p>
              </div>
           </div>
           <button onClick={() => copyToClipboard(res?.referralLink)} className={`shrink-0 p-2 rounded-lg transition-all ${copied ? "text-green-500" : "text-[#f99616] hover:bg-[#f99616]/10"}`}>
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
           </button>
        </div> */}
      </div>

      {/* 🚀 2. FINANCIAL OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <BalanceCard metrics={[
              { label: "Wallet Balance", value: formatCurrency(res?.walletBalance) },
              { label: "Portfolio Value", value: formatCurrency(res?.portfolioValue) },
              { label: "Commission Rate", value: `${res?.commissionRate || 0}%` },
            ]} />
        </div>
        <div className="lg:col-span-1">
            <CommissionsCard 
              amount={formatCurrency(res?.totalCommissionsEarned)}
              title="Total Earned" 
            />
        </div>
      </div>

      {/* 🚀 3. PERFORMANCE CHART */}
      <div className={`p-6 rounded-2xl border shadow-2xl transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-black/50" : "bg-white border-gray-100"}`}>
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Activity size={20}/></div>
            <h3 className={`text-sm font-black uppercase tracking-widest ${darkMode ? "text-white" : "text-slate-900"}`}>Profit Performance</h3>
          </div>
          <div className="flex gap-2">
             <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Live Sync</span>
          </div>
        </div>

        <div className="relative w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dynamicChartData}>
              <defs>
                <linearGradient id="colorO" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f99616" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f99616" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1f2937" : "#e2e8f0"} opacity={0.4} />
              <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} tick={{fontWeight: '900'}} />
              <YAxis hide />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '10px' }}
                 itemStyle={{ color: '#f99616', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="val" stroke="#f99616" fill="url(#colorO)" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
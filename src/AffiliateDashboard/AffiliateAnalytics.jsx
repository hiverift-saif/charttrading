import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, MousePointer, Wallet, Percent, Loader2, TrendingUp } from "lucide-react";
import API_CONFIG from "../config"; // 🚀 Import check
import { useTheme } from "../context/ThemeContext";

export default function AffiliateAnalytics() {
  const { darkMode } = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("affiliate_token");0.
        
        // 🚀 FIX: Yahan API_CONFIG.baseURL use kiya hai (not BASE_URL)
        const fullURL = `${API_CONFIG.baseURL}/influencer/dashboard`;
        console.log("Fetching from:", fullURL); // Debugging ke liye check karein

        const response = await axios.get(fullURL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.statusCode === 200) {
          setDashboardData(response.data.result);
        }
      } catch (err) {
        setError("Network Error: Backend unreachable");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🚀 Chart Data (API Mapping)
  const chartData = useMemo(() => {
    if (!dashboardData) return [];
    const { clicks, registrations, deposits } = dashboardData;
    return [
      { name: 'Initial', clicks: clicks * 0.3, regs: registrations * 0.2, deps: deposits * 0.1 },
      { name: 'Mid', clicks: clicks * 0.7, regs: registrations * 0.6, deps: deposits * 0.5 },
      { name: 'Final', clicks: clicks, regs: registrations, deps: deposits },
    ];
  }, [dashboardData]);

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#f99616]" />
      <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Syncing Intelligence...</p>
    </div>
  );

  if (error) return (
    <div className="h-96 flex flex-col items-center justify-center gap-2">
      <p className="text-red-500 font-black uppercase text-[10px] tracking-widest">{error}</p>
      <button onClick={() => window.location.reload()} className="text-[#f99616] text-[9px] font-bold underline uppercase">Retry Connection</button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 🚀 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Clicks" value={dashboardData?.clicks} icon={<MousePointer size={24}/>} darkMode={darkMode} />
        <StatCard label="Registrations" value={dashboardData?.registrations} icon={<Users size={24}/>} darkMode={darkMode} />
        <StatCard label="Conv. Rate" value={dashboardData?.conversionRate} icon={<Percent size={24}/>} darkMode={darkMode} color="text-green-500" />
        <StatCard label="Deposits" value={dashboardData?.deposits} icon={<Wallet size={24}/>} darkMode={darkMode} color="text-[#f99616]" />
      </div>

      {/* 🚀 Analytics Chart */}
      <div className={`rounded-3xl border p-6 ${darkMode ? "border-gray-800 bg-[#0a0a0a]" : "border-gray-200 bg-white shadow-sm"}`}>
        <h3 className="text-[11px] font-black uppercase tracking-[3px] text-gray-500 mb-8 flex items-center gap-2">
           <TrendingUp size={16} className="text-[#f99616]" /> Live Traffic Performance
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f99616" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f99616" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1a1a1a" : "#f0f0f0"} />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="clicks" stroke="#f99616" strokeWidth={4} fill="url(#grad1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, icon, darkMode, color }) => (
  <div className={`p-6 rounded-3xl border transition-all hover:translate-y-[-4px] ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200 shadow-xl"}`}>
    <div className={`p-3 rounded-2xl w-fit mb-4 ${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
      <span className="text-[#f99616]">{icon}</span>
    </div>
    <p className="text-[10px] font-black uppercase tracking-[2px] text-gray-500 mb-1">{label}</p>
    <h3 className={`text-2xl font-black italic tracking-tighter ${color || (darkMode ? "text-white" : "text-black")}`}>
      {value || 0}
    </h3>
  </div>
);
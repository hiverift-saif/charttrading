import React, { useState, useEffect } from 'react';
import { UserPlus, Link2, Loader2, Copy, CheckCircle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MetricsCard from "./AffiliateMetricsCard";
import BalanceCard from "./AffiliateBalanceCard";
import CommissionsCard from "./AffiliateCommissionsCard";
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

// Static Chart Data
const chartData = [
  { name: 'Mon', commission: 25 }, 
  { name: 'Tue', commission: 45 }, 
  { name: 'Wed', commission: 30 },
  { name: 'Thu', commission: 55 }, 
  { name: 'Fri', commission: 40 }, 
  { name: 'Sat', commission: 65 }, 
  { name: 'Sun', commission: 50 },
];

const DashboardContent = () => {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [copied, setCopied] = useState(false);

  // --- STATIC DATA FALLBACK ---
  const staticFallback = {
    balance: 1250.00,
    totalPnL: 450.25,
    referralCount: "15",
    affiliateCode: "PARTNER2025",
    commissionRate: 20,
    portfolioValue: 3200.50
  };

  const fetchDashboard = async () => {
    const token = localStorage.getItem("affiliate_token");
    if (!token) {
        setLoading(false);
        return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://192.168.0.112:3000/api/v1/dashboard", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        setDashboardData(data.result);
      }
    } catch (error) {
      console.error("Dashboard API Error, showing static data:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setIsReady(true), 300);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className={`h-96 w-full flex flex-col items-center justify-center gap-4 transition-colors ${darkMode ? "bg-black" : "bg-white"}`}>
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">Loading Data...</p>
      </div>
    );
  }

  // --- PRIORITY LOGIC ---
  const userInfo = dashboardData?.userInfo;
  const portfolio = dashboardData?.portfolio;
  const trades = dashboardData?.trades || [];

  const displayBalance = userInfo?.balance ?? staticFallback.balance;
  const displayReferrals = userInfo?.following?.length ?? staticFallback.referralCount;
  const displayCode = userInfo?.affiliateCode ?? staticFallback.affiliateCode;
  const displayPortfolio = portfolio?.totalBalance ?? staticFallback.portfolioValue;
  const displayPnL = portfolio?.profitLoss ?? staticFallback.totalPnL;
  const displayCommRate = userInfo?.commissionRate ?? staticFallback.commissionRate;

  const metricsData = [
    { title: "Registered Referrals", value: displayReferrals.toString(), icon: UserPlus, iconColor: "text-blue-500" },
    { 
      title: "Affiliate Code", 
      value: displayCode,
      icon: Link2, 
      iconColor: "text-green-500",
      action: (
        <button onClick={() => copyToClipboard(displayCode)} className={`ml-2 p-1 rounded-md transition-all active:scale-90 ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}>
          {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />}
        </button>
      )
    },
  ];

  const balanceMetrics = [
    { label: "Wallet Balance", value: `$${Number(displayBalance).toFixed(2)}` },
    { label: "Portfolio Value", value: `$${Number(displayPortfolio).toFixed(2)}` },
    { label: "Commission Rate", value: `${displayCommRate}%` },
  ];

  return (
    <div className={`space-y-4 sm:space-y-6 animate-in fade-in duration-500 px-1 sm:px-0 transition-colors duration-500 ${darkMode ? "bg-black" : "bg-white"}`}>
      
      {/* 1. API Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {metricsData.map((m) => (
          <div key={m.title} className="w-full relative group">
            <MetricsCard {...m} />
            {m.action && <div className="absolute right-6 top-1/2 -translate-y-1/2">{m.action}</div>}
          </div>
        ))}
      </div>

      {/* 2. API Financial Cards */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <BalanceCard metrics={balanceMetrics} />
        <CommissionsCard 
          amount={`$${Number(displayPnL).toFixed(2)}`}
          title="Total Profit/Loss" 
        />
      </div>

      {/* 3. Chart Section */}
      <div className={`p-4 sm:p-6 rounded-2xl border shadow-2xl transition-colors ${darkMode ? "bg-black border-gray-900" : "bg-white border-gray-100"}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h3 className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}>Earnings Overview</h3>
          <div className={`flex p-1 rounded-xl border transition-colors ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
            {["day", "week", "month"].map((f) => (
              <button key={f} className={`px-5 py-2 text-xs font-bold uppercase transition-colors ${darkMode ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-slate-900"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full h-64 sm:h-96">
          {isReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#1f2937" : "#e2e8f0"} opacity={0.5} />
                <XAxis dataKey="name" stroke={darkMode ? "#4b5563" : "#94a3b8"} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke={darkMode ? "#4b5563" : "#94a3b8"} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? '#000' : '#fff', border: darkMode ? '1px solid #1f2937' : '1px solid #e2e8f0', borderRadius: '8px', color: darkMode ? '#fff' : '#000' }} />
                <Area type="monotone" dataKey="commission" stroke="#2563eb" fill="url(#colorValue)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
            </div>
          )}
        </div>
      </div>

      {/* 4. Trades Status */}
      {(trades.length === 0 && !dashboardData) && (
        <div className={`p-10 border rounded-2xl text-center transition-colors ${darkMode ? "border-gray-900 bg-gray-900/10" : "border-gray-200 bg-gray-50"}`}>
          <TrendingUp className={`mx-auto mb-3 ${darkMode ? "text-gray-800" : "text-gray-300"}`} size={32} />
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">No Active Trades Found</p>
        </div>
      )}

      <div className="h-6 lg:hidden"></div>
    </div>
  );
};

export default DashboardContent;
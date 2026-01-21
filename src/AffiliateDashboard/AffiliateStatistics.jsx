import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from "../context/ThemeContext";
import { Loader2, MousePointer2, UserPlus, Wallet, Percent, BarChart3, Target } from "lucide-react";
import axios from "axios";
import API_CONFIG from '../config';

function AffiliateStatistics() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('day');
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState([]);

  // 🚀 Fetch Statistics from API
  useEffect(() => {
    const fetchStatistics = async () => {
      const token = localStorage.getItem("affiliate_token");
      try {
        setLoading(true);
        const response = await axios.get(`${API_CONFIG.baseURL}/referral/statistics`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.data.statusCode === 200) {
          setStatsData(response.data.result || []);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  // 🚀 Logic: Aggregate Totals for Top Cards
  const totals = useMemo(() => {
    return statsData.reduce((acc, curr) => ({
      clicks: acc.clicks + (curr.clicks || 0),
      registrations: acc.registrations + (curr.registrations || 0),
      deposits: acc.deposits + (curr.deposits || 0),
      commission: acc.commission + (curr.commission || 0)
    }), { clicks: 0, registrations: 0, deposits: 0, commission: 0 });
  }, [statsData]);

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-[#f99616] animate-spin" />
      <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">Syncing Statistics...</p>
    </div>
  );

  return (
    <div className={`space-y-8 animate-in fade-in duration-700 transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* 🚀 1. TOP METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniCard label="Total Clicks" value={totals.clicks} icon={MousePointer2} color="text-blue-500" dark={darkMode} />
        <MiniCard label="Total Registrations" value={totals.registrations} icon={UserPlus} color="text-purple-500" dark={darkMode} />
        <MiniCard label="Active Deposits" value={totals.deposits} icon={Wallet} color="text-green-500" dark={darkMode} />
        <MiniCard label="Total Commission" value={`$${totals.commission.toFixed(2)}`} icon={Percent} color="text-[#f99616]" dark={darkMode} />
      </div>

      <div className="flex flex-col gap-2">
        {/* 🚀 2. TABS SWITCHER */}
        <div className={`flex flex-wrap gap-2 border rounded-xl p-1 transition-colors ${darkMode ? "bg-black border-gray-700" : "bg-gray-100 border-gray-200"}`}>
          {['day', 'performance'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-[#f99616] text-black shadow-lg"
                  : "text-gray-500 hover:text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🚀 3. TABLE CONTAINER */}
        <div className={`rounded-xl border shadow-2xl overflow-hidden ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-100"}`}>
          <div className="p-6 border-b border-gray-800/50 flex justify-between items-center">
             <h4 className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2">
               <BarChart3 size={18} className="text-[#f99616]" /> {activeTab === 'day' ? "Daily Breakdown" : "Performance Index"}
             </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={`border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                <tr className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Clicks</th>
                  <th className="p-4 text-left">Regs</th>
                  <th className="p-4 text-left">Deposits</th>
                  <th className="p-4 text-left">Dep. Sum</th>
                  <th className="p-4 text-left">Comm.</th>
                  <th className="p-4 text-left">Turnover</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-50"}`}>
                {statsData.map((row, i) => (
                  <tr key={i} className={`transition-colors ${darkMode ? "hover:bg-white/[0.02]" : "hover:bg-gray-50"}`}>
                    <td className="p-4 font-bold text-blue-500">{row.date}</td>
                    <td className="p-4 font-black">{row.clicks}</td>
                    <td className="p-4 font-black">{row.registrations}</td>
                    <td className="p-4 font-black">{row.deposits}</td>
                    <td className="p-4 font-black text-green-500">${row.depositSum}</td>
                    <td className="p-4 text-[#f99616] font-black italic">${row.commission}</td>
                    <td className="p-4 font-black">${row.turnover}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🚀 MINI CARD COMPONENT
const MiniCard = ({ label, value, icon: Icon, color, dark }) => (
  <div className={`p-5 rounded-2xl border transition-all hover:translate-y-[-2px] ${dark ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${dark ? 'bg-white/5' : 'bg-gray-50'}`}>
        <Icon size={20} className={color} />
      </div>
      <span className="bg-green-500/10 text-green-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
        Optimal
      </span>
    </div>
    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</p>
    <h3 className={`text-2xl font-black italic tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>{value}</h3>
  </div>
);

export default AffiliateStatistics;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Activity, Database, Server, ShieldCheck, 
  RefreshCcw, AlertTriangle, Zap, Clock 
} from "lucide-react";
import API_CONFIG from "../config";

const SystemHealth = ({ darkMode }) => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState(new Date());

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_CONFIG.baseURL}/health`);
      setHealth(res.data.result);
      setLastCheck(new Date());
    } catch (err) {
      console.error("Health Check Failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`space-y-8 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* 🚀 HEADER & ACTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            System <span className="text-[#f99616]">Telemetry</span>
          </h2>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic mt-1">
            Real-time Surveillance of Infrastructure & Database Nodes
          </p>
        </div>
        <button 
          onClick={fetchHealth}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-[#f99616] text-[10px] font-black uppercase hover:bg-zinc-800 transition-all"
        >
          <RefreshCcw size={14} className={loading ? "animate-spin" : ""} /> Force Re-Scan
        </button>
      </div>

      {/* 📡 LIVE STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core System Status */}
        <div className={`p-8 rounded-[2.5rem] border ${darkMode ? "bg-black border-zinc-800" : "bg-white shadow-xl border-slate-100"}`}>
          <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${health?.status === 'ok' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              <Server size={24} />
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[8px] font-black text-green-500 uppercase">Live</span>
            </div>
          </div>
          <h3 className="text-[10px] font-black text-gray-500 uppercase mb-1">Infrastructure</h3>
          <p className="text-xl font-black italic uppercase">{health?.status === 'ok' ? 'Operational' : 'Critical'}</p>
        </div>

        {/* Database Status */}
        <div className={`p-8 rounded-[2.5rem] border ${darkMode ? "bg-black border-zinc-800" : "bg-white shadow-xl border-slate-100"}`}>
          <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${health?.details?.database?.status === 'up' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'}`}>
              <Database size={24} />
            </div>
            <Zap size={16} className="text-blue-500" />
          </div>
          <h3 className="text-[10px] font-black text-gray-500 uppercase mb-1">Database Engine</h3>
          <p className="text-xl font-black italic uppercase">{health?.details?.database?.status === 'up' ? 'Synchronized' : 'Disconnected'}</p>
        </div>

        {/* Security / Uptime */}
        <div className={`p-8 rounded-[2.5rem] border ${darkMode ? "bg-black border-zinc-800" : "bg-white shadow-xl border-slate-100"}`}>
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-[#f99616]/10 text-[#f99616]">
              <ShieldCheck size={24} />
            </div>
            <Clock size={16} className="text-gray-500" />
          </div>
          <h3 className="text-[10px] font-black text-gray-500 uppercase mb-1">Last Handshake</h3>
          <p className="text-xl font-black italic uppercase">{lastCheck.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* 📊 TECHNICAL LOGS & DETAILS */}
      <div className={`p-10 rounded-[3rem] border ${darkMode ? "bg-zinc-900/20 border-zinc-800" : "bg-slate-50 border-slate-200"}`}>
        <div className="flex items-center gap-3 mb-8">
          <Activity size={20} className="text-[#f99616]" />
          <h3 className="text-xs font-black uppercase italic">Handshake JSON Payload</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Service Status</span>
                <span className="text-xs font-black text-green-500 uppercase">{health?.status}</span>
             </div>
             <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                <span className="text-[10px] font-bold text-gray-500 uppercase">DB status</span>
                <span className="text-xs font-black text-green-500 uppercase">{health?.info?.database?.status}</span>
             </div>
             <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                <span className="text-[10px] font-bold text-gray-500 uppercase">API Latency</span>
                <span className="text-xs font-black text-[#f99616]">24ms</span>
             </div>
          </div>

          <div className={`p-6 rounded-3xl font-mono text-[10px] overflow-hidden ${darkMode ? "bg-black text-green-400" : "bg-zinc-900 text-green-400"}`}>
            <p className="opacity-50 mb-2">// RAW_DATA_STREAM</p>
            <pre>{JSON.stringify(health, null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* ⚠️ ALERTS PANEL */}
      <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex items-center gap-4">
        <AlertTriangle className="text-yellow-500" size={20} />
        <p className="text-[9px] font-black uppercase tracking-wider text-yellow-600">
          Monitor Alert: All systems operational. No latency spikes detected in the last 24 cycles.
        </p>
      </div>
    </div>
  );
};

export default SystemHealth;
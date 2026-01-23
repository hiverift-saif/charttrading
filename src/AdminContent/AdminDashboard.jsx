import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import AdminUserManagement from './AdminUserManagement';
import AdminFinance from './AdminFinance';
import AdminFinanceHistory from './AdminFinanceHistory';
import AdminKYC from './AdminKYC';
import AdminWithdrawals from './AdminWithdrawals';
import { Menu, AlertTriangle, Activity, Database, Sun, Moon } from 'lucide-react';
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";
import InfluencerPromo from './InfluencerPromo'; // 🚀 Import naya component
import AdminSupport from './AdminSupport';
import AdminTradeHistory from './AdminTradeHistory';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("admin_active_tab") || "overview";
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const [isApiDown, setIsApiDown] = useState(false);
  const [dbStatus, setDbStatus] = useState('up'); 

  // 🚀 Navbar Reference Logic: invert(1) for Light Mode
  const logoStyle = {
    filter: darkMode ? "none" : "invert(1)",
    transition: "filter 0.3s ease"
  };

  useEffect(() => {
    localStorage.setItem("admin_active_tab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const runSystemCheck = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) return;

      try {
        const downtimeRes = await axios.get(`${API_CONFIG.baseURL}/admin/alerts/api-downtime`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setIsApiDown(downtimeRes.data?.result?.downtime === true);
        
        try {
          const healthRes = await axios.get(`${API_CONFIG.baseURL}/health`);
          if (healthRes.status === 200) {
            setDbStatus('up');
          } else {
            setDbStatus('down');
          }
        } catch (healthErr) {
          if (downtimeRes.status === 200) {
            setDbStatus('up'); 
          } else {
            setDbStatus('down');
          }
        }

      } catch (err) {
        setDbStatus('down');
        setIsApiDown(true);
      }
    };

    runSystemCheck();
    const interval = setInterval(runSystemCheck, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderComponent = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview />;
      case 'users': return <AdminUserManagement />;
      case 'support': return <AdminSupport />; // 🚀 Naya support case
      case 'influencer_promo': return <InfluencerPromo />; // 🚀 Link to new component
      case 'finance_pending': return <AdminFinance />;
      case 'finance_history': return <AdminFinanceHistory />;
      case 'withdrawals': return <AdminWithdrawals />;
      case 'trades': return <AdminTradeHistory />; // 🚀 Case add kiya trades ke liye
      case 'kyc': return <AdminKYC />;
      default: return <AdminOverview />;
    }
  };

  const showCriticalAlert = isApiDown || dbStatus === 'down';
  const ALERT_HEIGHT = showCriticalAlert ? "40px" : "0px";

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
      
      {/* 🚀 1. ALERT BANNER */}
      {showCriticalAlert && (
        <div className="fixed top-0 left-0 right-0 z-[1000] bg-red-600 h-10 flex items-center justify-center gap-4 animate-pulse shadow-2xl">
          <AlertTriangle size={18} className="text-white" />
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">
            {dbStatus === 'down' ? "Critical: Database Disconnected!" : "Alert: API Services Down!"}
          </span>
        </div>
      )}

      {/* 🚀 2. SIDEBAR */}
      <div 
        className={`fixed inset-y-0 left-0 z-[800] w-72 transition-all duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 
        ${darkMode ? 'bg-black' : 'bg-white'}`} 
      >
        <div className="h-full flex flex-col" style={{ paddingTop: ALERT_HEIGHT }}>
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
        </div>
      </div>

      {/* 🚀 3. MAIN WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-full lg:ml-72 relative">
        
        {/* HEADER */}
        <header 
          className={`fixed top-0 left-0 lg:left-72 right-0 h-16 flex items-center justify-between px-6 border-b z-[500] transition-all duration-300 
          ${darkMode ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-slate-200 shadow-sm'} backdrop-blur-md`}
          style={{ top: ALERT_HEIGHT }}
        >
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#f99616] p-1">
              <Menu size={26} />
            </button>
            {/* 🚀 Fixed Logo with Navbar Logic */}
            <img 
              src="/src/assets/logo.png" 
              alt="Logo" 
              className="w-28 md:w-32 h-auto object-contain" 
              style={logoStyle}
            />
          </div>

          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-all ${darkMode ? 'bg-gray-900 border-gray-800 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* 🚀 4. ACTUAL SCROLLABLE CONTENT */}
        <main 
          className="flex-1 overflow-y-auto overflow-x-hidden custom-main-scroll"
          style={{ paddingTop: `calc(${ALERT_HEIGHT} + 64px)` }}
        >
          <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-full">
            
            {/* System Health Bar */}
            <div className={`hidden lg:flex items-center gap-6 mb-8 border p-4 rounded-2xl w-fit shadow-xl transition-colors ${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <Database size={14} className={dbStatus === 'up' ? 'text-green-500' : 'text-red-500'} />
                <span className="text-[9px] font-black uppercase tracking-[2px] opacity-50">Core Engine: {dbStatus}</span>
              </div>
              <div className="flex items-center gap-2 border-l pl-6 border-gray-800">
                <Activity size={14} className={!isApiDown ? 'text-green-500' : 'text-red-500'} />
                <span className="text-[9px] font-black uppercase tracking-[2px] opacity-50">API: {!isApiDown ? 'Online' : 'Downtime'}</span>
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {renderComponent()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-[700] lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-main-scroll::-webkit-scrollbar { width: 6px; }
        .custom-main-scroll::-webkit-scrollbar-thumb { background: ${darkMode ? '#333' : '#ddd'}; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import AdminUserManagement from './AdminUserManagement';
import AdminFinance from './AdminFinance';
import AdminFinanceHistory from './AdminFinanceHistory';
import AdminKYC from './AdminKYC';
import AdminWithdrawals from './AdminWithdrawals';
import AdminSupport from './AdminSupport';
import AdminTradeHistory from './AdminTradeHistory';
import InfluencerPromo from './InfluencerPromo';
import { Menu, AlertTriangle, Activity, Database, Sun, Moon } from 'lucide-react';
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("admin_active_tab") || "overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate('/adminlogin');
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("admin_active_tab", activeTab);
  }, [activeTab]);

  const renderComponent = () => {
    // 🚀 Logic: Tree Filter Handling
    if (activeTab.startsWith('users_')) {
      const filter = activeTab.replace('users_', ''); // Extract 'all', 'kyc_unverified', etc.
      return <AdminUserManagement filterType={filter === 'all' ? '' : filter} />;
    }

    switch (activeTab) {
      case 'overview': return <AdminOverview />;
      case 'finance_pending': return <AdminFinance />;
      case 'finance_history': return <AdminFinanceHistory />;
      case 'withdrawals': return <AdminWithdrawals />;
      case 'trades': return <AdminTradeHistory />;
      case 'kyc': return <AdminKYC />;
      case 'support': return <AdminSupport />;
      case 'influencer_promo': return <InfluencerPromo />;
      default: return <AdminOverview />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
      <div className={`fixed inset-y-0 left-0 z-[800] w-72 transition-all duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full lg:ml-72 relative">
        <header className={`fixed top-0 left-0 lg:left-72 right-0 h-16 flex items-center justify-between px-6 border-b z-[500] ${darkMode ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#f99616] p-1"><Menu size={26} /></button>
            <img src="/src/assets/logo.png" className="w-28" style={{ filter: darkMode ? "none" : "invert(1)" }} alt="Logo" />
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl border transition-all ${darkMode ? 'bg-gray-900 border-gray-800 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 custom-main-scroll">
          <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-full animate-in fade-in duration-500">
            {renderComponent()}
          </div>
        </main>
      </div>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-[700] lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
};

export default AdminDashboard;
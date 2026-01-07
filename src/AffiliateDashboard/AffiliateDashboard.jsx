import React, { useState } from 'react';
import AffiliateSidebar from "./AffiliateSidebar";
import AffiliateHeader from "./AffiliateHeader";
import AffiliateDashboardContent from "./AffiliateDashboardContent";
import AffiliateProfile from "./AffiliateProfile";
import AffiliateStatistics from "./AffiliateStatistics";
import AffiliateLinks from "./AffiliateLinks";
import AffiliateAnalytics from "./AffiliateAnalytics";
import Affiliatepayments from "./Affiliatepayments";
import AffiliatePromo from "./AffiliatePromo";
import AffiliateTelegram from "./AffiliateTelegram";
import AffiliateSupport from "./AffiliateSupport";
import AffiliatePrograms from "./AffiliatePrograms";
import Subaffiliate from "./Subaffiliate";

import { 
  LayoutDashboard, User, BarChart3, Link2, PieChart, 
  CreditCard, Image, Send, LifeBuoy, TrendingUp, Users, X 
} from 'lucide-react';

import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

const AffiliateDashboard = () => {
  const { darkMode } = useTheme(); // 🚀 Theme state access
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navItems = [
    { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
    { label: 'Profile', id: 'profile', icon: User },
    { label: 'Statistics', id: 'statistics', icon: BarChart3 },
    { label: 'Links', id: 'links', icon: Link2 },
    { label: 'Analytics', id: 'analytics', icon: PieChart },
    { label: 'Payments', id: 'payments', icon: CreditCard },
    { label: 'Promo Materials', id: 'promo', icon: Image },
    { label: 'Telegram Bot', id: 'telegram', icon: Send },
    { label: 'Support', id: 'support', icon: LifeBuoy },
    { label: 'Affiliate Programs', id: 'programs', icon: TrendingUp },
    { label: 'Sub Affiliate', id: 'subaffiliate', icon: Users },
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard': return <AffiliateDashboardContent key="dashboard" />;
      case 'profile': return <AffiliateProfile key="profile" />;
      case 'statistics': return <AffiliateStatistics key="statistics" />;
      case 'links': return <AffiliateLinks key="links" />;
      case 'analytics': return <AffiliateAnalytics key="analytics" />;
      case 'payments': return <Affiliatepayments key="payments" />;
      case 'promo': return <AffiliatePromo key="promo" />;
      case 'telegram': return <AffiliateTelegram key="telegram" />;
      case 'support': return <AffiliateSupport key="support" />;
      case 'programs': return <AffiliatePrograms key="programs" />;
      case 'subaffiliate': return <Subaffiliate key="subaffiliate" />;
      default: return <AffiliateDashboardContent key="default" />;
    }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden font-sans relative transition-colors duration-500
      ${darkMode ? "bg-black text-gray-400" : "bg-gray-50 text-gray-600"}`}>
      
      {/* 1. MOBILE BACKDROP */}
      <div 
        className={`fixed inset-0 z-[55] lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } ${darkMode ? "bg-black/80 backdrop-blur-sm" : "bg-slate-900/40 backdrop-blur-[2px]"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* 2. SIDEBAR CONTAINER */}
      <div className={`
        fixed inset-y-0 left-0 z-[60] w-72 lg:w-64 transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-6 text-gray-400 lg:hidden hover:text-white p-2"
        >
          <X size={24} />
        </button>

        <AffiliateSidebar 
          navItems={navItems} 
          activeComponent={activeComponent} 
          setActiveComponent={(id) => {
            setActiveComponent(id);
            setSidebarOpen(false); 
          }}
          onClose={() => setSidebarOpen(false)} 
        />
      </div>

      {/* 3. MAIN CONTENT */}
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-colors duration-500
        ${darkMode ? "bg-black" : "bg-white"}`}>
        
        <AffiliateHeader 
          balance={0.00} 
          onMenuClick={toggleSidebar} 
          pageTitle={navItems.find(n => n.id === activeComponent)?.label}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
          
          <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-500">
             <h1 className={`text-xl md:text-3xl font-black uppercase tracking-tight transition-colors
               ${darkMode ? "text-white" : "text-slate-900"}`}>
               {navItems.find(n => n.id === activeComponent)?.label}
             </h1>
             <div className="h-1.5 w-16 bg-[#f99616] mt-2 rounded-full shadow-[0_0_15px_rgba(249,150,22,0.4)]"></div>
          </div>

          {/* Render Area */}
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {renderComponent()}
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${darkMode ? "#000" : "#f1f5f9"}; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${darkMode ? "#1f2937" : "#cbd5e1"}; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f99616; }
      `}</style>
    </div>
  );
};

export default AffiliateDashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- COMPONENTS ---
import AdminSidebar from "./AdminSidebar";
import AdminOverview from "./AdminOverview";
import AdminUserManagement from "./AdminUserManagement";
import AdminFinance from "./AdminFinance";
import AdminFinanceHistory from "./AdminFinanceHistory";
import AdminKYC from "./AdminKYC";
import AdminWithdrawals from "./AdminWithdrawals";
import AdminSupport from "./AdminSupport";
import AdminTradeHistory from "./AdminTradeHistory";
import InfluencerPromo from "./InfluencerPromo";
import AdminTradingControl from "./AdminTradingControl";
import AdminReports from "./AdminReports";
import AdminSettings from "./AdminSettings";
import UserBlockControl from "./UserBlockControl";
import AdminSecurity from "./AdminSecurity"; // 🚀 Linked Security Component
import IdentitySurveillance from "./IdentitySurveillance";

import { Menu, Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AdminBalanceAdjust from "./AdminBalanceAdjust";
import NexusAnalytics from "./NexusAnalytics";
import logo from "../assets/logo.png";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  // 1. Tab Persistence Logic
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("admin_active_tab") || "overview",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 2. Auth Guard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/adminlogin");
  }, [navigate]);

  // 3. Update localStorage when tab changes
  useEffect(() => {
    localStorage.setItem("admin_active_tab", activeTab);
  }, [activeTab]);

  // --- 🌳 COMPONENT RENDERING ENGINE ---
  const renderComponent = () => {
    // A. User Fleet Tree Handling (Global, Pending, etc.)
    if (activeTab.startsWith("users_")) {
      const filter = activeTab.replace("users_", "");
      return (
        <AdminUserManagement filterType={filter === "all" ? "" : filter} />
      );
    }

    // B. Switch for Specific Tabs
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;

      // 🚀 SECURITY ENGINE (Access Control, Force Logout, Reset Pass)
      case "security_access_control":
        return <AdminSecurity darkMode={darkMode} />;

      // USER SECURITY SECTION (Old reference if needed)
      case "user_block_control":
        return <UserBlockControl darkMode={darkMode} />;

      // FINANCE SECTION
      case "finance_pending":
        return <AdminFinance />;
      case "finance_history":
        return <AdminFinanceHistory />;
      case "withdrawals":
        return <AdminWithdrawals />;
      case "finance_adjust":
        return <AdminBalanceAdjust darkMode={darkMode} />;

      case "reports_finance":
      case "reports_trade":
      case "reports_export":
        return <NexusAnalytics darkMode={darkMode} activeSubTab={activeTab} />;

      // TRADING ENGINE
      case "trading_assets":
      case "trading_payouts":
      case "trading_live":
        return (
          <AdminTradingControl darkMode={darkMode} activeSubTab={activeTab} />
        );
// Dashboard ke switch mein 'reports_nexus' ko 'reports_finance' ya 'reports_trade' se match karo
case "reports_finance":
case "reports_trade":
case "reports_export":
  return <NexusAnalytics darkMode={darkMode} activeSubTab={activeTab} />;

      // MANAGEMENT
      case "kyc":
        return <AdminKYC />;
      case "trades":
        return <AdminTradeHistory />;
      case "support":
        return <AdminSupport />;
      case "influencer_promo":
        return <InfluencerPromo />;
      case "settings":
        return <AdminSettings darkMode={darkMode} />;

      case "security_logs":
        return <IdentitySurveillance darkMode={darkMode} />;

      default:
        return <AdminOverview />;
    }
  };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-[#f8fafc] text-slate-900"
      }`}
    >
      {/* --- SIDEBAR --- */}
      <div
        className={`fixed inset-y-0 left-0 z-[800] w-72 transition-all duration-300 transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 ${darkMode ? "bg-black shadow-[10px_0_30px_rgba(0,0,0,0.5)]" : "bg-white shadow-xl"}`}
      >
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full lg:ml-72 relative">
        {/* HEADER */}


<header
  className={`fixed top-0 left-0 lg:left-72 right-0 h-16 flex items-center justify-between px-6 border-b z-[500] backdrop-blur-md transition-all 
  ${darkMode ? "bg-black/80 border-gray-800" : "bg-white/80 border-slate-200 shadow-sm"}`}
>
  <div className="flex items-center gap-4">
    {/* Mobile Menu Toggle */}
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="lg:hidden text-[#f99616] p-1 hover:scale-110 transition-transform"
    >
      <Menu size={26} />
    </button>

    {/* 🚀 ONLY LOGO SECTION */}
    <div className="relative group cursor-pointer">
      <img 
        src={logo} 
        alt="Binovera Admin" 
        className={`
          /* 📱 Mobile: Bada aur Bold */
          w-auto h-20 
          /* 💻 Desktop: Clean aur Wide */
          md:w-auto md:h-30 
          
          object-contain transition-all duration-500
          
          /* 🌓 Theme Logic */
          ${darkMode 
           ? "brightness-110 drop-shadow-[0_0_15px_rgba(249,150,22,0.5)]"
      : "invert opacity-90 contrast-125 drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"}
          /* ✨ Hover Animation */
          group-hover:scale-105 transition-transform
        `}
      />
    </div>
  </div>

  <div className="flex items-center gap-3">
    {/* Theme Toggle */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2.5 rounded-xl border transition-all active:scale-90 hover:rotate-12
        ${darkMode ? "bg-zinc-900 border-zinc-800 text-yellow-400" : "bg-slate-100 border-slate-200 text-slate-600"}`}
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>

    {/* Root Status Indicator */}
    <div
      className={`h-10 px-4 rounded-xl border flex items-center gap-3 transition-all ${
        darkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      <div className="w-2 h-2 bg-[#f99616] rounded-full animate-pulse shadow-[0_0_8px_#f99616]"></div>
      <span className="text-[9px] font-black uppercase tracking-[2px] hidden md:block">
        Live
      </span>
    </div>
  </div>
</header>
        {/* MAIN RENDER BOX */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 custom-main-scroll bg-transparent">
          <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-full animate-in fade-in zoom-in-95 duration-500">
            {renderComponent()}
          </div>
        </main>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[700] lg:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

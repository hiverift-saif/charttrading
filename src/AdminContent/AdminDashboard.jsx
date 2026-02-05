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
import AdminSecurity from "./AdminSecurity"; 
import IdentitySurveillance from "./IdentitySurveillance";
import RolePermissionManager from "./RolePermissionManager"; 
import AdminBalanceAdjust from "./AdminBalanceAdjust";
import NexusAnalytics from "./NexusAnalytics";

// --- ASSETS & ICONS ---
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import ReferralTree from "./ReferralTree";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  // 1. 📂 TAB PERSISTENCE & PERMISSION LOGIC
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("admin_active_tab") || "overview"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load Permissions array from login storage
  const adminPermissions = JSON.parse(localStorage.getItem("admin_permissions") || "[]");
  
  // Helper: Check if current admin has permission for a module slug
  const hasAccess = (slug) => adminPermissions.some(p => p.slug === slug);

  // 2. 🛡️ AUTH GUARD
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/adminlogin");
  }, [navigate]);

  // 3. 💾 LOCALSTORAGE SYNC
  useEffect(() => {
    localStorage.setItem("admin_active_tab", activeTab);
  }, [activeTab]);

  // --- 🌳 COMPONENT RENDERING ENGINE ---
  const renderComponent = () => {
    // A. User Fleet Tree Handling (Global, Pending, etc.)
    if (activeTab.startsWith("users_")) {
      const filter = activeTab.replace("users_", "");
      return <AdminUserManagement filterType={filter === "all" ? "" : filter} />;
    }

    // B. Switch for Specific Tabs (Full List preserved)
    switch (activeTab) {
      // 🛡️ SECURITY & ROLE MATRIX
      case "security_matrix":
        return <RolePermissionManager darkMode={darkMode} />;
      
      case "security_access_control":
        return <AdminSecurity darkMode={darkMode} />;
      
      case "user_block_control":
        return <UserBlockControl darkMode={darkMode} />;
      
      case "security_logs":
        return <IdentitySurveillance darkMode={darkMode} />;

      // 🏠 CORE
      case "overview":
        return <AdminOverview />;

      // 💰 FINANCE CONTROL
      case "finance_pending":
        return <AdminFinance />;
      case "finance_history":
        return <AdminFinanceHistory />;
      case "withdrawals":
        return <AdminWithdrawals />;
      case "finance_adjust":
        return <AdminBalanceAdjust darkMode={darkMode} />;

      // 📊 INTELLIGENCE HUB (NEXUS)
      case "reports_finance":
      case "reports_trade":
      case "reports_export":
        return <NexusAnalytics darkMode={darkMode} activeSubTab={activeTab} />;

      // 📈 TRADING ENGINE
      case "trading_assets":
      case "trading_payouts":
      case "trading_live":
        return <AdminTradingControl darkMode={darkMode} activeSubTab={activeTab} />;

        // 🌳 NEW: Referral Tree Case (Milestone 4)
    case "referrals_tree":
      return <ReferralTree darkMode={darkMode} />;
      // 🛠️ MANAGEMENT
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

      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-[#f8fafc] text-slate-900"}`}>
      
      {/* --- 📟 SIDEBAR CONTAINER --- */}
      <div className={`fixed inset-y-0 left-0 z-[800] w-72 transition-all duration-300 transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 ${darkMode ? "bg-black shadow-[20px_0_50px_rgba(0,0,0,0.8)]" : "bg-white shadow-xl border-r border-slate-200"}`}
      >
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      </div>

      {/* --- 🚀 MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-full lg:ml-72 relative">
        
{/* --- 💎 HEADER --- */}
<header className={`fixed top-0 left-0 lg:left-72 right-0 h-16 flex items-center justify-between px-6 border-b z-[500] backdrop-blur-md transition-all 
  ${darkMode ? "bg-black/80 border-gray-800" : "bg-white/80 border-slate-200 shadow-sm"}`}
>
  <div className="flex items-center gap-4">
    {/* Mobile Toggle */}
    <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#f99616] p-1 hover:scale-110 transition-transform">
      <Menu size={26} />
    </button>

    {/* Logo */}
    <div className="relative group cursor-pointer">
      <img 
        src={logo} 
        alt="Binovera Admin" 
        className={`h-10 w-auto md:h-20 md:w-auto object-contain transition-all duration-500
          ${darkMode ? "brightness-110 drop-shadow-[0_0_15px_rgba(249,150,22,0.5)]" : "invert opacity-90 contrast-125"}
          group-hover:scale-105`}
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

    {/* 🛡️ DYNAMIC ROLE INDICATOR */}
    <div className={`h-10 px-4 rounded-xl border flex items-center gap-3 transition-all 
      ${darkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-slate-200 shadow-sm"}`}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-2 h-2 bg-[#f99616] rounded-full animate-pulse shadow-[0_0_8px_#f99616]"></div>
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none mb-0.5">Authority</span>
         <span className="text-[10px] font-black uppercase text-[#f99616] italic tracking-tighter leading-none">
  {(() => {
    const role = localStorage.getItem("role")?.toLowerCase().trim();
    if (!role) return "Unknown";
    
    // Yahan check karo ki backend "admin" bhej raha hai ya "super admin"
    if (role === "admin") {
      return " Admin";
    }else if (role === "superadmin" ) {
      return "Super Admin";
    }
    
    // Baki sab ke liye wahi dikhao jo role hai (e.g. Manager, Support)
    return role.charAt(0).toUpperCase() + role.slice(1);
  })()}
</span>
        </div>
      </div>
    </div>
  </div>
</header>

        {/* --- 🖥️ MAIN VIEWPORT --- */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 custom-main-scroll bg-transparent">
          <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-full animate-in fade-in zoom-in-95 duration-500">
            {renderComponent()}
          </div>
        </main>

        {/* Mobile Overlay */}
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
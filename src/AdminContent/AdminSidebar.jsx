import React, { useState } from "react";
import {
  LayoutDashboard, Users, Wallet, ShieldCheck, History,
  LogOut, X, ChevronDown, Settings, Activity, MonitorDot, 
  FileText, ShieldAlert, Star, Lock, Zap, BarChart3,
  TrendingUp, BellRing, FileSpreadsheet, PlusCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  // --- States for Dropdown Menus ---
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(activeTab.startsWith("users_"));
  const [isFinanceOpen, setIsFinanceOpen] = useState(activeTab.includes("finance") || activeTab === "withdrawals" || activeTab === "finance_adjust");
  const [isTradingOpen, setIsTradingOpen] = useState(activeTab.includes("trading"));
  const [isReportsOpen, setIsReportsOpen] = useState(activeTab.includes("reports") && !activeTab.startsWith("reports_"));
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(activeTab.startsWith("reports_") || activeTab === "reports_export");
  
  const [isSecurityOpen, setIsSecurityOpen] = useState(
    activeTab.startsWith("security_") || activeTab === "user_block_control"
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f99616",
      cancelButtonColor: "#1a1a1a",
      confirmButtonText: "Yes, Logout",
      background: darkMode ? "#0d0d0d" : "#ffffff",
      color: darkMode ? "#ffffff" : "#000000",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_active_tab");
        sessionStorage.clear();
        navigate("/adminlogin");
      }
    });
  };

  return (
    <aside className={`h-full w-72 flex flex-col border-r transition-colors duration-300 ${darkMode ? "bg-black border-gray-900" : "bg-white border-slate-200 shadow-xl"}`}>
      
      {/* MOBILE CLOSE */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={() => setIsOpen(false)} className="p-2 text-[#f99616] rounded-full hover:bg-[#f99616]/10 transition">
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 pb-6 space-y-2 custom-sidebar-scroll pt-10 md:pt-15 lg:pt-20">
        
        {/* 🏠 OVERVIEW */}
        <SidebarLink id="overview" label="Overview" icon={<LayoutDashboard size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />

        {/* 🌳 USER FLEET */}
        <DropdownMenu isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} label="User Fleet" icon={<Users size={18} />} active={activeTab.startsWith("users_")} darkMode={darkMode}>
          <SidebarSubLink id="users_all" label="Global List" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          <SidebarSubLink id="users_active" label="Active Traders" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          <SidebarSubLink id="users_banned" label="Blocked Nodes" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        </DropdownMenu>

        {/* 🛡️ SECURITY CENTER */}
        <DropdownMenu isOpen={isSecurityOpen} setIsOpen={setIsSecurityOpen} label="Security Center" icon={<ShieldAlert size={18} className="text-red-500" />} active={activeTab.startsWith("security_") || activeTab === "user_block_control"} darkMode={darkMode}>
          <SidebarSubLink id="user_block_control" label="Basic Block Control" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          <SidebarSubLink id="security_access_control" label="Advanced Access Control" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          <SidebarSubLink id="security_logs" label="Identity Surveillance" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        </DropdownMenu>

        {/* 💰 FINANCE CONTROL (🚀 Updated with Adjuster) */}
        <DropdownMenu isOpen={isFinanceOpen} setIsOpen={setIsFinanceOpen} label="Finance Control" icon={<Wallet size={18} />} active={activeTab.includes("finance") || activeTab === "withdrawals"} darkMode={darkMode}>
          <SidebarSubLink id="finance_pending" label="Pending Deposits" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          <SidebarSubLink id="withdrawals" label="Withdrawal Queue" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          <SidebarSubLink id="finance_adjust" label="Balance Adjuster" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        </DropdownMenu>

        {/* 📈 TRADING ENGINE */}
        <DropdownMenu isOpen={isTradingOpen} setIsOpen={setIsTradingOpen} label="Trading Engine" icon={<Activity size={18} />} active={activeTab.includes("trading")} darkMode={darkMode}>
          <SidebarSubLink id="trading_assets" label="Asset Settings" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          <SidebarSubLink id="trading_live" label="Live Open Trades" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        </DropdownMenu>

 {/* 📊 INTELLIGENCE HUB */}
<DropdownMenu 
  isOpen={isIntelligenceOpen} 
  setIsOpen={setIsIntelligenceOpen} 
  label="Intelligence Hub" 
  icon={<BarChart3 size={18} />} 
  active={activeTab.startsWith("reports_")} 
  darkMode={darkMode}
>
  <SidebarSubLink id="reports_finance" label="Finance Reports" showMethod={true} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
  <SidebarSubLink id="reports_trade" label="Trade Reports" showMethod={true} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
  <SidebarSubLink id="reports_export" label="Report Export || Bulk" showMethod={true} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
</DropdownMenu>
        {/* 🌟 AFFILIATE GROWTH */}
        <div className="pt-4 pb-2 text-[9px] font-black uppercase text-gray-500 tracking-[3px] ml-4 italic">Growth Engine</div>
        <SidebarLink id="influencer_promo" label="Influencer Promo" icon={<Star size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />

        {/* 🛠️ MANAGEMENT */}
        <div className="pt-4 pb-2 text-[9px] font-black uppercase text-gray-500 tracking-[3px] ml-4 italic">Management</div>
        <SidebarLink id="kyc" label="KYC Verifier" icon={<ShieldCheck size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        <SidebarLink id="trades" label="Trade Logs" icon={<History size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        <SidebarLink id="support" label="Support Desk" icon={<MonitorDot size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />

        {/* ⚙️ SYSTEM */}
        <div className="pt-4 pb-2 text-[9px] font-black uppercase text-gray-500 tracking-[3px] ml-4 italic">Protocol System</div>
        <SidebarLink id="settings" label="Global Settings" icon={<Settings size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
      </nav>

      {/* 🚪 LOGOUT */}
      <div className="p-4 border-t border-gray-800">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">
          <LogOut size={18} /> Logout Terminal
        </button>
      </div>
    </aside>
  );
};

// --- HELPER COMPONENTS ---
const DropdownMenu = ({ isOpen, setIsOpen, label, icon, active, children, darkMode }) => (
  <div className="space-y-1">
    <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${active ? "bg-[#f99616]/10 text-[#f99616]" : darkMode ? "text-gray-400 hover:bg-gray-900/50" : "text-slate-500 hover:bg-slate-50"}`}>
      <div className="flex items-center gap-4">
        {icon} <span>{label}</span>
      </div>
      <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    {isOpen && <div className="ml-6 space-y-1 border-l pl-4 border-zinc-800/50 dark:border-zinc-800">{children}</div>}
  </div>
);

const SidebarLink = ({ id, label, icon, activeTab, setActiveTab, setIsOpen, darkMode }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); setIsOpen(false); }} className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${isActive ? "bg-[#f99616] text-white shadow-lg shadow-orange-500/10 scale-[1.02]" : darkMode ? "text-gray-400 hover:bg-gray-900/50" : "text-slate-500 hover:bg-slate-50"}`}>
      {icon} <span>{label}</span>
    </button>
  );
};

const SidebarSubLink = ({ id, label, activeTab, setActiveTab, setIsOpen, darkMode, showMethod = false }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); setIsOpen(false); }} className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${isActive ? "text-[#f99616] bg-[#f99616]/10" : darkMode ? "text-gray-500 hover:text-gray-300" : "text-slate-400 hover:text-slate-600"}`}>
    
      <span className="text-[10px] font-black uppercase tracking-widest truncate">{label}</span>
    </button>
  );
};

export default AdminSidebar;
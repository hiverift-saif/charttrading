import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard, Users, Wallet, ShieldCheck, History,
  LogOut, X, ChevronDown, Settings, Activity, MonitorDot,
  ShieldAlert, Star, Shield, BarChart3, Loader2,BellRing 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from "../config";

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛰️ Fetch Permissions from /admin/my-access [cite: 2026-02-02]
  useEffect(() => {
    const fetchMyPermissions = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) return navigate("/adminlogin");

      try {
        setLoading(true);
        const res = await axios.get(`${API_CONFIG.baseURL}/admin/my-access`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const permsData = res.data.result || [];
        setPermissions(permsData);

        const flatPerms = permsData.flatMap(m => m.permissions);
        localStorage.setItem("admin_permissions", JSON.stringify(flatPerms));
        console.log("Fetched Permissions:", permsData);
        
        // const isSuper = permsData.some(m => m.module === "AUTHORITY_MATRIX");
        // localStorage.setItem("role", isSuper ? "admin" : "guest");

      } catch (err) {
        console.error("Sidebar Access Error:", err);
        if (err.response?.status === 401) navigate("/adminlogin");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPermissions();
  }, [navigate]);

  // 🔥 NESTED CAN HELPER [cite: 2026-02-02]
  const can = (slug) => permissions.some(mod => mod.permissions.includes(slug));

  // --- 🛠️ DROPDOWN STATES ---
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(activeTab.startsWith("users_"));
  const [isFinanceOpen, setIsFinanceOpen] = useState(activeTab.includes("finance") || activeTab === "withdrawals");
  const [isTradingOpen, setIsTradingOpen] = useState(activeTab.includes("trading"));
  const [isIntelligenceOpen, setIsIntelligenceOpen] = useState(activeTab.startsWith("reports_"));
  
  const [isSecurityOpen, setIsSecurityOpen] = useState(
    activeTab === "security_access_control" || activeTab === "security_logs" || activeTab === "user_block_control"
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Terminate Session?",
      text: "Securely logging out of the admin terminal.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f99616",
      background: darkMode ? "#0d0d0d" : "#ffffff",
      color: darkMode ? "#ffffff" : "#0f172a",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/adminlogin");
      }
    });
  };

  return (
    <aside className={`h-full w-72 flex flex-col border-r transition-all duration-500 overflow-hidden ${darkMode ? "bg-black border-zinc-900 shadow-[20px_0_50px_rgba(0,0,0,0.8)]" : "bg-white border-slate-100 shadow-2xl shadow-slate-200/50"}`}>
      
      <div className="lg:hidden flex justify-end p-5">
        <button onClick={() => setIsOpen(false)} className="p-2 text-[#f99616] rounded-xl bg-[#f99616]/5 hover:bg-[#f99616]/10 transition-all">
          <X size={20} />
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 opacity-50">
          <Loader2 className="animate-spin text-[#f99616]" size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">Syncing Access...</span>
        </div>
      ) : (
        <nav className="flex-1 overflow-y-auto px-6 pb-8 space-y-1.5 custom-sidebar-scroll pt-5 md:pt-10 lg:pt-15">
  

          {can("VIEW_DASHBOARD") && (
            <SidebarLink className="md:pb-20" id="overview" label="DASHBOARD OVERVIEW" icon={<LayoutDashboard size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
          )}

          {can("VIEW_AUTHORITY_MATRIX") && (
            <>
              <SidebarLink id="security_matrix" label="PERMISSION AUTHORITY " icon={<Shield size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
              <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-6 opacity-30"></div>
              <div className="pb-3 px-2 text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] italic">Network Modules</div>
            </>
          )}

          {/* 🌳 USER FLEET */}
          {(can("VIEW_USERS") || can("MANAGE_USERS") || can("BLOCK_USERS")) && (
            <DropdownMenu isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} label="USER MANAGEMENT" icon={<Users size={18} />} active={activeTab.startsWith("users_")} darkMode={darkMode}>
              {can("VIEW_USERS") && <SidebarSubLink id="users_all" label="ALL User " activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("MANAGE_USERS") && <SidebarSubLink id="users_active" label="Active User " activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("BLOCK_USERS") && <SidebarSubLink id="users_banned" label="Restricted User" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
            </DropdownMenu>
          )}

          {/* 🛡️ SECURITY PROTOCOL */}
          {(can("VIEW_SECURITY") || can("MANAGE_SECURITY")) && (
            <DropdownMenu isOpen={isSecurityOpen} setIsOpen={setIsSecurityOpen} label="MANAGE SECURITY" icon={<ShieldAlert size={18} />} active={activeTab === "security_access_control" || activeTab === "security_logs" || activeTab === "user_block_control"} darkMode={darkMode}>
              {can("BLOCK_USERS") && <SidebarSubLink id="user_block_control" label="AUDIT LOGS" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("MANAGE_SECURITY") && <SidebarSubLink id="security_access_control" label="User Control" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("VIEW_SECURITY") && <SidebarSubLink id="security_logs" label="Identity Logs" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
            </DropdownMenu>
          )}

          {/* 💰 CAPITAL CONTROL */}
          {(can("VIEW_FINANCE") || can("APPROVE_DEPOSITS") || can("MANAGE_WITHDRAWALS") || can("ADJUST_BALANCE")) && (
            <DropdownMenu isOpen={isFinanceOpen} setIsOpen={setIsFinanceOpen} label="CAPITAL CONTROL" icon={<Wallet size={18} />} active={activeTab.includes("finance") || activeTab === "withdrawals"} darkMode={darkMode}>
              {can("APPROVE_DEPOSITS") && <SidebarSubLink id="finance_pending" label="APPROVE DEPOSITS" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("MANAGE_WITHDRAWALS") && <SidebarSubLink id="withdrawals" label="MANAGE WITHDRAWALS" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("ADJUST_BALANCE") && <SidebarSubLink id="finance_adjust" label="ADJUST BALANCE" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
            </DropdownMenu>
          )}

          {/* 📈 TRADING ENGINE */}
          {(can("VIEW_ASSETS") || can("MANAGE_TRADES")) && (
            <DropdownMenu isOpen={isTradingOpen} setIsOpen={setIsTradingOpen} label="TRADE ENGINE" icon={<Activity size={18} />} active={activeTab.includes("trading")} darkMode={darkMode}>
              {can("VIEW_ASSETS") && <SidebarSubLink id="trading_assets" label="Asset Registry" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("MANAGE_TRADES") && <SidebarSubLink id="trading_live" label="Real-time Trades" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
            </DropdownMenu>
          )}

          {/* 📊 INTELLIGENCE HUB */}
          {(can("VIEW_REPORTS_FINANCE") || can("VIEW_REPORTS_TRADE") || can("EXPORT_REPORTS")) && (
            <DropdownMenu isOpen={isIntelligenceOpen} setIsOpen={setIsIntelligenceOpen} label="INTELLIGENCE HUB" icon={<BarChart3 size={18} />} active={activeTab.startsWith("reports_")} darkMode={darkMode}>
              {can("VIEW_REPORTS_FINANCE") && <SidebarSubLink id="reports_finance" label="FINANCE REPORT" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("VIEW_REPORTS_TRADE") && <SidebarSubLink id="reports_trade" label="TRADE REPORT" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
              {can("EXPORT_REPORTS") && <SidebarSubLink id="reports_export" label="Data Synthesis" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
            </DropdownMenu>
          )}

          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-6 opacity-30"></div>
          <div className="pb-3 px-2 text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] italic">Operations</div>
{can("VIEW_REFERRALS") && (
  <SidebarLink 
    id="referrals_tree" 
    label="REFERRAL NETWORK" 
    icon={<Users size={18} />} 
    activeTab={activeTab} 
    setActiveTab={setActiveTab} 
    setIsOpen={setIsOpen} 
    darkMode={darkMode} 
  />
)}

{can("SEND_NOTIFICATIONS") && (
  <SidebarLink 
    id="reports_notifications" 
    label="BROADCAST CENTER" 
    icon={<BellRing size={18} />} 
    activeTab={activeTab} 
    setActiveTab={setActiveTab} 
    setIsOpen={setIsOpen} 
    darkMode={darkMode} 
  />
)}

          {can("VIEW_REFERRALS") && <SidebarLink id="influencer_promo" label="INFLUENCER PROMO" icon={<Star size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
          {can("VIEW_KYC") && <SidebarLink id="kyc" label="- KYC MANAGEMENT" icon={<ShieldCheck size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
          {can("MANAGE_TRADES") && <SidebarLink id="trades" label="- TRADE LEDGER" icon={<History size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
          {can("VIEW_SUPPORT") && <SidebarLink id="support" label="SUPPORT TICKETS" icon={<MonitorDot size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />}
          
          <SidebarLink id="settings" label="SYSTEM CONFIGURATION" icon={<Settings size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        </nav>
      )}

      <div className={`p-6 border-t ${darkMode ? "border-zinc-900 bg-zinc-950/30" : "border-slate-100 bg-slate-50/50"}`}>
        <button onClick={handleLogout} className="group w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300">
          <LogOut size={18} />
          <span>Exit Terminal</span>
        </button>
      </div>
    </aside>
  );
};

// --- Helper Components ---
const DropdownMenu = ({ isOpen, setIsOpen, label, icon, active, children, darkMode }) => (
  <div className="group/dropdown">
    <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-[12px] font-semibold transition-all duration-300 ${active ? "bg-[#f99616]/10 text-[#f99616] border border-[#f99616]/20 shadow-lg shadow-orange-500/5" : darkMode ? "text-zinc-400 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
      <div className="flex items-center gap-4">
        <span className={`${active ? "text-[#f99616]" : "text-zinc-500 group-hover/dropdown:text-zinc-300"}`}>{icon}</span>
        <span className="tracking-wide">{label}</span>
      </div>
      <ChevronDown size={14} className={`transition-transform duration-500 opacity-40 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
      <div className={`ml-8 space-y-1.5 border-l-2 pl-5 ${darkMode ? "border-zinc-800" : "border-slate-100"}`}>{children}</div>
    </div>
  </div>
);

const SidebarLink = ({ id, label, icon, activeTab, setActiveTab, setIsOpen, darkMode }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); setIsOpen(false); }} className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[12px] font-semibold transition-all duration-300 ${isActive ? "bg-[#f99616] text-white shadow-xl shadow-orange-500/20" : darkMode ? "text-zinc-400 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
      <span className={`${isActive ? "text-white" : "text-zinc-500"}`}>{icon}</span>
      <span className="tracking-wide">{label}</span>
    </button>
  );
};

const SidebarSubLink = ({ id, label, activeTab, setActiveTab, setIsOpen, darkMode }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); setIsOpen(false); }} className={`w-full flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 ${isActive ? "text-[#f99616] bg-[#f99616]/5 font-bold" : darkMode ? "text-zinc-500 hover:text-zinc-200" : "text-slate-400 hover:text-slate-700"}`}>
      <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isActive ? "bg-[#f99616] scale-125 shadow-[0_0_8px_#f99616]" : "bg-zinc-700"}`}></div>
      <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{label}</span>
    </button>
  );
};

export default AdminSidebar;
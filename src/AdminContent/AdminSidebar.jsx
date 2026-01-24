import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Wallet, ShieldCheck, History, 
  LogOut, X, Ticket, ArrowUpRight, ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(activeTab.startsWith("users_"));
  const [isFinanceOpen, setIsFinanceOpen] = useState(activeTab.includes("finance"));

  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f99616',
      cancelButtonColor: '#1a1a1a',
      confirmButtonText: 'Yes, Logout',
      background: darkMode ? '#0d0d0d' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_active_tab");
        sessionStorage.clear();
        navigate('/adminlogin');
      }
    });
  };

  return (
    <aside className={`h-full w-72 flex flex-col border-r transition-colors duration-300 ${darkMode ? 'bg-black border-gray-900' : 'bg-white border-slate-200 shadow-xl'}`}>
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={() => setIsOpen(false)} className="p-2 text-[#f99616] rounded-full hover:bg-[#f99616]/10 transition"><X size={22} /></button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 pb-6 space-y-4 custom-sidebar-scroll md:pt-15 lg:pt-20">
        <SidebarLink id="overview" label="Overview" icon={<LayoutDashboard size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />

        {/* 🌳 USER NAVIGATION TREE */}
        <div className="space-y-1">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all
            ${activeTab.startsWith('users_') ? 'bg-[#f99616]/10 text-[#f99616]' : darkMode ? 'text-gray-400 hover:bg-gray-900/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-4">
              <Users size={18} />
              <span>User Fleet</span>
            </div>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isUserMenuOpen && (
  <div className="ml-6 space-y-1 border-l pl-4 border-zinc-800">
    <SidebarSubLink id="users_all" label="Global List" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
    <SidebarSubLink id="users_kyc_pending" label="Pending KYC" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
    <SidebarSubLink id="users_kyc_unverified" label="Unverified KYC" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
    <SidebarSubLink id="users_active" label="Active Traders" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
    <SidebarSubLink id="users_banned" label="Blocked Nodes" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
    <SidebarSubLink id="users_email_unverified" label="Email Unverified" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
  </div>
)}

        </div>

        {/* 💰 FINANCE DROPDOWN */}
        <div className="space-y-1">
          <button
            onClick={() => setIsFinanceOpen(!isFinanceOpen)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all
            ${activeTab.includes('finance') ? 'bg-[#f99616]/10 text-[#f99616]' : darkMode ? 'text-gray-400 hover:bg-gray-900/50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-4">
              <Wallet size={18} />
              <span>Finance Control</span>
            </div>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isFinanceOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFinanceOpen && (
            <div className="ml-6 space-y-1 border-l pl-4 border-zinc-800">
              <SidebarSubLink id="finance_pending" label="Pending Deposits" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
              <SidebarSubLink id="finance_history" label="Finance History" activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
            </div>
          )}
        </div>

        <SidebarLink id="withdrawals" label="Withdrawal Queue" icon={<ArrowUpRight size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        <SidebarLink id="kyc" label="KYC Management" icon={<ShieldCheck size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        <SidebarLink id="trades" label="Trade History" icon={<History size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        <SidebarLink id="influencer_promo" label="Promo Assets" icon={<Ticket size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
        <SidebarLink id="support" label="Support Desk" icon={<Ticket size={18} />} activeTab={activeTab} setActiveTab={setActiveTab} setIsOpen={setIsOpen} darkMode={darkMode} />
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ id, label, icon, activeTab, setActiveTab, setIsOpen, darkMode }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); setIsOpen(false); }} className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${isActive ? 'bg-[#f99616] text-white shadow-lg' : darkMode ? 'text-gray-400 hover:bg-gray-900/50' : 'text-slate-500 hover:bg-slate-50'}`}>
      {icon} <span>{label}</span>
    </button>
  );
};

const SidebarSubLink = ({ id, label, activeTab, setActiveTab, setIsOpen, darkMode }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); setIsOpen(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${isActive ? 'text-[#f99616] bg-[#f99616]/10' : darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-slate-400 hover:text-slate-600'}`}>
      {label}
    </button>
  );
};

export default AdminSidebar;
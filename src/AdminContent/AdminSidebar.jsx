import React, { useState } from 'react';
import { 
  LayoutDashboard,
  Users,
  Wallet,
  ShieldCheck,
  History,
  LogOut,
  X,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [isFinanceOpen, setIsFinanceOpen] = useState(
    activeTab.includes("finance")
  );

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
        navigate('/adminlogin');
      }
    });
  };

  return (
    <aside
      className={`h-full w-72 flex flex-col border-r transition-colors duration-300
      ${darkMode ? 'bg-black border-gray-900' : 'bg-white border-slate-200 shadow-xl'}`}
    >
      {/* MOBILE CLOSE BUTTON */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 text-[#f99616] rounded-full hover:bg-[#f99616]/10 transition"
        >
          <X size={22} />
        </button>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="flex-1 overflow-y-auto px-5 pb-6 space-y-6 custom-sidebar-scroll md:pt-15 lg:pt-20">

        {/* OVERVIEW */}
        <SidebarLink
          id="overview"
          label="Overview"
          icon={<LayoutDashboard size={18} />}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsOpen={setIsOpen}
          darkMode={darkMode}
        />

        {/* USERS */}
        <SidebarLink
          id="users"
          label="User Management"
          icon={<Users size={18} />}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsOpen={setIsOpen}
          darkMode={darkMode}
        />

        {/* FINANCE DROPDOWN */}
        <div className="space-y-2">
          <button
            onClick={() => setIsFinanceOpen(!isFinanceOpen)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all
            ${
              activeTab.includes('finance')
                ? 'bg-[#f99616]/10 text-[#f99616]'
                : darkMode
                  ? 'text-gray-400 hover:bg-gray-900/50'
                  : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <Wallet size={18} />
              <span>Finance Control</span>
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isFinanceOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isFinanceOpen && (
            <div className="ml-6 space-y-2 border-l pl-4">
              <SidebarSubLink
                id="finance_pending"
                label="Pending Deposits"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsOpen={setIsOpen}
                darkMode={darkMode}
              />
              <SidebarSubLink
                id="finance_history"
                label="Finance History"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsOpen={setIsOpen}
                darkMode={darkMode}
              />
            </div>
          )}
        </div>

        {/* WITHDRAWALS */}
        <SidebarLink
          id="withdrawals"
          label="Withdrawal Queue"
          icon={<ArrowUpRight size={18} />}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsOpen={setIsOpen}
          darkMode={darkMode}
        />

        {/* KYC */}
        <SidebarLink
          id="kyc"
          label="KYC Management"
          icon={<ShieldCheck size={18} />}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsOpen={setIsOpen}
          darkMode={darkMode}
        />

        {/* TRADES */}
        <SidebarLink
          id="trades"
          label="Trade History"
          icon={<History size={18} />}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsOpen={setIsOpen}
          darkMode={darkMode}
        />
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb {
          background: #f9961633;
          border-radius: 10px;
        }
      `}} />
    </aside>
  );
};

const SidebarLink = ({
  id,
  label,
  icon,
  activeTab,
  setActiveTab,
  setIsOpen,
  darkMode
}) => {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsOpen(false);
      }}
      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all
      ${
        isActive
          ? 'bg-[#f99616] text-white shadow-lg shadow-[#f99616]/20'
          : darkMode
            ? 'text-gray-400 hover:bg-gray-900/50'
            : 'text-slate-500 hover:bg-slate-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const SidebarSubLink = ({
  id,
  label,
  activeTab,
  setActiveTab,
  setIsOpen,
  darkMode
}) => {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsOpen(false);
      }}
      className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition
      ${
        isActive
          ? 'text-[#f99616] bg-[#f99616]/10'
          : darkMode
            ? 'text-gray-500 hover:text-gray-300'
            : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      {label}
    </button>
  );
};

export default AdminSidebar;

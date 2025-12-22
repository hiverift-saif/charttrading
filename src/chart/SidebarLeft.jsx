import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Wallet, User, BarChart2, Headphones, 
  Settings, LogOut, Monitor, Send, ChevronLeft, CreditCard, 
  History, Gift, HelpCircle, MessageSquare, FileText
} from 'lucide-react';

const SidebarLeft = () => {
  // State to track konsa menu open hai (e.g., 'trading', 'finance')
  const [activeMenu, setActiveMenu] = useState(null);

  // Toggle function: Agar same click kiya to band karo, naya kiya to kholo
  const handleMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null); // Close if already open
    } else {
      setActiveMenu(menuName); // Open new
    }
  };

  return (
    <div className="flex h-full z-50">
      
      {/* ==================== 1. MAIN ICON BAR (Always Visible) ==================== */}
      <aside className="w-20 flex flex-col items-center py-6 border-r border-gray-800 bg-[#161413] z-50">
        
        {/* User / Profile Icon (Top) */}
        <div className="mb-8">
           <button onClick={() => handleMenuClick('profile')} className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-transparent hover:border-green-500 transition overflow-hidden">
              <User size={20} className="text-white"/>
           </button>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col gap-4 w-full px-2">
          <MainIcon 
            icon={<LayoutDashboard size={24} />} 
            label="Trading" 
            isActive={activeMenu === 'trading'} 
            onClick={() => handleMenuClick('trading')} 
          />
          <MainIcon 
            icon={<Wallet size={24} />} 
            label="Finance" 
            isActive={activeMenu === 'finance'} 
            onClick={() => handleMenuClick('finance')} 
          />
          <MainIcon 
            icon={<User size={24} />} 
            label="Profile" 
            isActive={activeMenu === 'profile'} 
            onClick={() => handleMenuClick('profile')} 
          />
          <MainIcon 
            icon={<BarChart2 size={24} />} 
            label="Analytics" 
            to="/analytics" // Direct Link (No Submenu)
          />
          <MainIcon 
            icon={<BarChart2 size={24} className="rotate-90"/>} 
            label="Market" 
            isActive={activeMenu === 'market'} 
            onClick={() => handleMenuClick('market')} 
          />
          <MainIcon 
            icon={<Headphones size={24} />} 
            label="Support" 
            isActive={activeMenu === 'support'} 
            onClick={() => handleMenuClick('support')} 
          />
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col gap-4 w-full px-2">
          <MainIcon icon={<Settings size={22} />} label="Settings" to="/setting" />
          <div className="w-full border-t border-gray-800 my-1"></div>
          <MainIcon icon={<LogOut size={22} className="text-red-500" />} label="Logout" />
        </div>
      </aside>


      {/* ==================== 2. SUB-MENU DRAWER (Sliding Panel) ==================== */}
      {/* Ye div tabhi dikhega jab activeMenu null nahi hoga */}
      {activeMenu && (
        <div className="w-64 bg-[#1b1817] border-r border-gray-800 flex flex-col h-full animate-slide-in">
          
          {/* Drawer Header (Back Button) */}
          <div className="h-16 flex items-center px-4 border-b border-gray-800">
            <button 
              onClick={() => setActiveMenu(null)} 
              className="flex items-center text-gray-400 hover:text-white transition gap-2 text-sm font-bold uppercase tracking-wider"
            >
              <ChevronLeft size={16} /> Back
            </button>
          </div>

          {/* Drawer Content Area */}
          <div className="p-4 overflow-y-auto flex-1">
            
            {/* --- TRADING SUBMENU --- */}
            {activeMenu === 'trading' && (
              <div className="flex flex-col gap-2">
                <SubMenuItem icon={<LayoutDashboard size={18}/>} title="Real Account" desc="Live trading" active />
                <SubMenuItem icon={<Monitor size={18}/>} title="Demo Account" desc="Practice trading" />
              </div>
            )}

            {/* --- FINANCE SUBMENU --- */}
            {activeMenu === 'finance' && (
              <div className="flex flex-col gap-2">
                <SubMenuItem icon={<CreditCard size={18}/>} title="Deposit" desc="Add funds" />
                <SubMenuItem icon={<Wallet size={18}/>} title="Withdrawal" desc="Get your earnings" />
                <SubMenuItem icon={<Gift size={18}/>} title="Bonus Codes" desc="Apply promo" />
                <SubMenuItem icon={<History size={18}/>} title="Transactions" desc="View history" />
              </div>
            )}

            {/* --- PROFILE SUBMENU --- */}
            {activeMenu === 'profile' && (
              <div className="flex flex-col gap-4">
                {/* User Info Card */}
                <div className="bg-[#2a2e39] p-4 rounded-lg text-center mb-2">
                   <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                     <User size={32} className="text-gray-300"/>
                   </div>
                   <h3 className="text-white font-bold">User 50032</h3>
                   <p className="text-xs text-gray-400">ID: 50032</p>
                   <p className="text-green-500 font-bold mt-2">$0.00</p>
                   <button className="mt-3 w-full bg-green-600 hover:bg-green-500 text-white text-xs py-2 rounded font-bold">Deposit</button>
                </div>
                <SubMenuItem icon={<User size={18}/>} title="Personal Data" />
                <SubMenuItem icon={<BarChart2 size={18}/>} title="Trading History" />
              </div>
            )}

             {/* --- SUPPORT SUBMENU --- */}
             {activeMenu === 'support' && (
              <div className="flex flex-col gap-2">
                <SubMenuItem icon={<MessageSquare size={18}/>} title="My Requests" />
                <SubMenuItem icon={<FileText size={18}/>} title="Create Request" />
                <SubMenuItem icon={<HelpCircle size={18}/>} title="FAQ" />
                <div className="mt-4 p-4 bg-[#2a2e39] rounded text-xs text-gray-400 text-center">
                   Need help? <br/> <a href="https://t.me/EquilixOfficial" target="_blank" className="text-blue-400 hover:underline">Contact Telegram</a>
                </div>
              </div>
            )}

            {/* --- MARKET SUBMENU (Empty as per HTML) --- */}
            {activeMenu === 'market' && (
              <div className="text-center text-gray-500 mt-10">
                Currently not available
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENT 1: Main Icons (Left Strip) ---
const MainIcon = ({ icon, label, isActive, onClick, to }) => {
  const content = (
    <div 
      onClick={onClick}
      className={`relative group flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 
      ${isActive ? 'bg-[#2a2e39] text-white' : 'text-gray-500 hover:text-white hover:bg-[#1f1d1c]'}`}
    >
      {icon}
      <span className="text-[10px] mt-1 font-medium hidden md:block">{label}</span>
      
      {/* Tooltip for desktop if collapsed (optional) */}
      {isActive && <div className="absolute right-0 top-2 bottom-2 w-1 bg-green-500 rounded-l"></div>}
    </div>
  );

  return to ? <Link to={to} className="w-full">{content}</Link> : content;
};

// --- HELPER COMPONENT 2: Sub Menu Items (Drawer List) ---
const SubMenuItem = ({ icon, title, desc, active }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border border-transparent
    ${active ? 'bg-[#2a2e39] border-gray-700 text-white' : 'text-gray-400 hover:bg-[#22252e] hover:text-white'}`}>
    <div className={`${active ? 'text-green-500' : 'text-gray-500'}`}>{icon}</div>
    <div className="flex flex-col">
      <span className="font-bold text-sm">{title}</span>
      {desc && <span className="text-[10px] text-gray-500">{desc}</span>}
    </div>
  </div>
);

export default SidebarLeft;
import React, { useState } from 'react';
import { 
  LayoutDashboard, Wallet, User, BarChart2, Headphones, 
  ChevronLeft, CreditCard, History, Gift, Trophy, Monitor, X,
  MessageSquare, FileText, HelpCircle
} from 'lucide-react';

// <--- MODIFIED: Added 'onTournamentClick' in props
const SidebarLeft = ({ setActiveTab, activeTab, onTournamentClick }) => {
  // States for Sidebar and Tabs
  const [activeMenu, setActiveMenu] = useState(null);
  const [tournamentTab, setTournamentTab] = useState('all'); // 'all' or 'stats'

  // Functions to handle clicks
  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleSubItemClick = (tabName) => {
    setActiveTab(tabName);
    setActiveMenu(null); // Drawer close on selection
  };

  const handleLogout = () => {
  localStorage.removeItem("token");   // token delete
  sessionStorage.clear();             // session delete (optional)
  window.location.href = "/login";    // login page redirect (change if route different)
};


  return (
    <div className="flex h-full z-50">
      
      {/* ==================== 1. MAIN ICON BAR (Fixed Left) ==================== */}
      <aside className="w-20 flex flex-col items-center py-6 border-r border-gray-800 bg-[#161413] z-50">
        
        {/* Profile Avatar Icon */}
        <div className="mb-8">
           <button 
             onClick={() => handleMenuClick('profile')} 
             className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 transition overflow-hidden ${activeMenu === 'profile' ? 'border-green-500' : 'border-transparent'}`}
           >
              <User size={20} className="text-white"/>
           </button>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col gap-4 w-full px-2">
          <MainIcon 
            icon={<LayoutDashboard size={24} />} 
            label="Trading" 
            isActive={activeMenu === 'trading' || activeTab === 'chart'} 
            onClick={() => handleMenuClick('trading')} 
          />
          <MainIcon 
            icon={<Wallet size={24} />} 
            label="Finance" 
            isActive={activeMenu === 'finance' || ['deposit', 'withdraw', 'history', 'bonus'].includes(activeTab)} 
            onClick={() => handleMenuClick('finance')} 
          />
          <MainIcon 
            icon={<Trophy size={24} />} 
            label="Tournaments" 
            isActive={activeMenu === 'tournament'} 
            onClick={() => handleMenuClick('tournament')} 
          />
   <MainIcon 
  icon={<Headphones size={24} />} 
  label="Support" 
  isActive={activeMenu === 'support' || activeTab === 'support'} 
  onClick={() => handleMenuClick('support')} 
/>
        </nav>
      </aside>

      {/* ==================== 2. SUB-MENU DRAWER (Sliding Part) ==================== */}
      {activeMenu && (
        <div className="w-80 bg-[#1b1817] border-r border-gray-800 flex flex-col h-full animate-in slide-in-from-left duration-200">
          
          {/* --- A. TOURNAMENT DRAWER --- */}
          {activeMenu === 'tournament' && (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#1b1817]">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy size={18} className="text-yellow-500"/> Tournaments
                </h2>
                <button onClick={() => setActiveMenu(null)} className="text-gray-500 hover:text-white"><X size={20}/></button>
              </div>

              <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-[11px] text-red-400 font-medium text-center">
                This section is only available for real accounts.
              </div>

              <div className="flex px-4 mt-4 gap-6 border-b border-gray-800">
                <button onClick={() => setTournamentTab('all')} className={`pb-2 text-xs font-bold transition-all ${tournamentTab === 'all' ? 'text-white border-b-2 border-green-500' : 'text-gray-500'}`}>All Tournaments</button>
                <button onClick={() => setTournamentTab('stats')} className={`pb-2 text-xs font-bold transition-all ${tournamentTab === 'stats' ? 'text-white border-b-2 border-green-500' : 'text-gray-500'}`}>Statistics</button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                {tournamentTab === 'all' ? (
                  <div className="space-y-4">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Active Tournaments</div>
                    
                    {/* <--- MODIFIED: Wrapped in div with onClick for modal trigger */}
                    <div 
                      onClick={() => onTournamentClick({ name: "Rumble", prize: "₹250,000", fee: "₹2,500", endsIn: "23h 49m 50s" })} 
                      className="cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      <TournamentCard name="Rumble" prize="₹250,000" fee="₹2,500" endsIn="4d 21h" image="https://img.icons8.com/color/96/trophy.png" />
                    </div>

                    <div 
                      onClick={() => onTournamentClick({ name: "Day off", prize: "₹25,000", fee: "Free", endsIn: "7h 49m 36s" })} 
                      className="cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      <TournamentCard name="Day off" prize="₹25,000" fee="Free" endsIn="5h 33m" image="https://img.icons8.com/color/96/medal.png" />
                    </div>
                    {/* --- END MODIFICATION --- */}

                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-[#242120] rounded-xl border border-gray-800 overflow-hidden">
                      <table className="w-full text-xs">
                        <tbody className="divide-y divide-gray-800">
                          <tr><td className="p-4 text-gray-400 text-xs">Tournaments won:</td><td className="p-4 text-white font-bold text-right text-xs">0</td></tr>
                          <tr><td className="p-4 text-gray-400 text-xs">Total prize money:</td><td className="p-4 text-white font-bold text-right text-xs">₹0</td></tr>
                          <tr><td className="p-4 text-gray-400 text-xs">Largest prize:</td><td className="p-4 text-white font-bold text-right text-xs">₹0</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex flex-col items-center justify-center py-10 opacity-50 text-center">
                        <History size={40} className="text-gray-700 mb-2" />
                        <div className="text-white text-sm font-bold">No tournaments found</div>
                        <p className="text-[10px] text-gray-500 px-10">Participate in a tournament to see stats.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- B. FINANCE DRAWER --- */}
          {activeMenu === 'finance' && (
            <div className="flex flex-col h-full">
               <div className="h-16 flex items-center px-4 border-b border-gray-800">
                  <button onClick={() => setActiveMenu(null)} className="flex items-center text-gray-400 hover:text-white transition gap-2 text-xs font-bold uppercase tracking-wider"><ChevronLeft size={16} /> Back</button>
               </div>
               <div className="p-4 flex flex-col gap-2">
                 <div onClick={() => handleSubItemClick('deposit')}><SubMenuItem icon={<CreditCard size={18}/>} title="Deposit" active={activeTab === 'deposit'} /></div>
                 <div onClick={() => handleSubItemClick('withdraw')}><SubMenuItem icon={<Wallet size={18}/>} title="Withdrawal" active={activeTab === 'withdraw'} /></div>
                 <div onClick={() => handleSubItemClick('bonus')}><SubMenuItem icon={<Gift size={18}/>} title="Bonus Codes" active={activeTab === 'bonus'} /></div>
                 <div onClick={() => handleSubItemClick('history')}><SubMenuItem icon={<History size={18}/>} title="Transactions" active={activeTab === 'history'} /></div>
               </div>
            </div>
          )}

          {/* --- C. TRADING DRAWER --- */}
          {activeMenu === 'trading' && (
            <div className="flex flex-col h-full">
               <div className="h-16 flex items-center px-4 border-b border-gray-800">
                  <button onClick={() => setActiveMenu(null)} className="flex items-center text-gray-400 hover:text-white transition gap-2 text-xs font-bold uppercase tracking-wider"><ChevronLeft size={16} /> Back</button>
               </div>
               <div className="p-4 flex flex-col gap-2">
                 <div onClick={() => handleSubItemClick('chart')}><SubMenuItem icon={<LayoutDashboard size={18}/>} title="Real Account" active={activeTab === 'chart'} /></div>
                 <SubMenuItem icon={<Monitor size={18}/>} title="Demo Account" />
               </div>
            </div>
          )}

{/* --- D. PROFILE DRAWER --- */}
{activeMenu === 'profile' && (
  <div className="flex flex-col h-full p-4">
    <div className="bg-[#2a2e39] p-6 rounded-lg text-center mb-6">
      <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
        <User size={32} className="text-gray-300"/>
      </div>
      <h3 className="text-white font-bold">User 50032</h3>
      <p className="text-green-500 font-bold">$0.00</p>
      <button onClick={() => handleSubItemClick('deposit')} className="mt-4 w-full bg-green-600 text-white text-xs py-2 rounded font-bold">Deposit</button>
    </div>

    <div onClick={() => handleSubItemClick('profile')}>
      <SubMenuItem icon={<User size={18}/>} title="Personal Data" active={activeTab === 'profile'} />
    </div>

    <SubMenuItem icon={<BarChart2 size={18}/>} title="Trading History" />

    <button
      onClick={handleLogout}
      className="mt-6 bg-red-600 text-white text-sm py-2 rounded-lg font-bold hover:bg-red-700 transition"
    >
      Logout
    </button>
  </div>
)}

        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS (No changes below) ---

const MainIcon = ({ icon, label, isActive, onClick }) => (
    <div onClick={onClick} className={`relative group flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-[#2a2e39] text-white' : 'text-gray-500 hover:text-white hover:bg-[#1f1d1c]'}`}>
      {icon}
      <span className="text-[10px] mt-1 font-medium hidden md:block">{label}</span>
      {isActive && <div className="absolute right-0 top-2 bottom-2 w-1 bg-green-500 rounded-l"></div>}
    </div>
);

const SubMenuItem = ({ icon, title, active }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border border-transparent ${active ? 'bg-[#2a2e39] border-gray-700 text-white shadow-lg' : 'text-gray-400 hover:bg-[#22252e] hover:text-white'}`}>
    <div className={`${active ? 'text-green-500' : 'text-gray-500'}`}>{icon}</div>
    <span className="font-bold text-sm">{title}</span>
  </div>
);

const TournamentCard = ({ name, prize, fee, endsIn, image }) => (
  <div className="bg-[#242120] rounded-xl border border-gray-800 p-4 relative overflow-hidden group">
    <div className="relative z-10 space-y-2">
      <h3 className="text-white font-black italic">{name.toUpperCase()}</h3>
      <div className="text-[10px] text-gray-400">Prize fund: <span className="text-white font-bold">{prize}</span></div>
      <div className="text-[10px] text-gray-400">Fee: <span className="text-white font-bold">{fee}</span></div>
      <div className="flex justify-between items-center pt-2 border-t border-gray-800 mt-2">
        <span className="text-[10px] text-green-500 font-mono font-bold">{endsIn}</span>
        <button className="bg-green-600 px-4 py-1 rounded text-[10px] font-bold text-white uppercase">Join</button>
      </div>
    </div>
    <img src={image} className="absolute right-[-10px] top-2 w-16 opacity-20 rotate-12 group-hover:scale-110 transition-all" alt="" />
  </div>
);

export default SidebarLeft;
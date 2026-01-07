import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountType } from '../redux/tradingSlice';
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import
import { 
  LayoutDashboard, Wallet, User, BarChart2, Headphones, 
  ChevronLeft, CreditCard, History, Gift, Trophy, Monitor, X,
  MessageSquare, FileText, HelpCircle, LifeBuoy
} from 'lucide-react';

const SidebarLeft = ({ setActiveTab, activeTab, onTournamentClick }) => {
  const dispatch = useDispatch();
  const { darkMode } = useTheme(); // 🚀 Theme state access
  const { accountType, balance } = useSelector((state) => state.trading);

  const [activeMenu, setActiveMenu] = useState(null);
  const [tournamentTab, setTournamentTab] = useState('all');

  const handleBackAction = () => {
    setActiveMenu(null); 
    setActiveTab('chart'); 
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleSubItemClick = (tabName) => {
    setActiveTab(tabName);
    setActiveMenu(null); 
  };

  const handleDemoSwitch = () => {
    dispatch(setAccountType('demo'));
    handleSubItemClick('chart');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");   
    sessionStorage.clear();             
    window.location.href = "/login";    
  };

  return (
    <div className={`flex h-full z-[60] transition-colors duration-500 ${darkMode ? "bg-black" : "bg-white"}`}>
      
      {/* ==================== 1. MAIN ICON BAR ==================== */}
      <aside className={`w-20 flex flex-col items-center py-6 border-r z-50 transition-colors
        ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-200"}`}>
        
        <div className="mb-8 relative z-[60]">
           <button 
             onClick={() => handleMenuClick('profile')} 
             className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all relative overflow-hidden 
               ${activeMenu === 'profile' ? 'border-[#f99616]' : (darkMode ? 'border-transparent bg-gray-800' : 'border-gray-200 bg-white shadow-sm')}`}
           >
              <User size={20} className={darkMode ? "text-white" : "text-gray-600"}/>
           </button>
        </div>

        <nav className="flex flex-col gap-4 w-full px-2">
          <MainIcon 
            icon={<LayoutDashboard size={24} />} 
            label="Trading" 
            isActive={activeMenu === 'trading' || activeTab === 'chart'} 
            onClick={() => handleMenuClick('trading')} 
            darkMode={darkMode}
          />
          <MainIcon 
            icon={<Wallet size={24} />} 
            label="Finance" 
            isActive={activeMenu === 'finance' || ['deposit', 'withdraw', 'history', 'bonus'].includes(activeTab)} 
            onClick={() => handleMenuClick('finance')} 
            darkMode={darkMode}
          />
          <MainIcon 
            icon={<Trophy size={24} />} 
            label="Tournaments" 
            isActive={activeMenu === 'tournament'} 
            onClick={() => handleMenuClick('tournament')} 
            darkMode={darkMode}
          />
          <MainIcon 
            icon={<Headphones size={24} />} 
            label="Support" 
            isActive={activeMenu === 'support' || activeTab === 'support'} 
            onClick={() => handleMenuClick('support')} 
            darkMode={darkMode}
          />
        </nav>
      </aside>

      {/* ==================== 2. SUB-MENU DRAWER ==================== */}
      {activeMenu && (
        <div className={`w-80 border-r flex flex-col h-full animate-in slide-in-from-left duration-200 shadow-2xl transition-colors
          ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
          
          <div className={`h-16 flex items-center px-4 border-b relative z-[70] transition-colors
            ${darkMode ? "border-gray-800 bg-black" : "border-gray-100 bg-white"}`}>
             <button 
                onClick={handleBackAction} 
                className={`flex items-center transition gap-2 text-xs font-bold uppercase tracking-widest group
                  ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                <span>Back to Chart</span>
              </button>
          </div>

          {/* A. TOURNAMENTS */}
          {activeMenu === 'tournament' && (
            <div className="flex flex-col h-full">
              <div className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-500 font-bold uppercase text-center">Real accounts only</div>
              <div className={`flex px-4 mt-4 gap-6 border-b transition-colors ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                <button onClick={() => setTournamentTab('all')} className={`pb-2 text-[10px] font-black uppercase ${tournamentTab === 'all' ? (darkMode ? 'text-white border-[#f99616]' : 'text-black border-black') + ' border-b-2' : 'text-gray-500'}`}>All</button>
                <button onClick={() => setTournamentTab('stats')} className={`pb-2 text-[10px] font-black uppercase ${tournamentTab === 'stats' ? (darkMode ? 'text-white border-[#f99616]' : 'text-black border-black') + ' border-b-2' : 'text-gray-500'}`}>Stats</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {tournamentTab === 'all' ? (
                  <>
                    <TournamentCard name="Rumble" prize="₹250,000" endsIn="4d 21h" image="https://img.icons8.com/color/96/trophy.png" darkMode={darkMode} />
                    <TournamentCard name="Day off" prize="₹25,000" endsIn="5h 33m" image="https://img.icons8.com/color/96/medal.png" darkMode={darkMode} />
                  </>
                ) : (
                  <div className="text-center py-10 opacity-20"><History size={40} className={`mx-auto ${darkMode ? 'text-white' : 'text-black'}`} /><p className={`text-[10px] font-black uppercase mt-2 ${darkMode ? 'text-white' : 'text-black'}`}>No Stats</p></div>
                )}
              </div>
            </div>
          )}

          {/* B. FINANCE */}
          {activeMenu === 'finance' && (
            <div className="p-4 flex flex-col gap-2">
              <div onClick={() => handleSubItemClick('deposit')}><SubMenuItem icon={<CreditCard size={18}/>} title="Deposit" active={activeTab === 'deposit'} darkMode={darkMode} /></div>
              <div onClick={() => handleSubItemClick('withdraw')}><SubMenuItem icon={<Wallet size={18}/>} title="Withdrawal" active={activeTab === 'withdraw'} darkMode={darkMode} /></div>
              <div onClick={() => handleSubItemClick('bonus')}><SubMenuItem icon={<Gift size={18}/>} title="Bonus Codes" active={activeTab === 'bonus'} darkMode={darkMode} /></div>
              <div onClick={() => handleSubItemClick('history')}><SubMenuItem icon={<History size={18}/>} title="Transactions" active={activeTab === 'history'} darkMode={darkMode} /></div>
            </div>
          )}

          {/* C. TRADING */}
          {activeMenu === 'trading' && (
            <div className="p-4 flex flex-col gap-2">
              <div onClick={() => { dispatch(setAccountType('real')); handleSubItemClick('chart'); }}>
                <SubMenuItem icon={<LayoutDashboard size={18}/>} title="Real Account" active={activeTab === 'chart' && accountType === 'real'} darkMode={darkMode} />
              </div>
              <div onClick={handleDemoSwitch}>
                <SubMenuItem icon={<Monitor size={18}/>} title="Demo Account" active={activeTab === 'chart' && accountType === 'demo'} darkMode={darkMode} />
              </div>
            </div>
          )}

          {/* D. PROFILE */}
          {activeMenu === 'profile' && (
            <div className="flex flex-col h-full p-4">
              <div className={`p-6 rounded-2xl border text-center mb-6 shadow-xl transition-colors
                ${darkMode ? "bg-[#111] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center border-2 
                  ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-white shadow-sm"}`}>
                  <User size={32} className={darkMode ? "text-gray-400" : "text-gray-500"}/>
                </div>
                <h3 className={`font-black text-sm uppercase ${darkMode ? "text-white" : "text-slate-900"}`}>Trader_User</h3>
                <p className="text-[#f99616] font-black mt-1">$0.00</p>
                <button onClick={() => handleSubItemClick('deposit')} className="mt-4 w-full bg-[#f99616] text-white text-[10px] font-black uppercase py-2.5 rounded-lg active:scale-95 transition-all">Deposit</button>
              </div>
              <div className="space-y-1">
                <div onClick={() => handleSubItemClick('profile')}><SubMenuItem icon={<User size={18}/>} title="Personal Data" active={activeTab === 'profile'} darkMode={darkMode} /></div>
                <div onClick={() => handleSubItemClick('history')}><SubMenuItem icon={<BarChart2 size={18}/>} title="Trading History" active={activeTab === 'history'} darkMode={darkMode} /></div>
              </div>
              <button onClick={handleLogout} className="mt-auto mb-4 bg-red-600/10 text-red-500 text-[10px] font-black uppercase py-3 rounded-xl border border-red-500/20 hover:bg-red-600 hover:text-white transition-all">Log Out</button>
            </div>
          )}

          {/* E. SUPPORT */}
          {activeMenu === 'support' && (
            <div className="flex flex-col h-full p-4">
               <div className="p-2 flex flex-col gap-1">
                  <div className="text-[9px] text-gray-500 font-black uppercase tracking-[3px] mb-4">Support Center</div>
                  <div onClick={() => handleSubItemClick('support')}><SubMenuItem icon={<MessageSquare size={18}/>} title="My Requests" active={activeTab === 'support'} darkMode={darkMode} /></div>
                  <div className={`flex items-center gap-3 p-4 rounded-xl transition-all cursor-pointer ${darkMode ? "text-gray-500 hover:bg-white/5" : "text-gray-600 hover:bg-gray-50"}`}>
                    <HelpCircle size={18}/><span className="font-bold text-xs uppercase">Help Center</span>
                  </div>
               </div>
               <div className={`mt-auto p-4 rounded-2xl mb-4 text-center border transition-colors
                 ${darkMode ? "bg-[#111] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                  <div className="flex items-center justify-center gap-2 mb-2"><LifeBuoy size={16} className="text-green-500"/><span className={`text-[9px] font-black uppercase ${darkMode ? "text-white" : "text-black"}`}>24/7 Support</span></div>
                  <p className="text-[8px] text-gray-400 font-bold uppercase">Average response: 15m</p>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Sub Components ---
const MainIcon = ({ icon, label, isActive, onClick, darkMode }) => (
    <div onClick={onClick} className={`relative group flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 
      ${isActive 
        ? (darkMode ? 'bg-zinc-800 text-white shadow-xl' : 'bg-white text-[#f99616] shadow-md border border-gray-100') 
        : (darkMode ? 'text-gray-500 hover:text-white hover:bg-zinc-800' : 'text-gray-400 hover:text-black hover:bg-gray-200')}`}>
      {icon}
      <span className="text-[9px] mt-1 font-black uppercase tracking-tighter hidden md:block">{label}</span>
      {isActive && <div className="absolute right-0 top-3 bottom-3 w-1 bg-[#f99616] rounded-l shadow-[0_0_10px_#f99616]"></div>}
    </div>
);

const SubMenuItem = ({ icon, title, active, darkMode }) => (
  <div className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border 
    ${active 
      ? 'bg-[#f99616] border-orange-400 text-white shadow-xl' 
      : (darkMode ? 'text-gray-400 border-transparent hover:bg-white/5 hover:text-white' : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-black')}`}>
    <div className={active ? 'text-white' : 'text-[#f99616]'}>{icon}</div>
    <span className="font-black text-[10px] uppercase tracking-widest">{title}</span>
  </div>
);

const TournamentCard = ({ name, prize, endsIn, image, darkMode }) => (
  <div className={`rounded-xl border p-4 relative overflow-hidden group transition-colors
    ${darkMode ? "bg-[#111] border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
    <div className="relative z-10 space-y-2">
      <h3 className={`font-black italic uppercase tracking-tighter ${darkMode ? "text-white" : "text-slate-900"}`}>{name}</h3>
      <div className="text-[9px] text-gray-500 uppercase font-bold">Prize: <span className={darkMode ? "text-white" : "text-black"}>{prize}</span></div>
      <div className={`flex justify-between items-center pt-2 border-t mt-2 ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
        <span className="text-[9px] text-green-500 font-black">{endsIn}</span>
        <button className="bg-[#f99616] px-4 py-1 rounded text-[8px] font-black text-white uppercase active:scale-90 transition-all">Join</button>
      </div>
    </div>
    <img src={image} className="absolute right-[-10px] top-2 w-14 opacity-10 rotate-12" alt="" />
  </div>
);

export default SidebarLeft;
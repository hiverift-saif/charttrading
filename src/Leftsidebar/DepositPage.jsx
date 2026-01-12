import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, History, Gift, ArrowLeft } from 'lucide-react'; 
import DepositContent from './DepositContent';
import WithdrawContent from './WithdrawContent';
import BonusContent from './BonusContent';
import HistoryContent from './HistoryContent';
import { useTheme } from "../context/ThemeContext";

const DepositPage = ({ initialTab, setActiveTab }) => { 
  const { darkMode } = useTheme();
  
  // 1. 🚀 Sync: Jab initialTab (URL/Parent state) badle, toh internal state bhi badle
  const [activeSubTab, setActiveSubTab] = useState(initialTab || 'deposit');
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [depositAmount, setDepositAmount] = useState("2700");

  useEffect(() => {
    if (initialTab) { 
      setActiveSubTab(initialTab);
      // Agar tab change ho toh step 1 par reset karein (sirf deposit ke liye)
      if (initialTab !== 'deposit') setStep(1); 
    }
  }, [initialTab]);

  // 2. 🚀 Handle Change: Jab user click kare, toh Parent (Dashboard) ko batao taaki URL update ho
  const handleTabChange = (tab) => {
    setActiveSubTab(tab);
    setActiveTab(tab); // 👈 Ye URL update karne wala logic trigger karega TradingDashboard mein
    if (tab === 'deposit') setStep(1);
  };

  return (
    <div className={`h-[100dvh] lg:h-full w-full flex flex-col overflow-hidden select-none transition-colors duration-500
      ${darkMode ? "bg-black" : "bg-white"}`}>
      
      {/* --- RESPONSIVE TABS NAVIGATION --- */}
      <div className={`flex-shrink-0 border-b sticky top-0 backdrop-blur-md z-[40] px-2 md:px-8 transition-colors
        ${darkMode ? "border-gray-800/50 bg-black/80" : "border-gray-200 bg-white/80"}`}>
        
        <div className="flex items-center w-full">
          
          {/* BACK BUTTON */}
          <button 
            onClick={() => setActiveTab('chart')} 
            className={`flex items-center gap-2 px-4 py-2 mr-4 border rounded-xl transition-all group
              ${darkMode 
                ? "bg-[#111] border-gray-800 hover:border-[#f99616] hover:bg-[#f99616]/10" 
                : "bg-gray-50 border-gray-200 hover:border-[#f99616] hover:bg-orange-50"}`}
          >
            <ArrowLeft size={16} className="text-gray-400 group-hover:text-[#f99616] group-hover:-translate-x-1 transition-all" />
            <span className={`hidden md:block text-[10px] font-black uppercase tracking-widest group-hover:text-[#f99616]
              ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Exit</span>
          </button>

          <div className="flex items-center gap-2 md:gap-16 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth flex-1 lg:justify-center py-2">
            <TabButton 
              active={activeSubTab === 'deposit'} 
              onClick={() => handleTabChange('deposit')} 
              icon={<CreditCard size={18}/>} 
              label="Deposit" 
              darkMode={darkMode}
            />
            <TabButton 
              active={activeSubTab === 'withdraw'} 
              onClick={() => handleTabChange('withdraw')} 
              icon={<Wallet size={18}/>} 
              label="Withdrawal" 
              darkMode={darkMode}
            />
            <TabButton 
              active={activeSubTab === 'bonus'} 
              onClick={() => handleTabChange('bonus')} 
              icon={<Gift size={18}/>} 
              label="Promo Codes" 
              darkMode={darkMode}
            />
            <TabButton 
              active={activeSubTab === 'history'} 
              onClick={() => handleTabChange('history')} 
              icon={<History size={18}/>} 
              label="History" 
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* --- CONTENT RENDERER --- */}
      <div className="flex-1 w-full overflow-hidden relative">
        <div className="h-full w-full max-w-7xl mx-auto overflow-y-auto custom-scrollbar p-4 md:p-10 pb-24 lg:pb-10">
          
          {/* Key prop ensures re-render animation when sub-tab changes */}
          <div key={activeSubTab} className="animate-in fade-in slide-in-from-right-4 duration-400 ease-out">
            {activeSubTab === 'deposit' && (
              <DepositContent 
                step={step} setStep={setStep} 
                selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}
                depositAmount={depositAmount} setDepositAmount={setDepositAmount}
              />
            )}
            {activeSubTab === 'withdraw' && <WithdrawContent />}
            {activeSubTab === 'bonus' && <BonusContent />}
            {activeSubTab === 'history' && <HistoryContent />}
          </div>

        </div>
      </div>
    </div>
  );
};

// --- STYLISH TAB BUTTON ---
const TabButton = ({ active, onClick, icon, label, darkMode }) => (
  <button 
    onClick={onClick} 
    className={`
      flex items-center gap-2.5 px-4 py-4 md:py-5 text-sm font-bold transition-all relative outline-none
      ${active 
        ? (darkMode ? 'text-white' : 'text-black') 
        : (darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-black')}
      active:scale-95 duration-200
    `}
  >
    <span className={`${active ? 'text-[#f99616]' : 'text-gray-500'} transition-colors`}>{icon}</span>
    <span className="tracking-tight uppercase md:capitalize text-[12px] md:text-sm">{label}</span>
    
    {active && (
      <>
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#f99616] shadow-[0_-4px_12px_rgba(249,150,22,0.6)] z-10"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#f99616]/20 blur-md rounded-full"></div>
      </>
    )}
  </button>
);

export default DepositPage;
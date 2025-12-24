import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, History, Gift, CheckCircle2 } from 'lucide-react';

const DepositPage = ({ initialTab }) => {
  // Tabs manage karne ke liye state
  const [activeSubTab, setActiveSubTab] = useState(initialTab || 'deposit');

  // Sidebar se aane wali value ko sync karne ke liye
  useEffect(() => {
    if (initialTab) {
      setActiveSubTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="h-full w-full bg-[#131722] flex flex-col p-4 md:p-8 overflow-hidden">
      
      {/* --- TOP TABS SECTION (Mobile Scrollable) --- */}
      <div className="flex border-b border-gray-800 mb-6 sticky top-0 bg-[#131722] z-[40] w-full">
        <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap w-full px-1 py-1">
          <TabButton 
            active={activeSubTab === 'deposit'} 
            onClick={() => setActiveSubTab('deposit')} 
            icon={<CreditCard size={18} />} 
            label="Deposit" 
          />
          <TabButton 
            active={activeSubTab === 'withdraw'} 
            onClick={() => setActiveSubTab('withdraw')} 
            icon={<Wallet size={18} />} 
            label="Withdrawal" 
          />
          <TabButton 
            active={activeSubTab === 'bonus'} 
            onClick={() => setActiveSubTab('bonus')} 
            icon={<Gift size={18} />} 
            label="Bonus Codes" 
          />
          <TabButton 
            active={activeSubTab === 'history'} 
            onClick={() => setActiveSubTab('history')} 
            icon={<History size={18} />} 
            label="History" 
          />
        </div>
      </div>

      {/* --- DYNAMIC CONTENT AREA --- */}
      <div className="flex-1 w-full max-w-7xl mx-auto overflow-y-auto custom-scrollbar pr-1">
        {activeSubTab === 'deposit' && <DepositContent />}
        {activeSubTab === 'withdraw' && <WithdrawContent />}
        {activeSubTab === 'bonus' && <BonusContent />}
        {activeSubTab === 'history' && <HistoryContent />}
      </div>
    </div>
  );
};

// --- 1. DEPOSIT CONTENT ---
const DepositContent = () => (
  <div className="flex flex-col lg:flex-row gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="flex-1 space-y-6">
      <div>
        <h3 className="text-gray-400 text-[10px] md:text-xs font-bold mb-4 uppercase tracking-widest">Recommended Methods</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <PaymentCard name="Paytm" min="$45" time="~1 min." logo="https://img.icons8.com/color/48/paytm.png" />
          <PaymentCard name="UPI p2p" min="$45" time="~1 min." logo="https://img.icons8.com/color/48/upi.png" />
          <PaymentCard name="Gpay" min="$45" time="~1 min." logo="https://img.icons8.com/color/48/google-pay.png" />
        </div>
      </div>
    </div>
    <div className="w-full lg:w-80 h-fit">
        <ConditionsSidebar />
    </div>
  </div>
);

// --- 2. WITHDRAW CONTENT ---
const WithdrawContent = () => (
  <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
    <div className="bg-[#1f1d1c] p-5 md:p-8 rounded-2xl border border-gray-800">
      <h3 className="text-white font-bold mb-6 text-lg">Request Withdrawal</h3>
      <div className="space-y-6 text-gray-400">
        <div className="bg-[#131722] p-5 rounded-xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-sm font-medium">Available balance for withdrawal:</span>
            <span className="text-2xl font-black text-green-500">$0.00</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <PaymentCard name="Paytm" logo="https://img.icons8.com/color/48/paytm.png" />
             <PaymentCard name="UPI" logo="https://img.icons8.com/color/48/upi.png" />
        </div>
      </div>
    </div>
  </div>
);

// --- 3. BONUS CONTENT ---
const BonusContent = () => (
  <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in duration-300">
    <div className="bg-[#1f1d1c] p-6 md:p-10 rounded-2xl border border-gray-800 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
         <Gift size={32} className="text-blue-500" />
      </div>
      <h3 className="text-white font-bold mb-2 text-xl">Promo Code</h3>
      <p className="text-gray-500 text-sm mb-8 px-4">Enter your code to get an extra deposit bonus.</p>
      <div className="flex flex-col gap-4">
        <input type="text" placeholder="ENTER CODE" className="w-full bg-[#131722] border border-gray-700 rounded-xl p-4 text-white text-center uppercase font-bold outline-none focus:border-blue-500 transition-all" />
        <button className="w-full bg-blue-600 py-4 rounded-xl font-bold text-white hover:bg-blue-500 transition shadow-lg active:scale-95">Apply Code</button>
      </div>
    </div>
  </div>
);

// --- 4. HISTORY CONTENT ---
const HistoryContent = () => (
  <div className="bg-[#1f1d1c] rounded-2xl border border-gray-800 overflow-hidden animate-in fade-in duration-300">
    <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-[#1b1918]">
        <h3 className="text-white font-bold text-xs uppercase tracking-widest">Transaction Log</h3>
        <button className="text-[10px] text-blue-500 border border-blue-500/30 px-3 py-1 rounded-full font-bold">REFRESH</button>
    </div>
    <div className="overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-[#131722] text-gray-500 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th className="p-5">Type</th>
              <th className="p-5">Method</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
             <tr className="hover:bg-[#252833] transition-colors">
                <td className="p-5"><span className="text-green-500 flex items-center gap-1 font-bold">↑ Deposit</span></td>
                <td className="p-5 text-gray-300">UPI P2P</td>
                <td className="p-5 text-white font-black">$100.00</td>
                <td className="p-5"><span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-lg text-[10px] font-bold border border-yellow-500/20">PENDING</span></td>
                <td className="p-5 text-right text-gray-500 text-xs font-mono">2025-05-23</td>
             </tr>
          </tbody>
        </table>
    </div>
  </div>
);

// --- REUSABLE COMPONENTS ---

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`pb-4 text-[13px] md:text-sm font-bold flex items-center gap-2 transition-all relative outline-none flex-shrink-0 ${
      active ? 'text-white' : 'text-gray-500 hover:text-white'
    }`}
  >
    <span className={active ? 'text-blue-500' : ''}>{icon}</span>
    {label}
    {active && (
      <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
    )}
  </button>
);

const ConditionsSidebar = () => (
  <div className="bg-[#1f1d1c] p-6 rounded-2xl border border-gray-800">
    <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Policy</h4>
    <div className="space-y-5 text-xs text-gray-400">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-3"><CheckCircle2 size={16} className="text-blue-500"/> Min deposit:</span>
        <span className="text-white font-bold">$10</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-3"><CheckCircle2 size={16} className="text-blue-500"/> Commission:</span>
        <span className="text-green-500 font-bold">0%</span>
      </div>
    </div>
  </div>
);

const PaymentCard = ({ name, min, time, logo }) => (
  <div className="bg-[#1f1d1c] border border-gray-800 rounded-2xl p-4 md:p-5 hover:border-blue-500 transition-all cursor-pointer group active:scale-95">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-[#131722] rounded-xl border border-gray-800">
        <img src={logo} alt={name} className="w-8 h-8 object-contain" />
      </div>
      {time && <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-bold group-hover:text-blue-400">{time}</span>}
    </div>
    <div className="font-bold text-white text-sm mb-1">{name}</div>
    {min && <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Min: <span className="text-gray-300 font-bold">{min}</span></div>}
  </div>
);

export default DepositPage;
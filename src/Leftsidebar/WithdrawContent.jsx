import React, { useState } from 'react';
import { 
  AlertCircle, ChevronRight, ArrowLeft, Wallet, 
  CheckCircle2, ShieldCheck, Info, ArrowRight, 
  Clock, Zap, Lock 
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

const WithdrawContent = () => {
  const { darkMode } = useTheme(); // 🚀 Theme state access
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const withdrawalMethods = [
    { id: 1, name: "UPI Withdrawal", logo: "https://pocketoption.com/images/payments/logo2/upi.png", time: "24-48 Hours" },
    { id: 2, name: "Tether USDT (TRC20)", logo: "https://pocketoption.com/images/payments/logo2/usdt-trc20.png", time: "1-2 Hours" },
    { id: 3, name: "Bank Transfer", logo: "https://img.icons8.com/color/48/bank.png", time: "1-3 Days" },
  ];

  return (
    <div className={`max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500 pb-10 px-2 md:px-4 font-sans transition-colors duration-500
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center pt-4 px-2">
        <h2 className={`text-xl md:text-2xl font-black uppercase tracking-tighter italic ${darkMode ? "text-white" : "text-black"}`}>
          Funds <span className="text-[#f99616]">Withdrawal</span>
        </h2>
        <div className={`hidden md:flex items-center gap-2 border px-3 py-1.5 rounded-lg transition-colors
          ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
           <Lock size={14} className="text-[#f99616]" />
           <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">SSL Secure Gateway</span>
        </div>
      </div>

      {/* BALANCE & ALERT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        <div className={`p-5 rounded-xl md:rounded-2xl border shadow-xl transition-colors
          ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
           <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Available Balance</p>
           <h3 className={`text-2xl md:text-3xl font-black ${darkMode ? "text-white" : "text-black"}`}>$0.00</h3>
        </div>
        <div className={`border p-5 rounded-xl md:rounded-2xl flex gap-3 items-center transition-colors
          ${darkMode ? "bg-[#f99616]/5 border-[#f99616]/10" : "bg-orange-50 border-orange-100"}`}>
          <AlertCircle size={20} className="text-[#f99616] shrink-0" />
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-[9px] md:text-[10px] font-bold uppercase leading-tight tracking-tight`}>
            Verification is required for withdrawals over $1,000. Funds go to the original deposit source.
          </p>
        </div>
      </div>

      {/* MAIN FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 px-2">
        <div className={`lg:col-span-3 p-5 md:p-8 rounded-xl md:rounded-3xl border space-y-8 shadow-2xl transition-colors
          ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
          
          {/* Amount Section */}
          <div className="space-y-4">
              <SectionHeader num="1" label="Amount" darkMode={darkMode} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-end">
                <div className="relative group">
                  <input 
                    type="number" 
                    placeholder="Min $10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full border rounded-xl p-3 md:p-4 text-xl md:text-2xl font-black outline-none focus:border-[#f99616] transition-all
                      ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-black"}`} 
                  />
                  <span className={`absolute right-4 top-1/2 -translate-y-1/2 font-black text-lg transition-colors
                    ${darkMode ? "text-gray-700 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`}>$</span>
                </div>
                <div className="flex items-center gap-2 text-green-500 bg-green-500/5 px-3 py-2 rounded-lg border border-green-500/10 h-fit w-fit md:w-full md:justify-center">
                  <Zap size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-center">Fee: 0.00%</span>
                </div>
              </div>
          </div>

          {/* Methods Section */}
          <div className="space-y-4">
              <SectionHeader num="2" label="Method" darkMode={darkMode} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {withdrawalMethods.map(m => (
                  <MethodCard 
                    key={m.id} 
                    data={m} 
                    isActive={selectedMethod === m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    darkMode={darkMode}
                  />
                ))}
              </div>
          </div>

          <button 
            disabled={!amount || amount < 10 || !selectedMethod}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-[11px] transition-all flex items-center justify-center gap-2 active:scale-95 ${
              amount >= 10 && selectedMethod
              ? 'bg-[#f99616] hover:bg-[#e88914] text-white shadow-lg' 
              : darkMode 
                ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-gray-800' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            Withdraw Now <ArrowRight size={16} />
          </button>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
           <div className={`rounded-xl md:rounded-2xl border p-5 space-y-4 shadow-2xl h-fit transition-colors
             ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
              <h4 className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b pb-3 flex items-center gap-2
                ${darkMode ? "text-white border-gray-800" : "text-black border-gray-200"}`}>
                <Info size={14} className="text-[#f99616]"/> Limits
              </h4>
              <div className="space-y-3">
                <LimitItem label="Min. Payout" val="$10" darkMode={darkMode} />
                <LimitItem label="Max. Daily" val="$5,000" darkMode={darkMode} />
                <LimitItem label="Status" val="Verified" color="text-green-500" darkMode={darkMode} />
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

const SectionHeader = ({ num, label, darkMode }) => (
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 rounded-md bg-[#f99616] flex items-center justify-center text-[10px] font-black text-white">{num}</div>
    <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</span>
    <div className={`flex-1 h-[1px] ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}></div>
  </div>
);

const MethodCard = ({ data, isActive, onClick, darkMode }) => (
  <div 
    onClick={onClick}
    className={`border p-3 md:p-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer relative
      ${isActive 
        ? 'border-[#f99616] bg-[#f99616]/5' 
        : darkMode ? 'bg-black border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-orange-200'
      }`}
  >
    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
      <img src={data.logo} className="w-full h-full object-contain" alt="" />
    </div>
    <div className="flex-1 overflow-hidden">
      <h5 className={`text-[9px] md:text-[10px] font-black uppercase truncate leading-tight 
        ${isActive ? (darkMode ? 'text-white' : 'text-orange-600') : (darkMode ? 'text-gray-300' : 'text-slate-700')}`}>{data.name}</h5>
      <p className="text-gray-500 text-[7px] md:text-[8px] font-bold uppercase mt-0.5 tracking-tight">{data.time}</p>
    </div>
    {isActive && (
      <div className="absolute top-1 right-1 animate-in zoom-in">
        <CheckCircle2 size={12} className="text-[#f99616]" />
      </div>
    )}
  </div>
);

const LimitItem = ({ label, val, color = "", darkMode }) => (
  <div className="flex justify-between items-center text-[9px] md:text-[10px]">
    <span className="text-gray-500 font-bold uppercase tracking-tight">{label}</span>
    <span className={`${color || (darkMode ? "text-white" : "text-black")} font-black uppercase`}>{val}</span>
  </div>
);

export default WithdrawContent;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AlertCircle, Wallet, CheckCircle2, Info, ArrowRight, 
  Zap, Lock, Loader2, ShieldAlert 
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';

const WithdrawContent = () => {
  const { darkMode } = useTheme();
  
  // 🚀 Redux se Live Balance aur Account Type uthana
  const { balance, accountType } = useSelector((state) => state.trading);
  
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [kycError, setKycError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const withdrawalMethods = [
    { id: "upi", name: "UPI Withdrawal", logo: "https://pocketoption.com/images/payments/logo2/upi.png", time: "24-48 Hours" },
    { id: "crypto", name: "Tether USDT (TRC20)", logo: "https://pocketoption.com/images/payments/logo2/usdt-trc20.png", time: "1-2 Hours" },
    { id: "bank", name: "Bank Transfer", logo: "https://img.icons8.com/color/48/bank.png", time: "1-3 Days" },
  ];

  const handleWithdrawal = async () => {
    if (accountType === 'demo') {
      setError("Cannot withdraw from Demo Account");
      return;
    }
    if (Number(amount) > balance) {
      setError("Insufficient balance");
      return;
    }

    setError("");
    setKycError(false);
    setLoading(true);

    const token = localStorage.getItem('access_token');
    console.log('token', token)

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/wallet/withdraw`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: Number(amount),
          method: selectedMethod
        })
      });

      const result = await response.json();

      if (response.status === 403) {
        setKycError(true); 
      } else if (response.ok) {
        setSuccess(true);
        setAmount("");
      } else {
        setError(result.message || "Withdrawal failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-black uppercase italic mb-2">Request Sent!</h2>
        <p className="text-gray-500 text-sm font-bold text-center max-w-xs">
          Your request for ${amount} is under review. You can track it in History.
        </p>
        <button onClick={() => setSuccess(false)} className="mt-8 text-[#f99616] font-black uppercase text-[10px] border-b border-[#f99616]">Back to Withdrawal</button>
      </div>
    );
  }

  return (
    <div className={`max-w-[1200px] mx-auto space-y-6 pb-10 px-2 md:px-4 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* 🚀 KYC Error Display */}
      {kycError && (
        <div className="mx-2 bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-4 animate-in slide-in-from-top-4">
          <ShieldAlert className="text-red-500" size={32} />
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-red-500 font-black text-xs uppercase">KYC Verification Required</h4>
            <p className="text-gray-500 text-[10px] font-bold">Please complete your verification in profile settings to enable withdrawals.</p>
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase">Verify Now</button>
        </div>
      )}

      {/* 🚀 Dynamic Balance Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        <div className={`p-5 rounded-xl md:rounded-2xl border shadow-xl ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
           <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Total Available</p>
           <h3 className={`text-2xl md:text-4xl font-black ${darkMode ? "text-white" : "text-black"}`}>
             ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
           </h3>
           <div className="flex items-center gap-1 mt-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[8px] text-gray-500 font-bold uppercase">Real Wallet Sync</span>
           </div>
        </div>

        <div className={`border p-5 rounded-xl md:rounded-2xl flex gap-3 items-center md:col-span-2 ${darkMode ? "bg-[#f99616]/5 border-[#f99616]/10" : "bg-orange-50 border-orange-100"}`}>
          <AlertCircle size={24} className="text-[#f99616] shrink-0" />
          <div className="space-y-1">
            <p className="text-[#f99616] text-[10px] font-black uppercase">Withdrawal Note</p>
            <p className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase leading-tight">
              Withdrawals are processed to the original deposit method. Minimum amount is $10.00.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-2">
        <div className={`lg:col-span-3 p-5 md:p-8 rounded-xl md:rounded-3xl border shadow-2xl ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
          
          {/* Amount Input */}
          <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-[#f99616] text-white flex items-center justify-center text-[10px] font-black">1</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Withdraw Amount</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Min $10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full border rounded-xl p-4 text-2xl font-black outline-none transition-all ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200 text-black focus:border-[#f99616]"}`} 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-500">$</span>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                   {["10", "50", "100", "500"].map(val => (
                     <button key={val} onClick={() => setAmount(val)} className={`px-4 py-2 rounded-lg text-[10px] font-black border transition-all ${darkMode ? "border-gray-800 hover:border-[#f99616]" : "border-gray-200 hover:border-[#f99616]"}`}>${val}</button>
                   ))}
                   <button onClick={() => setAmount(balance)} className="px-4 py-2 rounded-lg text-[10px] font-black border border-[#f99616] text-[#f99616] hover:bg-[#f99616] hover:text-white transition-all">MAX</button>
                </div>
              </div>
          </div>

          {/* Methods List */}
          <div className="space-y-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-[#f99616] text-white flex items-center justify-center text-[10px] font-black">2</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Payment Method</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {withdrawalMethods.map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => setSelectedMethod(m.id)}
                    className={`border p-4 rounded-xl flex items-center gap-3 cursor-pointer relative transition-all ${selectedMethod === m.id ? 'border-[#f99616] bg-[#f99616]/5 shadow-lg' : 'hover:border-gray-500 border-gray-800'}`}
                  >
                    <img src={m.logo} className="w-10 h-10 object-contain bg-white rounded p-1" alt="" />
                    <div className="overflow-hidden">
                      <h5 className="text-[10px] font-black uppercase truncate">{m.name}</h5>
                      <p className="text-[8px] text-gray-500 font-bold uppercase">{m.time}</p>
                    </div>
                    {selectedMethod === m.id && <CheckCircle2 size={14} className="absolute top-2 right-2 text-[#f99616]" />}
                  </div>
                ))}
              </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-black uppercase text-center mt-4">{error}</p>}

          <button 
            onClick={handleWithdrawal}
            disabled={!amount || amount < 10 || !selectedMethod || loading || amount > balance}
            className={`w-full py-5 rounded-xl font-black uppercase tracking-widest text-[11px] mt-8 flex items-center justify-center gap-2 transition-all ${amount >= 10 && selectedMethod && !loading && amount <= balance ? 'bg-[#f99616] hover:bg-[#e88914] text-white shadow-xl' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <>Confirm Withdrawal <ArrowRight size={16} /></>}
          </button>
        </div>

        <aside className="lg:col-span-1">
            <div className={`rounded-3xl border p-6 space-y-4 shadow-xl ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
              <h4 className="text-[10px] font-black uppercase tracking-widest border-b pb-3 flex items-center gap-2">
                <Info size={14} className="text-[#f99616]"/> Security
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 font-bold uppercase">Min. Limit</span>
                  <span className="font-black">$10.00</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 font-bold uppercase">Fee</span>
                  <span className="font-black text-green-500">0%</span>
                </div>
              </div>
            </div>
        </aside>
      </div>
    </div>
  );
};

export default WithdrawContent;
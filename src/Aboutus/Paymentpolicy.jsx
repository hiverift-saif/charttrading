import React from 'react';
import { 
  CreditCard, Wallet, ArrowDownCircle, ArrowUpCircle, 
  Clock, ShieldCheck, AlertCircle, Banknote, Landmark 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Paymentpolicy = () => {
  const { darkMode } = useTheme();

  const methods = [
    { t: "Crypto", d: "USDT, BTC, ETH (Instant)", i: <Wallet size={20}/> },
    { t: "E-Wallets", d: "PerfectMoney, Skrill, Neteller", i: <CreditCard size={20}/> },
    { t: "Local Bank", d: "IMPS, NEFT, UPI Transfer", i: <Landmark size={20}/> }
  ];

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-5xl mx-auto px-5">
        
        {/* --- 1. HEADER --- */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-[#f99616]/10 text-[#f99616] mb-6">
            <Banknote size={40} />
          </div>
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Financial Operations</h4>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Payment <span className="text-[#f99616]">Policy</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest leading-relaxed italic">
            Secure, transparent, and ultra-fast financial transactions for global traders.
          </p>
        </div>

        {/* --- 2. SUMMARY CARDS (MOBILE RESPONSIVE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {methods.map((m, i) => (
            <div key={i} className={`p-6 rounded-2xl border transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-md"}`}>
              <div className="text-[#f99616] mb-4">{m.i}</div>
              <h3 className="text-xs font-black uppercase italic mb-1">{m.t}</h3>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{m.d}</p>
            </div>
          ))}
        </div>

        {/* --- 3. DETAILED POLICY CONTENT --- */}
        <div className={`p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border mb-16 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100 shadow-2xl"}`}>
          <div className="space-y-10 text-[11px] md:text-xs font-medium leading-relaxed text-gray-500 uppercase tracking-wide">
            
            {/* Deposits */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <ArrowDownCircle className="text-[#f99616]" size={20} />
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic uppercase">01. Deposit Procedures</h4>
              </div>
              <p className="mb-4">Minimum deposit starts from $10. All deposits must be made from accounts/wallets belonging to the same name as the trading account owner. Third-party deposits are strictly prohibited and will be refunded after a 5% processing fee.</p>
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[9px] italic">
                Note: Crypto deposits require 3 network confirmations before they are credited to your balance.
              </div>
            </section>

            {/* Withdrawals */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <ArrowUpCircle className="text-[#f99616]" size={20} />
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic uppercase">02. Withdrawal Regulations</h4>
              </div>
              <p className="mb-4">Withdrawals are processed back to the original source of deposit. For example, if you deposit via USDT, your withdrawal must be in USDT. We aim to process all requests within 1-24 business hours.</p>
              <ul className="space-y-2">
                 <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#f99616] rounded-full"></div>
                    <span>Minimum Withdrawal: $10 (Wallets), $50 (Crypto)</span>
                 </li>
                 <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#f99616] rounded-full"></div>
                    <span>Daily Max Withdrawal: $5,000 (Standard), Unlimited (VIP)</span>
                 </li>
              </ul>
            </section>

            {/* Fees */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <Clock className="text-[#f99616]" size={20} />
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic uppercase">03. Commissions & Fees</h4>
              </div>
              <p>MaxTrading charges 0% commission on deposits. Withdrawal fees depend on the blockchain network (for Crypto) or bank intermediary fees. If a trading account is inactive for more than 90 days, an inactivity fee of $10 per month may apply.</p>
            </section>

          </div>
        </div>

        {/* --- 4. SECURITY BADGE (BOTTOM) --- */}
        <div className={`p-8 rounded-[2rem] border text-center ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
           <ShieldCheck className="text-green-500 mx-auto mb-4" size={36} />
           <h3 className="text-lg font-black uppercase italic mb-2">PCI DSS <span className="text-[#f99616]">Compliant</span></h3>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
              All financial transactions are protected by 256-bit SSL encryption and monitored by our dedicated 24/7 security desk.
           </p>
        </div>

      </div>
    </div>
  );
};

export default Paymentpolicy;
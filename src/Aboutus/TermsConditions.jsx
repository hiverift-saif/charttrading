import React from 'react';
import { 
  FileText, ShieldAlert, Scale, UserCheck, 
  Ban, HelpCircle, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TermsConditions = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-5xl mx-auto px-5">
        
        {/* --- 1. HEADER --- */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex p-3 rounded-2xl bg-[#f99616]/10 text-[#f99616] mb-6">
            <FileText size={40} />
          </div>
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Legal Framework</h4>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Terms <span className="text-[#f99616]">& Conditions</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest leading-relaxed italic">
            Please read these service terms carefully before accessing our trading terminal.
          </p>
        </div>

        {/* --- 2. QUICK NAVIGATION SUMMARY --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { t: "Eligibility", i: <UserCheck size={18}/> },
            { t: "Trading Rules", i: <Scale size={18}/> },
            { t: "Account Bans", i: <Ban size={18}/> },
            { t: "Liability", i: <ShieldAlert size={18}/> }
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-sm"}`}>
              <div className="text-[#f99616]">{item.i}</div>
              <span className="text-[9px] font-black uppercase tracking-widest">{item.t}</span>
            </div>
          ))}
        </div>

        {/* --- 3. DETAILED LEGAL CONTENT (RESPONSIVE) --- */}
        <div className={`p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border mb-10 ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-xl"}`}>
          <div className="space-y-12 text-[11px] md:text-xs font-medium leading-relaxed text-gray-500 uppercase tracking-wide">
            
            {/* Section 01 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-1 bg-[#f99616]"></div>
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic uppercase">01. Acceptance of Agreement</h4>
              </div>
              <p>By creating an account on MaxTrading, you agree to be bound by these Terms and Conditions. This agreement constitutes a legally binding contract between the user and MaxTrading Group Ltd. If you do not agree with any part of these terms, you must immediately cease all trading activities on the platform.</p>
            </section>

            {/* Section 02 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-1 bg-[#f99616]"></div>
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic uppercase">02. User Eligibility</h4>
              </div>
              <p className="mb-4">To use our services, you must be at least 18 years of age and reside in a jurisdiction where online trading is not prohibited by law. We do not offer services to residents of the USA, Canada, North Korea, and Iran.</p>
              <div className="flex items-center gap-2 text-[10px] font-black text-white bg-red-600/10 p-3 border border-red-600/20 rounded-lg">
                 <AlertCircle size={14} className="text-red-600 shrink-0"/>
                 <span className="text-red-600 uppercase">Violation of age or residency requirements will result in permanent account seizure.</span>
              </div>
            </section>

            {/* Section 03 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-1 bg-[#f99616]"></div>
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic uppercase">03. Trading & Execution</h4>
              </div>
              <p className="mb-4">All trades executed on the platform are final. While we aim for 0.01s execution speed, MaxTrading is not liable for losses caused by network latency, local internet failure, or unexpected market gaps. Use of automated trading bots or high-frequency "arbitrage" scripts is strictly monitored.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   "Zero tolerance for market manipulation",
                   "Withdrawals processed within 24 business hours",
                   "Max leverage varies per asset class",
                   "Negative balance protection active"
                 ].map((li, idx) => (
                   <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#f99616] shrink-0" />
                      <span className="text-[9px] font-bold tracking-tighter">{li}</span>
                   </li>
                 ))}
              </ul>
            </section>

            {/* Section 04 */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-1 bg-[#f99616]"></div>
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic uppercase">04. Limitation of Liability</h4>
              </div>
              <p>Under no circumstances shall MaxTrading be held responsible for any direct, indirect, or consequential losses resulting from market volatility or platform downtime. Trading involves significant risk, and you should only invest capital you can afford to lose.</p>
            </section>

          </div>
        </div>

        {/* --- 4. CONTACT FOOTER --- */}
        <div className={`p-8 rounded-[2rem] border text-center ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
           <HelpCircle className="text-[#f99616] mx-auto mb-4" size={32} />
           <h3 className="text-lg font-black uppercase italic mb-2">Legal <span className="text-[#f99616]">Clarification</span></h3>
           <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
              If you have any questions regarding these terms, please contact our legal department at <span className="text-[#f99616]">legal@maxtrading.com</span> before proceeding.
           </p>
        </div>

      </div>
    </div>
  );
};

export default TermsConditions;
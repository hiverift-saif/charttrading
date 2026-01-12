import React from 'react';
import { 
  Gift, Award, Star, Sparkles, TrendingUp, Trophy, 
  Gem, ShieldCheck, Percent, Zap, CheckCircle2, 
  Crown, Flame, ArrowRight 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const OffersRewardsPage = () => {
  const { darkMode } = useTheme();

  const rewards = [
    { t: "50% Welcome", d: "Boost your initial capital with a massive first deposit match.", i: <Percent size={28}/>, detail: "Min Deposit: $50" },
    { t: "Risk Free", d: "Trade without fear. We refund your first 3 losing trades.", i: <ShieldCheck size={28}/>, detail: "Up to $100" },
    { t: "Grand Tournament", d: "Join global traders to compete for a huge prize pool.", i: <Trophy size={28}/>, detail: "$50,000 Total" },
    { t: "Weekly Cashback", d: "Get a percentage of your turnover back every single Monday.", i: <Gem size={28}/>, detail: "Up to 10%" }
  ];

  const vipTiers = [
    { level: "Silver", dep: "$100", perk: "3% Cashback", icon: <Star className="text-gray-400"/> },
    { level: "Gold", dep: "$500", perk: "5% Cashback + Personal Manager", icon: <Award className="text-yellow-500"/> },
    { level: "Platinum", dep: "$2000+", perk: "10% Cashback + Faster Withdrawals", icon: <Crown className="text-[#f99616]"/> },
  ];

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- HERO SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 text-[#f99616] mb-4">
               <Flame size={16} fill="currentColor"/>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Exclusive Incentives</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-none mb-6">
              Trade More <br/> <span className="text-[#f99616]">Earn More</span>
            </h1>
            <p className="text-gray-500 font-bold text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              Maximize your trading potential with our industry-leading loyalty program. From deposit boosters to VIP account managers, every trade you take brings you closer to exclusive rewards.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#f99616] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-500/30 hover:bg-[#e88a14] transition-all active:scale-95">Claim Bonus</button>
              <button className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border transition-all hover:border-[#f99616] ${darkMode ? "border-gray-800" : "border-gray-200"}`}>VIP Program</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewards.map((box, i) => (
              <div key={i} className={`group p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${darkMode ? "bg-[#0d0d0d] border-gray-800 hover:border-[#f99616]/50 shadow-2xl" : "bg-white border-gray-100 shadow-xl"}`}>
                <div className="text-[#f99616] mb-6 group-hover:scale-110 transition-transform">{box.i}</div>
                <h3 className="text-lg font-black uppercase italic mb-2 tracking-tighter">{box.t}</h3>
                <p className={`text-[11px] mb-4 font-medium leading-relaxed ${darkMode ? "text-gray-500" : "text-gray-600"}`}>{box.d}</p>
                <div className={`text-[9px] font-black uppercase tracking-widest p-2 rounded-lg inline-block ${darkMode ? "bg-white/5 text-gray-400" : "bg-orange-50 text-[#f99616]"}`}>{box.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PROMO CODE SECTION --- */}
        <div className={`mb-28 p-10 md:p-16 rounded-[3rem] border relative overflow-hidden ${darkMode ? "bg-gradient-to-br from-[#0d0d0d] to-black border-gray-800" : "bg-orange-50 border-orange-100"}`}>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black uppercase italic mb-2">Have a <span className="text-[#f99616]">Promo Code?</span></h2>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Enter it here to boost your balance instantly</p>
               </div>
               <div className="flex w-full md:w-auto gap-2">
                  <input type="text" placeholder="MAXTRADE50" className={`px-6 py-4 rounded-xl outline-none border font-black uppercase tracking-widest text-sm w-full md:w-64 ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-white border-gray-200"}`} />
                  <button className="bg-[#f99616] p-4 rounded-xl text-white"><ArrowRight/></button>
               </div>
            </div>
            <Sparkles className="absolute top-0 right-0 text-[#f99616]/10 w-64 h-64 -translate-y-1/2 translate-x-1/4" />
        </div>

        {/* --- VIP LEVELS TABLE --- */}
        <div className="mb-20">
           <div className="text-center mb-12">
              <h2 className="text-4xl font-black uppercase italic mb-4 tracking-tighter">VIP <span className="text-[#f99616]">Levels</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">The more you deposit, the more you unlock</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vipTiers.map((tier, i) => (
                <div key={i} className={`p-10 rounded-[2.5rem] border text-center relative transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100 shadow-xl"} ${tier.level === "Platinum" ? "border-[#f99616] scale-105" : ""}`}>
                  {tier.level === "Platinum" && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f99616] text-white text-[8px] font-black uppercase px-4 py-1 rounded-full">Most Popular</div>}
                  <div className="flex justify-center mb-6">{tier.icon}</div>
                  <h4 className="text-2xl font-black uppercase italic mb-1">{tier.level}</h4>
                  <p className="text-[#f99616] text-[10px] font-black uppercase tracking-widest mb-6">From {tier.dep}</p>
                  <ul className="space-y-4 mb-8">
                    {tier.perk.split('+').map((p, idx) => (
                       <li key={idx} className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500">
                          <CheckCircle2 size={14} className="text-[#f99616]"/> {p}
                       </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${darkMode ? "border-gray-800 hover:border-[#f99616]" : "border-gray-200 hover:bg-[#f99616] hover:text-white"}`}>Upgrade Now</button>
                </div>
              ))}
           </div>
        </div>

        {/* --- FAQ PREVIEW --- */}
        <div className="max-w-3xl mx-auto text-center border-t border-gray-800 pt-20">
           <h3 className="text-xl font-black uppercase italic mb-10 tracking-widest">How to <span className="text-[#f99616]">Activate?</span></h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <div>1. Register Account</div>
              <div className="text-[#f99616]">2. Make Deposit</div>
              <div>3. Use Bonus Code</div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OffersRewardsPage;
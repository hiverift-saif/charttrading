import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { 
  UserPlus, LogIn, MousePointer, Shield, 
  Wallet, TrendingUp, DollarSign, Banknote, Play 
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Registration",
    description: "Create a free Trade Pro account using your email, or sign up quickly via Google or Facebook.",
    icon: <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-[#f99616] to-[#e88a14]",
  },
  {
    id: 2,
    title: "Verification",
    description: "Complete your profile. Upload ID and proof of address to secure your account.",
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-[#f99616] to-[#e88a14]",
  },
  {
    id: 3,
    title: "Deposit",
    description: "Fund your account using your preferred deposit method. Fast and secure processing.",
    icon: <Wallet className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-[#f99616] to-[#e88a14]",
  },
  {
    id: 4,
    title: "Trading",
    description: "Select your asset, choose indicators, set amount, and place your increase/decrease order.",
    icon: <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-[#f99616] to-[#e88a14]",
  },
  {
    id: 5,
    title: "Profit",
    description: "Correct forecasts bring instant profit. Earnings are added to your balance immediately.",
    icon: <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-[#f99616] to-[#e88a14]",
  },
  {
    id: 6,
    title: "Withdrawal",
    description: "Withdraw funds anytime using the same method as deposit. Reliable and fast.",
    icon: <Banknote className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    gradient: "from-[#f99616] to-[#e88a14]",
  },
];

export default function TradeProLanding() {
  const navigate = useNavigate();
  const { darkMode } = useTheme(); // 🚀 Theme State

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-gray-50 text-slate-900"}`}>
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1643962579745-bcaa05ffc573?q=80&w=1600')" }}
          ></div>
          <div className={`absolute inset-0 bg-gradient-to-b ${darkMode ? "from-transparent via-black/60 to-black" : "from-transparent via-white/40 to-gray-50"}`}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] uppercase italic">
            <span className={darkMode ? "text-white" : "text-black"}>
              Quick Start with
            </span>
            <br />
            <span className="text-[#f99616]">
              Trade Pro
            </span>
          </h1>
          
          <p className={`text-sm sm:text-xl md:text-2xl max-w-3xl mx-auto px-2 font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Master the financial markets in <span className="text-[#f99616] font-bold italic">6 Simple Steps</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center pt-2 sm:pt-4 px-4">
            <button 
              onClick={() => navigate("/registration")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f99616] px-6 sm:px-8 py-2.5 sm:py-4 rounded-xl font-black text-white text-xs sm:text-base uppercase tracking-widest transition-all hover:bg-[#e88914] active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> Registration
            </button>
            <button 
              onClick={() => navigate("/login")}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-4 rounded-xl font-black text-xs sm:text-base border transition-all active:scale-95 ${darkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-800 shadow-sm"}`}
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> Log In
            </button>
            <button 
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-4 rounded-xl font-black text-xs sm:text-base border transition-all ${darkMode ? "bg-[#f99616]/10 border-[#f99616]/30 text-[#f99616]" : "bg-orange-50 border-orange-200 text-[#f99616]"}`}
            >
              <MousePointer className="w-4 h-4 sm:w-5 sm:h-5" /> Quick Start
            </button>
          </div>
        </div>
      </section>

      {/* 2. STEPS SECTION */}
      <section className="py-12 sm:py-24 relative px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-20 space-y-2">
            <h2 className={`text-2xl sm:text-5xl font-black uppercase italic ${darkMode ? "text-white" : "text-black"}`}>Your Trading Journey</h2>
            <div className="w-20 h-1 bg-[#f99616] mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Desktop Vertical Line */}
            <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-gradient-to-b ${darkMode ? "from-[#f99616]/50 to-transparent" : "from-[#f99616]/20 to-transparent"}`}></div>

            <div className="space-y-8 sm:space-y-24 lg:space-y-32">
              {steps.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col lg:flex-row items-center gap-4 sm:gap-8 ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="w-full lg:w-5/12">
                    <div className={`border p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] transition-all duration-500 group relative overflow-hidden ${darkMode ? "bg-[#0a0c1f] border-white/5 hover:border-[#f99616]/30" : "bg-white border-slate-200 shadow-sm hover:border-[#f99616]"}`}>
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl mb-4 flex items-center justify-center bg-[#f99616] lg:hidden shadow-lg`}>
                        {React.cloneElement(step.icon, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black uppercase text-[#f99616] mb-3">{step.id}. {step.title}</h3>
                      <p className={`text-sm sm:text-lg leading-relaxed font-bold ${darkMode ? "text-gray-400" : "text-slate-600"}`}>{step.description}</p>
                    </div>
                  </div>

                  <div className="hidden lg:flex w-2/12 justify-center relative z-10">
                    <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center bg-[#f99616] shadow-2xl transform transition-transform group-hover:scale-110">
                      {React.cloneElement(step.icon, { className: "w-10 h-10" })}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-[#f99616] rounded-full flex items-center justify-center font-black text-sm border-2 border-[#f99616]">
                        {step.id}
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-12 sm:py-24 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className={`relative rounded-3xl sm:rounded-[3rem] overflow-hidden p-8 sm:p-20 border transition-all ${darkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-2xl"}`}>
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase italic leading-tight">
                Get Started Today with <br />
                <span className="text-[#f99616] underline underline-offset-8 decoration-[#f99616]/30">Trade Pro</span>
              </h2>
              
              <p className={`text-sm sm:text-xl max-w-2xl mx-auto px-2 font-bold ${darkMode ? "text-gray-400" : "text-slate-600"}`}>
                Join thousands of successful traders worldwide. Setup takes only 5 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Link to="/Trading" className="bg-[#f99616] text-white px-4 sm:px-10 py-3.5 sm:py-5 rounded-xl font-black text-xs sm:text-lg flex items-center justify-center gap-2 hover:bg-[#e88914] transition-all shadow-lg shadow-orange-500/20">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" /> START TRADING NOW
                </Link>
                <Link to="/TradingDashboard" className={`px-8 sm:px-10 py-3.5 sm:py-5 rounded-xl font-black text-xs sm:text-lg flex items-center justify-center gap-2 border transition-all ${darkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 shadow-sm"}`}>
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" /> TRY FREE DEMO
                </Link>
              </div>

              {/* Minimal Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-12 pt-10 border-t border-black/5">
                {[
                  { label: "Setup", val: "5M", color: "text-[#f99616]" },
                  { label: "Min Dep", val: "$5", color: "text-[#f99616]" },
                  { label: "Support", val: "24/7", color: "text-[#f99616]" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-xl sm:text-4xl font-black ${stat.color}`}>{stat.val}</div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`py-8 text-center text-[10px] sm:text-sm font-black border-t uppercase tracking-[0.2em] ${darkMode ? "text-gray-600 border-white/5" : "text-gray-400 border-slate-200"}`}>
        &copy; 2026 Trade Pro. All rights reserved.
      </footer>
    </div>
  );
}
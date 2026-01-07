import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  UserPlus, LogIn, MousePointer, Shield, 
  Wallet, TrendingUp, DollarSign, Banknote, Play 
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Registration",
    description: "Create a free Trade Pro account using your email, or sign up quickly via Google or Facebook.",
    icon: <UserPlus className="w-10 h-10 text-white" />,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Verification",
    description: "Complete your profile. Upload ID and proof of address to secure your account.",
    icon: <Shield className="w-10 h-10 text-white" />,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Deposit",
    description: "Fund your account using your preferred deposit method. Fast and secure processing.",
    icon: <Wallet className="w-10 h-10 text-white" />,
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: 4,
    title: "Trading",
    description: "Select your asset, choose indicators, set amount, and place your increase/decrease order.",
    icon: <TrendingUp className="w-10 h-10 text-white" />,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    title: "Profit",
    description: "Correct forecasts bring instant profit. Earnings are added to your balance immediately.",
    icon: <DollarSign className="w-10 h-10 text-white" />,
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: 6,
    title: "Withdrawal",
    description: "Withdraw funds anytime using the same method as deposit. Reliable and fast.",
    icon: <Banknote className="w-10 h-10 text-white" />,
    gradient: "from-cyan-500 to-blue-600",
  },
];

export default function TradeProLanding() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white font-sans ">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1643962579745-bcaa05ffc573?q=80&w=1600')",
            }}
          ></div>
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#000000]"></div>        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 text-center space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              Quick Start with
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trade Pro
            </span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto px-2">
            Master the financial markets in <span className="text-green-400 font-bold italic">6 Simple Steps</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4 px-4">
            <button 
              onClick={() => navigate("/registration")}
              className="w-full sm:w-auto group relative flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-black transition-all hover:scale-105 active:scale-95"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" /> Registration
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> Log In
            </button>
            <button 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600/20 border border-purple-500/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-purple-300 hover:bg-purple-600/30 transition-all hover:scale-105"
            >
              <MousePointer className="w-4 h-4 sm:w-5 sm:h-5" /> Quick Start
            </button>
          </div>
        </div>
      </section>

      {/* 2. STEPS SECTION */}
      <section className="py-12 sm:py-16 md:py-24 relative px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 md:mb-20 space-y-2 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">Your Trading Journey</h2>
            <p className="text-gray-400 text-base sm:text-lg">Everything you need to go from beginner to pro</p>
          </div>

          <div className="relative">
            {/* Desktop Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>

            <div className="space-y-8 sm:space-y-12 lg:space-y-32">
              {steps.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Card content */}
                  <div className="w-full lg:w-5/12">
                    <div className="bg-[#0a0c1f] border border-white/5 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.gradient} opacity-[0.03] rounded-full -mr-16 -mt-16 blur-3xl group-hover:opacity-10 transition-opacity`}></div>
                      
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 flex items-center justify-center bg-gradient-to-br ${step.gradient} lg:hidden shadow-lg shadow-black`}>
                        {React.cloneElement(step.icon, { className: "w-7 h-7 sm:w-8 sm:h-8" })}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-400 transition-colors">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-base sm:text-lg">{step.description}</p>
                    </div>
                  </div>

                  {/* Desktop Middle Icon */}
                  <div className="hidden lg:flex w-2/12 justify-center relative z-10">
                    <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center bg-gradient-to-br ${step.gradient} shadow-2xl shadow-black transform transition-transform group-hover:scale-110`}>
                      {React.cloneElement(step.icon, { className: "w-10 h-10" })}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-black text-sm">
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
      <section className="py-12 sm:py-16 md:py-24 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden p-6 sm:p-10 md:p-20 border border-white/10 backdrop-blur-sm bg-white/[0.02]">
            <div className="relative z-10 text-center space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
                Get Started Today with <br />
                <span className="text-blue-400 underline decoration-blue-500/30 underline-offset-4 sm:underline-offset-8">Trade Pro</span>
              </h2>
              
              <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto px-2">
                Join thousands of successful traders worldwide. From registration to your first trade in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
                <Link to="/Trading" className="bg-white text-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" /> Start Trading Now
                </Link>
                <Link to="/TradingDashboard" className="bg-white/5 border border-white/10 px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" /> Try Free Demo
                </Link>
              </div>

              {/* Minimal Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 pt-10 sm:pt-16 md:pt-20 border-t border-white/5">
                {[
                  { label: "Setup Time", val: "5 Min", color: "text-green-400" },
                  { label: "Min Deposit", val: "$5", color: "text-blue-400" },
                  { label: "Live Support", val: "24/7", color: "text-purple-400" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1`}>{stat.val}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like bottom gap */}
      <footer className="py-6 sm:py-10 text-center text-gray-600 text-xs sm:text-sm border-t border-white/5">
        &copy; 2025 Trade Pro. All rights reserved.
      </footer>
    </div>
  );
}
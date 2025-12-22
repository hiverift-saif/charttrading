import React, { useState } from 'react';
import { Wallet, TrendingUp, CreditCard, ShieldCheck, Trophy, ChevronRight, Sparkles } from 'lucide-react';

const HowItWorksAndTrusted = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    {
      id: 1,
      icon: Wallet,
      title: "Deposit",
      description: "Open a real account and add funds. We work with more than 20 payment systems.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Trade",
      description: "Trade any of 100 assets and stocks. Use technical analysis and trade the news.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      id: 3,
      icon: CreditCard,
      title: "Withdraw",
      description: "Get funds easily to your bank card or e-wallet. We take no commission.",
      gradient: "from-cyan-400 to-teal-400"
    }
  ];

  return (
    <div className=" bg-black min-h-screen text-white font-sans selection:bg-[#2f96f0] selection:text-white pb-20 relative overflow-hidden">
      
      {/* Animated Background Elements */}
  {/* Animated Background Elements */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl"></div>
</div>


      {/* ==================== 
          SECTION 1: HOW IT WORKS 
      ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
        {/* Section Heading with Decoration */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Start trading in three simple steps and join millions of successful traders
          </p>
        </div>

        {/* 3 Columns Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === step.id;
            
            return (
              <div
                key={step.id}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                className="relative group"
              >
                {/* Card Background with Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-[#1a2332] to-[#0f1419] rounded-2xl p-8 border border-gray-800/50 group-hover:border-blue-500/50 transition-all duration-500 h-full overflow-hidden">
                  
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors duration-500">
                    {step.id}
                  </div>

                  {/* Icon Container with Animated Gradient */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <div className="w-full h-full bg-[#161b26] rounded-2xl flex items-center justify-center">
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Animated Ring */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500`}></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Connecting Arrow for desktop */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ChevronRight size={24} className="text-blue-500/30 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Elegant Divider with Gradient */}
      <div className="max-w-[1200px] mx-auto px-6 my-16 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      {/* ==================== 
          SECTION 2: TRUSTED 
      ==================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          {/* Left Side: Trusted Info */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-[#161b26] rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={28} className="text-blue-400" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                Trusted
              </h2>
            </div>
            
            <div className="text-gray-400 text-lg leading-relaxed mb-8 space-y-2">
              <p>
                <span className="text-white font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">ExpertOption</span> is a leader in the online trading industry.
              </p>
              <p className="flex items-center gap-2">
                We are trusted by more than 
                <span className="text-3xl font-bold text-blue-400 px-2">70M+</span> 
                clients worldwide.
              </p>
            </div>
            
            <a 
              href="/company/about/" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-blue-400 hover:border-blue-400 hover:bg-blue-500/20 font-semibold transition-all duration-300 group"
            >
              Learn More About Us
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Right Side: Award Card */}
          <div className="flex-1 lg:max-w-md relative group">
            {/* Glowing Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-[#1a2332] to-[#0f1419] rounded-2xl p-8 border border-gray-800/50 group-hover:border-yellow-500/50 transition-all duration-500 overflow-hidden">
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-5 relative z-10">
                {/* Trophy Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 p-0.5 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <div className="w-full h-full bg-[#161b26] rounded-2xl flex items-center justify-center">
                    <Trophy size={28} className="text-yellow-400" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    Best Trading Platform
                  </h3>
                  <div className="text-gray-400 text-sm leading-relaxed space-y-1">
                    <p className="font-medium text-gray-300">Award winner at</p>
                    <p className="text-yellow-400/80">China Trading Expo</p>
                    <p className="text-gray-500">Shenzhen, 6-7 May 2017</p>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>

    </div>
  );
};

export default HowItWorksAndTrusted;
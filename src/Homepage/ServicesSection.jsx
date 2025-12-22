import React, { useState } from "react";
import { TrendingUp, Zap, Bitcoin, Bot, ArrowRight, Sparkles } from "lucide-react";

const services = [
  { id: 1, title: "Forex Trading", description: "Trade major currency pairs with tight spreads", icon: TrendingUp, color: "from-blue-600 to-blue-800", glowColor: "shadow-blue-500/50", stats: "50+ Pairs" },
  { id: 2, title: "High-Frequency Trading", description: "Lightning-fast execution for maximum profit", icon: Zap, color: "from-yellow-500 to-orange-600", glowColor: "shadow-orange-500/50", stats: "< 1ms Speed" },
  { id: 3, title: "Crypto Trading", description: "Access 100+ cryptocurrencies 24/7", icon: Bitcoin, color: "from-purple-600 to-pink-600", glowColor: "shadow-purple-500/50", stats: "100+ Coins" },
  { id: 4, title: "Auto Trading", description: "AI-powered bots trade for you automatically", icon: Bot, color: "from-green-600 to-emerald-700", glowColor: "shadow-green-500/50", stats: "AI Powered" },
];

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    // ✅ FIX: Removed Orbs and Animated Grid, kept pure bg-black
    <section className="relative bg-black py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      
      {/* REMOVED: Animated Background Grid and Orbs */}
      
      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-white/70 text-sm font-medium">What We Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            Our <span className="text-[#3F8CFF]">Trading Services</span>
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Professional-grade trading tools designed for both beginners and experts
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;
            
            return (
              <div
                key={service.id}
                className="group relative"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                {/* Card */}
                <div className={`
                  relative h-[340px] rounded-3xl 
                  bg-[#1b1817] /* Solid Dark Color instead of Gradient */
                  border border-[#2e2724]
                  p-6 md:p-8
                  transform transition-all duration-500 ease-out
                  ${isHovered ? 'scale-105 -translate-y-4' : 'scale-100'}
                  cursor-pointer
                  overflow-hidden
                `}>
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between">
                    <div>
                      {/* Icon Container */}
                      <div className={`
                        inline-flex items-center justify-center
                        w-16 h-16 md:w-20 md:h-20
                        bg-black/40
                        rounded-2xl
                        mb-6
                        border border-white/10
                      `}>
                        <Icon size={36} className="text-white" strokeWidth={2} />
                      </div>

                      <div className="inline-flex items-center gap-2 bg-black/30 border border-white/10 rounded-full px-3 py-1.5 mb-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white/90 text-xs font-semibold">{service.stats}</span>
                      </div>

                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight">
                        {service.title}
                      </h3>

                      <p className="text-white/60 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className={`
                      flex items-center gap-2 text-[#3F8CFF] font-semibold
                      transform transition-all duration-300
                    `}>
                      <span className="text-sm">Learn More</span>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-24">
          <button className="group inline-flex items-center gap-3 bg-[#3F8CFF] hover:bg-[#3375d6] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg active:scale-95">
            <span className="text-lg">Start Trading Today</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
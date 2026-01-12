import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronRight, Sparkles, Activity, Zap, DollarSign } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

// --- Improved TrendGraph ---
const TrendGraph = ({ isPositive }) => {
  return (
    <svg viewBox="0 0 80 30" className="w-full h-full" preserveAspectRatio="none">
      <path
        d={isPositive 
          ? "M0,25 Q20,20 40,15 T80,8 L80,30 L0,30 Z"
          : "M0,8 Q20,12 40,18 T80,25 L80,30 L0,30 Z"
        }
        fill={isPositive ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"}
      />
      <path
        d={isPositive 
          ? "M0,25 Q20,20 40,15 T80,8"
          : "M0,8 Q20,12 40,18 T80,25"
        }
        stroke={isPositive ? "#22c55e" : "#ef4444"}
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="80"
        cy={isPositive ? "8" : "25"}
        r="3"
        fill={isPositive ? "#22c55e" : "#ef4444"}
      />
    </svg>
  );
};

// --- Data Configuration ---
const marketData = {
  popular: [
    { id: 1, name: "Bitcoin", symbol: "BTC/USD", price: "90,277.20", high: "90,354.31", change: "+0.09%", isPositive: true, image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png", volume: "$2.4B" },
    { id: 2, name: "XRP", symbol: "XRP/USD", price: "2.00767", high: "2.0313", change: "+1.18%", isPositive: true, image: "https://cryptologos.cc/logos/xrp-xrp-logo.png", volume: "$1.8B" },
    { id: 3, name: "Tether", symbol: "USDT/USD", price: "1.0001", high: "1.0000", change: "-0.01%", isPositive: false, image: "https://cryptologos.cc/logos/tether-usdt-logo.png", volume: "$3.1B" },
    { id: 4, name: "Solana", symbol: "SOL/USD", price: "132.30", high: "132.83", change: "+0.40%", isPositive: true, image: "https://cryptologos.cc/logos/solana-sol-logo.png", volume: "$892M" },
  ],
  crypto: [
    { id: 1, name: "Ethereum", symbol: "ETH/USD", price: "3,100.50", high: "3,150.20", change: "+1.50%", isPositive: true, image: "https://cryptologos.cc/logos/ethereum-eth-logo.png", volume: "$1.9B" },
    { id: 2, name: "Dogecoin", symbol: "DOGE/USD", price: "0.1200", high: "0.1250", change: "-2.10%", isPositive: false, image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png", volume: "$678M" },
  ],
  forex: [
    { id: 1, name: "EUR/USD", symbol: "FX", price: "1.0850", high: "1.0900", change: "-0.05%", isPositive: false, image: "https://cdn-icons-png.flaticon.com/512/197/197615.png", volume: "$4.2B" },
    { id: 2, name: "GBP/USD", symbol: "FX", price: "1.2700", high: "1.2750", change: "+0.12%", isPositive: true, image: "https://cdn-icons-png.flaticon.com/512/197/197374.png", volume: "$3.8B" },
  ]
};

const TradeMarkets = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('popular');

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden w-full
      ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { box-sizing: border-box; }
      `}</style>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-[#f99616]/10 border border-[#f99616]/20 mb-3 sm:mb-6">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-[#f99616]" />
            <span className="text-[10px] sm:text-sm text-[#f99616] font-bold uppercase tracking-wider">Live Markets</span>
          </div>
          
          <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic uppercase mb-2 sm:mb-4 md:mb-6 leading-tight px-2 transition-colors
            ${darkMode ? "text-white" : "text-black"}`}>
            Trade the Markets{' '}
            <span className="text-[#f99616]">You Love</span>
          </h1>
          
          <p className={`text-xs sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 font-bold uppercase tracking-tight opacity-60 transition-colors
            ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Real-time market data across 100+ assets with institutional-grade execution
          </p>
        </div>

        {/* Responsive Tabs */}
        <div className="mb-6 sm:mb-10 md:mb-12">
          <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto hide-scrollbar pb-2">
            {[
              { key: 'popular', label: 'Popular', icon: Sparkles },
              { key: 'crypto', label: 'Crypto', icon: Zap },
              { key: 'forex', label: 'Forex', icon: DollarSign }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-shrink-0 px-3 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap 
                  ${activeTab === key
                    ? 'bg-[#f99616] text-white shadow-xl shadow-orange-500/20'
                    : (darkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-gray-100')
                  }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW (Cards) */}
        <div className="lg:hidden space-y-3 mb-8">
          {marketData[activeTab].map((item) => (
            <div
              key={item.id}
              className={`backdrop-blur-xl rounded-2xl border p-3 sm:p-5 transition-all duration-300
                ${darkMode 
                  ? "bg-[#0d0d0d] border-gray-800" 
                  : "bg-white border-gray-100 shadow-xl"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/5 p-1" />
                  <div>
                    <h3 className={`text-sm sm:text-lg font-black uppercase italic transition-colors ${darkMode ? "text-white" : "text-black"}`}>{item.name}</h3>
                    <p className="text-[10px] sm:text-sm text-gray-500 font-bold uppercase">{item.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base sm:text-xl font-black italic transition-colors ${darkMode ? "text-white" : "text-black"}`}>${item.price}</p>
                  <div className={`flex items-center justify-end gap-1 text-[10px] sm:text-sm font-bold ${item.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change}
                  </div>
                </div>
              </div>
              <div className="h-12 sm:h-20 mb-3 rounded-lg overflow-hidden">
                <TrendGraph isPositive={item.isPositive} />
              </div>
              <button className="w-full py-2 sm:py-3 bg-[#f99616] rounded-xl font-black uppercase text-xs sm:text-base tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group text-white shadow-lg shadow-orange-500/20">
                Trade {item.name}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW (Table) */}
        <div className="hidden lg:block">
          <div className={`backdrop-blur-xl rounded-[2rem] border overflow-hidden transition-all
            ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-2xl"}`}>
            <table className="w-full">
              <thead>
                <tr className={`border-b transition-colors ${darkMode ? "border-gray-800 bg-white/5" : "border-gray-100 bg-gray-50"}`}>
                  <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-gray-500">Asset</th>
                  <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-gray-500">Price</th>
                  <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-gray-500">24h High</th>
                  <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-gray-500">24h Change</th>
                  <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-gray-500">Chart</th>
                  <th className="text-left py-4 px-6 text-xs font-black uppercase tracking-widest text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {marketData[activeTab].map((item) => (
                  <tr
                    key={item.id}
                    className={`group border-b transition-all duration-300 
                      ${darkMode ? "border-gray-800 hover:bg-white/5" : "border-gray-50 hover:bg-gray-50/50"}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full bg-white/5 p-1.5" />
                        <div>
                          <p className={`font-black uppercase italic transition-colors ${darkMode ? "text-white" : "text-black"}`}>{item.name}</p>
                          <p className="text-sm text-gray-500 font-bold uppercase">{item.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className={`font-black text-lg italic transition-colors ${darkMode ? "text-white" : "text-black"}`}>${item.price}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className={`font-bold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>${item.high}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black ${item.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {item.change}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-24 h-12">
                        <TrendGraph isPositive={item.isPositive} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button className="px-6 py-2 bg-[#f99616] text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/20">
                        Trade
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className={`w-full mt-6 py-4 border-2 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 
            ${darkMode ? "border-gray-800 text-gray-400 hover:border-[#f99616] hover:text-[#f99616]" : "border-gray-200 text-gray-500 hover:border-[#f99616] hover:text-[#f99616]"}`}>
            View All Assets
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16 md:mt-20">
          {[
            { icon: Zap, title: 'Instant Execution', desc: 'Trade in milliseconds', color: 'from-[#f99616] to-orange-400' },
            { icon: Activity, title: 'Real-Time Data', desc: 'Live prices updated every second', color: 'from-orange-500 to-yellow-500' },
            { icon: Sparkles, title: 'Zero Fees', desc: 'No hidden charges or commissions', color: 'from-gray-700 to-black' },
            { icon: TrendingUp, title: 'Up 95% Gain', desc: 'Earn max profit on successful trades', color: 'from-green-500 to-emerald-500' }
          ].map((feature, i) => (
            <div
              key={i}
              className={`p-4 sm:p-6 rounded-[2rem] border transition-all duration-300 group
                ${darkMode 
                  ? "bg-[#0d0d0d] border-gray-800 hover:border-[#f99616]/50" 
                  : "bg-white border-gray-100 shadow-xl hover:border-[#f99616]"}`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className={`text-sm sm:text-base font-black uppercase italic mb-1 sm:mb-2 transition-colors ${darkMode ? "text-white" : "text-black"}`}>
                {feature.title}
              </h3>
              <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-tight transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeMarkets;
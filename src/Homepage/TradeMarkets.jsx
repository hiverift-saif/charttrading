import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronRight, Sparkles, Activity, Zap, DollarSign } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('popular');
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden w-full">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { box-sizing: border-box; }
      `}</style>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-3 sm:mb-6">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
            <span className="text-[10px] sm:text-sm text-green-400 font-medium">Live Markets</span>
          </div>
          
          {/* UPDATED: Mobile text-2xl, Desktop text-6xl */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 md:mb-6 text-white leading-tight px-2">
            Trade the Markets{' '}
            <span className="text-[#3F8CFF]">
              You Love
            </span>
          </h1>
          
          {/* UPDATED: Mobile text-xs, Desktop text-xl */}
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
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
                // UPDATED: Mobile text-xs, padding reduced
                className={`flex-shrink-0 px-3 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-white text-black shadow-lg shadow-white/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* =======================
            MOBILE VIEW (Cards)
           ======================= */}
        <div className="lg:hidden space-y-3 mb-8">
          {marketData[activeTab].map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-3 sm:p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* UPDATED: Mobile image smaller (w-8 h-8) */}
                  <img src={item.image} alt={item.name} className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/5 p-1" />
                  <div>
                    {/* UPDATED: Mobile text-sm */}
                    <h3 className="text-sm sm:text-lg font-bold text-white">{item.name}</h3>
                    {/* UPDATED: Mobile text-[10px] */}
                    <p className="text-[10px] sm:text-sm text-gray-400">{item.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  {/* UPDATED: Mobile text-base */}
                  <p className="text-base sm:text-xl font-bold text-white">${item.price}</p>
                  <div className={`flex items-center justify-end gap-1 text-[10px] sm:text-sm font-semibold ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {item.isPositive ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                    {item.change}
                  </div>
                </div>
              </div>

              {/* Graph Container */}
              <div className="h-12 sm:h-20 mb-3 rounded-lg overflow-hidden">
                <TrendGraph isPositive={item.isPositive} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3 p-2 bg-white/[0.02] rounded-lg border border-white/5">
                <div>
                  <p className="text-[10px] text-gray-500 mb-0.5">High</p>
                  {/* UPDATED: Mobile text-xs */}
                  <p className="text-xs sm:text-base font-semibold text-white">${item.high}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 mb-0.5">Vol</p>
                  {/* UPDATED: Mobile text-xs */}
                  <p className="text-xs sm:text-base font-semibold text-white">{item.volume}</p>
                </div>
              </div>

              {/* Action Button */}
              {/* UPDATED: Mobile text-xs, padding reduced */}
              <button className="w-full py-2 sm:py-3 bg-[#3F8CFF] hover:bg-[#3375d6] rounded-lg font-semibold text-xs sm:text-base transition-all duration-300 flex items-center justify-center gap-2 group text-white">
                Trade {item.name}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
          {/* View All Button */}
          <button className="w-full py-3 border-2 border-white/10 hover:border-white/30 rounded-xl font-semibold text-xs sm:text-base transition-all duration-300 hover:bg-white/5">
            View All Assets
          </button>
        </div>

        {/* =======================
            DESKTOP VIEW (Table)
           ======================= */}
        <div className="hidden lg:block">
          {/* ... (Same as before, desktop remains standard size) ... */}
          <div className="flex items-center justify-between mb-6 p-4 bg-white/[0.02] rounded-xl border border-white/5">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-400">Live Prices</p>
                <p className="text-xs text-gray-500">Updated every second</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-400">24h Volume:</span>
                <span className="ml-2 text-white font-semibold">$42.8B</span>
              </div>
              <div>
                <span className="text-gray-400">Markets:</span>
                <span className="ml-2 text-white font-semibold">100+</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Asset</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">24h High</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">24h Change</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Volume</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Chart</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Trade</th>
                </tr>
              </thead>
              <tbody>
                {marketData[activeTab].map((item) => (
                  <tr
                    key={item.id}
                    onMouseEnter={() => setHoveredRow(item.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className="group border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full bg-white/5 p-1.5" />
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-sm text-gray-400">{item.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-white text-lg">${item.price}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-300">${item.high}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold ${item.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {item.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {item.change}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-300">{item.volume}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-24 h-12">
                        <TrendGraph isPositive={item.isPositive} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button className="px-6 py-2 bg-[#3F8CFF] hover:bg-[#3375d6] text-white rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2">
                        Trade
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-6 py-4 border-2 border-white/10 hover:border-white/30 rounded-xl font-semibold transition-all duration-300 hover:bg-white/5">
            View All Assets
          </button>
        </div>

        {/* Feature Cards Grid */}
     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16 md:mt-20">
  {[
    { icon: Zap, title: 'Instant Execution', desc: 'Trade in milliseconds', color: 'from-yellow-500 to-orange-500' },
    { icon: Activity, title: 'Real-Time Data', desc: 'Live prices updated every second', color: 'from-green-500 to-emerald-500' },
    { icon: Sparkles, title: 'Zero Fees', desc: 'No hidden charges or commissions', color: 'from-blue-500 to-purple-500' },
    { icon: TrendingUp, title: 'Up 95% Gain 📈', desc: 'Earn up to 95% profit on successful trades', color: 'from-green-500 to-emerald-500' }
  ].map((feature, i) => (
    <div
      key={i}
      className="p-4 sm:p-6 bg-white/[0.02] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group"
    >
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>

      <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">
        {feature.title}
      </h3>

      <p className="text-xs sm:text-sm text-gray-400">
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
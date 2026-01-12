import React from 'react';
import { Globe, TrendingUp, CheckCircle2, ArrowRight, Shield, BarChart3, Coins, Landmark } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MultipleAssetsPage = () => {
  const { darkMode } = useTheme();
  const accent = "#f99616";

  const assetClasses = [
    { name: "Cryptocurrencies", items: "BTC, ETH, SOL, USDT", icon: <Coins size={24}/>, desc: "Trade 24/7 with high volatility and deep liquidity." },
    { name: "Foreign Exchange", items: "EUR/USD, GBP/JPY, USD/INR", icon: <Globe size={24}/>, desc: "Access the world's largest financial market with tight spreads." },
    { name: "Commodities", items: "Gold, Silver, Brent Oil", icon: <Landmark size={24}/>, desc: "Hedge against inflation with precious metals and energy." },
    { name: "Stock Indices", items: "S&P 500, NASDAQ, DAX", icon: <BarChart3 size={24}/>, desc: "Speculate on the performance of global economy sectors." }
  ];

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.3em] text-xs mb-4">Market Universe</h4>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-none">
            One Platform. <span className="text-[#f99616]">Unlimited</span> Assets.
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold uppercase text-xs md:text-sm leading-relaxed">
            From the heartbeat of Wall Street to the digital frontier of Crypto, access over 100+ global instruments with 0.01s execution speed.
          </p>
        </div>

        {/* ASSET GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {assetClasses.map((asset, i) => (
            <div key={i} className={`p-8 rounded-[2rem] border transition-all hover:-translate-y-2 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-xl"}`}>
              <div className="text-[#f99616] mb-6">{asset.icon}</div>
              <h3 className="text-xl font-black uppercase italic mb-2">{asset.name}</h3>
              <p className="text-[10px] font-black text-[#f99616] mb-4 uppercase tracking-widest">{asset.items}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{asset.desc}</p>
            </div>
          ))}
        </div>

        {/* WHY TRADE SECTION */}
        <div className={`rounded-[3rem] p-10 md:p-20 border ${darkMode ? "bg-gradient-to-br from-[#0d0d0d] to-black border-gray-800" : "bg-orange-50 border-orange-100"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase italic mb-8 leading-tight">Institutional Grade <br/><span className="text-[#f99616]">Liquidity</span></h2>
              <div className="space-y-6">
                {[
                  "No Re-quotes or rejections during high volatility",
                  "Deep order books for large position sizes",
                  "Negative balance protection on all accounts",
                  "Advanced charting tools for every asset class"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-[#f99616] rounded-full p-1 text-white"><CheckCircle2 size={16}/></div>
                    <span className="text-xs font-black uppercase tracking-wide">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#f99616]/20 blur-[100px] rounded-full group-hover:bg-[#f99616]/30 transition-all"></div>
              <div className={`relative z-10 p-8 rounded-3xl border text-center ${darkMode ? "bg-black border-gray-700" : "bg-white border-gray-200 shadow-2xl"}`}>
                <p className="text-5xl font-black text-[#f99616] mb-2">100+</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Live Tradeable Assets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MultipleAssetsPage;
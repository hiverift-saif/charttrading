import React from 'react';
import { 
  Clock, ArrowRight, TrendingUp, ShieldCheck, 
  Zap, CandlestickChart, Activity, Newspaper, 
  PlayCircle, BookMarked, ChevronRight 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  const { darkMode } = useTheme();

  const posts = [
    {
      id: 1,
      category: "Analysis",
      title: "Bitcoin Support Levels: Analyzing the $95k Barrier",
      excerpt: "The current market structure suggests a strong accumulation zone at the Fibonacci level.",
      date: "Jan 08, 2026",
      readTime: "6 min",
      icon: <CandlestickChart size={18} />
    },
    {
      id: 2,
      category: "Strategy",
      title: "The 1-Minute Scalping Method with RSI",
      excerpt: "Learn how to filter out market noise using the 50/200 EMA crossover on the M1 timeframe.",
      date: "Jan 05, 2026",
      readTime: "10 min",
      icon: <Activity size={18} />
    },
    {
      id: 3,
      category: "Risk",
      title: "The Mathematics of Drawdown & Survival",
      excerpt: "A 50% loss requires a 100% gain to recover. Master the 1% risk management rule.",
      date: "Jan 02, 2026",
      readTime: "5 min",
      icon: <ShieldCheck size={18} />
    }
  ];

  return (
    <div className={`min-h-screen pt-20 pb-12 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-12">
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.3em] text-[9px] mb-2">Market Intelligence</h4>
          <h1 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            Trading <span className="text-[#f99616]">Hub</span>
          </h1>
          
          {/* Ticker - Sleek & Smaller */}
          <div className={`mt-6 flex items-center gap-3 p-2 px-4 rounded-lg border overflow-hidden ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-100 shadow-sm"}`}>
             <span className="flex items-center gap-1.5 text-[8px] font-black text-[#f99616] uppercase border-r border-gray-700 pr-3 shrink-0">
                <Newspaper size={12}/> News
             </span>
             <marquee className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                • BTC/USDT hits $98,500 resistance • Gold stable above $2000 • FED decision tonight...
             </marquee>
          </div>
        </div>

        {/* --- 2. FEATURED CARD (REFINED) --- */}
        <div className={`p-6 md:p-12 rounded-2xl md:rounded-[3rem] border mb-10 group relative overflow-hidden ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-lg"}`}>
           <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
              <div className="space-y-4 md:space-y-6 flex-1">
                 <div className="flex items-center gap-2 text-[#f99616]">
                    <Zap size={14} fill="currentColor" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Institutional Analysis</span>
                 </div>
                 <h2 className="text-2xl md:text-5xl font-black uppercase italic leading-tight">
                   The 2026 <span className="text-[#f99616]">Market</span> Outlook
                 </h2>
                 <p className="text-gray-500 text-[10px] md:text-sm font-medium leading-relaxed max-w-xl">
                    Deep dive into macroeconomic shifts. Learn how AI-driven algorithmic trading and CBDCs are shaping the future of global finance.
                 </p>
                 <button className="bg-[#f99616] text-white px-6 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest flex items-center gap-2 active:scale-95 shadow-lg shadow-orange-500/20">
                    Read Analysis <ArrowRight size={14} />
                 </button>
              </div>
           </div>
        </div>

        {/* --- 3. VIDEO MASTERCLASS (MOBILE OPTIMIZED) --- */}
        <div className="mb-10">
           <h3 className="text-sm md:text-xl font-black uppercase italic mb-6">Video <span className="text-[#f99616]">Masterclass</span></h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Candlestick Secrets", d: "Price action mastery.", time: "12:45" },
                { t: "Risk Management", d: "Protect your capital.", time: "08:20" }
              ].map((vid, idx) => (
                <div key={idx} className={`p-4 rounded-xl border transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                   <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 shrink-0 bg-[#f99616]/10 rounded-xl flex items-center justify-center text-[#f99616]">
                         <PlayCircle size={28} />
                         <span className="absolute bottom-1 right-1 text-[7px] font-black bg-black text-white px-1 rounded">{vid.time}</span>
                      </div>
                      <div className="flex-1">
                         <h4 className="text-[11px] font-black uppercase italic mb-0.5">{vid.t}</h4>
                         <p className="text-[9px] text-gray-500 font-bold uppercase">{vid.d}</p>
                         <button className="mt-2 text-[8px] font-black text-[#f99616] uppercase flex items-center gap-1">Watch <ChevronRight size={10}/></button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* --- 4. BLOG GRID (COMPACT SLEEK CARDS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
           {posts.map((post) => (
             <div key={post.id} className={`p-5 rounded-2xl border transition-all hover:border-[#f99616]/30 flex flex-col ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-md" : "bg-white border-gray-100 shadow-sm"}`}>
                <div className="flex items-center justify-between mb-4">
                   <div className="p-2 rounded-lg bg-[#f99616]/10 text-[#f99616]">{post.icon}</div>
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{post.category}</span>
                </div>
                
                <h3 className="text-[13px] md:text-sm font-black uppercase italic leading-snug mb-3">
                  {post.title}
                </h3>
                
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed mb-6 flex-1 uppercase tracking-tight italic line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-gray-800/20 flex items-center justify-between">
                   <span className="text-[8px] font-black text-[#f99616]">{post.date}</span>
                   <div className="flex items-center gap-1.5 text-[8px] text-gray-500 font-black">
                      <Clock size={10} /> {post.readTime}
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* --- 5. COMPACT GLOSSARY --- */}
        <div className={`p-6 rounded-2xl border ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
           <h3 className="text-[10px] md:text-xs font-black uppercase italic mb-6 tracking-widest">Trader's <span className="text-[#f99616]">Glossary</span></h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { w: "Scalping", d: "Fast short trades." },
                { w: "Leverage", d: "Borrowed capital." },
                { w: "Spread", d: "Price gap." },
                { w: "Margin", d: "Collateral fund." }
              ].map((item, i) => (
                <div key={i}>
                   <p className="text-[9px] font-black uppercase text-[#f99616] mb-1">{item.w}</p>
                   <p className="text-[8px] text-gray-500 font-bold leading-tight uppercase">{item.d}</p>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Blog;
import React, { useState } from 'react';
import { 
  Wrench, LineChart, BarChart3, Zap, 
  MousePointer2, Bell, Cpu, ArrowRight, 
  ArrowLeft, Search, Layers 
} from 'lucide-react';

const TradingTools = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const toolCategories = [
    {
      title: "Technical Toolkit",
      desc: "Market patterns aur price action ko sateek tareeke se identify karein.",
      tools: [
        { name: "50+ Indicators", desc: "RSI, MACD, EMA...", icon: <BarChart3 size={16}/> },
        { name: "Drawing Tools", desc: "Fibonacci, Trendlines", icon: <Layers size={16}/> },
        { name: "Multi-Chart", desc: "4 Charts simultaneously", icon: <Layers size={16}/> },
        { name: "One-Click Trade", desc: "Instant execution", icon: <Zap size={16}/> }
      ]
    },
    {
      title: "AI Analysis Tools",
      desc: "Smart data aur sentiment analysis se market ki agli chal samjhein.",
      tools: [
        { name: "AI Signals", desc: "Entry/Exit Alerts", icon: <Cpu size={16}/> },
        { name: "Price Alerts", desc: "Push Notifications", icon: <Bell size={16}/> },
        { name: "Heatmap", desc: "Global asset trends", icon: <Search size={16}/> },
        { name: "Smart Click", desc: "Auto-risk management", icon: <MousePointer2 size={16}/> }
      ]
    }
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev === 0 ? 1 : 0));

  return (
    <section className="bg-[#050505] min-h-screen py-16 px-4 sm:px-8 font-sans selection:bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- MAIN CONTAINER --- */}
        <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-16 shadow-[0_0_80px_-20px_rgba(234,179,8,0.15)]">
          
          {/* Subtle Background Glow */}
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-yellow-500/5 blur-[120px]" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* --- LEFT CONTENT: TOOLS LIST --- */}
            <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-whiteshadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  <Wrench size={24} className="text-black" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none tracking-tighter">
                  PRO <span className="text-white ">TRADING</span> <br /> 
                  <span className="text-white">TOOLKIT</span>
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-gray-500">
                  {toolCategories[activeSlide].desc} Data-driven decision lein aur market performance ko automate karein.
                </p>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toolCategories[activeSlide].tools.map((tool, i) => (
                  <div key={i} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-yellow-500/30">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-bg-white group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-white">{tool.name}</h4>
                      <p className="text-[9px] text-gray-600 font-bold uppercase">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex gap-2">
                  <button onClick={nextSlide} className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 text-gray-400"><ArrowLeft size={18}/></button>
                  <button onClick={nextSlide} className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 text-gray-400"><ArrowRight size={18}/></button>
                </div>
                <div className="flex gap-1.5">
                  <div className={`h-1.5 w-8 rounded-full transition-all ${activeSlide === 0 ? 'bg-white' : 'bg-gray-800'}`} />
                  <div className={`h-1.5 w-8 rounded-full transition-all ${activeSlide === 1 ? 'bg-white' : 'bg-gray-800'}`} />
                </div>
              </div>
            </div>

            {/* --- RIGHT CONTENT: AI VISUAL PREVIEW --- */}
            <div className="relative animate-in zoom-in duration-700">
              <div className="rounded-[2.5rem] border border-white/10 bg-black p-2 shadow-2xl">
                <div className="rounded-[2.2rem] bg-gradient-to-b from-[#0a0a0a] to-black p-8 space-y-8">
                  
                  {/* AI Status Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Live</span>
                    </div>
                    <Cpu size={20} className="text-yellow-500/50" />
                  </div>

                  {/* Visual Chart Mockup */}
                  <div className="space-y-4">
                     <div className="flex items-end gap-1.5 h-32">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                          <div key={i} className="flex-1 bg-yellow-500/10 rounded-t-lg relative group transition-all" style={{height: `${h}%`}}>
                             <div className="absolute top-0 w-full h-1 bg-white rounded-full blur-[2px] opacity-0 group-hover:opacity-100" />
                          </div>
                        ))}
                     </div>
                     <div className="h-px bg-white/5 w-full" />
                  </div>

                  {/* Feature Preview List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <LineChart className="text-blue-500" size={20} />
                        <div>
                          <p className="text-[10px] font-black uppercase text-white">Smart Signals</p>
                          <p className="text-[9px] text-gray-500 font-bold">Accuracy: 94.2%</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-green-500 uppercase">Active</span>
                    </div>
                    
                    <button className="w-full rounded-2xl bg-white py-5 text-xs font-black uppercase tracking-widest text-black shadow-xl shadow-yellow-500/20 hover:bg-ywhite hover:scale-[1.02] transition-all">
                      Unlock All Pro Tools
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingTools;
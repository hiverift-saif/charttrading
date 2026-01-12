import React, { useState } from 'react';
import { 
  Wrench, LineChart, BarChart3, Zap, 
  MousePointer2, Bell, Cpu, ArrowRight, 
  ArrowLeft, Search, Layers 
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

const TradingTools = () => {
  const { darkMode } = useTheme();
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
    <section className={`min-h-screen py-16 px-4 sm:px-8 font-sans transition-colors duration-500
      ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      
      <div className="max-w-7xl mx-auto">
        
        {/* --- MAIN CONTAINER --- */}
        <div className={`relative overflow-hidden rounded-[3rem] border p-8 md:p-16 transition-all duration-500
          ${darkMode 
            ? "bg-[#0a0a0b] border-white/5 shadow-[0_0_80px_-20px_rgba(249,150,22,0.15)]" 
            : "bg-gray-50 border-gray-200 shadow-xl"}`}>
          
          {/* Subtle Background Glows */}
          <div className={`absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[120px] transition-opacity 
            ${darkMode ? "bg-[#f99616]/5" : "bg-orange-500/10"}`} />
          <div className={`absolute -right-20 -bottom-20 h-96 w-96 rounded-full blur-[120px] transition-opacity
            ${darkMode ? "bg-blue-500/5" : "bg-blue-500/10"}`} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* --- LEFT CONTENT: TOOLS LIST --- */}
            <div className="space-y-10">
              <div className="space-y-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-colors
                  ${darkMode ? "bg-[#f99616] text-black" : "bg-black text-white"}`}>
                  <Wrench size={24} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none tracking-tighter">
                  PRO <span className={darkMode ? "text-white" : "text-black"}>TRADING</span> <br /> 
                  <span className="text-[#f99616]">TOOLKIT</span>
                </h2>
                <p className={`max-w-md text-sm leading-relaxed font-bold uppercase tracking-tight transition-colors
                  ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {toolCategories[activeSlide].desc} Data-driven decision lein aur market performance ko automate karein.
                </p>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toolCategories[activeSlide].tools.map((tool, i) => (
                  <div key={i} className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:scale-[1.02]
                    ${darkMode 
                      ? "border-white/5 bg-white/[0.02] hover:border-[#f99616]/30 hover:bg-white/[0.05]" 
                      : "border-gray-200 bg-white shadow-sm hover:border-[#f99616] hover:shadow-md"}`}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:rotate-12
                      ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-[#f99616]"}`}>
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className={`text-[11px] font-black uppercase tracking-wider ${darkMode ? "text-white" : "text-black"}`}>{tool.name}</h4>
                      <p className="text-[9px] text-gray-500 font-bold uppercase">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex gap-2">
                  <button onClick={nextSlide} className={`h-10 w-10 flex items-center justify-center rounded-full border transition-all active:scale-90
                    ${darkMode ? "border-white/10 hover:bg-white/5 text-gray-400" : "border-gray-200 hover:bg-gray-100 text-black"}`}>
                    <ArrowLeft size={18}/>
                  </button>
                  <button onClick={nextSlide} className={`h-10 w-10 flex items-center justify-center rounded-full border transition-all active:scale-90
                    ${darkMode ? "border-white/10 hover:bg-white/5 text-gray-400" : "border-gray-200 hover:bg-gray-100 text-black"}`}>
                    <ArrowRight size={18}/>
                  </button>
                </div>
                <div className="flex gap-1.5">
                  <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${activeSlide === 0 ? (darkMode ? 'bg-[#f99616]' : 'bg-black') : 'bg-gray-800/30'}`} />
                  <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${activeSlide === 1 ? (darkMode ? 'bg-[#f99616]' : 'bg-black') : 'bg-gray-800/30'}`} />
                </div>
              </div>
            </div>

            {/* --- RIGHT CONTENT: AI VISUAL PREVIEW --- */}
            <div className="relative">
              <div className={`rounded-[2.5rem] border p-2 shadow-2xl transition-all duration-500
                ${darkMode ? "border-white/10 bg-black" : "border-gray-200 bg-gray-100"}`}>
                <div className={`rounded-[2.2rem] p-8 space-y-8 transition-colors
                  ${darkMode ? "bg-gradient-to-b from-[#0a0a0a] to-black" : "bg-white"}`}>
                  
                  {/* AI Status Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Live</span>
                    </div>
                    <Cpu size={20} className="text-[#f99616]/50" />
                  </div>

                  {/* Visual Chart Mockup */}
                  <div className="space-y-4">
                     <div className="flex items-end gap-1.5 h-32">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                          <div key={i} className={`flex-1 rounded-t-lg relative group transition-all duration-500
                            ${darkMode ? "bg-[#f99616]/10 hover:bg-[#f99616]/30" : "bg-black/5 hover:bg-[#f99616]/20"}`} 
                            style={{height: `${h}%`}}>
                             <div className={`absolute top-0 w-full h-1 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity
                               ${darkMode ? "bg-white" : "bg-[#f99616]"}`} />
                          </div>
                        ))}
                     </div>
                     <div className={`h-px w-full ${darkMode ? "bg-white/5" : "bg-gray-100"}`} />
                  </div>

                  {/* Feature Preview List */}
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-colors
                      ${darkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
                      <div className="flex items-center gap-3">
                        <LineChart className="text-blue-500" size={20} />
                        <div>
                          <p className={`text-[10px] font-black uppercase ${darkMode ? "text-white" : "text-black"}`}>Smart Signals</p>
                          <p className="text-[9px] text-gray-500 font-bold">Accuracy: 94.2%</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-black text-green-500 uppercase">Active</span>
                    </div>
                    
                    <button className={`w-full rounded-2xl py-5 text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95
                      ${darkMode 
                        ? "bg-white text-black shadow-orange-500/10 hover:bg-[#f99616] hover:text-white" 
                        : "bg-black text-white shadow-black/20 hover:bg-[#f99616]"}`}>
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
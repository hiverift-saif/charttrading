import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";

// --- 1. DATA (Assets List) ---
const assets = [
  {
    name: "GBP/USD (OTC)",
    percent: "0.97%",
    isPositive: true,
    icon: "https://static.cdnroute.io/files/storage/public/d4/ip/hg7pmemvhkajp0d0.svg",
  },
  {
    name: "Bitcoin",
    percent: "0.01%",
    isPositive: true,
    icon: "https://static.cdnroute.io/files/storage/public/5b/50/81f9b71a0.svg",
  },
  {
    name: "EUR/USD (OTC)",
    percent: "0.59%",
    isPositive: true,
    icon: "https://static.cdnroute.io/files/storage/public/5d/5a/914b4b8fd8g9h9i6e0.svg",
  },
  {
    name: "US 100",
    percent: "-0.29%",
    isPositive: false,
    icon: "https://static.cdnroute.io/files/storage/public/5b/8d/4b55a6f28.svg",
  },
  {
    name: "Gold",
    percent: "0.91%",
    isPositive: true,
    icon: "https://static.cdnroute.io/files/storage/public/5b/50/7e71eb40b.svg",
  },
];

const HeroSection = () => {
  // --- 2. TIMER LOGIC ---
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % assets.length);
    }, 3000); // 3 Seconds speed
    return () => clearInterval(interval);
  }, []);

  const currentAsset = assets[currentIndex];





// ... (Logic and Assets same)

  return (
    // CHANGE 1: 'justify-start' for mobile, 'min-h-0' (taki extra space na bache niche)
    <div className=" md:min-h-screen w-full bg-black text-[#eceae9] font-sans flex flex-col items-center justify-start md:justify-center px-4 pt-4 md:pt-0">
      
      {/* SECTION 1: ANIMATED CARD */}
      <div className="mt-2 mb-3 flex items-center justify-center">
        <div 
          key={currentAsset.name}
          className="flex items-center gap-3 bg-black border border-[#403935] rounded-full px-3 py-1.5 shadow-lg min-w-10 animate-fade-up cursor-pointer hover:bg-[#2e2724] transition-colors"
        >
          <img src={currentAsset.icon} alt={currentAsset.name} className="w-6 h-6 md:w-8 md:h-8" />
          <p className="text-[#eceae9] font-medium text-xs md:text-sm whitespace-nowrap">{currentAsset.name}</p>
          <div className={`flex items-center gap-1 text-[10px] md:text-xs font-bold ${currentAsset.isPositive ? "text-[#5ddf38]" : "text-[#ff4747]"}`}>
            <span>{currentAsset.percent}</span>
            {currentAsset.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          </div>
        </div>
      </div>

      {/* SECTION 2: MAIN TITLE */}
      <h1 className="text-[#cccac9] text-[32px] sm:text-[40px] md:text-[70px] leading-[1.1] md:leading-tight font-bold tracking-tight text-center w-full md:max-w-4xl mx-auto mb-5 font-nunito-custom">
        Your Gateway to <br className="hidden md:block" /> Digital Options Trading
      </h1>

      {/* 4. BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
        <button className="w-full sm:w-auto font-moderustic bg-[linear-gradient(to_right,#ff7e13,#ff3d00)] text-white font-semibold text-sm md:text-base py-2.5 px-6 md:py-3 md:px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-900/20">
          Start Trading Free
        </button>
        <button className="w-full sm:w-auto bg-[#26211f] hover:bg-[#2e2724] text-white font-medium text-sm md:text-base py-2.5 px-6 md:py-3 md:px-8 font-moderustic rounded-xl transition-all border border-[#38312e] active:scale-95">
          Open Demo Account
        </button>
      </div>

      {/* 5. TRUSTPILOT RATING */}
      {/* CHANGE 2: Padding vertical 'py-4' (kam kiya) */}
      <div className="flex items-center gap-2 text-[#afadac] text-xs md:text-sm font-medium py-4 md:py-5">
        <div className="bg-[#00b67a] p-1 rounded-sm">
          <Star size={14} className="text-white fill-white md:w-4 md:h-4" />
        </div>
        <span className="text-sm md:text-md">4.5 ★ on Trustpilot</span>
      </div>

      {/* SECTION 3: VIDEO */}
      {/* CHANGE 3: 'mb-8' ko 'mb-2' kiya (Bottom gap drastically reduced) */}
      <div className="w-full flex justify-center mb-2 px-2 md:px-4">
        <div className="relative w-full max-w-[1100px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl p-2 md:p-4 shadow-2xl">
          <div className="relative w-full h-[200px] md:h-[420px] bg-black rounded-xl md:rounded-2xl overflow-hidden border border-white/5">
            <video src="https://bvmwebsolutions.com/equlix/new/images/equlix.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
          </div>
        </div>
      </div>
      
      {/* Animation Styles */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
// ...
};




export default HeroSection;
import React, { useState, useEffect } from "react";
import {
  Clock,
  Target,
  Info,
  CircleDollarSign,
  X,
} from "lucide-react";

const HomeContent = () => {
  // --- State for rotating images on the right card ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // The two images provided
  const bannerImages = [
    "https://iqcent.com/assets/env/iqcent/main/img/trump-musk-new.png",
    "https://iqcent.com/assets/env/iqcent/main/img/pool-queue.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Changed main background to BLACK (#050505)
    <div className="bg-black font-sans overflow-hidden min-h-screen">
      {/* Load Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');
          .font-open-sans { font-family: 'Open Sans', sans-serif; }
        `}
      </style>

      <section className="py-10 md:py-16 px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Headline - Changed text to White */}
          <h2 className="text-center text-2xl md:text-4xl font-bold text-white mb-10 md:mb-16 font-open-sans">
            A new way to trade:{" "}
            <span className="text-[#f5a623] block md:inline mt-2 md:mt-0">
              up to 2500% in 15sec
            </span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
            
            {/* ==================== Left Column: Feature Cards ==================== */}
            <div className="flex flex-col space-y-4 md:space-y-6 lg:w-5/12 w-full justify-between">
              
              {/* Card 1 */}
              {/* Bg changed to #111 (Dark Grey), Border dark, Text White */}
              <div className="bg-[#111111] p-4 md:p-5 lg:p-4 xl:p-6 rounded-2xl border border-[#333] hover:border-[#8e24aa] hover:bg-[#161616] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center space-x-4 md:space-x-6 hover:shadow-lg transition-all h-full group">
                {/* Responsive Icon Box */}
                <div className="bg-gradient-to-br from-[#8e24aa] to-[#ab47bc] p-4 md:p-6 lg:p-8 rounded-xl shrink-0 shadow-md shadow-purple-900/20 transition-transform group-hover:scale-105">
                  <CircleDollarSign 
                    strokeWidth={1.5} 
                    className="text-white w-10 h-10 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]" 
                  />
                </div>
                <div>
                  <div className="mb-1 md:mb-2">
                    {/* Darker Badge Background for contrast */}
                    <span className="text-[10px] md:text-[12px] font-bold text-[#d6bbfb] bg-[#2d1b36] px-2 py-0.5 rounded-full border border-[#4a235a] uppercase tracking-wide font-open-sans">
                      Pool VS Pool
                    </span>
                  </div>
                  <h3 className="text-white text-[16px] md:text-[18px] lg:text-[20px] leading-tight font-semibold font-open-sans">
                    Get payouts far beyond standard trading
                  </h3>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#111111] p-4 md:p-5 lg:p-4 xl:p-6 rounded-2xl border border-[#333] hover:border-[#8e24aa] hover:bg-[#161616] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center space-x-4 md:space-x-6 hover:shadow-lg transition-all h-full group">
                <div className="bg-gradient-to-br from-[#8e24aa] to-[#ab47bc] p-4 md:p-6 lg:p-8 rounded-xl shrink-0 shadow-md shadow-purple-900/20 transition-transform group-hover:scale-105">
                  <Clock 
                    strokeWidth={1.5} 
                    className="text-white w-10 h-10 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]" 
                  />
                </div>
                <div>
                  <div className="mb-1 md:mb-2">
                    <span className="text-[10px] md:text-[12px] font-bold text-[#d6bbfb] bg-[#2d1b36] px-2 py-0.5 rounded-full border border-[#4a235a] uppercase tracking-wide font-open-sans">
                      Monitor Others
                    </span>
                  </div>
                  <h3 className="text-white text-[16px] md:text-[18px] lg:text-[20px] leading-tight font-semibold font-open-sans">
                    Monitor other traders in real time
                  </h3>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#111111] p-4 md:p-5 lg:p-4 xl:p-6 rounded-2xl border border-[#333] hover:border-[#8e24aa] hover:bg-[#161616] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center space-x-4 md:space-x-6 hover:shadow-lg transition-all h-full group">
                <div className="bg-gradient-to-br from-[#8e24aa] to-[#ab47bc] p-4 md:p-6 lg:p-8 rounded-xl shrink-0 shadow-md shadow-purple-900/20 transition-transform group-hover:scale-105">
                  <Target 
                    strokeWidth={1.5} 
                    className="text-white w-10 h-10 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px]" 
                  />
                </div>
                <div>
                  <div className="mb-1 md:mb-2">
                    <span className="text-[10px] md:text-[12px] font-bold text-[#d6bbfb] bg-[#2d1b36] px-2 py-0.5 rounded-full border border-[#4a235a] uppercase tracking-wide font-open-sans">
                      HYPE: 2500%
                    </span>
                  </div>
                  <h3 className="text-white text-[16px] md:text-[18px] lg:text-[20px] leading-tight font-semibold font-open-sans">
                    Earn up to 2500% around Hype Events
                  </h3>
                </div>
              </div>

            </div>

            {/* ==================== Right Column: Main Hype Card ==================== */}
            <div className="lg:w-7/12 w-full bg-[#5b2c91] rounded-3xl overflow-hidden text-white relative shadow-[0_0_40px_rgba(91,44,145,0.4)] transform hover:scale-[1.005] transition-transform duration-300 flex flex-col border border-white/10">
              
              {/* Card Header */}
              <div className="bg-[#4a237a] py-3 px-4 md:px-6 flex justify-between items-center border-b border-white/10 shrink-0">
                <div className="font-bold tracking-wider text-xs md:text-sm font-open-sans">TRUMP vs MUSK</div>
                <div className="flex items-center gap-3 md:gap-5 text-[10px] md:text-xs font-medium text-white/80 font-open-sans">
                  <span className="flex items-center gap-1">
                    <Info size={12} className="md:w-3.5 md:h-3.5" /> Pool Trading
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="md:w-3.5 md:h-3.5" /> 00:53:25
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-6 relative flex flex-col h-full bg-gradient-to-b from-[#5b2c91] to-[#451d70]">
                
                {/* NEW Badge */}
                <div className="absolute top-0 left-0 bg-[#e31e24] text-white text-[10px] font-extrabold px-3 py-1 rounded-br-lg shadow-md z-20 animate-pulse font-open-sans">
                  NEW
                </div>

                {/* Header Row: Avatars + Hype Text + Close Button */}
                <div className="flex justify-between items-start mb-2 relative z-10 shrink-0">
                  <div className="flex items-center gap-2">
                     <div className="flex -space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg" alt="Trump" className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white object-cover"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" alt="Musk" className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white object-cover"/>
                     </div>
                     <p className="text-[10px] md:text-xs text-white/90 font-medium font-open-sans">
                        You joined the HYPE: Trump vs Musk
                     </p>
                  </div>
                  <button className="text-white/60 hover:text-white transition-colors">
                    <X size={18} />
                  </button>
                </div>

                {/* Main Title */}
                <h3 className="font-bold text-lg md:text-xl mb-4 relative z-10 font-open-sans shrink-0">
                   Trump VS Musk: History in the making!
                </h3>

                {/* Rotating Banner Area - Responsive Height */}
                <div className="relative mb-5 rounded-xl overflow-hidden group shadow-2xl border border-white/20 flex-grow min-h-[180px] md:min-h-[240px]">
                  <img
                    src={bannerImages[currentImageIndex]}
                    alt="Hype Event Banner"
                    className="w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ease-in-out"
                  />
                  
                  {/* Payout Badge - Scaled for Mobile */}
                  <div className="absolute bottom-3 right-3 md:bottom-5 md:right-4 bg-[#f5a623] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-[0_10px_20px_rgba(245,166,35,0.3)] text-center transform rotate-[-2deg] border-[2px] md:border-[3px] border-white/30 z-20 origin-bottom-right scale-90 md:scale-100">
                    <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider leading-none mb-0.5 font-open-sans">
                      PAYOUT UP TO
                    </div>
                    <div className="text-2xl md:text-3xl font-black leading-none drop-shadow-sm font-open-sans">
                      2500%
                    </div>
                  </div>
                </div>

                {/* Footer Text */}
                <p className="text-xs md:text-sm text-[#f5a623] font-bold mb-2 font-open-sans shrink-0">
                  Earn up to 5000% on hype around these public figures!
                </p>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed pr-0 md:pr-4 font-open-sans shrink-0">
                  Earn up to 2500% on the hype around global events and market
                  buzz. Profit from fast-moving dynamics, trending topics, and
                  live speculation with other traders on the platform.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
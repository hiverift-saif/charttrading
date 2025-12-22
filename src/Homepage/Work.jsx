import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const steps = [
  {
    step: "STEP 01",
    title: "Open Your Account",
    text: "Create your trading account in seconds. Safe, fast, and fully verified.",
  },
  {
    step: "STEP 02",
    title: "Fund Your Account",
    text: "Deposit funds securely with our encrypted system. Your money stays protected.",
  },
  {
    step: "STEP 03",
    title: "Access Trading Tools",
    text: "Use real-time charts, advanced indicators, and trading signals confidently.",
  },
  {
    step: "STEP 04",
    title: "Trade Your Favorite Markets",
    text: "Buy, sell, or exchange crypto, forex, and futures—all on one platform.",
  },
  {
    step: "STEP 05",
    title: "Track Performance & Earn Rewards",
    text: "Monitor results with analytics while unlocking bonuses and exclusive rewards.",
  },
];

export default function Work() {
  // STYLE FOR GRID BACKGROUND
  const gridCardStyle = {
    backgroundColor: "#000000",
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
  };

  return (
    <section className="bg-black py-12 md:py-24 relative overflow-hidden font-sans rounded-2xl w-full max-w-[100vw]">
      
      {/* Container fix for mobile padding */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="flex justify-center items-center p-2 md:p-8 font-bold">
          {/* UPDATED: Mobile text-2xl, Desktop text-5xl */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl uppercase font-nunito-custom font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2 md:mb-4 text-center">
            How It Works
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center text-center lg:text-left mb-8 md:mb-20 gap-4 md:gap-8">
          {/* Left: Title */}
          <div className="max-w-2xl w-full">
            <div className="inline-block mb-3 md:mb-4">
              <span className="bg-[#50fa7b] font-moderustic text-[#051509] px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                How It Works
              </span>
            </div>
            {/* UPDATED: Mobile text-2xl, Desktop text-5xl */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-nunito-custom font-bold font-heading text-white leading-tight">
              Step-By-Step Trading Guide
            </h2>
          </div>

          {/* Right: Description */}
          {/* UPDATED: Mobile text-xs, Desktop text-base */}
          <div className="font-moderustic max-w-sm text-gray-400 text-xs md:text-base leading-relaxed pb-2 w-full">
            Trade seamlessly with real-time insights, smart tools, and secure
            platform for confident decisions.
          </div>
        </div>

        {/* ================= SLIDER SECTION ================= */}
        <div className="relative w-full">
          
          {/* Faint Background Line (Connecting the dots) - Hidden on Mobile */}
          <div className="absolute top-[55px] left-0 w-full h-[1px] bg-white/5 z-0 hidden md:block"></div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".hiw-prev",
              nextEl: ".hiw-next",
            }}
            loop={true}
            observer={true}
            observeParents={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={15} // Reduced space slightly for mobile
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pb-8 md:pb-12 w-full !overflow-visible md:!overflow-hidden"
          >
            {steps.map((item, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="relative pt-12 md:pt-14 group cursor-pointer h-full">
                  {/* --- TIMELINE ELEMENTS --- */}

                  {/* 1. Step Pill (Floating Top) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span className="bg-black border font-moderustic border-white/10 text-[#50fa7b] text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded uppercase tracking-wider group-hover:bg-[#50fa7b] group-hover:text-black transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>

                  {/* 2. The Dot (On the line) - Adjusted pos for mobile */}
                  <div className="absolute top-[48px] md:top-[55px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-black border-2 border-gray-600 rounded-full z-10 group-hover:border-[#50fa7b] group-hover:bg-[#50fa7b] transition-all duration-300 shadow-[0_0_0_4px_#000000]"></div>

                  {/* 3. The Vertical Connector */}
                  <div className="absolute top-[48px] md:top-[55px] left-1/2 -translate-x-1/2 w-[1px] h-6 md:h-8 bg-gradient-to-b from-gray-700 to-transparent opacity-50"></div>

                  {/* --- CARD CONTENT --- */}
                  <div
                    className="mt-6 md:mt-8 border border-white/10 p-5 md:p-8 rounded-2xl transition-all duration-300 h-full min-h-[180px] md:min-h-[200px] group-hover:-translate-y-2 flex flex-col"
                    style={gridCardStyle}
                  >
                    {/* UPDATED: Mobile text-base, Desktop text-xl */}
                    <h3 className="text-base md:text-xl font-bold font-heading text-white mb-2 md:mb-3 group-hover:text-[#50fa7b] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* UPDATED: Mobile text-xs, Desktop text-sm */}
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-moderustic flex-grow">
                      {item.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ================= NAVIGATION BUTTONS ================= */}
          <div className="flex justify-center gap-3 md:gap-4 mt-6 md:mt-8 z-20 relative">
            <button className="hiw-prev w-10 h-10 md:w-12 md:h-12 rounded-full border font-bold border-white/10 bg-black text-white flex items-center justify-center hover:bg-[#50fa7b] hover:text-black hover:border-[#50fa7b] transition-all duration-300 group">
              <ArrowLeft size={18} className="md:w-5 md:h-5" />
            </button>
            <button className="hiw-next w-10 h-10 md:w-12 md:h-12 rounded-full border font-bold border-white/10 bg-black text-white flex items-center justify-center hover:bg-[#50fa7b] hover:text-black hover:border-[#50fa7b] transition-all duration-300 group">
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
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
    text: "Always holds these matters to this principle of selection or else cases he endures pains.",
  },
  {
    step: "STEP 02",
    title: "Fund Your Account",
    text: "Beguiled and demoralized the charms of pleasure of the moment, so blinded by desire that they foresee.",
  },
  {
    step: "STEP 03",
    title: "Choose Your Asset",
    text: "Business it will frequently occur that pleasures have to be repudiated and annoyances accepted.",
  },
  {
    step: "STEP 04",
    title: "Start Trading",
    text: "Perform trades immediately with speed and highly optimized execution.",
  },
  {
    step: "STEP 05",
    title: "Track Performance",
    text: "Analyze results using charts, indicators, and financial analytics.",
  },
];

export default function RiskWarningSection() {
  return (
    <section className="bg-[#000420] py-24 relative overflow-hidden font-sans rounded-2xl">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          
          {/* Left: Title */}
          <div className="max-w-2xl">
            <div className="inline-block mb-4">
               <span className="bg-[#50fa7b] text-[#051509] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                 How It Works
               </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
              Step-By-Step Trading Guide
            </h2>
          </div>

          {/* Right: Description */}
          <div className="max-w-sm text-gray-400 text-base leading-relaxed pb-2">
            Pleasure and praising pain was born and will give complete system.
          </div>
        </div>

        {/* ================= SLIDER SECTION ================= */}
        <div className="relative">
          
          {/* Faint Background Line (Connecting the dots) */}
          <div className="absolute top-[55px] left-0 w-full h-[1px] bg-white/5 z-0 hidden md:block"></div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".hiw-prev",
              nextEl: ".hiw-next",
            }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {steps.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative pt-14 group cursor-pointer">
                  
                  {/* --- TIMELINE ELEMENTS --- */}
                  
                  {/* 1. Step Pill (Floating Top) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-[#0b1221] border border-white/10 text-[#50fa7b] text-xs font-bold px-4 py-1.5 rounded uppercase tracking-wider group-hover:bg-[#50fa7b] group-hover:text-black transition-colors duration-300">
                      {item.step}
                    </span>
                  </div>

                  {/* 2. The Dot (On the line) */}
                  <div className="absolute top-[55px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#000420] border-2 border-gray-600 rounded-full z-10 group-hover:border-[#50fa7b] group-hover:bg-[#50fa7b] transition-all duration-300 shadow-[0_0_0_4px_#000420]"></div>

                  {/* 3. The Vertical Connector (Visual tweak) */}
                  <div className="absolute top-[55px] left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-gray-700 to-transparent opacity-50"></div>


                  {/* --- CARD CONTENT --- */}
                  <div className="mt-8 bg-[#0b1221] border border-white/5 p-8 rounded-2xl hover:border-[#50fa7b]/30 transition-all duration-300 h-full group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold font-heading text-white mb-3 group-hover:text-[#50fa7b] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ================= NAVIGATION BUTTONS ================= */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="hiw-prev w-12 h-12 rounded-full border font-bold border-white/10 bg-[#0b1221] text-white flex items-center justify-center hover:bg-[#50fa7b] hover:text-black hover:border-[#50fa7b] transition-all duration-300 group">
              <ArrowLeft size={20} />
            </button>
            <button className="hiw-next w-12 h-12 rounded-full border font-bold border-white/10 bg-[#0b1221] text-white flex items-center justify-center hover:bg-[#50fa7b] hover:text-black hover:border-[#50fa7b] transition-all duration-300 group">
              <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
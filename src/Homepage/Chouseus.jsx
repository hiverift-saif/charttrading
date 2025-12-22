import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Monitor,
  DollarSign,
  BookOpen,
  ArrowUp,
} from "lucide-react";

export default function TradingServices() {
  // 1. Icon Background Style
  const iconBgStyle = {
    backgroundImage:
      "url('https://july.finestwp.com/newwp/tradebro/wp-content/uploads/2024/12/service-v1-bg.png')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // 2. Data Array
  const servicesData = [
    {
      id: 1,
      title: "Seamless Trading Experience",
      desc: "Trade effortlessly using our fast, secure, and intuitive platform optimized for both desktop and mobile devices.",
      icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-[#a3e635]" />,
      path: "/seamless-trading",
    },
    {
      id: 2,
      title: "Smart Account Control",
      desc: "Manage your trades efficiently with personalized tools, risk controls, and dedicated support built directly into the platform.",
      icon: <Monitor className="w-6 h-6 md:w-7 md:h-7 text-[#a3e635]" />,
      path: "/smart-account",
    },
    {
      id: 3,
      title: "Integrated Learning Tools",
      desc: "Strengthen your trading skills with platform-integrated tutorials, strategy guides, and market insights for every experience level.",
      icon: <DollarSign className="w-6 h-6 md:w-7 md:h-7 text-[#a3e635]" />,
      path: "/learning-tools",
    },
    {
      id: 4,
      title: "A Platform Designed for Trading Success",
      desc: "Everything you need—from intelligent tools to expert insights—built into one powerful trading platform.",
      icon: <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-[#a3e635]" />,
      path: "/platform-designed",
    },
  ];

  // 3. Reusable Card Component
  const ServiceCard = ({ data }) => (
    <div className="px-4 md:px-8 group h-full flex flex-col">
      <div
        className="w-16 h-20 md:w-18 md:h-25 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300"
        style={iconBgStyle}
      >
        {data.icon}
      </div>

      {/* UPDATED: Mobile text-lg, Desktop text-2xl */}
      <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-white">
        {data.title}
      </h3>
      
      {/* UPDATED: Mobile text-sm, Desktop text-base (md) */}
      <p className="text-gray-400 leading-relaxed mb-4 md:mb-6 text-sm md:text-base font-semibold flex-grow">
        {data.desc}
      </p>
      
      <Link 
        to={data.path} 
        className="text-white text-sm md:text-base font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-auto w-fit"
      >
        Read More
        <ArrowUp className="w-3 h-3 rotate-45 text-[#a3e635]" />
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 flex items-center justify-center py-10 md:py-0">
      <div className="max-w-7xl w-full">
        
        {/* UPDATED: Mobile text-2xl, Desktop text-5xl */}
        <h2 className="text-center font-nunito-custom text-2xl md:text-5xl uppercase font-bold mb-10 md:mb-16">
          Why Smart Traders Trust Us
        </h2>

        {/* MAIN GRID CONTAINER */}
        {/* UPDATED: Gap reduced on mobile (gap-y-12) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12 lg:gap-y-24">
          {/* ==================== ROW 1 ==================== */}

          {/* SLOT 1: Main Heading */}
          <div className="flex flex-col justify-center">
            <button className="w-fit bg-[#a3e635] text-black px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold mb-4 md:mb-6 hover:bg-[#8cd122] transition tracking-wide uppercase">
              Platform
            </button>
            
            {/* UPDATED: Mobile text-3xl, Desktop text-5xl */}
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight font-nunito-custom">
              A Smart Platform
              <br /> for Every Traders
            </h1>
            
            {/* UPDATED: Mobile text-sm, Desktop text-lg */}
            <p className="text-gray-400 text-sm md:text-lg max-w-sm leading-relaxed font-roboto">
              Experience a powerful trading platform with real-time insights and
              intelligent tools built-in
            </p>
          </div>

          {/* SLOT 2 & 3: Services 1 & 2 */}
          {servicesData.slice(0, 2).map((service) => (
            <ServiceCard key={service.id} data={service} />
          ))}

          {/* ==================== ROW 2 ==================== */}

          {/* SLOT 4: CTA Card with Video */}
          <div className="relative rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] h-full min-h-[300px] lg:min-h-auto">
            <div className="relative rounded-2xl p-6 md:p-8 overflow-hidden group h-full flex flex-col justify-center">
              {/* Video Background */}
              <div className="absolute inset-0 z-0">
                <video
                  src="https://media.istockphoto.com/id/1477778736/video/3d-bar-graph-chart-with-up-arrow.mp4?s=mp4-640x640-is&k=20&c=Hy9aLjgiSuYYvNJfhmdYP54lUqYRv1IScH5xDDKtsC8="
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/80 z-10"></div>

              {/* Content */}
              <div className="relative z-20 flex flex-col h-full justify-center">
                {/* UPDATED: Mobile text-xl, Desktop text-3xl */}
                <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 leading-snug text-white drop-shadow-md Without">
                  Start Trading <br />
                  Without
                  <br />
                  Limits
                </h2>
                
                <p className="text-gray-200 text-xs md:text-sm mb-6 md:mb-8 drop-shadow-sm">
                  Provide the tools you need.
                </p>
                
                <button className="w-fit bg-[#a3e635] text-black px-5 py-2.5 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm hover:bg-[#8cd122] transition flex items-center gap-2 shadow-lg shadow-lime-900/30">
                  Start Trading
                  <ArrowUp className="w-3 h-3 md:w-4 md:h-4 rotate-45" />
                </button>
              </div>
            </div>
          </div>

          {/* SLOT 5 & 6: Services 3 & 4 */}
          {servicesData.slice(2, 4).map((service) => (
            <ServiceCard key={service.id} data={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
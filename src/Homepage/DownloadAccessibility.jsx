import React, { useState } from "react";
import { Check,Target ,Trophy ,Globe  } from "lucide-react";

const platformsData = [
  {
    id: 0,
    name: "Live Competition",
    short: "Live Competition",
    info: "Join high-energy trading tournaments designed to test your skills, reward performance, and push you to the top of the leaderboard.",
    features: [
      "Real-time leaderboards and rankings",
      "Equal starting balance for all participants",
      "Fair competition with transparent rules",
    ],
    img: "https://tradebro-react-next-js-template.vercel.app/assets/images/resources/platform-1.png",
  },
  {
    id: 1,
    name: "Rank & Rewards",
    short: "Rank & Rewards",
    info: "Climb the leaderboard based on performance and unlock exciting prizes and bonuses.",
    features: [
      "Climb leaderboard, earn exciting rewards.",
      "Unlock bonuses with top performance.",
      "Showcase skills, claim exclusive prizes.",
    ],
    img: "https://tradebro-react-next-js-template.vercel.app/assets/images/resources/platform-1.png",
  },
];

export default function DownloadAccessibility() {
  const [active, setActive] = useState(0);

  // STYLE FOR GRID BACKGROUND ON CARDS
  const gridCardStyle = {
    backgroundColor: "#000000",
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "30px 30px",
  };

  return (
    <section className="w-full bg-black py-12 md:py-24 font-sans relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* UPPER SECTION (Phone + Text) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-12 lg:mb-20">
          {/* LEFT: PHONE IMAGE + BACKDROP */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">
            {/* Background Shape */}
            <img
              src="https://july.finestwp.com/newwp/tradebro/wp-content/uploads/2024/12/platforms-v1-shape11.png"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[130%] max-w-none pointer-events-none opacity-80"
            />
            {/* Main Phone */}
            <div className="relative z-10 animate-float">
              <img
                src="https://www.fpmarkets.com/images/app/app-hero@1x.png"
                alt="Trading App"
                className="w-full max-w-[280px] md:max-w-2xl mx-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 relative z-20">
            <div>
              <span className="bg-[#50fa7b] text-black px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider ">
                TOURNAMENTS{" "}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-nunito-custom font-heading text-white leading-tight">
              Compete, Trade,
              <br />
              and Win Big <br />
              Rewards.
            </h2>
            
            {/* TABS */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {platformsData.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 rounded-xl border transition-all duration-300 ${
                    active === i
                      ? "bg-zinc-900 border-[#50fa7b]"
                      : "bg-transparent border-white/10 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
                      active === i
                        ? "bg-[#50fa7b] text-black"
                        : "bg-zinc-800 text-slate-400"
                    }`}
                  >
                    <Check size={16} strokeWidth={3} className="md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <span
                      className={`block text-xs md:text-sm font-bold ${
                        active === i ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {p.short}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed">
              {platformsData[active].info}
            </p>
            
            <ul className="space-y-3 md:space-y-4">
              {platformsData[active].features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-slate-300 font-medium text-sm md:text-base"
                >
                  <span className="text-[#50fa7b]">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="currentColor"
                      className="w-3 h-3 md:w-[14px] md:h-[14px]"
                    >
                      <path d="M7 0C7 0 14 7 14 7C14 7 7 14 7 14C7 14 0 7 0 7C0 7 7 0 7 0Z" />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ====================================================
            BOTTOM SECTION: GRID CARDS (TEXT ONLY & SHORT)
{/* ====================================================
    BOTTOM SECTION: ENHANCED GRID CARDS
===================================================== */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
  
  {/* CARD 1: RISE HIGHER */}
  <div
    className="relative overflow-hidden rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#50fa7b]/30 transition-all duration-300 group flex flex-col justify-center min-h-[180px]"
    style={gridCardStyle}
  >
    {/* Side Decorative Neon Lines */}
    <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#50fa7b] opacity-60 group-hover:h-1/2 transition-all duration-500" />
    <div className="absolute left-[4px] top-1/3 bottom-1/3 w-[1px] bg-[#50fa7b] opacity-20" />

    <div className="flex items-start gap-5">
      {/* Icon */}
      <div className="flex-shrink-0 p-3 rounded-xl bg-white/5 border border-white/10 text-[#50fa7b] group-hover:scale-110 transition-transform">
        <Target size={28} />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-white font-bold text-xl md:text-2xl font-moderustic tracking-tight">
          Rise Higher
        </h3>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <div className="w-1 h-1 rounded-full bg-[#50fa7b]" />
            Climb daily leaderboards
          </li>
          <li className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <div className="w-1 h-1 rounded-full bg-[#50fa7b]" />
            Dominate global rankings
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* CARD 2: GRAB REWARDS */}
  <div
    className="relative overflow-hidden rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#50fa7b]/30 transition-all duration-300 group flex flex-col justify-center min-h-[180px]"
    style={gridCardStyle}
  >
    <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#50fa7b] opacity-60 group-hover:h-1/2 transition-all duration-500" />
    <div className="absolute left-[4px] top-1/3 bottom-1/3 w-[1px] bg-[#50fa7b] opacity-20" />

    <div className="flex items-start gap-5">
      <div className="flex-shrink-0 p-3 rounded-xl bg-white/5 border border-white/10 text-[#50fa7b] group-hover:scale-110 transition-transform">
        <Trophy size={28} />
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">
          Grab Rewards
        </h3>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <div className="w-1 h-1 rounded-full bg-[#50fa7b]" />
            Unlock exclusive bonuses
          </li>
          <li className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <div className="w-1 h-1 rounded-full bg-[#50fa7b]" />
            Win massive cash prizes
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* CARD 3: EARN GLORY */}
  <div
    className="relative overflow-hidden rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#50fa7b]/30 transition-all duration-300 group flex flex-col justify-center min-h-[180px]"
    style={gridCardStyle}
  >
    <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#50fa7b] opacity-60 group-hover:h-1/2 transition-all duration-500" />
    <div className="absolute left-[4px] top-1/3 bottom-1/3 w-[1px] bg-[#50fa7b] opacity-20" />

    <div className="flex items-start gap-5">
      <div className="flex-shrink-0 p-3 rounded-xl bg-white/5 border border-white/10 text-[#50fa7b] group-hover:scale-110 transition-transform">
        <Globe size={28} />
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">
          Earn Glory
        </h3>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <div className="w-1 h-1 rounded-full bg-[#50fa7b]" />
            Global skill recognition
          </li>
          <li className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <div className="w-1 h-1 rounded-full bg-[#50fa7b]" />
            Showcase to elite community
          </li>
        </ul>
      </div>
    </div>
  </div>

</div>
      </div>
    </section>
  );
}
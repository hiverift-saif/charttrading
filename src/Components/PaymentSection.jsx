import React, { useState, useEffect } from "react";
import { Clock, Zap, ChevronLeft, ChevronRight } from "lucide-react";

const PaymentSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  const paymentMethods = [
    { name: "Visa", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/visa.svg", time: "Instant", fast: true },
    { name: "GlobePay", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/globe_pay_inc.svg", time: "Instant", fast: true },
    { name: "Volet.com", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/volet.svg", time: "Instant", fast: true },
    { name: "Apple Pay", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/applepay.svg", time: "Instant", fast: true },
    { name: "Mastercard", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/mastercard.svg", time: "Instant", fast: true },
    { name: "UPI", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/upi.svg", time: "3 hours", fast: false },
  ];

  // Infinite loop ke liye double array
  const scrollItems = [...paymentMethods, ...paymentMethods];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="w-full bg-black py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* ===== RESPONSIVE TITLE ===== */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-[#e8e8e8] leading-tight">
            <span className="block mb-2">Fast & secure deposits &</span>
            <div className="flex flex-wrap justify-center gap-3 items-center">
              <span>withdrawals in</span>
              <span className="inline-flex items-center gap-2 md:gap-4 border-2 border-[#ff8516] px-4 py-1 md:px-6 md:py-2 rounded-full bg-[#1a1a1a]">
                <img 
                  src="https://static.cdnroute.io/_assets/images/flags/in.svg" 
                  className="w-6 h-6 md:w-10 md:h-10 rounded-full object-cover" 
                  alt="India Flag"
                />
                <span className="text-2xl md:text-5xl lg:text-6xl">India</span>
              </span>
            </div>
          </h2>
        </div>

        {/* ===== MOBILE GRID (2 Columns) ===== */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((m, i) => (
              <div
                key={i}
                className="bg-[#1b1b1b] border border-[#2e2e2e] rounded-2xl p-4 h-40 flex flex-col justify-between items-center group active:scale-95 transition-transform"
              >
                <div className="w-full flex justify-between items-center">
                  <Clock size={14} className="text-gray-500" />
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${m.fast ? "text-[#ff8516]" : "text-gray-400"}`}>
                    {m.time}
                  </span>
                </div>
                <img src={m.img} className="h-10 object-contain" alt={m.name} />
                <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">{m.name}</p>
              </div>
            ))}
          </div>
        ) : (
          /* ===== DESKTOP AUTO-SCROLL CAROUSEL ===== */
          <div className="relative group">
            <div className="flex overflow-hidden mask-fade">
              <div className="flex gap-6 animate-scroll py-4">
                {scrollItems.map((m, i) => (
                  <div 
                    key={i} 
                    className="w-[280px] flex-shrink-0 bg-[#1b1b1b] border border-[#2e2e2e] rounded-3xl p-8 h-64 flex flex-col items-center justify-between hover:border-[#ff8516]/50 hover:bg-[#242424] transition-all duration-300"
                  >
                    <div className="w-full flex justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">{m.time}</span>
                      </div>
                      {m.fast && <Zap size={18} className="text-[#ff8516] fill-[#ff8516]" />}
                    </div>
                    <img src={m.img} className="h-14 object-contain" alt={m.name} />
                    <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em]">{m.name}</p>
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-6 animate-scroll py-4" aria-hidden="true">
                {scrollItems.map((m, i) => (
                  <div 
                    key={`dup-${i}`} 
                    className="w-[280px] flex-shrink-0 bg-[#1b1b1b] border border-[#2e2e2e] rounded-3xl p-8 h-64 flex flex-col items-center justify-between hover:border-[#ff8516]/50 hover:bg-[#242424] transition-all duration-300"
                  >
                    <div className="w-full flex justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">{m.time}</span>
                      </div>
                      {m.fast && <Zap size={18} className="text-[#ff8516] fill-[#ff8516]" />}
                    </div>
                    <img src={m.img} className="h-14 object-contain" alt={m.name} />
                    <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em]">{m.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS For Seamless Animation - Add this to your globals.css or a style tag */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
};

export default PaymentSection;
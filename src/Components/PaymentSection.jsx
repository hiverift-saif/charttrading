import React, { useRef, useEffect, useState } from "react";
import { Clock, Zap, ChevronLeft, ChevronRight } from "lucide-react";

const PaymentSection = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const paymentMethods = [
    { name: "Visa", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/visa.svg", time: "Instant", fast: true },
    { name: "GlobePay", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/globe_pay_inc.svg", time: "Instant", fast: true },
    { name: "Volet.com", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/volet.svg", time: "Instant", fast: true },
    { name: "Apple Pay", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/applepay.svg", time: "Instant", fast: true },
    { name: "Mastercard", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/mastercard.svg", time: "Instant", fast: true },
    { name: "UPI", img: "https://static.cdnroute.io/billing/images/hodly/payment-icons/upi.svg", time: "3 hours", fast: false },
  ];

  /* -----------------------------------------------
     AUTO SCROLL → small constant movement (no smooth)
  ------------------------------------------------- */
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
          } else {
            scrollRef.current.scrollBy({ left: 1.3, behavior: "auto" });
          }
        }
      }, 35);
    }
    return () => clearInterval(interval);
  }, [isPaused]);


  /* -----------------------------------------------
     MANUAL → SMOOTH SLIDE TRANSITION
  ------------------------------------------------- */
  const manualScroll = (direction) => {
    setIsPaused(true); // stop auto scroll for smoothness

    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // wait for smooth transition finish
    setTimeout(() => setIsPaused(false), 1200);
  };


  return (
    <section className="w-full bg-black py-16 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-6xl font-bold text-white uppercase italic">
            Secure Payments
          </h2>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ==== NAV BUTTONS ==== */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 z-40 pointer-events-none">
            <button 
              onClick={() => manualScroll("left")}
              className="pointer-events-auto bg-[#ff8516] p-3 rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,133,22,0.4)]"
            >
              <ChevronLeft className="text-black" />
            </button>
            <button 
              onClick={() => manualScroll("right")}
              className="pointer-events-auto bg-[#ff8516] p-3 rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,133,22,0.4)]"
            >
              <ChevronRight className="text-black" />
            </button>
          </div>

          {/* ==== CARD SLIDER ==== */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar mask-fade py-6"
          >
            {[...paymentMethods, ...paymentMethods, ...paymentMethods].map((m, i) => (
              <div
                key={i}
                className="w-[180px] sm:w-[260px] md:w-[320px] flex-shrink-0 bg-[#121212] border border-white/10 
                           rounded-[32px] p-6 md:p-8 h-44 md:h-60 flex flex-col items-center justify-between 
                           transition-all duration-500 hover:border-[#ff8516]/50 hover:bg-[#1a1a1a]"
              >
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={14} />
                    <span className="text-[10px] md:text-xs font-bold">{m.time}</span>
                  </div>
                  {m.fast && <Zap size={16} className="text-[#ff8516] fill-[#ff8516]" />}
                </div>
                <img src={m.img} className="h-10 md:h-14 object-contain" alt={m.name} />
                <p className="text-gray-500 uppercase text-[10px] md:text-xs font-bold tracking-[0.2em]">{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS BELOW */}
      <style >{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
};

export default PaymentSection;

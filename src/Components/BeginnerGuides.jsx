
import React from "react";
import { Link } from "react-router-dom";

export default function BeginnerGuides() {
  return (
    <div className="">
    <div className="min-h-screen bg-black  ">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1634097537825-b446635b2f7f?ixlib=rb-4.1.0&q=80&w=1080&fit=max&crop=entropy&cs=tinysrgb')",
            }}
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">


          
          <div className="text-center bg-gradient-to-r from-[#000213] via-[#000213]/90 to-[#000213]/40  backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50">





          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-play w-12 h-12 text-white"
    aria-hidden="true"
  >
    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
  </svg>
</div>






            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
              Trade Pro Demo
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Follow the guided steps to experience how a trading account works.
            </p>

            {/* Link to TradingDashboard */}
            <Link
              to="/DemoTradingDashboard"
              className="inline-flex items-center justify-center gap-2 h-16 rounded-md bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-16 text-2xl font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
            >
              Start Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

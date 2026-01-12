import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // 🚀 Theme support
import logo from "../assets/logo.png"; // 🚀 Logo for better branding

export default function BeginnerGuides() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-black" : "bg-gray-100"}`}>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        
        {/* Background Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1634097537825-b446635b2f7f?ixlib=rb-4.1.0&q=80&w=1080&fit=max&crop=entropy&cs=tinysrgb')",
            }}
          />
          <div className={`absolute inset-0 ${darkMode ? "bg-black/80" : "bg-white/60"}`} />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className={`text-center backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 border transition-all
            ${darkMode ? "bg-zinc-900/40 border-gray-700/50 shadow-2xl" : "bg-white/80 border-gray-200 shadow-xl"}`}>

            {/* Icon Box - Made smaller for mobile */}
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-[#f99616] to-[#e88a14] rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-[0_10px_30px_rgba(249,150,22,0.3)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 md:w-12 md:h-12 text-white"
                aria-hidden="true"
              >
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
              </svg>
            </div>

            {/* Title - Responsive font size */}
            <h1 className={`text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 md:mb-6 
              ${darkMode ? "text-white" : "text-black"}`}>
              Trade Pro <span className="text-[#f99616]">Demo</span>
            </h1>

            {/* Description - Better line height and size */}
            <p className={`text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium
              ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Follow the guided steps to experience how a professional trading platform works without any risk.
            </p>

            {/* Start Button - Full width on mobile, auto on desktop */}
            <div className="flex justify-center">
              <Link
                to="/DemoTradingDashboard"
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto  px-5 md:px-16 py-2 md:py-5 
                bg-[#f99616] hover:bg-[#e88914] text-white text-lg md:text-xl font-black uppercase tracking-widest 
                rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95"
              >
                <span>Start Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Secondary text */}
            <p className="mt-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500">
              No registration required for demo
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
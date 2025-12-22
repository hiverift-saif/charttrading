import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // 👈 Yeh import add karna mat bhoolna!
import SidebarLeft from '../chart/SidebarLeft';
import SidebarRight from '../chart/SidebarRight';
import Header from '../chart/Header';
import ChartArea from '../chart/ChartArea';
import MobileControls from '../chart/MobileControls';
import PriceWebSocket from '../chart/PriceWebSocket.jsx'; // Path sahi kar lena (double slash hata do)
import { Menu, X } from 'lucide-react';

const TradingDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 👇 Live price aur asset Redux se le rahe hain
  const { currentAsset, currentPrice } = useSelector((state) => state.trading);
  const displayPrice = currentPrice > 0 ? currentPrice.toFixed(2) : 'Connecting...';

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#1b1817] text-gray-300 font-sans overflow-hidden fixed inset-0">
      
      {/* WebSocket background mein chal raha hai */}
      <PriceWebSocket />

      {/* --- MOBILE SIDEBAR --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 lg:hidden flex">
          <div className="w-64 h-full bg-[#161413] shadow-2xl">
            <div className="p-4 flex justify-between items-center border-b border-gray-800">
              <span className="font-bold text-white">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="h-[calc(100%-60px)] overflow-y-auto">
              <SidebarLeft mobileMode={true} />
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* --- 1. LEFT SIDEBAR (Desktop) --- */}
      <div className="hidden lg:block h-full flex-shrink-0 border-r border-gray-800">
        <SidebarLeft />
      </div>

      {/* --- 2. CENTER AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#131722]">
        
        {/* Header */}
        <div className="flex-shrink-0 z-20 bg-[#1b1817] border-b border-gray-800 h-[60px] flex items-center">
          <div className="relative flex items-center w-full px-2">
            <div className="lg:hidden flex items-center mr-2">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-white">
                <Menu size={24} />
              </button>
            </div>
            <div className="flex-1">
              <Header />
            </div>
          </div>
        </div>

        {/* 👇 YEH NAYA PRICE BAR ADD KIYA – CHART KE UPAR BIG & CENTER MEIN */}
        {/* <div className="bg-[#1b1817] px-6 py-5 border-b border-gray-800">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              ${displayPrice}
            </div>
            <div className="text-lg md:text-xl text-gray-400 mt-2">
              {currentAsset || 'BTCUSDT'} • Live Price
            </div>
          </div>
        </div> */}

        {/* --- CHART CONTAINER --- */}
        <div className="flex-1 relative w-full h-full">
          <ChartArea />
        </div>

        {/* Mobile bottom controls */}
        <div className="lg:hidden flex-shrink-0 bg-[#1b1817] z-20">
          <MobileControls />
        </div>
      </main>

      {/* --- 3. RIGHT SIDEBAR (Desktop) --- */}
      <div className="hidden lg:block h-full flex-shrink-0 border-l border-gray-800">
        <SidebarRight />
      </div>
    </div>
  );
};

export default TradingDashboard;
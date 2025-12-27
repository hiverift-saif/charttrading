import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import SidebarLeft from '../chart/SidebarLeft';
import TradePanel from '../chart/TradePanel'; 
import IconStrip from '../chart/IconStrip';   
import Header from '../chart/Header';
import ChartArea from '../chart/ChartArea';
import MobileControls from '../chart/MobileControls';
import PriceWebSocket from '../chart/PriceWebSocket'; 
import DepositPage from '../Leftsidebar/DepositPage'; 
import SupportPage from '../Leftsidebar/SupportPage'; 
// Tournament Modal Import karein (Path check kar lena apne hisaab se)
import TournamentModal from '../chart/TournamentModal'; 
import { Menu, X, LayoutDashboard } from 'lucide-react';

const TradingDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chart'); 
  
  // --- Tournament Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedT, setSelectedT] = useState(null);

  const { currentAsset, currentPrice } = useSelector((state) => state.trading);
  const displayPrice = currentPrice > 0 ? currentPrice.toFixed(2) : 'Connecting...';

  // --- Modal Open Function ---
  const handleOpenTournament = (tournament) => {
    setSelectedT(tournament);
    setIsModalOpen(true);
  };

  const isChartMode = activeTab === 'chart';

  return (
    <div className="flex flex-col h-screen w-full bg-[#1b1817] text-gray-300 font-sans overflow-hidden fixed inset-0">
      <PriceWebSocket />

      {/* --- 1. HEADER --- */}
      <div className="flex-shrink-0 z-[9999] bg-[#1b1817] border-b border-gray-800 h-[60px] flex items-center">
        <Header price={displayPrice} asset={currentAsset} setActiveTab={setActiveTab} />
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* --- 2. LEFT SIDEBAR (Tournament Logic Added Here) --- */}
        <div className="hidden lg:block h-full flex-shrink-0 border-r border-gray-800 bg-[#161413]">
          <SidebarLeft 
            setActiveTab={setActiveTab} 
            activeTab={activeTab} 
            onTournamentClick={handleOpenTournament} // Parent function pass kiya
          />
        </div>

        {/* --- 3. CENTER AREA (Dynamic) --- */}
        <div className="flex-1 flex overflow-hidden bg-[#131722] relative">
          
          <main className="flex-1 relative h-full overflow-hidden">
            {isChartMode ? (
              <div className="w-full h-full relative">
                <ChartArea />
                <div className="lg:hidden absolute bottom-0 w-full z-20"><MobileControls /></div>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto animate-in slide-in-from-right duration-300">
                {(['deposit', 'withdraw', 'history', 'bonus'].includes(activeTab)) && <DepositPage initialTab={activeTab} />}
                {activeTab === 'support' && <SupportPage />}
                {activeTab === 'profile' && <div className="p-10 text-center text-white font-bold text-2xl">Profile Page</div>}
              </div>
            )}
          </main>

          {/* --- 4. RIGHT SIDEBAR AREA --- */}
          <div className="hidden lg:flex h-full flex-shrink-0">
            {isChartMode && (
              <aside className="w-[280px] bg-[#161413] border-l border-gray-800 animate-in slide-in-from-right duration-300">
                <TradePanel />
              </aside>
            )}
            <aside className="w-16 bg-[#161413] border-l border-gray-800 relative z-40">
              <IconStrip />
            </aside>
          </div>
        </div>
      </div>

      {/* --- 5. TOURNAMENT MODAL (Pure Dashboard ke upar aayega) --- */}
      <TournamentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedT} 
      />

      {/* Mobile Floating Back Button */}
      {!isChartMode && (
        <button onClick={() => setActiveTab('chart')} className="fixed bottom-6 right-20 bg-blue-600 p-4 rounded-full shadow-2xl lg:hidden z-50 text-white active:scale-95 transition-transform">
          <LayoutDashboard size={24} />
        </button>
      )}

      {/* --- MOBILE DRAWER --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 lg:hidden flex">
          <div className="w-72 h-full bg-[#161413] shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-4 flex justify-between items-center border-b border-gray-800">
              <span className="font-bold text-white uppercase text-xs tracking-widest font-sans">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 p-2"><X size={24} /></button>
            </div>
            <div className="h-[calc(100%-60px)] overflow-y-auto font-sans">
              <SidebarLeft 
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                }} 
                activeTab={activeTab} 
                onTournamentClick={handleOpenTournament} // Mobile drawer ke liye bhi add kiya
              />
            </div>
          </div>
          <div className="flex-1 h-full" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default TradingDashboard;
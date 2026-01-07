import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation } from 'react-router-dom'; // 🚀 Added
import { setAccountType } from '../redux/tradingSlice'; // 🚀 Path check karein

// Baaki imports same raheinge...
import SidebarLeft from '../chart/SidebarLeft';
import TradePanel from '../chart/TradePanel'; 
import IconStrip from '../chart/IconStrip';   
import Header from '../chart/Header';
import ChartArea from '../chart/ChartArea';
import MobileControls from '../chart/MobileControls';
import PriceWebSocket from '../chart/PriceWebSocket'; 
import DepositPage from '../Leftsidebar/DepositPage'; 
import SupportPage from '../Leftsidebar/SupportPage'; 
import TournamentModal from '../chart/TournamentModal'; 
import ProfilePage from '../Leftsidebar/ProfilePage'; 
import HistoryPage from '../Leftsidebar/HistoryContent'; 
import { Menu, X, LayoutDashboard } from 'lucide-react';

const TradingDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState('chart'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isIconStripOpen, setIsIconStripOpen] = useState(false); 
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedT, setSelectedT] = useState(null);

  // 🚀 LOGIC: Check for Demo mode on mount
  useEffect(() => {
    if (location.state && location.state.mode === 'demo') {
      dispatch(setAccountType('demo'));
      // URL state clear karein taaki refresh par wapas Real na ho (optional)
      window.history.replaceState({}, document.title);
    }
  }, [location.state, dispatch]);

  const { currentAsset, currentPrice } = useSelector((state) => state.trading);
  const displayPrice = currentPrice > 0 ? currentPrice.toFixed(2) : 'Connecting...';

  const handleOpenTournament = (tournament) => {
    setSelectedT(tournament);
    setIsModalOpen(true);
  };

  const isChartMode = activeTab === 'chart';
  const toggleLeftSidebar = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleRightSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsIconStripOpen(!isIconStripOpen); 
    } else {
      setIsRightPanelOpen(!isRightPanelOpen);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#1b1817] text-gray-300 font-sans lg:overflow-hidden lg:fixed lg:inset-0">
      <PriceWebSocket />

      {/* --- 1. HEADER --- */}
      <div className="flex-shrink-0 z-[100] bg-[#1b1817] border-b border-gray-800 h-[60px] flex items-center relative">
        <Header 
          price={displayPrice} 
          asset={currentAsset} 
          setActiveTab={setActiveTab} 
          toggleLeftSidebar={toggleLeftSidebar}
          toggleRightSidebar={toggleRightSidebar}
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* --- 2. LEFT SIDEBAR (Desktop) --- */}
        <div className="hidden lg:block h-full flex-shrink-0 border-r border-gray-800 bg-[#161413] z-50">
          <SidebarLeft setActiveTab={setActiveTab} activeTab={activeTab} onTournamentClick={handleOpenTournament} />
        </div>

        {/* --- 3. CENTER AREA --- */}
        <div className="flex-1 flex overflow-hidden bg-[#131722] relative z-0">
          <main className="flex-1 relative h-full overflow-hidden">
            {isChartMode ? (
              <div className="w-full h-full relative">
                <ChartArea />
                <div className="lg:hidden absolute bottom-0 w-full z-20">
                  <MobileControls />
                </div>
              </div>
            ) : (
              <div className="w-full h-full overflow-y-auto custom-scrollbar  pointer-events-auto ">
{(['deposit', 'withdraw', 'history', 'bonus'].includes(activeTab)) && (
  <DepositPage initialTab={activeTab} setActiveTab={setActiveTab} />
)}                {activeTab === 'profile' && <ProfilePage setActiveTab={setActiveTab} />}
      {activeTab === 'support' && <SupportPage setActiveTab={setActiveTab} />}
              </div>
            )}
          </main>

          {/* --- 4. RIGHT SIDEBAR --- */}
          <div className="hidden lg:flex h-full flex-shrink-0 z-40">
            {isChartMode && isRightPanelOpen && (
              <aside className="w-[280px] bg-[#161413] border-l border-gray-800">
                <TradePanel />
              </aside>
            )}
            <aside className="w-16 bg-[#161413] border-l border-gray-800 relative">
              <IconStrip />
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile Icon Strip Drawer */}
      {isIconStripOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden flex">
          <div className="flex-1 h-full bg-black/60 backdrop-blur-sm" onClick={() => setIsIconStripOpen(false)}></div>
          <div className="w-auto h-full bg-[#161413] shadow-2xl flex">
             <IconStrip isMobile={true} closeDrawer={() => setIsIconStripOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile Left Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-black/80 lg:hidden flex">
          <div className="w-72 h-full bg-[#161413] shadow-2xl relative">
            <div className="p-4 flex justify-between items-center border-b border-gray-800 text-white uppercase text-xs tracking-widest font-bold">Menu <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button></div>
            <SidebarLeft setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} activeTab={activeTab} onTournamentClick={handleOpenTournament} />
          </div>
          <div className="flex-1 h-full" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      <TournamentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedT} />
      
      {!isChartMode && (
        <button onClick={() => setActiveTab('chart')} className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-2xl lg:hidden z-[90] text-white"><LayoutDashboard size={24} /></button>
      )}
    </div>
  );
};

export default TradingDashboard;
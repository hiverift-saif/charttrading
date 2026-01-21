import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { setAccountType, setKycStatus } from '../redux/tradingSlice'; // 🚀 Added setKycStatus
import axios from 'axios';
import API_CONFIG from '../config';

// COMPONENTS
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
import { Menu, X, LayoutDashboard } from 'lucide-react';
import KYCPage from '../Components/KYCPage';

const TradingDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL & Tab Persistence Logic
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || localStorage.getItem('activeTradingTab') || 'chart';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isIconStripOpen, setIsIconStripOpen] = useState(false); 
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedT, setSelectedT] = useState(null);

  // 🚀 1. KYC SYNC LOGIC: Backend se status fetch karke Redux mein save karega
  const syncUserSecurityStatus = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/kyc/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Maan lete hain backend se 'unverified', 'pending', ya 'verified' status aa raha hai
      const statusFromBackend = response.data.result?.status || 'unverified';
      dispatch(setKycStatus(statusFromBackend));
    } catch (error) {
      console.error("Critical: Security sync failed", error);
    }
  }, [dispatch]);

  // Initial Sync on Mount
  useEffect(() => {
    syncUserSecurityStatus();
    // Optional: Har 2 minute mein sync karein agar status 'pending' ho
  }, [syncUserSecurityStatus]);

  // 🚀 2. URL & TAB Persistence Update
  useEffect(() => {
    localStorage.setItem('activeTradingTab', activeTab);
    navigate(`?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  // Account Type Logic (Demo/Real)
  useEffect(() => {
    if (location.state && location.state.mode === 'demo') {
      dispatch(setAccountType('demo'));
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

      {/* --- HEADER --- */}
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
        {/* --- LEFT SIDEBAR --- */}
        <div className="hidden lg:block h-full flex-shrink-0 border-r border-gray-800 bg-[#161413] z-50">
          <SidebarLeft setActiveTab={setActiveTab} activeTab={activeTab} onTournamentClick={handleOpenTournament} />
        </div>

        {/* --- CENTER MAIN CONTENT --- */}
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
              <div className="w-full h-full overflow-y-auto custom-scrollbar pointer-events-auto">
                {/* Unified Sub-tab Renderer */}
                {(['deposit', 'withdraw', 'history', 'bonus'].includes(activeTab)) && (
                  <DepositPage initialTab={activeTab} setActiveTab={setActiveTab} />
                )}
                {activeTab === 'profile' && <ProfilePage setActiveTab={setActiveTab} />}
                {activeTab === 'support' && <SupportPage setActiveTab={setActiveTab} />}
                {activeTab === 'kyc' && <KYCPage />} {/* 🚀 New KYC Component */}
              </div>
            )}
          </main>

          {/* --- RIGHT SIDEBARS --- */}
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

      {/* --- DRAWERS & MODALS --- */}
      
      {/* Right Drawer (IconStrip for Mobile) */}
      {isIconStripOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden flex">
          <div className="flex-1 h-full bg-black/60 backdrop-blur-sm" onClick={() => setIsIconStripOpen(false)}></div>
          <div className="w-auto h-full bg-[#161413] shadow-2xl flex">
             <IconStrip isMobile={true} closeDrawer={() => setIsIconStripOpen(false)} />
          </div>
        </div>
      )}

      {/* Left Drawer (Sidebar for Mobile) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-black/80 lg:hidden flex">
          <div className="w-72 h-full bg-[#161413] shadow-2xl relative">
            <div className="p-4 flex justify-between items-center border-b border-gray-800 text-white uppercase text-xs tracking-widest font-bold">
              Menu 
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <SidebarLeft setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} activeTab={activeTab} onTournamentClick={handleOpenTournament} />
          </div>
          <div className="flex-1 h-full" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}

      <TournamentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedT} />
      
      {/* 🚀 Quick Return to Chart (Mobile Only) */}
      {!isChartMode && (
        <button 
          onClick={() => setActiveTab('chart')} 
          className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-2xl lg:hidden z-[90] text-white animate-bounce"
        >
          <LayoutDashboard size={24} />
        </button>
      )}
    </div>
  );
};

export default TradingDashboard;
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- Layout & Main Components ---
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";

// --- Auth Components ---
import Login from "./Components/Login";
import Signup from "./Components/Signup";

// --- Trading Feature ---
import TradingDashboard from "./chart/TradingDashboard";

// --- Feature Pages ---
import IntegratedLearningTools from "./ReadMore/IntegratedLearningTools";
import PlatformDesigned from "./ReadMore/PlatformDesigned";
import SeamlessTrading from "./ReadMore/SeamlessTrading";
import SmartAccount from "./ReadMore/SmartAccount";

// --- Education & Tools ---
import Freedemo from "./Components/Freedemo";
import Quickstart from "./Components/Quickstart";
import Education from "./Components/Education";
import Tradinginstruments from "./WhyMax/Tradinginstruments";
import PromoBonuses from "./WhyMax/PromoBonuses";
import SocialTrading from "./WhyMax/SocialTrading";

// --- About & Legal Pages ---
import AbouttheCompany from "./Aboutus/AbouttheCompany";
import MaxtradingBlog from "./Aboutus/MaxtradingBlog";
import Contacts from "./Aboutus/Contacts";
import Reviews from "./Aboutus/Reviews";
import SupportService from "./Aboutus/SupportService";
import TermsConditions from "./Aboutus/TermsConditions";
import AMLKYCpolicy from "./Aboutus/AMLKYCpolicy";
import Privacypolicy from "./Aboutus/Privacypolicyy";
import Paymentpolicy from "./Aboutus/Paymentpolicy";
import Informationdisclosure from "./Aboutus/Informationdisclosure";
import RiskStatement from "./Aboutus/RiskStatement";
import RefundPolicy from "./Aboutus/RefundPolicy";
import Privacypolicyy from "./Aboutus/Privacypolicyy";

function MainLayout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isTradingPage = location.pathname.toLowerCase().startsWith("/trading");

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#1b1817] text-white overflow-x-hidden">
      
      {/* 1. FIXED NAVBAR: Pure width par alignment fix karne ke liye */}
      {!isTradingPage && (
        <div className="fixed top-0 left-0 w-full z-50 h-[60px]">
          <Navbar />
        </div>
      )}

      {/* --- CONTENT WRAPPER --- */}
      {/* pt-[60px] taaki content navbar ke niche se start ho */}
      <div className={`flex flex-1 ${!isTradingPage ? 'pt-[60px]' : ''}`}>
        
        {/* 2. MAIN SCROLLABLE AREA */}
        {/* xl:mr-80 ensures content doesn't hide behind fixed sidebar */}
        <main className={`flex-1 flex flex-col min-w-0 bg-black relative ${isHomePage ? 'xl:mr-80' : ''}`}>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trading" element={<TradingDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/learning-tools" element={<IntegratedLearningTools />} />
              <Route path="/platform-designed" element={<PlatformDesigned />} />
              <Route path="/seamless-trading" element={<SeamlessTrading />} />
              <Route path="/smart-account" element={<SmartAccount />} />
              <Route path="/freedemo" element={<Freedemo />} />
              <Route path="/quickstart" element={<Quickstart />} />
              <Route path="/education" element={<Education />} />
              <Route path="/tradinginstruments" element={<Tradinginstruments />} />
              <Route path="/promobonuses" element={<PromoBonuses />} />
              <Route path="/socialtrading" element={<SocialTrading />} />
              <Route path="/aboutthecompany" element={<AbouttheCompany />} />
              <Route path="/maxtradingblog" element={<MaxtradingBlog />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/supportservice" element={<SupportService />} />
              <Route path="/termsandconditions" element={<TermsConditions />} />
              <Route path="/amlkycpolicy" element={<AMLKYCpolicy />} />
              <Route path="/privacypolicy" element={<Privacypolicyy />} />
              <Route path="/paymentpolicy" element={<Paymentpolicy />} />
              <Route path="/informationdisclosure" element={<Informationdisclosure />} />
              <Route path="/riskstatement" element={<RiskStatement />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
            </Routes>
          </div>

          {!isTradingPage && <Footer />}
        </main>

        {/* 3. SIDEBAR: Fixed at top-[60px] */}
        {isHomePage && (
          <aside className="hidden xl:block">
            <Sidebar />
          </aside>
        )}

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}
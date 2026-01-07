import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// --- THEME & REDUX ---
import { useTheme } from "./context/ThemeContext"; 

// --- Components ---
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import AffiliateDashboard from "./AffiliateDashboard/AffiliateDashboard";
import Affiliates from "./AffiliateDashboard/Affiliates";
import AffiliateLogin from "./AffiliateDashboard/AffiliateLogin";
import AffiliateSignup from "./AffiliateDashboard/AffiliateSignup";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import TradingDashboard from "./chart/TradingDashboard";
import IntegratedLearningTools from "./ReadMore/IntegratedLearningTools";
import PlatformDesigned from "./ReadMore/PlatformDesigned";
import SeamlessTrading from "./ReadMore/SeamlessTrading";
import SmartAccount from "./ReadMore/SmartAccount";
import Freedemo from "./Components/Freedemo";
import Quickstart from "./Components/Quickstart";
import Education from "./Components/Education";
import Tradinginstruments from "./WhyMax/Tradinginstruments";
import PromoBonuses from "./WhyMax/PromoBonuses";
import SocialTrading from "./WhyMax/SocialTrading";
import AbouttheCompany from "./Aboutus/AbouttheCompany";
import MaxtradingBlog from "./Aboutus/MaxtradingBlog";
import Contacts from "./Aboutus/Contacts";
import Reviews from "./Aboutus/Reviews";
import SupportService from "./Aboutus/SupportService";
import TermsConditions from "./Aboutus/TermsConditions";
import AMLKYCpolicy from "./Aboutus/AMLKYCpolicy";
import Paymentpolicy from "./Aboutus/Paymentpolicy";
import Informationdisclosure from "./Aboutus/Informationdisclosure";
import RiskStatement from "./Aboutus/RiskStatement";
import RefundPolicy from "./Aboutus/RefundPolicy";
import Privacypolicyy from "./Aboutus/Privacypolicyy";
import BeginnerGuides from "./Components/BeginnerGuides";
import TradingTools from "./Components/TradingTools";
import DemoTradingDashboard from "./Components/DemoTradingDashboard";
import AdminDashboard from "./AdminContent/AdminDashboard";
import AdminLogin from "./AdminContent/AdminLogin";
import ProtectedRoute from "./Components/ProtectedRoute";

function MainLayout() {
  const { darkMode } = useTheme();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isTradingPage = location.pathname.toLowerCase().startsWith("/trading");
  const isAffiliatePage = location.pathname.toLowerCase().startsWith("/affiliate");
  const isAdminPage = location.pathname.toLowerCase().startsWith("/admin");
  const hideMainLayout = isTradingPage || isAffiliatePage || isAdminPage;

  return (
    <div className={`flex flex-col min-h-screen w-full transition-colors duration-500 overflow-x-hidden 
      ${darkMode ? "bg-[#1b1817] text-white" : "bg-gray-100 text-slate-900"}`}>
      
      {!hideMainLayout && (
        <div className={`fixed top-0 left-0 w-full z-50 h-[60px] border-b transition-colors
          ${darkMode ? "bg-black/80 border-zinc-800" : "bg-white/80 border-gray-200"} backdrop-blur-md`}>
          <Navbar />
        </div>
      )}

      <div className={`flex flex-1 ${!hideMainLayout ? 'pt-[60px]' : ''}`}>
        <main className={`flex-1 flex flex-col min-w-0 relative transition-colors duration-500
          ${darkMode ? 'bg-black' : 'bg-white'} ${isHomePage ? 'xl:mr-80' : ''}`}>
          
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/AffiliateLogin" element={<AffiliateLogin />} />
              <Route path="/AffiliateSignup" element={<AffiliateSignup />} />
              <Route path="/Affiliates" element={<Affiliates/>} />
              <Route path="/DemoTradingDashboard" element = {<DemoTradingDashboard/>}/>
              
              {/* 🚀 PROTECTED ADMIN ROUTE */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute tokenKey="admin_token" redirectTo="/adminlogin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* 🚀 PROTECTED AFFILIATE ROUTE */}
              <Route 
                path="/AffiliateDashboard/*" 
                element={
                  <ProtectedRoute tokenKey="affiliate_token" redirectTo="/AffiliateLogin">
                    <AffiliateDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* 🚀 PROTECTED TRADING ROUTE */}
<Route 
  path="/trading" 
  element={
    <ProtectedRoute tokenKey="access_token" redirectTo="/login">
      <TradingDashboard />
    </ProtectedRoute>
  } 
/>

              {/* Baaki saare simple routes... */}
              <Route path="/guides" element={<BeginnerGuides />} />
              <Route path="/tools" element={<TradingTools />} />
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
          {!hideMainLayout && <Footer />}
        </main>

        {isHomePage && (
          <aside className={`hidden xl:block transition-colors border-l
            ${darkMode ? "border-zinc-800 bg-[#1b1817]" : "border-gray-200 bg-gray-50"}`}>
            <Sidebar />
          </aside>
        )}
      </div>
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
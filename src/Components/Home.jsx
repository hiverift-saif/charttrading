import React from "react";
import HeroSection from "../Homepage/HeroSection";
import FeaturesSection from "../Homepage/FeaturesSection";
import WhyUsSection from "../Homepage/WhyUsSection";
import HowItWorksAndTrusted from "../Homepage/HowItWorksAndTrusted";
import TradeMarkets from "../Homepage/TradeMarkets";
import ServicesSection from "../Homepage/ServicesSection";
import Chouseus from "../Homepage/Chouseus";
import DownloadAccessibility from "../Homepage/DownloadAccessibility";
import Work from "../Homepage/Work";
import Faq from "../Homepage/Faq";
import HowItWorks from "../Homepage/HowItWorks";
import PaymentSection from "./PaymentSection";
import TradingPlatformInfo from "./TradingPlatformInfo";
// import Earnsection from '../Homepage/Earnsection'; // Filhal unused hai
// import TradingFeatures from '../Homepage/TradingFeatures'; // Filhal unused hai

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <HowItWorks />

      <FeaturesSection />
      <PaymentSection/>
      <TradingPlatformInfo/>

      <DownloadAccessibility />

      <TradeMarkets />
      <Faq />

      {/* <Work /> */}
      {/* <Chouseus /> */}
      {/* <WhyUsSection /> */}

      {/* <HowItWorksAndTrusted /> */}

      {/* <ServicesSection /> */}

      {/* --- Future Use --- */}
      {/* <Earnsection /> */}
      {/* <TradingFeatures /> */}
    </div>
  );
};

export default Home;

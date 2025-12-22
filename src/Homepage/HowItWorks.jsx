import React from "react";
import { UserPlus, Wallet, BarChart3, TrendingUp, CircleDollarSign } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Account",
      desc: "Sign up in seconds with just your email. No complex paperwork to start.",
      icon: <UserPlus className="text-orange-500" size={24} />,
    },
    {
      title: "Deposit Funds",
      desc: "Choose from multiple secure payment methods to fund your trading wallet.",
      icon: <Wallet className="text-orange-500" size={24} />,
    },
    {
      title: "Select Your Asset",
      desc: "Pick from 100+ assets including Crypto, Forex, and Stocks (OTC).",
      icon: <BarChart3 className="text-orange-500" size={24} />,
    },
    {
      title: "Predict & Trade",
      desc: "Analyze the chart and predict if the price will go Up or Down.",
      icon: <TrendingUp className="text-orange-500" size={24} />,
    },
    {
      title: "Withdraw Profits",
      desc: "Instant withdrawals of your earnings directly to your bank or crypto wallet.",
      icon: <CircleDollarSign className="text-orange-500" size={24} />,
    },
  ];

  return (
    <div className="w-full bg-black md:py-16 py-5 px-6 font-sans">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-[#cccac9] text-3xl md:text-5xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-[#afadac] text-sm md:text-base max-w-lg mx-auto">
          Start your trading journey in 5 simple steps. Experience the fastest way to enter the financial markets.
        </p>
      </div>

      {/* Tree Structure Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* The Vertical Line (Tree Trunk) */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500/50 via-[#38312e] to-transparent transform md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`relative flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              
              {/* 1. Content Card */}
              <div className="ml-12 md:ml-0 md:w-[45%]">
                <div className="bg-[#1a1614] border border-[#38312e] p-6 rounded-2xl shadow-xl hover:border-orange-500/30 transition-all group">
                  <div className="md:hidden mb-3">{step.icon}</div>
                  <h3 className="text-[#eceae9] text-lg font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#afadac] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* 2. Central Icon/Dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-0 md:-translate-x-1/2 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black border-2 border-orange-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,126,19,0.3)]">
                  <span className="hidden md:block">{step.icon}</span>
                  <span className="md:hidden text-orange-500 font-bold text-sm">{index + 1}</span>
                </div>
              </div>

              {/* 3. Empty Space for Desktop Alignment */}
              <div className="hidden md:block md:w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
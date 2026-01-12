'use client';

import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; 

export default function FAQSection() {
  const { darkMode } = useTheme(); 
  const [activeTab, setActiveTab] = useState('1');
  const [openAccordion, setOpenAccordion] = useState(null);

  const faqData = [
    {
      id: "1",
      title: "Account & Platform",
      faqs: [
        {
          question: "Is my trading account secure?",
          answer: "Yes. Your funds and personal data are protected using advanced encryption, secure servers, and two-factor authentication. Max Trade follows strict security standards to ensure complete account safety.",
        },
        {
          question: "How do I access the Max Trade platform?",
          answer: "You can access Max Trade on any device via web browser, Android, iOS, or desktop applications. Simply sign in and start trading instantly without delays.",
        },
        {
          question: "Can I trade without risking real money?",
          answer: "Absolutely. You can open a free demo account with $50,000 in virtual funds to practice strategies and explore all platform features risk-free.",
        },
        {
          question: "How much money do I need to start trading?",
          answer: "You can start real trading with as little as $5. Our platform is designed to be flexible and beginner-friendly for all budgets.",
        },
        {
          question: "Can I have multiple trading accounts?",
          answer: "Yes. Max Trade allows you to create multiple accounts under the same profile to manage different strategies, assets, or demo and real trading separately.",
        },
      ],
    },
    {
      id: "2",
      title: "Trading & Assets",
      faqs: [
        {
          question: "What trading assets are available?",
          answer: "Max Trade offers over 100 trading assets including forex pairs, stocks, commodities, indices, and cryptocurrencies.",
        },
        {
          question: "What is leverage and margin?",
          answer: "Leverage allows you to control a larger trade size with a smaller deposit. Margin is the required amount to open a leveraged position. These tools can increase profit potential but should be used carefully.",
        },
        {
          question: "What is binary trading?",
          answer: "Binary trading involves predicting whether an asset’s price will go up or down within a fixed time period.",
        },
        {
          question: "Can I lose more than my investment in binary trading?",
          answer: "No. In binary trading, your maximum loss is limited to the amount you invest in a trade.",
        },
        {
          question: "How much can I earn from trading?",
          answer: "Successful trades can offer payouts of up to 218%, depending on the asset and current market conditions.",
        },
      ],
    },
    {
      id: "3",
      title: "Tournaments",
      faqs: [
        {
          question: "What are Max Trade tournaments?",
          answer: "Tournaments are competitive trading events where traders compete with others to win cash prizes, bonuses, and exclusive rewards.",
        },
        {
          question: "How do I join a tournament?",
          answer: "Simply register on the platform, select an available tournament, and start trading during the competition period.",
        },
        {
          question: "Are tournaments free to join?",
          answer: "Yes. Most tournaments are free and can be joined using virtual or real funds. Rules may vary by event.",
        },
        {
          question: "How are winners selected?",
          answer: "Winners are ranked based on trading performance, profit achieved, and overall accuracy during the tournament.",
        },
        {
          question: "What prizes can I win?",
          answer: "Prizes include cash rewards, bonus funds, promotional gifts, and other exclusive benefits.",
        },
      ],
    },
    {
      id: "4",
      title: "Education",
      faqs: [
        {
          question: "What educational resources are available?",
          answer: "Max Trade provides tutorials, guides, webinars, demo accounts, trading strategies, and expert insights to help traders learn and grow.",
        },
        {
          question: "Is Max Trade suitable for beginners?",
          answer: "Yes. Our platform is beginner-friendly with step-by-step guidance and risk-free demo trading for practice.",
        },
        {
          question: "What topics do you cover?",
          answer: "Topics include binary trading, forex, stocks, technical analysis, indicators, risk management, and market trends.",
        },
        {
          question: "Are learning resources free?",
          answer: "Yes. All tutorials, blogs, and demo account features are completely free for registered users.",
        },
        {
          question: "How can I improve my trading skills faster?",
          answer: "Practice on a demo account, follow expert signals, learn from educational content, and participate in tournaments.",
        },
      ],
    },
    {
      id: "5",
      title: "Deposits & Withdrawals",
      faqs: [
        {
          question: "How do I withdraw my funds?",
          answer: "Go to your account dashboard, select the withdrawal option, choose a payment method, and enter the withdrawal amount.",
        },
        {
          question: "Are there any withdrawal or deposit fees?",
          answer: "No. Max Trade does not charge any commission on deposits or withdrawals.",
        },
        {
          question: "How long does withdrawal take?",
          answer: "Withdrawal processing time depends on the payment method and usually takes from a few minutes up to 3 business days.",
        },
        {
          question: "What payment methods are supported?",
          answer: "Over 50 payment methods are supported, including bank transfers, debit/credit cards, and popular e-wallets.",
        },
        {
          question: "Can I cancel a withdrawal request?",
          answer: "Yes. If the withdrawal request is still pending, you can cancel it directly from your account dashboard.",
        },
      ],
    },
  ];

  const currentTab = faqData.find((tab) => tab.id === activeTab) || faqData[0];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section className={`py-8 md:py-12 transition-colors duration-500 flex flex-col items-center font-sans overflow-hidden
      ${darkMode ? "bg-black" : "bg-white"}`}>
      
      <div className="container mx-auto px-4 max-w-7xl">

        <h2 className={`text-xl md:text-3xl font-black italic mb-6 md:mb-8 flex justify-center items-center font-nunito-custom uppercase text-center pb-6 md:pb-10 transition-colors
          ${darkMode ? "text-white" : "text-black"}`}>
          {currentTab.title} <span className="text-[#f99616] ml-2">FAQs</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          
          {/* Left Sidebar - Tabs */}
          <div className="lg:col-span-3">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 md:gap-3 pb-2 lg:pb-0 scrollbar-hide">
              {faqData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setOpenAccordion(null);
                  }}
                  className={`
                    whitespace-nowrap flex-shrink-0 lg:flex-shrink lg:whitespace-normal
                    cursor-pointer rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-3 lg:p-5 flex items-center gap-2 md:gap-3 justify-between transition-all duration-300 shadow-lg border text-xs md:text-base font-bold uppercase italic
                    ${
                      activeTab === tab.id
                        ? 'bg-[#f99616] text-white border-[#f99616] shadow-orange-500/20'
                        : (darkMode ? 'bg-[#0d0d0d] text-gray-400 border-gray-800 hover:border-[#f99616]/50' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#f99616]')
                    }
                  `}
                >
                  <span>{tab.title}</span>
                  {activeTab === tab.id && <Check className="w-3 h-3 md:w-5 md:h-5 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - FAQs */}
          <div className="lg:col-span-9">
            <div className={`rounded-xl md:rounded-[2.5rem] shadow-2xl p-3 md:p-8 lg:p-10 border transition-colors
              ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
              
              <div className="space-y-3 md:space-y-4 font-nunito-custom">
                {currentTab.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#f99616] hover:shadow-orange-500/5
                      ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-3 py-3 md:px-6 md:py-5 text-left flex items-start md:items-center justify-between transition-colors gap-3 md:gap-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 w-full">
                        <span className={`text-[10px] md:text-[11px] font-black uppercase italic px-2 py-1 rounded w-fit whitespace-nowrap
                          ${darkMode ? "text-[#f99616] bg-[#f99616]/10" : "text-white bg-[#f99616]"}`}>
                          Q {index + 1}
                        </span>
                        <h3 className={`text-sm md:text-base font-black uppercase italic tracking-tighter leading-snug transition-colors
                          ${darkMode ? "text-white" : "text-slate-900"}`}>
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 md:w-6 md:h-6 text-[#f99616] transition-transform duration-300 flex-shrink-0 mt-0.5 md:mt-0 ${
                          openAccordion === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        openAccordion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className={`px-3 pb-3 md:px-6 md:pb-6 pt-0 md:pt-2 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                        <p className={`leading-relaxed text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 md:mt-4 transition-colors
                          ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
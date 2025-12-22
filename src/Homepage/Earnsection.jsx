import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CopyTradingUI = () => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [activeTab, setActiveTab] = useState('choose');

  const traders = [
    { id: 1, rank: 1, name: 'x5 Trader', flag: '🇬🇧', return: '279.00%', type: 'purple' },
    { id: 2, rank: 2, name: 'PEN TRADER', flag: '🇲🇽', return: '264.11%', type: 'purple' },
    { id: 3, rank: 3, name: 'James K.', flag: '🇩🇪', return: '251.27%', type: 'purple' },
    { id: 4, rank: 4, name: 'Jacob Stravinsky', flag: '🇨🇭', return: '194.90%', type: 'purple' },
    { id: 5, rank: 5, name: 'Taylor S.', flag: '🇩🇪', return: '151.34%', type: 'yellow' },
    { id: 6, rank: 6, name: 'Nela L.', flag: '🇪🇸', return: '116.22%', type: 'purple' },
    { id: 7, rank: 7, name: 'Donné M.', flag: '🇩🇪', return: '111.46%', type: 'purple' },
    { id: 8, rank: 8, name: 'Uwe Z.', flag: '🇩🇪', return: '108.38%', type: 'purple' },
    { id: 9, rank: 9, name: 'Felix P.', flag: '🇪🇸', return: '102.03%', type: 'purple' },
    { id: 10, rank: 10, name: 'Martin D.', flag: '🇩🇪', return: '95.35%', type: 'purple' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next >= traders.length ? 0 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTraders = () => {
    const visible = [];
    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + traders.length) % traders.length;
      visible.push({ ...traders[index], offset: i });
    }
    return visible;
  };

  const getCardStyle = (offset) => {
    const translateY = offset * 55;
    
    if (offset === 0) {
      return {
        transform: `translateY(${translateY}px) scale(1)`,
        opacity: 1,
        zIndex: 50,
      };
    } else if (Math.abs(offset) === 1) {
      return {
        transform: `translateY(${translateY}px) scale(0.96)`,
        opacity: 0.75,
        zIndex: 45,
      };
    } else if (Math.abs(offset) === 2) {
      return {
        transform: `translateY(${translateY}px) scale(0.92)`,
        opacity: 0.5,
        zIndex: 40,
      };
    } else {
      return {
        transform: `translateY(${translateY}px) scale(0.88)`,
        opacity: 0.25,
        zIndex: 35,
      };
    }
  };

  const getCardClass = (type, offset) => {
    if (offset === 0 && type === 'yellow') {
      return 'bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400';
    }
    return 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800';
  };

  const tabs = [
    { id: 'choose', label: 'Choose The Trader' },
    { id: 'fund', label: 'Fund Your Account' },
    { id: 'watch', label: 'Watch Your Balance Growth' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Copy Successful Traders and Earn
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed px-4">
            CopyTrading interface allows users to replicate successful trading strategies quickly and easily.<br className="hidden sm:block" />
            It's suitable for both experienced and novice traders, providing an efficient and convenient way to maximize profits and achieve financial goals.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 text-sm rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Sliding Cards Container */}
          <div className="relative h-[420px] overflow-hidden">
            {/* Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-pink-50 via-purple-50 to-transparent z-40 pointer-events-none"></div>
            
            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-50 via-purple-50 to-transparent z-40 pointer-events-none"></div>
            
            {/* Cards Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md px-4">
                {getVisibleTraders().map((trader) => (
                  <div
                    key={`${trader.id}-${trader.offset}`}
                    className="absolute w-full left-0 right-0 transition-all duration-500 ease-in-out"
                    style={getCardStyle(trader.offset)}
                  >
                    <div className={`${getCardClass(trader.type, trader.offset)} rounded-xl shadow-lg mx-auto max-w-sm overflow-hidden`}>
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-bold text-sm text-white">
                            {trader.rank}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl leading-none">{trader.flag}</span>
                            <span className="font-semibold text-sm text-white whitespace-nowrap">{trader.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-white font-bold text-base mr-2">{trader.return}</div>
                          <button className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-medium hover:bg-white/30 transition-all flex items-center gap-0.5">
                            $ <ChevronDown className="w-3 h-3" />
                          </button>
                          <button className="px-4 py-1 bg-white text-purple-700 rounded text-xs font-bold hover:bg-gray-50 transition-all">
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side CTA */}
          <div className="text-center lg:text-left px-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-5 leading-tight">
              Copy Successful<br />Traders and Earn
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-7">
              Registration will take less<br />than 1 minute
            </p>
            <button className="group px-9 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2">
              Start Trading Now
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyTradingUI;
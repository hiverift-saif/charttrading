import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAsset, setPayoutPercentage } from '../redux/tradingSlice';
import {
  Search,
  Star,
  X,
  ChevronDown,
  DollarSign,
  Bitcoin,
  Box,
  FileText,
  TrendingUp,
} from 'lucide-react';

const STATIC_DATA = [
  { id: 'GBPUSD', name: 'GBP/USD-OTC', payout: 94, category: 'currencies', icon: 'https://flagcdn.com/w40/gb.png' },
  { id: 'USDARS', name: 'USD/ARS-UTC', payout: 93, category: 'currencies', icon: 'https://flagcdn.com/w40/us.png' },
  { id: 'AUDNZD', name: 'AUD/NZD-UTC', payout: 93, category: 'currencies', icon: 'https://flagcdn.com/w40/au.png' },
  { id: 'AUDJPY', name: 'AUD/JPY-OTC', payout: 92, category: 'currencies', icon: 'https://flagcdn.com/w40/au.png' },
  { id: 'CADJPY', name: 'CAD/JPY-OTC', payout: 92, category: 'currencies', icon: 'https://flagcdn.com/w40/ca.png' },
];

const AssetSelector = () => {
  const dispatch = useDispatch();
  const { currentAsset, payoutPercentage } = useSelector((state) => state.trading);

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('currencies');
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [activeIcon, setActiveIcon] = useState(currentAsset?.icon || 'https://flagcdn.com/w40/gb.png');

  useEffect(() => {
    if (activeCategory === 'crypto') {
      const url = searchTerm.length > 1
        ? `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
        : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

      const fetchData = async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          let rawCoins = searchTerm.length > 1 ? data.coins : data;

          const formatted = rawCoins.slice(0, 50).map(coin => ({
            id: coin.id,
            name: coin.symbol ? `${coin.symbol.toUpperCase()}/USD` : coin.name,
            payout: Math.floor(Math.random() * (95 - 75 + 1)) + 75,
            category: 'crypto',
            icon: coin.large || coin.image || 'https://cdn-icons-png.flaticon.com/512/25/25228.png'
          }));
          setCryptoAssets(formatted);
        } catch (err) {
          console.error("Fetch error:", err);
        }
      };

      const delayDebounce = setTimeout(fetchData, 400);
      return () => clearTimeout(delayDebounce);
    }
  }, [searchTerm, activeCategory]);

  const filteredStatic = STATIC_DATA.filter(
    asset => asset.category === activeCategory && asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayList = activeCategory === 'crypto' ? cryptoAssets : filteredStatic;

  const handleSelect = (asset) => {

     console.log('happy birthday dhor',asset)
    if (asset.category === 'crypto') {
      dispatch(setAsset({
        name: asset.name.split('/')[0].trim(),
        displayName: asset.name,
        id: asset.id,
        icon: asset.icon
      }));
      dispatch(setPayoutPercentage(asset.payout));
      setActiveIcon(asset.icon);
    } else {
      dispatch(setAsset({
        name: asset.name,
        displayName: asset.name,
        id: null,
        icon: asset.icon
      }));
      dispatch(setPayoutPercentage(asset.payout));
      setActiveIcon(asset.icon);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-2 bg-transparent hover:bg-white/10 px-3 py-1 rounded border border-gray-600 text-white text-sm font-medium"
      >
        <img
          src={currentAsset?.icon || activeIcon}
          className="w-5 h-5 rounded-full object-cover"
          alt="asset"
        />
        <span>{currentAsset?.displayName || "BTC/USD"}</span>
        <span className="text-green-400">+{payoutPercentage}%</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed md:absolute top-0 md:top-full left-0 right-0 bottom-0 md:bottom-auto md:left-0 md:mt-2 w-full md:w-[400px] bg-[#131722] md:rounded-lg shadow-2xl z-[9999] flex flex-col border border-[#2a2e39] overflow-hidden h-full md:h-auto max-h-screen md:max-h-[550px]">
            <div className="p-4 border-b border-[#2a2e39]">
              <div className="flex items-center justify-between mb-4 md:hidden">
                <span className="text-white font-bold">Select Asset</span>
                <X onClick={() => setIsOpen(false)} className="text-gray-400 cursor-pointer" />
              </div>
              <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                <CategoryIcon id="currencies" label="Currencies" active={activeCategory} onClick={setActiveCategory} icon={<DollarSign size={18} />} />
                <CategoryIcon id="crypto" label="Crypto" active={activeCategory} onClick={setActiveCategory} icon={<Bitcoin size={18} />} />
                <CategoryIcon id="commodities" label="Commodities" active={activeCategory} onClick={setActiveCategory} icon={<Box size={18} />} />
                <CategoryIcon id="stocks" label="Stocks" active={activeCategory} onClick={setActiveCategory} icon={<FileText size={18} />} />
                <CategoryIcon id="indices" label="Indices" active={activeCategory} onClick={setActiveCategory} icon={<TrendingUp size={18} />} />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[#1e222d] border border-[#3f4451] rounded-md py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="bg-[#1e222d] border border-[#3f4451] p-2 rounded-md text-gray-400 hover:text-yellow-500 transition-colors">
                  <Star size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between px-6 py-2 text-[10px] uppercase text-gray-500 font-bold bg-[#1e222d]">
              <span>Asset</span>
              <span>Payout</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#131722]">
              {displayList.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => handleSelect(asset)}
                  className="flex items-center justify-between px-6 py-3 hover:bg-[#1e222d] cursor-pointer group transition-colors border-b border-[#1e222d]/50"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Star size={14} className="text-gray-600 group-hover:text-yellow-500 transition-colors" />
                    <img src={asset.icon} alt="" className="w-5 h-5 rounded-full object-cover border border-[#3f4451]" />
                    <span className="text-sm text-gray-300 font-medium truncate uppercase">
                      {asset.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    +{asset.payout}%
                  </span>
                </div>
              ))}
              {displayList.length === 0 && (
                <div className="p-10 text-center text-gray-500 text-xs">No assets found</div>
              )}
            </div>
          </div>
        </>
      )}

      <style >{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2e39;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

const CategoryIcon = ({ id, label, active, onClick, icon }) => {
  const isActive = active === id;
  return (
    <div className="relative group">
      <button
        onClick={() => onClick(id)}
        className={`w-10 h-10 md:w-12 md:h-8 flex items-center justify-center rounded-md border transition-all
          ${isActive ? 'bg-[#313644] border-[#4b5563] text-white' : 'bg-[#1e222d] border-[#2a2e39] text-gray-500 hover:border-[#3f4451]'}`}
      >
        {icon}
      </button>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] bg-black text-white whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none hidden md:block">
        {label}
      </div>
    </div>
  );
};

export default AssetSelector;
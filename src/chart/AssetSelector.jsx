import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAsset, setPayoutPercentage } from '../redux/tradingSlice';
import { useTheme } from "../context/ThemeContext"; // Context Import
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
  const { darkMode } = useTheme(); // Theme Hook
  const dispatch = useDispatch();
  const { currentAsset, payoutPercentage } = useSelector((state) => state.trading);

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('currencies');
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [activeIcon, setActiveIcon] = useState(
    currentAsset?.icon || 'https://flagcdn.com/w40/gb.png'
  );

  const closeSelector = useCallback(() => {
    setIsOpen(false);
    setSearchTerm('');
  }, []);

  useEffect(() => {
    if (activeCategory === 'crypto') {
      const url =
        searchTerm.length > 1
          ? `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
          : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`;

      const fetchData = async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          const rawCoins = searchTerm.length > 1 ? data.coins : data;

          const formatted = rawCoins.slice(0, 50).map((coin) => ({
            id: coin.id,
            name: coin.symbol ? `${coin.symbol.toUpperCase()}/USD` : coin.name,
            payout: Math.floor(Math.random() * (95 - 75 + 1)) + 75,
            category: 'crypto',
            icon:
              coin.large ||
              coin.image ||
              'https://cdn-icons-png.flaticon.com/512/25/25228.png',
          }));
          setCryptoAssets(formatted);
        } catch (err) {
          console.error('Fetch error:', err);
        }
      };

      const debounce = setTimeout(fetchData, 400);
      return () => clearTimeout(debounce);
    }
  }, [searchTerm, activeCategory]);

  const filteredStatic = STATIC_DATA.filter(
    (asset) =>
      asset.category === activeCategory &&
      asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayList = activeCategory === 'crypto' ? cryptoAssets : filteredStatic;

  const handleSelect = (asset) => {
    dispatch(
      setAsset({
        name: asset.category === 'crypto' ? asset.name.split('/')[0] : asset.name,
        displayName: asset.name,
        id: asset.id || null,
        icon: asset.icon,
      })
    );
    dispatch(setPayoutPercentage(asset.payout));
    setActiveIcon(asset.icon);
    closeSelector();
  };

  return (
    <div className="relative">
      {/* ===== TRIGGER BUTTON ===== */}
 <button
  onClick={() => setIsOpen((p) => !p)}
  className={`flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all active:scale-95 max-w-fit
    ${darkMode 
      ? "bg-zinc-900/50 hover:bg-zinc-800 border-zinc-700 text-white" 
      : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-black shadow-sm"}`}
>
  {/* Chota Icon */}
  <img
    src={currentAsset?.icon || activeIcon}
    className="w-4 h-4 rounded-full object-cover ring-1 ring-white/10"
    alt="asset"
  />
  
  {/* Asset Name - Chota aur Bold */}
  <span className="text-[11px] font-black uppercase tracking-tight">
    {currentAsset?.displayName?.split('/')[0] || 'BTC'}
  </span>

  {/* Payout - Bina background ke simple */}
  <span className="text-green-500 text-[11px] font-black">
    {payoutPercentage}%
  </span>

  {/* Chota Arrow */}
  <ChevronDown size={12} className={darkMode ? "text-gray-500" : "text-gray-400"} />
</button>

      {isOpen && (
        <>
          {/* ===== MOBILE BACKDROP ===== */}
          <div
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeSelector}
          />

          {/* ===== DROPDOWN PANEL ===== */}
          <div className={`fixed md:absolute top-10 md:top-full left-0 right-0 bottom-0 md:bottom-auto md:mt-2 w-full md:w-[400px] md:rounded-lg shadow-2xl z-[9999] flex flex-col border overflow-hidden h-full md:h-[550px] transition-colors duration-300
            ${darkMode ? "bg-[#131722] border-[#2a2e39]" : "bg-white border-gray-200"}`}>

            {/* ===== PANEL HEADER ===== */}
            <div className={`p-4 border-b relative ${darkMode ? "border-[#2a2e39]" : "border-gray-100"}`}>
              <button
                onClick={closeSelector}
                className={`absolute right-3 top-3 p-2 rounded-full transition
                  ${darkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-black hover:bg-gray-100"}`}
              >
                <X size={22} />
              </button>

              <div className={`mb-4 md:hidden font-bold text-sm ${darkMode ? "text-white" : "text-black"}`}>
                Select Asset
              </div>

              {/* CATEGORY ICONS */}
              <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                <CategoryIcon id="currencies" active={activeCategory} onClick={setActiveCategory} icon={<DollarSign size={18}/>} darkMode={darkMode} />
                <CategoryIcon id="crypto" active={activeCategory} onClick={setActiveCategory} icon={<Bitcoin size={18}/>} darkMode={darkMode} />
                <CategoryIcon id="commodities" active={activeCategory} onClick={setActiveCategory} icon={<Box size={18}/>} darkMode={darkMode} />
                <CategoryIcon id="stocks" active={activeCategory} onClick={setActiveCategory} icon={<FileText size={18}/>} darkMode={darkMode} />
                <CategoryIcon id="indices" active={activeCategory} onClick={setActiveCategory} icon={<TrendingUp size={18}/>} darkMode={darkMode} />
              </div>

              {/* SEARCH */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search assets..."
                    className={`w-full border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none transition-all
                      ${darkMode 
                        ? "bg-[#1e222d] border-[#3f4451] text-white placeholder:text-gray-500 focus:border-blue-500" 
                        : "bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 focus:border-blue-600"}`}
                  />
                </div>
                <button className={`border p-2 rounded-md transition-colors ${darkMode ? "bg-[#1e222d] border-[#3f4451] text-gray-400 hover:text-yellow-500" : "bg-gray-50 border-gray-200 text-gray-500 hover:text-yellow-600 shadow-sm"}`}>
                  <Star size={18} />
                </button>
              </div>
            </div>

            {/* ===== LIST HEADER ===== */}
            <div className={`flex justify-between px-6 py-2 text-[10px] uppercase font-bold transition-colors
              ${darkMode ? "text-gray-500 bg-[#1e222d]" : "text-gray-400 bg-gray-50"}`}>
              <span>Asset</span>
              <span>Payout</span>
            </div>

            {/* ===== ASSET LIST ===== */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar ${darkMode ? "bg-[#131722]" : "bg-white"}`}>
              {displayList.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => handleSelect(asset)}
                  className={`flex items-center justify-between px-6 py-3 cursor-pointer border-b transition-colors
                    ${darkMode 
                      ? "hover:bg-[#1e222d] border-[#1e222d]/50 text-gray-200" 
                      : "hover:bg-gray-50 border-gray-100 text-gray-800"}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Star size={14} className={darkMode ? "text-gray-600" : "text-gray-300"} />
                    <img src={asset.icon} className="w-5 h-5 rounded-full object-cover shadow-sm" alt={asset.name} />
                    <span className="text-sm font-medium truncate uppercase tracking-tight">
                      {asset.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-green-500">
                    +{asset.payout}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${darkMode ? "#3f4451" : "#cbd5e1"};
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

// Reusable Category Button with Theme Logic
const CategoryIcon = ({ id, active, onClick, icon, darkMode }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all
      ${active === id
        ? (darkMode ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm')
        : (darkMode ? 'bg-[#1e222d] border-[#2a2e39] text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200')}`}
  >
    {icon}
  </button>
);

export default AssetSelector;
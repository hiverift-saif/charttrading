import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeframe } from '../redux/tradingSlice'; // Ensure this action exists in redux
import { Clock } from 'lucide-react';

const TIMEFRAMES = ['1m', '5m', '15m', '30m', '1h', '4h', '1d'];

const TimeframeSelector = () => {
  const dispatch = useDispatch();
  const { timeframe } = useSelector((state) => state.trading);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (tf) => {
    dispatch(setTimeframe(tf));
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      
      {/* --- BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 bg-[#2a2726] hover:bg-[#353130] text-white h-8 px-2 lg:px-3 rounded border border-gray-700 transition-all min-w-[50px]"
      >
        <span className="text-xs font-bold uppercase">{timeframe || '1m'}</span>
      </button>

      {/* --- DROPDOWN (Fixed Z-Index Fix) --- */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute top-10 left-0 w-[80px] bg-[#1e1b1a] border border-gray-700 rounded shadow-xl z-50 overflow-hidden">
            <div className="flex flex-col">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleSelect(tf)}
                  className={`
                    px-3 py-2 text-xs font-bold text-left hover:bg-[#2a2726] transition-colors
                    ${timeframe === tf ? 'text-[#2ebd85] bg-[#2a2726]' : 'text-gray-400'}
                  `}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeframeSelector;
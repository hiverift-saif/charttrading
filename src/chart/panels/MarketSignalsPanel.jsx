import React from 'react';
import { X, Radio } from 'lucide-react';

const MarketSignalsPanel = ({ onClose, darkMode }) => {
  return (
    <>
      <div className={`p-4 border-b flex justify-between items-center ${darkMode ? "bg-[#161413] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
        <h5 className="font-bold text-sm flex items-center gap-2">Signals <Radio size={14} /></h5>
        <button onClick={onClose} className="text-gray-500"><X size={18} /></button>
      </div>
      <div className="p-4 text-center opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-widest">No Signals Available</p>
      </div>
    </>
  );
};
export default MarketSignalsPanel;
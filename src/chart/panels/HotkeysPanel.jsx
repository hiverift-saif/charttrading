import React from 'react';
import { X, Keyboard, MousePointer2 } from 'lucide-react';

const HotkeysPanel = ({ onClose, darkMode }) => {
  const keys = [
    { cmd: "Up Arrow", action: "Open Buy" },
    { cmd: "Down Arrow", action: "Open Sell" },
    { cmd: "Space", action: "Switch Asset" },
    { cmd: "Esc", action: "Cancel Trade" },
  ];

  return (
    <>
      <div className={`p-4 border-b flex justify-between items-center ${darkMode ? "border-zinc-800" : "border-gray-100"}`}>
        <h5 className="font-bold text-sm flex items-center gap-2 uppercase tracking-tighter">Terminal Keys <Keyboard size={16} /></h5>
        <button onClick={onClose} className="text-gray-500"><X size={18} /></button>
      </div>
      <div className="p-4 space-y-2">
        {keys.map((k, i) => (
          <div key={i} className={`flex justify-between items-center p-3 rounded-xl border ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-200"}`}>
            <span className="text-[10px] font-bold text-gray-500 uppercase">{k.action}</span>
            <kbd className="px-2 py-1 bg-zinc-800 text-[#f99616] rounded border border-zinc-700 text-[10px] font-black min-w-[30px] text-center">{k.cmd}</kbd>
          </div>
        ))}
        <div className="mt-6 p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-center">
           <MousePointer2 size={20} className="mx-auto text-blue-500 mb-2" />
           <p className="text-[9px] font-black text-blue-500 uppercase">Pro Mode Enabled</p>
        </div>
      </div>
    </>
  );
};
export default HotkeysPanel;
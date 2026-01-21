import React from 'react';
import { X, Send, MessageSquare, ShieldCheck, Globe } from 'lucide-react';

const OfficialSupportPanel = ({ onClose, darkMode }) => {
  return (
    <>
      <div className={`p-4 border-b flex justify-between items-center ${darkMode ? "border-zinc-800" : "border-gray-100"}`}>
        <h5 className="font-bold text-sm flex items-center gap-2 uppercase tracking-tighter">Official Hub <Send size={16} className="text-blue-400" /></h5>
        <button onClick={onClose} className="text-gray-500"><X size={18} /></button>
      </div>
      <div className="p-6 space-y-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[#f99616] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-500/20 rotate-3">
           <ShieldCheck size={32} className="text-black" />
        </div>
        <div>
          <h4 className="font-black text-sm uppercase italic">Binovera Protocol</h4>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Authorized Support Channels</p>
        </div>
        
        <div className="w-full space-y-3 pt-4">
          <button className="w-full py-4 rounded-2xl bg-[#0088cc] text-white text-[10px] font-black uppercase flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-95">
            <Send size={16} /> Telegram Community
          </button>
          <button className="w-full py-4 rounded-2xl border border-zinc-800 text-[10px] font-black uppercase flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-zinc-900">
            <MessageSquare size={16} className="text-[#f99616]" /> Live Chat Support
          </button>
        </div>
        
        <p className="text-[8px] text-gray-600 font-bold uppercase mt-10">System Version 4.8.2-stable</p>
      </div>
    </>
  );
};
export default OfficialSupportPanel;

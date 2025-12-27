import React, { useState } from 'react';
import { X, Plus, ChevronRight } from 'lucide-react';

const TournamentModal = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState('description'); // 'description' or 'rating'

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
      {/* Modal Container */}
      <div className="bg-[#2a2e39] w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden border border-gray-700 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-white font-bold text-lg">Tournament "{data.name}"</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Internal Tabs */}
        <div className="flex gap-2 p-4 pb-0">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all border ${activeTab === 'description' ? 'bg-[#374151] border-blue-500 text-white' : 'border-gray-700 text-gray-400 hover:text-gray-200'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('rating')}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all border ${activeTab === 'rating' ? 'bg-[#374151] border-blue-500 text-white' : 'border-gray-700 text-gray-400 hover:text-gray-200'}`}
          >
            Rating
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          
          {activeTab === 'description' ? (
            /* --- DESCRIPTION TAB --- */
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <StatBox label="Participation fee" value={data.fee} />
                <StatBox label="Starting balance" value="₮1,000" />
                <StatBox label="Ends in" value={data.endsIn} color="text-white" />
                <StatBox label="Prize fund" value={data.prize} />
                <StatBox label="Current participants" value="278" />
                <StatBox label="Re-buy fee" value={data.fee} />
              </div>

              <div className="bg-[#1f232c] rounded-lg border border-gray-800 p-3 flex justify-between items-center">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Rules of the Tournament</span>
                <Plus size={16} className="text-gray-400" />
              </div>

              <div className="text-[11px] text-gray-400 leading-relaxed text-center px-4">
                To participate in the tournament you should register with our company first. 
                You have insufficient funds for participation. You need to top up the balance 
                of your Real account in the amount of {data.fee} to be able to take part.
              </div>
            </div>
          ) : (
            /* --- RATING (LEADERBOARD) TAB --- */
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase pb-2 border-b border-gray-800">
                <div className="flex gap-8"><span>#</span> <span>Trader</span></div>
                <div className="flex gap-12 text-right"><span>Result, ₮</span> <span>Prize</span></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((rank) => (
                  <div key={rank} className="flex justify-between items-center text-xs">
                    <div className="flex gap-6 items-center">
                      <span className={`w-4 ${rank <= 3 ? 'text-yellow-500' : 'text-gray-500'}`}>{rank}</span>
                      <span className="text-gray-200">Trader_{rank}99</span>
                    </div>
                    <div className="flex gap-10 font-mono">
                      <span className="text-gray-300">99,266.80</span>
                      <span className="text-green-500 font-bold w-12 text-right">₹75,000</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-[#1f232c]">
          <button className="w-full bg-[#0ea5e9] hover:bg-blue-600 text-white font-bold py-3 rounded text-sm transition-all shadow-lg active:scale-95">
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal Helper Component
const StatBox = ({ label, value, color = "text-gray-200" }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] text-gray-500 font-medium leading-tight">{label}</span>
    <span className={`text-xs font-bold ${color}`}>{value}</span>
  </div>
);

export default TournamentModal;
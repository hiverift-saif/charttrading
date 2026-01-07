import React, { useState } from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliatePromo() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [activeTab, setActiveTab] = useState('landings');

  const banners = [
    {
      id: 1,
      title: "Banner 1 (728x90)",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070",
      size: "100x90",
    },
    {
      id: 2,
      title: "Banner 2 (300x250)",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070",
      size: "100x90",
    },
    {
      id: 3,
      title: "Banner 3 (160x600)",
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070",
      size: "100x90",
    },
  ];

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };
  
  return (
    <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      <div className="flex flex-col gap-2">
        
        {/* Tab Switcher */}
        <div className={`flex flex-wrap gap-2 border rounded-xl p-1 transition-colors 
          ${darkMode ? "bg-black border-gray-800" : "bg-gray-100 border-gray-200"}`}>
          {['landings', 'banners'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 min-w-[100px] px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === tab 
                ? 'bg-[#f99616] text-white shadow-lg shadow-orange-500/20' 
                : darkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-slate-900 hover:bg-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'landings' ? 'Referral Landings' : 'Banners'}
            </button>
          ))}
        </div>

        {/* --- LANDINGS TAB --- */}
        {activeTab === 'landings' && (
          <div className={`rounded-xl border p-12 text-center shadow-2xl transition-all duration-500
            ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="bg-[#f99616]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#f99616]/20">
               <ImageIcon className="w-10 h-10 text-[#f99616]" aria-hidden="true" />
            </div>
            <h3 className={`text-2xl mb-2 font-black uppercase italic tracking-tighter ${darkMode ? "text-white" : "text-slate-900"}`}>
              Invest anytime, anywhere
            </h3>
            <p className="text-gray-500 mb-8 uppercase text-[10px] font-bold tracking-widest">
              Download our promotional materials to start earning
            </p>
            <button
              className="inline-flex items-center justify-center gap-2 h-12 px-8 py-2 w-full sm:w-auto rounded-xl text-xs font-black uppercase tracking-widest bg-[#f99616] hover:bg-[#e88914] text-white transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Download Assets
            </button>
          </div>
        )}

        {/* --- BANNERS TAB --- */}
        {activeTab === "banners" && (
          <div className={`rounded-xl border p-6 shadow-2xl transition-all duration-500
            ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}>
            <h3 className="text-xs text-gray-500 mb-6 font-black uppercase tracking-[3px]">
              Promotional Banners
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className={`border rounded-2xl overflow-hidden flex flex-col group transition-all
                    ${darkMode ? "bg-[#0d0d0d] border-gray-800 hover:border-[#f99616]/30" : "bg-gray-50 border-gray-200 hover:border-[#f99616]"}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={banner.img}
                      alt={banner.title}
                      className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-60 ${darkMode ? "from-black" : "from-slate-900"}`}></div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${darkMode ? "text-white" : "text-slate-900"}`}>
                        {banner.title}
                      </h4>
                      <p className="text-[#f99616] text-[9px] font-bold uppercase tracking-widest">
                        Size: {banner.size}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDownload(banner.img)}
                      className={`mt-6 inline-flex items-center justify-center gap-2 h-11 px-4 py-2 w-full rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border
                        ${darkMode 
                          ? "bg-white/5 border-white/10 text-white hover:bg-[#f99616] hover:border-[#f99616]" 
                          : "bg-white border-gray-200 text-slate-600 hover:bg-[#f99616] hover:text-white hover:border-[#f99616] shadow-sm"}`}
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AffiliatePromo;
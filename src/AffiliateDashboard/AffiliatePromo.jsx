import React, { useState, useEffect } from 'react';
import { Download, Image as ImageIcon, Ticket, Loader2, Copy, CheckCircle } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import axios from 'axios';
import API_CONFIG from '../config';

function AffiliatePromo() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('landings');
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  // 🚀 Logic: Fetch Promo Codes from API
  const fetchPromos = async () => {
    const token = localStorage.getItem("affiliate_token");
    try {
      setLoading(true);
      const response = await axios.get(`${API_CONFIG.baseURL}/influencer/promo`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.statusCode === 200) {
        setPromoCodes(response.data.result || []);
      }
    } catch (error) {
      console.error("Promo fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'promos') {
      fetchPromos();
    }
  }, [activeTab]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Static Banners Data (Maintained)
  const banners = [
    { id: 1, title: "Banner 1 (728x90)", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070", size: "100x90" },
    { id: 2, title: "Banner 2 (300x250)", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070", size: "100x90" },
    { id: 3, title: "Banner 3 (160x600)", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2070", size: "100x90" },
  ];

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "promo-asset.jpg";
    link.click();
  };

  return (
    <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      <div className="flex flex-col gap-2">
        
        {/* Tab Switcher */}
        <div className={`flex flex-wrap gap-2 border rounded-xl p-1 transition-colors 
          ${darkMode ? "bg-black border-gray-800" : "bg-gray-100 border-gray-200 shadow-inner"}`}>
          {['landings', 'banners', 'promos'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 min-w-[100px] px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === tab 
                ? 'bg-[#f99616] text-black shadow-lg' 
                : darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'landings' ? 'Landings' : tab === 'banners' ? 'Banners' : 'My Promo Codes'}
            </button>
          ))}
        </div>

        {/* --- LANDINGS TAB --- */}
        {activeTab === 'landings' && (
          <div className={`rounded-3xl border p-12 text-center shadow-2xl transition-all duration-500
            ${darkMode ? "bg-[#0a0a0a] border-gray-800 shadow-black" : "bg-white border-gray-100"}`}>
            <div className="bg-[#f99616]/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-[#f99616]/20">
               <ImageIcon className="w-10 h-10 text-[#f99616]" />
            </div>
            <h3 className={`text-2xl mb-2 font-black uppercase italic tracking-tighter ${darkMode ? "text-white" : "text-slate-900"}`}>
              Invest anytime, anywhere
            </h3>
            <p className="text-gray-500 mb-8 uppercase text-[10px] font-bold tracking-widest leading-relaxed">
              Download professional landing materials <br/> to maximize your conversion rate
            </p>
            <button
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl text-xs font-black uppercase tracking-widest bg-[#f99616] text-black hover:bg-[#e88914] transition-all active:scale-95 shadow-xl shadow-orange-500/20"
            >
              <Download className="w-4 h-4" /> Download Assets
            </button>
          </div>
        )}

        {/* --- BANNERS TAB --- */}
        {activeTab === "banners" && (
          <div className={`rounded-3xl border p-6 shadow-2xl transition-all duration-500
            ${darkMode ? "bg-[#0a0a0a] border-gray-800 shadow-black" : "bg-white border-gray-100"}`}>
            <h3 className="text-xs text-gray-500 mb-6 font-black uppercase tracking-[3px]">Marketing Banners</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className={`border rounded-3xl overflow-hidden flex flex-col group transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={banner.img} alt={banner.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">{banner.title}</h4>
                    <p className="text-[#f99616] text-[9px] font-bold uppercase">Size: {banner.size}</p>
                    <button onClick={() => handleDownload(banner.img)} className={`mt-6 w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${darkMode ? "bg-white/5 border-white/10 hover:bg-[#f99616] hover:text-black" : "bg-white border-gray-200 hover:bg-[#f99616] hover:text-white hover:border-[#f99616]"}`}>
                      <Download className="w-4 h-4 mr-2 inline" /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 🚀 PROMO CODES TAB (API INTEGRATED) --- */}
        {activeTab === "promos" && (
          <div className={`rounded-3xl border p-6 shadow-2xl transition-all duration-500
            ${darkMode ? "bg-[#0a0a0a] border-gray-800 shadow-black" : "bg-white border-gray-100"}`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs text-gray-500 font-black uppercase tracking-[3px]">Active Promo Codes</h3>
              {loading && <Loader2 className="animate-spin text-[#f99616] w-5 h-5" />}
            </div>

            {promoCodes.length === 0 && !loading ? (
              <div className="py-20 text-center text-gray-500 uppercase font-black text-[10px] tracking-[4px]">No promo codes found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promoCodes.map((code, index) => (
                  <div key={index} className={`p-6 rounded-2xl border flex items-center justify-between transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800 hover:border-[#f99616]/40" : "bg-gray-50 border-gray-200 hover:border-[#f99616]"}`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#f99616]/10 text-[#f99616] rounded-xl"><Ticket size={20} /></div>
                      <div>
                         <p className="text-[10px] font-black text-gray-500 uppercase">Promo Code</p>
                         <p className="text-lg font-black italic tracking-widest text-[#f99616]">{code}</p>
                      </div>
                    </div>
                    <button onClick={() => handleCopy(code)} className={`p-2 rounded-lg transition-all ${copiedCode === code ? 'text-green-500' : 'text-gray-500 hover:text-white'}`}>
                      {copiedCode === code ? <CheckCircle size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default AffiliatePromo;
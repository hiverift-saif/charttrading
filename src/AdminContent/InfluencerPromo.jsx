import React, { useState, useEffect } from 'react';
import { useTheme } from "../context/ThemeContext";
import { 
  Ticket, Image as ImageIcon, Send, Loader2, 
  UploadCloud, Trash2, Search, ChevronLeft, 
  ChevronRight, RefreshCcw, Star 
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_CONFIG from '../config';

const InfluencerPromo = () => {
  const { darkMode } = useTheme();
  const [promoName, setPromoName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // 🔍 Table & Search States (As per KYC standard)
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🚀 Logic: Create Promo POST API
  const handleCreatePromo = async (e) => {
    e.preventDefault();
    if (!promoName.trim()) return;

    const token = localStorage.getItem("admin_token");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/influencer/promo`, 
        { promoCode: promoName.trim() }, 
        { 
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
        }
      );

      if (response.data.statusCode === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Code Generated',
          text: `Promo code "${response.data.result.promoCode}" is ready!`,
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          confirmButtonColor: '#f99616',
        });
        setPromoName("");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: error.response?.data?.message || 'Server error',
        background: darkMode ? '#0d0d0d' : '#fff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
          Influencer <span className="text-[#f99616]">Promo</span>
        </h2>
        <span className="text-[10px] font-black bg-[#f99616]/10 text-[#f99616] px-3 py-1 rounded-md border border-[#f99616]/20">
          GROWTH ENGINE ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 🚀 FORM SECTION (Consistent Sharp Design) */}
        <div className={`p-8 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-xl"}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#f99616]/10 rounded-2xl text-[#f99616]"><Ticket size={24} /></div>
            <div>
              <h3 className="text-lg font-black uppercase italic tracking-tighter italic">Generate Identifier</h3>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Create referral nodes</p>
            </div>
          </div>

          <form onSubmit={handleCreatePromo} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-[2px] ml-1">Promo Code String</label>
              <input 
                type="text" placeholder="E.G. BINOVERA2026" value={promoName}
                onChange={(e) => setPromoName(e.target.value.toUpperCase())}
                className={`w-full h-14 px-6 rounded-2xl border outline-none transition-all font-black tracking-widest ${darkMode ? "bg-zinc-900/30 border-zinc-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200"}`}
              />
            </div>

            <button 
              type="submit" disabled={isLoading || !promoName}
              className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all active:scale-95 ${isLoading ? "bg-zinc-800 text-gray-500" : "bg-[#f99616] text-black shadow-lg shadow-[#f99616]/20"}`}
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={18} />}
              {isLoading ? "Synchronizing..." : "Initialize Code"}
            </button>
          </form>
        </div>

        {/* 🚀 BANNER SECTION (Sharp Design) */}
        <div className={`p-8 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-xl"}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><ImageIcon size={24} /></div>
               <h3 className="text-lg font-black uppercase italic tracking-tighter italic">Brand Asset</h3>
            </div>
            {selectedImage && (
              <button onClick={() => setSelectedImage(null)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
            )}
          </div>

          <div className="relative">
            <input type="file" id="promoImg" className="hidden" accept="image/*" onChange={handleImageChange} />
            <label 
              htmlFor="promoImg"
              className={`w-full h-60 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-all ${darkMode ? "border-zinc-800 bg-white/5 hover:border-[#f99616]/50" : "border-gray-200 bg-gray-50 hover:border-[#f99616]"}`}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform"><UploadCloud size={24} className="text-gray-500 group-hover:text-[#f99616]" /></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload Marketing Banner</p>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      {/* 🚀 STATUS INFO */}
      <div className={`p-6 rounded-[2rem] border flex items-center justify-between ${darkMode ? "bg-black border-zinc-800" : "bg-white shadow-lg"}`}>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center`}><Star size={12} className="text-[#f99616]"/></div>)}
             </div>
             <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest italic">500+ Nodes actively distributing signals</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-[#f99616]"><RefreshCcw size={14}/> Sync Metrics</button>
      </div>

    </div>
  );
};

export default InfluencerPromo;
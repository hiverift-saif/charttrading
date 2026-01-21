import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import { Ticket, Image as ImageIcon, Send, Loader2, UploadCloud, Trash2 } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_CONFIG from '../config';

const InfluencerPromo = () => {
  const { darkMode } = useTheme();
  const [promoName, setPromoName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 🚀 Logic: Create Promo POST API
  const handleCreatePromo = async (e) => {
    e.preventDefault();
    if (!promoName.trim()) return;

    const token = localStorage.getItem("affiliate_token");
    setIsLoading(true);

    try {
      // 📡 POST Request as per your requirement
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
          text: `Your new promo code "${response.data.result.promoCode}" is ready!`,
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          confirmButtonColor: '#f99616',
          timer: 3000
        });
        setPromoName("");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: error.response?.data?.message || 'Server error, try again.',
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🚀 Image Handling Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 🚀 FORM SECTION (POST METHOD) */}
        <div className={`p-8 rounded-3xl border transition-all ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-100 shadow-xl"}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#f99616]/10 rounded-2xl text-[#f99616]">
              <Ticket size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter">Influencer Promo</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Create a custom referral identifier</p>
            </div>
          </div>

          <form onSubmit={handleCreatePromo} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-[2px] ml-1">Unique Promo Code</label>
              <input 
                type="text"
                placeholder="E.G. NEWYEAR2026"
                value={promoName}
                onChange={(e) => setPromoName(e.target.value.toUpperCase())}
                className={`w-full h-14 px-6 rounded-2xl border outline-none transition-all font-black tracking-widest
                  ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200 focus:border-[#f99616]"}`}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading || !promoName}
              className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all active:scale-95
                ${isLoading ? "bg-gray-800 text-gray-500" : "bg-[#f99616] text-black hover:bg-[#e88a14] shadow-xl shadow-[#f99616]/10"}`}
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send size={18} />}
              {isLoading ? "Synchronizing..." : "Initialize Promo Code"}
            </button>
          </form>
        </div>

        {/* 🚀 STATIC IMAGE UPLOAD SECTION */}
        <div className={`p-8 rounded-3xl border transition-all ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-100 shadow-xl"}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><ImageIcon size={24} /></div>
               <h3 className="text-xl font-black uppercase italic tracking-tighter">Brand Banner</h3>
            </div>
            {selectedImage && (
              <button onClick={() => setSelectedImage(null)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg">
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="relative">
            <input type="file" id="promoImg" className="hidden" accept="image/*" onChange={handleImageChange} />
            <label 
              htmlFor="promoImg"
              className={`w-full h-60 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-all
                ${darkMode ? "border-gray-800 bg-white/5 hover:border-[#f99616]/50" : "border-gray-200 bg-gray-50 hover:border-[#f99616]"}`}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} className="text-gray-500 group-hover:text-[#f99616]" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload Marketing Asset</p>
                </div>
              )}
            </label>
          </div>
          
          <p className="mt-4 text-[9px] text-gray-400 font-bold uppercase text-center">
            Supported formats: PNG, JPG (Max 5MB)
          </p>
        </div>
      </div>

      {/* 🚀 STATUS INFO */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-100"}`}>
         <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className={`w-6 h-6 rounded-full border-2 border-black bg-gray-800`}></div>)}
         </div>
         <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
           Join 500+ influencers using custom promo nodes
         </p>
      </div>

    </div>
  );
};

export default InfluencerPromo;
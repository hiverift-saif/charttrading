import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Globe, ArrowLeft, Save, Camera, Loader2, Trash2 } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';
import Swal from 'sweetalert2';

const ProfilePage = ({ setActiveTab }) => {
  const { darkMode } = useTheme();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  // 🚀 Initial Profile State
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'India',
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" // Default static image
  });

  useEffect(() => {
    const savedName = localStorage.getItem('user_name') || "Trader Ali";
    const savedEmail = localStorage.getItem('user_email') || "user@example.com";
    const savedAvatar = localStorage.getItem('user_avatar');
    
    const nameParts = savedName.split(" ");
    setProfile(prev => ({
      ...prev,
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: savedEmail,
      avatar: savedAvatar || prev.avatar
    }));
  }, []);

  // 🚀 Image Upload Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
        localStorage.setItem('user_avatar', reader.result); // Temporary local save
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) return;
    setLoading(true);

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          // Agar backend image accept kar raha hai toh avatar bhi bhej sakte hain
        })
      });

      if (response.ok) {
        localStorage.setItem('user_name', `${profile.firstName} ${profile.lastName}`);
        Swal.fire({
          icon: 'success',
          title: 'Protocol Updated',
          text: 'Profile and identity saved successfully',
          confirmButtonColor: '#f99616',
          background: darkMode ? '#0d0d0d' : '#fff',
        });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-full w-full p-4 md:p-10 overflow-y-auto transition-colors duration-500
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* --- HEADER --- */}
        <div className={`flex items-center gap-4 mb-8 pb-6 border-b ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
          <button onClick={() => setActiveTab('chart')} className="p-2 border rounded-xl hover:border-[#f99616] transition-all">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase italic">Edit <span className="text-[#f99616]">Profile</span></h2>
            <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[3px]">Manage Identity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDE: IMAGE UPLOAD --- */}
          <div className="lg:col-span-4">
            <div className={`rounded-[2.5rem] border p-8 text-center relative overflow-hidden shadow-2xl ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className={`w-full h-full rounded-full flex items-center justify-center border-4 overflow-hidden ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-white"}`}>
                  <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                
                {/* Hidden Input */}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 p-2 bg-[#f99616] rounded-full border-4 border-black hover:scale-110 transition-all shadow-lg"
                >
                  <Camera size={16} className="text-white" />
                </button>
              </div>

              <h3 className="text-lg font-black uppercase">{profile.firstName} {profile.lastName}</h3>
              <p className="text-[10px] text-gray-500 font-bold mb-4">{profile.email}</p>
              
              <button 
                onClick={() => setProfile({...profile, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"})}
                className="text-[9px] font-black uppercase text-red-500 hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <Trash2 size={12} /> Reset to Default
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <div className="lg:col-span-8">
            <div className={`rounded-[2.5rem] border p-6 md:p-10 shadow-2xl ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleUpdateProfile}>
                <InputField label="First Name" name="firstName" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} icon={<User size={16}/>} darkMode={darkMode} />
                <InputField label="Last Name" name="lastName" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} icon={<User size={16}/>} darkMode={darkMode} />
                <InputField label="Email (Locked)" value={profile.email} disabled icon={<Mail size={16}/>} darkMode={darkMode} />
                <InputField label="Country" value={profile.country} disabled icon={<Globe size={16}/>} darkMode={darkMode} />
                
                <div className="md:col-span-2 pt-6">
                  <button type="submit" disabled={loading} className="w-full md:w-auto bg-[#f99616] hover:bg-[#e88914] text-black font-black text-xs uppercase tracking-[2px] py-4 px-12 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-orange-500/20">
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Save Identity</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, icon, disabled = false, darkMode }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">{label}</label>
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`}>{icon}</div>
      <input value={value} onChange={onChange} disabled={disabled} className={`w-full border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold transition-all outline-none ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200 text-black focus:border-[#f99616]"} ${disabled ? 'opacity-50 cursor-not-allowed border-dashed' : ''}`} />
    </div>
  </div>
);

export default ProfilePage;
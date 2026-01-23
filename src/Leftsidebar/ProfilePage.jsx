import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Globe, ArrowLeft, Save, Camera, Loader2, Trash2, 
  ShieldCheck, Phone, Smartphone, CheckCircle, ArrowRight, FileCheck, Clock 
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import { useSelector, useDispatch } from 'react-redux';
import { setKycStatus } from '../redux/tradingSlice';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProfilePage = ({ setActiveTab }) => {
  const { darkMode } = useTheme();
  const dispatch = useDispatch();
  
  // Refs for file inputs
  const fileInputRef = useRef(null);
  const aadhaarInputRef = useRef(null);
  const panInputRef = useRef(null);

  // Redux & Global State
  const { kycStatus } = useSelector((state) => state.trading);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('profile'); // 'profile' or 'kyc'
  
  // Profile Form State
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    country: '',
    avatar: null,
    avatarPath: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  });

  // KYC State
  const [kycStep, setKycStep] = useState(1);
  const [kycData, setKycData] = useState({
    phone: '', otp: '', aadhaarNumber: '', panNumber: '', aadhaarImage: null, panImage: null
  });
  const [previews, setPreviews] = useState({ aadhaar: null, pan: null });

  // 🚀 Initial Load: Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const res = await axios.get(`${API_CONFIG.baseURL}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data.result;
        setProfile({
          name: data.name || "",
          email: data.email || "",
          country: data.country || "",
          avatar: null,
          avatarPath: data.avatarPath || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        });
        dispatch(setKycStatus(data.kycStatus));
      } catch (err) {
        console.error("Profile Load Error", err);
      }
    };
    fetchProfile();
  }, [dispatch]);

  // --- PROFILE LOGIC ---
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(prev => ({ ...prev, avatar: file, avatarPath: URL.createObjectURL(file) }));
    }
  };

  const handleSyncProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('country', profile.country);
    if (profile.avatar) formData.append('avatar', profile.avatar);

    setLoading(true);
    try {
      const response = await axios.patch(`${API_CONFIG.baseURL}/auth/profile`, formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 200) {
        Swal.fire({ icon: 'success', title: 'Update Successful', timer: 2000, showConfirmButton: false });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Update Failed', text: error.response?.data?.message || "Error" });
    } finally { setLoading(false); }
  };

  // --- 🚀 KYC LOGIC (Integrated from your code) ---
  const handleKycInputChange = (e) => {
    setKycData({ ...kycData, [e.target.name]: e.target.value });
  };

  const handleKycImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setKycData(prev => ({ ...prev, [type === 'aadhaar' ? 'aadhaarImage' : 'panImage']: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviews(prev => ({ ...prev, [type]: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const startKYC = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_CONFIG.baseURL}/kyc/start`, 
        { phone: kycData.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200 || response.status === 201) {
        setKycStep(2);
        Swal.fire({ icon: 'info', title: 'OTP Sent', text: 'Check your phone.' });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed', text: err.response?.data?.message || 'Error sending OTP' });
    } finally { setLoading(false); }
  };

  const completeKYC = async (e) => {
    e.preventDefault();
    if (!kycData.aadhaarImage || !kycData.panImage) return Swal.fire({ icon: 'warning', text: 'Upload both images' });
    
    setLoading(true);
    const uploadData = new FormData();
    uploadData.append('otp', kycData.otp);
    uploadData.append('aadhaarNumber', kycData.aadhaarNumber);
    uploadData.append('panNumber', kycData.panNumber);
    uploadData.append('documents', kycData.aadhaarImage);
    uploadData.append('documents', kycData.panImage);

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${API_CONFIG.baseURL}/kyc/complete`, uploadData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(setKycStatus('pending'));
        setKycStep(4);
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Submission Failed', text: err.response?.data?.message || 'Check Details' });
    } finally { setLoading(false); }
  };

  return (
    <div className={`min-h-full w-full p-4 md:p-10 overflow-y-auto transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className={`flex items-center justify-between mb-8 pb-6 border-b ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('chart')} className="p-2 border rounded-xl hover:border-[#f99616] transition-all">
              <ArrowLeft size={20} className="text-gray-400" />
            </button>
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Identity <span className="text-[#f99616]">Management</span></h2>
          </div>
          
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${kycStatus === 'approved' ? "bg-green-500/10 border-green-500/30 text-green-500" : "bg-yellow-500/10 border-yellow-500/30 text-yellow-500"}`}>
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">{kycStatus}</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 bg-[#111] p-1.5 rounded-2xl w-fit border border-gray-800">
          <button onClick={() => setActiveSection('profile')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'profile' ? "bg-[#f99616] text-black" : "text-gray-500"}`}>Edit Profile</button>
          <button onClick={() => setActiveSection('kyc')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'kyc' ? "bg-[#f99616] text-black" : "text-gray-500"}`}>KYC Verification</button>
        </div>

        {activeSection === 'profile' ? (
          /* --- PROFILE UI --- */
          <form onSubmit={handleSyncProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-4">
              <div className={`rounded-[2.5rem] border p-8 text-center relative shadow-2xl ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className={`w-full h-full rounded-full flex items-center justify-center border-4 overflow-hidden ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-white"}`}>
                    <img src={profile.avatarPath} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageSelect} className="hidden" accept="image/*" />
                  <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 p-2 bg-[#f99616] rounded-full border-4 border-black hover:scale-110 transition-all shadow-lg">
                    <Camera size={16} className="text-white" />
                  </button>
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">{profile.name || "User"}</h3>
                <p className="text-[10px] text-gray-500 font-bold mb-4 uppercase">{profile.email}</p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className={`rounded-[2.5rem] border p-10 shadow-2xl ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} icon={<User size={16}/>} darkMode={darkMode} />
                  <InputField label="Country" value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} icon={<Globe size={16}/>} darkMode={darkMode} />
                </div>
                <div className="mt-10">
                  <button type="submit" disabled={loading} className="bg-[#f99616] text-black font-black text-xs uppercase tracking-[2px] py-4 px-12 rounded-2xl flex items-center gap-3 active:scale-95 shadow-xl">
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Sync Profile</>}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* --- 🚀 KYC UI (Integrated) --- */
          <div className="animate-in fade-in duration-500">
            {kycStatus === 'approved' ? (
              <div className="p-20 border-2 border-dashed border-green-500/20 rounded-[3rem] text-center bg-green-500/5">
                <CheckCircle size={60} className="text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-black uppercase italic text-green-500">Verified Trader</h2>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Access Granted.</p>
              </div>
            ) : (
              <div className={`rounded-[3rem] border p-8 md:p-12 shadow-2xl ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
                {kycStep === 1 && (
                  <form onSubmit={startKYC} className="max-w-md mx-auto space-y-6">
                    <h3 className="text-xl font-black uppercase italic text-center">Step 1: <span className="text-[#f99616]">Mobile Auth</span></h3>
                    <InputField label="Phone Number" name="phone" value={kycData.phone} onChange={handleKycInputChange} icon={<Phone size={16}/>} darkMode={darkMode} />
                    <button type="submit" disabled={loading} className="w-full bg-[#f99616] py-4 rounded-2xl font-black text-[10px] uppercase active:scale-95">
                      {loading ? <Loader2 className="animate-spin mx-auto" /> : "Send Code"}
                    </button>
                  </form>
                )}

                {kycStep === 2 && (
                  <form onSubmit={(e) => { e.preventDefault(); setKycStep(3); }} className="max-w-md mx-auto space-y-6">
                    <h3 className="text-xl font-black uppercase italic text-center">Step 2: <span className="text-[#f99616]">Verify OTP</span></h3>
                    <input name="otp" maxLength="6" required value={kycData.otp} onChange={handleKycInputChange} className={`w-full h-16 text-center text-3xl font-black tracking-[1rem] border rounded-2xl outline-none ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50"}`} placeholder="000000" />
                    <button type="submit" className="w-full bg-[#f99616] py-4 rounded-2xl font-black text-[10px] uppercase">Continue</button>
                  </form>
                )}

                {kycStep === 3 && (
                  <form onSubmit={completeKYC} className="space-y-8">
                    <h3 className="text-xl font-black uppercase italic text-center">Step 3: <span className="text-[#f99616]">Upload Documents</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Aadhaar No." name="aadhaarNumber" value={kycData.aadhaarNumber} onChange={handleKycInputChange} icon={<ShieldCheck size={16}/>} darkMode={darkMode} />
                      <InputField label="PAN No." name="panNumber" value={kycData.panNumber} onChange={handleKycInputChange} icon={<FileCheck size={16}/>} darkMode={darkMode} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div onClick={() => aadhaarInputRef.current.click()} className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${previews.aadhaar ? 'border-[#f99616] bg-[#f99616]/5' : 'border-gray-800'}`}>
                        {previews.aadhaar ? <img src={previews.aadhaar} className="h-32 mx-auto rounded-xl object-cover" /> : <div className="text-gray-500 flex flex-col items-center gap-2"><Camera size={30} /><p className="text-[9px] font-black uppercase tracking-widest">Aadhaar Front</p></div>}
                        <input type="file" ref={aadhaarInputRef} hidden accept="image/*" onChange={(e) => handleKycImageChange(e, 'aadhaar')} />
                      </div>
                      <div onClick={() => panInputRef.current.click()} className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${previews.pan ? 'border-blue-500 bg-blue-500/5' : 'border-gray-800'}`}>
                        {previews.pan ? <img src={previews.pan} className="h-32 mx-auto rounded-xl object-cover" /> : <div className="text-gray-500 flex flex-col items-center gap-2"><Camera size={30} /><p className="text-[9px] font-black uppercase tracking-widest">PAN Photo</p></div>}
                        <input type="file" ref={panInputRef} hidden accept="image/*" onChange={(e) => handleKycImageChange(e, 'pan')} />
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-[#f99616] text-black font-black py-5 rounded-[2rem] uppercase text-xs tracking-widest shadow-xl">
                      {loading ? <Loader2 className="animate-spin mx-auto" /> : "Submit for Review"}
                    </button>
                  </form>
                )}

                {kycStep === 4 && (
                   <div className="text-center py-10">
                     <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce"><CheckCircle size={48} className="text-green-500" /></div>
                     <h3 className="text-2xl font-black uppercase italic text-white">Submission <span className="text-[#f99616]">Received</span></h3>
                     <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-4">Review time: 2-4 Hours.</p>
                     <button onClick={() => setActiveTab('chart')} className="mt-10 px-10 py-4 border border-gray-800 rounded-2xl text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all">Back to Terminal</button>
                   </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, icon, disabled = false, darkMode, name }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">{label}</label>
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`}>{icon}</div>
      <input name={name} value={value} onChange={onChange} disabled={disabled} className={`w-full border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold transition-all outline-none ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200 text-black focus:border-[#f99616]"} ${disabled ? 'opacity-50 cursor-not-allowed border-dashed' : ''}`} />
    </div>
  </div>
);

export default ProfilePage;
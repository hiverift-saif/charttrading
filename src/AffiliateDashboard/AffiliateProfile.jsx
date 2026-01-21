import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; 
import { 
  Shield, Mail, Smartphone, Lock, CheckCircle, 
  ChevronRight, Info, AlertTriangle, Clock, MapPin, Key, X, Loader2 
} from "lucide-react";
import axios from "axios"; 
import Swal from "sweetalert2"; 
import API_CONFIG from "../config";

function AffiliateProfile() {
  const { darkMode } = useTheme(); 
  const [getuser, setUser] = useState(null);
  const [updating, setUpdating] = useState(false); 
  
  const [secretKey] = useState("FVZUQXT7RQY7L4RG");
  const [profileData, setProfileData] = useState({
    firstName: "", 
    lastName: "", 
    username: "", 
    email: "", // 🚀 Token se aayegi
    trafficSources: "", 
    emailVerified: false
  });

  const [historyData] = useState([
    {
      date: "2026-01-17 13:51:23",
      ip: "103.48.67.118",
      country: "India",
      region: "Delhi",
      city: "New Delhi",
      agent: "Chrome 144.0.0.0 (Windows)"
    }
  ]);

  // 🚀 Token Decoder Logic
  const getEmailFromToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return JSON.parse(jsonPayload).email; 
    } catch (e) {
      return "";
    }
  };

  useEffect(() => {
    const userRaw = localStorage.getItem("affiliate_user");
    const token = localStorage.getItem("affiliate_token");
    
    let emailFromToken = "";
    if (token) emailFromToken = getEmailFromToken(token);

    if (userRaw) {
      const parsedUser = JSON.parse(userRaw);
      setUser(parsedUser);
      setProfileData(prev => ({
        ...prev,
        firstName: parsedUser.name || "",
        email: emailFromToken || parsedUser.email || "" 
      }));
    } else {
      setUser({ id: "1" });
      if (emailFromToken) setProfileData(prev => ({ ...prev, email: emailFromToken }));
    }
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("affiliate_token");
    if (!token) return;
    try {
      setUpdating(true);
      const response = await axios.patch(`${API_CONFIG.baseURL}/auth/profile`, 
        { name: profileData.firstName }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.statusCode === 200 || response.status === 200) {
        const updatedUser = { ...getuser, name: profileData.firstName };
        localStorage.setItem("affiliate_user", JSON.stringify(updatedUser));
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile updated successfully',
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
          confirmButtonColor: '#f99616',
          timer: 2000
        });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Update failed', background: darkMode ? '#0d0d0d' : '#fff' });
    } finally {
      setUpdating(false);
    }
  };

  if (!getuser) return <div className="p-10 text-center uppercase font-black tracking-widest animate-pulse">Loading Profile...</div>;

  return (
    <div className={`space-y-6 min-h-full pb-10 transition-colors duration-500 ${darkMode ? "bg-black" : "bg-gray-50/50"}`}>
      
      {/* 🚀 2. PERSONAL INFORMATION PANEL */}
      <div className={`rounded-xl border shadow-2xl overflow-hidden transition-all ${darkMode ? "border-gray-900 bg-[#0a0a0a]" : "border-gray-200 bg-white"}`}>
        <div className={`px-6 py-4 border-b flex items-center gap-2 ${darkMode ? "border-gray-900" : "border-gray-100"}`}>
          <Lock size={16} className="text-[#f99616]" />
          <h4 className="text-sm font-black uppercase tracking-widest">Personal Information</h4>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block">Full Name</label>
              <input 
                type="text"
                placeholder="Enter your name"
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                className={`w-full h-11 px-4 text-xs rounded-xl border outline-none transition-all ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-white border-gray-200 focus:border-[#f99616] shadow-sm"}`}
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block">Email Address</label>
              <div className="flex gap-2">
                <input 
                  readOnly 
                  value={profileData.email} 
                  className={`flex-1 h-11 px-4 text-xs rounded-xl border outline-none cursor-not-allowed ${darkMode ? "bg-black border-gray-800 text-gray-400" : "bg-gray-100 border-gray-200 text-gray-500"}`} 
                />
                <span className={`h-11 px-4 flex items-center rounded-xl text-[9px] font-black uppercase border ${profileData.emailVerified ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-orange-500/10 text-[#f99616] border-orange-500/20"}`}>
                  {profileData.emailVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleUpdateProfile}
            disabled={updating}
            className="mt-6 bg-[#f99616] hover:bg-[#e88914] text-white font-black uppercase text-[10px] py-3 px-10 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-2 justify-center"
          >
            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle size={16} />}
            {updating ? "Processing..." : "Save Profile Changes"}
          </button>
        </div>
      </div>

      {/* 🚀 3. 2FA SETTINGS PANEL */}
      <div className={`rounded-xl border shadow-2xl overflow-hidden ${darkMode ? "border-gray-900 bg-[#0a0a0a]" : "border-gray-200 bg-white"}`}>
        <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
          <div className="flex items-center gap-2">
            <Shield className="text-green-500" size={18} />
            <h2 className="text-sm font-black uppercase tracking-widest">2-Factor Authentication Settings (2FA)</h2>
          </div>
          <span className="bg-red-500/10 text-red-500 text-[9px] font-black px-2 py-1 rounded border border-red-500/20 uppercase tracking-tighter">Disabled</span>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col items-center border-r border-gray-800/30 pr-0 lg:pr-8">
            <div className="bg-white p-3 rounded-2xl shadow-xl shadow-black/20 mb-6">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${secretKey}`} alt="QR" className="w-32 h-32" />
            </div>
            <div className="w-full space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center block">Secret Manual Key</label>
              <div className={`flex items-center justify-between p-3 rounded-xl border ${darkMode ? "bg-black border-gray-800" : "bg-gray-100"}`}>
                <code className="text-xs font-bold text-[#f99616] tracking-widest">{secretKey}</code>
                <Key size={14} className="text-gray-600" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl text-left">
               <h5 className="text-[11px] font-black text-blue-500 uppercase flex items-center gap-2 mb-2"><Info size={14}/> 2FA Requirements</h5>
               <p className="text-[9px] text-gray-500 uppercase font-bold leading-relaxed italic">* Scan the QR-code with Google Authenticator or enter the key manually.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <StaticInput label="Emergency Phone" placeholder="+91 000 000 000" darkMode={darkMode} />
               <StaticInput label="Authentication Code" placeholder="000 000" darkMode={darkMode} />
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#f99616]" defaultChecked /><span className="text-[10px] font-black text-gray-500 uppercase">Login</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-[#f99616]" defaultChecked /><span className="text-[10px] font-black text-gray-500 uppercase">Change Wallet</span></label>
            </div>
            <button className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95 flex items-center gap-2">
               <CheckCircle size={14}/> Enable 2-Factor Authentication
            </button>
          </div>
        </div>
      </div>

      {/* 🚀 4. SECURITY QUESTIONS PANEL */}
      <div className={`rounded-xl border shadow-2xl overflow-hidden ${darkMode ? "border-gray-900 bg-[#0a0a0a]" : "border-gray-200 bg-white"}`}>
        <div className={`px-6 py-4 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
          <h2 className="text-sm font-black uppercase tracking-widest text-left">Backup Security Questions</h2>
        </div>
        <div className="p-6 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((num) => (
                <div key={num} className="space-y-3 text-left">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Question {num}</label>
                  <select className={`w-full p-3 text-xs rounded-xl border outline-none ${darkMode ? "bg-black border-gray-800 text-gray-400" : "bg-white"}`}>
                    <option disabled selected>-- Select secret question --</option>
                    <option>What street did you grow up on?</option>
                    <option>What was your first computer game?</option>
                    <option>What is your favorite book?</option>
                  </select>
                  <input type="text" placeholder="Enter Your Answer" className={`w-full p-3 text-xs rounded-xl border outline-none transition-all ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50"}`} />
                </div>
              ))}
           </div>
           <button className="px-10 py-3 bg-[#f99616] text-white font-black uppercase text-[10px] rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-95">
              Save Backup Security
           </button>
        </div>
      </div>

      {/* 🚀 5. LOGIN HISTORY PANEL */}
      <div className={`rounded-xl border shadow-2xl overflow-hidden ${darkMode ? "border-gray-900 bg-[#0a0a0a]" : "border-gray-200 bg-white"}`}>
        <div className={`px-6 py-4 border-b flex items-center gap-2 ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
          <Clock className="text-blue-500" size={16} />
          <h2 className="text-sm font-black uppercase tracking-widest">Login History</h2>
        </div>
        <div className="overflow-x-auto text-left">
          <table className="w-full text-left">
            <thead>
              <tr className={`${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-500">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-500">IP Address</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-500">Location</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-500">Browser / System</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? "divide-gray-800 text-gray-300" : "divide-gray-100 text-gray-600"}`}>
              {historyData.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-500/5 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">{item.date}</td>
                  <td className="px-6 py-4 text-xs font-black text-[#f99616]">{item.ip}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <img src="https://flagcdn.com/w20/in.png" className="w-4 h-3 rounded-sm" alt="India" />
                       <span className="text-xs font-bold uppercase">{item.city}, {item.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-500 truncate max-w-[200px] uppercase">
                    {item.agent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// Reusable Static Input Component
const StaticInput = ({ label, placeholder, value, darkMode }) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block">{label}</label>
    <input 
      placeholder={placeholder}
      defaultValue={value}
      readOnly
      className={`w-full h-11 px-4 text-xs rounded-xl border outline-none transition-all ${darkMode ? "bg-black border-gray-800 text-gray-500" : "bg-white border-gray-200 shadow-sm"}`} 
    />
  </div>
);

export default AffiliateProfile;
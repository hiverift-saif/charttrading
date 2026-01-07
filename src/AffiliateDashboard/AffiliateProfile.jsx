import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

function AffiliateProfile() {
  const { darkMode } = useTheme(); // 🚀 Theme state access
  const [getuser, setUser] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Form States
  const [profileData, setProfileData] = useState({
    name: "", email: "", emailStatus: "Unverified",
    country: "", whatsapp: "", telegram: "", link: "", description: "",
    oldPassword: "", newPassword: "", confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Load static user
  useEffect(() => {
    const userRaw = localStorage.getItem("affiliate_user");
    if (userRaw) {
      const user = JSON.parse(userRaw);
      setUser(user);
      setProfileData(prev => ({
        ...prev,
        name: user.name || "Trade Pro User",
        email: user.email || "user@tradepro.com",
        emailStatus: user.emailStatus || "Verified",
        country: user.country || "India",
        whatsapp: user.whatsapp || "+91 0000000000",
        telegram: user.telegram || "@tradepro_affiliate",
        link: user.link || "https://tradepro.com/ref/123",
        description: user.description || "Professional Affiliate Marketer"
      }));
    } else {
      setUser({ id: "1" });
      setProfileData(prev => ({
        ...prev,
        name: "Admin User",
        email: "admin@example.com",
        emailStatus: "Verified"
      }));
    }
  }, []);

  const handleUpdateProfile = () => {
    setLoadingUpdate(true);
    setTimeout(() => {
      setProfileMessage("Profile updated successfully! ");
      setLoadingUpdate(false);
      setTimeout(() => setProfileMessage(""), 3000);
    }, 1000);
  };

  const handleChangePassword = () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match!" });
      return;
    }
    setLoadingPassword(true);
    setTimeout(() => {
      setPasswordMessage("Password changed successfully! (Static Mode)");
      setLoadingPassword(false);
      setProfileData(prev => ({ ...prev, oldPassword: "", newPassword: "", confirmPassword: "" }));
      setTimeout(() => setPasswordMessage(""), 3000);
    }, 1000);
  };

  if (!getuser) return <div className={`p-10 h-full ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>Loading...</div>;

  return (
    <div className={`space-y-6 min-h-full animate-in fade-in duration-500 transition-colors duration-500 ${darkMode ? "bg-black" : "bg-gray-50/50"}`}>
      
      {/* --- PROFILE SECTION --- */}
      <div className={`flex flex-col gap-4 rounded-xl border transition-colors shadow-2xl ${darkMode ? "border-gray-900 bg-[#0a0a0a]" : "border-gray-200 bg-white"}`}>
        <div className={`px-4 sm:px-6 pt-5 border-b pb-4 ${darkMode ? "border-gray-900" : "border-gray-100"}`}>
          <h4 className={`text-base sm:text-lg font-black uppercase tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>Personal information</h4>
        </div>

        <div className="px-4 sm:px-6 space-y-6 pb-8">
          {profileMessage && (
            <p className={`p-3 rounded-lg text-xs font-bold ${profileMessage.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {profileMessage}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StaticInput label="Name *" value={profileData.name} onChange={(v) => setProfileData({...profileData, name: v})} darkMode={darkMode} />
            
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Email *</label>
              <div className="flex gap-2">
                <input readOnly value={profileData.email} className={`flex-1 h-10 rounded-lg border px-3 text-sm outline-none cursor-not-allowed opacity-60 transition-colors ${darkMode ? "border-gray-800 bg-black text-white" : "border-gray-200 bg-gray-100 text-gray-600"}`} />
                <span className={`h-10 px-3 flex items-center rounded-lg text-[10px] font-black uppercase ${darkMode ? "bg-blue-600/10 text-[#f99616]" : "bg-orange-50 text-[#f99616] border border-orange-100"}`}>{profileData.emailStatus}</span>
              </div>
            </div>

            <StaticInput label="Country *" value={profileData.country} onChange={(v) => setProfileData({...profileData, country: v})} darkMode={darkMode} />
            <StaticInput label="WhatsApp *" value={profileData.whatsapp} onChange={(v) => setProfileData({...profileData, whatsapp: v})} darkMode={darkMode} />
            <StaticInput label="Telegram ID *" value={profileData.telegram} onChange={(v) => setProfileData({...profileData, telegram: v})} darkMode={darkMode} />
            <StaticInput label="Link *" value={profileData.link} onChange={(v) => setProfileData({...profileData, link: v})} darkMode={darkMode} />

            <div className="space-y-2 col-span-1 sm:col-span-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Description *</label>
              <textarea 
                value={profileData.description} 
                onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                className={`w-full h-24 rounded-lg border p-3 text-sm outline-none transition-all resize-none ${darkMode ? "border-gray-800 bg-black text-white focus:border-blue-500" : "border-gray-200 bg-gray-50 text-black focus:border-[#f99616]"}`}
              />
            </div>
          </div>

          <button 
            onClick={handleUpdateProfile}
            disabled={loadingUpdate}
            className="h-11 px-8 bg-[#f99616] hover:bg-[#c27209] text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-orange-500/20 active:scale-95"
          >
            {loadingUpdate ? "Processing..." : "Update Profile"}
          </button>
        </div>
      </div>

      {/* --- SECURITY SECTION --- */}
      <div className={`flex flex-col gap-4 rounded-xl border transition-colors shadow-2xl ${darkMode ? "border-gray-900 bg-[#0a0a0a]" : "border-gray-200 bg-white"}`}>
        <div className={`px-4 sm:px-6 pt-5 border-b pb-4 ${darkMode ? "border-gray-900" : "border-gray-100"}`}>
          <h4 className={`text-base sm:text-lg font-black uppercase tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>Security & Privacy</h4>
        </div>

        <div className="px-4 sm:px-6 space-y-6 pb-8">
          {passwordMessage && (
            <p className="p-3 rounded-lg text-xs font-bold bg-green-500/10 text-green-500">{passwordMessage}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaticInput label="Old Password *" type="password" value={profileData.oldPassword} onChange={(v) => setProfileData({...profileData, oldPassword: v})} darkMode={darkMode} />
            <StaticInput label="New Password *" type="password" value={profileData.newPassword} onChange={(v) => setProfileData({...profileData, newPassword: v})} darkMode={darkMode} />
            <StaticInput label="Confirm Password *" type="password" value={profileData.confirmPassword} onChange={(v) => setProfileData({...profileData, confirmPassword: v})} error={errors.confirmPassword} darkMode={darkMode} />
          </div>

          <button 
            onClick={handleChangePassword}
            disabled={loadingPassword}
            className={`h-11 px-8 rounded-xl font-black uppercase text-xs tracking-widest border transition-all active:scale-95 ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700" : "bg-gray-100 hover:bg-gray-200 text-slate-700 border-gray-200"}`}
          >
            {loadingPassword ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Static Input Component
const StaticInput = ({ label, value, onChange, type = "text", error, darkMode }) => (
  <div className="space-y-2">
    <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-10 w-full rounded-lg border px-3 text-sm outline-none transition-all ${error ? 'border-red-500' : (darkMode ? 'border-gray-800 bg-black text-white focus:border-blue-500' : 'border-gray-200 bg-gray-50 text-black focus:border-[#f99616]')}`}
    />
    {error && <p className="text-[10px] text-red-500 font-bold uppercase">{error}</p>}
  </div>
);

export default AffiliateProfile;
import React, { useState } from 'react';
import { User, Mail, Globe, ArrowLeft, Lock, Save, Camera, CheckCircle2 } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Context

const ProfilePage = ({ setActiveTab }) => {
  const { darkMode } = useTheme(); // 🚀 Theme state access

  return (
    <div className={`min-h-full w-full p-4 md:p-10 overflow-y-auto custom-scrollbar transition-colors duration-500
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* --- HEADER --- */}
        <div className={`flex items-center gap-4 mb-8 pb-6 border-b transition-colors
          ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
          <button 
            onClick={() => setActiveTab('chart')} 
            className={`p-2 md:p-3 border rounded-xl transition-all active:scale-95 group shadow-lg
              ${darkMode ? "bg-[#111] border-gray-800 hover:border-[#f99616] shadow-[#f99616]/5" : "bg-gray-50 border-gray-200 hover:border-[#f99616] shadow-black/5"}`}
          >
            <ArrowLeft size={20} className="text-gray-400 group-hover:text-[#f99616] group-hover:-translate-x-1 transition-all" />
          </button>
          <div>
            <h2 className={`text-xl md:text-2xl font-black uppercase tracking-tighter italic transition-colors
              ${darkMode ? "text-white" : "text-black"}`}>
              Edit <span className="text-[#f99616]">Profile</span>
            </h2>
            <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-[9px] md:text-[10px] font-bold uppercase tracking-[3px]`}>Manage your Binovera identity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDE: AVATAR --- */}
          <div className="lg:col-span-4">
            <div className={`rounded-3xl border p-8 text-center relative overflow-hidden shadow-2xl transition-colors
              ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-[#f99616]"></div>
              
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6">
                <div className={`w-full h-full rounded-full flex items-center justify-center border-4 overflow-hidden transition-colors
                  ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-white shadow-inner"}`}>
                  <User size={64} className={darkMode ? "text-gray-700" : "text-gray-300"} />
                </div>
                <button className="absolute bottom-1 right-1 p-2 bg-[#f99616] rounded-full border-4 border-white md:border-black hover:bg-[#e88914] transition-all shadow-lg">
                  <Camera size={16} className="text-white" />
                </button>
              </div>

              <h3 className={`text-lg font-black uppercase tracking-tight transition-colors ${darkMode ? "text-white" : "text-slate-800"}`}>Client #1189209</h3>
              <div className="mt-2 inline-block px-3 py-1 bg-[#f99616]/10 border border-[#f99616]/20 rounded-full">
                <span className="text-[#f99616] text-[9px] font-black uppercase tracking-widest italic">Unverified</span>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: FORMS --- */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Form 1: Personal Details */}
            <div className={`rounded-3xl border p-6 md:p-8 shadow-2xl transition-colors
              ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
              <h4 className={`text-sm font-black uppercase tracking-[2px] mb-8 flex items-center gap-3 transition-colors
                ${darkMode ? "text-white" : "text-slate-700"}`}>
                <User size={18} className="text-[#f99616]" /> Personal Details
              </h4>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8" onSubmit={(e) => e.preventDefault()}>
                <InputField label="First Name" placeholder="Enter first name" defaultValue="Saif" icon={<User size={16}/>} darkMode={darkMode} />
                <InputField label="Last Name" placeholder="Enter last name" defaultValue="Ali" icon={<User size={16}/>} darkMode={darkMode} />
                <InputField label="Email Address" placeholder="name@example.com" defaultValue="user500@gmail.com" icon={<Mail size={16}/>} darkMode={darkMode} />
                <InputField label="Country" value="India" disabled icon={<Globe size={16}/>} darkMode={darkMode} />
                
                <div className={`md:col-span-2 pt-4 border-t mt-2 ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
                  <button className="w-full md:w-auto bg-[#f99616] hover:bg-[#e88914] text-white font-black text-[10px] md:text-xs uppercase tracking-[2px] py-4 px-10 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-500/20">
                    <Save size={16} /> Update Information
                  </button>
                </div>
              </form>
            </div>

            {/* Form 2: Security Settings */}
            <div className={`rounded-3xl border p-6 md:p-8 shadow-2xl transition-colors
              ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
              <h4 className={`text-sm font-black uppercase tracking-[2px] mb-8 flex items-center gap-3 transition-colors
                ${darkMode ? "text-white" : "text-slate-700"}`}>
                <Lock size={18} className="text-[#f99616]" /> Security Settings
              </h4>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <InputField label="Current Password" type="password" placeholder="••••••••" icon={<Lock size={16}/>} darkMode={darkMode} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  <InputField label="New Password" type="password" placeholder="••••••••" icon={<Lock size={16}/>} darkMode={darkMode} />
                  <InputField label="Confirm Password" type="password" placeholder="••••••••" icon={<CheckCircle2 size={16}/>} darkMode={darkMode} />
                </div>
                
                <div className={`pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
                  <button className={`w-full md:w-auto border font-black text-[10px] md:text-xs uppercase tracking-[2px] py-4 px-10 rounded-2xl transition-all active:scale-95
                    ${darkMode ? "bg-[#f99616]/10 border-gray-800 hover:border-[#f99616]/50 text-white" : "bg-gray-50 border-gray-200 hover:border-[#f99616] text-slate-700"}`}>
                    Save New Password
                  </button>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-tight text-center md:text-right max-w-[220px]">
                    Make sure both passwords are <span className="text-[#f99616]">identical</span>.
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Custom Responsive Input Component ---
const InputField = ({ label, placeholder, value, defaultValue, icon, disabled = false, type = "text", darkMode }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-[9px] md:text-[10px] font-black uppercase tracking-widest ml-1`}>{label}</label>
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors
        ${darkMode ? "text-gray-600 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`}>
        {icon}
      </div>
      <input 
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 text-xs md:text-sm font-bold transition-all outline-none focus:ring-4 focus:ring-[#f99616]/5
          ${darkMode 
            ? "bg-black border-gray-800 text-white placeholder:text-gray-700 focus:border-[#f99616]/50" 
            : "bg-gray-50 border-gray-200 text-black placeholder:text-gray-300 focus:border-[#f99616]/50"}
          ${disabled ? 'opacity-40 cursor-not-allowed border-dashed' : 'hover:border-gray-700'}`}
      />
    </div>
  </div>
);

export default ProfilePage;
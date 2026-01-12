import React, { useState } from 'react';
import { 
  ShieldCheck, UserCheck, FileText, AlertTriangle, 
  Scale, Lock, Landmark, CheckCircle2, Upload, Camera, Shield 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AMLKYCpolicy = () => {
  const { darkMode } = useTheme();
  
  // States for file names
  const [files, setFiles] = useState({
    pan: "",
    aadharFront: "",
    aadharBack: "",
    selfie: ""
  });

  const handleFileChange = (e, field) => {
    if (e.target.files[0]) {
      setFiles({ ...files, [field]: e.target.files[0].name });
    }
  };

  const policies = [
    {
      title: "Identity Verification (KYC)",
      desc: "To prevent identity theft and fraud, every user must provide valid government-issued identification including Passport, National ID, or Driver's License.",
      icon: <UserCheck className="text-[#f99616]" size={24} />
    },
    {
      title: "Anti-Money Laundering (AML)",
      desc: "We monitor all financial transactions to identify and report suspicious activities. Large deposits or withdrawals undergo enhanced due diligence (EDD).",
      icon: <Landmark className="text-[#f99616]" size={24} />
    },
    {
      title: "Source of Funds",
      desc: "Users may be required to prove the origin of their trading capital to ensure funds are not derived from illegal activities or sanctioned regions.",
      icon: <Scale className="text-[#f99616]" size={24} />
    }
  ];

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-6xl mx-auto px-5">
        
        {/* --- 1. HEADER --- */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex p-3 rounded-2xl bg-[#f99616]/10 text-[#f99616] mb-6">
            <ShieldCheck size={40} />
          </div>
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Legal Compliance</h4>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
            AML & <span className="text-[#f99616]">KYC Policy</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest leading-relaxed italic">
            Ensuring a secure and transparent trading environment through global regulatory standards.
          </p>
        </div>

        {/* --- 2. CORE POLICY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
          {policies.map((item, i) => (
            <div key={i} className={`p-6 rounded-2xl border transition-all hover:border-[#f99616]/30 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-lg"}`}>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-sm font-black uppercase italic mb-2 tracking-tighter">{item.title}</h3>
              <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- 3. 🚀 KYC VERIFICATION SECTION (PAN, AADHAR, SELFIE) --- */}
        <div className={`p-6 md:p-12 rounded-[2rem] border mb-16 transition-all ${darkMode ? "bg-gradient-to-br from-[#0d0d0d] to-[#120025] border-purple-500/20 shadow-2xl" : "bg-gray-50 border-gray-200"}`}>
          
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase italic leading-none mb-2">
              Identity <span className="text-[#f99616]">Verification</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Complete these 3 steps to verify your account</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* --- STEP 1: PAN CARD --- */}
            <div className={`p-6 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100 shadow-lg"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#f99616] font-black italic">01</div>
                <h4 className="text-[11px] font-black uppercase italic">PAN Card</h4>
              </div>
              <input 
                type="text" 
                placeholder="PAN NUMBER (ABCDE1234F)" 
                className={`w-full p-3 rounded-xl mb-3 text-[10px] font-bold uppercase outline-none border transition-all ${darkMode ? "bg-white/5 border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200 text-black"}`}
              />
              <div className="relative border-2 border-dashed border-gray-700 rounded-xl p-4 text-center group cursor-pointer hover:border-[#f99616] transition-all">
                <input type="file" onChange={(e) => handleFileChange(e, 'pan')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <Upload className="mx-auto text-gray-500 mb-2 group-hover:text-[#f99616]" size={20} />
                <p className="text-[8px] font-black uppercase text-gray-500">
                  {files.pan ? files.pan : "Upload Front Side"}
                </p>
              </div>
            </div>

            {/* --- STEP 2: AADHAR CARD --- */}
            <div className={`p-6 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100 shadow-lg"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#f99616] font-black italic">02</div>
                <h4 className="text-[11px] font-black uppercase italic">Aadhar Card</h4>
              </div>
              <input 
                type="text" 
                placeholder="12 DIGIT AADHAR NUMBER" 
                className={`w-full p-3 rounded-xl mb-3 text-[10px] font-bold outline-none border transition-all ${darkMode ? "bg-white/5 border-gray-800 focus:border-[#f99616] text-white" : "bg-gray-50 border-gray-200 text-black"}`}
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="relative border-2 border-dashed border-gray-700 rounded-xl p-3 text-center cursor-pointer hover:border-[#f99616] transition-all">
                  <input type="file" onChange={(e) => handleFileChange(e, 'aadharFront')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <p className="text-[7px] font-black uppercase text-gray-500">
                    {files.aadharFront ? "Front OK" : "Front Side"}
                  </p>
                </div>
                <div className="relative border-2 border-dashed border-gray-700 rounded-xl p-3 text-center cursor-pointer hover:border-[#f99616] transition-all">
                  <input type="file" onChange={(e) => handleFileChange(e, 'aadharBack')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <p className="text-[7px] font-black uppercase text-gray-500">
                    {files.aadharBack ? "Back OK" : "Back Side"}
                  </p>
                </div>
              </div>
            </div>

            {/* --- STEP 3: SELFIE VERIFICATION --- */}
            <div className={`p-6 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100 shadow-lg"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-[#f99616] font-black italic">03</div>
                <h4 className="text-[11px] font-black uppercase italic">Live Selfie</h4>
              </div>
              <div className="relative border-2 border-dashed border-gray-700 rounded-xl p-8 text-center group cursor-pointer hover:border-[#f99616] transition-all h-[115px] flex flex-col justify-center items-center">
                <input type="file" accept="image/*" capture="user" onChange={(e) => handleFileChange(e, 'selfie')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <Camera className="mx-auto text-gray-500 mb-2 group-hover:text-[#f99616]" size={24} />
                <p className="text-[8px] font-black uppercase text-gray-500">
                  {files.selfie ? "Selfie Captured" : "Take Live Selfie"}
                </p>
              </div>
              <button className="w-full mt-3 bg-[#f99616] text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                Submit Verification
              </button>
            </div>

          </div>

          <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
             <Shield size={14} className="text-[#f99616]" />
             <span className="text-[9px] font-black uppercase tracking-widest">Data is 256-bit encrypted and stored securely</span>
          </div>
        </div>

        {/* --- 4. DETAILED COMPLIANCE CONTENT --- */}
        <div className={`p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border mb-16 ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200 shadow-inner"}`}>
           <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3">
              <FileText className="text-[#f99616]" /> Policy <span className="text-[#f99616]">Overview</span>
           </h2>
           <div className="space-y-8 text-[11px] md:text-xs font-medium leading-relaxed text-gray-500 uppercase tracking-wide">
              <section>
                 <h4 className="text-xs font-black text-[#f99616] mb-3 italic">01. OBJECTIVE</h4>
                 <p>The objective of the MaxTrading AML/KYC Policy is to prevent the use of our platform for money laundering, terrorist financing, and other financial crimes.</p>
              </section>
              <section>
                 <h4 className="text-xs font-black text-[#f99616] mb-3 italic">02. MONITORING</h4>
                 <p>We use automated AI-driven tools to detect unusual trading patterns. Any account found engaging in layering or structuring will be suspended indefinitely.</p>
              </section>
              <section className={`p-4 rounded-xl border-l-4 border-red-600 bg-red-600/5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                 <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertTriangle size={16} />
                    <span className="font-black text-[10px]">STRICT PROHIBITION</span>
                 </div>
                 <p className="text-[9px]">Trading from sanctioned jurisdictions (North Korea, Iran, Syria) is strictly prohibited. VPN usage will result in an immediate ban.</p>
              </section>
           </div>
        </div>

        {/* --- 5. DATA SECURITY FOOTER --- */}
        <div className={`p-8 rounded-[2.5rem] border text-center ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-xl"}`}>
           <Lock className="text-[#f99616] mx-auto mb-4" size={32} />
           <h3 className="text-xl font-black uppercase italic mb-2">Data <span className="text-[#f99616]">Privacy</span></h3>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-lg mx-auto">
             All personal documents are encrypted and stored in offline cold-storage vaults to ensure your privacy.
           </p>
        </div>

      </div>
    </div>
  );
};

export default AMLKYCpolicy;
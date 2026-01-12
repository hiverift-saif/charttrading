import React from 'react';
import { 
  ShieldCheck, Lock, EyeOff, Database, 
  FileLock2, BellRing, Globe, Trash2, CheckCircle2 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Privacypolicyy = () => {
  const { darkMode } = useTheme();

  const dataPoints = [
    { t: "Personal Info", d: "Name, Email, and Phone for account security.", i: <Database size={20}/> },
    { t: "KYC Data", d: "Encrypted Identity documents for verification.", i: <ShieldCheck size={20}/> },
    { t: "Usage Logs", d: "IP address and device info for fraud detection.", i: <Globe size={20}/> }
  ];

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-5xl mx-auto px-5">
        
        {/* --- 1. HEADER --- */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex p-3 rounded-2xl bg-[#f99616]/10 text-[#f99616] mb-6">
            <Lock size={36} />
          </div>
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Data Protection</h4>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Privacy <span className="text-[#f99616]">Policy</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest leading-relaxed italic">
            Your privacy is our priority. Learn how we protect and manage your personal data in the digital ecosystem.
          </p>
        </div>

        {/* --- 2. SUMMARY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-20">
          {dataPoints.map((item, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-md"}`}>
              <div className="text-[#f99616] mb-4">{item.i}</div>
              <h3 className="text-[11px] font-black uppercase italic mb-2 tracking-widest">{item.t}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed tracking-tight">{item.d}</p>
            </div>
          ))}
        </div>

        {/* --- 3. DETAILED POLICY CONTENT (SLEEK GAPS) --- */}
        <div className={`p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border mb-12 ${darkMode ? "bg-white/5 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
          <div className="space-y-10 text-[11px] md:text-xs font-medium leading-relaxed text-gray-500 uppercase tracking-wide">
            
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-6 w-1 bg-[#f99616]"></div>
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic">01. DATA COLLECTION</h4>
              </div>
              <p className="mb-4">We collect information to provide better services to all our users. This includes Information you give us (like your account info) and Information we get from your use of our services (like device information, location information, and log information).</p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-6 w-1 bg-[#f99616]"></div>
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic">02. HOW WE USE DATA</h4>
              </div>
              <p className="mb-4">MaxTrading uses the collected data for various purposes:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {[
                   "To provide and maintain our Service",
                   "To notify you about changes to our Service",
                   "To provide customer support",
                   "To monitor the usage of our Service",
                   "To detect, prevent and address technical issues",
                   "To fulfill KYC/AML regulatory requirements"
                 ].map((li, idx) => (
                   <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#f99616] shrink-0" />
                      <span className="text-[9px] md:text-[10px] font-bold">{li}</span>
                   </li>
                 ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-6 w-1 bg-[#f99616]"></div>
                <h4 className="text-xs md:text-sm font-black text-[#f99616] italic">03. DATA SECURITY</h4>
              </div>
              <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means (SSL 256-bit & AES Encryption) to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </section>

            <section className={`p-5 rounded-xl border border-dashed ${darkMode ? "border-gray-800 bg-black/40" : "border-gray-200 bg-white"}`}>
               <div className="flex items-center gap-3 text-[#f99616] mb-3">
                  <Trash2 size={18} />
                  <h4 className="text-[10px] font-black">YOUR RIGHT TO BE FORGOTTEN</h4>
               </div>
               <p className="text-[9px] leading-relaxed">You have the right to request the deletion of your personal data. Upon a valid request, we will erase your data unless we are legally required to retain it for financial audit or AML compliance purposes.</p>
            </section>

          </div>
        </div>

        {/* --- 4. COOKIE POLICY PREVIEW --- */}
        <div className={`p-8 rounded-[2.5rem] border flex flex-col md:flex-row items-center justify-between gap-6 ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-xl"}`}>
           <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <EyeOff size={18} className="text-[#f99616]" />
                 <h3 className="text-lg font-black uppercase italic">Cookie <span className="text-[#f99616]">Usage</span></h3>
              </div>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">We use cookies to improve your trading experience.</p>
           </div>
           <button className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border transition-all ${darkMode ? "border-gray-800 hover:border-[#f99616]" : "border-gray-200 hover:bg-[#f99616] hover:text-white"}`}>
              Manage Cookies
           </button>
        </div>

      </div>
    </div>
  );
};

export default Privacypolicyy;
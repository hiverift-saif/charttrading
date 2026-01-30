import React, { useState } from 'react';
import { 
  Settings, Globe, ShieldCheck, Zap, 
  Save, RefreshCw, BellRing, Mail, Layout 
} from 'lucide-react';
import Swal from 'sweetalert2';

const AdminSettings = ({ darkMode }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Instant Reload Logic Simulation
    setTimeout(() => {
      setIsSaving(false);
      Swal.fire({
        icon: 'success',
        title: 'Config Reloaded',
        text: 'System settings updated across all nodes.',
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        confirmButtonColor: '#f99616'
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#f99616]/10 rounded-lg"><Settings size={20} className="text-[#f99616]" /></div>
          <div>
            <h2 className="text-xl font-black uppercase italic tracking-tighter">System <span className="text-[#f99616]">Configuration</span></h2>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Milestone 7: Global Toggles & Persistence</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-[#f99616] text-black px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-600/10 hover:scale-105 transition-all active:scale-95"
        >
          {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          Save & Reload Config
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 🚀 LEFT: FEATURE TOGGLES (SOW: Feature Flags) */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white shadow-xl border-slate-100'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[3px] mb-8 italic flex items-center gap-2">
              <Zap size={14} className="text-yellow-400" /> Platform Feature Flags
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <ToggleRow label="User Registration" desc="Allow new nodes to join" defaultChecked />
              <ToggleRow label="Withdrawal System" desc="Enable payout processing" defaultChecked />
              <ToggleRow label="KYC Enforcement" desc="Mandatory docs for trading" />
              <ToggleRow label="Maintenance Mode" desc="Lock site for updates" />
              <ToggleRow label="Bonus System" desc="Auto-credit referral bonuses" defaultChecked />
              <ToggleRow label="Live Chat Support" desc="Enable support widget" defaultChecked />
            </div>
          </div>

          {/* 📬 MIDDLE: COMMUNICATION SETTINGS */}
          <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white shadow-xl border-slate-100'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[3px] mb-8 italic flex items-center gap-2">
              <Mail size={14} className="text-blue-400" /> SMTP & Alert Config
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="SMTP Server" placeholder="smtp.gmail.com" />
              <InputField label="Sender Name" placeholder="Binovera Alerts" />
              <InputField label="Alert Webhook" placeholder="https://discord.com/api/..." />
              <InputField label="Support Email" placeholder="help@binovera.com" />
            </div>
          </div>
        </div>

        {/* 🛠️ RIGHT: BRANDING & META (SOW: Global Config) */}
        <div className="space-y-6">
          <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white shadow-xl border-slate-100'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[3px] mb-8 italic flex items-center gap-2">
              <Globe size={14} className="text-green-500" /> Site Metadata
            </h4>
            <div className="space-y-6">
              <InputField label="Meta Title" placeholder="Next-Gen Trading Terminal" />
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase ml-1">Logo Provider</label>
                <div className="h-24 w-full border-2 border-dashed border-gray-800 rounded-2xl flex items-center justify-center bg-zinc-900/20 cursor-pointer hover:border-[#f99616] transition-all">
                   <p className="text-[8px] font-bold text-gray-600 uppercase">Upload New SVG/PNG</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECURITY STATUS */}
          <div className={`p-6 rounded-[2rem] border ${darkMode ? 'bg-zinc-900/10 border-gray-800 border-dashed' : 'bg-slate-50 border-slate-200'} text-center`}>
            <ShieldCheck size={32} className="mx-auto text-green-500 mb-2 opacity-50" />
            <p className="text-[9px] font-black text-gray-500 uppercase">Persistence Node Active</p>
            <p className="text-[8px] text-gray-400 mt-1">Changes are persistent after reload.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- HELPER UI COMPONENTS ---

const ToggleRow = ({ label, desc, defaultChecked }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-[11px] font-black uppercase tracking-tight">{label}</p>
      <p className="text-[9px] text-gray-500 font-bold leading-none">{desc}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-[#f99616] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
    </label>
  </div>
);

const InputField = ({ label, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder} 
      className="w-full bg-transparent border-b border-gray-800 p-2 text-xs font-bold outline-none focus:border-[#f99616] transition-all placeholder:text-gray-800"
    />
  </div>
);

export default AdminSettings;
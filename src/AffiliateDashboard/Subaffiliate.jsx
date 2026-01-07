import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function Subaffiliate() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [activeTab, setActiveTab] = useState('sub');
  
  const tabs = [
    { id: 'sub', label: 'Sub Affiliate', content: 'Sub Affiliate' },
    { id: 'day', label: 'Day', content: 'Day' },
  ];

  const handleCopyLink = () => {
    // Fixed: clipboard.writeText use karna chahiye
    navigator.clipboard.writeText('http://localhost:5173/SubAffiliateSignUp');
    // You can replace alert with Swal for better UI
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* --- Link Section --- */}
      <div className={`rounded-xl border p-6 transition-all duration-500 shadow-sm
        ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-bold uppercase tracking-widest mb-2 
              ${darkMode ? "text-gray-300" : "text-slate-500"}`}>
              Your Affiliate Referral Link:
            </label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                className={`flex h-11 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all font-mono
                  ${darkMode 
                    ? "bg-black border-gray-700 text-white focus:ring-2 focus:ring-[#f99616]/20" 
                    : "bg-gray-50 border-gray-200 text-slate-900 focus:ring-2 focus:ring-[#f99616]/20"}`}
                readOnly
                value="http://localhost:5173/SubAffiliateSignUp"
              />
              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center justify-center h-11 px-4 py-2 rounded-lg text-sm font-black transition-all active:scale-95 border
                  ${darkMode 
                    ? "border-gray-700 bg-gray-800 text-white hover:bg-gray-700" 
                    : "border-gray-200 bg-white text-slate-700 hover:bg-gray-50 shadow-sm"}`}
              >
                <Copy className="w-4 h-4 mr-2" aria-hidden="true" />
                COPY
              </button>
            </div>
          </div>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm leading-relaxed`}>
            Invite other affiliates to join our affiliate program, and get a percentage of their earnings! See the <span className="text-[#f99616] font-bold cursor-pointer hover:underline">Affiliate Programs</span> page for details.
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm leading-relaxed`}>
            You can find the referred affiliate stats below. These stats are updated on a <span className="font-bold underline decoration-[#f99616]">weekly basis</span>.
          </p>
        </div>
      </div>

      {/* --- Tabs & Tables --- */}
      <div className="flex flex-col gap-2">
        {/* Tab Switcher */}
        <div className={`flex flex-wrap gap-2 border rounded-xl p-1 transition-colors
          ${darkMode ? "bg-black border-gray-700" : "bg-gray-100 border-gray-200"}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 min-w-[80px] px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === tab.id 
                  ? (darkMode ? 'bg-gray-800 text-white shadow-lg' : 'bg-white text-slate-900 shadow-sm') 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table Content */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`rounded-xl border shadow-2xl transition-all duration-500 p-6
              ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}
            style={{ display: activeTab === tab.id ? 'block' : 'none' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className={`border-b transition-colors ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                  <tr>
                    {['No.', 'Partner ID', 'Name', 'Email', 'Total Amount', 'Total Commission'].map((header) => (
                      <th key={header} className="p-4 text-left text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  <tr>
                    <td className="p-4 text-center py-12 font-bold uppercase tracking-tighter opacity-30" colSpan={6}>
                      No Data Found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subaffiliate;
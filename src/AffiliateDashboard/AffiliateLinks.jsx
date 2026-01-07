import React, { useEffect, useState } from "react";
import { Copy, ExternalLink, Link as LinkIcon, Globe, Zap } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateLinks() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [copied, setCopied] = useState(false);  
  const [code, setCode] = useState("");
  const [linksData, setLinksData] = useState([]);

  useEffect(() => {
    const savedCode = localStorage.getItem("code") || "MAXX777"; 
    setCode(savedCode);

    setLinksData([
      {
        no: "1.",
        id: "#1405676",
        link: `http://localhost:5173/RefrelSignUp/${savedCode}`,
        promoCode: savedCode,
        comment: "Main Website Link",
        type: "Registration",
        program: "Revenue Sharing",
        date: "2025-01-01",
        status: "Active"
      }
    ]);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-6 min-h-screen font-sans transition-colors duration-500 ${darkMode ? "bg-black" : "bg-gray-50/50"}`}>
      
      {/* --- Notification Toast --- */}
      {copied && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-300 border
                        ${darkMode ? "bg-[#111] border-[#f99616]/50 text-[#f99616]" : "bg-white border-[#f99616] text-[#f99616]"}`}>
          <span className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
            <Zap size={16} fill="currentColor" /> Link Copied
          </span>
        </div>
      )}

      {/* --- Top Stats Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Links", val: "01", color: darkMode ? "text-white" : "text-black" },
          { label: "Total Clicks", val: "0", color: "text-[#f99616]" },
          { label: "Conversion rate", val: "0%", color: "text-green-500" },
          { label: "Promo Code", val: code, color: "text-[#f99616]" }
        ].map((item, i) => (
          <div key={i} className={`p-5 rounded-xl border shadow-lg transition-all hover:scale-[1.02]
                                  ${darkMode ? "bg-[#0a0a0a] border-gray-900" : "bg-white border-gray-200"}`}>
            <p className="text-gray-500 text-[10px] uppercase tracking-[2px] font-black mb-1">{item.label}</p>
            <h3 className={`text-2xl font-black font-mono ${item.color}`}>{item.val}</h3>
          </div>
        ))}
      </div>

      {/* --- Links Table Section --- */}
      <div className={`border rounded-2xl overflow-hidden shadow-2xl transition-colors
                      ${darkMode ? "bg-[#0a0a0a] border-gray-900" : "bg-white border-gray-200"}`}>
        
        <div className={`p-6 flex items-center justify-between border-b transition-colors
                        ${darkMode ? "border-gray-900 bg-black/40" : "border-gray-100 bg-gray-50/50"}`}>
          <h3 className={`font-black uppercase tracking-tighter italic flex items-center gap-3 ${darkMode ? "text-white" : "text-slate-800"}`}>
            <div className="bg-[#f99616]/10 p-2 rounded-lg text-[#f99616] border border-[#f99616]/20">
              <LinkIcon size={20} />
            </div>
            Affiliate Assets
          </h3>
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 tracking-widest">
            <div className="w-2 h-2 rounded-full bg-[#f99616] animate-pulse shadow-[0_0_10px_#f99616]"></div>
            SYSTEM ONLINE
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`text-[10px] text-gray-500 uppercase tracking-widest font-black border-b transition-colors
                            ${darkMode ? "bg-[#050505] border-gray-900" : "bg-gray-50 border-gray-100"}`}>
              <tr>
                <th className="px-6 py-5">ID / No</th>
                <th className="px-6 py-5">Tracking Link</th>
                <th className="px-6 py-5">Promo Code</th>
                <th className="px-6 py-5">Program</th>
                <th className="px-6 py-5">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors ${darkMode ? "divide-gray-900" : "divide-gray-100"}`}>
              {linksData.map((row, idx) => (
                <tr key={idx} className={`transition-colors group ${darkMode ? "hover:bg-white/[0.02]" : "hover:bg-gray-50"}`}>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className={`font-black ${darkMode ? "text-white" : "text-black"}`}>{row.id}</span>
                      <span className="text-[10px] text-gray-500 font-black">{row.no}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-6">
                    <div className={`flex items-center gap-3 border p-2.5 rounded-xl max-w-[320px] transition-all
                                    ${darkMode ? "bg-black border-gray-800 group-hover:border-[#f99616]/30" 
                                               : "bg-gray-50 border-gray-200 group-hover:border-[#f99616]"}`}>
                      <Globe size={14} className="text-gray-400" />
                      <span className="text-[#f99616] font-mono text-xs truncate">
                        {row.link}
                      </span>
                      <button 
                        onClick={() => handleCopy(row.link)}
                        className={`ml-auto p-1.5 rounded-lg transition-all active:scale-90
                                  ${darkMode ? "bg-[#f99616]/5 text-[#f99616] hover:bg-[#f99616] hover:text-black" 
                                             : "bg-white border border-gray-200 text-[#f99616] hover:bg-[#f99616] hover:text-white shadow-sm"}`}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span className={`px-3 py-1.5 rounded-lg border font-mono text-sm tracking-widest font-black uppercase transition-colors
                                    ${darkMode ? "bg-[#111] border-gray-800 text-white" : "bg-gray-100 border-gray-200 text-black"}`}>
                      {row.promoCode}
                    </span>
                  </td>

                  <td className={`px-6 py-6 text-[11px] font-black uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {row.program}
                  </td>

                  <td className="px-6 py-6">
                    <button 
                      onClick={() => window.open(row.link, "_blank")}
                      className="flex items-center gap-2 bg-[#f99616] text-white text-[10px] font-black px-5 py-2.5 rounded-lg uppercase hover:bg-[#e88914] transition-all shadow-lg shadow-orange-900/20 active:scale-95"
                    >
                      Visit <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Footer Note --- */}
      <div className={`flex items-center gap-3 p-4 border rounded-2xl transition-colors
                      ${darkMode ? "bg-[#f99616]/5 border-[#f99616]/10" : "bg-orange-50 border-orange-100"}`}>
        <div className="text-[#f99616] bg-[#f99616]/10 p-1.5 rounded-full"><Zap size={16} fill="currentColor" /></div>
        <p className={`text-[11px] font-bold uppercase tracking-tight leading-relaxed ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
          Use these links to invite new traders. Your commission is calculated based on their <span className={darkMode ? "text-white" : "text-black"}>trading volume</span>.
        </p>
      </div>
    </div>
  );
}

export default AffiliateLinks;
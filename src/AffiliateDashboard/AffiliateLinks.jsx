import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, ExternalLink, Link as LinkIcon, Zap, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from "../config";

function AffiliateLinks() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [affiliateData, setAffiliateData] = useState({ code: "" });

  const fetchReferralData = async () => {
    const token = localStorage.getItem("affiliate_token");
    try {
      setLoading(true);
      const res = await fetch(`${API_CONFIG.baseURL}/referral/code`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        setAffiliateData({ code: data.result.referralCode });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReferralData(); }, []);

  // 🚀 Sahi Link Copy karne ka logic
  const handleCopy = () => {
    const domain = window.location.origin; // Auto-detects http://localhost:5173 or https://platform.com
    const fullLink = `${domain}/signup?ref=${affiliateData.code}`;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" /></div>;

  return (
    <div className={`space-y-6 min-h-screen p-4 transition-colors ${darkMode ? "bg-black" : "bg-gray-50"}`}>
      {copied && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-[#111] border border-[#f99616] text-[#f99616] shadow-2xl animate-bounce">
          <Zap size={16} className="inline mr-2" /> Referral Link Copied!
        </div>
      )}

      <div className={`border rounded-2xl overflow-hidden ${darkMode ? "bg-[#0a0a0a] border-gray-900" : "bg-white border-gray-200"}`}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="font-black uppercase italic flex items-center gap-3">
             <LinkIcon size={20} className="text-[#f99616]" /> Affiliate Assets
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-gray-800">
                <th className="px-6 py-5">Tracking Link</th>
                <th className="px-6 py-5">Promo Code</th>
                <th className="px-6 py-5">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className={darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3 border border-gray-800 p-2 rounded-xl max-w-[400px]">
                    <span className="text-[#f99616] text-[10px] font-bold truncate">
                      {window.location.origin}/signup?ref={affiliateData.code}
                    </span>
                    <button onClick={handleCopy} className="p-1 text-gray-400 hover:text-white transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-6 font-black text-[#f99616] tracking-widest">{affiliateData.code}</td>
                <td className="px-6 py-6">
                  <button 
                    onClick={() => navigate(`/signup?ref=${affiliateData.code}`)}
                    className="flex items-center gap-2 bg-[#f99616] text-black text-[10px] font-black px-5 py-2.5 rounded-lg uppercase hover:bg-[#e88914] transition-all active:scale-95"
                  >
                    Test Link <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AffiliateLinks;
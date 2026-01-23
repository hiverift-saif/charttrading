import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldCheck,
  Loader2,
  Check,
  X,
  MessageCircle,
  Image as ImageIcon,
  User as UserIcon
} from "lucide-react";
import API_CONFIG from "../config";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const AdminKYC = () => {
  const { darkMode } = useTheme();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states for document review
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    fetchKYCQueue();
  }, []);

  // 🔹 Helper: Backend se image path sahi format mein laane ke liye
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${API_CONFIG.baseURL}/${path.replace(/\\/g, "/")}`;
  };

  const fetchKYCQueue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${API_CONFIG.baseURL}/kyc/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(res.data?.result?.pendingKyc || []);
    } catch (err) {
      setPendingUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Action Logic: Approve or Reject KYC
  const handleAction = async (kycId, action) => {
    const result = await Swal.fire({
      title: "KYC Authorization",
      text: `Are you sure you want to ${action} this KYC request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#10b981" : "#ef4444",
      background: darkMode ? "#000" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Updating Protocol...",
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false,
    });

    try {
      const token = localStorage.getItem("admin_token");
      await axios.put(
        `${API_CONFIG.baseURL}/admin/kyc/${kycId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Database Updated",
        text: `KYC has been ${action}d successfully.`,
        timer: 1500,
        showConfirmButton: false,
        background: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });

      fetchKYCQueue();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Action Denied",
        text: err.response?.data?.message || "Internal Server Error",
        background: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#f99616]" />
        <p className="text-xs mt-2 uppercase tracking-widest text-gray-500 font-black">Decrypting KYC Queue</p>
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-6 ${darkMode ? "text-white" : "text-black"}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
            KYC <span className="text-[#f99616]">Management</span>
          </h2>
          <div className="bg-zinc-900/50 px-4 py-1.5 rounded-2xl border border-zinc-800">
             <span className="text-[10px] font-black text-[#f99616] uppercase tracking-widest">
                {pendingUsers.length} Pending Actions
             </span>
          </div>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-[2.5rem] bg-zinc-900/10">
            <ShieldCheck size={48} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 italic">
              Verification Queue is Empty
            </p>
          </div>
        ) : (
          <>
            {/* 📱 MOBILE VIEW: DETAILED CARDS */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {pendingUsers.map((user) => (
                <div key={user._id} className={`p-6 rounded-[2rem] border transition-all ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-xl"}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-[#f99616]/10 rounded-2xl"><UserIcon size={20} className="text-[#f99616]" /></div>
                    <div>
                      <p className="text-sm font-black uppercase italic truncate max-w-[180px]">{user.userId?.email}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">PH: {user.userId?.phone || "N/A"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                      onClick={() => { setPreviewImage(getImageUrl(user.aadhaarImagePath)); setPreviewTitle("Aadhaar Verification"); }}
                      className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all active:scale-95 ${darkMode ? "border-zinc-800 bg-zinc-900/30" : "bg-gray-50 border-gray-100"}`}
                    >
                      <ImageIcon size={18} className="text-blue-500"/>
                      <span className="text-[9px] font-black uppercase tracking-widest">Aadhaar</span>
                    </button>
                    <button 
                      onClick={() => { setPreviewImage(getImageUrl(user.panImagePath)); setPreviewTitle("PAN Verification"); }}
                      className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all active:scale-95 ${darkMode ? "border-zinc-800 bg-zinc-900/30" : "bg-gray-50 border-gray-100"}`}
                    >
                      <ImageIcon size={18} className="text-purple-500"/>
                      <span className="text-[9px] font-black uppercase tracking-widest">PAN Card</span>
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => handleAction(user._id, "approve")} className="flex-1 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-[2px] shadow-lg shadow-green-900/20"><Check size={18}/> Approve</button>
                    <button onClick={() => handleAction(user._id, "reject")} className="flex-1 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-[2px] shadow-lg shadow-red-900/20"><X size={18}/> Reject</button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 DESKTOP VIEW: CLEAN TERMINAL TABLE */}
            <div className="hidden lg:block border rounded-[2.5rem] overflow-hidden shadow-2xl border-zinc-800">
              <table className="w-full text-left">
                <thead className={`${darkMode ? "bg-zinc-900 text-zinc-500" : "bg-gray-50 text-gray-400"}`}>
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px]">Identity Terminal</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px]">Network Info</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px] text-center">Protocol Review</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[2px] text-center">Authorization</th>
                  </tr>
                </thead>
                <tbody className={`${darkMode ? "bg-black" : "bg-white"}`}>
                  {pendingUsers.map((user) => (
                    <tr key={user._id} className={`border-t transition-colors ${darkMode ? "border-zinc-900 hover:bg-zinc-900/40" : "border-gray-50 hover:bg-gray-50"}`}>
                      <td className="px-8 py-5">
                        <p className={`font-black text-sm uppercase italic ${darkMode ? "text-white" : "text-black"}`}>{user.userId?.email}</p>
                        <p className="text-[10px] text-[#f99616] font-bold uppercase tracking-widest">TXN ID: {user._id.slice(-8)}</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 opacity-80 font-bold text-xs"><MessageCircle size={14} className="text-[#f99616]" /><span>{user.userId?.phone}</span></div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-4">
                          <button onClick={() => { setPreviewImage(getImageUrl(user.aadhaarImagePath)); setPreviewTitle("Aadhaar Source"); }} className="text-[9px] font-black uppercase p-2 border border-blue-500/30 text-blue-500 rounded-lg hover:bg-blue-500/10">Aadhaar</button>
                          <button onClick={() => { setPreviewImage(getImageUrl(user.panImagePath)); setPreviewTitle("PAN Source"); }} className="text-[9px] font-black uppercase p-2 border border-purple-500/30 text-purple-500 rounded-lg hover:bg-purple-500/10">PAN Card</button>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => handleAction(user._id, "approve")} className="p-3 rounded-2xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-xl active:scale-90"><Check size={20} /></button>
                          <button onClick={() => handleAction(user._id, "reject")} className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-90"><X size={20} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* 🚀 FULL SCREEN CENTERED PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10">
          <div className={`relative rounded-[3rem] max-w-3xl w-full p-8 border animate-in zoom-in-95 duration-300 ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-[0_0_80px_rgba(0,0,0,0.5)]"}`}>
            <button onClick={() => setPreviewImage(null)} className="absolute top-8 right-8 text-gray-500 hover:text-red-500 transition-colors p-2 bg-zinc-900/50 rounded-full"><X size={28} /></button>
            <div className="flex items-center gap-2 mb-8">
               <div className="w-1.5 h-8 bg-[#f99616] rounded-full"></div>
               <h3 className={`font-black uppercase italic text-xl ${darkMode ? "text-white" : "text-black"}`}>{previewTitle}</h3>
            </div>
            <div className="bg-zinc-900/40 rounded-[2rem] overflow-hidden flex items-center justify-center p-2 min-h-[300px] border border-zinc-800">
               <img src={previewImage} alt={previewTitle} className="max-w-full max-h-[65vh] object-contain shadow-2xl rounded-xl" />
            </div>
            <p className="text-center text-[9px] font-black text-gray-500 uppercase tracking-[3px] mt-6 italic">Secure Document Preview Node</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminKYC;
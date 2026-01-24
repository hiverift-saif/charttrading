import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldCheck,
  Loader2,
  Check,
  X,
  MessageCircle,
  Image as ImageIcon,
  User as UserIcon,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import API_CONFIG from "../config";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const AdminKYC = () => {
  const { darkMode } = useTheme();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [filteredKYC, setFilteredKYC] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search & Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    fetchKYCQueue();
  }, []);

  // 🚀 Logic: Filter aur Search apply karna
  useEffect(() => {
    const result = pendingUsers.filter(user => 
      user.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id?.includes(searchTerm)
    );
    setFilteredKYC(result);
    setCurrentPage(1); // Filter change hone par wapas page 1 par
  }, [searchTerm, pendingUsers]);

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
      const data = res.data?.result?.pendingKyc || [];
      setPendingUsers(data);
      setFilteredKYC(data);
    } catch (err) {
      setPendingUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (kycId, action) => {
    const result = await Swal.fire({
      title: "KYC Authorization",
      text: `Confirm ${action} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#10b981" : "#ef4444",
      background: darkMode ? "#000" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (!result.isConfirmed) return;

    Swal.fire({ title: "Processing...", didOpen: () => Swal.showLoading(), background: darkMode ? "#000" : "#fff", color: darkMode ? "#fff" : "#000" });

    try {
      const token = localStorage.getItem("admin_token");
      await axios.put(`${API_CONFIG.baseURL}/admin/kyc/${kycId}/${action}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      Swal.fire({ icon: "success", title: "Updated", timer: 1500, showConfirmButton: false });
      fetchKYCQueue();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: err.response?.data?.message || "Error" });
    }
  };

  // 🔢 Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKYC.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredKYC.length / itemsPerPage);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <>
      <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
            KYC <span className="text-[#f99616]">Management</span>
          </h2>
          <span className="text-[10px] font-black bg-[#f99616]/10 text-[#f99616] px-3 py-1 rounded-md border border-[#f99616]/20">
            {filteredKYC.length} PENDING
          </span>
        </div>

        {/* 🔍 FILTER BAR (Consistent Design) */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by Email or KYC ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-[#f99616]' : 'bg-gray-50 border-gray-100 text-black focus:border-[#f99616]'}`}
            />
          </div>
        </div>

        {filteredKYC.length === 0 ? (
          <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-none opacity-50">
            <ShieldCheck size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-[3px]">Queue is Clear</p>
          </div>
        ) : (
          <>
            {/* 📱 MOBILE VIEW: COMPACT CARDS */}
            <div className="grid grid-cols-1 gap-3 lg:hidden">
              {currentItems.map((user) => (
                <div key={user._id} className={`p-4 rounded-2xl border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-md"}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f99616]/10 rounded-xl"><UserIcon size={18} className="text-[#f99616]" /></div>
                      <div>
                        <p className="text-xs font-black uppercase truncate max-w-[150px] italic">{user.userId?.email}</p>
                        <p className="text-[9px] text-gray-500 font-bold">ID: {user._id.slice(-6)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button onClick={() => { setPreviewImage(getImageUrl(user.aadhaarImagePath)); setPreviewTitle("Aadhaar"); }} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-800 text-[9px] font-black uppercase tracking-widest transition-all active:scale-95"><ImageIcon size={12} className="text-blue-500"/> Aadhaar</button>
                    <button onClick={() => { setPreviewImage(getImageUrl(user.panImagePath)); setPreviewTitle("PAN Card"); }} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-800 text-[9px] font-black uppercase tracking-widest transition-all active:scale-95"><ImageIcon size={12} className="text-purple-500"/> PAN Card</button>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleAction(user._id, "approve")} className="flex-1 h-12 bg-green-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-transform shadow-lg shadow-green-900/20">Approve</button>
                    <button onClick={() => handleAction(user._id, "reject")} className="flex-1 h-12 bg-red-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-transform shadow-lg shadow-red-900/20">Reject</button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💻 DESKTOP VIEW: SHARP BORDER TABLE */}
            <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} rounded-none overflow-hidden shadow-2xl`}>
              <table className="w-full text-left">
                <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">Trader Identity</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest">Contact Info</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Protocol Review</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-center">Authorization</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
                  {currentItems.map((user) => (
                    <tr key={user._id} className="hover:bg-[#f99616]/5 transition-colors group">
                      <td className="px-8 py-5">
                        <p className="font-black text-xs uppercase italic tracking-tighter">{user.userId?.email}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">UID: {user._id.slice(-8)}</p>
                      </td>
                      <td className="px-8 py-5 text-xs font-bold opacity-70 italic">
                         <div className="flex items-center gap-2"><MessageCircle size={14} className="text-[#f99616]"/> {user.userId?.phone}</div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-4">
                          <button onClick={() => { setPreviewImage(getImageUrl(user.aadhaarImagePath)); setPreviewTitle("Aadhaar Source"); }} className="text-[9px] font-black uppercase text-blue-500 border-b border-blue-500/20 hover:border-blue-500 transition-all">View Aadhaar</button>
                          <button onClick={() => { setPreviewImage(getImageUrl(user.panImagePath)); setPreviewTitle("PAN Source"); }} className="text-[9px] font-black uppercase text-purple-500 border-b border-purple-500/20 hover:border-purple-500 transition-all">View PAN</button>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => handleAction(user._id, "approve")} className="p-2.5 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-xl active:scale-90"><Check size={18} /></button>
                          <button onClick={() => handleAction(user._id, "reject")} className="p-2.5 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-90"><X size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 🔢 PAGINATION CONTROLS */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredKYC.length)} of {filteredKYC.length} Nodes
              </p>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className={`p-2 border rounded-xl transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#f99616] hover:border-[#f99616]'}`}><ChevronLeft size={18} /></button>
                <div className="flex items-center px-4 font-black text-xs text-[#f99616]">
                  {currentPage} / {totalPages}
                </div>
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={`p-2 border rounded-xl transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#f99616] hover:border-[#f99616]'}`}><ChevronRight size={18} /></button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 🚀 IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10">
          <div className={`relative rounded-[3rem] max-w-3xl w-full p-8 border animate-in zoom-in-95 duration-300 ${darkMode ? "bg-black border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.5)]" : "bg-white border-gray-100 shadow-2xl"}`}>
            <button onClick={() => setPreviewImage(null)} className="absolute top-8 right-8 text-gray-500 hover:text-red-500 transition-colors p-2 bg-zinc-900/50 rounded-full"><X size={28} /></button>
            <div className="flex items-center gap-2 mb-8">
               <div className="w-1.5 h-8 bg-[#f99616] rounded-full"></div>
               <h3 className={`font-black uppercase italic text-xl ${darkMode ? "text-white" : "text-black"}`}>{previewTitle}</h3>
            </div>
            <div className="bg-zinc-900/40 rounded-[2rem] overflow-hidden flex items-center justify-center p-2 min-h-[300px] border border-zinc-800 shadow-inner">
               <img src={previewImage} alt={previewTitle} className="max-w-full max-h-[65vh] object-contain shadow-2xl rounded-xl" />
            </div>
            <p className="text-center text-[9px] font-black text-gray-500 uppercase tracking-[3px] mt-6 italic">Secure Document Review Node</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminKYC;
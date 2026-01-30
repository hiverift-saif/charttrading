import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldCheck, Loader2, Check, X, 
  Image as ImageIcon, User as UserIcon, Search,
  ChevronLeft, ChevronRight
} from "lucide-react";
import API_CONFIG from "../config";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const AdminKYC = () => {
  const { darkMode } = useTheme();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [filteredKYC, setFilteredKYC] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => { fetchKYCQueue(); }, []);

  useEffect(() => {
    const result = pendingUsers.filter(item => 
      item.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item._id?.includes(searchTerm) ||
      item.panNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm)
    );
    setFilteredKYC(result);
    setCurrentPage(1);
  }, [searchTerm, pendingUsers]);

  const fetchKYCQueue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${API_CONFIG.baseURL}/kyc/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Response structure based on your JSON: result.pendingKyc
      const data = res.data?.result?.pendingKyc || [];
      setPendingUsers(data);
      setFilteredKYC(data);
    } catch (err) { 
      console.error("KYC Fetch Error:", err); 
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

    Swal.fire({ title: "Processing...", didOpen: () => Swal.showLoading() });

    try {
      const token = localStorage.getItem("admin_token");
      console.log(`${API_CONFIG.baseURL}/admin/kyc/${kycId}/${action}`);
      const response = await axios.put(
        `${API_CONFIG.baseURL}/admin/kyc/${kycId}/${action}`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        Swal.fire({ icon: "success", title: "Protocol Updated", timer: 1500, showConfirmButton: false });
        fetchKYCQueue();
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Action Failed" });
    }
  };

  const handlePreview = (url, title) => {
    if (!url) return Swal.fire("Error", "Document image not found", "error");
    setPreviewImage(url);
    setPreviewTitle(title);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKYC.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredKYC.length / itemsPerPage);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <>
      <div className={`space-y-6 animate-in fade-in duration-700 ${darkMode ? "text-white" : "text-black"}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">KYC <span className="text-[#f99616]">Management</span></h2>
          <span className="text-[10px] font-black bg-[#f99616]/10 text-[#f99616] px-3 py-1 rounded-md border border-[#f99616]/20">{filteredKYC.length} PENDING</span>
        </div>

        <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100'}`}>
           <Search size={16} className="text-gray-500 ml-2" />
           <input type="text" placeholder="Search by email, PAN or UID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent outline-none text-xs font-bold w-full" />
        </div>

        {/* DESKTOP TABLE */}
        <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} overflow-hidden shadow-2xl`}>
          <table className="w-full text-left">
            <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b border-zinc-800`}>
              <tr>
                <th className="px-8 py-4 text-[10px] font-black uppercase">User Info</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase">Details</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-center">Documents</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase text-center">Authorization</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
              {currentItems.map((item) => (
                <tr key={item._id} className="hover:bg-[#f99616]/5 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-black text-xs uppercase italic text-[#f99616]">{item.userId?.email || 'N/A'}</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight">UID: {item._id}</p>
                    <p className="text-[9px] text-gray-400">Ph: {item.phone}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[10px] font-bold uppercase">PAN: <span className={darkMode ? "text-white" : "text-black"}>{item.panNumber}</span></p>
                    <p className="text-[10px] font-bold uppercase">Aadhaar: <span className={darkMode ? "text-white" : "text-black"}>{item.aadhaarNumber}</span></p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center gap-2">
                       <button onClick={() => handlePreview(item.panImagePath, "PAN Document")} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-[9px] font-black uppercase text-[#f99616] rounded-lg border border-zinc-800 hover:border-[#f99616] transition-all"><ImageIcon size={14}/> PAN</button>
                       <button onClick={() => handlePreview(item.aadhaarImagePath, "Aadhaar Document")} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-[9px] font-black uppercase text-[#f99616] rounded-lg border border-zinc-800 hover:border-[#f99616] transition-all"><ImageIcon size={14}/> Aadhaar</button>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleAction(item._id, "approve")} className="p-2 border border-green-500/20 text-green-500 hover:bg-green-600 hover:text-white rounded-lg transition-all"><Check size={18}/></button>
                      <button onClick={() => handleAction(item._id, "reject")} className="p-2 border border-red-500/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all"><X size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW */}
        <div className="grid grid-cols-1 gap-3 lg:hidden">
            {currentItems.map((item) => (
              <div key={item._id} className={`p-4 rounded-2xl border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100"}`}>
                 <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-xs font-black uppercase italic text-[#f99616]">{item.userId?.email}</p>
                        <p className="text-[9px] text-gray-500 uppercase">PAN: {item.panNumber}</p>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => handlePreview(item.panImagePath, "PAN Document")} className="p-2 bg-zinc-900 rounded-lg text-[#f99616]"><ImageIcon size={16}/></button>
                       <button onClick={() => handlePreview(item.aadhaarImagePath, "Aadhaar Document")} className="p-2 bg-zinc-900 rounded-lg text-[#f99616]"><ImageIcon size={16}/></button>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => handleAction(item._id, "approve")} className="flex-1 h-12 bg-green-600 text-white rounded-xl font-black text-[10px] uppercase">Approve</button>
                    <button onClick={() => handleAction(item._id, "reject")} className="flex-1 h-12 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase">Reject</button>
                 </div>
              </div>
            ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center py-6 pb-10">
            <p className="text-[10px] font-black uppercase text-gray-500 italic">Sector {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredKYC.length)}</p>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 border border-zinc-800 rounded-xl text-[#f99616] disabled:opacity-20"><ChevronLeft size={18}/></button>
              <div className="flex items-center px-4 font-black text-xs text-[#f99616]">{currentPage} / {totalPages}</div>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-zinc-800 rounded-xl text-[#f99616] disabled:opacity-20"><ChevronRight size={18}/></button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL IMAGE VIEWER */}
      {previewImage && (
        <div className="fixed inset-0 lg:left-72 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <div className={`relative rounded-[3rem] max-w-3xl w-full p-8 border animate-in zoom-in-95 duration-300 ${darkMode ? "bg-black border-zinc-800" : "bg-white shadow-2xl"}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewImage(null)} className="absolute top-8 right-8 text-gray-500 hover:text-red-500 p-2 bg-zinc-900 rounded-full transition-all"><X size={28} /></button>
            <h3 className="font-black uppercase italic text-xl mb-8 flex items-center gap-2">
                <div className="w-1 h-6 bg-[#f99616]"></div>{previewTitle}
            </h3>
            <div className="bg-zinc-900/40 rounded-[2rem] overflow-hidden p-2 border border-zinc-800">
                <img src={previewImage} alt="KYC Doc" className="max-w-full max-h-[60vh] object-contain mx-auto rounded-xl shadow-2xl" />
            </div>
            <p className="text-center text-[9px] font-black text-gray-500 uppercase tracking-[3px] mt-6 italic">Secure Surveillance Node</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminKYC;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  Eye,
  Trash2,
  Pencil,
  X,
  User as UserIcon,
  Shield,
  Wallet
} from "lucide-react";
import Swal from "sweetalert2";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext";

const AdminUserManagement = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${API_CONFIG.baseURL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data?.result || []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: darkMode ? "#000" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`${API_CONFIG.baseURL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        title: "Deleted",
        icon: "success",
        background: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
      fetchUsers();
    } catch {
      Swal.fire({
        title: "Error",
        icon: "error",
        background: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      await axios.put(
        `${API_CONFIG.baseURL}/admin/users/${editUser._id}`,
        { role: editUser.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: "Updated",
        icon: "success",
        background: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
      setEditUser(null);
      fetchUsers();
    } catch {
      Swal.fire({
        title: "Error",
        icon: "error",
        background: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-[#f99616]" size={40} />
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-6 ${darkMode ? "text-white" : "text-black"}`}>
        <h2 className="text-xl font-black uppercase italic">
          User <span className="text-[#f99616]">Management</span>
        </h2>

        {/* 📱 MOBILE VIEW (Center Optimized) */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {users.map((u) => (
            <div 
              key={u._id} 
              className={`p-5 rounded-[2rem] border transition-colors ${darkMode ? "bg-black border-zinc-800 text-white" : "bg-white border-gray-100 text-black shadow-sm"}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#f99616]/10 rounded-xl">
                    <UserIcon size={20} className="text-[#f99616]" />
                  </div>
                  <div>
                    <p className="font-black text-sm truncate max-w-[150px] uppercase italic">{u.name || u.email.split('@')[0]}</p>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">ID: {u._id.slice(-6)}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-[#f99616]/10 text-[#f99616]'}`}>
                  {u.role}
                </span>
              </div>

              <div className="flex gap-2 border-t pt-4 border-gray-800/30">
                <button 
                  onClick={() => setSelectedUser(u)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl text-[10px] font-black uppercase tracking-widest ${darkMode ? "border-zinc-800 text-white" : "border-gray-200 text-black"}`}
                >
                  <Eye size={14} /> View
                </button>
                <button 
                  onClick={() => setEditUser({ ...u })}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl text-[10px] font-black uppercase tracking-widest ${darkMode ? "border-zinc-800 text-[#f99616]" : "border-gray-200 text-[#f99616]"}`}
                >
                  <Pencil size={14} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(u._id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl text-[10px] font-black uppercase tracking-widest ${darkMode ? "border-zinc-800 text-red-500" : "border-gray-200 text-red-500"}`}
                >
                  <Trash2 size={14} /> Del
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP VIEW */}
        <div className="hidden lg:block border rounded-[2rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className={`${darkMode ? "bg-zinc-900" : "bg-gray-50 text-gray-500"}`}>
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[2px]">User Terminal</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[2px]">Account Role</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[2px] text-center">Protocol Actions</th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? "bg-black" : "bg-white"}`}>
              {users.map((u) => (
                <tr key={u._id} className={`border-t transition-colors ${darkMode ? "border-zinc-900 hover:bg-zinc-900/50" : "border-gray-50 hover:bg-gray-50"}`}>
                  <td className="px-6 py-4">
                    <p className={`font-black text-sm uppercase italic ${darkMode ? "text-white" : "text-black"}`}>{u.email}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">KYC: {u.kycStatus}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-[#f99616]/10 text-[#f99616]'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => setSelectedUser(u)} className={`p-2 border rounded-xl hover:bg-blue-500 hover:text-white transition-all ${darkMode ? "border-zinc-800 text-blue-500" : "border-gray-200 text-blue-500"}`}><Eye size={16} /></button>
                      <button onClick={() => setEditUser({ ...u })} className={`p-2 border rounded-xl hover:bg-orange-500 hover:text-white transition-all ${darkMode ? "border-zinc-800 text-orange-500" : "border-gray-200 text-orange-500"}`}><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(u._id)} className={`p-2 border rounded-xl hover:bg-red-500 hover:text-white transition-all ${darkMode ? "border-zinc-800 text-red-500" : "border-gray-200 text-red-500"}`}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🚀 CENTERED MODAL FOR MOBILE & DESKTOP */}
      {selectedUser && (
        <Modal title="Analytics Terminal" onClose={() => setSelectedUser(null)} darkMode={darkMode}>
          <div className="space-y-4">
            <div className={`p-5 rounded-2xl flex items-center gap-4 border ${darkMode ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-100"}`}>
               <Wallet className="text-[#f99616]" />
               <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Balance</p>
                  <p className={`text-xl font-black italic ${darkMode ? "text-white" : "text-black"}`}>${selectedUser.realBalance?.toLocaleString() || 0}</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
               <Detail label="KYC STATUS" value={selectedUser.kycStatus} darkMode={darkMode} />
               <Detail label="COMMISSION" value={`${selectedUser.commissionRate}%`} darkMode={darkMode} />
            </div>
            <Detail label="USER EMAIL" value={selectedUser.email} darkMode={darkMode} />
            <p className="text-[8px] text-gray-500 break-all font-mono bg-black/40 p-2 rounded uppercase tracking-widest">Network ID: {selectedUser._id}</p>
          </div>
        </Modal>
      )}

 {/* ✏️ EDIT MODAL (Mobile Theme & Alignment Fixed) */}
{editUser && (
  <Modal title="Permission Control" onClose={() => setEditUser(null)} darkMode={darkMode}>
    <div className="space-y-6">
      <div>
        <label className={`text-[10px] font-black uppercase mb-3 block tracking-[2px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          Assign Role Authority
        </label>
        
        {/* 🚀 FIXED: Dynamic Dropdown for Mobile */}
        <div className="relative group">
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            className={`w-full p-5 rounded-2xl border font-black uppercase text-xs outline-none transition-all appearance-none cursor-pointer
              ${darkMode 
                ? "bg-black border-zinc-800 text-white focus:border-[#f99616]" 
                : "bg-gray-50 border-gray-200 text-black focus:border-[#f99616]"
              }`}
          >
            {/* 💡 Note: Manual classes for mobile dropdown background */}
            <option value="user" className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
              Standard Trader
            </option>
            <option value="admin" className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
              System Admin
            </option>
          </select>
          
          {/* Custom Arrow taaki appearance-none ke baad bhi icon dikhe */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1L5 5L9 1" />
            </svg>
          </div>
        </div>
      </div>

      <button 
        onClick={handleUpdate} 
        disabled={loading}
        className="w-full h-14 bg-[#f99616] text-black font-black uppercase tracking-[2px] rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Authority"}
      </button>
    </div>
  </Modal>
)}
    </>
  );
};

/* 🔹 CENTERED MODAL COMPONENT */
const Modal = ({ title, children, onClose, darkMode }) => (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
    <div className={`rounded-[2.5rem] p-8 w-full max-w-md relative animate-in zoom-in-95 duration-300 border ${darkMode ? "bg-black border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,1)]" : "bg-white border-gray-200 shadow-2xl"}`}>
      <button onClick={onClose} className={`absolute top-6 right-6 transition-colors ${darkMode ? "text-gray-600 hover:text-red-500" : "text-gray-400 hover:text-red-500"}`}><X size={24} /></button>
      <div className="flex items-center gap-2 mb-8">
         <div className="w-1.5 h-6 bg-[#f99616] rounded-full"></div>
         <h3 className={`font-black uppercase italic text-xl ${darkMode ? "text-white" : "text-black"}`}>{title}</h3>
      </div>
      {children}
    </div>
  </div>
);

const Detail = ({ label, value, darkMode }) => (
  <div className={`p-3 rounded-2xl border ${darkMode ? "border-zinc-800 bg-zinc-900/20" : "border-gray-100 bg-gray-50"}`}>
    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
    <p className={`font-black text-xs uppercase truncate ${darkMode ? "text-white" : "text-black"}`}>{value}</p>
  </div>
);

export default AdminUserManagement;
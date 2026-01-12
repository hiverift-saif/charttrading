import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ShieldAlert,
  Check,
  X,
  Loader2,
  Calendar,
  User,
  Mail,
  Wallet,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-react';
import API_CONFIG from '../config';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext";

const AdminUserManagement = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // ✅ Fetch ALL users (pending / approved / rejected)
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      const response = await axios.get(
        `${API_CONFIG.baseURL}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data && Array.isArray(response.data.result)) {
        setUsers(response.data.result);
      } else if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ KYC Action (approve / reject)
  const handleKYCAction = async (user, action) => {
    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    const result = await Swal.fire({
      title: 'Confirm Action',
      text: `Change KYC status to ${newStatus.toUpperCase()} for ${user.email}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#f99616' : '#ef4444',
      cancelButtonColor: '#1f1f1f',
      confirmButtonText: `Yes, ${newStatus}`,
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("admin_token");

      await axios.put(
        `${API_CONFIG.baseURL}/admin/user/${user._id}`,
        { kycStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `KYC updated to ${newStatus}`,
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        timer: 1500,
        showConfirmButton: false
      });

      fetchAllUsers();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.response?.data?.message || 'Server error',
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000'
      });
    }
  };

  // ✅ Loader
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 w-full">
        <Loader2 className="w-10 h-10 animate-spin text-[#f99616] mb-4" />
        <p className={`${darkMode ? 'text-gray-500' : 'text-slate-400'} font-black uppercase tracking-[3px] text-[10px]`}>
          Refreshing User Database...
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full space-y-6 animate-in fade-in duration-500 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold uppercase italic tracking-wider">
            User <span className="text-[#f99616]">Management</span>
          </h2>
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 italic ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
            Full User List & Verification Control
          </p>
        </div>

        <span className="bg-gray-800/50 text-gray-400 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase border border-gray-700">
          Total: {users.length}
        </span>
      </div>

      {/* Table */}
      <div className={`border rounded-3xl overflow-hidden shadow-2xl transition-colors ${darkMode ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-slate-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-black/50 border-gray-800' : 'bg-slate-50 border-slate-100'} border-b`}>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">User Info</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">KYC Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Wallet</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Created At</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>

            <tbody className={`divide-y ${darkMode ? 'divide-gray-900' : 'divide-slate-50'}`}>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className={`transition-colors ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'}`}
                >
                  {/* User Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-black text-[#f99616] text-sm ${darkMode ? 'bg-black border-gray-800' : 'bg-slate-50 border-slate-200'}`}>
                        {u.email?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">{u.email}</span>
                        <span className="text-[8px] font-bold text-gray-500 uppercase">
                          Role: {u.role}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* KYC Status */}
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border
                        ${
                          u.kycStatus === 'approved'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : u.kycStatus === 'rejected'
                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                            : 'bg-orange-500/10 text-orange-500 border-orange-500/20 animate-pulse'
                        }`}
                    >
                      {u.kycStatus === 'approved' ? (
                        <ShieldCheck size={10} />
                      ) : u.kycStatus === 'rejected' ? (
                        <X size={10} />
                      ) : (
                        <Clock size={10} />
                      )}
                      {u.kycStatus || 'pending'}
                    </div>
                  </td>

                  {/* Wallet */}
                  <td className="px-6 py-4">
                    <span className="font-black text-sm">
                      ${u.realBalance?.toLocaleString() || 0}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 font-bold text-[10px] text-gray-500 uppercase">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {u.kycStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => handleKYCAction(u, 'approve')}
                            className="p-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg hover:bg-green-500 hover:text-white transition-all shadow-lg"
                            title="Approve KYC"
                          >
                            <Check size={16} strokeWidth={3} />
                          </button>

                          <button
                            onClick={() => handleKYCAction(u, 'reject')}
                            className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            title="Reject KYC"
                          >
                            <X size={16} strokeWidth={3} />
                          </button>
                        </>
                      )}

                      {u.kycStatus === 'approved' && (
                        <span className="text-[9px] font-black text-green-500 uppercase">
                          Approved
                        </span>
                      )}

                      {u.kycStatus === 'rejected' && (
                        <span className="text-[9px] font-black text-red-500 uppercase">
                          Rejected
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;

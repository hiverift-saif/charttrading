import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShieldCheck,
  Loader2,
  Check,
  X,
  MessageCircle,
  Image as ImageIcon
} from "lucide-react";
import API_CONFIG from "../config";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

const AdminKYC = () => {
  const { darkMode } = useTheme();

  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Modal states
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    fetchKYCQueue();
  }, []);

  // 🔹 Normalize image path
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

  const handleAction = async (kycId, action) => {
    const result = await Swal.fire({
      title: "KYC Authorization",
      text: `Are you sure you want to ${action} this KYC?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "approve" ? "#10b981" : "#ef4444",
      background: darkMode ? "#0d0d0d" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: "Processing...",
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
        title: "Success",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchKYCQueue();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Action failed",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#f99616]" />
        <p className="text-xs mt-2 uppercase tracking-widest text-gray-400">
          Loading KYC Queue
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black uppercase">
            KYC <span className="text-[#f99616]">Queue</span>
          </h2>
          <span className="text-xs font-black text-[#f99616]">
            {pendingUsers.length} Pending
          </span>
        </div>

        {pendingUsers.length === 0 ? (
          <div className="p-20 text-center border rounded-3xl">
            <ShieldCheck size={48} className="mx-auto text-gray-400" />
            <p className="mt-2 text-xs uppercase tracking-widest">
              No Pending KYC
            </p>
          </div>
        ) : (
          <div className="border rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-black">
                <tr>
                  <th className="px-6 py-3 text-xs">User</th>
                  <th className="px-6 py-3 text-xs">Contact</th>
                  <th className="px-6 py-3 text-xs text-center">Documents</th>
                  <th className="px-6 py-3 text-xs text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {pendingUsers.map((user) => {
                  const canApprove =
                    user.panImagePath && user.aadhaarImagePath;

                  return (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold">
                          {user.userId?.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          KYC ID: {user._id.slice(-6)}
                        </p>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MessageCircle size={14} />
                          <span className="text-xs">
                            {user.userId?.phone}
                          </span>
                        </div>
                      </td>

                      {/* Documents */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col gap-2 items-center">
                          <button
                            onClick={() => {
                              setPreviewImage(
                                getImageUrl(user.aadhaarImagePath)
                              );
                              setPreviewTitle("Aadhaar Card");
                            }}
                            className="flex items-center gap-1 text-xs text-blue-500 font-bold"
                          >
                            <ImageIcon size={14} /> Aadhaar
                          </button>

                          <button
                            onClick={() => {
                              setPreviewImage(
                                getImageUrl(user.panImagePath)
                              );
                              setPreviewTitle("PAN Card");
                            }}
                            className="flex items-center gap-1 text-xs text-purple-500 font-bold"
                          >
                            <ImageIcon size={14} /> PAN
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            disabled={!canApprove}
                            onClick={() =>
                              handleAction(user._id, "approve")
                            }
                            className={`p-2 rounded-xl border
                              ${
                                canApprove
                                  ? "bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white"
                                  : "bg-gray-300 text-gray-400 cursor-not-allowed"
                              }
                            `}
                          >
                            <Check size={16} />
                          </button>

                          <button
                            onClick={() =>
                              handleAction(user._id, "reject")
                            }
                            className="p-2 rounded-xl border bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🔥 IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative bg-black rounded-xl max-w-3xl w-full p-4">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 text-white text-xl"
            >
              ✕
            </button>

            <h3 className="text-white text-sm mb-3 font-bold uppercase tracking-widest">
              {previewTitle}
            </h3>

            <img
              src={previewImage}
              alt={previewTitle}
              className="w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminKYC;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  Eye,
  Trash2,
  Pencil,
  X
} from "lucide-react";
import Swal from "sweetalert2";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext";

const AdminUserManagement = () => {
  const { darkMode } = useTheme();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
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

  // 🗑️ delete user
  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: darkMode ? "#0d0d0d" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`${API_CONFIG.baseURL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted", "User removed", "success");
      fetchUsers();
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // ✏️ update user
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      await axios.put(
        `${API_CONFIG.baseURL}/admin/users/${editUser._id}`,
        { role: editUser.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Updated", "User updated", "success");
      setEditUser(null);
      fetchUsers();
    } catch {
      Swal.fire("Error", "Update failed", "error");
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
      <div className={`space-y-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
        <h2 className="text-xl font-black uppercase">
          User <span className="text-[#f99616]">Management</span>
        </h2>

        <div className="border rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 dark:bg-black">
              <tr>
                <th className="px-6 py-3 text-xs">User</th>
                <th className="px-6 py-3 text-xs">Role</th>
                <th className="px-6 py-3 text-xs text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  {/* user */}
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm">{u.email}</p>
                    <p className="text-xs text-gray-400">
                      ID: {u._id.slice(-6)}
                    </p>
                  </td>

                  {/* role */}
                  <td className="px-6 py-4 text-xs font-bold uppercase">
                    {u.role}
                  </td>

                  {/* actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {/* view */}
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="p-2 border rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white"
                        title="View details"
                      >
                        <Eye size={14} />
                      </button>

                      {/* edit */}
                      <button
                        onClick={() => setEditUser({ ...u })}
                        className="p-2 border rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white"
                        title="Edit user"
                      >
                        <Pencil size={14} />
                      </button>

                      {/* delete */}
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="p-2 border rounded-lg text-red-500 hover:bg-red-500 hover:text-white"
                        title="Delete user"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 👁️ VIEW DETAILS MODAL */}
      {selectedUser && (
        <Modal title="User Details" onClose={() => setSelectedUser(null)}>
          <Detail label="Email" value={selectedUser.email} />
          <Detail label="Role" value={selectedUser.role} />
          <Detail label="Status" value={selectedUser.status || "active"} />
          <Detail
            label="Wallet Balance"
            value={`$${selectedUser.realBalance?.toLocaleString() || 0}`}
          />
          <Detail
            label="Created At"
            value={new Date(selectedUser.createdAt).toLocaleString()}
          />
          <Detail label="User ID" value={selectedUser._id} />
        </Modal>
      )}

      {/* ✏️ EDIT USER MODAL */}
      {editUser && (
        <Modal title="Update User" onClose={() => setEditUser(null)}>
          <label className="text-xs font-bold mb-1 block">Role</label>
          <select
            value={editUser.role}
            onChange={(e) =>
              setEditUser({ ...editUser, role: e.target.value })
            }
            className="w-full p-2 border rounded mb-4 bg-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleUpdate}
            className="w-full bg-[#f99616] text-black font-black py-2 rounded"
          >
            Save Changes
          </button>
        </Modal>
      )}
    </>
  );
};

/* 🔹 Modal component */
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
    <div className="bg-white dark:bg-[#0d0d0d] text-black dark:text-white rounded-xl p-6 w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
      >
        <X size={18} />
      </button>
      <h3 className="font-black mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

/* 🔹 Detail row */
const Detail = ({ label, value }) => (
  <div className="mb-2 text-sm">
    <span className="font-bold">{label}:</span>{" "}
    <span className="opacity-80">{value}</span>
  </div>
);

export default AdminUserManagement;

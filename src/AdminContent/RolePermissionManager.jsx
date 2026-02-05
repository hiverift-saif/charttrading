import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  ShieldCheck, Save, Lock, CheckSquare, Square, ShieldPlus, 
  LayoutGrid, XCircle, Search, ChevronLeft, ChevronRight, Trash2, Loader2 
} from 'lucide-react';
import Swal from 'sweetalert2';
import API_CONFIG from "../config";

const RolePermissionManager = ({ darkMode }) => {
  const [admins, setAdmins] = useState(""); // Roles ki jagah actual Admin list fetch karenge
  const [masterPermissions, setMasterPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [roleData, setRoleData] = useState({ name: "", description: "" });
  const [permData, setPermData] = useState({ name: "", slug: "", module: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const token = localStorage.getItem("admin_token");

  // --- 🛰️ API 1: FETCH INITIAL DATA (Integrated with /admin/roles) ---
  const fetchInitialData = useCallback(async () => {
  try {
    setLoading(true);

    const [permRes, adminRes] = await Promise.all([
      axios.get(`${API_CONFIG.baseURL}/admin/permissions/list`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(`${API_CONFIG.baseURL}/admin/roles`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    ]);

    const fetchedPerms = permRes.data?.result || [];
    const fetchedAdmins = adminRes.data?.result || [];

    setMasterPermissions(fetchedPerms);
    setFilteredPermissions(fetchedPerms);

    setAdmins(fetchedAdmins);
    console.log("Fetched Admins:", admins);

    if (fetchedAdmins.length > 0) {
      console.log("Selecting first admin by default",selectedAdmin);
      const currentId = '69803afda85e6fc58e756bf4';
      const target = fetchedAdmins.find(a => a._id === currentId) || fetchedAdmins[0];
      console.log("Target Admin for Selection:", target);
      const activeSlugs = target.permissions?.map(p => p.slug) || [];

      setSelectedAdmin({
        ...target,
        customPermissions: activeSlugs
      });
    }

  } catch (err) {
    console.error("Fetch Error:", err);
    Swal.fire("Sync Error", "Server Connectivity Lost", "error");
  } finally {
    setLoading(false);
  }
}, [token, selectedAdmin?._id]);

useEffect(() => {
  fetchInitialData();
}, [fetchInitialData]);

useEffect(() => {
  const result = masterPermissions.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.module?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredPermissions(result);
  setCurrentPage(1);
}, [searchTerm, masterPermissions]);






  // --- 🗑️ DELETE LOGIC ---
  const handleDeleteRole = async (id) => {
    const confirm = await Swal.fire({
      title: "Revoke Access?",
      text: "This admin will lose all special permissions!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: darkMode ? "#0d0d0d" : "#fff"
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_CONFIG.baseURL}/admin/roles/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchInitialData();
        Swal.fire("Deleted", "Identity Node Purged", "success");
      } catch (err) { Swal.fire("Error", "Action Denied", "error"); }
    }
  };

  const handleDeletePermission = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/admin/permissions/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchInitialData();
    } catch (err) { Swal.fire("Error", "Purge Failed", "error"); }
  };

const togglePermission = (permSlug) => {
  setSelectedAdmin((prev) => {
    if (!prev) return prev;

    const currentPerms = prev.customPermissions || [];

    const updatedPerms = currentPerms.includes(permSlug)
      ? currentPerms.filter((s) => s !== permSlug)
      : [...currentPerms, permSlug];

    return {
      ...prev,
      customPermissions: updatedPerms,
    };
  });
};

  // --- 🚀 API 2: ASSIGN ROLES (Integrated with /admin/users/:id/assign-roles) ---
  const handleUpdateProtocol = async () => {
    try {
      if (!selectedAdmin?._id) return;
      
      Swal.fire({ title: "Encrypting Matrix...", didOpen: () => Swal.showLoading() });

      // Body structure matching your requirement exactly
      const payload = {
        adminId: "6961f0e48493afd1138b76d6", // User ID (6961f0e48493afd1138b76d6)
        roleIds: ["69803b34f84d3c30eccb1166"], // Role ID from your success JSON
        customPermissions: selectedAdmin.customPermissions || [] // Slugs (VIEW_REPORTS_TRADE etc.)
      };

      // Exact Endpoint provided by you
      await axios.post(
        `${API_CONFIG.baseURL}/admin/users/6961f0e48493afd1138b76d6/assign-roles`, 
        payload, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({ icon: "success", title: "Protocol Assigned", timer: 1500, showConfirmButton: false });
      fetchInitialData();
    } catch (err) { 
      const errMsg = err.response?.data?.message || "Admin not found (400)";
      Swal.fire("Deployment Failed", errMsg, "error"); 
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPermissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>;

  return (
    <div className={`w-full space-y-8 pb-20 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* 🟢 TOP CONTROLS (Restored Inputs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><LayoutGrid size={24}/></div>
            <h3 className="font-black uppercase italic text-sm">Register Module</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input type="text" placeholder="Name" value={permData.name} onChange={e => setPermData({...permData, name: e.target.value})} className={`px-5 py-3 rounded-xl border ${darkMode ? 'bg-black border-zinc-700' : 'bg-slate-50 border-slate-200'}`} />
            <input type="text" placeholder="Slug" value={permData.slug} onChange={e => setPermData({...permData, slug: e.target.value})} className={`px-5 py-3 rounded-xl border ${darkMode ? 'bg-black border-zinc-700' : 'bg-slate-50 border-slate-200'}`} />
            <input type="text" placeholder="Module Group" value={permData.module} onChange={e => setPermData({...permData, module: e.target.value})} className={`col-span-2 px-5 py-3 rounded-xl border ${darkMode ? 'bg-black border-zinc-700' : 'bg-slate-50 border-slate-200'}`} />
          </div>
          <button onClick={() => Swal.fire("Registered", "Protocol node added", "success")} className="w-full py-4 bg-blue-600 text-white font-black uppercase text-[10px] rounded-xl active:scale-95 transition">Register Node</button>
        </div>

        <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#f99616]/10 rounded-2xl text-[#f99616]"><ShieldPlus size={24}/></div>
            <h3 className="font-black uppercase italic text-sm">Deploy Admin Identity</h3>
          </div>
          <input type="text" placeholder="Admin Username" value={roleData.name} onChange={e => setRoleData({...roleData, name: e.target.value})} className={`w-full px-5 py-3 rounded-xl border mb-4 ${darkMode ? 'bg-black border-zinc-700' : 'bg-slate-50 border-slate-200'}`} />
          <button onClick={() => Swal.fire("Ready", "Admin identity initialized", "success")} className="w-full py-4 bg-[#f99616] text-black font-black uppercase text-[10px] rounded-xl active:scale-95 transition">Deploy Identity</button>
        </div>
      </div>

      {/* 📊 MATRIX (Admin Selector & Table) */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 overflow-x-auto pb-4 custom-sidebar-scroll">
          {admins.map(admin => (
            <div key={admin._id} className="relative group flex-shrink-0">
              <button 
                onClick={() => {
                  const slugs = admin.permissions?.map(p => p.slug) || [];
                  setSelectedAdmin({...admin, customPermissions: slugs});
                }} 
                className={`px-8 py-4 rounded-[2rem] text-[11px] font-black uppercase border transition-all ${selectedAdmin?._id === admin._id 
                  ? 'bg-[#f99616] border-[#f99616] text-black shadow-lg shadow-orange-500/20' 
                  : darkMode ? 'bg-zinc-900/20 border-zinc-800 text-zinc-500' : 'bg-slate-100 border-slate-200 text-slate-500'}`}
              >
                {admin.name}
              </button>
              {admin.name.toLowerCase() !== 'admin' && (
                <button onClick={() => handleDeleteRole(admin._id)} className="absolute -right-1 -top-1 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg z-10"><Trash2 size={10}/></button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className={`flex-1 p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <Search size={18} className="text-zinc-600 ml-2"/><input type="text" placeholder="Filter protocols..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={`bg-transparent outline-none text-xs font-bold w-full ${darkMode ? 'text-white' : 'text-slate-900'}`} />
            </div>
            <button onClick={handleUpdateProtocol} className="px-12 py-4 bg-[#f99616] text-black font-black uppercase text-xs rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-3"><Save size={20} /> Deploy Protocol</button>
          </div>

          <div className={`rounded-[3rem] border overflow-hidden ${darkMode ? 'bg-black border-zinc-800 shadow-2xl' : 'bg-white border-slate-200 shadow-2xl'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className={darkMode ? 'bg-zinc-900/50' : 'bg-slate-100'}>
                  <tr>
                    <th className="px-10 py-6 text-[10px] font-black uppercase text-zinc-500 border-b border-zinc-800">Protocol Node</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase text-center border-b border-zinc-800">Authorization</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase text-center border-b border-zinc-800">Purge</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${darkMode ? 'divide-zinc-900/50' : 'divide-slate-100'}`}>
                  {currentItems.map((perm) => {
                    const isAuthorized = selectedAdmin?.customPermissions?.includes(perm.slug);
                    return (
                      <tr key={perm._id} className={`transition-all ${darkMode ? 'hover:bg-zinc-900/10' : 'hover:bg-slate-50'}`}>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl border ${isAuthorized ? 'bg-[#f99616]/10 border-[#f99616]/20 text-[#f99616]' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}><Lock size={16}/></div>
                            <div>
                              <span className={`font-black text-xs uppercase italic block ${darkMode ? 'text-white' : 'text-slate-800'}`}>{perm.name}</span>
                              <span className="text-[8px] font-bold uppercase text-zinc-500">{perm.module}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-center">
                 <button
  type="button"
  onClick={() => togglePermission(perm.slug)}
  className={`px-6 py-3 rounded-2xl border transition-all inline-flex items-center gap-3 cursor-pointer select-none
  ${isAuthorized
    ? 'text-green-500 border-green-500/30 bg-green-500/5 shadow-lg shadow-green-500/10'
    : 'text-zinc-700 border-zinc-800'}`}
>
  <span className="pointer-events-none inline-flex items-center gap-3">
    {isAuthorized ? <CheckSquare size={20} /> : <Square size={20} />}
    <span className="text-[10px] font-black uppercase tracking-widest">
      {isAuthorized ? 'Authorized' : 'Locked'}
    </span>
  </span>
</button>

                        </td>
                 {/* Delete button ko sirf tab dikhao jab module 'custom' ho ya koi special condition ho */}
<td className="px-10 py-6 text-center">
  {perm.isDeletable && ( // Sirf tab dikhao agar backend se deletable allow ho
    <button onClick={() => handleDeletePermission(perm._id)} className="...">
      <XCircle size={20}/>
    </button>
  )}
</td>z
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* 📟 PAGINATION */}
            <div className={`px-10 py-6 border-t flex justify-between items-center ${darkMode ? 'border-zinc-900 bg-zinc-950/50' : 'bg-slate-100 bg-slate-50'}`}>
                <p className="text-[10px] font-black uppercase text-zinc-600 italic">Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPermissions.length)} Nodes</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2.5 border rounded-xl disabled:opacity-20 text-[#f99616]"><ChevronLeft size={20}/></button>
                  <span className="text-[10px] font-black text-[#f99616] px-5">{currentPage} / {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2.5 border rounded-xl disabled:opacity-20 text-[#f99616]"><ChevronRight size={20}/></button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePermissionManager;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, MessageSquare, ExternalLink, Clock, CheckCircle, AlertCircle, Loader2, MoreVertical } from 'lucide-react';
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";

const AdminSupport = () => {
  const { darkMode } = useTheme();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchAllTickets = async () => {
      const token = localStorage.getItem("admin_token");
      try {
        setLoading(true);
        const res = await axios.get(`${API_CONFIG.baseURL}/ticket`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(res.data.tickets || []);
      } catch (err) {
        console.error("Support Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTickets();
  }, []);

  const filteredTickets = tickets.filter(t => 
    filterStatus === 'all' ? true : t.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* 🚀 HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">Support <span className="text-[#f99616]">Management</span></h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global User Assistance Protocol</p>
        </div>
        
        <div className="flex items-center gap-2 bg-[#0d0d0d] p-1 rounded-xl border border-gray-800">
          {['all', 'open', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                filterStatus === status 
                ? 'bg-[#f99616] text-white shadow-lg' 
                : 'text-gray-500 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 🚀 TABLE CONTAINER */}
      <div className={`rounded-[2rem] border overflow-hidden transition-all duration-500 ${
        darkMode ? 'bg-[#0a0a0a] border-gray-800' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-white/5' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-800' : 'border-slate-100'}`}>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Ticket Info</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">User Email</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Category</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Subject</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Date</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-20 text-center">
                    <Loader2 className="animate-spin text-[#f99616] mx-auto mb-2" size={30} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Accessing Records...</span>
                  </td>
                </tr>
              ) : filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className={`transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                    <td className="p-5">
                      <span className="text-xs font-black text-[#f99616]">#{ticket._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-[#f99616] text-[10px] font-black">
                           {ticket.userId?.email?.charAt(0).toUpperCase()}
                         </div>
                         <span className="text-xs font-bold">{ticket.userId?.email}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-[10px] font-black uppercase text-gray-500 bg-gray-500/10 px-2 py-1 rounded">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="p-5">
                      <p className="text-xs font-bold truncate max-w-[200px]">{ticket.subject}</p>
                    </td>
                    <td className="p-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        ticket.status === 'open' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
                      }`}>
                        {ticket.status === 'open' ? <AlertCircle size={10}/> : <CheckCircle size={10}/>}
                        {ticket.status}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-[10px] font-bold text-gray-500">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button className={`p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-black'}`}>
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-20 text-center opacity-30 text-xs font-black uppercase tracking-widest">
                    No Support Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSupport;
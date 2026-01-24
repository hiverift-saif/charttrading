import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, MessageSquare, ExternalLink, Clock, 
  CheckCircle, AlertCircle, Loader2, ChevronLeft, 
  ChevronRight, User as UserIcon 
} from 'lucide-react';
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";

const AdminSupport = () => {
  const { darkMode } = useTheme();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔍 Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // 🔢 Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAllTickets = async () => {
      const token = localStorage.getItem("admin_token");
      try {
        setLoading(true);
        const res = await axios.get(`${API_CONFIG.baseURL}/ticket`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(res.data.tickets || []);
        setFilteredTickets(res.data.tickets || []);
      } catch (err) {
        console.error("Support Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTickets();
  }, []);

  // 🚀 Logic: Apply Filters & Search
  useEffect(() => {
    let result = tickets;

    if (searchTerm) {
      result = result.filter(t => 
        t.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subject?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter(t => t.status === filterStatus);
    }

    setFilteredTickets(result);
    setCurrentPage(1); // Reset page to 1 when filtering
  }, [searchTerm, filterStatus, tickets]);

  // 🔢 Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#f99616]" /></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter transition-colors">
            Support <span className="text-[#f99616]">Tickets</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">Global User Assistance Protocol</p>
        </div>
        <div className="bg-[#f99616]/10 px-4 py-1.5 rounded-xl border border-[#f99616]/20">
           <span className="text-[10px] font-black text-[#f99616] uppercase tracking-widest">
              {filteredTickets.length} Total Logs
           </span>
        </div>
      </div>

      {/* 🔍 FILTER BAR (Consistent Design) */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row gap-4 ${darkMode ? 'bg-[#0d0d0d] border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search by Email, ID or Subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-black border-zinc-800 text-white focus:border-[#f99616]' : 'bg-gray-50 border-gray-100 text-black focus:border-[#f99616]'}`}
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest outline-none border ${darkMode ? 'bg-black border-zinc-800 text-gray-400' : 'bg-gray-50 border-gray-100'}`}
          >
            <option value="all">All Tickets</option>
            <option value="open">Active (Open)</option>
            <option value="closed">Resolved (Closed)</option>
          </select>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-zinc-800 rounded-none opacity-50">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-[10px] font-black uppercase tracking-[3px]">No communication logs found</p>
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW: COMPACT CARDS */}
          <div className="grid grid-cols-1 gap-3 lg:hidden">
            {currentItems.map((ticket) => (
              <div key={ticket._id} className={`p-4 rounded-2xl border ${darkMode ? "bg-black border-zinc-800" : "bg-white border-gray-100 shadow-md"}`}>
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#f99616]">#{ticket._id.slice(-6).toUpperCase()}</span>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${ticket.status === 'open' ? 'text-green-500 bg-green-500/10' : 'text-gray-500 bg-gray-500/10'}`}>{ticket.status}</span>
                   </div>
                   <span className="text-[8px] font-bold text-gray-500">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-zinc-900 rounded-lg"><UserIcon size={14} className="text-[#f99616]" /></div>
                  <p className="text-[10px] font-bold truncate max-w-[200px]">{ticket.userId?.email}</p>
                </div>
                <div className="flex justify-between items-end border-t border-zinc-800/30 pt-3">
                   <div className="flex-1">
                      <p className="text-[11px] font-black uppercase italic truncate max-w-[180px]">{ticket.subject}</p>
                      <p className="text-[9px] text-gray-500 font-bold uppercase">{ticket.category}</p>
                   </div>
                   <button className="p-2 bg-[#f99616] text-black rounded-lg active:scale-90 transition-transform">
                      <ExternalLink size={14} />
                   </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: SHARP BORDER TABLE */}
          <div className={`hidden lg:block border ${darkMode ? 'border-zinc-800 bg-black' : 'border-gray-200 bg-white'} rounded-none overflow-hidden shadow-2xl`}>
            <table className="w-full text-left">
              <thead className={`${darkMode ? 'bg-zinc-900 text-gray-500' : 'bg-gray-50 text-gray-400'} border-b ${darkMode ? 'border-zinc-800' : 'border-gray-200'}`}>
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Ticket Identity</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Network User</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Classification</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Subject</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-zinc-900' : 'divide-gray-100'}`}>
                {currentItems.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-[#f99616]/5 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="text-xs font-black text-[#f99616]">#{ticket._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#f99616] text-[10px] font-black">
                          {ticket.userId?.email?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-bold opacity-80">{ticket.userId?.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[9px] font-black uppercase text-gray-500 bg-gray-500/10 px-2 py-1 rounded border border-gray-500/20 italic">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-bold truncate max-w-[200px] uppercase italic">{ticket.subject}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        ticket.status === 'open' ? 'text-green-500 bg-green-500/10 border border-green-500/20' : 'text-gray-500 bg-gray-500/10 border border-gray-500/20'
                      }`}>
                        {ticket.status === 'open' ? <AlertCircle size={10}/> : <CheckCircle size={10}/>}
                        {ticket.status}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button className={`p-2.5 rounded-xl border transition-all ${darkMode ? 'border-zinc-800 hover:bg-white/10 text-white' : 'border-gray-200 hover:bg-gray-100 text-black'}`}>
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔢 PAGINATION CONTROLS */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTickets.length)} of {filteredTickets.length} Entries
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                disabled={currentPage === 1} 
                className={`p-2 border rounded-xl transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-[#f99616] hover:border-[#f99616]'}`}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center px-4 font-black text-xs text-[#f99616]">
                {currentPage} / {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                disabled={currentPage === totalPages} 
                className={`p-2 border rounded-xl transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-[#f99616] hover:border-[#f99616]'}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSupport;
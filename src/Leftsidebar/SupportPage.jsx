import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MessageSquare, FileText, Send, Clock, CheckCircle2, 
  AlertCircle, ArrowLeft, Loader2, Calendar, ShieldQuestion, 
  Hash, Tag, ChevronRight, Activity
} from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';
import Swal from 'sweetalert2';

const SupportPage = ({ setActiveTab }) => {
  const { darkMode } = useTheme();
  const [activeTabLocal, setActiveTabLocal] = useState('list');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ subject: '', category: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userEmail = localStorage.getItem('user_email');
  const token = localStorage.getItem('access_token');
  const adminToken = localStorage.getItem('admin_token');

  // 🔐 Security Headers Logic
  const getAuthHeaders = () => {
    return { 
      'Authorization': `Bearer ${adminToken || token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_CONFIG.baseURL}/ticket`, {
        headers: getAuthHeaders()
      });

      const allTickets = res.data.tickets || [];
      
      // 🚀 Filter: Sirf current user ki emails waale tickets dikhana
      const myTickets = allTickets.filter(ticket => 
        ticket.userId?.email === userEmail
      );

      setTickets(myTickets);
    } catch (err) {
      console.error("Fetch Error:", err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTabLocal === 'list') fetchTickets();
  }, [activeTabLocal]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.category || !formData.description) {
      return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Fill all fields!', background: darkMode ? '#111' : '#fff', color: darkMode ? '#fff' : '#000' });
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_CONFIG.baseURL}/ticket`, formData, {
        headers: getAuthHeaders()
      });

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Signal Dispatched',
          text: `ID: ${res.data.ticketId}`,
          background: darkMode ? '#111' : '#fff',
          color: darkMode ? '#fff' : '#000',
          confirmButtonColor: '#f99616'
        });
        setFormData({ subject: '', category: '', description: '' });
        setActiveTabLocal('list'); 
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Error creating ticket.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`h-full w-full flex flex-col overflow-y-auto no-scrollbar p-3 md:p-6 font-sans transition-colors duration-500
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      {/* --- HEADER --- */}
      <div className={`flex items-center gap-4 mb-6 pb-4 border-b transition-colors ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
        <button onClick={() => setActiveTab('chart')} className={`p-2 rounded-lg border transition-all active:scale-95 group ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
          <ArrowLeft size={18} className="text-gray-400 group-hover:text-[#f99616]" />
        </button>
        <div>
          <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter italic">Help <span className="text-[#f99616]">Center</span></h2>
          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[3px]">Protocol Support Node</p>
        </div>
      </div>

      {/* --- TOP TABS --- */}
      <div className={`flex gap-6 border-b mb-6 sticky top-0 z-10 transition-colors ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}>
        <TabButton id="list" label="My Archives" icon={<MessageSquare size={16}/>} active={activeTabLocal} onClick={setActiveTabLocal} />
        <TabButton id="create" label="New Signal" icon={<FileText size={16}/>} active={activeTabLocal} onClick={setActiveTabLocal} />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 animate-in fade-in duration-500">
        {activeTabLocal === 'list' ? (
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#f99616]" size={40} /></div>
            ) : tickets.length > 0 ? (
              <div className={`border rounded-xl overflow-hidden ${darkMode ? 'border-zinc-800 bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'border-gray-200 bg-white shadow-xl'}`}>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className={`text-[10px] font-black uppercase text-gray-500 border-b ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-100'}`}>
                      <tr>
                        <th className="px-6 py-4 tracking-widest">Protocol ID</th>
                        <th className="px-6 py-4 tracking-widest">Subject</th>
                        <th className="px-6 py-4 tracking-widest">Category</th>
                        <th className="px-6 py-4 tracking-widest text-center">Status</th>
                        <th className="px-6 py-4 tracking-widest text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/50 dark:divide-gray-800/30">
                      {tickets.map((t) => (
                        <tr key={t._id} className="hover:bg-[#f99616]/5 transition-colors group">
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 italic">
                              <Hash size={12} className="text-[#f99616]"/> {t._id.slice(-6).toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs font-black uppercase italic tracking-tight truncate max-w-[200px]">{t.subject}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                              <Tag size={12} className="text-[#f99616]"/> {t.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter border ${t.status === 'open' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">{new Date(t.createdAt).toLocaleDateString()}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 opacity-20 italic text-center">
                <ShieldQuestion size={48} className="mb-4 text-gray-500 mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-[4px]">Synchronization: 0 Records Found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className={`p-6 md:p-8 rounded-[2rem] border ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-200 shadow-2xl"}`}>
              <form className="space-y-5" onSubmit={handleCreateTicket}>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest ml-1">Subject Protocol *</label>
                  <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Short summary" className={`w-full border rounded-xl p-3.5 outline-none focus:border-[#f99616] text-xs font-bold transition-all ${darkMode ? "bg-black border-gray-800 text-white placeholder:text-gray-700" : "bg-gray-50 border-gray-200"}`} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest ml-1">Category *</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className={`w-full border rounded-xl p-3.5 outline-none focus:border-[#f99616] text-xs font-bold transition-all ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200"}`}>
                    <option value="">Choose Priority</option>
                    <option value="withdrawal">Withdrawal Delay</option>
                    <option value="deposit">Deposit Issue</option>
                    <option value="account">Account Access</option>
                    <option value="technical">Technical Error</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest ml-1">Data Transmission *</label>
                  <textarea rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe issue..." className={`w-full border rounded-xl p-3.5 outline-none focus:border-[#f99616] text-xs font-bold resize-none transition-all ${darkMode ? "bg-black border-gray-800 text-white placeholder:text-gray-700" : "bg-gray-50 border-gray-200"}`}></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#f99616] text-black font-black text-[10px] uppercase tracking-[2.5px] py-4 rounded-xl shadow-xl active:scale-95 flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <><Send size={14} /> Send Signal</>}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <div className={`mt-8 p-4 rounded-2xl flex items-center gap-3 transition-all ${darkMode ? "bg-[#f99616]/5 border-[#f99616]/10 border" : "bg-orange-50 border-orange-100 border"}`}>
        <Activity size={16} className="text-[#f99616] animate-pulse" />
        <p className={`text-[9px] font-bold uppercase tracking-tight ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
          Terminal identity: <span className={darkMode ? "text-white" : "text-black"}>{localStorage.getItem('user_email') || "Trader"}</span>. Connected 24/7.
        </p>
      </div>
    </div>
  );
};

const TabButton = ({ id, label, icon, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`pb-3 text-[10px] md:text-xs font-black uppercase tracking-[2px] flex items-center gap-2 transition-all border-b-2
      ${active === id ? 'text-[#f99616] border-[#f99616]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
  >
    {icon} {label}
  </button>
);

export default SupportPage;
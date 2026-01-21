import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Plus, Tag, AlertCircle, Loader2, X, Send } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import API_CONFIG from '../config';

function AffiliateSupport() {
  const { darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'withdrawal', // Default value
  });

  const categories = [
    { id: 'withdrawal', label: 'Withdrawal Issue' },
    { id: 'deposit', label: 'Deposit Issue' },
    { id: 'technical', label: 'Technical Support' },
    { id: 'account', label: 'Account Access' },
    { id: 'general', label: 'General Inquiry' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 POST API: Submit New Ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('affiliate_token') || localStorage.getItem('access_token');
    
    if (loading || !token) {
      if (!token) Swal.fire({ icon: 'error', title: 'Unauthorized', text: 'Please login again.' });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/ticket`,
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          } 
        }
      );

      if (response.status === 201 || response.data.ticketId) {
        await Swal.fire({
          icon: 'success',
          title: 'Ticket Created!',
          text: `Your ticket ID is: ${response.data.ticketId}`,
          confirmButtonColor: '#f99616',
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000',
        });
        
        // Reset Form
        setFormData({ subject: '', description: '', category: 'withdrawal' });
        setShowModal(false);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#ef4444',
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* 🚀 MAIN INTERFACE */}
      <div className={`rounded-3xl border p-12 flex flex-col items-center justify-center text-center transition-all duration-500
        ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100 shadow-xl"}`}>
        
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
          <AlertCircle size={40} className="text-[#f99616]" />
        </div>

        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">
          Need <span className="text-[#f99616]">Assistance?</span>
        </h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mb-8 font-medium leading-relaxed">
          If you're facing any issues with withdrawals, deposits, or account access, our support team is ready to help 24/7.
        </p>

        <button 
          onClick={() => setShowModal(true)} 
          className="px-10 py-4 bg-[#f99616] hover:bg-[#e88914] text-black rounded-2xl font-black uppercase text-[11px] tracking-[2px] shadow-xl shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-3"
        >
          <Plus size={18} strokeWidth={3} /> Create New Support Ticket
        </button>
      </div>

      {/* 🚀 CREATE TICKET MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className={`border rounded-[2.5rem] p-8 md:p-10 w-full max-w-lg relative shadow-2xl animate-in zoom-in-95 duration-300
            ${darkMode ? "bg-[#0a0a0a] border-gray-800" : "bg-white border-gray-200"}`}>
            
            <button 
              className="absolute top-8 right-8 text-gray-500 hover:text-[#f99616] transition-colors" 
              onClick={() => setShowModal(false)}
            >
              <X size={28} />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-1">
                New Support <span className="text-[#f99616]">Ticket</span>
              </h3>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[2px]">Helpdesk Protocol</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Issue Category</label>
                <div className="relative">
                   <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full h-14 px-4 rounded-2xl border outline-none font-bold text-sm cursor-pointer appearance-none transition-all
                      ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]"}`}
                  >
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                  </select>
                  <Tag size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Brief Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Withdrawal pending for 24h"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full h-14 px-4 rounded-2xl border outline-none font-bold text-sm transition-all
                    ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]"}`}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Detailed Description</label>
                <textarea
                  name="description"
                  placeholder="Provide all necessary details (Transaction IDs, dates, etc.)"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className={`w-full p-5 rounded-2xl border h-40 resize-none outline-none font-bold text-sm transition-all
                    ${darkMode ? "bg-black border-gray-800 text-white focus:border-[#f99616]" : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]"}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-16 rounded-2xl font-black uppercase tracking-[2px] text-black transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 mt-4 ${
                  loading ? 'bg-gray-800 cursor-not-allowed text-gray-500' : 'bg-[#f99616] hover:bg-[#e88914] shadow-orange-500/20'
                }`}
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    <Send size={18} className="rotate-[-45deg]" /> Transmit Ticket
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AffiliateSupport;
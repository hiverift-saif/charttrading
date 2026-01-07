import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateSupport() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [activeTab, setActiveTab] = useState('requests');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const tabs = [
    { id: 'requests', label: 'Support Requests', content: 'Customer Support Requests' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.0.112:4000/api/ticketsubmit',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Ticket Created!',
          text: 'Your support ticket has been submitted successfully.',
          confirmButtonColor: '#f99616',
          background: darkMode ? '#0d0d0d' : '#fff', // 🚀 Theme aware alert
          color: darkMode ? '#fff' : '#000',
          backdrop: `rgba(0,0,0,0.8)`,
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setShowModal(false);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to submit.';
      await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMsg,
        confirmButtonColor: '#ef4444',
        background: darkMode ? '#0d0d0d' : '#fff',
        color: darkMode ? '#fff' : '#000',
        backdrop: `rgba(0,0,0,0.8)`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      
      {/* Tabs */}
      <div className={`flex flex-wrap gap-2 border rounded-xl p-1 transition-colors 
        ${darkMode ? "bg-black border-gray-800" : "bg-gray-100 border-gray-200"}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 min-w-[80px] px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-[#f99616] text-white shadow-lg'
                : darkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-slate-900 hover:bg-white'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`rounded-xl border p-6 shadow-lg transition-all duration-500
            ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}
          style={{ display: activeTab === tab.id ? 'block' : 'none' }}
        >
          <h4 className={`text-sm font-black uppercase tracking-widest mb-4 italic ${darkMode ? "text-white" : "text-slate-800"}`}>
            {tab.content}
          </h4>
          {tab.id === 'requests' ? (
            <>
              <div className="text-center py-8 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                No Data Found
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center h-12 px-6 py-2 w-full sm:w-auto rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#f99616] hover:bg-[#e88914] text-white transition-all active:scale-95 shadow-lg shadow-orange-500/10"
              >
                Create New Support Ticket
              </button>
            </>
          ) : null}
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className={`border rounded-2xl p-6 md:p-8 w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200 transition-colors
            ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
            
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-[#f99616] transition-colors"
              onClick={() => setShowModal(false)}
              disabled={loading}
            >
              <X size={24} />
            </button>

            <h3 className={`text-xl font-black uppercase italic tracking-tighter mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Create Support <span className="text-[#f99616]">Ticket</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name', type: 'text', placeholder: 'Your Name' },
                { name: 'email', type: 'email', placeholder: 'Your Email' },
                { name: 'phone', type: 'number', placeholder: 'Your Phone Number' }
              ].map((input) => (
                <input
                  key={input.name}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={`w-full h-12 px-4 rounded-xl border outline-none transition-all disabled:opacity-50 font-bold text-sm
                    ${darkMode 
                      ? "bg-black border-gray-800 text-white focus:border-[#f99616]" 
                      : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]"}`}
                />
              ))}
              
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border h-32 resize-none outline-none transition-all disabled:opacity-50 font-bold text-sm
                  ${darkMode 
                    ? "bg-black border-gray-800 text-white focus:border-[#f99616]" 
                    : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]"}`}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-white transition-all flex items-center justify-center shadow-lg active:scale-95 ${
                  loading
                    ? 'bg-gray-800 cursor-not-allowed text-gray-500'
                    : 'bg-[#f99616] hover:bg-[#e88914] shadow-orange-500/10'
                }`}
              >
                {loading ? 'Processing...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const X = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export default AffiliateSupport;
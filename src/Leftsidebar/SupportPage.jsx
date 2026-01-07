import React, { useState } from 'react';
import { MessageSquare, FileText, Send, Clock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

const SupportPage = ({ setActiveTab }) => {
  const { darkMode } = useTheme(); // 🚀 Theme state
  const [activeTab, setActiveTabLocal] = useState('list');

  return (
    <div className={`h-full w-full flex flex-col overflow-y-auto custom-scrollbar p-3 md:p-6 font-sans transition-colors duration-500
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      {/* --- HEADER --- */}
      <div className={`flex items-center gap-3 md:gap-4 mb-6 md:mb-8 pb-4 border-b transition-colors
        ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
        <button 
          onClick={() => setActiveTab('chart')} 
          className={`p-2 rounded-lg border transition-all active:scale-95 group
            ${darkMode ? "bg-[#1b1918] border-gray-800 hover:border-[#f99616]" : "bg-gray-50 border-gray-200 hover:border-[#f99616]"}`}
        >
          <ArrowLeft size={18} className="text-gray-400 group-hover:text-[#f99616]" />
        </button>
        <div>
          <h2 className={`text-lg md:text-xl font-black uppercase tracking-tighter italic leading-none transition-colors
            ${darkMode ? "text-white" : "text-black"}`}>
            Help <span className="text-[#f99616]">Center</span>
          </h2>
          <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-[8px] font-bold uppercase tracking-widest mt-1`}>Binovera Client Support</p>
        </div>
      </div>

      {/* --- TOP TABS --- */}
      <div className={`flex gap-4 md:gap-8 border-b mb-6 md:mb-8 sticky top-0 z-10 transition-colors
        ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}>
        <button 
          onClick={() => setActiveTabLocal('list')}
          className={`pb-3 text-[11px] md:text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all 
            ${activeTab === 'list' 
              ? (darkMode ? 'text-white border-[#f99616]' : 'text-black border-[#f99616]') + ' border-b-2' 
              : 'text-gray-500 hover:text-gray-300'}`}
        >
          <MessageSquare size={16} className={activeTab === 'list' ? 'text-[#f99616]' : ''} /> 
          <span className="whitespace-nowrap">My requests</span>
        </button>
        <button 
          onClick={() => setActiveTabLocal('create')}
          className={`pb-3 text-[11px] md:text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all 
            ${activeTab === 'create' 
              ? (darkMode ? 'text-white border-[#f99616]' : 'text-black border-[#f99616]') + ' border-b-2' 
              : 'text-gray-500 hover:text-gray-300'}`}
        >
          <FileText size={16} className={activeTab === 'create' ? 'text-[#f99616]' : ''} /> 
          <span className="whitespace-nowrap">Create request</span>
        </button>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 animate-in fade-in duration-300">
        {activeTab === 'list' ? (
          <div className="space-y-4 md:space-y-6">
            <div className={`p-4 md:p-6 rounded-xl border shadow-xl transition-colors
              ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
              <h4 className={`font-black uppercase tracking-widest mb-4 text-[10px] md:text-xs flex items-center gap-2
                ${darkMode ? "text-white" : "text-slate-800"}`}>
                <Clock size={14} className="text-[#f99616]" /> Open Requests
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] md:text-xs">
                  <thead className={`uppercase font-black tracking-widest transition-colors
                    ${darkMode ? "bg-black text-gray-600" : "bg-white text-gray-400"}`}>
                    <tr>
                      <th className="p-2 md:p-4">Ticket ID</th>
                      <th className="p-2 md:p-4">Date</th>
                      <th className="p-2 md:p-4 hidden md:table-cell">Category</th>
                      <th className="p-2 md:p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                    <tr className="text-gray-500">
                      <td colSpan="4" className="p-10 text-center italic font-bold uppercase tracking-widest opacity-40 text-[9px]">No Data Found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`p-4 md:p-6 rounded-xl border shadow-xl transition-colors
              ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
              <h4 className={`font-black uppercase tracking-widest mb-4 text-[10px] md:text-xs flex items-center gap-2
                ${darkMode ? "text-white" : "text-slate-800"}`}>
                <CheckCircle2 size={14} className="text-green-500" /> Closed Requests
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] md:text-xs">
                  <thead className={`uppercase font-black tracking-widest transition-colors
                    ${darkMode ? "bg-black text-gray-600" : "bg-white text-gray-400"}`}>
                    <tr>
                      <th className="p-2 md:p-4">Ticket ID</th>
                      <th className="p-2 md:p-4">Date</th>
                      <th className="p-2 md:p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-100"}`}>
                    <tr className="text-gray-500">
                      <td colSpan="3" className="p-10 text-center italic font-bold uppercase tracking-widest opacity-40 text-[9px]">No Data Found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl space-y-4 md:space-y-6 mx-auto">
            <div className={`p-5 md:p-8 rounded-2xl border shadow-2xl transition-colors
              ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"}`}>
              <h4 className={`font-black mb-2 text-sm md:text-base uppercase tracking-tighter italic ${darkMode ? "text-white" : "text-black"}`}>Submit New Request</h4>
              <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-[9px] mb-6 md:mb-8 uppercase tracking-[2px] leading-relaxed font-bold`}>
                Fields marked <span className="text-[#f99616]">*</span> are required.
              </p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-[2px] ml-1">Email Address</label>
                  <input 
                    type="email" 
                    disabled 
                    value="saif755055@gmail.com" 
                    className={`w-full border rounded-lg p-3 cursor-not-allowed outline-none text-xs font-bold transition-colors
                      ${darkMode ? "bg-black border-gray-800 text-gray-600" : "bg-gray-100 border-gray-200 text-gray-400"}`} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-[2px] ml-1">Category *</label>
                  <select className={`w-full border rounded-lg p-3 outline-none focus:border-[#f99616] text-xs font-bold cursor-pointer transition-colors
                    ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-black"}`}>
                    <option value="">Select category</option>
                    <option value="finance">Finance / Payments</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Verification</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-[2px] ml-1">Message *</label>
                  <textarea 
                    rows="5" 
                    placeholder="Enter details of your request..." 
                    className={`w-full border rounded-lg p-3 outline-none focus:border-[#f99616] text-xs font-bold resize-none transition-colors
                      ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-black"}`}
                  ></textarea>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#f99616] hover:bg-[#e88914] text-white font-black text-[10px] md:text-xs uppercase tracking-[2px] py-3.5 md:py-4 px-10 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-600/20">
                    <Send size={14} /> Submit Request
                  </button>
                </div>
              </form>
            </div>

            <div className={`border p-4 rounded-xl flex items-start gap-3 transition-colors
              ${darkMode ? "bg-[#f99616]/5 border-[#f99616]/20" : "bg-orange-50 border-orange-100"}`}>
              <AlertCircle size={18} className="text-[#f99616] flex-shrink-0" />
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-[9px] md:text-[10px] leading-relaxed font-bold uppercase tracking-tight`}>
                Our support team is online 24/7. Average response time is <span className={darkMode ? "text-white" : "text-slate-900"}>1-2 hours</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
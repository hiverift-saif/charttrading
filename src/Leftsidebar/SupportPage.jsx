import React, { useState } from 'react';
import { MessageSquare, FileText, Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const SupportPage = () => {
  // Tab state: 'list' for My Requests, 'create' for Submit Request
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="h-full w-full bg-[#131722] flex flex-col overflow-y-auto custom-scrollbar p-6">
      
      {/* --- TOP TABS (Aapke HTML ke icons ke sath) --- */}
      <div className="flex gap-8 border-b border-gray-800 mb-8 sticky top-0 bg-[#131722] z-10">
        <button 
          onClick={() => setActiveTab('list')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'list' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500 hover:text-white'}`}
        >
          <MessageSquare size={18} /> My requests
        </button>
        <button 
          onClick={() => setActiveTab('create')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'create' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500 hover:text-white'}`}
        >
          <FileText size={18} /> Create request
        </button>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 animate-in fade-in duration-300">
        {activeTab === 'list' ? (
          /* --- MY REQUESTS TAB --- */
          <div className="space-y-6">
            {/* Open Requests */}
            <div className="bg-[#1f1d1c] p-6 rounded-xl border border-gray-800">
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <Clock size={16} className="text-yellow-500" /> My Open Support Requests
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#131722] text-gray-500 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Ticket ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr className="text-gray-500">
                      <td colSpan="5" className="p-10 text-center">No Data Found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Closed Requests */}
            <div className="bg-[#1f1d1c] p-6 rounded-xl border border-gray-800">
              <h4 className="text-white font-bold mb-4 text-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> My Close Support Requests
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#131722] text-gray-500 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Ticket ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr className="text-gray-500">
                      <td colSpan="5" className="p-10 text-center">No Data Found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* --- CREATE REQUEST TAB (Form Section) --- */
          <div className="max-w-4xl space-y-6">
            <div className="bg-[#1f1d1c] p-8 rounded-xl border border-gray-800">
              <h4 className="text-white font-bold mb-2">Submit a New Support Request</h4>
              <p className="text-gray-500 text-xs mb-8">
                Complete the provided forms to submit your request. Fields marked with * are required.
              </p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                {/* Email (Disabled as per HTML) */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase">Your email address *</label>
                  <input 
                    type="email" 
                    disabled 
                    value="saif755055@gmail.com" 
                    className="w-full bg-[#131722] border border-gray-700 rounded-lg p-3 text-gray-500 cursor-not-allowed outline-none" 
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase">Category *</label>
                  <select className="w-full bg-[#131722] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-colors">
                    <option value="">Select category</option>
                    <option value="finance">Finance</option>
                    <option value="technical">Technical Issue</option>
                    <option value="verification">Verification</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase">Your message *</label>
                  <textarea 
                    rows="5" 
                    placeholder="Enter your message" 
                    className="w-full bg-[#131722] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-blue-500 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Attachment */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase">Attachment</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      className="w-full bg-[#131722] border border-gray-700 rounded-lg p-3 text-gray-400 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600" 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 pt-4">
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-blue-900/20">
                    <Send size={16} /> Submit Request
                  </button>
                </div>
              </form>
            </div>

            {/* Support Notice */}
            <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-500 flex-shrink-0" />
              <p className="text-[11px] text-blue-400 leading-relaxed">
                Our support team is available 24/7. Average response time for new tickets is 1-2 hours. Please provide as much detail as possible, including transaction IDs or screenshots, to help us assist you faster.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliatePayments() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [activeTab, setActiveTab] = useState('request');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    crypto: 'USDT', // Default to USDT as per your select options
    amount: '',
    address: '',
    otp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount' && value && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { amount, address, otp } = formData;
    if (!amount || !address || !otp) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill all fields including OTP.',
        confirmButtonColor: '#f59e0b',
        background: darkMode ? '#1a1a1a' : '#fff', // 🚀 Theme aware alert
        color: darkMode ? '#fff' : '#000',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://192.168.0.112:3000/api/v1/wallet/withdraw',
        {
          crypto: formData.crypto,
          amount: parseInt(formData.amount),
          address: formData.address,
          otp: formData.otp,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.statusCode === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Withdrawal Initiated!',
          html: `
            <div class="text-left text-sm" style="color: ${darkMode ? '#fff' : '#333'}">
              <p><strong>Amount:</strong> ${formData.amount} ${formData.crypto}</p>
              <p><strong>Address:</strong> ${formData.address}</p>
              <p><strong>TX ID:</strong> <span class="font-mono">${response.data.result.id}</span></p>
              <p><strong>Status:</strong> <span class="text-yellow-500 font-bold">Pending</span></p>
            </div>
          `,
          confirmButtonColor: '#10b981',
          background: darkMode ? '#1a1a1a' : '#fff',
          color: darkMode ? '#fff' : '#000',
          backdrop: 'rgba(0,0,0,0.8)',
        });

        setFormData({ crypto: 'USDT', amount: '', address: '', otp: '' });
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Withdrawal failed. Please try again.';

      await Swal.fire({
        icon: 'error',
        title: 'Withdrawal Failed',
        text: msg,
        confirmButtonColor: '#ef4444',
        background: darkMode ? '#1a1a1a' : '#fff',
        color: darkMode ? '#fff' : '#000',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      <div className="flex flex-col gap-2">
        {/* Tabs */}
        <div className={`flex flex-wrap gap-2 border rounded-xl p-1 transition-colors ${darkMode ? "bg-black border-gray-700" : "bg-gray-100 border-gray-200"}`}>
          {['request', 'history'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 min-w-[100px] px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === tab
                  ? (darkMode ? 'bg-gray-700 text-white shadow-lg' : 'bg-white text-slate-900 shadow-sm')
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'request' ? 'Request Withdrawal' : 'History'}
            </button>
          ))}
        </div>

        {/* Request Tab */}
        {activeTab === 'request' && (
          <div className={`rounded-xl border p-6 space-y-6 transition-colors shadow-2xl ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
            <div>
              <h4 className={`text-lg font-black uppercase italic ${darkMode ? "text-white" : "text-slate-900"}`}>Request a Withdrawal</h4>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm mt-1 font-medium`}>
                Withdraw your earnings in USDT (TRC-20).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Crypto Type */}
              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Crypto Type</label>
                <select
                  name="crypto"
                  value={formData.crypto}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 font-bold transition-all
                    ${darkMode ? "bg-black border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black"}`}
                >
                  <option value="USDT">USDT (TRC-20)</option>
                </select>
              </div>

              {/* Amount */}
              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`h-11 w-full rounded-lg border pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 font-bold transition-all
                      ${darkMode ? "bg-black border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black"}`}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-bold">Max: $0.00 (Pending API Sync)</p>
              </div>

              {/* Wallet Address */}
              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Wallet Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 font-bold transition-all
                    ${darkMode ? "bg-black border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black"}`}
                  placeholder="Enter TRC-20 address"
                  required
                />
              </div>

              {/* OTP */}
              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email OTP Verification</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength="6"
                  className={`h-12 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 text-center font-mono text-xl tracking-[0.5em] transition-all
                    ${darkMode ? "bg-black border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-black"}`}
                  placeholder="000000"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.amount || !formData.address || !formData.otp}
                className={`w-full h-12 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center shadow-lg
                  ${loading || !formData.amount || !formData.address || !formData.otp
                    ? (darkMode ? 'bg-gray-800 text-gray-600' : 'bg-gray-200 text-gray-400') + ' cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 hover:scale-[1.01] active:scale-95 text-white shadow-blue-500/20'
                  }`}
              >
                {loading ? 'Processing Transaction...' : 'Submit Withdrawal Request'}
              </button>
            </form>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className={`rounded-xl border p-8 transition-colors shadow-2xl ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
            <h4 className={`text-lg font-black uppercase italic mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Withdrawal History
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className={`border-b text-gray-500 font-bold uppercase tracking-widest text-left ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                    <th className="p-3">No.</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Crypto</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">TX ID</th>
                  </tr>
                </thead>
                <tbody className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  <tr className={`border-b text-center italic transition-colors ${darkMode ? "border-gray-800" : "border-gray-50"}`}>
                    <td colSpan="6" className="p-10 font-bold uppercase tracking-widest opacity-30">
                      No withdrawal history found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AffiliatePayments;
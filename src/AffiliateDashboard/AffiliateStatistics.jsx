import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Logic

function AffiliateStatistics() {
  const { darkMode } = useTheme(); // 🚀 Hook for theme check
  const [activeTab, setActiveTab] = useState('day');

  return (
    <div className={`space-y-6 transition-colors duration-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
      <div className="flex flex-col gap-2">
        
        {/* Tabs Switcher */}
        <div className={`flex flex-wrap gap-2 border rounded-xl p-1 transition-colors 
          ${darkMode ? "bg-black border-gray-700" : "bg-gray-100 border-gray-200"}`}>
          {['day', 'links', 'trader', 'performance'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 min-w-[80px] px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === tab
                  ? (darkMode ? 'bg-gray-800 text-white shadow-lg' : 'bg-white text-slate-900 shadow-sm')
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content Helper Component */}
        <div className={`rounded-xl border shadow-2xl transition-all duration-500 p-6
          ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}>
          
          <h4 className={`text-lg font-black uppercase italic mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}>
            {activeTab === 'day' && "Statistics by Day"}
            {activeTab === 'links' && "Links Statistics"}
            {activeTab === 'trader' && "Trader Statistics"}
            {activeTab === 'performance' && "Performance Overview"}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={`border-b transition-colors ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                <tr>
                  {/* Headers Logic */}
                  {activeTab === 'day' && ['Date', 'Clicks', 'Registrations', 'Deposits', 'Deposits Sum', 'Commission', 'Withdrawals', 'Traders', 'Turnover All'].map(h => <th key={h} className="p-3 text-left text-gray-500 font-bold uppercase text-[10px] tracking-widest">{h}</th>)}
                  {activeTab === 'links' && ['Link', 'Clicks', 'Registrations', 'Deposits', 'Commission'].map(h => <th key={h} className="p-3 text-left text-gray-500 font-bold uppercase text-[10px] tracking-widest">{h}</th>)}
                  {activeTab === 'trader' && ['Trader ID', 'Name', 'Deposits', 'Trades', 'Profit', 'Commission'].map(h => <th key={h} className="p-3 text-left text-gray-500 font-bold uppercase text-[10px] tracking-widest">{h}</th>)}
                  {activeTab === 'performance' && ['Metric', 'Value'].map(h => <th key={h} className="p-3 text-left text-gray-500 font-bold uppercase text-[10px] tracking-widest">{h}</th>)}
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-50"}`}>
                
                {/* Day Tab Content */}
                {activeTab === 'day' && [
                  { d: '2025-10-13', c: 12, r: 3, dep: 2, sum: '$150.00', com: '$12.50', w: '$0.00', t: 1, to: '$540.00' },
                  { d: '2025-10-12', c: 20, r: 4, dep: 1, sum: '$50.00', com: '$4.00', w: '$15.00', t: 2, to: '$300.00' }
                ].map((row, i) => (
                  <tr key={i} className={`transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}>
                    <td className="p-3 font-medium">{row.d}</td>
                    <td className="p-3">{row.c}</td>
                    <td className="p-3">{row.r}</td>
                    <td className="p-3">{row.dep}</td>
                    <td className="p-3 font-bold text-green-500">{row.sum}</td>
                    <td className="p-3 text-[#f99616] font-bold">{row.com}</td>
                    <td className="p-3 text-red-500">{row.w}</td>
                    <td className="p-3">{row.t}</td>
                    <td className="p-3">{row.to}</td>
                  </tr>
                ))}

                {/* Links Tab Content */}
                {activeTab === 'links' && [
                  { l: 'https://abc.com/ref123', c: 30, r: 5, d: 2, com: '$20' },
                  { l: 'https://abc.com/ref456', c: 18, r: 3, d: 1, com: '$9' }
                ].map((row, i) => (
                  <tr key={i} className={`transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}>
                    <td className="p-3 text-blue-500 font-medium underline cursor-pointer">{row.l}</td>
                    <td className="p-3">{row.c}</td>
                    <td className="p-3">{row.r}</td>
                    <td className="p-3">{row.d}</td>
                    <td className="p-3 text-[#f99616] font-bold">{row.com}</td>
                  </tr>
                ))}

                {/* Trader Tab Content */}
                {activeTab === 'trader' && [
                  { id: 'TRD2452', n: 'Rahul Verma', d: '$120', t: 42, p: '$35', com: '$3.50' },
                  { id: 'TRD9821', n: 'Amit Kumar', d: '$80', t: 28, p: '$12', com: '$1.20' }
                ].map((row, i) => (
                  <tr key={i} className={`transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}>
                    <td className="p-3 font-mono font-bold">{row.id}</td>
                    <td className="p-3">{row.n}</td>
                    <td className="p-3 font-bold">{row.d}</td>
                    <td className="p-3">{row.t}</td>
                    <td className="p-3 text-green-500">+{row.p}</td>
                    <td className="p-3 text-[#f99616] font-bold">{row.com}</td>
                  </tr>
                ))}

                {/* Performance Tab Content */}
                {activeTab === 'performance' && [
                  { m: 'Total Clicks', v: '320' },
                  { m: 'Total Registrations', v: '55' },
                  { m: 'Total Deposits', v: '$780' },
                  { m: 'Total Commission', v: '$74.40' }
                ].map((row, i) => (
                  <tr key={i} className={`transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-50"}`}>
                    <td className="p-3 font-medium uppercase text-[11px] tracking-widest text-gray-500">{row.m}</td>
                    <td className={`p-3 font-black text-lg ${row.m.includes('Commission') ? 'text-[#f99616]' : (darkMode ? 'text-white' : 'text-slate-900')}`}>{row.v}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AffiliateStatistics;
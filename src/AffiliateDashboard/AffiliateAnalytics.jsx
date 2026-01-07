import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, MousePointer, DollarSign, Percent, Loader2 } from "lucide-react";
import BASE from "../config";
import { useTheme } from "../context/ThemeContext"; // 🚀 Bas ye ek line add ki logic ke liye

export default function AffiliateAnalytics() {
  const { darkMode } = useTheme(); // 🚀 DarkMode check karne ke liye
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data (AAPKA ORIGINAL LOGIC)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE.BASE_URL}/analytics`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        console.log("API DATA 👉", response.data);
        setRawData(response.data.result || []);
      } catch (err) {
        setError("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Summary (AAPKA ORIGINAL LOGIC)
  const summary = useMemo(() => {
    let clicks = 0,
      signups = 0,
      earnings = 0;

    rawData.forEach((item) => {
      clicks += item.clicks;
      signups += item.signups;
      earnings += item.earnings;
    });

    const conversionRate =
      clicks > 0 ? ((signups / clicks) * 100).toFixed(1) : 0;

    return {
      clicks,
      signups,
      conversionRate,
      earnings: earnings.toFixed(2),
    };
  }, [rawData]);

  // CHART DATA (AAPKA ORIGINAL LOGIC)
  const chartData = useMemo(() => {
    return rawData
      .map((item) => ({
        date: new Date(item.date).toISOString().split("T")[0],
        clicks: item.clicks,
        signups: item.signups,
        earnings: item.earnings,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [rawData]);

  // Loading UI (Design Same)
  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#f99616]" />
          <span className={`ml-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Loading...</span>
        </div>
    );
  }

  // Error UI (Design Same)
  if (error) {
    return (
        <div className={`p-6 ${darkMode ? "text-red-400" : "text-red-600"}`}>{error}</div>
    );
  }

  return (
      <div className="space-y-8">
        {/* Summary Cards (AAPKA DESIGN + THEME LOGIC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-xl border flex items-center gap-4 transition-colors ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
            <MousePointer className="text-[#f99616] w-8 h-8" />
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>Total Clicks</p>
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-semibold`}>
                {summary.clicks.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className={`p-5 rounded-xl border flex items-center gap-4 transition-colors ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
            <Users className="text-[#f99616] w-8 h-8" />
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>Total Signups</p>
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-semibold`}>
                {summary.signups.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className={`p-5 rounded-xl border flex items-center gap-4 transition-colors ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
            <Percent className="text-[#f99616] w-8 h-8" />
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>Conversion Rate</p>
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-semibold`}>
                {summary.conversionRate}%
              </h3>
            </div>
          </div>

          <div className={`p-5 rounded-xl border flex items-center gap-4 transition-colors ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
            <DollarSign className="text-[#f99616] w-8 h-8" />
            <div>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>Total Earnings</p>
              <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl font-semibold`}>
                ${summary.earnings}
              </h3>
            </div>
          </div>
        </div>

        {/* Chart (AAPKA DESIGN + THEME LOGIC) */}
        <div className={`rounded-xl border p-6 transition-colors ${darkMode ? "border-gray-800 bg-black" : "border-gray-200 bg-white shadow-sm"}`}>
          <h3 className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold mb-4`}>
            Performance Overview
          </h3>
          {chartData.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#2d2d2d" : "#e5e7eb"} />
                <XAxis dataKey="date" stroke={darkMode ? "#9ca3af" : "#64748b"} />
                <YAxis stroke={darkMode ? "#9ca3af" : "#64748b"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    color: darkMode ? "white" : "black",
                  }}
                />
                <Line type="monotone" dataKey="clicks" stroke="#f99616" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="signups" stroke={darkMode ? "#ffffff" : "#3b82f6"} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="earnings" stroke="#f99616" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          )}

          <div className="text-gray-400 text-sm mt-2 flex gap-4">
            <span className="text-[#f99616]">● Clicks</span>
            <span className={darkMode ? "text-white" : "text-blue-500"}>● Signups</span>
            <span className="text-[#f99616]">● Earnings</span>
          </div>
        </div>

        {/* Table (AAPKA DESIGN + THEME LOGIC) */}
        <div className={`rounded-xl border overflow-x-auto p-6 transition-colors ${darkMode ? "border-gray-800 bg-black" : "border-gray-200 bg-white shadow-sm"}`}>
          <h3 className={`${darkMode ? "text-white" : "text-black"} text-lg font-semibold mb-4`}>
            Earnings Breakdown
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-gray-400 ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Users Referred</th>
                <th className="text-left p-2">Commission</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody className={darkMode ? "text-gray-300" : "text-gray-700"}>
              {rawData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No earnings data available
                  </td>
                </tr>
              ) : (
                rawData
                  .filter((item) => item.earnings > 0)
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item, i) => {
                    const date = new Date(item.date).toLocaleDateString("en", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    const status = item.earnings >= 50 ? "Paid" : "Pending";

                    return (
                      <tr key={i} className={`border-b transition-colors ${darkMode ? "border-gray-800 hover:bg-gray-800/50" : "border-gray-100 hover:bg-gray-50"}`}>
                        <td className="p-2">{date}</td>
                        <td className="p-2">{item.signups}</td>
                        <td className="p-2">${item.earnings.toFixed(2)}</td>
                        <td className={`p-2 font-medium ${status === "Paid" ? "text-green-500" : "text-[#f99616]"}`}>
                          {status}
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
}
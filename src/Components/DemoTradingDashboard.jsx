import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

export default function DemoTradingDashboard() {
  const { darkMode } = useTheme();
  const [investment, setInvestment] = useState(null);
  const [tradeTime, setTradeTime] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const assetRef = useRef(null);
  const timeRef = useRef(null);
  const investmentRef = useRef(null);
  const tradeRef = useRef(null);
  const balanceRef = useRef(null);
  const guideRef = useRef(null);

  const assets = [
    { name: "EUR/USD OTC", percent: "92%" },
    { name: "GBP/USD", percent: "88%" },
    { name: "USD/JPY", percent: "85%" },
    { name: "BTC/USD", percent: "95%" },
    { name: "ETH/USD", percent: "90%" },
    { name: "Gold", percent: "87%" },
    { name: "Silver", percent: "83%" },
    { name: "Oil", percent: "89%" }
  ];

  const guideSteps = [
    "Welcome! Let’s start your demo.",
    "Wallet balance is $1000.00.",
    "Select an asset to trade.",
    "Choose the trade time.",
    "Set your investment amount.",
    "Payout Information + Continue.",
    "Demo completed!"
  ];

  // 🚀 HIGH-PRECISION AUTO SCROLL LOGIC
  useEffect(() => {
    // Array matching guideSteps index to DOM refs
    const refs = [guideRef, balanceRef, assetRef, timeRef, investmentRef, tradeRef, guideRef];
    
    if (refs[step] && refs[step].current) {
      // 100ms delay for mobile browser rendering sync
      const timer = setTimeout(() => {
        refs[step].current.scrollIntoView({ 
          behavior: "smooth", 
          block: "center", // 🚀 Element ko screen ke center mein layega
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const selectAsset = (asset) => {
    setSelectedAsset(asset);
    setIsOpen(false);
    // 🚀 Asset select karte hi agla step trigger
    setTimeout(() => setStep(3), 500); 
  };

  const navigate = useNavigate();

  const nextStep = () => {
    if (step === 2 && !selectedAsset) return;
    if (step === 3 && !tradeTime) return;
    if (step === 4 && !investment) return;

    if (step < guideSteps.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/trading");
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // Chart Data & Options
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [
      {
        label: "Price",
        data: Array.from({ length: 50 }, () => Math.random() * 10 + 1),
        borderColor: "#f99616",
        backgroundColor: "rgba(249, 150, 22, 0.2)",
        fill: true,
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  });

  const [chartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { color: "rgba(128,128,128,0.1)" }, ticks: { display: false } },
      y: { grid: { color: "rgba(128,128,128,0.1)" }, ticks: { color: "#9CA3AF" } },
    },
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, "rgba(249, 150, 22, 0.4)");
    gradient.addColorStop(1, "rgba(249, 150, 22, 0)");
    setChartData((prev) => ({
      ...prev,
      datasets: prev.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: gradient,
      })),
    }));
  }, [darkMode]);

  // Styling for active highlight
  const activeRing = "ring-4 ring-[#f99616] ring-offset-4 ring-offset-black shadow-[0_0_20px_rgba(249,150,22,0.5)] transition-all duration-500";

  return (
    <div className={`${darkMode ? "bg-black" : "bg-gray-100"} min-h-screen p-2 md:p-4 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto space-y-6 pb-32">
        
        {/* Header */}
        <div className={`flex justify-between items-center p-3 md:p-4 rounded-xl border ${darkMode ? "bg-[#0d0d0d] border-gray-800 shadow-2xl" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className={`w-28 md:w-44 h-auto object-contain ${darkMode ? "" : "brightness-0"}`} />
          </div>
          <div
            ref={balanceRef}
            className={`px-4 py-2 rounded-lg text-[#f99616] font-black text-lg transition-all ${step === 1 ? activeRing : ""}`}
          >
            $1000.00
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            
            {/* Asset Selector */}
            <div ref={assetRef} className={`relative w-full transition-all ${step === 2 ? activeRing : ""}`}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full md:w-auto px-6 py-2.5 rounded-lg flex items-center justify-between gap-3 font-bold border transition-all ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-black"}`}
              >
                {selectedAsset || "Select Asset"}
                <ChevronDown size={18} />
              </button>
              {isOpen && (
                <div className={`absolute top-14 left-0 rounded-xl border shadow-2xl max-h-64 overflow-y-auto w-full md:w-64 z-[100] ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"}`}>
                  {assets.map((asset, idx) => (
                    <button key={idx} onClick={() => selectAsset(asset.name)} className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800 hover:bg-[#f99616] hover:text-black transition-colors text-xs font-bold uppercase">
                      {asset.name} <span className="font-black">{asset.percent}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chart Container */}
            <div className={`bg-black p-2 md:p-4 rounded-xl border ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
              <div className="w-full h-[250px] md:h-[400px]">
                <Line ref={chartRef} data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Demo Guide Control Card */}
            <div ref={guideRef} className={`p-5 rounded-2xl border transition-all ${darkMode ? "bg-zinc-900 border-gray-800 shadow-2xl" : "bg-white border-gray-200 shadow-lg"} ${step === 0 || step === 6 ? activeRing : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#f99616] animate-pulse" />
                <h3 className="font-black uppercase tracking-widest text-[10px] text-[#f99616]">Interactive Tutorial</h3>
              </div>
              <p className="text-sm md:text-base font-bold mb-6 leading-snug">{guideSteps[step]}</p>
              
              <div className="flex justify-between items-center gap-4">
                <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 bg-gray-600 text-white rounded-xl font-black text-[10px] tracking-widest disabled:opacity-30">BACK</button>
                <div className="flex gap-1.5">
                  {guideSteps.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === step ? "bg-[#f99616] scale-125" : "bg-gray-600"}`} />
                  ))}
                </div>
                <button onClick={nextStep} className="px-5 py-2.5 bg-[#f99616] text-black rounded-xl font-black text-[10px] tracking-widest hover:bg-[#ffae34] transition-all">
                  {step === guideSteps.length - 1 ? "FINISH" : "CONTINUE"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Control Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Time Step */}
            <div ref={timeRef} className={`p-4 rounded-2xl border transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"} ${step === 3 ? activeRing : ""}`}>
              <label className="text-gray-500 text-[10px] font-black uppercase mb-3 block tracking-widest">Select Duration</label>
              <div className="grid grid-cols-2 gap-2">
                {[30, 60, 120, 300].map(t => (
                  <button key={t} onClick={() => {setTradeTime(t); if(step===3) setTimeout(()=>setStep(4), 500);}} className={`py-3 rounded-xl text-xs font-black border transition-all ${tradeTime === t ? "bg-[#f99616] border-[#f99616] text-white" : "border-gray-800 text-gray-400 hover:border-gray-600"}`}>{t}s</button>
                ))}
              </div>
            </div>

            {/* Investment Step */}
            <div ref={investmentRef} className={`p-4 rounded-2xl border transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"} ${step === 4 ? activeRing : ""}`}>
              <label className="text-gray-500 text-[10px] font-black uppercase mb-3 block tracking-widest">Investment Amount</label>
              <div className="grid grid-cols-2 gap-2">
                {["50", "100", "250", "500"].map(a => (
                  <button key={a} onClick={() => {setInvestment(a); if(step===4) setTimeout(()=>setStep(5), 500);}} className={`py-3 rounded-xl text-xs font-black border transition-all ${investment == a ? "bg-[#f99616] border-[#f99616] text-white shadow-lg" : "border-gray-800 text-gray-400 hover:border-gray-600"}`}>${a}</button>
                ))}
              </div>
            </div>

            {/* Execution Step */}
            <div ref={tradeRef} className={`p-4 rounded-2xl border transition-all ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-200"} ${step === 5 ? activeRing : ""}`}>
              <h4 className="text-[#f99616] font-black uppercase text-[10px] tracking-widest mb-4">Trade Summary</h4>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-gray-500 uppercase">PROFIT (92%)</span>
                  <span className="text-green-500">+${investment ? (investment * 0.92).toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex justify-between text-xs font-black border-t border-gray-800 pt-3">
                  <span className="text-gray-400 uppercase tracking-tighter">Total Payout</span>
                  <span className="text-[#f99616] text-lg font-black">${investment ? (investment * 1.92).toFixed(2) : "0.00"}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-green-600 text-white py-4 rounded-xl font-black text-xs active:scale-95 shadow-lg shadow-green-900/20">CALL</button>
                <button className="bg-red-600 text-white py-4 rounded-xl font-black text-xs active:scale-95 shadow-lg shadow-red-900/20">PUT</button>
              </div>
              <button onClick={nextStep} className="w-full mt-4 py-3 bg-zinc-800 text-[#f99616] border border-zinc-700 rounded-xl font-black text-[10px] tracking-widest">CONTINUE TUTORIAL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Mail,
  Loader2,
  Grid,
} from "lucide-react";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext"; // 🚀 Added Context

const DepositContent = ({
  step,
  setStep,
  selectedMethod,
  setSelectedMethod,
  depositAmount,
  setDepositAmount,
}) => {
  const { darkMode } = useTheme(); // 🚀 DarkMode indicator
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedEmail =
      localStorage.getItem("user_email") ||
      localStorage.getItem("email") ||
      localStorage.getItem("user");
    if (token) {
      setUserEmail(savedEmail || "Not Found");
    }
  }, []);
  const handleDepositSubmit = async () => {
    // 1. Token check (Dono keys check kar rahe hain safety ke liye)
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");

    if (!depositAmount || depositAmount < 5) {
      setError("Minimum deposit amount is $5");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/wallet/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 🚀 Bearer ke baad space ka khaas dhyan rakha hai
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(depositAmount),
          method: selectedMethod?.name,
        }),
      });

      const data = await response.json();

      // 🚀 401 Check: Agar server reject kare
      if (response.status === 401) {
        setError("Session expired. Please login again.");
        // Optional: localStorage.clear(); window.location.href='/login';
        setIsLoading(false);
        return;
      }

      // 🚀 SUCCESS MAPPING: Aapke JSON ke hisaab se data.result.txId
      if (response.ok || data.statusCode === 200) {
        setSuccessData({
          txId: data.result?.txId, // 👈 'result' ke andar 'txId' hai
          message: data.message || "Deposit pending",
        });
        setStep(4); // Finish step par le jao
      } else {
        setError(data.message || "Transaction failed.");
      }
    } catch (err) {
      console.error("Deposit Error:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };
  const paymentMethods = {
    popular: [
      {
        id: 720,
        name: "Tether (USDT) TRC-20",
        min: "$30",
        logo: "https://pocketoption.com/images/payments/logo2/usdt-trc20.png",
        time: "instantly",
      },
      {
        id: 630,
        name: "UPI",
        min: "$5",
        logo: "https://pocketoption.com/images/payments/logo2/upi.png",
        time: "~5 min.",
      },
      {
        id: 856,
        name: "PhonePe",
        min: "$10",
        logo: "https://pocketoption.com/images/payments/logo2/ik_phonepe_wallet.png",
        time: "~5 min.",
      },
      {
        id: 687,
        name: "Binance Pay",
        min: "$5",
        logo: "https://pocketoption.com/images/payments/logo2/binance.png",
        time: "~1 min.",
      },
      {
        id: 859,
        name: "GPay",
        min: "$10",
        logo: "https://pocketoption.com/images/payments/logo2/google-pay.png",
        time: "~5 min.",
      },
      {
        id: 857,
        name: "Paytm",
        min: "$10",
        logo: "https://pocketoption.com/images/payments/logo2/ik_paytm_wallet.png",
        time: "~5 min.",
      },
    ],
    bank: [
      {
        id: 643,
        name: "IMPS",
        min: "$12",
        logo: "https://pocketoption.com/images/payments/logo2/imps.png",
        time: "~5 min.",
      },
      {
        id: 101,
        name: "Net Banking",
        min: "$20",
        logo: "https://img.icons8.com/color/48/bank.png",
        time: "~15 min.",
      },
    ],
  };

  return (
    <div
      className={`deposit-block w-full max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-10 px-2 md:px-10 min-h-screen font-sans transition-colors duration-500
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}
    >
      {/* Header & Stepper */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pt-6">
        <div>
          <h1
            className={`text-2xl md:text-4xl font-black uppercase tracking-tighter italic ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Top-up <span className="text-[#f99616]">Balance</span>
          </h1>
          <p
            className={`${
              darkMode ? "text-gray-500" : "text-gray-400"
            } text-[9px] md:text-[10px] uppercase font-bold tracking-[3px] mt-1`}
          >
            Instant execution • Secure Gateway
          </p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 px-4 py-2 rounded-xl text-red-500 text-[10px] font-bold uppercase">
            {error}
          </div>
        )}
      </div>

      <div
        className={`deposit-steps flex items-center w-full mb-10 overflow-x-auto no-scrollbar py-3 md:py-4 rounded-2xl md:rounded-3xl border px-4 md:px-6 shadow-2xl transition-colors
        ${
          darkMode
            ? "bg-[#0d0d0d] border-gray-800"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <StepItem
          num={1}
          text="Method"
          status={step === 1 ? "active" : "checked"}
          darkMode={darkMode}
        />
        <StepLine active={step >= 2} />
        <StepItem
          num={2}
          text="Amount"
          status={step === 2 ? "active" : step > 2 ? "checked" : "pending"}
          darkMode={darkMode}
        />
        <StepLine active={step >= 3} />
        <StepItem
          num={3}
          text="Process"
          status={step === 3 ? "active" : step > 3 ? "checked" : "pending"}
          darkMode={darkMode}
        />
        <StepLine active={step >= 4} />
        <StepItem
          num={4}
          text="Finish"
          status={step === 4 ? "active" : "pending"}
          darkMode={darkMode}
        />
      </div>

      {/* STEP 1: Method Selection */}
      {step === 1 && (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
          <div className="xl:col-span-3 space-y-8 md:space-y-10">
            <section>
              <SectionHeader
                icon={<Zap size={16} />}
                label="Most Popular"
                darkMode={darkMode}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {paymentMethods.popular.map((m) => (
                  <MethodCard
                    key={m.id}
                    data={m}
                    onClick={() => {
                      setSelectedMethod(m);
                      setStep(2);
                    }}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </section>
            <section>
              <SectionHeader
                icon={<Grid size={16} />}
                label="Bank Transfer"
                darkMode={darkMode}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {paymentMethods.bank.map((m) => (
                  <MethodCard
                    key={m.id}
                    data={m}
                    onClick={() => {
                      setSelectedMethod(m);
                      setStep(2);
                    }}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* STEP 2: Amount Selection */}
      {step === 2 && (
        <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-6 duration-500">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#f99616] font-black text-[10px] uppercase mb-8 group"
          >
            <ArrowLeft size={16} /> Back to methods
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div
                className={`p-6 md:p-8 rounded-3xl border transition-colors ${
                  darkMode
                    ? "bg-[#0d0d0d] border-gray-800"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <label className="text-gray-500 font-black text-[11px] uppercase tracking-[3px] mb-6 block">
                  Select Deposit Amount
                </label>
                <div className="relative mb-8">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className={`w-full border-2 rounded-2xl p-5 text-3xl md:text-5xl font-black outline-none focus:border-[#f99616] transition-all text-center md:text-left
                      ${
                        darkMode
                          ? "bg-black border-gray-800 text-white"
                          : "bg-white border-gray-200 text-black"
                      }`}
                    placeholder="0"
                  />
                  <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[#f99616] font-black text-4xl hidden md:block">
                    $
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {["50", "100", "250", "500", "1000", "2500"].map((val) => (
                    <button
                      key={val}
                      onClick={() => setDepositAmount(val)}
                      className={`py-4 rounded-2xl border-2 font-black text-sm transition-all active:scale-95 
                      ${
                        depositAmount === val
                          ? "bg-[#f99616] border-[#f99616] text-white"
                          : darkMode
                          ? "bg-black border-gray-800 text-gray-500"
                          : "bg-white border-gray-200 text-gray-400"
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div
                className={`p-6 md:p-8 rounded-3xl border shadow-2xl space-y-6 md:space-y-8 transition-colors ${
                  darkMode
                    ? "bg-[#0d0d0d] border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="form-group">
                  <label className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-4 block">
                    Billing Email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className={`w-full border rounded-xl p-4 text-sm font-bold outline-none focus:border-[#f99616] transition-all
                      ${
                        darkMode
                          ? "bg-black border-gray-800 text-[#f99616]"
                          : "bg-gray-50 border-gray-200 text-black"
                      }`}
                    placeholder="Enter your email"
                  />
                </div>

                <div
                  className={`pt-4 border-t ${
                    darkMode ? "border-gray-800" : "border-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500 text-xs font-bold uppercase">
                      Total to pay
                    </span>
                    <span
                      className={`font-black text-2xl ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      ${Number(depositAmount || 0).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setStep(3);
                      handleDepositSubmit();
                    }}
                    disabled={!depositAmount || !userEmail || isLoading}
                    className="w-full bg-[#f99616] hover:bg-[#e88914] text-white font-black py-5 rounded-2xl uppercase tracking-[2px] active:scale-95 transition-all text-xs flex justify-center items-center disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin mr-2" size={18} />
                    ) : (
                      "Confirm Deposit"
                    )}
                  </button>
                </div>
              </div>
              <PolicySidebar
                minAmount={selectedMethod?.min}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 & 4 */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto text-center space-y-10 py-24 px-4">
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-[#f99616] rounded-full border-t-transparent animate-spin"></div>
            <div
              className={`w-32 h-32 rounded-full border flex items-center justify-center transition-colors ${
                darkMode
                  ? "bg-[#0d0d0d] border-gray-800"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <ShieldCheck size={56} className="text-[#f99616] animate-pulse" />
            </div>
          </div>
          <h3
            className={`text-4xl font-black uppercase italic ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Processing...
          </h3>
        </div>
      )}

      {step === 4 && successData && (
        <div className="max-w-2xl mx-auto text-center space-y-10 py-24 px-4 animate-in zoom-in-95">
          <div className="w-32 h-32 bg-orange-500/10 rounded-full border border-orange-500/20 flex items-center justify-center mx-auto">
            <Loader2 size={64} className="text-[#f99616] animate-spin" />
          </div>
          <h2
            className={`text-4xl font-black uppercase italic ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Request <span className="text-[#f99616]">Pending</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            Aapka deposit verify kiya ja raha hai. Please wait...
          </p>

          <div
            className={`p-8 rounded-3xl border text-left transition-colors ${
              darkMode
                ? "bg-[#0d0d0d] border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p className="text-gray-500 text-[10px] font-black uppercase mb-2">
              Transaction ID
            </p>
            <p
              className={`font-mono break-all font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {successData.txId}
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/trading")}
            className={`w-full font-black py-5 rounded-2xl uppercase tracking-widest transition-all shadow-xl ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-zinc-800"
            }`}
          >
            Check Status in History
          </button>
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---
const StepItem = ({ num, text, status, darkMode }) => (
  <div className="flex items-center gap-3 md:gap-4 shrink-0 px-2 md:px-4 group">
    <div
      className={`w-8 h-8 md:w-11 md:h-11 rounded-xl md:rounded-2xl flex items-center justify-center text-xs md:text-[14px] font-black transition-all duration-500 ${
        status === "active"
          ? "bg-[#f99616] text-white shadow-[0_0_20px_rgba(249,150,22,0.3)] border-2 border-orange-300"
          : status === "checked"
          ? "bg-green-500 text-black"
          : darkMode
          ? "bg-[#151515] text-gray-700 border-gray-800"
          : "bg-white text-gray-300 border-gray-200"
      }`}
    >
      {status === "checked" ? <CheckCircle2 size={16} /> : num}
    </div>
    <div className="flex md:block flex-col">
      <span
        className={`text-[9px] md:text-[10px] font-black uppercase tracking-[1px] block leading-none ${
          status === "active"
            ? darkMode
              ? "text-white"
              : "text-black"
            : "text-gray-600"
        }`}
      >
        {text}
      </span>
    </div>
  </div>
);

const StepLine = ({ active }) => (
  <div className="w-8 md:w-16 lg:w-32 h-[1px] bg-gray-800 mx-2 relative shrink-0">
    <div
      className={`absolute inset-0 bg-[#f99616] transition-all duration-700 ${
        active ? "w-full" : "w-0"
      }`}
    ></div>
  </div>
);

const SectionHeader = ({ icon, label, darkMode }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="p-2 bg-[#f99616]/10 rounded-lg text-[#f99616]">{icon}</div>
    <span
      className={`text-[10px] md:text-[11px] font-black uppercase tracking-[3px] ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      {label}
    </span>
    <div
      className={`flex-1 h-[1px] ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
    ></div>
  </div>
);

const MethodCard = ({ data, onClick, darkMode }) => (
  <div
    onClick={onClick}
    className={`border rounded-xl md:rounded-2xl p-4 md:p-5 flex items-center justify-between group cursor-pointer transition-all duration-300
      ${
        darkMode
          ? "bg-[#0d0d0d] border-gray-800 hover:border-[#f99616] hover:bg-[#111]"
          : "bg-white border-gray-200 shadow-sm hover:border-[#f99616] hover:bg-gray-50"
      }`}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <img
          src={data.logo}
          className="w-full h-full object-contain brightness-110"
          alt={data.name}
        />
      </div>
      <div>
        <h5
          className={`text-xs md:text-sm font-black uppercase leading-tight group-hover:text-[#f99616] transition-colors ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {data.name}
        </h5>
        <p className="text-gray-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
          {data.min}
        </p>
      </div>
    </div>
    <div
      className={`p-1.5 md:p-2 rounded-full border transition-all group-hover:bg-[#f99616] ${
        darkMode ? "bg-black border-gray-800" : "bg-gray-100 border-gray-200"
      }`}
    >
      <ChevronRight
        size={14}
        className="text-gray-600 group-hover:text-white"
      />
    </div>
  </div>
);

const PolicySidebar = ({ minAmount, darkMode }) => (
  <div
    className={`rounded-2xl md:rounded-3xl border p-6 md:p-8 space-y-6 shadow-2xl h-fit transition-colors
    ${
      darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-200"
    }`}
  >
    <div
      className={`flex items-center gap-3 font-black text-[10px] md:text-xs uppercase border-b pb-6 ${
        darkMode ? "text-white border-gray-800" : "text-black border-gray-100"
      }`}
    >
      <ShieldCheck className="text-[#f99616]" size={20} /> Policy Info
    </div>
    <div className="space-y-6">
      <div
        className={`flex justify-between items-end border-b pb-3 ${
          darkMode ? "border-gray-900" : "border-gray-200"
        }`}
      >
        <span className="text-gray-600 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
          Min Deposit
        </span>
        <span
          className={`font-black text-xs md:text-sm ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {minAmount || "$5"}
        </span>
      </div>
    </div>
  </div>
);

export default DepositContent;

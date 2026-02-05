import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, Loader2, KeyRound, ArrowRight, RefreshCcw, HelpCircle } from "lucide-react";
import Swal from "sweetalert2";
import API_CONFIG from "../config";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

const AdminLogin = () => {
  const { darkMode } = useTheme();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", password: "", otp: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 🚀 FORGOT / RESET PASSWORD LOGIC ---
  const handleForgotPassword = async () => {
    if (!formData.email) {
      return Swal.fire({
        icon: "info",
        title: "Email Required",
        text: "Please enter your admin email first.",
        background: darkMode ? "#0d0d0d" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
    }

    const confirm = await Swal.fire({
      title: "Reset Password?",
      text: `A new password will be generated and sent to ${formData.email}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f99616",
      confirmButtonText: "Yes, Reset it",
      background: darkMode ? "#0d0d0d" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    if (confirm.isConfirmed) {
      setLoading(true);
      try {
        // Note: Yahan API path user ID maang rahi hai. 
        // Agar ID nahi hai toh backend ko email based reset endpoint dena hoga, 
        // ya admin ki fix ID use karni hogi (e.g. 'admin').
        const response = await axios.post(`${API_CONFIG.baseURL}/admin/users/admin/reset-password`);

        if (response.data.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Password Reset",
            text: response.data.message,
            background: darkMode ? "#0d0d0d" : "#fff",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: "Could not reset password at this time.",
          background: darkMode ? "#0d0d0d" : "#fff",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  

  // --- 🚀 TIMER LOGIC ---
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // --- 🚀 RESEND OTP ---
// --- 🚀 RESEND OTP (Updated with Input Clear) ---
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/admin/login`, {
        email: formData.email,
        password: formData.password,
        role: "admin"
      });
      if (response.data.statusCode === 200) {
        setTimer(30);
        setCanResend(false);
        // 🔥 Ye line input empty kar degi
        setFormData(prev => ({ ...prev, otp: "" })); 
        
        Swal.fire({ 
          icon: "success", 
          title: "OTP Resent", 
          text: "A new code has been dispatched.",
          background: darkMode ? "#0d0d0d" : "#fff",
          color: darkMode ? "#fff" : "#000"
        });
      }
    } catch (error) {
      Swal.fire({ 
        icon: "error", 
        title: "Failed", 
        text: "Could not resend OTP.",
        background: darkMode ? "#0d0d0d" : "#fff" 
      });
    } finally {
      setLoading(false);
    }
  };
  const handleInitialLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/admin/login`, {
        email: formData.email,
        password: formData.password,
        role: "admin"
      });
      if (response.data.statusCode === 200) {
        setStep(2);
        setTimer(30);
        setCanResend(false);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Login Failed", text: error.response?.data?.message || "Invalid Credentials", background: darkMode ? "#0d0d0d" : "#fff" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/admin/verify-2fa`, {
        email: formData.email,
        password: formData.password,
        role: "admin",
        otp: formData.otp
      });
// ... (inside handleVerify2FA)
if (response.data.statusCode === 200) {
  localStorage.setItem("admin_token", response.data.result.access_token);
  localStorage.setItem("otp",response.data.result.otp);
    localStorage.setItem("role",response.data.result.role);

  // 🚀 Backend se aane wale permissions array ko save kar rahe hain
  localStorage.setItem("admin_permissions", JSON.stringify(response.data.result.role.permissions || []));
  navigate("/admin");
}
    } catch (error) {
      Swal.fire({ icon: "error", title: "Verification Failed", background: darkMode ? "#0d0d0d" : "#fff" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${darkMode ? "bg-black" : "bg-gray-50"}`}>
      <div className={`w-full max-w-md border rounded-3xl p-8 shadow-2xl transition-all duration-500 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100"}`}>
        
        <div className="text-center mb-10">
          <img src={logo} alt="Binovera" className="w-40 mx-auto mb-4" />
          <h2 className={`text-xs font-bold uppercase tracking-[4px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {step === 1 ? "Secure" : "Identity"} <span className="text-[#f99616]">{step === 1 ? "Admin Login" : "Verification"}</span>
          </h2>
        </div>

        {step === 1 ? (
          <form onSubmit={handleInitialLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-gray-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="admin@example.com" className={`w-full border rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200"}`} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Password</label>
                {/* 🚀 FORGOT PASSWORD LINK */}
                <button type="button" onClick={handleForgotPassword} className="text-[9px] font-black uppercase text-[#f99616] hover:underline tracking-tighter">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className={`w-full border rounded-xl py-3.5 pl-12 pr-12 text-sm outline-none transition-all ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200"}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#f99616] text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-[2px] disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Generate OTP <ArrowRight size={16} /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify2FA} className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-gray-500">Enter 6-Digit OTP</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f99616]" size={18} />
                <input  type="text" name="otp" required maxLength="6" value={formData.otp} onChange={handleChange} placeholder="000000" className={`w-full border rounded-xl py-4 pl-12 pr-4 text-center text-xl tracking-[10px] font-black outline-none transition-all ${darkMode ? "bg-black border-gray-800 text-[#f99616]" : "bg-gray-50 border-gray-200"}`} />
              </div>
              <div className="flex flex-col items-center gap-2 mt-4">
                <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{timer > 0 ? `Code expires in ${timer}s` : "Code expired"}</p>
                <button type="button" disabled={!canResend || loading} onClick={handleResendOTP} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${canResend ? "text-[#f99616]" : "text-gray-700 opacity-50"}`}>
                  <RefreshCcw size={12} className={loading ? "animate-spin" : ""} /> Resend OTP
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-white text-black font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-[2px]">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Login"}
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-[10px] font-black uppercase text-gray-500 tracking-widest">← Back to Credentials</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
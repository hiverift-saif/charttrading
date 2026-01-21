import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2, Link2 } from "lucide-react"; 
import axios from "axios";
import Swal from "sweetalert2";
import API_CONFIG from "../config";
import { useTheme } from "../context/ThemeContext";

export default function AffiliateSignup() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "", 
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match!",
        background: darkMode ? "#0d0d0d" : "#fff",
        color: darkMode ? "#fff" : "#000",
        confirmButtonColor: "#f99616",
      });
    }

    // 2. Terms Validation
    if (!formData.terms) {
      return Swal.fire({
        icon: "warning",
        title: "Required",
        text: "Please accept the Terms & Conditions",
        background: darkMode ? "#0d0d0d" : "#fff",
        color: darkMode ? "#fff" : "#000",
        confirmButtonColor: "#f99616",
      });
    }

    // 🚀 Final Payload (Aapki API requirement ke hisaab se)
    const payload = {
      email: formData.email,
      password: formData.password,
      role: "affiliate",
      referralCode: formData.referralCode || undefined,
    };

    try {
      setLoading(true);
      
      // Request sending to backend
      const res = await axios.post(`${API_CONFIG.baseURL}/auth/signup`, payload);

      // ✅ 201 (Created) aur 204 (No Content) dono ko success handle kar rahe hain
      if (res.status === 201 || res.status === 204 || res.data?.statusCode === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Success!",
          text: "Your account has been created. Redirecting to login...",
          timer: 2000,
          showConfirmButton: false,
          background: darkMode ? "#0d0d0d" : "#fff",
          color: darkMode ? "#fff" : "#000",
        }).then(() => {
          // 🚀 OTP ka koi chakkar nahi, seedha Login Page
          navigate("/affiliateLogin");
        });
      }
    } catch (error) {
      // ❌ Error Handling
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.response?.data?.message || "Email already registered or server error.",
        background: darkMode ? "#0d0d0d" : "#fff",
        color: darkMode ? "#fff" : "#000",
        confirmButtonColor: "#f99616",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-500
      ${darkMode ? "bg-black" : "bg-gray-50"}`}>
      
      {/* Brand Glows */}
      <div className="absolute inset-0 overflow-hidden px-4">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f99616]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f99616]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className={`w-full max-w-md border backdrop-blur-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden transition-all duration-500
        ${darkMode ? "bg-[#0d0d0d]/90 border-gray-800 shadow-black/50" : "bg-white border-gray-200 shadow-slate-200"}`}>
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#f99616] rounded-xl flex items-center justify-center shadow-lg shadow-[#f99616]/20">
              <span className="text-black font-black text-xl tracking-tighter uppercase italic leading-none">B</span>
            </div>
          </div>
          <h2 className={`text-2xl font-black uppercase italic tracking-wider leading-none ${darkMode ? "text-white" : "text-slate-900"}`}>Join Binovera</h2>
          <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} text-[10px] font-bold uppercase tracking-[2px] mt-2`}>Affiliate Partner Registration</p>
        </div>

        <div className="px-8 pb-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Partner Name</label>
              <div className="relative group">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`} />
                <input name="fullName" type="text" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required
                  className={`w-full h-11 rounded-xl border pl-10 outline-none transition-all text-sm font-bold ${darkMode ? "bg-black border-gray-800 text-white placeholder:text-gray-800 focus:border-[#f99616]/50" : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]/50"}`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Business Email</label>
              <div className="relative group">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`} />
                <input name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} required
                  className={`w-full h-11 rounded-xl border pl-10 outline-none transition-all text-sm font-bold ${darkMode ? "bg-black border-gray-800 text-white placeholder:text-gray-800 focus:border-[#f99616]/50" : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]/50"}`}
                />
              </div>
            </div>

            {/* Referral Code */}
            <div className="space-y-1.5">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Referral Code (Optional)</label>
              <div className="relative group">
                <Link2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`} />
                <input name="referralCode" type="text" placeholder="MSY9VA" value={formData.referralCode} onChange={handleChange}
                  className={`w-full h-11 rounded-xl border pl-10 outline-none transition-all text-sm font-bold ${darkMode ? "bg-black border-gray-800 text-[#f99616] placeholder:text-gray-800 focus:border-[#f99616]/50" : "bg-gray-50 border-gray-200 text-[#f99616]"}`}
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`} />
                  <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleChange} required
                    className={`w-full h-11 rounded-xl border pl-10 pr-10 outline-none transition-all text-sm font-bold ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-slate-900"}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#f99616]">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Confirm</label>
                <div className="relative group">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`} />
                  <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required
                    className={`w-full h-11 rounded-xl border pl-10 pr-10 outline-none transition-all text-sm font-bold ${darkMode ? "bg-black border-gray-800 text-white" : "bg-gray-50 border-gray-200 text-slate-900"}`}
                  />
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" name="terms" id="terms" checked={formData.terms} onChange={handleChange}
                className="w-4 h-4 rounded border-gray-800 bg-black text-[#f99616] focus:ring-[#f99616]/50 accent-[#f99616] cursor-pointer"
              />
              <label htmlFor="terms" className={`text-[10px] font-bold uppercase tracking-tight leading-tight cursor-pointer ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                I agree to the <span className="text-[#f99616] hover:underline">Terms</span> & <span className="text-[#f99616] hover:underline">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading}
              className="w-full h-12 bg-[#f99616] hover:bg-[#ffae34] text-black rounded-xl flex items-center justify-center font-black uppercase tracking-widest shadow-lg shadow-[#f99616]/20 disabled:opacity-50 transition-all active:scale-[0.98] mt-2 group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-black" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Apply Now
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className={`${darkMode ? "text-gray-600" : "text-gray-500"} text-[10px] font-black uppercase tracking-widest`}>
                Already a partner?{" "}
                <Link to="/affiliateLogin" className="text-[#f99616] font-black hover:text-white transition-colors underline underline-offset-4">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
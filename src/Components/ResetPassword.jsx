import React, { useState, useEffect } from "react";
import { Lock, ArrowLeft, Loader2, Save, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import API_CONFIG from "../config";

const ResetPassword = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  // 🚀 URL se token nikalne ke liye
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Token check agar link bina token ke open hui
  useEffect(() => {
    if (!token) {
      setError("Invalid or expired reset link. Please request a new one.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic Validations
    if (!token) {
      setError("Reset token is missing!");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // 🚀 Reset Password API Call
      const response = await axios.post(`${API_CONFIG.baseURL}/auth/reset-password`, {
        token: token,
        newPassword: newPassword,
      });

      // ✅ Success Check
      if (response.data.statusCode === 200 || response.status === 200) {
        setSuccess("Password has been reset successfully!");
        // 3 second baad login page par bhej dega
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      // ❌ Error Handling
      const errorMessage = err.response?.data?.message || "Link expired or server error. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 px-4 py-12 font-sans relative overflow-hidden
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      {/* Background Glow */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none transition-opacity
        ${darkMode ? "bg-[#f99616]/10 opacity-100" : "bg-[#f99616]/5 opacity-50"}`}></div>
      
      <div className={`w-full max-w-md backdrop-blur-xl border rounded-2xl p-8 shadow-2xl relative z-10 transition-all
        ${darkMode ? "bg-[#0d0d0d]/95 border-gray-800 shadow-black/50" : "bg-white border-gray-200 shadow-xl"}`}>
        
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 animate-in zoom-in duration-300">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-500 font-bold uppercase tracking-widest text-[10px] italic">{success} Redirecting...</p>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 font-bold uppercase tracking-widest text-[10px] italic">{error}</p>
          </div>
        )}

        <div className="text-left mb-8">
          <h2 className={`text-3xl font-black uppercase italic mb-2 tracking-tighter transition-colors
            ${darkMode ? "bg-gradient-to-r from-white to-[#f99616] bg-clip-text text-transparent" : "text-black"}`}>
            New <span className="text-[#f99616]">Credential</span>
          </h2>
          <p className={`${darkMode ? "text-white/40" : "text-gray-500"} text-[10px] font-black uppercase tracking-widest leading-relaxed`}>
            Set your new secure access code for <br /> terminal authentication.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div className="space-y-1">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-white/60" : "text-gray-600"}`}>
              New Password
            </label>
            <div className="relative group">
              <Lock className={`absolute left-4 top-3.5 ${darkMode ? "text-white/30 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input 
                type={showPass ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••" 
                className={`w-full border rounded-xl px-11 py-3.5 transition-all text-xs font-bold focus:outline-none
                  ${darkMode 
                    ? `bg-black border-gray-800 text-white placeholder:text-white/10 focus:border-[#f99616]` 
                    : `bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#f99616]`}`} 
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-gray-500 hover:text-[#f99616]">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${darkMode ? "text-white/60" : "text-gray-600"}`}>
              Confirm Password
            </label>
            <div className="relative group">
              <Lock className={`absolute left-4 top-3.5 ${darkMode ? "text-white/30 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input 
                type={showPass ? "text" : "password"} 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
                className={`w-full border rounded-xl px-11 py-3.5 transition-all text-xs font-bold focus:outline-none
                  ${darkMode 
                    ? `bg-black border-gray-800 text-white placeholder:text-white/10 focus:border-[#f99616]` 
                    : `bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#f99616]`}`} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading || success || !token}
            className={`w-full py-4 rounded-xl font-black uppercase italic tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 transition-all duration-300 mt-4 shadow-2xl active:scale-95
              ${isLoading || success || !token
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                : 'bg-[#f99616] text-white hover:bg-orange-600 shadow-orange-500/20'}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Synchronizing...</span>
              </>
            ) : (
              <>
                <span>Save New Protocol</span>
                <Save size={18} />
              </>
            )}
          </button>
        </form>

        {/* Support Link */}
        <div className={`mt-10 pt-6 border-t text-center ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
           <Link to="/login" className="text-[10px] font-black uppercase text-gray-500 hover:text-[#f99616]">Cancel Process</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
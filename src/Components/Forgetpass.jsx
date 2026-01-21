import React, { useState } from "react";
import { Mail, ArrowLeft, Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import axios from "axios"; // 🚀 Axios import kiya
import API_CONFIG from "../config"; // 🚀 Config import kiya

const Forgetpass = () => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic Validation
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);

    try {
      // 🚀 POST Method API Call
      const response = await axios.post(`${API_CONFIG.baseURL}/auth/forgot-password`, {
        email: email.trim(),
      });

      // ✅ Success Check (As per your JSON structure)
      if (response.data.statusCode === 200 || response.status === 200) {
        setSuccess(response.data.message || "Recovery link has been sent to your email!");
        setEmail(""); // Input clear kar diya
      }
    } catch (err) {
      // ❌ Error Handling
      const errorMessage = err.response?.data?.message || "Something went wrong. Please check your email or try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 px-4 py-12 font-sans relative overflow-hidden
      ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      {/* Background Glow Effect */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none transition-opacity
        ${darkMode ? "bg-[#f99616]/10 opacity-100" : "bg-[#f99616]/5 opacity-50"}`}></div>
      
      <div className={`w-full max-w-md backdrop-blur-xl border rounded-2xl p-8 shadow-2xl relative z-10 transition-all
        ${darkMode ? "bg-[#0d0d0d]/95 border-gray-800 shadow-black/50" : "bg-white border-gray-200 shadow-xl"}`}>
        
        {/* Success Message Notification */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 animate-in zoom-in duration-300">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-500 font-bold uppercase tracking-widest text-[10px] italic">{success}</p>
          </div>
        )}
        
        {/* Error Message Notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 font-bold uppercase tracking-widest text-[10px] italic">{error}</p>
          </div>
        )}

        {/* Back to Login Link */}
        <Link to="/login" className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8 transition-colors hover:text-[#f99616] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          <ArrowLeft size={14} /> Back to Login
        </Link>

        <div className="text-left mb-8">
          <h2 className={`text-3xl font-black uppercase italic mb-2 tracking-tighter transition-colors
            ${darkMode ? "bg-gradient-to-r from-white to-[#f99616] bg-clip-text text-transparent" : "text-black"}`}>
            Reset <span className="text-[#f99616]">Password</span>
          </h2>
          <p className={`${darkMode ? "text-white/40" : "text-gray-500"} text-[10px] font-black uppercase tracking-widest leading-relaxed`}>
            Enter your email and we'll send you a link <br /> to restore access to your account.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="space-y-1">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 transition-colors ${darkMode ? "text-white/60" : "text-gray-600"}`}>
              Email Address
            </label>
            <div className="relative group">
              <Mail className={`absolute left-4 top-3.5 transition-colors ${darkMode ? "text-white/30 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trader@example.com" 
                className={`w-full border rounded-xl px-11 py-3.5 transition-all text-xs font-bold uppercase tracking-widest backdrop-blur-sm focus:outline-none
                  ${darkMode 
                    ? `bg-black border-gray-800 text-white placeholder:text-white/10 focus:border-[#f99616]` 
                    : `bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#f99616]`}`} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading || success}
            className={`w-full py-4 rounded-xl font-black uppercase italic tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 transition-all duration-300 mt-4 shadow-2xl active:scale-95
              ${isLoading || success
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                : 'bg-[#f99616] text-white hover:bg-orange-600 shadow-orange-500/20'}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Request...</span>
              </>
            ) : (
              <>
                <span>Send Recovery Link</span>
                <Send size={18} />
              </>
            )}
          </button>
        </form>

        <div className={`mt-10 pt-6 border-t text-center ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
          <p className={`${darkMode ? "text-white/40" : "text-gray-500"} text-[10px] font-black uppercase tracking-widest leading-loose`}>
            Need Help? Contact our <br />
            <Link to="/supportservice" className="text-[#f99616] hover:underline italic">24/7 Support Terminal</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgetpass;
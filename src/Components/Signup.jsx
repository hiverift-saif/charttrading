import React, { useState, useEffect } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Loader2, Link2 } from "lucide-react";
import { useSearchParams } from "react-router-dom"; // 🚀 Added for URL Reading
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const { darkMode } = useTheme();
  const [searchParams] = useSearchParams(); // 🚀 URL se ?ref=ZMC2S9 read karega

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "", // 🚀 New field for auto-fill
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  // 🚀 logic: Page load hote hi URL se code nikal kar state mein daalna
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setFormData((prev) => ({ ...prev, referralCode: ref }));
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: "user",
          // 🚀 Backend ko referral code bhej rahe hain
          ...(formData.referralCode && { referralCode: formData.referralCode })
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = '/login?signup=success';
        }, 2500);
        setFormData({ name: "", email: "", password: "", confirmPassword: "", referralCode: "" });
      } else {
        setError(data.message || data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden transition-colors duration-500
      ${darkMode ? "bg-black" : "bg-white"}`}>
      
      {/* Background Glows (Same as you provided) */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[100px] rounded-full pointer-events-none transition-opacity
        ${darkMode ? "bg-[#f99616]/10 opacity-100" : "bg-[#f99616]/5 opacity-50"}`}></div>
      
      <div className={`w-full max-w-md backdrop-blur-xl border rounded-2xl p-8 shadow-2xl relative z-10 transition-all
        ${darkMode ? "bg-[#0d0d0d]/95 border-gray-800" : "bg-white border-gray-200 shadow-xl"}`}>
        
        {/* Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-xl flex items-center gap-3 animate-pulse">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <p className="text-green-200 font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3 animate-pulse">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-red-200 font-medium">{error}</p>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 transition-colors
            ${darkMode ? "bg-gradient-to-r from-white to-[#f99616] bg-clip-text text-transparent" : "text-black"}`}>
            Create Account
          </h2>
          <p className={`${darkMode ? "text-white/40" : "text-gray-500"} text-sm`}>Start your trading journey today</p>
        </div>

        {/* Google Signup Button (Original Design) */}
        <button type="button" className={`w-full flex items-center justify-center gap-3 border font-medium py-3 rounded-xl transition-all duration-300 mb-6 backdrop-blur-sm group
          ${darkMode ? "bg-[#111111] border-gray-800 text-white hover:bg-[#1a1a1a] hover:border-[#f99616]/30" : "bg-gray-50 border-gray-200 text-black hover:bg-gray-100"}`} disabled={isLoading}>
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Sign up with Google</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} h-px flex-1`}></div>
          <span className={`${darkMode ? "text-white/30" : "text-gray-400"} text-xs uppercase tracking-wider`}>Or with email</span>
          <div className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} h-px flex-1`}></div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-1">
            <label className={`text-xs ml-1 flex items-center gap-1 transition-colors ${darkMode ? "text-white/60" : "text-gray-600"}`}>
              Full Name
              {errors.name && <AlertCircle className="w-3 h-3 text-red-400" />}
            </label>
            <div className="relative group">
              <User className={`absolute left-4 top-3.5 transition-colors ${darkMode ? "text-white/30 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                className={`w-full border rounded-xl px-11 py-3 transition-all text-sm backdrop-blur-sm focus:outline-none
                  ${darkMode 
                    ? `bg-[#111111] ${errors.name ? 'border-red-500/50 bg-red-500/5' : 'border-gray-800 text-white placeholder:text-white/20 focus:border-[#f99616]/50'}` 
                    : `bg-white ${errors.name ? 'border-red-500/50 bg-red-50' : 'border-gray-200 text-black placeholder:text-gray-400 focus:border-[#f99616]'}`}`} />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className={`text-xs ml-1 flex items-center gap-1 transition-colors ${darkMode ? "text-white/60" : "text-gray-600"}`}>
              Email
              {errors.email && <AlertCircle className="w-3 h-3 text-red-400" />}
            </label>
            <div className="relative group">
              <Mail className={`absolute left-4 top-3.5 transition-colors ${darkMode ? "text-white/30 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com"
                className={`w-full border rounded-xl px-11 py-3 transition-all text-sm backdrop-blur-sm focus:outline-none
                  ${darkMode 
                    ? `bg-[#111111] ${errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-gray-800 text-white placeholder:text-white/20 focus:border-[#f99616]/50'}` 
                    : `bg-white ${errors.email ? 'border-red-500/50 bg-red-50' : 'border-gray-200 text-black placeholder:text-gray-400 focus:border-[#f99616]'}`}`} />
            </div>
          </div>

          {/* 🚀 REFERRAL CODE (Design-matched Field) */}
          <div className="space-y-1">
            <label className={`text-xs ml-1 flex items-center gap-1 transition-colors ${darkMode ? "text-white/60" : "text-gray-600"}`}>
              Referral Code (Optional)
            </label>
            <div className="relative group">
              <Link2 className={`absolute left-4 top-3.5 transition-colors ${darkMode ? "text-[#f99616]/40 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} placeholder="MSY9VA"
                className={`w-full border rounded-xl px-11 py-3 transition-all text-sm font-bold tracking-widest outline-none
                  ${darkMode ? "bg-[#111] border-gray-800 text-[#f99616] placeholder:text-white/10 focus:border-[#f99616]/50" : "bg-white border-gray-200 text-[#f99616] focus:border-[#f99616]"}`} />
            </div>
          </div>

          {/* Passwords */}
          <div className="space-y-4">
            <div className="relative group">
              <Lock className={`absolute left-4 top-3.5 transition-colors ${darkMode ? "text-white/30 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create password"
                className={`w-full border rounded-xl px-11 py-3 pr-12 transition-all text-sm ${darkMode ? `bg-[#111111] border-gray-800 text-white` : `bg-white border-gray-200 text-black`}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/30 hover:text-[#f99616]">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="relative group">
              <Lock className={`absolute left-4 top-3.5 transition-colors ${darkMode ? "text-white/30 group-focus-within:text-[#f99616]" : "text-gray-400 group-focus-within:text-[#f99616]"}`} size={18} />
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password"
                className={`w-full border rounded-xl px-11 py-3 transition-all text-sm ${darkMode ? `bg-[#111111] border-gray-800 text-white` : `bg-white border-gray-200 text-black`}`} />
            </div>
          </div>

          {/* Terms (Original) */}
          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" id="terms" className="mt-1 accent-[#f99616] w-4 h-4 bg-[#111111] border-gray-800 rounded cursor-pointer" required />
            <label htmlFor="terms" className={`text-xs cursor-pointer leading-relaxed ${darkMode ? "text-white/50" : "text-gray-500"}`}>
              I agree to the <a href="#" className="text-[#f99616] hover:underline font-medium">Terms</a> & <a href="#" className="text-[#f99616] hover:underline font-medium">Privacy</a>
            </label>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#f99616] to-[#e88a14] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-1px] mt-2 group relative overflow-hidden"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Create Account</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>

        <div className={`mt-8 pt-6 border-t text-center ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <p className={`${darkMode ? "text-white/40" : "text-gray-500"} text-sm`}>
            Already have an account? <a href="/login" className="text-[#f99616] font-medium hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
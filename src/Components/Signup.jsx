// Updated Signup Component (SweetAlert removed, CSS-based messages added)
import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import API_CONFIG from '../config';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "trader"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Enter valid 10-digit phone number";
    
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
      const response = await fetch(`${API_CONFIG.baseURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = '/login?success=true';
        }, 2500);

        setFormData({ name: "", email: "", password: "", phone: "", role: "trader" });
      } else {
        // Common messages like "Email already exists" or any backend error
        setError(data.message || data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
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
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ffae34]/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="fixed top-1/4 right-10 w-[300px] h-[300px] bg-[#4285F4]/5 blur-[60px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-[#09090b]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-600/20 border border-green-500/50 rounded-xl flex items-center gap-3 animate-pulse">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
            <p className="text-green-200 font-medium">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-xl flex items-center gap-3 animate-pulse">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <p className="text-red-200 font-medium">{error}</p>
          </div>
        )}

        {/* Rest of the JSX exactly same as your original */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-[#ffae34] bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-white/40 text-sm">Start your trading journey today</p>
        </div>

        <button type="button" className="w-full flex items-center justify-center gap-3 bg-[#18181b]/80 border border-white/10 text-white font-medium py-3 rounded-xl hover:bg-[#27272a]/80 hover:border-[#ffae34]/30 transition-all duration-300 mb-6 backdrop-blur-sm group" disabled={isLoading}>
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Sign up with Google</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-white/30 text-xs uppercase tracking-wider">Or with email</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* All fields exactly same as your code */}
          {/* Name, Email, Phone, Password fields with validation errors */}
          {/* ... (same as your provided code) */}
          
          <div className="space-y-1">
            <label className="text-xs text-white/60 ml-1 flex items-center gap-1">
              Full Name
              {errors.name && <AlertCircle className="w-3 h-3 text-red-400" />}
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-[#ffae34] transition-colors" size={18} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={`w-full bg-[#18181b]/80 border rounded-xl px-11 py-3 text-white placeholder:text-white/20 focus:outline-none transition-all text-sm backdrop-blur-sm ${errors.name ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-[#ffae34]/50 focus:ring-1 focus:ring-[#ffae34]/30 hover:border-white/20'}`} />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-white/60 ml-1 flex items-center gap-1">
              Email
              {errors.email && <AlertCircle className="w-3 h-3 text-red-400" />}
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-[#ffae34] transition-colors" size={18} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" className={`w-full bg-[#18181b]/80 border rounded-xl px-11 py-3 text-white placeholder:text-white/20 focus:outline-none transition-all text-sm backdrop-blur-sm ${errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-[#ffae34]/50 focus:ring-1 focus:ring-[#ffae34]/30 hover:border-white/20'}`} />
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-white/60 ml-1 flex items-center gap-1">
              Phone Number
              {errors.phone && <AlertCircle className="w-3 h-3 text-red-400" />}
            </label>
            <div className="relative group">
              <Phone className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-[#ffae34] transition-colors" size={18} />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="1234567890" className={`w-full bg-[#18181b]/80 border rounded-xl px-11 py-3 text-white placeholder:text-white/20 focus:outline-none transition-all text-sm backdrop-blur-sm ${errors.phone ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-[#ffae34]/50 focus:ring-1 focus:ring-[#ffae34]/30 hover:border-white/20'}`} />
              {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-white/60 ml-1 flex items-center gap-1">
              Password
              {errors.password && <AlertCircle className="w-3 h-3 text-red-400" />}
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-[#ffae34] transition-colors" size={18} />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create password" className={`w-full bg-[#18181b]/80 border rounded-xl px-11 py-3 text-white placeholder:text-white/20 focus:outline-none transition-all text-sm backdrop-blur-sm pr-12 ${errors.password ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-[#ffae34]/50 focus:ring-1 focus:ring-[#ffae34]/30 hover:border-white/20'}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/30 hover:text-[#ffae34] transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" id="terms" className="mt-1 accent-[#ffae34] w-4 h-4 bg-white/10 border-white/20 rounded cursor-pointer focus:ring-[#ffae34]/50" required />
            <label htmlFor="terms" className="text-xs text-white/50 cursor-pointer leading-relaxed">
              I agree to the <a href="#" className="text-[#ffae34] hover:underline font-medium">Terms of Service</a> & <a href="#" className="text-[#ffae34] hover:underline font-medium">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.phone}
            className="w-full bg-gradient-to-r from-[#ffae34] to-[#ff8c00] hover:from-[#e59d2e] hover:to-[#e67e22] disabled:from-[#ffae34]/50 disabled:to-[#ff8c00]/50 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-1px] mt-2 shadow-[0_10px_30px_-5px_rgba(255,174,52,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(255,174,52,0.5)] active:translate-y-[-2px] group relative overflow-hidden">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            Already have an account? <a href="/login" className="text-[#ffae34] font-medium hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
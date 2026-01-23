import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import API_CONFIG from "../config";
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function AffiliateLogin() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(true); // Default true based on your URL example
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Login Form Submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const loginUrl = `${API_CONFIG.baseURL}/auth/login?rememberMe=${rememberMe}`;

    const res = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    setLoading(false);

    // ❌ API error
    if (!res.ok || result.statusCode !== 200) {
      throw new Error(result.message || "Invalid email or password");
    }

    // ✅ Extract data safely
    const token = result?.result?.accessToken;
    const role  = result?.result?.user?.role;

    if (!token) throw new Error("Token not found");

    // ❌ ROLE CHECK
    if (role !== "affiliate") {
      await Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are not authorized as an affiliate.",
        confirmButtonColor: "#ef4444",
        background: darkMode ? "#0d0d0d" : "#fff",
        color: darkMode ? "#fff" : "#000",
      });
      return; // ⛔ STOP LOGIN
    }

    // ✅ Affiliate only
    localStorage.setItem("affiliate_token", token);

    await Swal.fire({
      icon: "success",
      title: "Verified",
      text: "Welcome back, Affiliate!",
      timer: 1500,
      showConfirmButton: false,
      background: darkMode ? "#0d0d0d" : "#fff",
      color: darkMode ? "#fff" : "#000",
    });

    navigate("/AffiliateDashboard");

  } catch (error) {
    setLoading(false);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.message || "Server is not responding.",
      background: darkMode ? "#0d0d0d" : "#fff",
      color: darkMode ? "#fff" : "#000",
      confirmButtonColor: "#f99616",
    });
  }
};


  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-500
      ${darkMode ? "bg-black" : "bg-gray-50"}`}>
      
      {/* 🚀 Binovera Orange Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#f99616]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#f99616]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className={`w-full max-w-md border backdrop-blur-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden transition-all duration-500
        ${darkMode ? "bg-[#0d0d0d]/90 border-gray-800 shadow-black/50" : "bg-white border-gray-200 shadow-slate-200"}`}>
        
        {/* Branding & Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-[#f99616] rounded-2xl flex items-center justify-center shadow-xl shadow-[#f99616]/20">
              <span className="text-black font-black text-2xl tracking-tighter uppercase italic leading-none">B</span>
            </div>
          </div>
          <h2 className={`text-3xl font-black uppercase italic tracking-wider transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}>Partner Login</h2>
          <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} text-[10px] font-bold uppercase tracking-[2px] mt-2`}>Binovera Affiliate Protocol</p>
        </div>

        {/* Login Form */}
        <div className="px-8 pb-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-1 transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Email Address</label>
              <div className="relative group">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={`w-full h-12 rounded-xl border pl-11 outline-none transition-all text-sm font-bold
                    ${darkMode 
                      ? "bg-black border-gray-800 text-white placeholder:text-gray-800 focus:border-[#f99616]/50" 
                      : "bg-gray-50 border-gray-200 text-slate-900 placeholder:text-gray-400 focus:border-[#f99616]"}`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Password</label>
                <Link to="/forgetpass" size="sm" className="text-[10px] font-black text-[#f99616] hover:text-white transition-colors uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${darkMode ? "text-gray-600" : "text-gray-400"} group-focus-within:text-[#f99616]`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className={`w-full h-12 rounded-xl border pl-11 pr-11 outline-none transition-all text-sm font-bold
                    ${darkMode 
                      ? "bg-black border-gray-800 text-white placeholder:text-gray-800 focus:border-[#f99616]/50" 
                      : "bg-gray-50 border-gray-200 text-slate-900 placeholder:text-gray-400 focus:border-[#f99616]"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#f99616] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 px-1">
               <input 
                 type="checkbox" 
                 id="remember" 
                 checked={rememberMe} 
                 onChange={(e) => setRememberMe(e.target.checked)}
                 className="w-4 h-4 accent-[#f99616] rounded border-gray-800 bg-black"
               />
               <label htmlFor="remember" className={`text-[10px] font-black uppercase tracking-widest cursor-pointer ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                 Remember Me
               </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#f99616] hover:bg-[#ffae34] text-black rounded-xl flex items-center justify-center font-black uppercase tracking-widest shadow-lg shadow-[#f99616]/10 disabled:opacity-50 transition-all active:scale-[0.98] mt-6 group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Partner Sign In
                </>
              )}
            </button>

            {/* Footer Links */}
            <div className={`text-center pt-6 border-t transition-colors ${darkMode ? "border-gray-800/50" : "border-gray-100"}`}>
              <p className={`${darkMode ? "text-gray-600" : "text-gray-500"} text-[10px] font-black uppercase tracking-widest`}>
                New to the program?{" "}
                <Link to="/affiliateSignup" className="text-[#f99616] font-black hover:text-white transition-colors underline underline-offset-4">
                  Join Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
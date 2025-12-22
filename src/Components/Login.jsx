import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 font-sans">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ffae34]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#09090b] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/40 text-sm">Login to manage your trading account</p>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-[#18181b] border border-white/10 text-white font-medium py-3 rounded-xl hover:bg-[#27272a] hover:border-white/20 transition-all mb-6">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-white/30 text-xs uppercase">Or login with email</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-white/60 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-[#ffae34] transition-colors" size={18} />
              <input type="email" placeholder="name@example.com" className="w-full bg-[#18181b] border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ffae34]/50 focus:ring-1 focus:ring-[#ffae34]/50 transition-all text-sm" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-white/60 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-white/30 group-focus-within:text-[#ffae34] transition-colors" size={18} />
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-full bg-[#18181b] border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ffae34]/50 focus:ring-1 focus:ring-[#ffae34]/50 transition-all text-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/30 hover:text-white transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <a href="/forgot-password" className="text-xs text-white/50 hover:text-[#ffae34] transition-colors">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-[#ffae34] hover:bg-[#e59d2e] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] mt-2 shadow-[0_0_20px_-5px_rgba(255,174,52,0.3)]">
            Login Now <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            Don't have an account? <a href="/signup" className="text-[#ffae34] font-medium hover:underline ml-1">Sign up free</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
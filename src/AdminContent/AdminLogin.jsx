import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import API_CONFIG from '../config';
import logo from "../assets/Logo.png";
import { useTheme } from "../context/ThemeContext"; // 🚀 Context Import

const AdminLogin = () => {
  const { darkMode } = useTheme(); // 🚀 Theme state access
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const loginPayload = {
    email: formData.email,
    password: formData.password,
    role: "admin"
  };

  try {
    // 🚀 URL aur Payload dono ko check karein
    const response = await axios.post(
      `${API_CONFIG.baseURL}/auth/login?rememberMe=true`, 
      loginPayload
    );

    console.log("Full API Response:", response.data); // Debugging ke liye zaroori hai

    // 🚀 FIX: Status Code 201 check karein aur token extract karein
    // Aapke backend format ke hisaab se path 'response.data.access_token' ya 'response.data.result.accessToken' ho sakta hai
    const token = response.data.access_token || response.data.result?.accessToken || response.data.token;

    if (response.status === 201 || response.status === 200) {
      if (token) {
        // 1. Token Save Karein
        localStorage.setItem("admin_token", token);

        // 2. Success Alert
        await Swal.fire({
          icon: 'success',
          title: 'Verified',
          text: 'Welcome back, Admin!',
          timer: 1500,
          showConfirmButton: false,
          background: darkMode ? '#0d0d0d' : '#fff',
          color: darkMode ? '#fff' : '#000'
        });

        // 3. Redirect
        navigate('/admin');
      } else {
        throw new Error("Token missing from response");
      }
    }
  } catch (error) {
    // 🚀 Detailed Error Logging
    const serverMessage = error.response?.data?.message || error.message;
    console.error("Login Failed:", serverMessage);

    Swal.fire({
      icon: 'error',
      title: 'Login Error',
      text: serverMessage === "Invalid Credentials" ? "Email ya Password galat hai" : serverMessage,
      confirmButtonColor: '#ef4444',
      background: darkMode ? '#0d0d0d' : '#fff',
      color: darkMode ? '#fff' : '#000'
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 
      ${darkMode ? "bg-black" : "bg-gray-50"}`}>
      
      <div className={`w-full max-w-md border rounded-3xl p-8 shadow-2xl relative transition-all duration-500
        ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100"}`}>
        
        {/* Logo Section */}
        <div className="text-center mb-10">
          <img src={logo} alt="Binovera" className="w-40 mx-auto mb-4" />
          <h2 className={`text-xs font-bold uppercase tracking-[4px] 
            ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Secure <span className="text-[#f99616]">Admin Login</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 
              ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="test@example.com"
                className={`w-full border rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all
                  ${darkMode 
                    ? "bg-black border-gray-800 text-white focus:border-[#f99616]" 
                    : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]"}`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className={`text-[10px] font-bold uppercase tracking-widest ml-1 
              ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full border rounded-xl py-3.5 pl-12 pr-12 text-sm outline-none transition-all
                  ${darkMode 
                    ? "bg-black border-gray-800 text-white focus:border-[#f99616]" 
                    : "bg-gray-50 border-gray-200 text-slate-900 focus:border-[#f99616]"}`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f99616]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#f99616] hover:bg-[#e88914] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/10 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-[2px] active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Login as Admin"}
          </button>
        </form>

        <p className={`mt-8 text-center text-[9px] font-bold uppercase tracking-widest 
          ${darkMode ? "text-gray-700" : "text-gray-400"}`}>
            Authorized Personnel Only • Binovera Security Standard
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
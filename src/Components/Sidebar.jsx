import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // ← added useSearchParams
import { Eye, EyeOff, Mail, Lock, Loader2, UserPlus, LogIn, Chrome, ShieldCheck, Link2 } from "lucide-react";
import API_CONFIG from '../config';
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ← for reading ?ref= from URL

  const [activeTab, setActiveTab] = useState("signup");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showSignupPass, setShowSignupPass] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [stayLogged, setStayLogged] = useState(false);
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");   // ← NEW
  const [currency, setCurrency] = useState("INR");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [signupSubmitted, setSignupSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Auto-fill referral code from URL (?ref=ABC123)
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralCode(ref);
    }
  }, [searchParams]);

  const handleLoginSubmit = async () => {
    setLoginSubmitted(true);
    setApiError("");
    if (loginEmail && loginPassword) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_CONFIG.baseURL}/auth/login`, {
          
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('access_token', data?.result?.accessToken);
          localStorage.setItem('user_name', data.user?.name || "Trader");
          localStorage.setItem('user_email', loginEmail);
          window.location.href = '/trading';
        } else {
          setApiError(data.message || "Invalid email or password.");
        }
      } catch (err) {
        setApiError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSignupSubmit = async () => {
    setSignupSubmitted(true);
    setApiError("");
    if (signupEmail && signupPassword && acceptTerms) {
      setIsLoading(true);
      try {
        const payload = {
          email: signupEmail,
          password: signupPassword,
          name: signupEmail.split('@')[0],
        };

        // Add referralCode only if it exists
        if (referralCode.trim()) {
          payload.referralCode = referralCode.trim();
        }

        const response = await fetch(`${API_CONFIG.baseURL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
          setActiveTab("login");
          setSignupSubmitted(false);
          setSignupEmail("");
          setSignupPassword("");
          setReferralCode(""); // optional: clear after success
        } else {
          setApiError(data.message || "Registration failed.");
        }
      } catch (err) {
        setApiError("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-80 shadow-2xl z-[60] flex flex-col font-sans border-l transition-colors duration-500
      ${darkMode ? "bg-[#120025] text-white border-white/5" : "bg-white text-slate-900 border-gray-200"}`}>

      {/* Header */}
      <div className={`p-6 pb-4 z-10 ${darkMode ? "bg-[#120025]" : "bg-white"}`}>
        <div className="flex gap-3">
          <button
            onClick={() => { setActiveTab("signup"); setApiError(""); }}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "signup"
                ? (darkMode ? "bg-white text-purple-900 shadow-lg" : "bg-purple-600 text-white shadow-lg")
                : (darkMode ? "bg-transparent text-gray-400 border border-gray-700 hover:text-white" : "bg-transparent text-gray-500 border border-gray-200 hover:bg-gray-50")
            }`}
          >
            <UserPlus size={16} /> Sign Up
          </button>
          <button
            onClick={() => { setActiveTab("login"); setApiError(""); }}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "login"
                ? (darkMode ? "bg-[#2d1f4a] text-white border border-purple-500" : "bg-gray-800 text-white")
                : (darkMode ? "bg-transparent text-gray-400 border border-gray-700 hover:text-white" : "bg-transparent text-gray-500 border border-gray-200 hover:bg-gray-50")
            }`}
          >
            <LogIn size={16} /> Log In
          </button>
        </div>
        {apiError && <p className="text-red-500 text-[10px] mt-2 text-center font-bold uppercase tracking-tight animate-pulse">{apiError}</p>}
      </div>

      <div className="flex-1 relative overflow-hidden w-full">
        <div className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${activeTab === "login" ? "translate-x-0" : "-translate-x-1/2"}`}>

          {/* LOGIN FORM */}
          <div className="w-1/2 h-full px-6 overflow-y-auto pb-10 custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6 mt-2">Login to your account</h2>
            {/* ... rest of login form remains exactly the same ... */}
            <div className="mb-4 relative group">
              <Mail className={`absolute left-3 top-3.5 transition-colors ${darkMode ? "text-gray-500 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-600"}`} size={18} />
              <input
                type="email"
                placeholder="Email (login)"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm
                  ${darkMode ? "bg-[#2d1f4a] text-white placeholder:text-gray-400" : "bg-gray-100 text-black placeholder:text-gray-500"}`}
              />
              {loginSubmitted && !loginEmail && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <div className="mb-4 relative group">
              <Lock className={`absolute left-3 top-3.5 transition-colors ${darkMode ? "text-gray-500 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-600"}`} size={18} />
              <input
                type={showLoginPass ? "text" : "password"}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={`w-full p-3 pl-10 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm
                  ${darkMode ? "bg-[#2d1f4a] text-white placeholder:text-gray-400" : "bg-gray-100 text-black placeholder:text-gray-500"}`}
              />
              <button type="button" onClick={() => setShowLoginPass(!showLoginPass)} className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-500 transition-colors">
                {showLoginPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {loginSubmitted && !loginPassword && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <div className="flex items-center justify-between mb-6 text-sm">
              <label className={`flex items-center gap-2 cursor-pointer transition-colors ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"}`}>
                <input type="checkbox" checked={stayLogged} onChange={() => setStayLogged(!stayLogged)} className="w-4 h-4 accent-purple-600 rounded cursor-pointer" />
                Stay logged
              </label>
          <Link to="/forgetpass" className="text-orange-500 hover:text-orange-400 transition-colors">    Forgot password?</Link>
            </div>

            <button onClick={handleLoginSubmit} disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-orange-500/20">
              {isLoading && activeTab === 'login' ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Log In"}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className={`h-px flex-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className={`h-px flex-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
            </div>

            <button className={`w-full py-3 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors text-sm border
              ${darkMode ? "bg-white text-black hover:bg-gray-100" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm"}`}>
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
          </div>

          {/* SIGN UP FORM – with referral code added */}
          <div className="w-1/2 h-full px-6 overflow-y-auto pb-10 custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6 mt-2">Open an account</h2>

            <div className="mb-4 relative group">
              <Mail className={`absolute left-3 top-3.5 transition-colors ${darkMode ? "text-gray-500 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-600"}`} size={18} />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm
                  ${darkMode ? "bg-[#2d1f4a] text-white placeholder:text-gray-400" : "bg-gray-100 text-black placeholder:text-gray-500"}`}
              />
              {signupSubmitted && !signupEmail && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <div className="mb-4 relative group">
              <Lock className={`absolute left-3 top-3.5 transition-colors ${darkMode ? "text-gray-500 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-600"}`} size={18} />
              <input
                type={showSignupPass ? "text" : "password"}
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className={`w-full p-3 pl-10 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm
                  ${darkMode ? "bg-[#2d1f4a] text-white placeholder:text-gray-400" : "bg-gray-100 text-black placeholder:text-gray-500"}`}
              />
              <button type="button" onClick={() => setShowSignupPass(!showSignupPass)} className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-500 transition-colors">
                {showSignupPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {signupSubmitted && !signupPassword && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            {/* Referral Code Field – NEW */}
            <div className="mb-4 relative group">
              <Link2 className={`absolute left-3 top-3.5 transition-colors ${darkMode ? "text-gray-500 group-focus-within:text-purple-400" : "text-gray-400 group-focus-within:text-purple-600"}`} size={18} />
              <input
                type="text"
                placeholder="Referral Code (optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm font-mono tracking-wide
                  ${darkMode ? "bg-[#2d1f4a] text-purple-300 placeholder:text-gray-500" : "bg-gray-100 text-purple-700 placeholder:text-gray-400"}`}
              />
            </div>

            <div className="mb-4">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer text-sm
                  ${darkMode ? "bg-[#2d1f4a] text-white" : "bg-gray-100 text-black border-none"}`}
              >
                <option value="INR">INR (Account currency)</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-400 bg-transparent checked:bg-purple-600 checked:border-purple-600 transition-all mt-1"
                  />
                  <svg className="pointer-events-none absolute left-1/2 top-1/2 mt-0.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 3.5L3.5 6L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className={`text-sm leading-snug transition-colors ${darkMode ? "text-gray-400 group-hover:text-gray-200" : "text-gray-600 group-hover:text-black"}`}>
                  Please, confirm that you accept the <a href="#" className="text-orange-500 hover:underline">Terms</a>, <a href="#" className="text-orange-400 hover:underline">Bonus Rules</a> and <a href="#" className="text-orange-400 hover:underline">Risk Statement</a>
                </span>
              </label>
              {signupSubmitted && !acceptTerms && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <button onClick={handleSignupSubmit} disabled={isLoading} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-orange-500/20">
              {isLoading && activeTab === 'signup' ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Sign Up"}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className={`h-px flex-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className={`h-px flex-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
            </div>

            <button className={`w-full py-3 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors text-sm border
              ${darkMode ? "bg-white text-black hover:bg-gray-100" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm"}`}>
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
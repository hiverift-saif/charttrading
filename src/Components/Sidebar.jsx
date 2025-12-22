import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("signup");
  
  // Login Form Fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [stayLogged, setStayLogged] = useState(false);
  const [loginSubmitted, setLoginSubmitted] = useState(false);

  // Signup Form Fields
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [signupSubmitted, setSignupSubmitted] = useState(false);

  const handleLoginSubmit = () => {
    setLoginSubmitted(true);
    if (loginEmail && loginPassword) {
      console.log("Login Submit Clicked");
    }
  };

  const handleSignupSubmit = () => {
    setSignupSubmitted(true);
    if (signupEmail && signupPassword && acceptTerms) {
      console.log("Signup Submit Clicked");
    }
  };

  return (
    /* FIXED: top-0 aur z-[60] taaki Navbar ke upar overlap kare */
    <div className="fixed right-0 top-0 h-full w-80 bg-[#120025] text-white shadow-2xl z-[60] flex flex-col font-sans border-l border-white/5">
      
      {/* Header with Tab Buttons */}
      <div className="p-6 pb-4 bg-[#120025] z-10">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "signup"
                ? "bg-white text-purple-900 shadow-lg"
                : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            Sign Up
          </button>

          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "login"
                ? "bg-[#2d1f4a] text-white border border-purple-500"
                : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            Log In
          </button>
        </div>
      </div>

      {/* Sliding Content Area */}
      <div className="flex-1 relative overflow-hidden w-full">
        <div 
          className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${
            activeTab === "login" ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >

          {/* LOGIN FORM */}
          <div className="w-1/2 h-full px-6 overflow-y-auto pb-10 custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6 mt-2">Login to your account</h2>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email (login)"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 bg-[#2d1f4a] text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400 text-sm"
              />
              {loginSubmitted && !loginEmail && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 bg-[#2d1f4a] text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400 text-sm"
              />
              {loginSubmitted && !loginPassword && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
                <input 
                  type="checkbox" 
                  checked={stayLogged}
                  onChange={() => setStayLogged(!stayLogged)}
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer" 
                />
                Stay logged
              </label>
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Forgot password?</a>
            </div>

            <button 
              onClick={handleLoginSubmit}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-purple-900 font-bold rounded-lg transition-all active:scale-[0.98]"
            >
              Log In
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-gray-700 flex-1"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="h-px bg-gray-700 flex-1"></div>
            </div>

            <button className="w-full py-3 bg-white text-black font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors text-sm">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
          </div>

          {/* SIGN UP FORM */}
          <div className="w-1/2 h-full px-6 overflow-y-auto pb-10 custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6 mt-2">Open an account</h2>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email (login)"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full p-3 bg-[#2d1f4a] text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400 text-sm"
              />
              {signupSubmitted && !signupEmail && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full p-3 bg-[#2d1f4a] text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-400 text-sm"
              />
              {signupSubmitted && !signupPassword && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <div className="mb-4">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 bg-[#2d1f4a] text-white rounded-lg outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer text-sm"
              >
                <option value="INR">INR (Account currency)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-500 bg-transparent checked:bg-purple-600 checked:border-purple-600 transition-all mt-1"
                  />
                  <svg className="pointer-events-none absolute left-1/2 top-1/2 mt-0.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 3.5L3.5 6L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-400 text-sm leading-snug group-hover:text-gray-300 transition-colors">
                  Please, confirm that you accept the <a href="#" className="text-orange-400 hover:underline">Terms</a>, <a href="#" className="text-orange-400 hover:underline">Bonus Rules</a> and <a href="#" className="text-orange-400 hover:underline">Risk Statement</a>
                </span>
              </label>
              {signupSubmitted && !acceptTerms && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>

            <button 
              onClick={handleSignupSubmit}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-purple-900 font-bold rounded-lg transition-all active:scale-[0.98]"
            >
              Sign Up
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-gray-700 flex-1"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="h-px bg-gray-700 flex-1"></div>
            </div>

            <button className="w-full py-3 bg-white text-black font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors text-sm">
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
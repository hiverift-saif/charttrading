// src/App.jsx (Ya jahan bhi aapka Router hai)

import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';

// --- 🚀 AUTO LOGOUT GUARD COMPONENT ---
const GlobalAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkTokens = () => {
      // 1. Apne saare tokens ki list yahan define karo
      const authConfigs = [
        { tokenKey: 'access_token', loginPath: '/login' },
        { tokenKey: 'admin_token', loginPath: '/adminlogin' },
        { tokenKey: 'affiliate_token', loginPath: '/AffiliateLogin' }
      ];

      authConfigs.forEach(({ tokenKey, loginPath }) => {
        const token = localStorage.getItem(tokenKey);
        
        if (token) {
          try {
            // JWT ko decode karke expiry nikalna (atob base64 decode karta hai)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            
            const expiryTime = payload.exp * 1000; // ms mein convert kiya
            const currentTime = Date.now();

            // 🚀 Agar time khatam ho gaya hai
            if (currentTime >= expiryTime) {
              console.warn(`Session Expired for: ${tokenKey}`);
              
              localStorage.removeItem(tokenKey); // Token delete karo
              
              // Agar user usi folder/section mein hai, toh use logout karo
              // Example: path '/admin/dashboard' hai aur 'admin_token' expire hua
              const section = tokenKey.split('_')[0]; // 'admin' ya 'access' ya 'affiliate'
              if (location.pathname.toLowerCase().includes(section) || 
                  (section === 'access' && !location.pathname.includes('admin') && !location.pathname.includes('affiliate'))) {
                navigate(`${loginPath}?session=expired`);
              }
            }
          } catch (e) {
            // Agar token kharab hai toh clear kar do
            localStorage.removeItem(tokenKey);
          }
        }
      });
    };

    // Har route change par check karega
    checkTokens();

    // Background mein har 5 second mein check karega
    const interval = setInterval(checkTokens, 5000);
    return () => clearInterval(interval);
  }, [location.pathname, navigate]);

  return null;
};


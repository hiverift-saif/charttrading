import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("site_theme");
    // Agar "dark" save hai ya pehli baar aaye ho (saved null), toh dark rakho
    return saved === null ? true : saved === "dark";
  });

  // 🚀 Toggle function jo aap Header mein call kar sako
  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem("site_theme", "dark");
    } else {
      root.classList.remove('dark');
      localStorage.setItem("site_theme", "light");
    }
  }, [darkMode]);

  return (
    // 🚀 toggleTheme ko bhi value mein pass kiya
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
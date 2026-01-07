import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// --- REDUX IMPORTS ---
import { Provider } from 'react-redux';
import { store } from './redux/store';

// --- THEME CONTEXT IMPORT (Ye add karein) ---
import { ThemeProvider } from './context/ThemeContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 🚀 ThemeProvider ko Redux Provider ke andar wrap karein */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
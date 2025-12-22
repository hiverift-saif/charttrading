// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// --- REDUX IMPORTS (Ye add karein) ---
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Puri App ko Provider ke andar wrap karein */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
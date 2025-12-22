// File: src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import tradingReducer from './tradingSlice'; // Ye upar wali file ko import karega

export const store = configureStore({
  reducer: {
    trading: tradingReducer,
  },
});
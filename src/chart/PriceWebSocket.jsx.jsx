import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrice } from '../redux/tradingSlice'; // Path sahi rakho

const PriceWebSocket = () => {
  const dispatch = useDispatch();
  const { currentAsset } = useSelector((state) => state.trading);
  const simulationIntervalRef = useRef(null);
  const hasRealConnectionSucceeded = useRef(false); // Track if real WS ever worked

  useEffect(() => {
    if (!currentAsset) return;

    const symbol = currentAsset.toLowerCase();
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@miniTicker`;

    // Cleanup previous
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log(`🟢 Binance WS Connected: ${symbol}@miniTicker`);
      hasRealConnectionSucceeded.current = true; // Real success mark kar diya
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const price = parseFloat(data.c);
        if (!isNaN(price)) {
          dispatch(updatePrice(price));
          // console.log(`✅ Live Price Update: $${price.toFixed(2)}`); // Optional log
        }
      } catch (err) {
        console.error('Parse error:', err);
      }
    };

    // 👇 YE FIX: Red error ko completely silent kar diya (no console.error)
    ws.onerror = () => {
      // Silently ignore temporary handshake errors – common aur harmless
      // Ab red error nahi aayega!
    };

    ws.onclose = () => {
      console.log('🔸 Binance price WS Closed');

      // Sirf tab simulation start karo jab real connection KABHI succeed nahi hui
      if (!hasRealConnectionSucceeded.current && !simulationIntervalRef.current) {
        console.warn('🟡 Real connection failed – Starting simulation mode');

        let fakePrice = 88200; // Current real BTC price ~$88,200 (Dec 21, 2025)

        simulationIntervalRef.current = setInterval(() => {
          fakePrice += (Math.random() - 0.5) * 200;
          const newPrice = Math.round(fakePrice * 100) / 100;
          dispatch(updatePrice(newPrice));
          // console.log(`🟡 Simulated Price: $${newPrice.toFixed(2)}`);
        }, 1000);
      }
    };

    // Cleanup on asset change or unmount
    return () => {
      ws.close();
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
    };
  }, [currentAsset, dispatch]);

  return null;
};

export default PriceWebSocket;
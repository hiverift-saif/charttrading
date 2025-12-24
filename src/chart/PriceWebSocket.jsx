import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePrice } from '../redux/tradingSlice';

const PriceWebSocket = () => {
  const dispatch = useDispatch();
  const { currentAsset, currentPrice } = useSelector((state) => state.trading);
  const wsRef = useRef(null);
  const simulationIntervalRef = useRef(null);
  
  // ✅ Price ko ref mein rakha hai taaki function payload ka error na aaye
  const latestPriceRef = useRef(currentPrice);
  useEffect(() => {
    latestPriceRef.current = currentPrice;
  }, [currentPrice]);

  useEffect(() => {
    if (!currentAsset) return;

    // Symbol cleaning: "SOLANA" -> "sol", "GBP/USD" -> "gbpusd"
    let symbol = currentAsset.toLowerCase()
      .replace("/usd", "").replace("/", "")
      .split("-")[0].trim();

    // Mapping for full names
    const nameMap = { "bitcoin": "btc", "ethereum": "eth", "solana": "sol", "ripple": "xrp" };
    const base = nameMap[symbol] || symbol;
    const finalWsSymbol = base.endsWith("usdt") ? base : `${base}usdt`;
    
    // const wsUrl = `wss://stream.binance.com:9443/ws/${finalWsSymbol}@miniTicker`;
    const wsUrl = `wss://stream.binance.com:9443/ws/${finalWsSymbol}@aggTrade`;

    if (wsRef.current) wsRef.current.close();
    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

 ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const price = parseFloat(data.p); // aggTrade mein price 'p' key mein hoti hai
  if (!isNaN(price)) {
    dispatch(updatePrice(price));
  }
};

    ws.onerror = () => startSimulation();

    const startSimulation = () => {
      if (simulationIntervalRef.current) return;
      simulationIntervalRef.current = setInterval(() => {
        const change = (Math.random() - 0.5) * (latestPriceRef.current * 0.001);
        const newPrice = latestPriceRef.current + change;
        dispatch(updatePrice(Number(newPrice.toFixed(2)))); // ✅ Fixed number
      }, 1000);
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    };
  }, [currentAsset]);

  return null;
};

export default PriceWebSocket;
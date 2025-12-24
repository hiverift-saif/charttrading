import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import AssetSelector from "../chart/AssetSelector";

const ChartArea = () => {
  const containerRef = useRef(null);
  const { currentAsset } = useSelector((state) => state.trading);

const symbol = useMemo(() => {
  // 1. Agar koi asset select nahi hai, toh default BINANCE:BTCUSDT dikhao
  if (!currentAsset || currentAsset === "BTCUSDT") return "BINANCE:BTCUSDT";

  // 2. Name clean karein (e.g., "SOL/USD-OTC" -> "SOLUSD")
  let clean = currentAsset.toUpperCase()
    .replace("/USD", "")
    .replace("/", "")
    .split("-")[0]
    .trim();

  // 3. Crypto check (Inke liye hamesha BINANCE exchange chahiye)
  const cryptos = ["BTC", "ETH", "SOL", "XRP", "ADA", "DOGE", "LTC", "MATIC"];
  const isCrypto = cryptos.some(coin => clean.includes(coin)) || clean === "BITCOIN" || clean === "ETHEREUM";

  if (isCrypto) {
    // Mapping for full names
    const mapping = { "BITCOIN": "BTC", "ETHEREUM": "ETH", "SOLANA": "SOL" };
    const base = mapping[clean] || clean;
    
    // Binance format: Symbol + USDT
    const finalCrypto = base.endsWith("USDT") ? base : base + "USDT";
    return `BINANCE:${finalCrypto}`;
  }

  // 4. Forex check (Inke liye FX_IDC exchange sahi hai)
  if (clean.length === 6) {
    return `FX_IDC:${clean}`;
  }

  // Default Fallback
  return `BINANCE:BTCUSDT`;
}, [currentAsset]);




  useEffect(() => {
    // Variable to track if component is mounted
    let isMounted = true;
    const currentContainer = containerRef.current;

    if (!currentContainer) return;

    // Har baar naya container clear karein
    currentContainer.innerHTML = "";

    // 2. querySelector error fix: Timeout ensure karta hai ki DOM ready hai
    const timeoutId = setTimeout(() => {
      if (!isMounted || !currentContainer) return;

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.type = "text/javascript";

      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol,
        interval: "1",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        allow_symbol_change: false,
        enable_publishing: false,
        hide_side_toolbar: false,
        backgroundColor: "#131722",
        gridColor: "rgba(242,242,242,0.06)",
        // Container ID specify karna better hai
        container_id: "tv-chart-container" 
      });

      currentContainer.appendChild(script);
    }, 150); // 150ms ka delay React lifecycle errors se bachata hai

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
<div className="relative w-full h-full overflow-hidden bg-black">
      
      {/* FIXED POSITIONING FOR MOBILE & DESKTOP 
          1. z-[999] ensure karta hai ki TradingView iframe ke upar rahe.
          2. Mobile (default): top-4 left-4 (adjust as needed).
          3. Desktop (md): Screen ke center mein.
          4. pointer-events-auto: Taaki clicks miss na hon.
      */}
      <div className="absolute top-30 left-15 md:top-2 md:left-1/2 md:-translate-x-1/2 z-[999] pointer-events-auto">
        <AssetSelector />
      </div>

      {/* TradingView Container */}
      <div
      id="tv-chart-container"
        ref={containerRef}
        className="w-full h-full tradingview-widget-container"
      />
    </div>
  );
};

export default ChartArea;

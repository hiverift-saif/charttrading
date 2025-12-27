import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import AssetSelector from "../chart/AssetSelector";

const ChartArea = () => {
  const containerRef = useRef(null);
  const { currentAsset } = useSelector((state) => state.trading);

  const symbol = useMemo(() => {
    if (!currentAsset?.name) return "BINANCE:BTCUSDT";

    const base = currentAsset.name.toUpperCase().trim();

    const binancePairs = {
      BTC: "BTCUSDT",
      ETH: "ETHUSDT",
      SOL: "SOLUSDT",
      XRP: "XRPUSDT",
      DOGE: "DOGEUSDT",
      ADA: "ADAUSDT",
      PEPE: "PEPEUSDT",
      SHIB: "SHIBUSDT",
      TON: "TONUSDT",
      AVAX: "AVAXUSDT",
      LINK: "LINKUSDT",
      TRX: "TRXUSDT",
      LTC: "LTCUSDT",
      BNB: "BNBUSDT",
      MATIC: "MATICUSDT",
      DOT: "DOTUSDT",
      UNI: "UNIUSDT",
    };

    return binancePairs[base] ? `BINANCE:${binancePairs[base]}` : "BINANCE:BTCUSDT";
  }, [currentAsset]);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;
    currentContainer.innerHTML = "";

    const timeoutId = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol,
        interval: "1",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: false,
        container_id: "tv_chart_main",
        backgroundColor: "#131722",
        gridColor: "rgba(242,242,242,0.06)",
      });
      currentContainer.appendChild(script);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      if (currentContainer) currentContainer.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <div className="absolute top-30 left-15 md:top-2 md:left-1/2 md:-translate-x-1/2 z-[999] pointer-events-auto">
        <AssetSelector />
      </div>

      <div
        id="tv-chart-container"
        ref={containerRef}
        className="w-full h-full tradingview-widget-container"
      />
    </div>
  );
};

export default ChartArea;
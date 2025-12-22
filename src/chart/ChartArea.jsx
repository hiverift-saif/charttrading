import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import AssetSelector from '../chart/AssetSelector';

const ChartArea = () => {
  const chartRef = useRef(null);
  const { currentAsset } = useSelector((state) => state.trading);

  const mapToTradingViewSymbol = (asset) => {
    if (!asset) return "BINANCE:BTCUSDT";
    if (asset.endsWith("USDT")) return `BINANCE:${asset}`;
    if (asset.length === 6) return `FX_IDC:${asset}`;
    return "BINANCE:BTCUSDT";
  };

  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: mapToTradingViewSymbol(currentAsset),
      interval: "1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: false,
      hide_side_toolbar: false,
      backgroundColor: "#131722",
      gridColor: "rgba(242,242,242,0.06)",
      container_id: "tv_chart_container",
    });

    chartRef.current.appendChild(script);
  }, [currentAsset]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 🔥 Custom Asset Selector (RESPONSIVE SAFE) */}
      <div
        className="
          absolute
          top-[8px]
          left-2                /* 📱 Mobile */
          sm:left-2
          md:left-[140px]       /* 💻 Tablet / small desktop */
          lg:left-[450px]       /* 🖥️ Large desktop */
          z-[50]
          pointer-events-auto
        "
      >
        <AssetSelector />
      </div>

      {/* TradingView Chart */}
      <div
        id="tv_chart_container"
        ref={chartRef}
        className="w-full h-full tradingview-widget-container"
      />
    </div>
  );
};

export default ChartArea;

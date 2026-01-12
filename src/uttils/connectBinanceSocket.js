export const connectBinanceSocket = (symbol, onPrice) => {
  if (!symbol) {
    console.error("❌ Symbol missing");
    return null;
  }

  const cleanSymbol = symbol.toLowerCase();

  const url = `wss://stream.binance.com:9443/ws/${cleanSymbol}@trade`;


  const ws = new WebSocket(url);

  ws.onopen = () => {
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // trade price
    if (data && data.p) {
      onPrice(Number(data.p));
    }
  };

  ws.onerror = (err) => {
    console.error("❌ WS error", err);
  };

  ws.onclose = (event) => {
    console.warn("⚠️ WS closed", event.code, event.reason);
  };

  return ws;
};



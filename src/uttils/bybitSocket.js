// src/utils/bybitSocket.js
export const connectBybitSocket = (symbol, onPrice) => {
  if (!symbol) return null;

  const ws = new WebSocket("wss://stream.bybit.com/v5/public/spot");

  ws.onopen = () => {
    console.log("✅ Bybit WS connected");

    ws.send(
      JSON.stringify({
        op: "subscribe",
        args: [`publicTrade.${symbol.toUpperCase()}`],
      })
    );
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    const trade = msg?.data?.[0];
    if (trade?.p) {
      onPrice(Number(trade.p));
    }
  };

  ws.onerror = (err) => {
    console.error("❌ Bybit WS error", err);
  };

  ws.onclose = () => {
    console.warn("⚠️ Bybit WS closed");
  };

  return ws;
};

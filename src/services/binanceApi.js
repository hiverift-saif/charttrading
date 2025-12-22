// services/binanceApi.js
class BinanceApi {
  constructor() {
    this.proxyUrl = 'https://api.allorigins.win/get?url=';
    this.baseUrl = 'https://api.binance.com';
    this.wsBaseUrl = 'wss://stream.binance.com:9443/ws';
    this.ws = null;
  }

  async fetchKlines(symbol, interval = '1d', limit = 500) {
    const targetUrl = `${this.baseUrl}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const finalUrl = `${this.proxyUrl}${encodeURIComponent(targetUrl)}`;

    try {
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const wrapper = await response.json();
      const data = JSON.parse(wrapper.contents);
      
      return data.map(item => ({
        Date: Number(item[0]),
        Open: parseFloat(item[1]),
        High: parseFloat(item[2]),
        Low: parseFloat(item[3]),
        Close: parseFloat(item[4]),
        Volume: parseFloat(item[5])
      }));
    } catch (error) {
      console.error('Binance API Error:', error);
      throw error;
    }
  }

  connectWebSocket(symbol, interval, onMessage) {
    this.disconnectWebSocket();
    const streamName = `${symbol.toLowerCase()}@kline_${interval}`;
    this.ws = new WebSocket(`${this.wsBaseUrl}/${streamName}`);
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.k) {
        onMessage({
          Date: msg.k.t,
          Open: parseFloat(msg.k.o),
          High: parseFloat(msg.k.h),
          Low: parseFloat(msg.k.l),
          Close: parseFloat(msg.k.c),
          Volume: parseFloat(msg.k.v),
          isClosed: msg.k.x
        });
      }
    };
  }

  disconnectWebSocket() {
    if (this.ws) { this.ws.close(); this.ws = null; }
  }
}
export default new BinanceApi();
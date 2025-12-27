import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 10000,
  currentAsset: {
    name: "BTC",
    displayName: "BTC/USD",
    id: "bitcoin",
    icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png"
  },
  payoutPercentage: 82,
  tradeAmount: 10,
  tradeTime: 60,
  chartType: "candle",
  timeframe: "1",
  openTrades: [],
  tradeHistory: [],
  currentPrice: 0,
};

export const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    setTradeAmount: (state, action) => {
      state.tradeAmount = action.payload;
    },
    setAsset: (state, action) => {
      state.currentAsset = action.payload;
    },
    setPayoutPercentage: (state, action) => {
      state.payoutPercentage = action.payload;
    },
    setTradeTime: (state, action) => {
      state.tradeTime = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setTimeframe: (state, action) => {
      state.timeframe = action.payload;
    },
    addOpenTrade: (state, action) => {
      const trade = action.payload;
      state.openTrades.push(trade);
      state.balance -= Number(trade.amount);
    },
    updatePrice: (state, action) => {
      state.currentPrice = action.payload;
    },
    closeTrade: (state, action) => {
      const { id, isWin, profitAmount } = action.payload;
      const index = state.openTrades.findIndex(t => t.id === id);
      if (index !== -1) {
        const finishedTrade = {
          ...state.openTrades[index],
          status: isWin ? 'WIN' : 'LOSS',
          profit: profitAmount,
        };
        state.tradeHistory.unshift(finishedTrade);
        state.openTrades.splice(index, 1);
        if (isWin) state.balance += profitAmount;
      }
    },
  },
});

export const {
  setTradeAmount,
  setAsset,
  setPayoutPercentage,
  setTradeTime,
  setChartType,
  setTimeframe,
  addOpenTrade,
  closeTrade,
  updatePrice,
} = tradingSlice.actions;

export default tradingSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 10000,         // Real Account Balance
  demoBalance: 50000,     // Demo Account Balance
  accountType: 'real',    // 'real' or 'demo'
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
  isSyncing: false,       // 🚀 Naya: Wallet update ko lock karne ke liye
};

export const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    // 🚀 Naya: Syncing lock toggle karne ke liye
    setSyncing: (state, action) => {
      state.isSyncing = action.payload;
    },

    setAccountType: (state, action) => {
      state.accountType = action.payload;
    },

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

setBalance: (state, action) => {
    state.balance = Number(action.payload);
    localStorage.setItem('temp_balance', action.payload); // Backup rakhein
},

    addOpenTrade: (state, action) => {
      const trade = {
        ...action.payload,
        accountUsed: state.accountType // Kaunsa wallet use hua track karein
      };
      
      state.openTrades.push(trade);

      // Balance deduction logic
      if (state.accountType === 'demo') {
        state.demoBalance -= Number(trade.amount);
      } else {
        state.balance -= Number(trade.amount);
      }
    },

    updatePrice: (state, action) => {
      state.currentPrice = action.payload;
    },

    updateDemoBalance: (state, action) => {
      // 🚀 Check: Same logic for demo balance
      if (state.isSyncing) return;
      state.demoBalance = Number(action.payload);
    },

    closeTrade: (state, action) => {
      const { id, isWin, profitAmount } = action.payload;
      const index = state.openTrades.findIndex(t => t.id === id);
      
      if (index !== -1) {
        const tradeData = state.openTrades[index];
        const finishedTrade = {
          ...tradeData,
          status: isWin ? 'WIN' : 'LOSS',
          profit: profitAmount,
        };

        state.tradeHistory.unshift(finishedTrade);
        state.openTrades.splice(index, 1);

        if (isWin) {
          // Profit sahi wallet mein add karein
          if (tradeData.accountUsed === 'demo') {
            state.demoBalance += profitAmount;
          } else {
            state.balance += profitAmount;
          }
        }
      }
    },
  },
});

export const {
  setAccountType,
  setSyncing,        // 🚀 Exported
  setTradeAmount,
  setAsset,
  setPayoutPercentage,
  setTradeTime,
  setChartType,
  setTimeframe,
  addOpenTrade,
  closeTrade,
  updatePrice,
  setBalance,
  updateDemoBalance
} = tradingSlice.actions;

export default tradingSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 10000,        // Real Account Balance
  demoBalance: 50000,    // Demo Account Balance (Added)
  accountType: 'real',   // 'real' or 'demo' (Added)
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
    // --- Added: Reducer to switch between Real and Demo ---
    setAccountType: (state, action) => {
      state.accountType = action.payload; // action.payload must be 'real' or 'demo'
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
  // 🚀 Force update
  console.log("Redux updating real balance to:", action.payload);
  state.balance = Number(action.payload);
},
    // --- Modified: Logic to deduct money based on accountType ---
    addOpenTrade: (state, action) => {
      const trade = {
        ...action.payload,
        accountUsed: state.accountType // Track which account was used for this trade
      };
      
      state.openTrades.push(trade);

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
  console.log("Redux updating demo balance to:", action.payload);
  state.demoBalance = Number(action.payload);
},
    // --- Modified: Logic to add profit based on accountUsed in that trade ---
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
          // Check which account was used when the trade was opened
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
  setAccountType, // Export new action
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
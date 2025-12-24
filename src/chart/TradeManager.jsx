import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeTrade } from '../redux/tradingSlice';

const TradeManager = () => {
  const dispatch = useDispatch();
  const { openTrades, currentPrice } = useSelector(state => state.trading);

// Is logic ko update kar TradeManager.jsx mein:
useEffect(() => {
  const checkTrades = () => {
    const now = Date.now();
    openTrades.forEach(trade => {
      if (now >= trade.expiryTime) {
        const isWin = (trade.direction === 'UP' && currentPrice > trade.entryPrice) || 
                      (trade.direction === 'DOWN' && currentPrice < trade.entryPrice);

        const profitAmount = isWin ? trade.amount * (1 + trade.payout / 100) : 0;
        dispatch(closeTrade({ id: trade.id, isWin, profitAmount }));
      }
    });
  };

  const timer = setInterval(checkTrades, 1000);
  return () => clearInterval(timer);
}, [openTrades, currentPrice, dispatch]); // Yeh zaroori hai

  return null;
};
export default TradeManager;
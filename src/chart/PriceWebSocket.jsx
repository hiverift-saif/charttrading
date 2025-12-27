import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrice } from "../redux/tradingSlice";

const PriceWebSocket = () => {
  const dispatch = useDispatch();
  const { currentAsset } = useSelector((state) => state.trading);

  useEffect(() => {
    if (!currentAsset?.symbol) {
      dispatch(updatePrice(0));
      return;
    }

    // Binance WebSocket endpoint → real-time stream
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${currentAsset.symbol.toLowerCase()}usdt@trade`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const livePrice = Number(data.p);

      if (livePrice) {
        dispatch(updatePrice(Math.round(livePrice * 100) / 100));
      }
    };

    ws.onerror = () => {
      console.log("WebSocket error");
    };

    return () => ws.close();
  }, [currentAsset?.symbol, dispatch]);

  return null;
};

export default PriceWebSocket;

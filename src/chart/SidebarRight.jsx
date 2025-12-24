import React from 'react';
import TradePanel from '../chart/TradePanel';
import IconStrip from '../chart/IconStrip';

const SidebarRight = () => {
  return (
    <aside className="hidden lg:flex w-95 bg-[#161413] border-l border-gray-800 flex-row h-full text-gray-300 relative select-none">
      <TradePanel />
      <IconStrip />
    </aside>
  );
};

export default SidebarRight;
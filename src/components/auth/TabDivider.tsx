
import React from 'react';

const TabDivider = () => {
  return (
    <div className="flex items-center my-2">
      <div className="flex-grow border-t border-[#eaeaea]"></div>
      <span className="px-3 text-xs text-[#999] font-medium">OR</span>
      <div className="flex-grow border-t border-[#eaeaea]"></div>
    </div>
  );
};

export default TabDivider;

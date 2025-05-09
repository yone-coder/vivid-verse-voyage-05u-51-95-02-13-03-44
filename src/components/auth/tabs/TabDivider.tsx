
import React from 'react';

const TabDivider = () => {
  return (
    <div className="w-full flex items-center justify-center my-3">
      <div className="h-px bg-gray-200 flex-1"></div>
      <span className="px-3 text-xs text-gray-400">or continue with</span>
      <div className="h-px bg-gray-200 flex-1"></div>
    </div>
  );
};

export default TabDivider;

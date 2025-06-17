
import React from 'react';
import { Globe, Search } from 'lucide-react';

const TransferHeader: React.FC = () => {
  return (
    <div className="bg-blue-600">
      <div className="flex items-center justify-between px-4 py-2 h-12">
        {/* Logo placeholder */}
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
          <Globe className="w-4 h-4 text-blue-600" />
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold text-white">
          GLOBAL TRANSFÈ
        </h1>

        {/* Search icon */}
        <button className="p-1.5 rounded-full hover:bg-blue-700">
          <Search className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TransferHeader;

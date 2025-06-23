
import React from 'react';

export default function CompactInfoComponent() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Text Information */}
      <div className="text-center mb-8 space-y-2">
        <p className="text-lg font-light text-gray-900 tracking-wide">
          Made in <span className="font-medium">Désarmes</span> with <span className="text-red-500">❤️</span>
        </p>
      </div>
      
      {/* Trusted Partners Section */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-4 tracking-wide">TRUSTED PARTNERS</h3>
        <div className="space-y-3">
          {/* First Row */}
          <div className="flex justify-center items-center space-x-4">
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">MCI</span>
            </div>
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">SOGEBANK</span>
            </div>
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">BRH</span>
            </div>
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">KPD</span>
            </div>
          </div>
          {/* Second Row */}
          <div className="flex justify-center items-center space-x-4">
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">Wise</span>
            </div>
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">PayPal</span>
            </div>
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">Zelle</span>
            </div>
            <div className="w-20 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium text-gray-400">KAPOSOV</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

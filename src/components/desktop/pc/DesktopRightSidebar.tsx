
import React from 'react';
import { TrendingUp, Clock, Users, Gift } from 'lucide-react';

const DesktopRightSidebar = () => {
  const trendingItems = [
    { name: "Wireless Earbuds", trend: "+15%" },
    { name: "Smart Watch", trend: "+12%" },
    { name: "Laptop Stand", trend: "+8%" },
    { name: "USB-C Hub", trend: "+5%" }
  ];

  const recentActivity = [
    { user: "John D.", action: "purchased iPhone Case", time: "2m ago" },
    { user: "Sarah M.", action: "added Wireless Charger", time: "5m ago" },
    { user: "Mike R.", action: "reviewed Smart Watch", time: "8m ago" },
    { user: "Lisa K.", action: "wishlist Laptop", time: "12m ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Trending Products */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h3 className="text-sm font-semibold text-gray-800">Trending Now</h3>
        </div>
        <div className="space-y-3">
          {trendingItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-xs text-green-500 font-medium">{item.trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-blue-500" />
          <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="text-xs">
              <div className="font-medium text-gray-700">{activity.user}</div>
              <div className="text-gray-500">{activity.action}</div>
              <div className="text-gray-400">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Stats */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-purple-500" />
          <h3 className="text-sm font-semibold text-gray-800">Live Stats</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Online Users</span>
            <span className="text-sm font-medium text-purple-500">1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Sales</span>
            <span className="text-sm font-medium text-green-500">89</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Orders</span>
            <span className="text-sm font-medium text-orange-500">156</span>
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="h-5 w-5" />
          <h3 className="text-sm font-semibold">Special Offers</h3>
        </div>
        <div className="text-xs mb-3">
          Get 20% off your next purchase with code DESKTOP20
        </div>
        <button className="w-full bg-white text-orange-500 py-2 px-3 rounded font-medium text-xs hover:bg-gray-100 transition-colors">
          Claim Offer
        </button>
      </div>
    </div>
  );
};

export default DesktopRightSidebar;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Calendar, TrendingUp, Users, Gift } from 'lucide-react';

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
      {/* Haiti News & Updates Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-blue-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Haiti News & Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
              <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm mb-1">Economic updates affecting transfers</h4>
                <p className="text-xs text-gray-600">USD/HTG exchange rate remains stable at 127.5. Transfer fees unchanged for December.</p>
                <Badge variant="secondary" className="mt-2 text-xs">Economic</Badge>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-200">
              <Calendar className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm mb-1">Holiday schedules for pickup locations</h4>
                <p className="text-xs text-gray-600">Extended hours during New Year week. Most locations open until 8 PM Dec 28-30.</p>
                <Badge variant="secondary" className="mt-2 text-xs bg-green-100 text-green-800">Holiday Schedule</Badge>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-orange-200">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm mb-1">Service disruption notifications</h4>
                <p className="text-xs text-gray-600">Temporary delays in Port-au-Prince area due to infrastructure maintenance. Allow extra 24-48 hours.</p>
                <Badge variant="secondary" className="mt-2 text-xs bg-orange-100 text-orange-800">Service Alert</Badge>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-blue-200">
            <p className="text-xs text-blue-700 text-center">
              <Clock className="h-3 w-3 inline mr-1" />
              Last updated 2 hours ago
            </p>
          </div>
        </CardContent>
      </Card>

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

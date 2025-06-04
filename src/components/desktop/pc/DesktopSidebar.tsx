
import React from 'react';
import { ArrowRight, PhoneCall, Tv, CreditCard, Gift, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DesktopSidebar = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <ArrowRight className="h-5 w-5 text-white" />,
      label: "Transfer Money",
      bgColor: "bg-green-500",
      route: "/multi-step-transfer-desktop"
    },
    {
      icon: <PhoneCall className="h-5 w-5 text-white" />,
      label: "Top Up",
      bgColor: "bg-blue-500",
      route: "/topup"
    },
    {
      icon: <Tv className="h-5 w-5 text-white" />,
      label: "Netflix",
      bgColor: "bg-red-600",
      route: "/netflix"
    },
    {
      icon: <CreditCard className="h-5 w-5 text-white" />,
      label: "Bill Pay",
      bgColor: "bg-purple-500",
      route: "/bills"
    },
    {
      icon: <Gift className="h-5 w-5 text-white" />,
      label: "Gift Cards",
      bgColor: "bg-pink-500",
      route: "/gift-cards"
    }
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Automotive",
    "Health & Beauty",
    "Toys & Games"
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.route)}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`${action.bgColor} p-2 rounded-lg mr-3`}>
                {action.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Categories</h3>
        <div className="space-y-1">
          {categories.map((category, index) => (
            <button
              key={index}
              className="w-full text-left p-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="bg-gray-500 p-2 rounded-lg mr-3">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default DesktopSidebar;

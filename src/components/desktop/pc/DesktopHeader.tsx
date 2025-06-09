
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Bell, Globe, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DesktopHeader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { label: 'Electronics', path: '/electronics' },
    { label: 'Fashion', path: '/fashion' },
    { label: 'Home & Living', path: '/home-living' },
    { label: 'Sports', path: '/sports-outdoors' },
    { label: 'Automotive', path: '/automotive' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-50 text-sm py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome to our store</span>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Deliver to: New York 10001</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Globe className="h-4 w-4 mr-1" />
              <span>EN / USD</span>
            </div>
            <span className="text-gray-600">Help & Support</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-orange-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            ShopHub
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
              <Heart className="h-6 w-6 mr-1" />
              <span className="hidden lg:block">Wishlist</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
              <User className="h-6 w-6 mr-1" />
              <span className="hidden lg:block">Account</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-orange-500 transition-colors relative">
              <Bell className="h-6 w-6 mr-1" />
              <span className="hidden lg:block">Notifications</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-orange-500 transition-colors relative">
              <ShoppingCart className="h-6 w-6 mr-1" />
              <span className="hidden lg:block">Cart</span>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <nav className="flex items-center space-x-8 py-3">
            <button 
              onClick={() => navigate('/for-you')}
              className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              For You
            </button>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <span className="text-red-500 font-medium">Flash Sale</span>
            <span className="text-green-500 font-medium">Free Shipping</span>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;

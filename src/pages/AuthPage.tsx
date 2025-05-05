import React, { useState } from 'react';
import { Eye, EyeOff, ChevronRight, Smartphone, Mail, Lock, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('email');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 py-2 px-4 text-center text-white text-xs md:text-sm">
        <span className="font-bold">NEW USER COUPON!</span> Sign up today and get $3 OFF your first order
      </div>
      
      <div className="relative flex-1 flex flex-col items-center justify-center p-6 z-10">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center shadow-lg">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <span className="ml-3 text-2xl font-bold text-red-600">ShopGlobal</span>
        </div>
        
        {/* Welcome text */}
        <div className="w-full max-w-md text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
          <p className="text-gray-500 mt-1 text-sm">Get access to exclusive deals and track your orders</p>
        </div>
        
        {/* Sign in methods tabs */}
        <div className="w-full max-w-md mb-4">
          <div className="flex justify-center border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => setActiveTab('email')}
              className={`flex-1 flex items-center justify-center py-3 ${activeTab === 'email' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Mail size={16} className="mr-2" />
              <span>Email</span>
            </button>
            <button 
              onClick={() => setActiveTab('phone')}
              className={`flex-1 flex items-center justify-center py-3 ${activeTab === 'phone' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Smartphone size={16} className="mr-2" />
              <span>Phone</span>
            </button>
          </div>
        </div>
        
        {/* Promo card */}
        <div className="w-full max-w-md mb-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center">
            <div className="bg-orange-100 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-orange-800">Members get <span className="font-bold">FREE SHIPPING</span> on orders over $15!</p>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="space-y-4">
            {activeTab === 'email' ? (
              <div className="relative">
                <label className="text-xs text-gray-500 ml-1 mb-1 block">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                  <Mail 
                    size={18} 
                    className="absolute text-gray-400 left-3 top-1/2 transform -translate-y-1/2" 
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <label className="text-xs text-gray-500 ml-1 mb-1 block">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                    placeholder="+1 (123) 456-7890"
                  />
                  <Smartphone 
                    size={18} 
                    className="absolute text-gray-400 left-3 top-1/2 transform -translate-y-1/2" 
                  />
                </div>
              </div>
            )}
            <div className="relative">
              <label className="text-xs text-gray-500 ml-1 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="••••••••"
                />
                <Lock 
                  size={18} 
                  className="absolute text-gray-400 left-3 top-1/2 transform -translate-y-1/2" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center cursor-pointer space-x-2">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="h-5 w-5 rounded border border-gray-300 peer-checked:bg-red-600 peer-checked:border-0"></div>
                  <div className="absolute hidden peer-checked:block top-0.5 left-0.5 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">Forgot password?</a>
            </div>
            
            <button 
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium shadow hover:bg-red-700 transition-all duration-300 mt-6 flex items-center justify-center"
            >
              Sign In
              <ArrowRight size={18} className="ml-2" />
            </button>
            
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-gray-500">OR CONTINUE WITH</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center border border-gray-200 hover:bg-gray-50 p-3 rounded-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button className="flex items-center justify-center border border-gray-200 hover:bg-gray-50 p-3 rounded-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/>
                </svg>
              </button>
              <button className="flex items-center justify-center border border-gray-200 hover:bg-gray-50 p-3 rounded-lg transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="text-center mt-6 text-gray-600">
            <p className="text-sm">Don't have an account? <a href="#" className="text-red-600 hover:text-red-700 font-medium">Sign up</a></p>
          </div>
        </div>
        
        {/* Additional promotions */}
        <div className="w-full max-w-md mt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center">
            <div className="bg-yellow-100 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-yellow-800">Download our app & get <span className="font-bold">$5 OFF</span> your first in-app purchase!</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar - mobile only */}
      <div className="md:hidden bg-white py-3 px-4 border-t border-gray-200 flex justify-between items-center mt-auto">
        <div className="text-xs">
          <p className="text-gray-500">24/7 Customer Service</p>
          <p className="text-red-600 font-medium">Help Center</p>
        </div>
        <button className="bg-red-600 p-2 rounded-full">
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}
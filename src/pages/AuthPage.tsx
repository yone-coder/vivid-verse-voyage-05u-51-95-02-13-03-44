import { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronRight, ArrowRight, Smartphone, Lock, Mail, Globe, AlertCircle, Fingerprint } from 'lucide-react';

export default function UltraModernLogin() {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempted with:', activeTab === 'email' ? { email, password } : { phone, password });
    }, 1500);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 font-sans transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 scale-100 hover:scale-[1.01] max-w-4xl bg-white">
        {/* Header with logo */}
        <div className="px-8 pt-10 pb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="bg-orange-500 text-white font-bold text-xl px-3 py-1 rounded shadow-sm">Ali</div>
              <div className="text-orange-500 font-bold text-xl ml-2">Express</div>
            </div>
            <div className="flex items-center text-sm bg-gray-50 rounded-full px-4 py-1 cursor-pointer hover:bg-gray-100 transition-colors">
              <Globe className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-gray-600">EN</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h1>
          <p className="text-gray-500 text-base">Sign in to continue shopping</p>
        </div>

        {/* Login tabs */}
        <div className="flex px-8 mt-2 border-b">
          <button
            onClick={() => setActiveTab('email')}
            className={`pb-3 px-5 text-base font-semibold transition-all relative ${
              activeTab === 'email'
                ? 'text-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Email
            {activeTab === 'email' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-t-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('phone')}
            className={`pb-3 px-5 text-base font-semibold transition-all relative ${
              activeTab === 'phone'
                ? 'text-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Phone
            {activeTab === 'phone' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-t-full"></span>
            )}
          </button>
        </div>

        {/* Login Form Fields */}
        <form onSubmit={handleSubmit} className="px-8 py-8">
          <div className={`transition-all duration-300 ${activeTab === 'email' ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden absolute'}`}>
            <div className="mb-6">
              <div className="relative group">
                <Mail className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-14 pr-4 py-4 bg-gray-50 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all border border-transparent focus:border-orange-500"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-300 ${activeTab === 'phone' ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden absolute'}`}>
            <div className="mb-6">
              <div className="relative flex group">
                <div className="flex items-center bg-gray-50 rounded-l-xl px-4 border-r border-gray-200 group-focus-within:bg-white transition-colors">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-transparent text-base text-gray-600 focus:outline-none py-4"
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+86">+86</option>
                    <option value="+91">+91</option>
                  </select>
                </div>
                <div className="relative flex-1">
                  <Smartphone className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full pl-14 pr-4 py-4 bg-gray-50 rounded-r-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all border border-transparent focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 mt-6">
            <div className="relative group">
              <Lock className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-14 pr-14 py-4 bg-gray-50 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all border border-transparent focus:border-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="relative inline-block w-12 mr-3 align-middle select-none">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={() => setRememberMe(!rememberMe)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div className="block bg-gray-200 w-12 h-7 rounded-full cursor-pointer"></div>
                <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 ease-in-out ${rememberMe ? 'transform translate-x-5 bg-orange-500' : ''}`}></div>
              </div>
              <label htmlFor="remember-me" className="block text-base text-gray-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>
            <div className="text-base">
              <a className="font-semibold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer select-none">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-orange-500 text-white font-semibold py-4 px-6 rounded-xl transition-all relative overflow-hidden"
          >
            <span className={`flex items-center transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              Sign in
              <ArrowRight className="ml-3 h-5 w-5" />
            </span>
            
            {isLoading && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Social logins */}
        <div className="px-8 pt-0 pb-8">
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t w-full absolute"></div>
            <span className="bg-white px-6 text-base text-gray-500 relative select-none">or continue with</span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <button className="flex justify-center items-center py-3 px-6 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button className="flex justify-center items-center py-3 px-6 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="flex justify-center items-center py-3 px-6 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="black">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Registration link */}
        <div className="px-8 py-6 bg-gray-50 flex items-center justify-between rounded-b-3xl">
          <p className="text-base text-gray-600 select-none">Don't have an account?</p>
          <a className="inline-flex items-center text-base font-semibold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer select-none group">
            Register now
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Safety notice */}
        <div className="p-6 bg-blue-50 flex items-start border-t border-blue-100 rounded-b-3xl">
          <AlertCircle className="h-6 w-6 text-blue-500 mt-1 mr-4 flex-shrink-0" />
          <p className="text-sm text-blue-700 select-text">
            For account security, never share your password or verification codes. AliExpress representatives will never ask for this information.
          </p>
        </div>
      </div>
      
      {/* Biometric login option - floating button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-white text-orange-500 rounded-full p-4 shadow-lg hover:bg-orange-50 transition-all flex items-center justify-center hover:scale-110 transform active:scale-95">
          <Fingerprint className="w-7 h-7" />
        </button>
      </div>

      {/* App download suggestion */}
      <div className="fixed bottom-6 left-6 sm:flex hidden">
        <button className="bg-white flex items-center rounded-full pl-4 pr-5 py-3 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-orange-500 p-2 rounded-full mr-3">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-semibold text-gray-700 select-none">Get our app</span>
        </button>
      </div>
    </div>
  );
}

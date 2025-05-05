import { useState, useEffect } from 'react';
import { 
  Eye, EyeOff, ChevronRight, ArrowRight, Smartphone, Lock, Mail, 
  AlertCircle, Fingerprint, UserPlus, Shield, Key, FileCheck, 
  Bell, Clock, Gift, Zap, HelpCircle, UserCheck, Info, CheckCircle,
  MessageSquare, Mail as EmailIcon, Coffee, Tablet
} from 'lucide-react';

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
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [deviceTrusted, setDeviceTrusted] = useState(false);
  const [accountRecoveryOpen, setAccountRecoveryOpen] = useState(false);
  const [lastLogin, setLastLogin] = useState('May 4, 2025 - 17:42');
  const [loginLocation, setLoginLocation] = useState('San Francisco, USA');

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
      setLoginAttempts(loginAttempts + 1);
      
      if (loginAttempts > 0) {
        setShowTwoFactor(true);
      } else {
        console.log('Login attempted with:', activeTab === 'email' ? { email, password } : { phone, password });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 font-sans transition-opacity duration-500 w-full">
      <div className="w-full flex flex-col">
        {/* Minimal Header */}
        <div className="px-6 pt-8 pb-4 max-w-5xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Secure Authentication</h1>
          <p className="text-gray-500 text-center mb-2">Access your account securely</p>
          <div className="flex justify-center mb-2">
            <div className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              <span>Enhanced security protocols active</span>
            </div>
          </div>
        </div>

        {/* Login methods */}
        <div className="flex max-w-5xl mx-auto w-full px-6 mt-2 border-b justify-center">  
          <button  
            onClick={() => setActiveTab('email')}  
            className={`pb-2 px-5 text-sm font-medium transition-all relative flex items-center ${  
              activeTab === 'email'  
                ? 'text-blue-600'  
                : 'text-gray-500 hover:text-gray-700'  
            }`}  
          >  
            <Mail className="h-4 w-4 mr-2" />
            Email  
            {activeTab === 'email' && (  
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>  
            )}  
          </button>  
          <button  
            onClick={() => setActiveTab('phone')}  
            className={`pb-2 px-5 text-sm font-medium transition-all relative flex items-center ${  
              activeTab === 'phone'  
                ? 'text-blue-600'  
                : 'text-gray-500 hover:text-gray-700'  
            }`}  
          >  
            <Smartphone className="h-4 w-4 mr-2" />
            Phone  
            {activeTab === 'phone' && (  
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>  
            )}  
          </button>
          <button  
            onClick={() => setActiveTab('fingerprint')}  
            className={`pb-2 px-5 text-sm font-medium transition-all relative flex items-center ${  
              activeTab === 'fingerprint'  
                ? 'text-blue-600'  
                : 'text-gray-500 hover:text-gray-700'  
            }`}  
          >  
            <Fingerprint className="h-4 w-4 mr-2" />
            Biometric  
            {activeTab === 'fingerprint' && (  
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>  
            )}  
          </button>  
        </div>  

        {/* Login Form Fields */}  
        <form onSubmit={handleSubmit} className="px-6 py-6 max-w-5xl mx-auto w-full">  
          {/* Last login info */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center">
            <Info className="h-4 w-4 text-blue-500 mr-2" />
            <div className="text-xs text-blue-700">
              <span className="font-medium">Last login:</span> {lastLogin} from {loginLocation}
            </div>
          </div>

          <div className={`transition-all duration-300 ${activeTab === 'email' ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden absolute'}`}>  
            <div className="mb-4">  
              <div className="relative group">  
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />  
                <input  
                  type="email"  
                  value={email}  
                  onChange={(e) => setEmail(e.target.value)}  
                  placeholder="Email address"  
                  className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"  
                  required  
                />  
              </div>  
            </div>  
          </div>  
            
          <div className={`transition-all duration-300 ${activeTab === 'phone' ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden absolute'}`}>  
            <div className="mb-4">  
              <div className="relative flex group">  
                <div className="flex items-center bg-gray-50 rounded-l-lg px-3 border-r border-gray-200 group-focus-within:bg-white transition-colors">  
                  <select  
                    value={countryCode}  
                    onChange={(e) => setCountryCode(e.target.value)}  
                    className="bg-transparent text-sm text-gray-600 focus:outline-none py-3"  
                  >  
                    <option value="+1">+1 (US)</option>  
                    <option value="+44">+44 (UK)</option>  
                    <option value="+86">+86 (CN)</option>  
                    <option value="+91">+91 (IN)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+33">+33 (FR)</option>
                    <option value="+81">+81 (JP)</option>
                  </select>  
                </div>  
                <div className="relative flex-1">  
                  <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />  
                  <input  
                    type="tel"  
                    value={phone}  
                    onChange={(e) => setPhone(e.target.value)}  
                    placeholder="Phone number"  
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"  
                    required  
                  />  
                </div>  
              </div>  
            </div>  
          </div>  

          <div className={`transition-all duration-300 ${activeTab === 'fingerprint' ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0 overflow-hidden absolute'}`}>  
            <div className="mb-4 flex flex-col items-center justify-center py-6">  
              <Fingerprint className="h-16 w-16 text-blue-600 mb-4" />
              <p className="text-gray-600 text-center mb-2">Use your fingerprint or face ID to sign in</p>
              <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Authenticate
              </button>
            </div>  
          </div>  

          {activeTab !== 'fingerprint' && (
            <div className="mb-4 mt-4">  
              <div className="relative group">  
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />  
                <input  
                  type={showPassword ? "text" : "password"}  
                  value={password}  
                  onChange={(e) => setPassword(e.target.value)}  
                  placeholder="Password"  
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"  
                  required  
                />  
                <button  
                  type="button"  
                  onClick={() => setShowPassword(!showPassword)}  
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"  
                >  
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}  
                </button>  
              </div>

              {/* Password strength meter */}
              <div className="mt-2">
                <div className="w-full h-1 flex space-x-1">
                  <div className="h-full rounded-full w-1/4 bg-green-500"></div>
                  <div className="h-full rounded-full w-1/4 bg-green-500"></div>
                  <div className="h-full rounded-full w-1/4 bg-green-500"></div>
                  <div className="h-full rounded-full w-1/4 bg-gray-200"></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-green-600">Strong password</span>
                  <span className="text-xs text-gray-400">Last changed: 22 days ago</span>
                </div>
              </div>
            </div>
          )}

          {/* 2FA Section */}
          <div className={`transition-all duration-300 ${showTwoFactor ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="mb-4 mt-4 p-4 border border-blue-100 rounded-lg bg-blue-50">
              <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Two-Factor Authentication Required
              </h3>
              <p className="text-xs text-blue-600 mb-3">
                We've sent a verification code to your {activeTab === 'email' ? 'email' : 'phone'}.
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 pl-3 pr-3 py-2 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 border border-blue-200"
                  required
                />
                <button 
                  type="button"
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Verify
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <button type="button" className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                  Resend code
                </button>
                <span className="text-xs text-gray-500">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Code expires in 4:59
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">  
            <div className="flex items-center">  
              <div className="relative inline-block w-10 mr-2 align-middle select-none">  
                <input   
                  id="remember-me"   
                  type="checkbox"   
                  checked={rememberMe}   
                  onChange={() => setRememberMe(!rememberMe)}  
                  className="absolute opacity-0 w-0 h-0"  
                />  
                <div className="block bg-gray-200 w-10 h-6 rounded-full cursor-pointer"></div>  
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${rememberMe ? 'transform translate-x-4 bg-orange-500' : ''}`}></div>  
              </div>  
              <label htmlFor="remember-me" className="block text-sm text-gray-600 cursor-pointer">  
                Remember me  
              </label>  
            </div>  
            <div className="text-sm">  
              <a className="font-medium text-orange-500 hover:text-orange-600 transition-colors cursor-pointer">  
                Forgot password?  
              </a>  
            </div>  
          </div>  

          <button  
            type="submit"  
            disabled={isLoading}  
            className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-white font-medium py-3 px-4 rounded-lg transition-all relative overflow-hidden"  
          >  
            <span className={`flex items-center transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>  
              Sign in  
              <ArrowRight className="ml-2 h-4 w-4" />  
            </span>  
              
            {isLoading && (  
              <span className="absolute inset-0 flex items-center justify-center">  
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">  
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>  
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>  
                </svg>  
              </span>  
            )}  
          </button>  
        </form>  

        {/* Social logins */}  
        <div className="px-6 pt-0 pb-6 max-w-4xl mx-auto w-full">  
          <div className="relative flex items-center justify-center my-4">  
            <div className="border-t w-full absolute"></div>  
            <span className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 text-sm text-gray-500 relative">or continue with</span>  
          </div>  

          <div className="grid grid-cols-3 gap-3">  
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md">  
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">  
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />  
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />  
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />  
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />  
              </svg>  
            </button>  
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md">  
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">  
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />  
              </svg>  
            </button>  
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md">  
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="black">  
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />  
              </svg>  
            </button>  
          </div>  
        </div>  

        {/* Registration link */}  
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between max-w-4xl mx-auto w-full">  
          <p className="text-sm text-gray-600">Don't have an account?</p>  
          <a className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors cursor-pointer group">  
            Register now  
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />  
          </a>  
        </div>  

        {/* Safety notice */}  
        <div className="p-4 bg-blue-50 flex items-start border-t border-blue-100 max-w-4xl mx-auto w-full">  
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />  
          <p className="text-xs text-blue-700">  
            For account security, never share your password or verification codes. AliExpress representatives will never ask for this information.  
          </p>  
        </div>  
      </div>  
        
      {/* Biometric login option - floating button */}  
      <div className="fixed bottom-6 right-6">  
        <button className="bg-white text-orange-500 rounded-full p-3 shadow-lg hover:bg-orange-50 transition-all flex items-center justify-center hover:scale-110 transform active:scale-95">  
          <Fingerprint className="w-6 h-6" />  
        </button>  
      </div>  

      {/* App download suggestion */}  
      <div className="fixed bottom-6 left-6 sm:flex hidden">  
        <button className="bg-white flex items-center rounded-full pl-3 pr-4 py-2 shadow-lg hover:shadow-xl transition-all">  
          <div className="bg-orange-500 p-1 rounded-full mr-2">  
            <Smartphone className="h-4 w-4 text-white" />  
          </div>  
          <span className="text-sm font-medium text-gray-700">Get our app</span>  
        </button>  
      </div>  
    </div>
  );
}
import { useState } from 'react';
import { ChevronRight, Mail, Phone } from 'lucide-react';

export default function SignInScreen() {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please agree to the terms.');
      return;
    }
    // TODO: Sign-in logic
    alert(`Signing in with ${activeTab === 'email' ? email : phone}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 py-2 px-4 text-center text-white text-xs">
        <span className="font-bold">NEW USER COUPON!</span> Sign up today and get $3 OFF your first order
      </div>

      {/* Main Card Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 space-y-4">
        <div className="w-full max-w-md space-y-4">
          
          {/* Logo */}
          <div className="text-center mb-2">
            <img src="/logo.png" alt="Logo" className="h-10 mx-auto" />
          </div>

          {/* Sign-In Form Card */}
          <div className="bg-white rounded-2xl shadow p-4 space-y-4">
            
            {/* Tabs */}
            <div className="flex border rounded-lg overflow-hidden text-sm font-medium">
              <button
                className={`w-1/2 py-2 ${activeTab === 'email' ? 'bg-gray-100 font-semibold' : 'bg-white text-gray-500'}`}
                onClick={() => setActiveTab('email')}
              >
                Email
              </button>
              <button
                className={`w-1/2 py-2 ${activeTab === 'phone' ? 'bg-gray-100 font-semibold' : 'bg-white text-gray-500'}`}
                onClick={() => setActiveTab('phone')}
              >
                Phone
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center border rounded-lg px-3 py-2 space-x-2">
                {activeTab === 'email' ? (
                  <>
                    <Mail size={16} className="text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 outline-none text-sm"
                    />
                  </>
                ) : (
                  <>
                    <Phone size={16} className="text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="flex-1 outline-none text-sm"
                    />
                  </>
                )}
              </div>

              {/* Terms checkbox */}
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="accent-red-500"
                />
                <span>
                  I agree to the <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2 bg-red-500 text-white rounded-lg shadow text-sm font-semibold"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Or separator */}
          <div className="text-xs text-center text-gray-400">OR</div>

          {/* Social login */}
          <div className="bg-white rounded-2xl shadow p-4 text-center space-y-2">
            <p className="text-sm text-gray-600">Sign in with social</p>
            <div className="flex justify-center space-x-4">
              <img src="/icons/google.svg" alt="Google" className="h-6" />
              <img src="/icons/facebook.svg" alt="Facebook" className="h-6" />
              <img src="/icons/apple.svg" alt="Apple" className="h-6" />
            </div>
          </div>

          {/* Bottom links */}
          <div className="text-xs text-center text-gray-500 space-y-1">
            <p>
              New to our app? <a href="#" className="text-red-500 font-medium">Sign Up</a>
            </p>
            <p>
              Forgot password? <a href="#" className="text-red-500 font-medium">Reset</a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Bottom Shortcut */}
      <button className="fixed bottom-4 right-4 bg-red-500 p-3 rounded-full shadow-lg">
        <ChevronRight size={20} className="text-white" />
      </button>
    </div>
  );
}
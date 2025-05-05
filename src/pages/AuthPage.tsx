
import { useState, useEffect } from 'react'; 
import { Eye, EyeOff, ChevronRight, ArrowRight, Smartphone, Lock, Mail, Globe, AlertCircle, Fingerprint, Bell, Shield, Activity, User, Trending, Key, Sliders, Zap, Coffee, HelpCircle, Github, Facebook, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Define Sun and Moon icons since they're not imported from lucide-react
const Sun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const Moon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const AuthPage = () => {
  // Auth state
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSecurityTips, setShowSecurityTips] = useState(false);
  const [theme, setTheme] = useState('light');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    // Calculate password strength
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 20;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 20; // uppercase
    if (/[a-z]/.test(password)) strength += 20; // lowercase
    if (/[0-9]/.test(password)) strength += 20; // numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // special characters
    
    setPasswordStrength(strength);
  }, [password]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: ''
    };

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Different validations based on active tab
    if (activeTab === 'login' || activeTab === 'signup') {
      if (!password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }
    }

    if (activeTab === 'signup') {
      if (!name) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
      
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (activeTab === 'login') {
        toast.success("Login successful!", {
          position: "top-right",
          duration: 3000,
        });
        console.log('Login attempted with:', { email, password });
      } else if (activeTab === 'signup') {
        toast.success("Account created successfully!", {
          position: "top-right",
          duration: 3000,
        });
        console.log('Signup attempted with:', { name, email, password });
      } else if (activeTab === 'reset') {
        toast.success("Password reset link sent to your email!", {
          position: "top-right",
          duration: 3000,
        });
        console.log('Password reset requested for:', { email });
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Logged in with ${provider}!`, {
        position: "top-right",
        duration: 3000,
      });
      console.log(`${provider} login attempted`);
    }, 1000);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "No password";
    if (passwordStrength <= 20) return "Very weak";
    if (passwordStrength <= 40) return "Weak";
    if (passwordStrength <= 60) return "Medium";
    if (passwordStrength <= 80) return "Strong";
    return "Very strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength <= 20) return "bg-red-500";
    if (passwordStrength <= 40) return "bg-orange-500";
    if (passwordStrength <= 60) return "bg-yellow-500";
    if (passwordStrength <= 80) return "bg-green-400";
    return "bg-green-600";
  };

  const themeClasses = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100';
  const inputBgClasses = theme === 'dark' ? 'bg-gray-800 border-gray-700 focus:border-blue-500' : 'bg-gray-50 border-transparent focus:border-orange-500';
  const primaryColor = theme === 'dark' ? 'blue' : 'orange';
  const primaryColorClasses = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500';

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center font-sans transition-all duration-500 p-4 sm:p-6 ${themeClasses}`}>
      <div className="fixed top-4 right-4 flex gap-2">
        <Button 
          onClick={toggleTheme} 
          variant="ghost" 
          size="icon"
          className={`rounded-full ${theme === 'dark' ? 'text-blue-400' : 'text-gray-600'}`}
        >
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        <Button 
          onClick={() => setShowSecurityTips(!showSecurityTips)}
          variant="ghost"
          size="icon"
          className={`rounded-full ${theme === 'dark' ? 'text-blue-400' : 'text-gray-600'}`}
        >
          <Shield className="h-5 w-5" />
        </Button>
      </div>

      {/* Security Tips Panel */}
      {showSecurityTips && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-16 right-4 z-10 p-4 rounded-lg shadow-xl border max-w-sm ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium flex items-center">
              <Shield className="w-4 h-4 mr-2" /> Security Tips
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setShowSecurityTips(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
              <p>Use a unique password for each account</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
              <p>Enable two-factor authentication when possible</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
              <p>Create passwords with at least 12 characters including letters, numbers, and symbols</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
              <p>Avoid using personal information in your passwords</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className={`w-full max-w-md rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-6">
            <h1 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {activeTab === 'login' ? 'Welcome back' : activeTab === 'signup' ? 'Create an account' : 'Reset password'}
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              {activeTab === 'login' 
                ? 'Sign in to continue to your account' 
                : activeTab === 'signup'
                ? 'Fill in your details to create an account'
                : "We'll send you a link to reset your password"}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="reset">Reset</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com"
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      checked={rememberMe} 
                      onCheckedChange={setRememberMe}
                    />
                    <Label htmlFor="remember-me">Remember me</Label>
                  </div>
                  <Button 
                    type="button" 
                    variant="link" 
                    className={`p-0 ${theme === 'dark' ? 'text-blue-400' : 'text-orange-500'}`}
                    onClick={() => setActiveTab('reset')}
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full ${primaryColorClasses}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>Sign in <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Input 
                      id="name" 
                      type="text"
                      placeholder="John Doe"
                      className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Input 
                      id="signup-email" 
                      type="email"
                      placeholder="name@example.com"
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Input 
                      id="signup-password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{getPasswordStrengthText()}</span>
                        <span className="text-xs">{passwordStrength}%</span>
                      </div>
                      <Progress value={passwordStrength} className={`h-1 ${getPasswordStrengthColor()}`} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Input 
                      id="confirm-password" 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <button type="button" className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-orange-500'}`}>
                      Terms of Service
                    </button>
                    {" "}and{" "}
                    <button type="button" className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-orange-500'}`}>
                      Privacy Policy
                    </button>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full ${primaryColorClasses}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>Create account <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="reset" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                    <Input 
                      id="reset-email" 
                      type="email"
                      placeholder="name@example.com"
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <Button 
                  type="submit" 
                  className={`w-full ${primaryColorClasses}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>Send reset link <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <Button 
                    type="button" 
                    variant="link" 
                    className={`p-0 ${theme === 'dark' ? 'text-blue-400' : 'text-orange-500'}`}
                    onClick={() => setActiveTab('login')}
                  >
                    Back to login
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>

          <div className="mt-6">
            <div className="relative flex items-center justify-center">
              <div className={`border-t w-full absolute ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>
              <span className={`px-4 text-sm relative ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                or continue with
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex justify-center items-center"
                onClick={() => handleSocialLogin('GitHub')}
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex justify-center items-center"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex justify-center items-center"
                onClick={() => handleSocialLogin('Google')}
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </Button>
            </div>
          </div>

          {activeTab !== 'signup' && (
            <div className="text-center mt-6">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Don't have an account?{" "}
                <Button 
                  type="button" 
                  variant="link" 
                  className={`p-0 ${theme === 'dark' ? 'text-blue-400' : 'text-orange-500'}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign up
                </Button>
              </p>
            </div>
          )}
          
          {activeTab === 'signup' && (
            <div className="text-center mt-6">
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Already have an account?{" "}
                <Button 
                  type="button" 
                  variant="link" 
                  className={`p-0 ${theme === 'dark' ? 'text-blue-400' : 'text-orange-500'}`}
                  onClick={() => setActiveTab('login')}
                >
                  Sign in
                </Button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;

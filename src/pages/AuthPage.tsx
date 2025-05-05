
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    toast.success("Login functionality will be implemented later");
    console.log("Login values:", values);
    setTimeout(() => navigate("/for-you"), 800);
  };

  const handleSignup = (values: z.infer<typeof signupSchema>) => {
    toast.success("Sign up functionality will be implemented later");
    console.log("Signup values:", values);
    setTimeout(() => navigate("/for-you"), 800);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-950 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="relative">
          {/* Top Gradient Banner */}
          <div className="h-12 bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-3 top-3 text-white hover:bg-white/20 rounded-full p-1.5 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h1 className="text-white font-medium text-lg">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h1>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                mode === "login"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                mode === "signup"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Sign Up
            </button>
          </div>
          
          {/* Form Container */}
          <div className="px-6 py-6">
            {mode === "login" ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Email"
                              className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                              {...field}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="pl-10 pr-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                              {...field}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"><path d="M12 17V7"/><path d="M5 17h14v0a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v0Z"/></svg>
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="text-right">
                    <a href="#" className="text-xs text-red-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white dark:bg-gray-950 text-gray-500">OR CONTINUE WITH</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {["Facebook", "Google", "Apple"].map((provider) => (
                      <Button
                        key={provider}
                        type="button"
                        variant="outline"
                        className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <span className="sr-only">{provider}</span>
                        {provider === "Facebook" ? (
                          <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path>
                          </svg>
                        ) : provider === "Google" ? (
                          <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M11.994 2C6.47 2 2 6.475 2 12c0 5.52 4.47 10 9.994 10 5.523 0 10.006-4.48 10.006-10 0-5.525-4.483-10-10.006-10zm3.897 14.986H9.414V12.97h6.477v4.016zm0-5.015H9.414V7.96h6.477v4.01z"></path>
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M13.066 2c.137 1.94-1.449 3.326-3.232 3.326C8.156 5.326 6.54 3.94 6.674 2c-2.022.138-3.684 1.215-4.673 2.775H2v.068c-1.283 1.941-1.35 4.055-.835 6.533l.002.002c.558 2.476 1.56 4.548 2.604 5.942h.002c.526.696 1.066 1.268 1.593 1.653.527.386 1.017.652 1.446.652.43 0 .96-.173 1.49-.346.53-.173 1.06-.346 1.526-.346.467 0 .997.173 1.527.346.53.173 1.06.346 1.49.346.429 0 .919-.266 1.446-.652.526-.385 1.067-.957 1.592-1.653h.001c1.045-1.394 2.047-3.466 2.605-5.942v-.002c.516-2.478.448-4.592-.835-6.533V4.775h-.002C17.246 3.215 15.584 2.138 13.066 2z"></path>
                          </svg>
                        )}
                      </Button>
                    ))}
                  </div>
                </form>
              </Form>
            ) : (
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Full Name"
                              className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                              {...field}
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Email"
                              className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                              {...field}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="pl-10 pr-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                              {...field}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"><path d="M12 17V7"/><path d="M5 17h14v0a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v0Z"/></svg>
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="text-xs text-gray-500 mt-2">
                    By signing up, you agree to our <a href="#" className="text-red-500 hover:underline">Terms of Service</a> and <a href="#" className="text-red-500 hover:underline">Privacy Policy</a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Create Account
                  </Button>
                </form>
              </Form>
            )}
          </div>
          
          {/* Footer Benefits */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Fast and secure checkout
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Track your orders easily
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Exclusive deals and offers
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

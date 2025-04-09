
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "success",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-lg text-white mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="md:w-1/2">
          <div className="flex items-center mb-2">
            <Mail className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-bold">Subscribe to Our Newsletter</h2>
          </div>
          <p className="text-sm opacity-90">
            Be the first to hear about new products, exclusive offers, and discounts
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex w-full md:w-1/2 gap-2">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="h-10 text-sm bg-white/20 border-white/30 text-white placeholder:text-white/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="bg-white text-red-500 hover:bg-white/90">
            {isLoading ? "Subscribing..." : (
              <>
                <Send className="h-4 w-4 mr-2" /> Subscribe
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

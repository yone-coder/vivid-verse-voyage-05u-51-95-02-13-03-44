
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquareCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
        icon: <MessageSquareCheck className="h-5 w-5 text-green-500" />
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="py-6 bg-orange-50">
      <div className="container mx-auto px-3">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-base md:text-lg font-bold mb-1">Subscribe to our Newsletter</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4">
            Get the latest deals and special offers right to your inbox
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-center">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-[10px] md:text-xs text-gray-500 mt-2">
            By subscribing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

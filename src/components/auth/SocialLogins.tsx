
import React from 'react';
import { Github, Twitter, Mail, Phone, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SocialLoginsProps {
  handleSocialLogin: (provider: 'github' | 'twitter' | 'google' | 'facebook' | 'apple') => Promise<void>;
}

const SocialLogins = ({ handleSocialLogin }: SocialLoginsProps) => {
  const { toast } = useToast();
  
  return (
    <div className="w-full px-0 pt-4 pb-6 max-w-4xl mx-auto">
      <div className="relative flex items-center justify-center my-4">
        <Separator className="w-full" />
        <span className="bg-white px-4 text-sm text-gray-500 relative">or continue with</span>
      </div>

      {/* Enhanced Social Logins Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <Button
          type="button"
          onClick={() => handleSocialLogin('google')}
          variant="outline"
          className="flex justify-center items-center gap-2 py-2 px-3 border border-[#eaeaea] rounded-lg transition-all hover:shadow-md"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Google</span>
        </Button>
        
        <Button
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          variant="outline"
          className="flex justify-center items-center gap-2 py-2 px-3 border border-[#eaeaea] rounded-lg transition-all hover:shadow-md"
        >
          <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
          </svg>
          <span>Facebook</span>
        </Button>
        
        <Button
          type="button"
          onClick={() => handleSocialLogin('apple')}
          variant="outline"
          className="flex justify-center items-center gap-2 py-2 px-3 border border-[#eaeaea] rounded-lg transition-all hover:shadow-md"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
          </svg>
          <span>Apple</span>
        </Button>
        
        <Button
          type="button"
          onClick={() => handleSocialLogin('github')}
          variant="outline"
          className="flex justify-center items-center gap-2 py-2 px-3 border border-[#eaeaea] rounded-lg transition-all hover:shadow-md"
        >
          <Github className="h-5 w-5" />
          <span>GitHub</span>
        </Button>
        
        <Button
          type="button"
          onClick={() => handleSocialLogin('twitter')}
          variant="outline"
          className="flex justify-center items-center gap-2 py-2 px-3 border border-[#eaeaea] rounded-lg transition-all hover:shadow-md"
        >
          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
          <span>X (Twitter)</span>
        </Button>

        <Button
          type="button"
          onClick={() => {
            toast({
              title: "Phone login",
              description: "Phone login is not configured yet",
            });
          }}
          variant="outline"
          className="flex justify-center items-center gap-2 py-2 px-3 border border-[#eaeaea] rounded-lg transition-all hover:shadow-md"
        >
          <Phone className="h-5 w-5" />
          <span>Phone</span>
        </Button>
      </div>
      
      {/* Add a few more popular quick sign-in options */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2 text-center">Quick sign-in methods</h4>
        <div className="grid grid-cols-1 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              toast({
                title: "Guest login",
                description: "Continuing as guest",
              });
            }}
            className="w-full py-2 flex items-center gap-2 justify-center"
          >
            <User className="h-4 w-4" />
            <span>Continue as Guest</span>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              toast({
                title: "Magic link",
                description: "Magic link is not configured yet",
              });
            }}
            className="w-full py-2 flex items-center gap-2 justify-center"
          >
            <Mail className="h-4 w-4" />
            <span>Send Magic Link</span>
          </Button>
        </div>
      </div>

      <SafetyNotice />
    </div>
  );
};

const SafetyNotice = () => {
  return (
    <div className="p-4 mt-4 bg-[#f9f9f9] rounded-md flex items-start border border-[#eaeaea]">
      <div className="text-xs text-gray-700">
        <p className="font-medium mb-1">Privacy and Security Notice:</p>
        <p>Your account security is important to us. We never share your data with third parties without your consent.</p>
      </div>
    </div>
  );
};

export default SocialLogins;

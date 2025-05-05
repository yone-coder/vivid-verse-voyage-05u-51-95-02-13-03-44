
interface ForgotPasswordProps {
  theme: string;
}

export function ForgotPassword({ theme }: ForgotPasswordProps) {
  return (
    <div className="text-sm">  
      <a className={`font-medium cursor-pointer ${
        theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-orange-500 hover:text-orange-600'
      } transition-colors`}>  
        Forgot password?  
      </a>  
    </div>
  );
}

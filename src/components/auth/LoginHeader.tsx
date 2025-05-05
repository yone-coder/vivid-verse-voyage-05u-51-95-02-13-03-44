
interface LoginHeaderProps {
  loginMethod: string;
  theme: string;
  setLoginMethod: (method: string) => void;
}

export function LoginHeader({ loginMethod, theme, setLoginMethod }: LoginHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      {loginMethod === 'normal' ? (
        <div>
          <h1 className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Welcome back</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Sign in to continue</p>
        </div>
      ) : (
        <div>
          <h1 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Quick Sign In</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Use your saved credentials</p>
        </div>
      )}
      <div className="flex space-x-2">
        <button 
          onClick={() => setLoginMethod('normal')}
          className={`text-sm px-3 py-1 rounded ${loginMethod === 'normal' 
            ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white' 
            : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Standard
        </button>
        <button 
          onClick={() => setLoginMethod('quick')}
          className={`text-sm px-3 py-1 rounded ${loginMethod === 'quick' 
            ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-orange-500 text-white' 
            : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Quick
        </button>
      </div>
    </div>
  );
}

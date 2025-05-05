
import { User, Key } from 'lucide-react';

interface QuickLoginPanelProps {
  theme: string;
  primaryColorClasses: string;
}

export function QuickLoginPanel({ theme, primaryColorClasses }: QuickLoginPanelProps) {
  return (
    <div className="py-4 space-y-4">
      <div className={`p-4 rounded-lg flex items-center justify-between ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'
      }`}>
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <User className={`h-5 w-5 ${
              theme === 'dark' ? 'text-blue-400' : 'text-orange-500'
            }`} />
          </div>
          <div>
            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>user@example.com</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Last login: Today, 2:45 PM</p>
          </div>
        </div>
        <button className={`px-4 py-2 rounded-lg text-sm font-medium ${primaryColorClasses} text-white`}>
          Login
        </button>
      </div>

      <div className={`p-4 rounded-lg flex items-center justify-between ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'
      }`}>
        <div className="flex items-center">
          <div className={`p-2 rounded-full mr-3 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <User className={`h-5 w-5 ${
              theme === 'dark' ? 'text-blue-400' : 'text-orange-500'
            }`} />
          </div>
          <div>
            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>business@example.com</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Last login: Yesterday</p>
          </div>
        </div>
        <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
          theme === 'dark' 
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}>
          Login
        </button>
      </div>

      <button className={`w-full flex items-center justify-center py-2 px-4 rounded-lg text-sm ${
        theme === 'dark' 
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}>
        <Key className="h-4 w-4 mr-2" /> Use a different account
      </button>
    </div>
  );
}

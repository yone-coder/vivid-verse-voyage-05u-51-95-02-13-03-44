
interface SecurityTipsPanelProps {
  showSecurityTips: boolean;
  theme: string;
}

export function SecurityTipsPanel({ showSecurityTips, theme }: SecurityTipsPanelProps) {
  if (!showSecurityTips) return null;
  
  return (
    <div className={`p-4 rounded-lg border shadow-lg absolute right-4 top-20 z-10 w-72 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Security Tips
      </h4>
      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        <li>• Use a strong, unique password</li>
        <li>• Enable two-factor authentication</li>
        <li>• Don't share your login credentials</li>
        <li>• Check for HTTPS in the address bar</li>
        <li>• Log out from shared devices</li>
      </ul>
    </div>
  );
}

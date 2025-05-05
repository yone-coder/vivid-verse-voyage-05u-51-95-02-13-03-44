
import { Smartphone } from 'lucide-react';

interface PhoneLoginFormProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  theme: string;
}

export function PhoneLoginForm({ phone, setPhone, countryCode, setCountryCode, theme }: PhoneLoginFormProps) {
  return (
    <div className="mb-4">  
      <div className="relative flex group">  
        <div className={`flex items-center rounded-l-lg px-3 border-r ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 group-focus-within:bg-gray-700' 
            : 'bg-gray-50 border-gray-200 group-focus-within:bg-white'
        } transition-colors`}>  
          <select  
            value={countryCode}  
            onChange={(e) => setCountryCode(e.target.value)}  
            className={`bg-transparent text-sm focus:outline-none py-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}  
          >  
            <option value="+1">+1</option>  
            <option value="+44">+44</option>  
            <option value="+86">+86</option>  
            <option value="+91">+91</option>  
          </select>  
        </div>  
        <div className="relative flex-1">  
          <Smartphone className={`absolute left-3 top-3 h-5 w-5 ${
            theme === 'dark' 
              ? 'text-gray-500 group-focus-within:text-blue-400' 
              : 'text-gray-400 group-focus-within:text-orange-500'
          } transition-colors`} />  
          <input  
            type="tel"  
            value={phone}  
            onChange={(e) => setPhone(e.target.value)}  
            placeholder="Phone number"  
            className={`w-full pl-10 pr-3 py-3 rounded-r-lg text-sm focus:outline-none focus:ring-2 ${
              theme === 'dark' 
                ? 'bg-gray-800 focus:ring-blue-500 focus:bg-gray-700 border border-gray-700 focus:border-blue-500 text-white' 
                : 'bg-gray-50 focus:ring-orange-500 focus:bg-white border border-transparent focus:border-orange-500'
            } transition-all`}  
            required  
          />  
        </div>  
      </div>  
    </div> 
  );
}

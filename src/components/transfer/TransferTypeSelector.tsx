
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Globe, MapPin } from 'lucide-react';

interface TransferTypeSelectorProps {
  transferType: 'international' | 'national';
  onTransferTypeChange: (type: 'international' | 'national') => void;
}

const TransferTypeSelector: React.FC<TransferTypeSelectorProps> = ({
  transferType,
  onTransferTypeChange
}) => {
  return (
    <div className="space-y-4">
      {/* Toggle Switch Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">International Transfer</h3>
              <p className="text-sm text-gray-500">Send money abroad (USD to HTG)</p>
            </div>
          </div>
          <div className="relative">
            <Switch
              checked={transferType === 'international'}
              onCheckedChange={(checked) => 
                onTransferTypeChange(checked ? 'international' : 'national')
              }
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 h-7 w-12"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">National Transfer</h3>
              <p className="text-sm text-gray-500">Send money locally (HTG to HTG)</p>
            </div>
          </div>
          <div className="relative">
            <Switch
              checked={transferType === 'national'}
              onCheckedChange={(checked) => 
                onTransferTypeChange(checked ? 'national' : 'international')
              }
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 h-7 w-12"
            />
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className={`rounded-xl p-4 border-l-4 ${
        transferType === 'international' 
          ? 'bg-blue-50 border-blue-400' 
          : 'bg-green-50 border-green-400'
      }`}>
        <div className="flex items-start space-x-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
            transferType === 'international' 
              ? 'bg-blue-100' 
              : 'bg-green-100'
          }`}>
            {transferType === 'international' ? (
              <Globe className="h-3 w-3 text-blue-600" />
            ) : (
              <MapPin className="h-3 w-3 text-green-600" />
            )}
          </div>
          <div>
            <h4 className={`font-medium ${
              transferType === 'international' ? 'text-blue-900' : 'text-green-900'
            }`}>
              {transferType === 'international' ? 'International Transfer Selected' : 'National Transfer Selected'}
            </h4>
            <p className={`text-sm mt-1 ${
              transferType === 'international' ? 'text-blue-700' : 'text-green-700'
            }`}>
              {transferType === 'international' 
                ? 'Perfect for sending money from USD to Haiti in HTG currency'
                : 'Ideal for local transfers within Haiti using HTG currency'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferTypeSelector;

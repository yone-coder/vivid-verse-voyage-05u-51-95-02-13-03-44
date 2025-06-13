
import React from 'react';
import { Globe, Banknote } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from 'react-router-dom';

interface TransferTypeSelectorProps {
  transferType: 'international' | 'national';
  onTransferTypeChange: (value: 'international' | 'national') => void;
}

const TransferTypeSelector: React.FC<TransferTypeSelectorProps> = ({ transferType, onTransferTypeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTransferTypeChange = (value: 'international' | 'national') => {
    onTransferTypeChange(value);
    
    // Navigate to appropriate route based on transfer type
    if (value === 'national' && location.pathname !== '/local-transfer') {
      navigate('/local-transfer');
    } else if (value === 'international' && location.pathname === '/local-transfer') {
      navigate('/multi-step-transfer-page');
    }
  };

  return (
    <Tabs 
      value={transferType} 
      onValueChange={(value) => handleTransferTypeChange(value as 'international' | 'national')}
      className="mb-4"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="international" className="flex items-center gap-2">
          <Globe size={16} />
          <span>International (USD)</span>
        </TabsTrigger>
        <TabsTrigger value="national" className="flex items-center gap-2">
          <Banknote size={16} />
          <span>National (HTG)</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="international">
        <p className="text-sm text-gray-600 mb-4">
          Send money internationally to Haiti in US Dollars from anywhere in the world.
        </p>
      </TabsContent>
      
      <TabsContent value="national">
        <p className="text-sm text-gray-600 mb-4">
          Transfer money locally within Haiti using Haitian Gourdes.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default TransferTypeSelector;

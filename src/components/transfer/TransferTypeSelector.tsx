
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TransferTypeSelectorProps {
  transferType: 'international' | 'national';
  onTransferTypeChange: (value: 'international' | 'national') => void;
  disableNavigation?: boolean;
}

const TransferTypeSelector: React.FC<TransferTypeSelectorProps> = ({ 
  transferType, 
  onTransferTypeChange,
  disableNavigation = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleValueChange = (value: string) => {
    const newTransferType = value as 'international' | 'national';
    onTransferTypeChange(newTransferType);
    
    if (!disableNavigation) {
      if (newTransferType === 'national' && location.pathname !== '/local-transfer') {
        navigate('/local-transfer');
      } else if (newTransferType === 'international' && location.pathname === '/local-transfer') {
        navigate('/multi-step-transfer-page');
      }
    }
  };

  return (
    <Tabs value={transferType} onValueChange={handleValueChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="international">International</TabsTrigger>
        <TabsTrigger value="national">National</TabsTrigger>
      </TabsList>
      <TabsContent value="international">
        <p className="text-xs text-gray-600 text-center pt-2">
          Send money internationally to Haiti from anywhere in the world.
        </p>
      </TabsContent>
      <TabsContent value="national">
        <p className="text-xs text-gray-600 text-center pt-2">
          Transfer money locally within Haiti.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default TransferTypeSelector;

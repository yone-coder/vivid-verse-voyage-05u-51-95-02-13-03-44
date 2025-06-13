
import React from 'react';
import { Globe, MapPin } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TransferTypeSelectorProps {
  transferType: 'international' | 'national';
  onTransferTypeChange: (type: 'international' | 'national') => void;
}

const TransferTypeSelector: React.FC<TransferTypeSelectorProps> = ({
  transferType,
  onTransferTypeChange
}) => {
  return (
    <div className="w-full">
      <Tabs value={transferType} onValueChange={onTransferTypeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 p-1">
          <TabsTrigger 
            value="international" 
            className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Globe className="h-4 w-4" />
            <span>International</span>
          </TabsTrigger>
          <TabsTrigger 
            value="national"
            className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <MapPin className="h-4 w-4" />
            <span>National</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TransferTypeSelector;

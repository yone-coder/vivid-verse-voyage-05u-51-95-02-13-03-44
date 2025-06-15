
import React from 'react';
import { RadioGroup } from "@/components/ui/radio-group";
import PaymentMethodItem, { PaymentMethod } from './PaymentMethodItem';

interface PaymentMethodListProps {
  methods: PaymentMethod[];
  selectedMethod: string | null;
  onMethodChange: (value: string) => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({ 
  methods, 
  selectedMethod,
  onMethodChange
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <h2 className="font-medium mb-3">Select payment method</h2>
      
      <RadioGroup 
        value={selectedMethod || ''} 
        onValueChange={onMethodChange}
        className="space-y-2"
      >
        {methods.map((method) => (
          <PaymentMethodItem 
            key={method.id}
            id={method.id}
            name={method.name}
            description={method.description}
            icon={method.icon ? React.createElement(method.icon, { className: "w-5 h-5" }) : undefined}
            fee={method.fee}
            processingTime={method.processingTime}
            isSelected={selectedMethod === method.id}
            onClick={() => onMethodChange(method.id)}
            disabled={method.available === false}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodList;

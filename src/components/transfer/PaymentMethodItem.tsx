
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  icon?: LucideIcon;
  fee?: string;
  processingTime?: string;
  processorUrl?: string;
  available?: boolean;
  unavailableReason?: string;
}

interface PaymentMethodItemProps {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  isRecommended?: boolean;
  fee?: string;
  processingTime?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
  id,
  name,
  description,
  icon,
  isSelected = false,
  isRecommended = false,
  fee,
  processingTime,
  onClick,
  disabled = false
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected && "ring-2 ring-red-600 border-red-600",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {icon && (
            <div className="flex-shrink-0 mt-1">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-medium text-gray-900">{name}</h3>
              {isRecommended && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  Recommended
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-600 mb-2">{description}</p>
            )}
            <div className="flex justify-between items-center text-xs text-gray-500">
              {fee && <span>Fee: {fee}</span>}
              {processingTime && <span>{processingTime}</span>}
            </div>
          </div>
          {isSelected && (
            <div className="flex-shrink-0">
              <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodItem;

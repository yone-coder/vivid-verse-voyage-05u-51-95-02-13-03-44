import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck, RotateCcw, Clock, ArrowRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ShippingInfo {
  free: boolean;
  express: number;
  estimated: string;
  expressEstimated: string;
  returns: string;
}

interface ProductShippingProps {
  shippingInfo: ShippingInfo;
  isExpressSelected: boolean;
  onExpressChange: (value: boolean) => void;
}

const ProductShipping: React.FC<ProductShippingProps> = ({
  shippingInfo,
  isExpressSelected,
  onExpressChange
}) => {
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const { toast } = useToast();
  const [deliveryMethod, setDeliveryMethod] = useState(isExpressSelected ? "express" : "standard");

  // Update internal state when prop changes
  useEffect(() => {
    setDeliveryMethod(isExpressSelected ? "express" : "standard");
  }, [isExpressSelected]);

  const handleShippingChange = (value: string) => {
    setDeliveryMethod(value);
    const newValue = value === "express";
    onExpressChange(newValue);
    
    toast({
      title: newValue ? "Express shipping selected" : "Standard shipping selected",
      description: newValue 
        ? `Express shipping for $${shippingInfo.express} added to your order` 
        : "Free standard shipping selected"
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Shipping:</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 py-0 h-6">
                <Truck className="h-3 w-3 text-green-600 mr-1" />
                Free shipping
                <span className="mx-1 text-gray-400">•</span>
                <Clock className="h-3 w-3 text-green-600 mr-1" />
                {isExpressSelected ? "3-5 days" : "7-14 days"}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-0 h-6">
                <RotateCcw className="h-3 w-3 text-blue-600 mr-1" />
                Free returns
                <span className="mx-1 text-gray-400">•</span>
                <span>30 days</span>
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-blue-600 -mr-2"
            onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
          >
            {showDeliveryOptions ? 'Hide Options' : 'More Options'}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {showDeliveryOptions && (
        <div className="mt-1 p-3 bg-gray-50 rounded-md border border-gray-200">
          <RadioGroup 
            value={deliveryMethod}
            onValueChange={handleShippingChange}
          >
            <div className="flex items-start space-x-2 mb-2">
              <RadioGroupItem value="standard" id="standard" className="mt-1" />
              <label htmlFor="standard" className="text-sm cursor-pointer flex-1">
                <div className="font-medium">Standard Shipping (Free)</div>
                <div className="text-xs text-gray-500">Estimated delivery: {shippingInfo.estimated}</div>
              </label>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="express" id="express" className="mt-1" />
              <label htmlFor="express" className="text-sm cursor-pointer flex-1">
                <div className="font-medium">Express Shipping (${shippingInfo.express})</div>
                <div className="text-xs text-gray-500">Estimated delivery: {shippingInfo.expressEstimated}</div>
              </label>
            </div>
          </RadioGroup>
        </div>
      )}
    </>
  );
};

export default ProductShipping;

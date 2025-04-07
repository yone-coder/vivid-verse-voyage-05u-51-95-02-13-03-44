
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Truck, Gift } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

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
  giftWrap: boolean;
  onGiftWrapChange: (value: boolean) => void;
}

const ProductShipping: React.FC<ProductShippingProps> = ({
  shippingInfo,
  isExpressSelected,
  onExpressChange,
  giftWrap,
  onGiftWrapChange
}) => {
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const { toast } = useToast();

  const toggleGiftWrap = () => {
    const newValue = !giftWrap;
    onGiftWrapChange(newValue);
    toast({
      title: newValue ? "Gift wrapping added" : "Gift wrapping removed",
      description: newValue 
        ? "Your item will be gift wrapped with a personalized message" 
        : "Gift wrapping has been removed from your order"
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Shipping:</span>
        <div className="flex flex-col items-end">
          <div className="flex items-center">
            <Truck className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600 font-medium">
              {shippingInfo.free ? "Free Standard Shipping" : "Standard Shipping"}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Estimated delivery: {shippingInfo.estimated}
          </div>
        </div>
      </div>
      
      <div className="mt-2 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 px-2 text-xs text-blue-600"
          onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
        >
          {showDeliveryOptions ? "Hide Options" : "More Delivery Options"}
        </Button>
      </div>
      
      {showDeliveryOptions && (
        <div className="mt-1 p-3 bg-gray-50 rounded-md border border-gray-200">
          <RadioGroup 
            value={isExpressSelected ? "express" : "standard"}
            onValueChange={(value) => onExpressChange(value === "express")}
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
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Gift className="h-4 w-4 mr-1.5 text-purple-600" />
                <span className="font-medium">Gift Wrapping</span>
              </div>
              <Switch 
                checked={giftWrap} 
                onCheckedChange={toggleGiftWrap}
                className="scale-75"
              />
            </div>
            {giftWrap && (
              <div className="mt-2 text-xs text-gray-600">
                Your item will be gift wrapped with a customized message card for $2.99
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductShipping;


import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { getExchangeRate, ExchangeRateData } from "@/utils/currencyConverter";
import { Loader2 } from "lucide-react";

export interface ReceiverDetails {
  fullName: string;
  phoneNumber: string;
  address: string;
  additionalInfo?: string;
}

interface ReceiverDetailsFormProps {
  onDetailsChange: (details: ReceiverDetails) => void;
  amount?: string;
}

const ReceiverDetailsForm: React.FC<ReceiverDetailsFormProps> = ({ onDetailsChange, amount = "0" }) => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ReceiverDetails>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      additionalInfo: "",
    },
  });

  // Update parent component when form values change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onDetailsChange(value as ReceiverDetails);
    });
    return () => subscription.unsubscribe();
  }, [form, onDetailsChange]);
  
  // Fetch exchange rate when component mounts or amount changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      try {
        const rate = await getExchangeRate();
        setExchangeRate(rate);
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExchangeRate();
  }, [amount]);
  
  // Calculate the HTG amount
  const usdAmount = parseFloat(amount) || 0;
  const htgAmount = exchangeRate ? usdAmount * exchangeRate.usdToHtg : 0;

  return (
    <div className="space-y-4 py-2">
      <h3 className="text-base font-medium">Receiver Details</h3>
      
      {/* Exchange Rate Information */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Exchange Rate:</span>
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : (
            <span className="text-sm font-medium">
              1 USD = {exchangeRate?.usdToHtg.toFixed(2)} HTG
              {!exchangeRate?.isLive && " (offline rate)"}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Receiver Gets:</span>
          <span className="text-lg font-bold text-green-600">
            {htgAmount.toFixed(2)} HTG
          </span>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          Rate updated: {exchangeRate?.lastUpdated?.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="Enter receiver's full name" 
            {...form.register("fullName")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input 
            id="phoneNumber" 
            placeholder="Enter receiver's phone number" 
            {...form.register("phoneNumber")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea 
            id="address" 
            placeholder="Enter receiver's address" 
            className="min-h-[60px]"
            {...form.register("address")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
          <Textarea 
            id="additionalInfo" 
            placeholder="Any additional information about the receiver" 
            className="min-h-[60px]" 
            {...form.register("additionalInfo")}
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiverDetailsForm;

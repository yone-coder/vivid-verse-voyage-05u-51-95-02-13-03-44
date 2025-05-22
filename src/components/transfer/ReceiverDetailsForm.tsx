
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

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

  return (
    <div className="space-y-4 py-2">
      <h3 className="text-base font-medium">Receiver Details</h3>
      
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

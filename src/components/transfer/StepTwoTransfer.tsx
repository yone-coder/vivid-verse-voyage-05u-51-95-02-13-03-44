
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info, MapPin, Phone, User, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReceiverDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  commune: string;
}

interface StepTwoTransferProps {
  receiverDetails: ReceiverDetails;
  onDetailsChange: (details: ReceiverDetails) => void;
}

// All communes from Artibonite department (flattened list)
const artiboniteCommunes = [
  // From Dessalines arrondissement
  "Dessalines",
  "Grande-Saline", 
  "Marchand-Dessalines",
  // From Gonaïves arrondissement
  "Gonaïves",
  "Ennery",
  "L'Estère",
  // From Gros-Morne arrondissement
  "Gros-Morne",
  "Anse-Rouge",
  "Terre-Neuve",
  // From Marmelade arrondissement
  "Marmelade",
  "Saint-Michel-de-l'Attalaye",
  // From Saint-Marc arrondissement
  "Saint-Marc",
  "La Chapelle",
  "Liancourt",
  "Montrouis",
  "Verrettes"
];

const StepTwoTransfer: React.FC<StepTwoTransferProps> = ({ receiverDetails, onDetailsChange }) => {
  const [open, setOpen] = useState(false);
  
  // Provide default values if receiverDetails is undefined
  const details = receiverDetails || {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    department: 'Artibonite',
    commune: ''
  };

  const updateField = (field: keyof ReceiverDetails, value: string) => {
    const updatedDetails = {
      ...details,
      [field]: value
    };
    onDetailsChange(updatedDetails);
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-lg bg-white mx-auto">
        <div className="space-y-6">
          {/* Full Name Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Full Name *
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <Input 
                  placeholder="First name" 
                  value={details.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-4 transition-all duration-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 font-medium group-hover:border-gray-300"
                  required
                />
              </div>
              <div className="relative group">
                <Input 
                  placeholder="Last name" 
                  value={details.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-4 transition-all duration-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 font-medium group-hover:border-gray-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Phone Number Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                Phone Number *
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter a valid 8-digit Haitian phone number</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center px-4 bg-white border-2 border-gray-200 border-r-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden shadow-sm">
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 via-red-500 to-red-600 relative">
                      <div className="absolute inset-0 bg-blue-600"></div>
                      <div className="absolute right-0 top-0 w-1/2 h-full bg-red-600"></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">+509</span>
                </div>
              </div>
              <Input 
                id="phoneNumber" 
                placeholder="XXXX XXXX" 
                value={details.phoneNumber}
                onChange={(e) => updateField('phoneNumber', e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 rounded-l-none rounded-r-xl bg-white text-gray-900 placeholder:text-gray-400 font-medium pl-4"
                required
              />
            </div>
            <p className="text-xs text-gray-500 font-medium flex items-center">
              <Info className="w-3 h-3 mr-1" />
              8-digit number without spaces or dashes
            </p>
          </div>

          {/* Address Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 mb-3 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Address in Haiti *
            </Label>
            
            {/* Department and Commune Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Department
                </Label>
                <div className="relative">
                  <Input 
                    value="Artibonite"
                    disabled
                    className="h-11 bg-gray-50 border-2 border-gray-200 text-gray-600 rounded-xl font-medium cursor-not-allowed"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Commune
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="h-11 w-full justify-between border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-4 rounded-xl bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
                    >
                      {details.commune
                        ? artiboniteCommunes.find((commune) => commune === details.commune)
                        : "Search commune..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                    <Command className="bg-white">
                      <CommandInput 
                        placeholder="Search commune..." 
                        className="h-9 text-gray-900"
                      />
                      <CommandList>
                        <CommandEmpty>No commune found.</CommandEmpty>
                        <CommandGroup>
                          {artiboniteCommunes.map((commune) => (
                            <CommandItem
                              key={commune}
                              value={commune}
                              onSelect={(currentValue) => {
                                updateField('commune', currentValue === details.commune ? "" : currentValue);
                                setOpen(false);
                              }}
                              className="hover:bg-purple-50 focus:bg-purple-50 text-gray-800 font-medium py-3 px-4 cursor-pointer transition-colors rounded-lg mx-1"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  details.commune === commune ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {commune}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StepTwoTransfer;

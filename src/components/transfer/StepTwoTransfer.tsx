
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, MapPin, Phone, User } from "lucide-react";

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  
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

  // Filter communes based on user input
  const filteredCommunes = artiboniteCommunes.filter(commune =>
    commune.toLowerCase().includes(details.commune.toLowerCase())
  );

  const handleCommuneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateField('commune', value);
    setShowSuggestions(value.length > 0 && filteredCommunes.length > 0);
  };

  const handleCommuneSelect = (commune: string) => {
    updateField('commune', commune);
    setShowSuggestions(false);
  };

  const handleCommuneInputFocus = () => {
    if (details.commune.length > 0 && filteredCommunes.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleCommuneInputBlur = () => {
    // Delay hiding suggestions to allow for selection
    setTimeout(() => setShowSuggestions(false), 150);
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

              <div className="space-y-2 relative">
                <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Commune
                </Label>
                <Input
                  placeholder="Type commune name..."
                  value={details.commune}
                  onChange={handleCommuneInputChange}
                  onFocus={handleCommuneInputFocus}
                  onBlur={handleCommuneInputBlur}
                  className="h-11 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-4 rounded-xl bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300"
                  required
                />
                
                {/* Suggestions dropdown */}
                {showSuggestions && filteredCommunes.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                    {filteredCommunes.slice(0, 8).map((commune) => (
                      <div
                        key={commune}
                        onClick={() => handleCommuneSelect(commune)}
                        className="px-4 py-3 hover:bg-purple-50 cursor-pointer text-gray-800 font-medium transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {commune}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StepTwoTransfer;

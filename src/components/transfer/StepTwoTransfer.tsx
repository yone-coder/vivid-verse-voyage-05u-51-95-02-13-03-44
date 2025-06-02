
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, MapPin, Phone, User } from "lucide-react";

interface ReceiverDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  arrondissement: string;
  commune: string;
}

interface StepTwoTransferProps {
  receiverDetails: ReceiverDetails;
  onDetailsChange: (details: ReceiverDetails) => void;
}

// Artibonite department administrative divisions
const artiboniteData = {
  "Dessalines": [
    "Dessalines",
    "Grande-Saline",
    "Marchand-Dessalines"
  ],
  "Gonaïves": [
    "Gonaïves",
    "Ennery",
    "L'Estère"
  ],
  "Gros-Morne": [
    "Gros-Morne",
    "Anse-Rouge",
    "Terre-Neuve"
  ],
  "Marmelade": [
    "Marmelade",
    "Saint-Michel-de-l'Attalaye"
  ],
  "Saint-Marc": [
    "Saint-Marc",
    "La Chapelle",
    "Liancourt",
    "Montrouis",
    "Verrettes"
  ]
};

const StepTwoTransfer: React.FC<StepTwoTransferProps> = ({ receiverDetails, onDetailsChange }) => {
  // Provide default values if receiverDetails is undefined
  const details = receiverDetails || {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    department: 'Artibonite',
    arrondissement: '',
    commune: ''
  };

  const updateField = (field: keyof ReceiverDetails, value: string) => {
    const updatedDetails = {
      ...details,
      [field]: value
    };
    
    // Reset commune when arrondissement changes
    if (field === 'arrondissement') {
      updatedDetails.commune = '';
    }
    
    onDetailsChange(updatedDetails);
  };

  const availableCommunes = details.arrondissement ? artiboniteData[details.arrondissement] || [] : [];

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
            
            {/* Department and Arrondissement Row */}
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
                  Arrondissement
                </Label>
                <Select value={details.arrondissement} onValueChange={(value) => updateField('arrondissement', value)}>
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-4 rounded-xl bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300">
                    <SelectValue placeholder="Choose arrondissement" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-xl z-50 shadow-xl">
                    {Object.keys(artiboniteData).map((arrondissement) => (
                      <SelectItem 
                        key={arrondissement} 
                        value={arrondissement} 
                        className="hover:bg-purple-50 focus:bg-purple-50 text-gray-800 font-medium py-3 px-4 cursor-pointer transition-colors rounded-lg mx-1"
                      >
                        {arrondissement}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Commune */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Commune
              </Label>
              <Select 
                value={details.commune} 
                onValueChange={(value) => updateField('commune', value)}
                disabled={!details.arrondissement}
              >
                <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-4 rounded-xl bg-white text-gray-900 font-medium transition-all duration-200 hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400">
                  <SelectValue placeholder={details.arrondissement ? "Choose commune" : "Select arrondissement first"} />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl z-50 shadow-xl">
                  {availableCommunes.map((commune) => (
                    <SelectItem 
                      key={commune} 
                      value={commune} 
                      className="hover:bg-purple-50 focus:bg-purple-50 text-gray-800 font-medium py-3 px-4 cursor-pointer transition-colors rounded-lg mx-1"
                    >
                      {commune}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 text-sm mb-1">Secure Transfer</h4>
                <p className="text-blue-700 text-xs leading-relaxed">
                  All recipient information is encrypted using bank-level security protocols. Your data is protected with industry-standard encryption.
                </p>
                <div className="flex items-center mt-2 text-xs text-blue-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  256-bit SSL encryption active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StepTwoTransfer;

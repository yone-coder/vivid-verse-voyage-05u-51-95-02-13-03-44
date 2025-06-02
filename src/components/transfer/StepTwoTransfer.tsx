
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReceiverDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  arrondissement: string;
  commune: string;
  additionalInfo?: string;
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
    commune: '',
    additionalInfo: ''
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
    <div className="w-full max-w-lg">
      <div className="space-y-6">
        {/* Full Name - Horizontal Layout */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Full Name
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input 
                placeholder="First name" 
                value={details.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className="h-11 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors"
                required
              />
            </div>
            <div>
              <Input 
                placeholder="Last name" 
                value={details.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className="h-11 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Phone Number with Haiti Country Code */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Phone Number
          </Label>
          <div className="flex">
            <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md dark:bg-gray-800 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 via-red-500 to-red-600 relative">
                    <div className="absolute inset-0 bg-blue-600"></div>
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-red-600"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">+509</span>
              </div>
            </div>
            <Input 
              id="phoneNumber" 
              placeholder="XXXX XXXX" 
              value={details.phoneNumber}
              onChange={(e) => updateField('phoneNumber', e.target.value)}
              className="h-11 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors rounded-l-none"
              required
            />
          </div>
          <p className="text-xs text-gray-500">Enter 8-digit Haitian phone number</p>
        </div>

        {/* Address - Haiti Administrative Divisions */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Address in Haiti
          </Label>
          
          {/* Department (Fixed to Artibonite) */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600 dark:text-gray-400">Department</Label>
            <Input 
              value="Artibonite"
              disabled
              className="h-10 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            />
          </div>

          {/* Arrondissement */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600 dark:text-gray-400">Arrondissement</Label>
            <Select value={details.arrondissement} onValueChange={(value) => updateField('arrondissement', value)}>
              <SelectTrigger className="h-10 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100">
                <SelectValue placeholder="Select arrondissement" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
                {Object.keys(artiboniteData).map((arrondissement) => (
                  <SelectItem key={arrondissement} value={arrondissement} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {arrondissement}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Commune */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600 dark:text-gray-400">Commune</Label>
            <Select 
              value={details.commune} 
              onValueChange={(value) => updateField('commune', value)}
              disabled={!details.arrondissement}
            >
              <SelectTrigger className="h-10 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100">
                <SelectValue placeholder={details.arrondissement ? "Select commune" : "Select arrondissement first"} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
                {availableCommunes.map((commune) => (
                  <SelectItem key={commune} value={commune} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {commune}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-2">
          <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Additional Information
            <span className="text-xs ml-1 font-normal">(Optional)</span>
          </Label>
          <Input 
            id="additionalInfo" 
            placeholder="Street address, landmarks, etc." 
            value={details.additionalInfo || ''}
            onChange={(e) => updateField('additionalInfo', e.target.value)}
            className="h-11 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-gray-100 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwoTransfer;

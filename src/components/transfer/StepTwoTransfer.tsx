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
    <div className="w-full max-w-lg bg-white">
      <div className="space-y-8">
        {/* Full Name - Horizontal Layout with updated styling */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-[#333] block">
            Full Name
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input 
                placeholder="First name" 
                value={details.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className="h-12 border-2 border-[#e0e0e0] focus:border-[#2563eb] focus:ring-[#2563eb] transition-all duration-200 rounded-xl bg-[#fafafa] text-[#333] placeholder:text-[#999] font-medium"
                required
              />
            </div>
            <div>
              <Input 
                placeholder="Last name" 
                value={details.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className="h-12 border-2 border-[#e0e0e0] focus:border-[#2563eb] focus:ring-[#2563eb] transition-all duration-200 rounded-xl bg-[#fafafa] text-[#333] placeholder:text-[#999] font-medium"
                required
              />
            </div>
          </div>
        </div>

        {/* Phone Number with Haiti Country Code - fixed padding issue */}
        <div className="space-y-3">
          <Label htmlFor="phoneNumber" className="text-base font-semibold text-[#333] block">
            Phone Number
          </Label>
          <div className="flex rounded-xl overflow-hidden">
            <div className="flex items-center px-3 bg-[#fafafa] border-2 border-[#e0e0e0] border-r-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 via-red-500 to-red-600 relative">
                    <div className="absolute inset-0 bg-blue-600"></div>
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-red-600"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#333]">+509</span>
              </div>
            </div>
            <Input 
              id="phoneNumber" 
              placeholder="Phone number" 
              value={details.phoneNumber}
              onChange={(e) => updateField('phoneNumber', e.target.value)}
              className="h-12 border-2 border-[#e0e0e0] focus:border-[#2563eb] focus:ring-[#2563eb] transition-all duration-200 rounded-l-none rounded-r-xl bg-[#fafafa] text-[#333] placeholder:text-[#999] font-medium pl-4"
              required
            />
          </div>
          <p className="text-sm text-[#666] font-medium">Enter 8-digit Haitian phone number</p>
        </div>

        {/* Address - Haiti Administrative Divisions - updated styling */}
        <div className="space-y-5">
          <Label className="text-base font-semibold text-[#333] block">
            Address in Haiti
          </Label>
          
          {/* Department and Arrondissement - Horizontal Layout */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#666]">Department</Label>
              <Input 
                value="Artibonite"
                disabled
                className="h-11 bg-[#f5f5f5] border-2 border-[#e0e0e0] text-[#666] rounded-xl font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#666]">Arrondissement</Label>
              <Select value={details.arrondissement} onValueChange={(value) => updateField('arrondissement', value)}>
                <SelectTrigger className="h-11 border-2 border-[#e0e0e0] focus:border-[#2563eb] focus:ring-[#2563eb] rounded-xl bg-[#fafafa] text-[#333] font-medium">
                  <SelectValue placeholder="Select arrondissement" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-[#e0e0e0] rounded-xl z-50 shadow-lg">
                  {Object.keys(artiboniteData).map((arrondissement) => (
                    <SelectItem 
                      key={arrondissement} 
                      value={arrondissement} 
                      className="hover:bg-[#f0f4ff] focus:bg-[#f0f4ff] text-[#333] font-medium py-3 px-4 cursor-pointer transition-colors"
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
            <Label className="text-sm font-semibold text-[#666]">Commune</Label>
            <Select 
              value={details.commune} 
              onValueChange={(value) => updateField('commune', value)}
              disabled={!details.arrondissement}
            >
              <SelectTrigger className="h-11 border-2 border-[#e0e0e0] focus:border-[#2563eb] focus:ring-[#2563eb] rounded-xl bg-[#fafafa] text-[#333] font-medium">
                <SelectValue placeholder={details.arrondissement ? "Select commune" : "Select arrondissement first"} />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-[#e0e0e0] rounded-xl z-50 shadow-lg">
                {availableCommunes.map((commune) => (
                  <SelectItem 
                    key={commune} 
                    value={commune} 
                    className="hover:bg-[#f0f4ff] focus:bg-[#f0f4ff] text-[#333] font-medium py-3 px-4 cursor-pointer transition-colors"
                  >
                    {commune}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Updated security notice with blue theme */}
        <div className="bg-gradient-to-r from-[#f8faff] to-[#f0f4ff] border-2 border-[#e0ebff] rounded-xl p-4 mt-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-[#333] text-sm">Secure Transfer</h4>
              <p className="text-sm text-[#666] font-medium">All recipient information is encrypted and protected with bank-level security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwoTransfer;

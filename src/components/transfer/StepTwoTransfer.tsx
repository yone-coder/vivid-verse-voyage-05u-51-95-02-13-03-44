
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, MapPin } from 'lucide-react';

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

const haitiLocations = {
  'Artibonite': {
    'Dessalines': ['Dessalines', 'Marchand Dessalines', 'Grande Saline'],
    'Gonaïves': ['Gonaïves', 'Ennery', 'Gros-Morne'],
    'Gros-Morne': ['Gros-Morne', 'Terre-Neuve', 'Anse-Rouge'],
    'Marmelade': ['Marmelade', 'Saint-Michel de l\'Attalaye'],
    'Saint-Marc': ['Saint-Marc', 'La Chapelle', 'Liancourt', 'Montrouis', 'Verrettes']
  },
  'Centre': {
    'Cerca-la-Source': ['Cerca-la-Source', 'Thomassique'],
    'Hinche': ['Hinche', 'Cerca Carvajal', 'Maïssade', 'Thomonde'],
    'Lascahobas': ['Lascahobas', 'Belladère', 'Savanette'],
    'Mirebalais': ['Mirebalais', 'Boucan Carré', 'Saut d\'Eau']
  },
  'Grand\'Anse': {
    'Anse d\'Hainault': ['Anse d\'Hainault', 'Dame-Marie', 'Les Irois'],
    'Corail': ['Corail', 'Beaumont', 'Pestel', 'Roseaux'],
    'Jérémie': ['Jérémie', 'Abricots', 'Bonbon', 'Chambellan', 'Moron']
  },
  'Nippes': {
    'Anse-à-Veau': ['Anse-à-Veau', 'Arnaud', 'L\'Asile'],
    'Baradères': ['Baradères', 'Grand Boucan'],
    'Miragoâne': ['Miragoâne', 'Fonds-des-Nègres', 'Petite Rivière de Nippes', 'Plaisance du Sud']
  },
  'Nord': {
    'Acul-du-Nord': ['Acul-du-Nord', 'Milot', 'Plaine du Nord'],
    'Cap-Haïtien': ['Cap-Haïtien', 'Limonade', 'Quartier Morin'],
    'Fort-Dauphin': ['Fort-Dauphin', 'Ferrier', 'Mont Organisé', 'Ouanaminthe', 'Perches', 'Vallières'],
    'Grande-Rivière-du-Nord': ['Grande-Rivière-du-Nord', 'Bahon', 'Dondon'],
    'Limbé': ['Limbé', 'Bas-Limbé', 'Pilate'],
    'Plaisance': ['Plaisance', 'Borgne', 'Port-Margot']
  },
  'Nord-Est': {
    'Fort-Liberté': ['Fort-Liberté', 'Ferrier', 'Mont-Organisé', 'Ouanaminthe', 'Perches', 'Vallières'],
    'Trou-du-Nord': ['Trou-du-Nord', 'Caracol', 'Sainte-Suzanne', 'Terrier-Rouge']
  },
  'Nord-Ouest': {
    'Môle-Saint-Nicolas': ['Môle-Saint-Nicolas', 'Baie de Henne', 'Bombardopolis', 'Jean-Rabel'],
    'Port-de-Paix': ['Port-de-Paix', 'Bassin-Bleu', 'Chansolme', 'Tortue (Île de la)']
  },
  'Ouest': {
    'Arcahaie': ['Arcahaie', 'Cabaret'],
    'Croix-des-Bouquets': ['Croix-des-Bouquets', 'Cornillon', 'Fonds Verrettes', 'Ganthier', 'Thomazeau'],
    'Léogâne': ['Léogâne', 'Grand-Goâve', 'Petit-Goâve'],
    'Port-au-Prince': ['Port-au-Prince', 'Carrefour', 'Cité Soleil', 'Delmas', 'Kenscoff', 'Pétionville', 'Tabarre', 'Gressier']
  },
  'Sud': {
    'Aquin': ['Aquin', 'Cavaillon', 'Saint-Louis du Sud'],
    'Cayes': ['Cayes', 'Camp-Perrin', 'Chantal', 'Île à Vache', 'Maniche', 'Torbeck'],
    'Chardonnières': ['Chardonnières', 'Les Anglais', 'Tiburon'],
    'Côteaux': ['Côteaux', 'Port-à-Piment', 'Roche-à-Bateau']
  },
  'Sud-Est': {
    'Bainet': ['Bainet', 'Côtes-de-Fer', 'Grand-Gosier'],
    'Belle-Anse': ['Belle-Anse', 'Anse-à-Pitres', 'Grand-Gosier', 'Thiotte'],
    'Jacmel': ['Jacmel', 'Cayes-Jacmel', 'La Vallée', 'Marigot']
  }
};

const StepTwoTransfer: React.FC<StepTwoTransferProps> = ({
  receiverDetails,
  onDetailsChange
}) => {
  const handleInputChange = (field: keyof ReceiverDetails, value: string) => {
    const updatedDetails = { ...receiverDetails, [field]: value };
    
    // Reset dependent fields when department or arrondissement changes
    if (field === 'department') {
      updatedDetails.arrondissement = '';
      updatedDetails.commune = '';
    } else if (field === 'arrondissement') {
      updatedDetails.commune = '';
    }
    
    onDetailsChange(updatedDetails);
  };

  const getArrondissements = () => {
    if (!receiverDetails.department || !haitiLocations[receiverDetails.department as keyof typeof haitiLocations]) {
      return [];
    }
    return Object.keys(haitiLocations[receiverDetails.department as keyof typeof haitiLocations]);
  };

  const getCommunes = () => {
    if (!receiverDetails.department || !receiverDetails.arrondissement) {
      return [];
    }
    const dept = haitiLocations[receiverDetails.department as keyof typeof haitiLocations];
    if (!dept || !dept[receiverDetails.arrondissement as keyof typeof dept]) {
      return [];
    }
    return dept[receiverDetails.arrondissement as keyof typeof dept];
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Card */}
      <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mr-4 shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-semibold text-gray-800 mb-2 block">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={receiverDetails.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 text-base font-medium"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-semibold text-gray-800 mb-2 block">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={receiverDetails.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className="h-12 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 text-base font-medium"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Card */}
      <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mr-4 shadow-lg">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
          </div>
          
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-800 mb-2 block">
              Phone Number
            </Label>
            <div className="flex rounded-xl overflow-hidden border-2 border-gray-200 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100 transition-all duration-200">
              <div className="flex items-center px-4 bg-gray-50 border-r border-gray-200">
                <span className="text-base font-bold text-gray-700">+509</span>
              </div>
              <Input
                id="phoneNumber"
                type="tel"
                value={receiverDetails.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
                className="h-12 border-0 rounded-none focus:ring-0 focus:border-0 text-base font-medium"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information Card */}
      <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mr-4 shadow-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Location Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="department" className="text-sm font-semibold text-gray-800 mb-2 block">
                Department
              </Label>
              <Select
                value={receiverDetails.department}
                onValueChange={(value) => handleInputChange('department', value)}
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 text-base font-medium">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200 shadow-xl">
                  {Object.keys(haitiLocations).map((dept) => (
                    <SelectItem key={dept} value={dept} className="text-base font-medium hover:bg-red-50">
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="arrondissement" className="text-sm font-semibold text-gray-800 mb-2 block">
                Arrondissement
              </Label>
              <Select
                value={receiverDetails.arrondissement}
                onValueChange={(value) => handleInputChange('arrondissement', value)}
                disabled={!receiverDetails.department}
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 text-base font-medium disabled:bg-gray-50 disabled:text-gray-400">
                  <SelectValue placeholder="Select arrondissement" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200 shadow-xl">
                  {getArrondissements().map((arr) => (
                    <SelectItem key={arr} value={arr} className="text-base font-medium hover:bg-red-50">
                      {arr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="commune" className="text-sm font-semibold text-gray-800 mb-2 block">
                Commune
              </Label>
              <Select
                value={receiverDetails.commune}
                onValueChange={(value) => handleInputChange('commune', value)}
                disabled={!receiverDetails.arrondissement}
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 text-base font-medium disabled:bg-gray-50 disabled:text-gray-400">
                  <SelectValue placeholder="Select commune" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200 shadow-xl">
                  {getCommunes().map((commune) => (
                    <SelectItem key={commune} value={commune} className="text-base font-medium hover:bg-red-50">
                      {commune}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTwoTransfer;

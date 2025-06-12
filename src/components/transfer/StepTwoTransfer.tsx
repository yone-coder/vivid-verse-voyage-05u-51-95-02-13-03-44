
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReceiverDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  commune: string;
  email?: string;
}

interface StepTwoTransferProps {
  receiverDetails: ReceiverDetails;
  onDetailsChange: (details: ReceiverDetails) => void;
}

const StepTwoTransfer: React.FC<StepTwoTransferProps> = ({ receiverDetails, onDetailsChange }) => {
  const handleInputChange = (field: keyof ReceiverDetails, value: string) => {
    onDetailsChange({
      ...receiverDetails,
      [field]: value,
    });
  };

  const haitiDepartments = [
    "Artibonite",
    "Centre",
    "Grand'Anse",
    "Nippes",
    "Nord",
    "Nord-Est",
    "Nord-Ouest",
    "Ouest",
    "Sud",
    "Sud-Est"
  ];

  const communesByDepartment: Record<string, string[]> = {
    "Artibonite": ["Gonaïves", "Saint-Marc", "Dessalines", "Gros-Morne", "Ennery", "L'Estère", "Petite-Rivière-de-l'Artibonite", "Verrettes", "La Chapelle", "Marchand-Dessalines"],
    "Centre": ["Hinche", "Mirebalais", "Lascahobas", "Belladère", "Savanette", "Boucan-Carré", "Thomassique", "Cerca-la-Source", "Thomonde", "Baptiste", "Cerca-Carvajal", "Maïssade"],
    "Grand'Anse": ["Jérémie", "Abricots", "Anse-d'Hainault", "Corail", "Dame-Marie", "Les Irois", "Marfranc", "Moron", "Pestel", "Roseaux", "Beaumont", "Chambellan"],
    "Nippes": ["Miragoâne", "Anse-à-Veau", "Arnaud", "Asile", "Barradères", "Fond-des-Nègres", "Grand-Boucan", "Petit-Trou-de-Nippes", "Plaisance-du-Sud", "L'Azile", "Baradères"],
    "Nord": ["Cap-Haïtien", "Fort-Dauphin", "Grande-Rivière-du-Nord", "Quartier-Morin", "Limonade", "Plaine-du-Nord", "Dondon", "Saint-Raphaël", "Bahon", "Borgne", "Capotille", "La Victoire", "Limbe", "Milot", "Ouanaminthe", "Pignon", "Pilate", "Port-Margot", "Ranquitte", "Terrier-Rouge"],
    "Nord-Est": ["Fort-Liberté", "Ouanaminthe", "Trou-du-Nord", "Terrier-Rouge", "Capotille", "Mont-Organisé", "Sainte-Suzanne", "Caracol", "Ferrier", "Mombin-Crochu", "Vallières"],
    "Nord-Ouest": ["Port-de-Paix", "Bassin-Bleu", "Bombardopolis", "Chansolme", "Jean-Rabel", "Môle-Saint-Nicolas", "Saint-Louis-du-Nord", "Anse-à-Foleur", "La Tortue"],
    "Ouest": ["Port-au-Prince", "Delmas", "Pétionville", "Carrefour", "Cité Soleil", "Tabarre", "Croix-des-Bouquets", "Kenscoff", "Gressier", "Léogâne", "Grand-Goâve", "Petit-Goâve", "Arcahaie", "Cabaret", "Cornillon", "Fonds-Verrettes", "Ganthier", "La Plaine", "Thomazeau", "Pointe-à-Raquette"],
    "Sud": ["Les Cayes", "Aquin", "Saint-Louis-du-Sud", "Cavaillon", "Chardonnières", "Chantal", "Côteaux", "Port-à-Piment", "Roche-à-Bateau", "Torbeck", "Arniquet", "Campin", "Maniche", "Port-Salut", "Saint-Jean-du-Sud"],
    "Sud-Est": ["Jacmel", "Marigot", "Cayes-Jacmel", "Bainet", "Côtes-de-Fer", "Grand-Gosier", "Anse-à-Pitres", "Belle-Anse", "Thiotte", "La Vallée", "Banatte", "Corail-Sourd"]
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-base font-medium text-gray-700">
          What's their full name?
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            value={receiverDetails.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            value={receiverDetails.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-base font-medium text-gray-700">
          What's their phone number?
        </Label>
        <div className="flex">
          <div className="flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
            <span className="text-sm text-gray-600">+509</span>
          </div>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            value={receiverDetails.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="rounded-l-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department" className="text-base font-medium text-gray-700">
          Which department are they in?
        </Label>
        <Select 
          value={receiverDetails.department} 
          onValueChange={(value) => {
            handleInputChange('department', value);
            handleInputChange('commune', ''); // Reset commune when department changes
          }}
        >
          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {haitiDepartments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="commune" className="text-base font-medium text-gray-700">
          Which city or commune are they in?
        </Label>
        <Select 
          value={receiverDetails.commune} 
          onValueChange={(value) => handleInputChange('commune', value)}
          disabled={!receiverDetails.department}
        >
          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder={receiverDetails.department ? "Select commune" : "Select department first"} />
          </SelectTrigger>
          <SelectContent>
            {receiverDetails.department && communesByDepartment[receiverDetails.department]?.map((commune) => (
              <SelectItem key={commune} value={commune}>
                {commune}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StepTwoTransfer;

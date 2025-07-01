import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from 'lucide-react';

interface ReceiverDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  department: string;
  commune: string;
  email?: string;
  moncashPhoneNumber?: string;
}

interface StepTwoTransferProps {
  receiverDetails: ReceiverDetails;
  onDetailsChange: (details: ReceiverDetails) => void;
  transferDetails?: {
    deliveryMethod: string;
  };
}

const StepTwoTransfer: React.FC<StepTwoTransferProps> = ({ 
  receiverDetails, 
  onDetailsChange,
  transferDetails 
}) => {
  const handleInputChange = (field: keyof ReceiverDetails, value: string) => {
    console.log(`Updating ${field} with value:`, value);
    const updatedDetails = {
      ...receiverDetails,
      [field]: value,
    };
    console.log('Updated details:', updatedDetails);
    onDetailsChange(updatedDetails);
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

  const handleDepartmentChange = (value: string) => {
    console.log('Department change handler called with:', value);
    console.log('Current receiverDetails before change:', receiverDetails);
    
    // Update department and reset commune
    const updatedDetails = {
      ...receiverDetails,
      department: value,
      commune: '' // Reset commune when department changes
    };
    
    console.log('Updated details after department change:', updatedDetails);
    onDetailsChange(updatedDetails);
  };

  const handleCommuneChange = (value: string) => {
    console.log('Commune change handler called with:', value);
    handleInputChange('commune', value);
  };

  console.log('StepTwoTransfer render - receiverDetails:', receiverDetails);

  const isMonCashOrNatCash = transferDetails?.deliveryMethod === 'moncash' || transferDetails?.deliveryMethod === 'natcash';
  const paymentMethod = transferDetails?.deliveryMethod === 'moncash' ? 'MonCash' : 'NatCash';

  return (
    <div className="w-full bg-white p-4">
  <FormHeader />
  
  <div className="space-y-8">
    {/* Personal Information Section */}
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
        Personal Information
      </h3>
      <div className="space-y-6">
        <NameFields 
          receiverDetails={receiverDetails}
          handleInputChange={handleInputChange}
        />
        
        {/* Phone Number Section */}
        {!isMonCashOrNatCash && (
          <PhoneField 
            receiverDetails={receiverDetails}
            handleInputChange={handleInputChange}
          />
        )}

        {isMonCashOrNatCash && (
          <MonCashPhoneField 
            receiverDetails={receiverDetails}
            handleInputChange={handleInputChange}
            paymentMethod={paymentMethod}
          />
        )}
      </div>
    </div>

    {/* Location Section */}
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
        Location Details
      </h3>
      <LocationFields 
        receiverDetails={receiverDetails}
        handleDepartmentChange={handleDepartmentChange}
        handleCommuneChange={handleCommuneChange}
      />
    </div>
  </div>

  <SubmitButton />
</div>
  );
};

export default StepTwoTransfer;

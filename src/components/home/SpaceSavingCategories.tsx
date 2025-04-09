
import React from 'react';
import { 
  Smartphone, Home, ShoppingBag, Droplet, Trophy, Gamepad, Gift, 
  Car, BookOpen, PawPrint, Utensils, Headphones, Monitor, Camera, 
  Clock, Coffee, Film, Plane, Music, Heart, DollarSign, ShoppingCart, 
  Briefcase, Globe, Map, Umbrella, Scissors 
} from 'lucide-react';

const SpaceSavingCategories = () => {
  const categories = [
    { name: 'Electronics', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
    { name: 'Home & Kitchen', shortName: 'Home', icon: Home, color: 'bg-green-100 text-green-600' },
    { name: 'Fashion', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
    { name: 'Beauty', icon: Droplet, color: 'bg-pink-100 text-pink-600' },
    { name: 'Sports', icon: Trophy, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Toys & Games', shortName: 'Toys', icon: Gamepad, color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Jewelry', icon: Gift, color: 'bg-red-100 text-red-600' },
    { name: 'Automotive', shortName: 'Auto', icon: Car, color: 'bg-gray-100 text-gray-600' },
    { name: 'Books', icon: BookOpen, color: 'bg-amber-100 text-amber-600' },
    { name: 'Pets', icon: PawPrint, color: 'bg-lime-100 text-lime-600' },
    { name: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
    { name: 'Audio', icon: Headphones, color: 'bg-cyan-100 text-cyan-600' },
    { name: 'Computers', shortName: 'Tech', icon: Monitor, color: 'bg-blue-100 text-blue-600' },
    { name: 'Photography', shortName: 'Photo', icon: Camera, color: 'bg-violet-100 text-violet-600' },
    { name: 'Watches', icon: Clock, color: 'bg-slate-100 text-slate-600' },
    { name: 'Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
    { name: 'Movies', icon: Film, color: 'bg-red-100 text-red-600' },
    { name: 'Travel', icon: Plane, color: 'bg-sky-100 text-sky-600' },
    { name: 'Music', icon: Music, color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Health', icon: Heart, color: 'bg-green-100 text-green-600' },
    { name: 'Finance', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Apparel', icon: ShoppingCart, color: 'bg-purple-100 text-purple-600' },
    { name: 'Business', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
    { name: 'Outdoor', icon: Globe, color: 'bg-green-100 text-green-600' },
    { name: 'Adventure', icon: Map, color: 'bg-orange-100 text-orange-600' },
    { name: 'Seasonal', icon: Umbrella, color: 'bg-teal-100 text-teal-600' },
    { name: 'Crafts', icon: Scissors, color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-3 pt-3 pb-2">
        <h2 className="text-lg font-bold">Categories</h2>
        <a href="#" className="text-orange-500 text-sm">View All</a>
      </div>
      
      <div className="overflow-x-auto pb-3 scrollbar-hide no-scrollbar">
        <div className="flex flex-col space-y-3 px-3" style={{ minWidth: "700px" }}>
          {/* Row 1 */}
          <div className="flex space-x-2">
            {categories.slice(0, 9).map((category, index) => (
              <div 
                key={index} 
                className={`flex items-center rounded-lg py-1 px-3 ${category.color} hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0`}
              >
                <category.icon size={16} className="mr-2" />
                <span className="text-xs font-medium">
                  {category.shortName || category.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Row 2 */}
          <div className="flex space-x-2">
            {categories.slice(9, 18).map((category, index) => (
              <div 
                key={index} 
                className={`flex items-center rounded-lg py-1 px-3 ${category.color} hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0`}
              >
                <category.icon size={16} className="mr-2" />
                <span className="text-xs font-medium">
                  {category.shortName || category.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Row 3 */}
          <div className="flex space-x-2">
            {categories.slice(18).map((category, index) => (
              <div 
                key={index} 
                className={`flex items-center rounded-lg py-1 px-3 ${category.color} hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0`}
              >
                <category.icon size={16} className="mr-2" />
                <span className="text-xs font-medium">
                  {category.shortName || category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceSavingCategories;

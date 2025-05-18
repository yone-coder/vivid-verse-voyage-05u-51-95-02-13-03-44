import React from 'react';
import { Flame, Sparkles, Clock, ArrowRight, PhoneCall, Wifi, Tv } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// This is the same category structure used in the admin panel
interface Category {
  id: number;
  name: string;
  shortName: string;
  isPopular: boolean;
  tags: string[];
  imageId: number;
}

// Demo categories - in a real app this would come from an API
const demoCategories: Category[] = [
  { id: 1, name: 'Electronics', shortName: 'Electronics', tags: ['Hot'], isPopular: true, imageId: 1060 },
  { id: 2, name: 'Home & Kitchen', shortName: 'Home', tags: ['New'], isPopular: false, imageId: 1084 },
  { id: 3, name: 'Fashion', shortName: 'Fashion', tags: [], isPopular: true, imageId: 1027 },
  { id: 4, name: 'Beauty', shortName: 'Beauty', tags: ['Trending'], isPopular: true, imageId: 1062 },
  { id: 5, name: 'Sports', shortName: 'Sports', tags: [], isPopular: false, imageId: 1044 },
  { id: 6, name: 'Toys & Games', shortName: 'Toys', tags: [], isPopular: false, imageId: 1069 },
  { id: 7, name: 'Jewelry', shortName: 'Jewelry', tags: ['Premium'], isPopular: false, imageId: 1081 },
  { id: 8, name: 'Automotive', shortName: 'Auto', tags: [], isPopular: false, imageId: 1076 },
  { id: 9, name: 'Books', shortName: 'Books', tags: [], isPopular: false, imageId: 1050 },
  { id: 10, name: 'Pets', shortName: 'Pets', tags: ['New'], isPopular: false, imageId: 1025 },
  { id: 11, name: 'Food', shortName: 'Food', tags: [], isPopular: false, imageId: 1080 },
  { id: 12, name: 'Audio', shortName: 'Audio', tags: ['Premium'], isPopular: false, imageId: 1083 },
  { id: 13, name: 'Computers', shortName: 'Tech', tags: ['Hot'], isPopular: true, imageId: 1051 },
  { id: 14, name: 'Photography', shortName: 'Photo', tags: [], isPopular: false, imageId: 1061 },
  { id: 15, name: 'Watches', shortName: 'Watches', tags: [], isPopular: false, imageId: 1079 },
  { id: 16, name: 'Coffee', shortName: 'Coffee', tags: [], isPopular: false, imageId: 1060 },
  { id: 17, name: 'Movies', shortName: 'Movies', tags: ['Hot'], isPopular: false, imageId: 1032 }
];

// Fetch categories function
const fetchCategories = async (): Promise<Category[]> => {
  // This would be an API call in a real app
  return new Promise((resolve) => {
    setTimeout(() => resolve(demoCategories), 300);
  });
};

const SpaceSavingCategories = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['home-categories'],
    queryFn: fetchCategories,
    // In a real app, these would be appropriate caching settings
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes - renamed from cacheTime to gcTime
  });

  const getCategoryImageUrl = (category: Category) => {
    return `https://picsum.photos/id/${category.imageId}/80/80`;
  };

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'hot':
        return <Flame size={10} className="mr-0.5" />;
      case 'new':
        return <Sparkles size={10} className="mr-0.5" />;
      case 'limited':
        return <Clock size={10} className="mr-0.5" />;
      default:
        return null;
    }
  };

  const CategoryItem = ({ category }: { category: Category }) => (
    <div className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation">
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 shadow-sm">
        <img
          src={getCategoryImageUrl(category)}
          alt={category.name}
          className="h-full w-full object-cover"
        />
        {category.isPopular && (
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-red-500/70 to-transparent flex items-start justify-center">
            <span className="text-[8px] font-bold text-white">POPULAR</span>
          </div>
        )}
        {category.tags.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
            {category.tags.map((tag, idx) => (
              <div key={idx} className={`flex items-center justify-center w-full px-1 py-0.5 text-[7px] font-bold ${
                tag.toLowerCase() === 'hot' ? 'bg-red-500/80 text-white' : 
                tag.toLowerCase() === 'new' ? 'bg-blue-500/80 text-white' : 
                tag.toLowerCase() === 'limited' ? 'bg-purple-500/80 text-white' :
                tag.toLowerCase() === 'trending' ? 'bg-yellow-500/80 text-white' :
                tag.toLowerCase() === 'premium' || tag.toLowerCase() === 'special' ? 'bg-amber-500/80 text-white' :
                'bg-gray-500/80 text-white'
              }`}>
                {getTagIcon(tag)}
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <span className="text-[10px] font-medium text-gray-700 text-center truncate w-full leading-snug mt-0.5">
        {category.shortName || category.name}
      </span>
    </div>
  );

  // Transfer Money shortcut component with navigation
  const TransferShortcut = () => (
    <div 
      className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation"
      onClick={() => navigate('/transfer')}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-green-100 shadow-sm flex items-center justify-center">
        <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center">
          <ArrowRight className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
          <div className="flex items-center justify-center w-full px-1 py-0.5 text-[7px] font-bold bg-green-600/90 text-white">
            TRANSFER
          </div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-gray-700 text-center truncate w-full leading-snug mt-0.5">
        Transfer Money
      </span>
    </div>
  );
  
  // Top Up shortcut component with navigation
  const TopUpShortcut = () => (
    <div 
      className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation"
      onClick={() => navigate('/topup')}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-blue-100 shadow-sm flex items-center justify-center">
        <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
          <PhoneCall className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
          <div className="flex items-center justify-center w-full px-1 py-0.5 text-[7px] font-bold bg-blue-600/90 text-white">
            TOP UP
          </div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-gray-700 text-center truncate w-full leading-snug mt-0.5">
        Top Up
      </span>
    </div>
  );

  // Netflix shortcut component with navigation
  const NetflixShortcut = () => (
    <div 
      className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation"
      onClick={() => navigate('/netflix')}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-red-100 shadow-sm flex items-center justify-center">
        <div className="bg-red-600 w-10 h-10 rounded-full flex items-center justify-center">
          <Tv className="h-6 w-6 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
          <div className="flex items-center justify-center w-full px-1 py-0.5 text-[7px] font-bold bg-red-700/90 text-white">
            NETFLIX
          </div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-gray-700 text-center truncate w-full leading-snug mt-0.5">
        Netflix
      </span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full bg-white py-2">
        <div className="flex space-x-2 px-2 overflow-x-auto no-scrollbar">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col items-center w-16">
              <div className="w-14 h-14 rounded-lg bg-gray-200 animate-pulse" />
              <div className="w-12 h-2 mt-1 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="py-1 bg-white">
        <div className="overflow-x-auto overscroll-x-contain no-scrollbar pl-1 scroll-smooth -webkit-overflow-scrolling-touch">
          <div className="grid grid-flow-col auto-cols-max gap-1 pr-1" style={{ gridTemplateRows: 'repeat(2, auto)' }}>
            {/* Add Transfer Money shortcut as the first element in the first row */}
            <div style={{ gridRow: '1' }}>
              <TransferShortcut />
            </div>
            
            {/* Add Top Up shortcut as the second element in the first row */}
            <div style={{ gridRow: '1' }}>
              <TopUpShortcut />
            </div>
            
            {/* Add Netflix shortcut as the third element in the first row */}
            <div style={{ gridRow: '1' }}>
              <NetflixShortcut />
            </div>
            
            {/* Render all the categories */}
            {categories.map((category, index) => (
              <div key={category.id} style={{ gridRow: index % 2 === 0 ? '1' : '2' }}>
                <CategoryItem category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceSavingCategories;

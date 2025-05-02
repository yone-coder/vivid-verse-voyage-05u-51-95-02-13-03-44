import React from 'react';
import { Flame, Sparkles, Percent, Clock } from 'lucide-react';

const AliExpressCategories = () => {
  const imageSeeds = {
    'Electronics': 1060,
    'Home & Kitchen': 1084,
    'Fashion': 1027,
    'Beauty': 1062,
    'Sports': 1044,
    'Toys & Games': 1069,
    'Jewelry': 1081,
    'Automotive': 1076,
    'Books': 1050,
    'Pets': 1025,
    'Food': 1080,
    'Audio': 1083,
    'Computers': 1051,
    'Photography': 1061,
    'Watches': 1079,
    'Coffee': 1060,
    'Movies': 1032,
    'Travel': 1035,
    'Music': 1085,
    'Health': 1039,
    'Finance': 1082,
    'Apparel': 1033,
    'Business': 1043,
    'Outdoor': 1011,
    'Adventure': 1036,
    'Seasonal': 1018,
    'Crafts': 1068
  };

  const getCategoryImageUrl = (category) => {
    const seed = imageSeeds[category.name];
    return `https://picsum.photos/id/${seed}/80/80`;
  };

  // Updated categories with more promotional tags
  const categories = [
    { name: 'Electronics', shortName: 'Electronics', tags: ['Hot', '20% Off'], isPopular: true },
    { name: 'Home & Kitchen', shortName: 'Home', tags: ['New'], isPopular: false },
    { name: 'Fashion', shortName: 'Fashion', tags: ['Sale'], isPopular: true },
    { name: 'Beauty', shortName: 'Beauty', tags: ['Trending'], isPopular: true },
    { name: 'Sports', shortName: 'Sports', tags: ['30% Off'], isPopular: false },
    { name: 'Toys & Games', shortName: 'Toys', tags: ['New'], isPopular: false },
    { name: 'Jewelry', shortName: 'Jewelry', tags: ['Premium'], isPopular: false },
    { name: 'Automotive', shortName: 'Auto', tags: ['Hot Deal'], isPopular: false },
    { name: 'Books', shortName: 'Books', tags: ['2 for 1'], isPopular: false },
    { name: 'Pets', shortName: 'Pets', tags: ['New'], isPopular: false },
    { name: 'Food', shortName: 'Food', tags: ['Special'], isPopular: false },
    { name: 'Audio', shortName: 'Audio', tags: ['Premium'], isPopular: false },
    { name: 'Computers', shortName: 'Tech', tags: ['Hot', '15% Off'], isPopular: true },
    { name: 'Photography', shortName: 'Photo', tags: ['Sale'], isPopular: false },
    { name: 'Watches', shortName: 'Watches', tags: ['Premium'], isPopular: false },
    { name: 'Coffee', shortName: 'Coffee', tags: ['Special'], isPopular: false },
    { name: 'Movies', shortName: 'Movies', tags: ['Hot'], isPopular: false },
    { name: 'Travel', shortName: 'Travel', tags: ['Deal'], isPopular: false },
    { name: 'Music', shortName: 'Music', tags: ['Limited'], isPopular: false },
    { name: 'Health', shortName: 'Health', tags: ['Trending'], isPopular: false },
    { name: 'Finance', shortName: 'Finance', tags: ['New'], isPopular: false },
    { name: 'Apparel', shortName: 'Apparel', tags: ['Sale', 'Hot'], isPopular: true },
    { name: 'Business', shortName: 'Business', tags: ['Deal'], isPopular: false },
    { name: 'Outdoor', shortName: 'Outdoor', tags: ['Hot'], isPopular: false },
    { name: 'Adventure', shortName: 'Adventure', tags: ['Limited'], isPopular: false },
    { name: 'Seasonal', shortName: 'Seasonal', tags: ['Limited'], isPopular: false },
    { name: 'Crafts', shortName: 'Crafts', tags: ['Special'], isPopular: false }
  ];

  const getTagIcon = (tag) => {
    switch (tag.toLowerCase()) {
      case 'hot':
      case 'hot deal':
        return <Flame size={10} className="mr-0.5" />;
      case 'new':
        return <Sparkles size={10} className="mr-0.5" />;
      case 'sale':
      case 'deal':
      case '20% off':
      case '30% off':
      case '15% off':
      case '2 for 1':
        return <Percent size={10} className="mr-0.5" />;
      case 'limited':
        return <Clock size={10} className="mr-0.5" />;
      default:
        return null;
    }
  };

  const CategoryItem = ({ category }) => (
    <div className="flex flex-col items-center w-16 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation">
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-50 mb-1 shadow-sm">
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
        
        {/* Moved tags to bottom left of thumbnail */}
        {category.tags.length > 0 && (
          <div className="absolute bottom-0 left-0 flex flex-wrap gap-0.5 p-0.5">
            {category.tags.map((tag, idx) => (
              <div key={idx} className={`flex items-center px-1 rounded-sm text-[7px] font-medium ${
                tag.toLowerCase() === 'hot' || tag.toLowerCase().includes('hot') ? 'bg-red-100 text-red-600' : 
                tag.toLowerCase() === 'new' ? 'bg-blue-100 text-blue-600' : 
                tag.toLowerCase().includes('off') || tag.toLowerCase() === 'sale' || tag.toLowerCase() === 'deal' ? 'bg-green-100 text-green-600' :
                tag.toLowerCase() === 'limited' ? 'bg-purple-100 text-purple-600' :
                tag.toLowerCase() === 'trending' ? 'bg-yellow-100 text-yellow-600' :
                tag.toLowerCase() === 'premium' || tag.toLowerCase() === 'special' ? 'bg-amber-100 text-amber-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {getTagIcon(tag)}
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-gray-700 text-center truncate w-full leading-tight">
        {category.shortName || category.name}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-white">
      <div className="py-3 bg-white">
        <div className="overflow-x-auto overscroll-x-contain no-scrollbar pl-2 scroll-smooth -webkit-overflow-scrolling-touch">
          <div className="grid grid-flow-col auto-cols-max gap-3 pr-4" style={{ gridTemplateRows: 'repeat(2, auto)' }}>
            {categories.map((category, index) => (
              <div key={index} className="pb-1" style={{ gridRow: index % 2 === 0 ? '1' : '2' }}>
                <CategoryItem category={category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AliExpressCategories;
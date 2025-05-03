import React from 'react';
import { Flame, Sparkles, Clock } from 'lucide-react';

const AliExpressCategories = () => {
  const imageSeeds = {
    'Electronics': 1060, 'Home & Kitchen': 1084, 'Fashion': 1027, 'Beauty': 1062,
    'Sports': 1044, 'Toys & Games': 1069, 'Jewelry': 1081, 'Automotive': 1076,
    'Books': 1050, 'Pets': 1025, 'Food': 1080, 'Audio': 1083, 'Computers': 1051,
    'Photography': 1061, 'Watches': 1079, 'Coffee': 1060, 'Movies': 1032,
    'Travel': 1035, 'Music': 1085, 'Health': 1039, 'Finance': 1082,
    'Apparel': 1033, 'Business': 1043, 'Outdoor': 1011, 'Adventure': 1036,
    'Seasonal': 1018, 'Crafts': 1068
  };

  const getCategoryImageUrl = (category) => {
    const seed = imageSeeds[category.name];
    return `https://picsum.photos/id/${seed}/64/64`;
  };

  const categories = [
    { name: 'Electronics', shortName: 'Electronics', tags: ['Hot'], isPopular: true },
    { name: 'Home & Kitchen', shortName: 'Home', tags: ['New'], isPopular: false },
    { name: 'Fashion', shortName: 'Fashion', tags: [], isPopular: true },
    { name: 'Beauty', shortName: 'Beauty', tags: ['Trending'], isPopular: true },
    { name: 'Sports', shortName: 'Sports', tags: [], isPopular: false },
    { name: 'Toys & Games', shortName: 'Toys', tags: [], isPopular: false },
    { name: 'Jewelry', shortName: 'Jewelry', tags: ['Premium'], isPopular: false },
    { name: 'Automotive', shortName: 'Auto', tags: [], isPopular: false },
    { name: 'Books', shortName: 'Books', tags: [], isPopular: false },
    { name: 'Pets', shortName: 'Pets', tags: ['New'], isPopular: false },
    { name: 'Food', shortName: 'Food', tags: [], isPopular: false },
    { name: 'Audio', shortName: 'Audio', tags: ['Premium'], isPopular: false },
    { name: 'Computers', shortName: 'Tech', tags: ['Hot'], isPopular: true },
    { name: 'Photography', shortName: 'Photo', tags: [], isPopular: false },
    { name: 'Watches', shortName: 'Watches', tags: [], isPopular: false },
    { name: 'Coffee', shortName: 'Coffee', tags: [], isPopular: false },
    { name: 'Movies', shortName: 'Movies', tags: ['Hot'], isPopular: false },
    { name: 'Travel', shortName: 'Travel', tags: [], isPopular: false },
    { name: 'Music', shortName: 'Music', tags: ['Limited'], isPopular: false },
    { name: 'Health', shortName: 'Health', tags: [], isPopular: false },
    { name: 'Finance', shortName: 'Finance', tags: [], isPopular: false },
    { name: 'Apparel', shortName: 'Apparel', tags: ['Hot'], isPopular: true },
    { name: 'Business', shortName: 'Business', tags: [], isPopular: false },
    { name: 'Outdoor', shortName: 'Outdoor', tags: [], isPopular: false },
    { name: 'Adventure', shortName: 'Adventure', tags: ['Limited'], isPopular: false },
    { name: 'Seasonal', shortName: 'Seasonal', tags: [], isPopular: false },
    { name: 'Crafts', shortName: 'Crafts', tags: ['Special'], isPopular: false }
  ];

  const getTagIcon = (tag) => {
    switch (tag.toLowerCase()) {
      case 'hot': return <Flame size={8} className="mr-0.5" />;
      case 'new': return <Sparkles size={8} className="mr-0.5" />;
      case 'limited': return <Clock size={8} className="mr-0.5" />;
      default: return null;
    }
  };

  const CategoryItem = ({ category }) => (
    <div className="flex flex-col items-center w-14 flex-shrink-0 transition-opacity active:opacity-80">
      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 mb-0.5 shadow-sm">
        <img
          src={getCategoryImageUrl(category)}
          alt={category.name}
          className="h-full w-full object-cover"
        />
        {category.isPopular && (
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-red-500/70 to-transparent flex items-start justify-center">
            <span className="text-[7px] font-bold text-white leading-none">POPULAR</span>
          </div>
        )}
        {category.tags.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full">
            {category.tags.map((tag, idx) => (
              <div key={idx} className={`flex items-center justify-center w-full px-0.5 py-0.5 text-[6px] font-bold ${
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
      <span className="text-[9px] font-medium text-gray-700 text-center truncate w-full leading-none">
        {category.shortName}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-white">
      <div className="py-1 bg-white">
        <div className="overflow-x-auto overscroll-x-contain no-scrollbar pl-2 pr-1 scroll-smooth -webkit-overflow-scrolling-touch">
          <div className="grid grid-flow-col auto-cols-max gap-1.5" style={{ gridTemplateRows: 'repeat(2, auto)' }}>
            {categories.map((category, index) => (
              <div key={index} style={{ gridRow: index % 2 === 0 ? '1' : '2' }}>
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
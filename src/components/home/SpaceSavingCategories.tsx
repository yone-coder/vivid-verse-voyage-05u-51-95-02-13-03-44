import React from 'react';

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

  const categories = [
    { name: 'Electronics', shortName: 'Electronics' },
    { name: 'Home & Kitchen', shortName: 'Home' },
    { name: 'Fashion', shortName: 'Fashion' },
    { name: 'Beauty', shortName: 'Beauty' },
    { name: 'Sports', shortName: 'Sports' },
    { name: 'Toys & Games', shortName: 'Toys' },
    { name: 'Jewelry', shortName: 'Jewelry' },
    { name: 'Automotive', shortName: 'Auto' },
    { name: 'Books', shortName: 'Books' },
    { name: 'Pets', shortName: 'Pets' },
    { name: 'Food', shortName: 'Food' },
    { name: 'Audio', shortName: 'Audio' },
    { name: 'Computers', shortName: 'Tech' },
    { name: 'Photography', shortName: 'Photo' },
    { name: 'Watches', shortName: 'Watches' },
    { name: 'Coffee', shortName: 'Coffee' },
    { name: 'Movies', shortName: 'Movies' },
    { name: 'Travel', shortName: 'Travel' },
    { name: 'Music', shortName: 'Music' },
    { name: 'Health', shortName: 'Health' },
    { name: 'Finance', shortName: 'Finance' },
    { name: 'Apparel', shortName: 'Apparel' },
    { name: 'Business', shortName: 'Business' },
    { name: 'Outdoor', shortName: 'Outdoor' },
    { name: 'Adventure', shortName: 'Adventure' },
    { name: 'Seasonal', shortName: 'Seasonal' },
    { name: 'Crafts', shortName: 'Crafts' }
  ];

  // For simultaneously scrollable rows, we don't need to split the categories

  const CategoryItem = ({ category }) => (
    <div className="flex flex-col items-center w-14 flex-shrink-0 active:opacity-80 transition-opacity touch-manipulation">
      <div className="w-11 h-11 rounded-lg overflow-hidden bg-gray-50 mb-1 shadow-sm">
        <img
          src={getCategoryImageUrl(category)}
          alt={category.name}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-xs font-normal text-gray-600 text-center truncate w-full leading-tight">
        {category.shortName || category.name}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-gray-50">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 bg-white">
        <h2 className="text-sm font-medium text-gray-700">Categories</h2>
        <a href="#" className="text-red-500 hover:text-red-600 active:text-red-700 text-xs font-medium">View All</a>
      </div>

      <div className="py-2 bg-white">
        {/* Edge-to-edge scrollable container with pl-2 */}
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
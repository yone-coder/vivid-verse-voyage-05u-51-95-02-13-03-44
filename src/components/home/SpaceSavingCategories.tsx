import React from 'react';

const SpaceSavingCategories = () => {
  const imageSeeds = {
    'Electronics': 180,
    'Home & Kitchen': 1080,
    'Fashion': 1027,
    'Beauty': 1062,
    'Sports': 1044,
    'Toys & Games': 1069,
    'Jewelry': 1084,
    'Automotive': 1076,
    'Books': 1050,
    'Pets': 1025,
    'Food': 1081,
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
    { name: 'Electronics', shortName: 'Electronics', color: 'bg-blue-100 text-blue-600' },
    { name: 'Home & Kitchen', shortName: 'Home', color: 'bg-green-100 text-green-600' },
    { name: 'Fashion', shortName: 'Fashion', color: 'bg-purple-100 text-purple-600' },
    { name: 'Beauty', shortName: 'Beauty', color: 'bg-pink-100 text-pink-600' },
    { name: 'Sports', shortName: 'Sports', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Toys & Games', shortName: 'Toys', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Jewelry', shortName: 'Jewelry', color: 'bg-red-100 text-red-600' },
    { name: 'Automotive', shortName: 'Auto', color: 'bg-gray-100 text-gray-600' },
    { name: 'Books', shortName: 'Books', color: 'bg-amber-100 text-amber-600' },
    { name: 'Pets', shortName: 'Pets', color: 'bg-lime-100 text-lime-600' },
    { name: 'Food', shortName: 'Food', color: 'bg-orange-100 text-orange-600' },
    { name: 'Audio', shortName: 'Audio', color: 'bg-cyan-100 text-cyan-600' },
    { name: 'Computers', shortName: 'Tech', color: 'bg-blue-100 text-blue-600' },
    { name: 'Photography', shortName: 'Photo', color: 'bg-violet-100 text-violet-600' },
    { name: 'Watches', shortName: 'Watches', color: 'bg-slate-100 text-slate-600' },
    { name: 'Coffee', shortName: 'Coffee', color: 'bg-amber-100 text-amber-600' },
    { name: 'Movies', shortName: 'Movies', color: 'bg-red-100 text-red-600' },
    { name: 'Travel', shortName: 'Travel', color: 'bg-sky-100 text-sky-600' },
    { name: 'Music', shortName: 'Music', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Health', shortName: 'Health', color: 'bg-green-100 text-green-600' },
    { name: 'Finance', shortName: 'Finance', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Apparel', shortName: 'Apparel', color: 'bg-purple-100 text-purple-600' },
    { name: 'Business', shortName: 'Business', color: 'bg-blue-100 text-blue-600' },
    { name: 'Outdoor', shortName: 'Outdoor', color: 'bg-green-100 text-green-600' },
    { name: 'Adventure', shortName: 'Adventure', color: 'bg-orange-100 text-orange-600' },
    { name: 'Seasonal', shortName: 'Seasonal', color: 'bg-teal-100 text-teal-600' },
    { name: 'Crafts', shortName: 'Crafts', color: 'bg-purple-100 text-purple-600' }
  ];

  const CategoryItem = ({ category }) => (
    <div className={`flex items-center rounded-full py-0 ${category.color} hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0 overflow-hidden`}>
      <div className="h-8 w-8 flex-shrink-0 bg-white rounded-full overflow-hidden">
        <img
          src={getCategoryImageUrl(category)}
          alt={category.name}
          className="h-full w-full object-cover"
        />
      </div>
      <span className="text-sm font-medium px-3 pr-4">
        {category.shortName || category.name}
      </span>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-3 pt-3 pb-2">
        <h2 className="text-lg font-bold">Categories</h2>
        <a href="#" className="text-orange-500 text-sm">View All</a>
      </div>

      <div className="overflow-x-auto pb-3 scrollbar-hide no-scrollbar">
        <div className="flex flex-col space-y-3 px-3" style={{ minWidth: "700px" }}>
          <div className="flex space-x-2">
            {categories.slice(0, 9).map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>
          <div className="flex space-x-2">
            {categories.slice(9, 18).map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>
          <div className="flex space-x-2">
            {categories.slice(18).map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceSavingCategories;
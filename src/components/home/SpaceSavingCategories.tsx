import React from 'react';

const SpaceSavingCategories = () => {
  // Function to get Unsplash-based image URL for a category
  const getCategoryImageUrl = (category) => {
    // This will return a different image each time unless a unique seed is added
    return `https://source.unsplash.com/80x80/?${encodeURIComponent(category.name)}`;
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

  const CategoryItem = ({ category }) => {
    return (
      <div 
        className={`flex items-center rounded-full py-0 ${category.color} hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0 overflow-hidden`}
      >
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
  };

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
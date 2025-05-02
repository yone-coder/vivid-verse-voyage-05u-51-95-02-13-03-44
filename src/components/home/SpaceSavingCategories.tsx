import React from 'react';

const SpaceSavingCategories = () => {
  // Function to get appropriate placeholder image URL for each category
  const getCategoryImageUrl = (category) => {
    // Using Lorem Picsum for free placeholder images
    const imageSeeds = {
      'Electronics': 250,
      'Home & Kitchen': 42,
      'Fashion': 64,
      'Beauty': 26,
      'Sports': 37,
      'Toys & Games': 101,
      'Jewelry': 152,
      'Automotive': 183,
      'Books': 24,
      'Pets': 237,
      'Food': 292,
      'Audio': 103,
      'Computers': 201,
      'Photography': 79,
      'Watches': 174,
      'Coffee': 225,
      'Movies': 99,
      'Travel': 155,
      'Music': 167,
      'Health': 232,
      'Finance': 218,
      'Apparel': 91,
      'Business': 143,
      'Outdoor': 77,
      'Adventure': 119,
      'Seasonal': 204,
      'Crafts': 129
    };

    const seed = imageSeeds[category.name] || parseInt(category.imageId, 10);
    return `/api/placeholder/80/80?text=${category.shortName.charAt(0)}`;
    // Note: In a real environment, you could use:
    // return `https://picsum.photos/seed/${seed}/80/80`;
  };

  const categories = [
    { name: 'Electronics', shortName: 'Electronics', color: 'bg-blue-100 text-blue-600', imageId: '1' },
    { name: 'Home & Kitchen', shortName: 'Home', color: 'bg-green-100 text-green-600', imageId: '2' },
    { name: 'Fashion', shortName: 'Fashion', color: 'bg-purple-100 text-purple-600', imageId: '3' },
    { name: 'Beauty', shortName: 'Beauty', color: 'bg-pink-100 text-pink-600', imageId: '4' },
    { name: 'Sports', shortName: 'Sports', color: 'bg-yellow-100 text-yellow-600', imageId: '5' },
    { name: 'Toys & Games', shortName: 'Toys', color: 'bg-indigo-100 text-indigo-600', imageId: '6' },
    { name: 'Jewelry', shortName: 'Jewelry', color: 'bg-red-100 text-red-600', imageId: '7' },
    { name: 'Automotive', shortName: 'Auto', color: 'bg-gray-100 text-gray-600', imageId: '8' },
    { name: 'Books', shortName: 'Books', color: 'bg-amber-100 text-amber-600', imageId: '9' },
    { name: 'Pets', shortName: 'Pets', color: 'bg-lime-100 text-lime-600', imageId: '10' },
    { name: 'Food', shortName: 'Food', color: 'bg-orange-100 text-orange-600', imageId: '11' },
    { name: 'Audio', shortName: 'Audio', color: 'bg-cyan-100 text-cyan-600', imageId: '12' },
    { name: 'Computers', shortName: 'Tech', color: 'bg-blue-100 text-blue-600', imageId: '13' },
    { name: 'Photography', shortName: 'Photo', color: 'bg-violet-100 text-violet-600', imageId: '14' },
    { name: 'Watches', shortName: 'Watches', color: 'bg-slate-100 text-slate-600', imageId: '15' },
    { name: 'Coffee', shortName: 'Coffee', color: 'bg-amber-100 text-amber-600', imageId: '16' },
    { name: 'Movies', shortName: 'Movies', color: 'bg-red-100 text-red-600', imageId: '17' },
    { name: 'Travel', shortName: 'Travel', color: 'bg-sky-100 text-sky-600', imageId: '18' },
    { name: 'Music', shortName: 'Music', color: 'bg-indigo-100 text-indigo-600', imageId: '19' },
    { name: 'Health', shortName: 'Health', color: 'bg-green-100 text-green-600', imageId: '20' },
    { name: 'Finance', shortName: 'Finance', color: 'bg-emerald-100 text-emerald-600', imageId: '21' },
    { name: 'Apparel', shortName: 'Apparel', color: 'bg-purple-100 text-purple-600', imageId: '22' },
    { name: 'Business', shortName: 'Business', color: 'bg-blue-100 text-blue-600', imageId: '23' },
    { name: 'Outdoor', shortName: 'Outdoor', color: 'bg-green-100 text-green-600', imageId: '24' },
    { name: 'Adventure', shortName: 'Adventure', color: 'bg-orange-100 text-orange-600', imageId: '25' },
    { name: 'Seasonal', shortName: 'Seasonal', color: 'bg-teal-100 text-teal-600', imageId: '26' },
    { name: 'Crafts', shortName: 'Crafts', color: 'bg-purple-100 text-purple-600', imageId: '27' }
  ];

  // Function to render the category with rounded image
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
          {/* Row 1 */}
          <div className="flex space-x-2">
            {categories.slice(0, 9).map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex space-x-2">
            {categories.slice(9, 18).map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>

          {/* Row 3 */}
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
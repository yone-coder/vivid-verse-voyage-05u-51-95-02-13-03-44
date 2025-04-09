
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://placehold.co/200x200/FFC107/FFF?text=Electronics",
    count: 2453
  },
  {
    id: 2,
    name: "Home & Kitchen",
    image: "https://placehold.co/200x200/4CAF50/FFF?text=Home",
    count: 1859
  },
  {
    id: 3,
    name: "Fashion",
    image: "https://placehold.co/200x200/E91E63/FFF?text=Fashion",
    count: 3241
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://placehold.co/200x200/9C27B0/FFF?text=Beauty",
    count: 958
  },
  {
    id: 5,
    name: "Sports",
    image: "https://placehold.co/200x200/2196F3/FFF?text=Sports",
    count: 762
  },
  {
    id: 6,
    name: "Toys & Games",
    image: "https://placehold.co/200x200/FF5722/FFF?text=Toys",
    count: 1254
  }
];

export default function FeaturedCategories() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Categories</h2>
          <Link to="#" className="text-sm text-red-500 hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category) => (
            <Link to="#" key={category.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-sm font-medium truncate">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

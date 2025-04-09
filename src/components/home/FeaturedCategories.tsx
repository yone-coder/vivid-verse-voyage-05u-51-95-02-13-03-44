
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
  },
  {
    id: 7,
    name: "Jewelry",
    image: "https://placehold.co/200x200/9E9E9E/FFF?text=Jewelry",
    count: 584
  },
  {
    id: 8,
    name: "Automotive",
    image: "https://placehold.co/200x200/795548/FFF?text=Auto",
    count: 931
  },
  {
    id: 9,
    name: "Books",
    image: "https://placehold.co/200x200/607D8B/FFF?text=Books",
    count: 1547
  },
  {
    id: 10,
    name: "Pets",
    image: "https://placehold.co/200x200/009688/FFF?text=Pets",
    count: 723
  }
];

export default function FeaturedCategories() {
  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Popular Categories</h2>
          <Link to="#" className="text-sm text-orange-500 hover:underline">More</Link>
        </div>
        
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {categories.map((category) => (
            <Link to="#" key={category.id} className="group">
              <div className="flex flex-col items-center">
                <div className="rounded-full overflow-hidden bg-gray-100 w-[60px] h-[60px] md:w-[70px] md:h-[70px] mb-1">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-center line-clamp-2 h-8">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

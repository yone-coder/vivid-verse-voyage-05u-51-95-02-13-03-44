
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const brands = [
  { id: 1, name: "Apple", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Apple" },
  { id: 2, name: "Samsung", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Samsung" },
  { id: 3, name: "Nike", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Nike" },
  { id: 4, name: "Sony", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Sony" },
  { id: 5, name: "Adidas", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Adidas" },
  { id: 6, name: "Xiaomi", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Xiaomi" }
];

export default function TopBrands() {
  return (
    <div className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Top Brands</h2>
          <Link to="#" className="text-sm text-red-500 hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to="#" 
              className="flex items-center justify-center border rounded hover:shadow-sm transition-shadow py-4"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-8"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

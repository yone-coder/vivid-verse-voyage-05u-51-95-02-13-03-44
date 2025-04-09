
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const brands = [
  { id: 1, name: "Apple", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Apple" },
  { id: 2, name: "Samsung", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Samsung" },
  { id: 3, name: "Nike", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Nike" },
  { id: 4, name: "Sony", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Sony" },
  { id: 5, name: "Adidas", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Adidas" },
  { id: 6, name: "Xiaomi", logo: "https://placehold.co/200x80/FFFFFF/000000?text=Xiaomi" }
];

export default function TopBrands() {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold">Featured Brands</h2>
          <Link to="#" className="text-xs text-orange-500 hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to="#" 
              className="flex items-center justify-center border rounded-md hover:shadow-sm transition-shadow py-2 bg-white"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-6 md:max-h-8"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

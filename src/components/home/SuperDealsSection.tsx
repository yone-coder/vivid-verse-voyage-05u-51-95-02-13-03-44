
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const superDeals = [
  {
    id: 201,
    name: "Smart 4K TV 55-inch",
    image: "https://placehold.co/300x300/3B82F6/FFF?text=Smart+TV",
    price: 699.99,
    discountPrice: 499.99
  },
  {
    id: 202,
    name: "Robot Vacuum Cleaner",
    image: "https://placehold.co/300x300/10B981/FFF?text=Robot+Vacuum",
    price: 299.99,
    discountPrice: 189.99
  },
  {
    id: 203,
    name: "Coffee Machine with Grinder",
    image: "https://placehold.co/300x300/A855F7/FFF?text=Coffee+Machine",
    price: 199.99,
    discountPrice: 129.99
  }
];

export default function SuperDealsSection() {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-3 bg-white">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold">Super Deals</h2>
          <Link to="#" className="text-xs text-orange-500 hover:underline flex items-center">
            More <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {superDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-md overflow-hidden border hover:shadow-sm transition-shadow relative">
              <Link to={`/product/${deal.id}`} className="flex h-full">
                <div className="w-1/3">
                  <div className="relative h-full">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-br-md font-medium">
                      SUPER
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-2 w-2/3">
                  <h3 className="font-medium text-xs line-clamp-2 mb-1">
                    {deal.name}
                  </h3>
                  <div className="mt-auto">
                    <div className="text-orange-500 font-semibold text-xs">US ${deal.discountPrice.toFixed(2)}</div>
                    <div className="text-[10px] text-gray-500 line-through">US ${deal.price.toFixed(2)}</div>
                    <div className="text-[10px] bg-orange-100 text-orange-700 inline-block px-1 rounded mt-0.5">
                      {Math.round(((deal.price - deal.discountPrice) / deal.price) * 100)}% OFF
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

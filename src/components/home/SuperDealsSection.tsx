
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

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
  return (
    <div className="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Super Deals</h2>
          <Link to="#" className="text-sm text-red-500 hover:underline flex items-center">
            More <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {superDeals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden bg-white rounded-lg hover:shadow-md transition-shadow relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
              <Link to={`/product/${deal.id}`} className="flex flex-row md:flex-col h-full">
                <div className="w-1/2 md:w-full">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">
                      SUPER DEAL
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-center text-xs py-1 font-medium">
                      Save ${(deal.price - deal.discountPrice).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-3 w-1/2 md:w-full">
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">
                      {deal.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-red-500 font-semibold">${deal.discountPrice.toFixed(2)}</span>
                      <span className="text-gray-400 text-xs line-through">${deal.price.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-red-500 font-medium mt-1">
                      {Math.round(((deal.price - deal.discountPrice) / deal.price) * 100)}% OFF
                    </div>
                  </div>
                  <Button size="sm" className="mt-2 w-full bg-red-500 hover:bg-red-600 text-xs md:hidden">
                    Buy Now
                  </Button>
                </div>
              </Link>
              <div className="hidden md:block p-3 pt-0">
                <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                  Buy Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

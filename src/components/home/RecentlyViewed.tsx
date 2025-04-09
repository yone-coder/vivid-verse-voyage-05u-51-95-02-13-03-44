
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductGrid";
import { History, ChevronRight, X } from "lucide-react";

// Demo recently viewed products
const demoProducts = [
  {
    id: "demo-1",
    name: "Wireless Bluetooth Headphones",
    price: 59.99,
    product_images: [{ src: "https://placehold.co/300x300/3B82F6/FFF?text=Headphones" }]
  },
  {
    id: "demo-2",
    name: "Smart Watch with Heart Rate Monitor",
    price: 129.99,
    discount_price: 99.99,
    product_images: [{ src: "https://placehold.co/300x300/10B981/FFF?text=Watch" }]
  },
  {
    id: "demo-3",
    name: "Ultra Slim Portable Power Bank",
    price: 45.99,
    product_images: [{ src: "https://placehold.co/300x300/A855F7/FFF?text=PowerBank" }]
  }
];

export default function RecentlyViewed() {
  const [products, setProducts] = useState([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // In a real app, this would come from local storage or a database
    // Using demo data for now
    setProducts(demoProducts);
  }, []);
  
  if (!products?.length) return null;
  
  const handleClearHistory = () => {
    setProducts([]);
  };
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5">
            <History className="h-3.5 w-3.5 text-gray-500" />
            <h2 className="text-sm font-bold">Recently Viewed</h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClearHistory} 
              className="text-xs text-gray-500 hover:text-red-500 flex items-center"
            >
              <X className="h-3.5 w-3.5 mr-0.5" /> Clear
            </button>
            <Link to="/history" className="text-xs text-orange-500 hover:underline flex items-center">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} gap-2`}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

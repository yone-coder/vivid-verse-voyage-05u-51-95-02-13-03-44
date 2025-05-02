
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Simulating product recommendations by category
const recommendedCategories = [
  { id: "for-you", name: "For You" },
  { id: "new-arrivals", name: "New Arrivals" },
  { id: "best-selling", name: "Best Selling" },
  { id: "top-rated", name: "Top Rated" }
];

export default function ProductRecommendations({ products }) {
  const isMobile = useIsMobile();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("for-you");
  
  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const isExpanded = (categoryId: string) => expandedCategories[categoryId] || false;
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold">Just For You</h2>
          <Link to="#" className="text-xs text-orange-500 hover:underline">View More</Link>
        </div>
        
        <div className="mb-4">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {recommendedCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-xs ${
                  activeCategory === category.id 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {recommendedCategories.map(category => (
          category.id === activeCategory && (
            <div key={category.id}>
              <div className={`grid grid-cols-2 ${isMobile ? 'md:grid-cols-3' : 'md:grid-cols-4 lg:grid-cols-5'} gap-2`}>
                {products?.slice(0, isExpanded(category.id) ? (isMobile ? 6 : 10) : (isMobile ? 2 : 5)).map(product => (
                  <div key={product.id} className="h-full">
                    <ProductCard key={product.id} product={product} />
                  </div>
                ))}
              </div>
              
              {products && products.length > (isMobile ? 2 : 5) && (
                <div className="mt-3 text-center">
                  <Button
                    onClick={() => toggleExpand(category.id)}
                    variant="outline"
                    className="w-full md:w-auto flex items-center justify-center gap-2 text-orange-500 border-orange-500"
                  >
                    {isExpanded(category.id) ? "Show Less" : "View More Products"}
                    {!isExpanded(category.id) && <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

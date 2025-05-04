import { Link } from "react-router-dom";
import { ProductCard } from "./ProductGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="py-2 bg-white">
      <div className="container mx-auto px-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold tracking-tight">Just For You</h2>
          <Link to="#" className="text-xs text-orange-500 hover:underline">View More</Link>
        </div>

        {/* Scrollable Category Tabs */}
        <div className="mb-3 overflow-x-auto">
          <div className="flex space-x-2 pl-2 pr-2 pb-1 snap-x snap-mandatory overflow-x-auto scrollbar-hide">
            {recommendedCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`snap-start flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                  activeCategory === category.id
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {recommendedCategories.map(category =>
          category.id === activeCategory && (
            <div key={category.id}>
              <div
                className={`grid gap-1 ${
                  isMobile
                    ? "grid-cols-2"
                    : "md:grid-cols-4 lg:grid-cols-5"
                }`}
              >
                {products
                  ?.slice(0, isExpanded(category.id) ? (isMobile ? 6 : 10) : (isMobile ? 2 : 5))
                  .map(product => (
                    <div key={product.id} className="h-full">
                      <ProductCard product={product} compact />
                    </div>
                  ))}
              </div>

              {/* View More / Show Less Button */}
              {products && products.length > (isMobile ? 2 : 5) && (
                <div className="mt-2 text-center">
                  <Button
                    onClick={() => toggleExpand(category.id)}
                    variant="outline"
                    className="w-full md:w-auto h-8 text-xs px-3 py-1 border-orange-500 text-orange-500 flex items-center justify-center gap-1"
                  >
                    {isExpanded(category.id) ? "Show Less" : "View More Products"}
                    {!isExpanded(category.id) && <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
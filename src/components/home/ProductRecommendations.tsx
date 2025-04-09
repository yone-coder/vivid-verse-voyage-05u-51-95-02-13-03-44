
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "./ProductGrid";
import { useIsMobile } from "@/hooks/use-mobile";

// Simulating product recommendations by category
const recommendedCategories = [
  { id: "for-you", name: "For You" },
  { id: "new-arrivals", name: "New Arrivals" },
  { id: "best-selling", name: "Best Selling" },
  { id: "top-rated", name: "Top Rated" }
];

export default function ProductRecommendations({ products }) {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold">Just For You</h2>
          <Link to="#" className="text-xs text-orange-500 hover:underline">View More</Link>
        </div>
        
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="bg-transparent mb-2 border-b w-full justify-start h-auto overflow-x-auto pb-0 gap-3">
            {recommendedCategories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-orange-500 px-1 py-1 h-auto shadow-none text-xs"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {recommendedCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className={`grid grid-cols-2 ${isMobile ? 'md:grid-cols-3' : 'md:grid-cols-4 lg:grid-cols-5'} gap-2`}>
                {products?.slice(0, isMobile ? 6 : 10).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}


import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "./ProductGrid";

// Simulating product recommendations by category
const recommendedCategories = [
  { id: "for-you", name: "For You" },
  { id: "new-arrivals", name: "New Arrivals" },
  { id: "best-selling", name: "Best Selling" },
  { id: "top-rated", name: "Top Rated" }
];

export default function ProductRecommendations({ products }) {
  // Filter products into tabs (in a real app, these would come from an API)
  // Here we're just using the same products for demo purposes
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Just For You</h2>
          <Link to="#" className="text-sm text-red-500 hover:underline">View More</Link>
        </div>
        
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="bg-transparent mb-4 border-b w-full justify-start h-auto overflow-x-auto pb-0 gap-3">
            {recommendedCategories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-red-500 px-2 py-1 h-auto shadow-none"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {recommendedCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {products?.slice(0, 10).map(product => (
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

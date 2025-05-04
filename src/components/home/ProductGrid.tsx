import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ShoppingCart, Heart, Filter, GridIcon, List } from "lucide-react";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Product Card component for better organization
export const ProductCard = ({ product }) => {
const mainImage = product.product_images && product.product_images.length > 0
? product.product_images[0].src
: "https://placehold.co/300x300?text=No+Image";

const discountPercentage = product.discount_price &&
Math.round(((product.price - product.discount_price) / product.price) * 100);

return (
<Card className="overflow-hidden transition-all hover:shadow-md group h-full">
<Link to={/product/${product.id}} className="block">
<div className="relative aspect-square overflow-hidden bg-gray-100">
<img   
src={mainImage}   
alt={product.name}  
className="h-full w-full object-cover transition-transform group-hover:scale-105"  
loading="lazy"  
/>
{product.discount_price && (
<div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded">
{discountPercentage}% OFF
</div>
)}
<Button   
variant="ghost"   
size="icon"   
className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"  
>
<Heart className="h-4 w-4" />
</Button>
</div>
</Link>
<CardContent className="p-2">
<Link to={/product/${product.id}} className="block">
<div className="flex items-center gap-1 mb-1">
<div className="flex text-amber-400 text-xs">
<Star className="h-3 w-3 fill-amber-400" />
<Star className="h-3 w-3 fill-amber-400" />
<Star className="h-3 w-3 fill-amber-400" />
<Star className="h-3 w-3 fill-amber-400" />
<Star className="h-3 w-3 fill-amber-400 stroke-amber-400/50" />
</div>
<span className="text-xs text-gray-500">(42)</span>
</div>

<h3 className="font-medium text-xs line-clamp-1 mb-1 hover:text-red-500 transition-colors">  
        {product.name}  
      </h3>  
      <div className="flex items-baseline gap-2">  
        {product.discount_price ? (  
          <>  
            <span className="text-red-500 font-semibold text-xs">${product.discount_price.toFixed(2)}</span>  
            <span className="text-gray-400 text-[10px] line-through">${product.price.toFixed(2)}</span>  
          </>  
        ) : (  
          <span className="font-semibold text-xs">${product.price.toFixed(2)}</span>  
        )}  
      </div>  

      <p className="text-[10px] text-gray-500 mt-0.5">Free Shipping</p>  
    </Link>  
  </CardContent>  
  <CardFooter className="p-2 pt-0">  
    <Button size="sm" variant="outline" className="w-full gap-1 text-xs h-7">  
      <ShoppingCart className="h-3 w-3" /> Add  
    </Button>  
  </CardFooter>  
</Card>

);
};

// Create a ProductSkeleton component for loading state
export const ProductSkeleton = () => (

  <div className="overflow-hidden rounded-md border h-full">  
    <Skeleton className="aspect-square w-full" />  
    <div className="p-2">  
      <Skeleton className="h-3 w-24 mb-2" />  
      <Skeleton className="h-3 w-full mb-2" />  
      <Skeleton className="h-3 w-2/3 mb-2" />  
      <Skeleton className="h-3 w-1/3 mb-2" />  
      <Skeleton className="h-7 w-full" />  
    </div>  
  </div>  
);  export default function ProductGrid({ products, isLoading }) {
const [viewMode, setViewMode] = useState("grid");
const [sortBy, setSortBy] = useState("recommended");

return (
<div className="py-8">
<div className="container mx-auto px-4">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
<h2 className="text-xl font-bold">Recommended Products</h2>

<div className="flex flex-wrap items-center gap-3 w-full md:w-auto">  
        <div className="flex items-center">  
          <Button   
            variant={viewMode === "grid" ? "default" : "outline"}   
            size="sm"   
            className={`rounded-r-none px-2 ${viewMode === "grid" ? "bg-red-500 hover:bg-red-600" : ""}`}  
            onClick={() => setViewMode("grid")}  
          >  
            <GridIcon className="h-4 w-4" />  
          </Button>  
          <Button   
            variant={viewMode === "list" ? "default" : "outline"}   
            size="sm"   
            className={`rounded-l-none px-2 ${viewMode === "list" ? "bg-red-500 hover:bg-red-600" : ""}`}  
            onClick={() => setViewMode("list")}  
          >  
            <List className="h-4 w-4" />  
          </Button>  
        </div>  

        <Separator orientation="vertical" className="h-6 hidden md:block" />  

        <div className="flex items-center gap-2 ml-auto md:ml-0">  
          <Filter className="h-4 w-4 text-gray-500" />  
          <span className="text-sm hidden md:inline">Sort by:</span>  
          <Select value={sortBy} onValueChange={setSortBy}>  
            <SelectTrigger className="w-[130px] h-8 text-sm">  
              <SelectValue placeholder="Sort by" />  
            </SelectTrigger>  
            <SelectContent>  
              <SelectItem value="recommended">Recommended</SelectItem>  
              <SelectItem value="price-low">Price: Low to High</SelectItem>  
              <SelectItem value="price-high">Price: High to Low</SelectItem>  
              <SelectItem value="newest">Newest First</SelectItem>  
              <SelectItem value="rating">Best Rating</SelectItem>  
            </SelectContent>  
          </Select>  
        </div>  
      </div>  
    </div>  

    {isLoading ? (  
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">  
        {Array(10).fill(0).map((_, index) => (  
          <ProductSkeleton key={index} />  
        ))}  
      </div>  
    ) : products?.length === 0 ? (  
      <div className="text-center py-12">  
        <h3 className="text-lg text-gray-600">No products found</h3>  
        <p className="mt-2 text-gray-500">Please check back later or add some products in the admin panel.</p>  
        <Link to="/admin" className="mt-4 inline-block">  
          <Button variant="outline">Go to Admin Panel</Button>  
        </Link>  
      </div>  
    ) : (  
      <div className={viewMode === "grid"   
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"  
        : "flex flex-col gap-3 md:gap-4"  
      }>  
        {products?.map(product => (  
          viewMode === "grid" ? (  
            <ProductCard key={product.id} product={product} />  
          ) : (  
            <Card key={product.id} className="overflow-hidden transition-all hover:shadow-md">  
              <div className="flex">  
                <div className="w-1/3 md:w-1/4">  
                  <Link to={`/product/${product.id}`} className="block h-full">  
                    <div className="relative h-full aspect-square md:aspect-auto overflow-hidden bg-gray-100">  
                      <img   
                        src={product.product_images && product.product_images.length > 0  
                          ? product.product_images[0].src  
                          : "https://placehold.co/300x300?text=No+Image"}   
                        alt={product.name}  
                        className="h-full w-full object-cover"  
                        loading="lazy"  
                      />  
                      {product.discount_price && (  
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded">  
                          {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF  
                        </div>  
                      )}  
                    </div>  
                  </Link>  
                </div>  
                <div className="flex flex-col p-4 w-2/3 md:w-3/4">  
                  <Link to={`/product/${product.id}`} className="block">  
                    <h3 className="font-medium text-sm md:text-base line-clamp-2 mb-1 hover:text-red-500 transition-colors">  
                      {product.name}  
                    </h3>  
                  </Link>  
                  <div className="flex items-center gap-1 mt-1">  
                    <div className="flex text-amber-400 text-xs">  
                      <Star className="h-3 w-3 fill-amber-400" />  
                      <Star className="h-3 w-3 fill-amber-400" />  
                      <Star className="h-3 w-3 fill-amber-400" />  
                      <Star className="h-3 w-3 fill-amber-400" />  
                      <Star className="h-3 w-3 fill-amber-400 stroke-amber-400/50" />  
                    </div>  
                    <span className="text-xs text-gray-500">(42)</span>  
                  </div>  
                  <div className="flex items-baseline gap-2 mt-2">  
                    {product.discount_price ? (  
                      <>  
                        <span className="text-red-500 font-semibold">${product.discount_price.toFixed(2)}</span>  
                        <span className="text-gray-400 text-xs line-through">${product.price.toFixed(2)}</span>  
                      </>  
                    ) : (  
                      <span className="font-semibold">${product.price.toFixed(2)}</span>  
                    )}  
                  </div>  
                  <p className="text-xs text-gray-500 mt-1">Free Shipping</p>  
                  <div className="mt-auto pt-2 flex gap-2">  
                    <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-xs">  
                      <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Add to Cart  
                    </Button>  
                    <Button size="sm" variant="outline" className="px-2">  
                      <Heart className="h-3.5 w-3.5" />  
                    </Button>  
                  </div>  
                </div>  
              </div>  
            </Card>  
          )  
        ))}  
      </div>  
    )}  
  </div>  
</div>

);
}


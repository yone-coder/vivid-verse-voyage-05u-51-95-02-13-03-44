
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Search, ShoppingCart, Heart } from "lucide-react";

// Create a ProductCard component for better organization
const ProductCard = ({ product }) => {
  const mainImage = product.product_images && product.product_images.length > 0
    ? product.product_images[0].src
    : "https://placehold.co/300x300?text=No+Image";
  
  const discountPercentage = product.discount_price && 
    Math.round(((product.price - product.discount_price) / product.price) * 100);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={mainImage} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          {product.discount_price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
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
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 hover:text-red-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-2">
            {product.discount_price ? (
              <>
                <span className="text-red-500 font-semibold">${product.discount_price.toFixed(2)}</span>
                <span className="text-gray-400 text-sm line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
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
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button size="sm" variant="outline" className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

// Create a ProductSkeleton component for loading state
const ProductSkeleton = () => (
  <div className="overflow-hidden rounded-md border">
    <Skeleton className="aspect-square w-full" />
    <div className="p-4">
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-2" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  </div>
);

export default function Index() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">ShopNow</Link>
            
            <div className="flex-1 max-w-xl mx-4 relative">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full py-2 px-4 pr-10 rounded-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-white hover:underline text-sm">
                Admin
              </Link>
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Shop the latest gadgets, home decor, and lifestyle products with fast shipping and easy returns.</p>
          <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-none">Shop Now</Button>
        </div>
      </div>
      
      {/* Main Content - Products Grid */}
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <p className="text-gray-600 text-sm">ShopNow offers a wide selection of high-quality products at competitive prices. We're dedicated to providing an excellent shopping experience.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-red-500">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300" aria-label="Facebook">FB</a>
                <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300" aria-label="Instagram">IG</a>
                <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300" aria-label="Twitter">TW</a>
                <a href="#" className="bg-gray-200 p-2 rounded-full hover:bg-gray-300" aria-label="YouTube">YT</a>
              </div>
              <p className="mt-4 text-sm text-gray-600">Subscribe to our newsletter for updates and promotions.</p>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-sm text-gray-500 text-center">
            <p>© 2025 ShopNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


import { Link } from "react-router-dom";
import { ArrowRight, Zap, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/products";

export default function DesktopFlashDeals() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'desktop-flash-deals'],
    queryFn: fetchAllProducts,
  });

  const flashProducts = (products as any[])
    .filter(product => product.discount_price)
    .slice(0, 8);

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const processedProducts = flashProducts.map(product => {
    const discountPercentage = product.discount_price 
      ? Math.round(((product.price - product.discount_price) / product.price) * 100) 
      : 0;

    const simulatedSold = Math.floor(Math.random() * 2000) + 500;
    const simulatedStock = Math.floor(Math.random() * 50) + 5;

    return {
      ...product,
      discountPercentage,
      stock: simulatedStock,
      sold: simulatedSold,
      image: product.product_images?.[0]?.src || "https://placehold.co/300x300?text=No+Image"
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Zap className="w-6 h-6" />
            <h2 className="text-lg font-bold uppercase tracking-wide">Flash Deals</h2>
          </div>
          
          <div className="flex items-center gap-4 bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
            <Timer className="w-5 h-5" />
            <span className="font-semibold">
              {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                <span key={i}>
                  {unit.toString().padStart(2, "0")}
                  {i < 2 && <span className="mx-1">:</span>}
                </span>
              ))}
            </span>
          </div>
          
          <Link
            to="/search?category=flash-deals"
            className="text-white hover:underline flex items-center font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : processedProducts.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {processedProducts.map((product) => (
              <div key={product.id} className="group">
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg mb-3 group-hover:shadow-lg transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-[#FF4747] text-white text-xs px-2 py-1 rounded font-medium">
                      {product.discountPercentage}% OFF
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs flex justify-center py-1 rounded">
                      {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                        <span key={i}>
                          {unit.toString().padStart(2, "0")}
                          {i < 2 && <span className="mx-1">:</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2" title={product.name}>
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <div className="text-[#FF4747] font-bold text-lg">
                        ${Number(product.discount_price).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ${Number(product.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                      <div
                        className="h-full bg-[#FF4747] rounded-full"
                        style={{
                          width: `${100 - (product.stock / (product.stock + product.sold)) * 100}%`
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.stock} left
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No flash deals available right now</p>
          </div>
        )}
      </div>
    </div>
  );
}

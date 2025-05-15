import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/products";

export default function FlashDeals() {
  const isMobile = useIsMobile();
  const scrollRef = useRef(null);

  // Fetch products from the database
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', 'flash-deals'],
    queryFn: fetchAllProducts,
  });

  // Get only first 5 products with discount_price (flash deals)
  const flashProducts = (products as any[])
    .filter(product => product.discount_price)
    .slice(0, 5);

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

  // Calculate discount percentage and inventory metrics for display
  const processedProducts = flashProducts.map(product => {
    const discountPercentage = product.discount_price 
      ? Math.round(((product.price - product.discount_price) / product.price) * 100) 
      : 0;

    // Simulate stock and sold data since it's not in the database
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
    <div className="w-full bg-white">
      <div className="px-2 py-2">


        <div className="flex justify-between items-center mb-1 bg-gradient-to-r from-[#FF5E5E] to-[#FF2D2D] px-2 py-1 rounded-sm border-b border-[#FF1F1F] animate-pulse-fast">
  <div className="flex items-center space-x-2">
    <div className="flex items-center text-white text-xs font-semibold uppercase tracking-wide">
      <Zap className="w-3.5 h-3.5 mr-1" />
      Flash Sale
    </div>
    <div className="flex items-center space-x-1 text-[11px] text-white font-medium">
      <span className="w-1.5 h-1.5 bg-white rounded-full" />
      <span>{processedProducts.length} deals available</span>
    </div>
  </div>
  <Link
    to="/search?category=flash-deals"
    className="text-xs text-white hover:underline flex items-center font-medium"
  >
    More <ArrowRight className="h-3 w-3 ml-0.5" />
  </Link>
</div>



      </div>

      <div className="relative">
        {isLoading ? (
          <div className="pl-2 flex overflow-x-hidden">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index} 
                className="w-[calc(100%/3.5)] flex-shrink-0 mr-2"
              >
                <div className="aspect-square bg-gray-200 animate-pulse rounded-md mb-1.5"></div>
                <div className="h-3 w-3/4 bg-gray-200 animate-pulse mb-1"></div>
                <div className="h-2 w-1/2 bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : processedProducts.length > 0 ? (
          <div
            ref={scrollRef}
            className="overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollPaddingLeft: "1rem",
              WebkitOverflowScrolling: "touch"
            }}
          >
            <div className="flex pl-2">
              {processedProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-[calc(100%/3.5)] flex-shrink-0 snap-start mr-2"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-md mb-1.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-0 left-0 bg-[#FF4747] text-white text-[10px] px-1.5 py-0.5 rounded-br-md font-medium">
                        {product.discountPercentage}% OFF
                      </div>
                      <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] flex justify-center py-0.5">
                        {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                          <span key={i} className="mx-0.5">
                            <span>{unit.toString().padStart(2, "0")}</span>
                            {i < 2 && <span className="mx-0.5">:</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <div className="text-[#FF4747] font-semibold text-sm">
                          ${Number(product.discount_price).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-gray-500 line-through">
                          ${Number(product.price).toFixed(2)}
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1 mb-0.5">
                        <div
                          className="h-full bg-[#FF4747] rounded-full"
                          style={{
                            width: `${
                              100 - (product.stock / (product.stock + product.sold)) * 100
                            }%`
                          }}
                        />
                      </div>
                      <div className="text-[10px] text-gray-500 truncate max-w-full">
                        {product.stock} left · {product.name}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              <div className="flex-none w-4" />
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">No flash deals available right now</p>
          </div>
        )}
      </div>
    </div>
  );
}

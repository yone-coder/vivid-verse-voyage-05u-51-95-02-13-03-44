import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const flashProducts = [
  {
    id: 101,
    name: "Wireless Earbuds with Noise Cancellation",
    image: "https://placehold.co/300x300/6D28D9/FFF?text=Earbuds",
    price: 79.99,
    discountPrice: 39.99,
    rating: 4.7,
    ratingCount: 235,
    sold: 1253,
    stock: 45
  },
  {
    id: 102,
    name: "Wireless Earbuds with Noise Cancellation",
    image: "https://placehold.co/300x300/6D28D9/FFF?text=Earbuds",
    price: 79.99,
    discountPrice: 39.99,
    rating: 4.7,
    ratingCount: 235,
    sold: 1253,
    stock: 45
  },
  {
    id: 103,
    name: "Wireless Earbuds with Noise Cancellation",
    image: "https://placehold.co/300x300/6D28D9/FFF?text=Earbuds",
    price: 79.99,
    discountPrice: 39.99,
    rating: 4.7,
    ratingCount: 235,
    sold: 1253,
    stock: 45
  },
  {
    id: 104,
    name: "Wireless Earbuds with Noise Cancellation",
    image: "https://placehold.co/300x300/6D28D9/FFF?text=Earbuds",
    price: 79.99,
    discountPrice: 39.99,
    rating: 4.7,
    ratingCount: 235,
    sold: 1253,
    stock: 45
  },
  {
    id: 105,
    name: "Wireless Earbuds with Noise Cancellation",
    image: "https://placehold.co/300x300/6D28D9/FFF?text=Earbuds",
    price: 79.99,
    discountPrice: 39.99,
    rating: 4.7,
    ratingCount: 235,
    sold: 1253,
    stock: 45
  },
  // ... more products
];

export default function FlashDeals() {
  const isMobile = useIsMobile();
  const scrollRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
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

  return (
    <div className="w-full bg-white">
      <div className="px-2 py-2">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <h2 className="text-sm font-bold text-orange-500 mr-2">Flash Sale</h2>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-orange-500" />
              <div className="text-xs font-medium">
                {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                  <span key={i}>
                    <span className="inline-flex items-center justify-center bg-gray-900 text-white h-4 w-5 rounded text-[10px]">
                      {unit.toString().padStart(2, '0')}
                    </span>
                    {i < 2 && <span className="text-gray-500 mx-0.5">:</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Link to="#" className="text-xs text-orange-500 hover:underline flex items-center">
            More <ArrowRight className="h-3 w-3 ml-0.5" />
          </Link>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollPaddingLeft: '1rem',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex pl-4">
            {flashProducts.map((product, index) => (
              <div
                key={product.id}
                className="w-[110px] md:w-[130px] flex-shrink-0 snap-start mr-2"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-md mb-1.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-br-md font-medium">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </div>
                  </div>
                  <div>
                    <div className="text-orange-500 font-semibold text-sm">US ${product.discountPrice.toFixed(2)}</div>
                    <div className="text-xs text-gray-500 line-through">US ${product.price.toFixed(2)}</div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1 mb-0.5">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{
                          width: `${100 - (product.stock / (product.stock + product.sold) * 100)}%`
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {product.stock} left
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            <div className="flex-none w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
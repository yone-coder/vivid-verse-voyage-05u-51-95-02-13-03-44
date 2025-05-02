import { Link } from "react-router-dom";
import { ArrowRight, Clock, Zap, ChevronRight } from "lucide-react";
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
        return { hours: 5, minutes: 30, seconds: 0 }; // Reset
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Enhanced AliExpress-style Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-300" />
            <h2 className="text-base font-bold">FLASH DEALS</h2>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-2 py-0.5 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              <span className="font-medium">Ends in:</span>
            </div>
          </div>
          <Link to="/flash-deals" className="text-xs text-white hover:underline flex items-center">
            View All <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center gap-1">
            {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
              <div key={i} className="flex items-center">
                <div className="bg-white text-orange-600 font-bold rounded px-1.5 py-0.5 text-sm w-6 text-center">
                  {unit.toString().padStart(2, '0')}
                </div>
                {i < 2 && <span className="text-white font-bold mx-0.5">:</span>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-2 text-xs text-center text-white">
          <span className="bg-yellow-500 text-white px-1.5 py-0.5 rounded mr-1">UP TO 70% OFF</span>
          <span>Limited time offers - Don't miss out!</span>
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
          <div className="flex pl-2 py-2">
            {flashProducts.map((product) => (
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
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[10px] flex justify-center py-0.5">
                      {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                        <span key={i} className="mx-0.5">
                          <span>{unit.toString().padStart(2, '0')}</span>
                          {i < 2 && <span className="mx-0.5">:</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <div className="text-orange-500 font-semibold text-sm">${product.discountPrice.toFixed(2)}</div>
                      <div className="text-[10px] text-gray-500 line-through">${product.price.toFixed(2)}</div>
                    </div>
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
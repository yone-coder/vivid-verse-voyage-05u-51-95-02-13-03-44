import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Truck, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const vendors = [
  {
    id: 1,
    name: "SuperTech Store",
    image: "https://picsum.photos/seed/vendor1/120/120",
    rating: 4.8,
    sales: "10.5k",
    followers: "23.4k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 101, image: "https://picsum.photos/seed/product101/70/70", price: "$19.99" },
      { id: 102, image: "https://picsum.photos/seed/product102/70/70", price: "$24.50" },
      { id: 103, image: "https://picsum.photos/seed/product103/70/70", price: "$15.75" }
    ]
  },
  {
    id: 2,
    name: "EcoFriendly Goods",
    image: "https://picsum.photos/seed/vendor2/120/120",
    rating: 4.9,
    sales: "8.7k",
    followers: "19.2k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    topProducts: [
      { id: 201, image: "https://picsum.photos/seed/product201/70/70", price: "$12.99" },
      { id: 202, image: "https://picsum.photos/seed/product202/70/70", price: "$31.50" },
      { id: 203, image: "https://picsum.photos/seed/product203/70/70", price: "$22.25" }
    ]
  },
  {
    id: 3,
    name: "Fashion Forward",
    image: "https://picsum.photos/seed/vendor3/120/120",
    rating: 4.7,
    sales: "15.3k",
    followers: "32.1k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 301, image: "https://picsum.photos/seed/product301/70/70", price: "$35.99" },
      { id: 302, image: "https://picsum.photos/seed/product302/70/70", price: "$18.50" },
      { id: 303, image: "https://picsum.photos/seed/product303/70/70", price: "$27.75" }
    ]
  },
  {
    id: 4,
    name: "Home Essentials",
    image: "https://picsum.photos/seed/vendor4/120/120",
    rating: 4.6,
    sales: "7.2k",
    followers: "12.5k",
    topSeller: false,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 401, image: "https://picsum.photos/seed/product401/70/70", price: "$42.99" },
      { id: 402, image: "https://picsum.photos/seed/product402/70/70", price: "$15.75" },
      { id: 403, image: "https://picsum.photos/seed/product403/70/70", price: "$29.50" }
    ]
  },
  {
    id: 5,
    name: "Gadget World",
    image: "https://picsum.photos/seed/vendor5/120/120",
    rating: 4.9,
    sales: "20.1k",
    followers: "45.7k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 501, image: "https://picsum.photos/seed/product501/70/70", price: "$89.99" },
      { id: 502, image: "https://picsum.photos/seed/product502/70/70", price: "$64.50" },
      { id: 503, image: "https://picsum.photos/seed/product503/70/70", price: "$112.75" }
    ]
  },
  {
    id: 6,
    name: "Beauty Express",
    image: "https://picsum.photos/seed/vendor6/120/120",
    rating: 4.7,
    sales: "12.3k",
    followers: "28.9k",
    topSeller: true,
    fastShipping: false,
    verified: true,
    topProducts: [
      { id: 601, image: "https://picsum.photos/seed/product601/70/70", price: "$21.99" },
      { id: 602, image: "https://picsum.photos/seed/product602/70/70", price: "$18.50" },
      { id: 603, image: "https://picsum.photos/seed/product603/70/70", price: "$34.75" }
    ]
  },
  {
    id: 7,
    name: "Sports Direct",
    image: "https://picsum.photos/seed/vendor7/120/120",
    rating: 4.5,
    sales: "5.8k",
    followers: "14.2k",
    topSeller: false,
    fastShipping: true,
    verified: false,
    topProducts: [
      { id: 701, image: "https://picsum.photos/seed/product701/70/70", price: "$45.99" },
      { id: 702, image: "https://picsum.photos/seed/product702/70/70", price: "$29.50" },
      { id: 703, image: "https://picsum.photos/seed/product703/70/70", price: "$52.75" }
    ]
  },
  {
    id: 8,
    name: "Electronic Hub",
    image: "https://picsum.photos/seed/vendor8/120/120",
    rating: 4.8,
    sales: "18.7k",
    followers: "37.3k",
    topSeller: true,
    fastShipping: true,
    verified: true,
    topProducts: [
      { id: 801, image: "https://picsum.photos/seed/product801/70/70", price: "$129.99" },
      { id: 802, image: "https://picsum.photos/seed/product802/70/70", price: "$75.50" },
      { id: 803, image: "https://picsum.photos/seed/product803/70/70", price: "$210.75" }
    ]
  }
];

const CompactVendorCard = ({ vendor }: { vendor: any }) => (
  <Card className="flex-shrink-0 w-44 overflow-hidden hover:shadow-md transition-all duration-300 group">
    <div className="relative">
      <img 
        src={vendor.image} 
        alt={vendor.name} 
        className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-1.5 left-1.5 flex gap-1.5">
        {vendor.topSeller && (
          <Badge 
            variant="orange" 
            className="px-1.5 py-0.5 text-2xs font-semibold shadow-sm backdrop-blur-sm bg-opacity-90 rounded-md flex items-center gap-0.5"
          >
            <Award size={10} strokeWidth={2.5} className="mr-0.5" />TOP
          </Badge>
        )}
        {vendor.fastShipping && (
          <Badge 
            variant="success" 
            className="px-1.5 py-0.5 text-2xs font-semibold shadow-sm backdrop-blur-sm bg-opacity-90 rounded-md flex items-center gap-0.5"
          >
            <Truck size={10} strokeWidth={2.5} className="mr-0.5" />FAST
          </Badge>
        )}
      </div>
      <div className="absolute top-1.5 right-1.5">
        <Badge 
          variant="info" 
          className="px-1.5 py-0.5 text-2xs font-semibold shadow-sm backdrop-blur-sm bg-opacity-90 rounded-md flex items-center"
        >
          <Star size={10} className="mr-0.5 text-yellow-400 fill-yellow-400" />
          {vendor.rating}
        </Badge>
      </div>
    </div>
    
    <div className="p-2">
      <div className="flex items-center gap-1">
        <h3 className="font-medium text-xs truncate">{vendor.name}</h3>
        {vendor.verified && (
          <Tag size={12} className="text-blue-500 fill-blue-50" />
        )}
      </div>
      <div className="text-xs text-gray-500 flex items-center gap-1">
        <span>{vendor.sales} sales</span>
        <span className="inline-block w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>{vendor.followers} followers</span>
      </div>
    </div>
    
    <div className="px-2 pb-2">
      <div className="flex gap-1.5">
        {vendor.topProducts.map(product => (
          <div key={product.id} className="relative w-1/3 aspect-square group/product">
            <img 
              src={product.image} 
              alt="" 
              className="w-full h-full object-cover rounded shadow-sm border border-gray-100 hover:border-gray-300 transition-all" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover/product:bg-black/10 rounded transition-all" />
            <span className="absolute bottom-0 left-0 right-0 text-2xs text-white bg-black/60 text-center py-0.5 opacity-0 group-hover/product:opacity-100 transition-opacity">
              {product.price}
            </span>
          </div>
        ))}
      </div>
    </div>
    
    <div className="px-2 pb-2">
      <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1.5 px-2 rounded transition-colors">
        Visit Store
      </button>
    </div>
  </Card>
);

const TopVendorsCompact = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    const node = scrollRef.current;
    if (!node) return;
    const { scrollLeft, scrollWidth, clientWidth } = node;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="w-full p-3 sm:p-4 bg-white">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <h2 className="text-sm sm:text-base font-bold text-gray-800">Top Vendors</h2>
          <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded">HOT</span>
        </div>
        <button className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="relative">
        {showLeft && (
          <button 
            onClick={() => scroll("left")} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 -ml-1.5"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
        )}
        <div 
          ref={scrollRef} 
          className="overflow-x-auto scrollbar-hide scroll-smooth px-1"
          style={{ scrollPaddingLeft: '0.5rem' }}
        >
          <div className="flex gap-3 pb-1">
            {vendors.map(v => <CompactVendorCard key={v.id} vendor={v} />)}
            <div className="flex-none w-2" /> {/* Fake right padding */}
          </div>
        </div>
        {showRight && (
          <button 
            onClick={() => scroll("right")} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 -mr-1.5"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopVendorsCompact;

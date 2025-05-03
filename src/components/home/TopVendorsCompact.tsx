import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Truck, ShieldCheck } from 'lucide-react';

// Example vendor data (replace with real data or props)
const vendors = [
  {
    id: 1,
    name: 'GadgetHub',
    image: 'https://via.placeholder.com/300x100',
    rating: 4.7,
    sales: 3120,
    verified: true,
    topSeller: true,
    fastShipping: true,
    topProducts: [
      { id: 1, image: 'https://via.placeholder.com/80', price: '$24.99' },
      { id: 2, image: 'https://via.placeholder.com/80', price: '$19.99' },
      { id: 3, image: 'https://via.placeholder.com/80', price: '$14.99' },
    ],
  },
  // Add more vendors as needed
];

// Compact Vendor Card
const CompactVendorCard = ({ vendor }: { vendor: any }) => {
  return (
    <div className="flex-shrink-0 w-44 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img src={vendor.image} alt={vendor.name} className="w-full h-24 object-cover" />
        <div className="absolute top-1 left-1 flex flex-wrap gap-1 max-w-full">
          {vendor.topSeller && (
            <div className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
              <Award size={10} className="mr-0.5" />
              <span>Top</span>
            </div>
          )}
          {vendor.fastShipping && (
            <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
              <Truck size={10} className="mr-0.5" />
              <span>Fast</span>
            </div>
          )}
        </div>
        <div className="absolute top-1 right-1">
          <div className="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded-sm flex items-center">
            <Star size={10} className="mr-0.5 text-yellow-500 fill-yellow-500" />
            <span>{vendor.rating}</span>
          </div>
        </div>
        {vendor.verified && (
          <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-0.5">
            <ShieldCheck size={10} />
          </div>
        )}
      </div>

      <div className="p-2">
        <h3 className="font-bold text-xs truncate">{vendor.name}</h3>
        <div className="text-xs text-gray-500 mt-0.5">{vendor.sales} sales</div>
      </div>

      <div className="px-2 pb-2">
        <div className="flex gap-1 justify-between">
          {vendor.topProducts.slice(0, 3).map(product => (
            <div key={product.id} className="relative w-1/3 aspect-square group">
              <img
                src={product.image}
                alt="Product"
                className="w-full h-full object-cover rounded-sm border border-gray-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-sm">
                <span className="absolute bottom-0 left-0 right-0 text-xs text-white bg-black bg-opacity-50 px-1 opacity-0 group-hover:opacity-100">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-2 pb-2">
        <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-1 px-2 rounded-sm transition">
          Visit Store
        </button>
      </div>
    </div>
  );
};

// Top Vendors Compact
const TopVendorsCompact = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => current.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-gray-50 p-2 sm:p-3 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h2 className="text-sm sm:text-base font-bold text-gray-800">Top Vendors</h2>
          <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-sm">
            HOT
          </span>
        </div>
        <button className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="mb-3 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide -mx-2">
        <div className="inline-flex gap-1.5 pl-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-xs rounded-full border font-medium whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-1 rounded-full shadow-md hover:bg-gray-100"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-1 rounded-full shadow-md hover:bg-gray-100"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={18} />
          </button>
        )}

        <div ref={scrollRef} className="flex overflow-x-auto gap-2 pl-2 -mx-2 scrollbar-hide pb-1 snap-x snap-mandatory">
          {vendors.map((vendor) => (
            <CompactVendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopVendorsCompact;
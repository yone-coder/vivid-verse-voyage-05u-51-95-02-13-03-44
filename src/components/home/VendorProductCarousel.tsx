
import React, { useRef, useState } from 'react';
import { ThumbsUp, MessageSquare, Share, MoreHorizontal } from 'lucide-react'; 
import { Product } from '@/integrations/supabase/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Interface to define the component props
interface VendorProductCarouselProps {
  title: string;
  description?: string;
  products: Product[];
  // you can extend props for dynamic counts if needed
}

// Helper to format relative time
const timeAgo = (dateString: string) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 24) return `${Math.floor(hours / 24)}d ago`;
  if (hours >= 1) return `${hours}h ago`;
  if (minutes >= 1) return `${minutes}m ago`;
  return 'Just now';
};

const VendorProductCarousel = ({ title, description, products }: VendorProductCarouselProps) => {
  const vendorData = {
    vendorName: "Fashion Boutique",
    profilePic: "https://picsum.photos/seed/vendor/50/50",
    followers: "24.5K",
    publishedAt: "2025-05-03T15:30:00Z",
    verified: true
  };

  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(126);
  const [commentCount, setCommentCount] = useState(43);
  const [shareCount, setShareCount] = useState(12);

  // Transform products for display, using actual product images when available
  const displayProducts = products.slice(0, 10).map(product => ({
    id: product.id,
    currentPrice: product.discount_price ? `$${product.discount_price}` : `$${product.price}`,
    originalPrice: product.discount_price ? `$${product.price}` : undefined,
    discount: product.discount_price ? `${Math.round(((product.price - product.discount_price) / product.price) * 100)}%` : null,
    image: product.product_images?.[0]?.src || "https://picsum.photos/seed/product/320/320"
  }));

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      toast({
        title: "Post Liked!",
        description: `You liked ${title}'s post`,
        duration: 2000,
      });
    }
    setLiked(!liked);
  };

  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comment section coming soon",
      duration: 2000,
    });
  };

  const handleShare = () => {
    setShareCount(shareCount + 1);
    toast({
      title: "Shared!",
      description: "Post shared successfully",
      duration: 2000,
    });
  };

  // Sample expanded post description if none provided
  const postDescription = description || "Check out our latest collection of trendy products! Perfect for the upcoming season. Tag a friend who would love these items! 👗✨ #NewArrivals #TrendingNow";

  return (
    <div className="max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-sm mb-4">
      {/* Vendor Info Header */}
      <div className="flex items-center p-3 md:p-4 border-b border-gray-100">
        <div className="flex-shrink-0 mr-3 rounded-full overflow-hidden w-10 h-10 md:w-12 md:h-12">
          <img  
            src={vendorData.profilePic}  
            alt={vendorData.vendorName}  
            className="w-full h-full object-cover"  
            loading="lazy"  
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-gray-800 text-sm md:text-base">
              {title || vendorData.vendorName}
            </h3>
            {vendorData.verified && (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-gray-500 text-xs md:text-sm">
            {vendorData.followers} followers • {timeAgo(vendorData.publishedAt)}
          </p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium">
          Follow
        </button>
        <Button variant="ghost" size="icon" className="ml-1 rounded-full h-8 w-8">
          <MoreHorizontal className="text-gray-600 h-4 w-4" />
        </Button>
      </div>

      {/* Post Description */}  
      <div className="px-4 py-3 text-gray-800 text-sm md:text-base">  
        <p className="whitespace-pre-line">{postDescription}</p>  
      </div>  

      {/* Products Carousel */}  
      <div className="relative w-full px-1 py-2 bg-gray-50">  
        <div   
          className="flex overflow-x-auto gap-2 md:gap-3 pb-3 pt-1 snap-x snap-mandatory"  
          ref={carouselRef}  
          style={{    
            scrollbarWidth: 'none',    
            msOverflowStyle: 'none',    
            paddingLeft: '8px',    
            paddingRight: '8px',    
            scrollSnapType: 'x mandatory'    
          }}  
        >  
          {displayProducts.map((product) => (  
            <div   
              key={product.id}  
              className="flex-shrink-0 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow"  
              style={{    
                width: 'calc(40% - 8px)',    
                minWidth: '140px',    
                scrollSnapAlign: 'center'    
              }}  
            >  
              {/* Product Image with Overlay */}  
              <div className="relative aspect-square">  
                <img   
                  src={product.image}   
                  alt="Product"  
                  className="w-full h-full object-cover"  
                  loading="lazy"  
                />  
                {/* Discount Tag */}  
                {product.discount && (  
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg z-10">  
                    {product.discount} OFF  
                  </div>  
                )}  
                {/* Price Info Overlay */}  
                <div className="absolute bottom-0 w-full px-2 py-1 bg-gradient-to-t from-black/70 to-transparent text-white flex items-center justify-between text-xs z-10">  
                  <span className="font-bold text-sm text-red-400">{product.currentPrice}</span>  
                  {product.originalPrice && (  
                    <span className="line-through text-gray-300">{product.originalPrice}</span>  
                  )}  
                </div>  
              </div>  
            </div>  
          ))}  
        </div>  
      </div>  

      {/* Facebook style engagement stats */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-1">
          <div className="bg-blue-500 rounded-full p-1">
            <ThumbsUp className="h-3 w-3 text-white" />
          </div>
          <span className="text-xs text-gray-500">{likeCount}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{commentCount} comments</span>
          <span>{shareCount} shares</span>
        </div>
      </div>

      {/* Enhanced Social Buttons - Moved to Bottom */}  
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex-1">
          <button 
            onClick={handleLike} 
            className="flex items-center justify-center gap-1.5 group transition-colors w-full py-2 hover:bg-gray-100 rounded-md"
          >  
            <ThumbsUp className={`w-5 h-5 ${liked ? 'text-blue-500' : 'text-gray-600 group-hover:text-gray-800'}`} />
            <span className={`text-xs md:text-sm ${liked ? 'font-medium text-blue-500' : 'text-gray-600 group-hover:text-gray-800'}`}>
              Like
            </span>  
          </button>
        </div>
          
        <div className="flex-1">
          <button 
            onClick={handleComment}
            className="flex items-center justify-center gap-1.5 group transition-colors w-full py-2 hover:bg-gray-100 rounded-md"
          >  
            <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            <span className="text-xs md:text-sm text-gray-600 group-hover:text-gray-800">
              Comment
            </span>  
          </button>
        </div>
          
        <div className="flex-1">
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 group transition-colors w-full py-2 hover:bg-gray-100 rounded-md"
          >  
            <Share className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            <span className="text-xs md:text-sm text-gray-600 group-hover:text-gray-800">
              Share
            </span>  
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorProductCarousel;

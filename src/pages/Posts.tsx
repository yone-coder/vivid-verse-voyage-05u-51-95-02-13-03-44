
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/integrations/supabase/client";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { MessageSquare, Heart, Share, Clock } from "lucide-react";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";

export default function Posts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isMobile !== undefined) {
      setIsReady(true);
    }
  }, [isMobile]);

  if (!isReady) {
    return <PostsSkeleton />;
  }

  if (isLoading) {
    return <PostsSkeleton />;
  }

  // Mock data for posts
  const posts = [
    {
      id: 1,
      username: "tech_reviewer",
      avatar: "https://picsum.photos/id/1012/200",
      timeAgo: "2h",
      content: "Just received my new wireless earbuds! The sound quality is amazing and battery life is impressive.",
      images: ["https://picsum.photos/id/1/500/400", "https://picsum.photos/id/2/500/400"],
      likes: 254,
      comments: 42,
      shares: 18
    },
    {
      id: 2,
      username: "fashion_style",
      avatar: "https://picsum.photos/id/1027/200",
      timeAgo: "5h",
      content: "My new summer wardrobe collection just arrived from AliExpress! Great quality for the price. Check out these cute dresses!",
      images: ["https://picsum.photos/id/3/500/400", "https://picsum.photos/id/4/500/400", "https://picsum.photos/id/5/500/400"],
      likes: 312,
      comments: 67,
      shares: 25
    },
    {
      id: 3,
      username: "home_decor",
      avatar: "https://picsum.photos/id/1035/200",
      timeAgo: "1d",
      content: "Transformed my living room with these affordable decorative items. Swipe to see before and after!",
      images: ["https://picsum.photos/id/6/500/400", "https://picsum.photos/id/7/500/400"],
      likes: 198,
      comments: 36,
      shares: 14
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overscroll-none overflow-x-hidden">
      {/* AliExpressHeader component with active tab set to posts */}
      <AliExpressHeader activeTabId="posts" />

      <div className="pt-[44px] pb-16">
        {/* Posts Feed */}
        <div className="max-w-md mx-auto mt-2">
          {posts.map(post => (
            <div key={post.id} className="bg-white mb-3 rounded-lg shadow">
              {/* Post Header */}
              <div className="flex items-center p-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={post.avatar} alt={post.username} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">{post.username}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="px-3 pb-2">
                <p className="text-sm">{post.content}</p>
              </div>
              
              {/* Post Images */}
              <div className={`grid ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
                {post.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Post image ${idx + 1}`} 
                    className="w-full h-52 object-cover"
                  />
                ))}
              </div>
              
              {/* Post Actions */}
              <div className="flex justify-between items-center px-4 py-2.5 border-t border-gray-100">
                <button className="flex items-center text-gray-600">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-600">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.comments}</span>
                </button>
                <button className="flex items-center text-gray-600">
                  <Share className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra bottom padding for mobile to account for fixed navigation */}
      {isMobile && <div className="h-16"></div>}
    </div>
  );
}

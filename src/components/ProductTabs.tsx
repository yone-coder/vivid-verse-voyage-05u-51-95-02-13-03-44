import React, { useRef, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown, Award, Package, CheckCircle, Award as AwardIcon, Heart, ShoppingBag } from "lucide-react";

interface ProductSpec {
  name: string;
  value: string;
}

interface ProductProps {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  sold: number;
  description: string;
  images: string[];
  specs: ProductSpec[];
}

interface ProductTabsProps {
  product: ProductProps;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrolled: boolean;
  headerHeight: number;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled,
  headerHeight
}) => {
  const tabsContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsContentRef.current) {
      tabsContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ 
      top: tabsContentRef.current?.offsetTop || 0,
      behavior: 'smooth'
    });
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange}
      className="w-full"
    >
      <div className={`bg-white sticky z-20`} style={{ top: `${headerHeight}px` }}>
        <ScrollArea className="w-full" orientation="horizontal">
          <TabsList className="w-full h-10 bg-white px-0 justify-start">
            <TabsTrigger 
              value="description" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specs" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Specs
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
      </div>

      <div ref={tabsContentRef}>
        <TabsContent value="description" className="mt-0">
          <Card className="border-0 shadow-none">
            <CardContent className="p-4">
              <div className="text-sm text-gray-700 whitespace-pre-line">
                <div className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-2 text-purple-900">Galaxy Nebula Projector Pro 2025</h2>
                  <p className="text-purple-800">Transform your space into a breathtaking cosmic journey with our advanced nebula projector featuring state-of-the-art technology for immersive atmospheres.</p>
                </div>
                
                <p className="mb-4">{product.description}</p>
                
                <h3 className="font-medium mb-3 text-base border-l-4 border-purple-500 pl-2">Product Highlights</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                    <span className="bg-purple-100 p-2 rounded-full mr-3">
                      <Star className="h-4 w-4 text-purple-600" />
                    </span>
                    <div>
                      <h4 className="font-medium text-sm">Vivid Color Spectrum</h4>
                      <p className="text-xs text-gray-600">16.7 million colors for the most realistic galaxy views</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                    <span className="bg-blue-100 p-2 rounded-full mr-3">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </span>
                    <div>
                      <h4 className="font-medium text-sm">10 Projection Modes</h4>
                      <p className="text-xs text-gray-600">From flowing nebulae to shooting stars</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </span>
                    <div>
                      <h4 className="font-medium text-sm">Certified Safe</h4>
                      <p className="text-xs text-gray-600">Child-safe design with auto shut-off safety</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                    <span className="bg-amber-100 p-2 rounded-full mr-3">
                      <AwardIcon className="h-4 w-4 text-amber-600" />
                    </span>
                    <div>
                      <h4 className="font-medium text-sm">Award-Winning</h4>
                      <p className="text-xs text-gray-600">2024 Best Home Ambiance Product</p>
                    </div>
                  </div>
                </div>
                
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden group">
                  <img src="/placeholder.svg" alt="Feature video thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 group-hover:opacity-80 transition-opacity">
                    <Button className="rounded-full w-14 h-14 flex items-center justify-center bg-white text-purple-600 border-none">
                      <Star className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white font-medium">
                    <span>Experience the Galaxy Nebula Pro</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {product.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`Product detail ${index + 1}`} 
                      className="w-full h-auto rounded-md"
                    />
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2 text-base">Key Features:</h3>
                  <ul className="grid grid-cols-2 gap-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      16.7 million vibrant colors
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      10 projection modes
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Remote and app control
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Bluetooth speaker functionality
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Timer and sleep functions
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Rechargeable battery
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Music reactive modes
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      360° rotation stand
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-100 w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="text-xs font-medium">Award Winning</h4>
                    <p className="text-xs text-gray-600">Top rated in its category</p>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-100 w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2">
                      <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="text-xs font-medium">Free Shipping</h4>
                    <p className="text-xs text-gray-600">On all orders worldwide</p>
                  </div>
                  
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <div className="bg-amber-100 w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2">
                      <Heart className="h-5 w-5 text-amber-600" />
                    </div>
                    <h4 className="text-xs font-medium">Satisfaction</h4>
                    <p className="text-xs text-gray-600">30-day money back</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Limited Time Offer</h3>
                  <p className="text-sm mb-3">Get 25% off when you purchase the Galaxy Nebula Projector with any accessory!</p>
                  <Button className="bg-white text-purple-700 hover:bg-gray-100 w-full">
                    Shop Bundle Deal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="mt-0">
          <Card className="border-0 shadow-none">
            <CardContent className="p-4">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-base font-medium text-blue-800 mb-1">Technical Specifications</h3>
                <p className="text-sm text-blue-700">Detailed specifications of the Galaxy Nebula Projector Pro 2025</p>
              </div>
              
              <div className="mb-4">
                <div className="flex mb-2 items-center">
                  <Package className="h-4 w-4 text-purple-600 mr-2" />
                  <h3 className="font-medium">Physical Specifications</h3>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="divide-y">
                    {product.specs.slice(0, 3).map((spec, index) => (
                      <div key={index} className="py-3 px-4 flex hover:bg-gray-100 transition-colors">
                        <span className="w-1/3 text-gray-500 text-sm">{spec.name}</span>
                        <span className="w-2/3 font-medium text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex mb-2 items-center">
                  <Star className="h-4 w-4 text-purple-600 mr-2" />
                  <h3 className="font-medium">Performance</h3>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="divide-y">
                    {product.specs.slice(3, 8).map((spec, index) => (
                      <div key={index} className="py-3 px-4 flex hover:bg-gray-100 transition-colors">
                        <span className="w-1/3 text-gray-500 text-sm">{spec.name}</span>
                        <span className="w-2/3 font-medium text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex mb-2 items-center">
                  <ShoppingBag className="h-4 w-4 text-purple-600 mr-2" />
                  <h3 className="font-medium">Package Details</h3>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="divide-y">
                    {product.specs.slice(8).map((spec, index) => (
                      <div key={index} className="py-3 px-4 flex hover:bg-gray-100 transition-colors">
                        <span className="w-1/3 text-gray-500 text-sm">{spec.name}</span>
                        <span className="w-2/3 font-medium text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-0">
          <Card className="border-0 shadow-none">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-purple-700">{product.rating}</div>
                    <div className="text-amber-400 flex mb-1">
                      {'★'.repeat(Math.floor(product.rating))}
                      {product.rating % 1 !== 0 && '☆'}
                      {'☆'.repeat(5 - Math.ceil(product.rating))}
                    </div>
                    <div className="text-sm text-gray-500">{product.reviewCount} verified ratings</div>
                    
                    <div className="w-full mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="w-12">5 ★</span>
                        <Progress value={85} className="h-2 flex-1 mx-2" />
                        <span className="w-8 text-right">85%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-12">4 ★</span>
                        <Progress value={12} className="h-2 flex-1 mx-2" />
                        <span className="w-8 text-right">12%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-12">3 ★</span>
                        <Progress value={2} className="h-2 flex-1 mx-2" />
                        <span className="w-8 text-right">2%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-12">2 ★</span>
                        <Progress value={1} className="h-2 flex-1 mx-2" />
                        <span className="w-8 text-right">1%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-12">1 ★</span>
                        <Progress value={0} className="h-2 flex-1 mx-2" />
                        <span className="w-8 text-right">0%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-sm mb-2">Review Highlights</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Amazing colors (342)</Badge>
                      <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Easy setup (286)</Badge>
                      <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Great gift (215)</Badge>
                      <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Battery life (198)</Badge>
                      <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800">Beautiful projection (187)</Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Write a Review
                  </Button>
                </div>
                
                <div className="md:w-2/3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Customer Reviews</h3>
                    <select className="text-xs border rounded p-1.5">
                      <option>Most Recent</option>
                      <option>Highest Rated</option>
                      <option>Lowest Rated</option>
                      <option>Most Helpful</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium mr-3">
                            {["JS", "AK", "LM", "RW", "TP"][index]}
                          </div>
                          <div>
                            <div className="font-medium">{["John S.", "Alyssa K.", "Lisa M.", "Robert W.", "Thomas P."][index]}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(Date.now() - index * 5 * 86400000).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="ml-auto text-xs flex items-center">
                            <Badge variant="outline" className="mr-2 border-purple-200 text-purple-700 font-normal">
                              Verified Purchase
                            </Badge>
                            <Badge variant={index === 1 ? "outline" : "secondary"} className={index === 1 ? "border-green-200 text-green-700 font-normal" : "bg-green-100 text-green-700 font-normal"}>
                              {["Top 100", "Early Adopter", "Trusted Reviewer", "Pro User", "Top Contributor"][index]}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex justify-between items-center">
                            <div className="text-amber-400 text-sm">
                              {'★'.repeat(5 - Math.min(2, index))}
                              {'☆'.repeat(Math.min(2, index))}
                            </div>
                            <div className="text-sm font-medium">
                              {["Breathtaking Galaxy Experience", "Beautiful Colors, Poor Battery", "Perfect Gift for Space Lovers", "Absolutely Love It", "Great Value"][index]}
                            </div>
                          </div>
                          
                          <p className="mt-2 text-sm text-gray-700">
                            {index === 0 && "This nebula projector exceeded my expectations! The colors are vibrant and realistic, truly creating an immersive galaxy experience in my bedroom. The remote makes it easy to change projection modes and the bluetooth speaker is an awesome bonus feature."}
                            {index === 1 && "The color projection is absolutely stunning - blues, purples, and pinks blend so naturally. My only complaint is the battery life is about 4 hours instead of the advertised 6. Still a great purchase overall."}
                            {index === 2 && "Bought this for my space-obsessed nephew and he absolutely loves it! The projection quality is excellent and the setup was super simple. Great quality for the price."}
                            {index === 3 && "I use this every night now - the sleep timer function is perfect and the projections are so relaxing. App connection was a bit tricky at first but works great now."}
                            {index === 4 && "Impressive quality for the price point. The projection is bright enough for a medium-sized room and the different modes give plenty of variety. Highly recommend!"}
                          </p>
                          
                          {index < 2 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto">
                              {[...Array(index === 0 ? 3 : 2)].map((_, imgIndex) => (
                                <img key={imgIndex} src="/placeholder.svg" alt="Review" className="w-16 h-16 object-cover rounded" />
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <button className="flex items-center hover:text-gray-700">
                                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                Helpful ({[24, 18, 12, 8, 5][index]})
                              </button>
                              <button className="flex items-center hover:text-gray-700">
                                <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                                Not helpful ({[1, 3, 0, 1, 0][index]})
                              </button>
                            </div>
                            <button className="text-xs text-blue-600 hover:underline">Report</button>
                          </div>
                          
                          {index === 1 && (
                            <div className="mt-3 border-t pt-3">
                              <div className="flex items-start">
                                <Badge variant="outline" className="mr-2 border-red-200 bg-red-50 text-red-700 font-normal mt-1">Seller</Badge>
                                <div className="flex-1">
                                  <p className="text-xs text-gray-700">Thank you for your feedback, Alyssa. We're sorry to hear about the battery life. Our team is looking into this and we'd like to offer you a partial refund. Please contact our customer service.</p>
                                  <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full py-2 mt-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProductTabs;

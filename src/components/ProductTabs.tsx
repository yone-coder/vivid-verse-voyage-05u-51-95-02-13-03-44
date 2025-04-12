
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown, Award, Package, Video, Download, FileText, Gift, HelpCircle, Users, Play, ChevronRight, CheckCircle, Award as AwardIcon, Heart, ShoppingBag } from "lucide-react";

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
  hideOnScrollUp?: boolean; // Add this prop to the interface
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  product,
  activeTab,
  setActiveTab,
  isScrolled,
  headerHeight,
  hideOnScrollUp = false // Add default value
}) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className={`bg-white sticky z-20`} style={{ top: `${headerHeight}px` }}>
        <ScrollArea className="w-full" orientation="horizontal">
          <TabsList className="w-full h-10 bg-white px-0 justify-start" hideOnScrollUp={hideOnScrollUp} stickyOnScroll={isScrolled}>
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
            <TabsTrigger 
              value="qa" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Q&A
            </TabsTrigger>
            <TabsTrigger 
              value="video" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger 
              value="guides" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Guides
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Community
            </TabsTrigger>
            <TabsTrigger 
              value="accessories" 
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:rounded-none rounded-none text-sm"
            >
              Accessories
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
      </div>

      {/* Description Tab - Enhanced */}
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
                    <Play className="h-4 w-4 text-blue-600" />
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
                    <Play className="h-6 w-6 ml-1" />
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

      {/* Specs Tab - Enhanced */}
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
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm flex items-center">
                  <Download className="h-4 w-4 mr-2 text-purple-600" />
                  Downloads
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 text-sm flex items-center hover:underline">
                      <FileText className="h-3.5 w-3.5 mr-2" />
                      User Manual (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 text-sm flex items-center hover:underline">
                      <FileText className="h-3.5 w-3.5 mr-2" />
                      Quick Start Guide (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 text-sm flex items-center hover:underline">
                      <FileText className="h-3.5 w-3.5 mr-2" />
                      Warranty Information
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm flex items-center">
                  <Award className="h-4 w-4 mr-2 text-purple-600" />
                  Certifications
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-gray-200 rounded p-2 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="border border-gray-200 rounded p-2 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="border border-gray-200 rounded p-2 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="border border-gray-200 rounded p-2 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="border border-gray-200 rounded p-2 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline" className="text-sm">
                <Download className="h-4 w-4 mr-2" />
                Download Full Specifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Reviews Tab - Enhanced */}
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

      {/* Q&A Tab - Enhanced */}
      <TabsContent value="qa" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-blue-800">Product Questions & Answers</h3>
                  <p className="text-sm text-blue-700">Have a question? Get answers from our experts or other customers</p>
                </div>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ask a Question
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search all questions & answers..." 
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="bg-purple-100 rounded-lg p-3 flex-1">
                        <div className="flex items-center mb-1">
                          <Badge className="bg-purple-200 text-purple-800 px-1.5 rounded-full mr-2 font-semibold">Q</Badge>
                          <span className="text-sm font-medium">
                            {[
                              "Is this projector suitable for outdoor use?",
                              "Can this projector connect to my smartphone?",
                              "How long does the battery last?",
                              "Does it make any noise when operating?",
                              "Is there a warranty included?",
                              "Can I project onto a colored wall?"
                            ][index]}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{["MoonGazer22", "StarryNight45", "GalaxyLover", "AstroEnthusiast", "CosmoKid", "NightSkyWatcher"][index]}</span>
                          <span className="mx-1">•</span>
                          <span>{[30, 25, 14, 10, 7, 3][index]} days ago</span>
                          <div className="ml-auto flex items-center space-x-2">
                            <button className="text-gray-500 hover:text-gray-700 flex items-center">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{[8, 12, 5, 3, 2, 0][index]}</span>
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 flex items-center">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span>{[1, 0, 0, 0, 0, 0][index]}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-2 ml-6">
                      <div className="bg-gray-50 rounded-lg p-3 flex-1">
                        <div className="flex items-center mb-1">
                          <Badge className="bg-blue-200 text-blue-800 px-1.5 rounded-full mr-2 font-semibold">A</Badge>
                          <span className="text-sm">
                            {[
                              "Yes, it's IP65 water-resistant and can be used outdoors, but I recommend using it under some shelter for best results and to avoid exposure to heavy rain.",
                              "Absolutely! It connects via Bluetooth and also has a dedicated app that allows you to control all functions, change colors, and set timers.",
                              "I've been using mine for about 3 months now. With normal brightness settings, I get around 5 hours of continuous use. On maximum brightness it's closer to 3.5 hours.",
                              "It's extremely quiet - there's a very faint fan noise if you're within a foot of it, but otherwise silent. Perfect for bedtime use.",
                              "Yes, it comes with a standard 12-month manufacturer warranty. I had an issue with mine and customer service was excellent - they shipped a replacement within days.",
                              "I've projected it onto both white and light blue walls. Works fine on colored walls but the colors are most vibrant and true when projected on white or very light surfaces."
                            ][index]}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          {index % 2 === 0 ? (
                            <>
                              <Badge variant="outline" className="mr-2 border-red-200 bg-red-50 text-red-700 font-normal">Seller</Badge>
                              <span>Official Response</span>
                            </>
                          ) : (
                            <>
                              <span>{["NebulaPro_User", "StarGazer87", "CosmicViewer", "AstroEnthusiast"][Math.floor(index/2)]}</span>
                              <span className="mx-1">•</span>
                              <span>Verified Purchase</span>
                            </>
                          )}
                          <span className="mx-1">•</span>
                          <span>{[28, 22, 12, 9, 5, 1][index]} days ago</span>
                          <div className="ml-auto flex items-center space-x-2">
                            <button className="text-gray-500 hover:text-gray-700 flex items-center">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{[15, 8, 6, 4, 1, 0][index]}</span>
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 flex items-center">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span>0</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index === 0 && (
                      <div className="flex items-start mt-2 ml-12">
                        <div className="bg-gray-50 rounded-lg p-3 flex-1">
                          <div className="flex items-center mb-1">
                            <Badge className="bg-blue-200 text-blue-800 px-1.5 rounded-full mr-2 font-semibold">A</Badge>
                            <span className="text-sm">
                              I've had mine outside during light drizzle and it was fine. Just make sure to keep the charging port covered. The silicone cover it comes with works great for protection.
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>CosmicDreamer</span>
                            <span className="mx-1">•</span>
                            <span>Verified Purchase</span>
                            <span className="mx-1">•</span>
                            <span>26 days ago</span>
                            <div className="ml-auto flex items-center space-x-2">
                              <button className="text-gray-500 hover:text-gray-700 flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span>7</span>
                              </button>
                              <button className="text-gray-500 hover:text-gray-700 flex items-center">
                                <ThumbsDown className="h-3 w-3 mr-1" />
                                <span>0</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {index < 2 && (
                      <Button variant="ghost" size="sm" className="ml-6 mt-2 text-xs text-blue-600">
                        See all answers ({index === 0 ? 4 : 2})
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full py-2 mt-6 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
              See More Questions
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Videos Tab - New */}
      <TabsContent value="video" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="bg-gradient-to-r from-gray-900 to-purple-900 text-white p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium">Product Videos</h3>
              <p className="text-sm opacity-80">Watch how the Galaxy Nebula Projector Pro transforms your space</p>
            </div>
            
            <div className="mb-6">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <img src="/placeholder.svg" alt="Feature video thumbnail" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="rounded-full w-16 h-16 flex items-center justify-center bg-white/90 hover:bg-white text-purple-600 border-none">
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium text-lg">Galaxy Nebula Pro 2025 - Official Demo</h3>
                  <p className="text-white/80 text-sm">See all the features in action</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium mb-3">More Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative aspect-video bg-gray-100">
                    <img src="/placeholder.svg" alt={`Video thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                      <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white w-10 h-10">
                        <Play className="h-5 w-5 text-gray-900" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {["2:45", "3:18", "1:56", "4:02"][index]}
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h4 className="font-medium text-sm">
                      {[
                        "Setup Tutorial & Tips",
                        "Color Modes Showcase",
                        "Customer Testimonials",
                        "Compared: 2024 vs 2025 Model"
                      ][index]}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {["How to get the most out of your projector", "See all 10 projection modes", "Hear what our customers think", "What's new in the latest model"][index]}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-gray-500">{["34K", "18K", "12K", "45K"][index]} views</span>
                      <div className="flex items-center text-gray-500">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {["1.2K", "945", "632", "2.1K"][index]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Customer Videos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <div className="relative aspect-square bg-gray-100">
                      <img src="/placeholder.svg" alt={`Customer video ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                        <Button variant="outline" size="icon" className="rounded-full bg-white/80 hover:bg-white w-8 h-8">
                          <Play className="h-4 w-4 text-gray-900" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <p className="text-xs font-medium truncate">
                        {["Night mode ambiance", "Kids room setup", "Party lights", "Meditation space"][index]}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <span className="truncate">{["@stargaze", "@momof3", "@partyvibes", "@zenspace"][index]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <Video className="h-10 w-10 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-center sm:text-left">Share Your Experience</h3>
                  <p className="text-sm text-gray-600 text-center sm:text-left">Upload your videos using the Galaxy Nebula Projector and get featured</p>
                </div>
                <Button className="mt-3 sm:mt-0 bg-purple-600 hover:bg-purple-700">
                  Upload Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Guides Tab - New */}
      <TabsContent value="guides" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="bg-gradient-to-r from-green-800 to-emerald-600 text-white p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium">Product Guides & Tutorials</h3>
              <p className="text-sm opacity-80">Learn how to get the most out of your Galaxy Nebula Projector</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img src="/placeholder.svg" alt="Quick Start Guide" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <h3 className="text-white font-medium">Quick Start Guide</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">Learn how to set up your projector in less than 5 minutes</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">5 min read</span>
                    <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto flex items-center">
                      Read Guide <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img src="/placeholder.svg" alt="Advanced Features" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <h3 className="text-white font-medium">Advanced Features</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">Master the advanced settings and hidden features</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">10 min read</span>
                    <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto flex items-center">
                      Read Guide <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img src="/placeholder.svg" alt="Troubleshooting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                    <h3 className="text-white font-medium">Troubleshooting</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">Solutions for common issues and questions</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">8 min read</span>
                    <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto flex items-center">
                      Read Guide <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Popular Tutorials</h3>
              <div className="space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="border border-gray-200 p-3 rounded-lg flex items-start hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 flex-shrink-0 mr-3">
                      {["01", "02", "03", "04", "05"][index]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">
                        {["How to sync with music for the best light show", "Creating the perfect ambiance for each room", "Using timer functions effectively", "Connecting to smart home systems", "Battery optimization tips"][index]}
                      </h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{["Video", "Guide", "Guide", "Video", "Guide"][index]}</span>
                        <span className="mx-1">•</span>
                        <span>{["6:24", "4 min read", "7 min read", "8:15", "3 min read"][index]}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="ml-2 h-8 w-8 p-0 rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <Download className="h-10 w-10 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-center sm:text-left">Download Resources</h3>
                  <p className="text-sm text-gray-600 text-center sm:text-left">Get complete documentation, manuals, and setup guides</p>
                </div>
                <Button variant="outline" className="mt-3 sm:mt-0 border-blue-300 text-blue-700">
                  Download All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Community Tab - New */}
      <TabsContent value="community" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium">Community Showcase</h3>
              <p className="text-sm opacity-80">See how other customers are using their Galaxy Nebula Projector</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Popular Gallery</h3>
                <Button size="sm" variant="ghost" className="text-sm text-amber-600">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="group relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt={`Community example ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                      <h4 className="text-white text-xs font-medium">
                        {["Bedroom Milky Way", "Kids' Space Room", "Movie Night Setup", "Meditation Corner", "Home Theater", "Romantic Evening", "Gaming Room", "Yoga Studio"][index]}
                      </h4>
                      <div className="flex items-center mt-1">
                        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                        <span className="text-white/80 text-xs ml-1">{["@cosmic", "@spacemom", "@moviebuff", "@zenmaster", "@cinephile", "@datenight", "@gamer", "@yogalife"][index]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Featured Setups</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative">
                      <img src="/placeholder.svg" alt={`Featured setup ${index + 1}`} className="w-full h-full object-cover" />
                      <Badge className="absolute top-2 right-2 bg-amber-500">Featured</Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                        <div>
                          <h4 className="font-medium text-sm">{["Ultimate Home Theater", "Relaxation Sanctuary"][index]}</h4>
                          <p className="text-xs text-gray-500">By {["@moviemaster", "@mindfulness"][index]}</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">Follow</Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {[
                          "I combined my projector with smart lights for the ultimate movie experience. The galaxy effect during sci-fi movies is mind-blowing!",
                          "Created a meditation space with the nebula projector, essential oils, and comfortable cushions. Perfect for winding down after work."
                        ][index]}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{["243", "189"][index]} likes</span>
                        <span className="mx-2">•</span>
                        <span>{["56", "43"][index]} comments</span>
                        <div className="ml-auto">
                          <Badge variant="outline" className="font-normal">
                            {["Home Theater", "Wellness"][index]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Recent Discussions</h3>
              <div className="space-y-3">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">
                        {[
                          "Best color combinations for meditation?",
                          "How do you mount your projector?",
                          "Created a custom star map - here's how",
                          "Battery life optimization tricks"
                        ][index]}
                      </h4>
                      <Badge variant="outline" className="ml-2 font-normal text-xs">
                        {["Wellness", "Setup", "DIY", "Tips"][index]}
                      </Badge>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <div className="w-5 h-5 bg-gray-200 rounded-full mr-1"></div>
                        <span>{["@calmvibes", "@handyman", "@stargazer", "@techguru"][index]}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span>{["2 days ago", "1 week ago", "3 days ago", "5 days ago"][index]}</span>
                      <div className="ml-auto flex items-center space-x-3">
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {["24", "18", "32", "41"][index]}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {["16", "12", "28", "22"][index]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700">
                View All Discussions
              </Button>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-4">
                  <Users className="h-10 w-10 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-center sm:text-left">Join Our Community</h3>
                  <p className="text-sm text-gray-600 text-center sm:text-left">Share your experience, get inspiration, and connect with other owners</p>
                </div>
                <Button className="mt-3 sm:mt-0 bg-amber-600 hover:bg-amber-700">
                  Join Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Accessories Tab - New */}
      <TabsContent value="accessories" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-600 text-white p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium">Compatible Accessories</h3>
              <p className="text-sm opacity-80">Enhance your Galaxy Nebula Projector experience with these official accessories</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center p-4">
                    <img 
                      src="/placeholder.svg" 
                      alt={`Accessory ${index + 1}`} 
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                    {index === 0 && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">Best Seller</Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">
                      {["Premium Rotating Stand", "Remote Control (Extra)", "Projection Screens", "USB-C Fast Charger"][index]}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="text-sm font-bold text-purple-700">${["19.99", "12.99", "24.99", "14.99"][index]}</div>
                      {index !== 2 && (
                        <div className="text-xs line-through text-gray-500 ml-2">${["29.99", "17.99", "", "22.99"][index]}</div>
                      )}
                    </div>
                    <div className="flex items-center mt-2 text-xs">
                      <div className="text-amber-400 flex">
                        {"★".repeat(5 - (index === 2 ? 1 : 0))}
                        {"☆".repeat(index === 2 ? 1 : 0)}
                      </div>
                      <span className="ml-1 text-gray-500">({["426", "318", "125", "287"][index]})</span>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Recommended Bundles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 p-2">
                        <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                          <img src="/placeholder.svg" alt={`Bundle ${index + 1}`} className="max-w-full max-h-full object-contain" />
                        </div>
                      </div>
                      <div className="sm:w-2/3 p-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Save {["25%", "30%"][index]}
                        </Badge>
                        <h4 className="font-medium mt-2">
                          {["Complete Projector Kit", "Ultimate Party Bundle"][index]}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {[
                            "Includes projector, premium stand, and screen",
                            "Projector, Bluetooth speaker, and LED light strip"
                          ][index]}
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="text-lg font-bold text-purple-700">${["59.99", "69.99"][index]}</div>
                          <div className="text-sm line-through text-gray-500 ml-2">${["79.99", "99.99"][index]}</div>
                        </div>
                        <div className="mt-3 flex items-center">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            View Bundle
                          </Button>
                          <Button variant="outline" className="ml-2">
                            <Gift className="h-4 w-4 mr-2" />
                            Gift
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Frequently Bought Together</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src="/placeholder.svg" alt="Projector" className="max-w-full max-h-full p-2" />
                    </div>
                    <span className="mx-3 text-xl">+</span>
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src="/placeholder.svg" alt="Remote" className="max-w-full max-h-full p-2" />
                    </div>
                    <span className="mx-3 text-xl">+</span>
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src="/placeholder.svg" alt="Screen" className="max-w-full max-h-full p-2" />
                    </div>
                  </div>
                  <div className="md:ml-6 flex-1 text-center md:text-left">
                    <p className="text-sm font-medium">Buy these 3 items together</p>
                    <div className="flex items-center justify-center md:justify-start mt-1">
                      <div className="text-lg font-bold text-purple-700">$62.97</div>
                      <div className="text-sm line-through text-gray-500 ml-2">$77.97</div>
                      <Badge className="ml-2 bg-green-100 text-green-800 font-normal">Save $15</Badge>
                    </div>
                  </div>
                  <Button className="mt-4 md:mt-0 md:ml-4 bg-blue-600 hover:bg-blue-700">
                    Add All to Cart
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="sm:w-1/4 flex justify-center mb-4 sm:mb-0">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Gift className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                <div className="sm:w-3/4 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-purple-800">Exclusive Bundle Offer</h3>
                  <p className="text-sm text-purple-700 mb-3">Get 30% off when you purchase any two accessories with your Galaxy Nebula Projector!</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Explore Bundle Deals
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;

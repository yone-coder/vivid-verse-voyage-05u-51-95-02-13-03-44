
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, Award as AwardIcon, Heart, Play, Award, Package } from "lucide-react";

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
  features?: string[];
}

const DescriptionTab: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
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
            
            {/* Video player section */}
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
            
            {/* Product images gallery */}
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
            
            {/* Key features section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2 text-base">Key Features:</h3>
              <ul className="grid grid-cols-2 gap-y-2">
                {product.features ? product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                )) : (
                  <>
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
                  </>
                )}
              </ul>
            </div>
            
            {/* Benefits section */}
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
            
            {/* Call to action */}
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
  );
};

export default DescriptionTab;

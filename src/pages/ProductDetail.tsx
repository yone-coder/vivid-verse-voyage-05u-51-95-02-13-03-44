
import React from "react";
import { useParams } from "react-router-dom";
import LiveActivityNotifications from "@/components/LiveActivityNotifications";
import LivePurchaseBanner from "@/components/LivePurchaseBanner";
import LiveStockUpdates from "@/components/LiveStockUpdates";
import ModernBuyButton from "@/components/ModernBuyButton";
import ProductImageGallery from "@/components/ProductImageGallery";
import { useProduct } from "@/hooks/useProduct";
import {
  Star,
  TrendingUp,
  Clock,
  Fire,
  Tag,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProductDetail = () => {
  const { id, slug } = useParams();
  const productId = id || slug;
  const { data: product, isLoading, error } = useProduct(productId);

  // Placeholder product data for demo
  const productData = {
    id: "1",
    name: "Galaxy Nebula Projector Pro 2025",
    price: 24.99,
    originalPrice: 39.99,
    discount: 37,
    rating: 4.8,
    reviews: 2543,
    sold: "5.0k+",
    stock: 45,
    description:
      "Transform your space with stunning galaxy projections. Perfect for bedrooms, home theaters, and parties. Features multiple light modes, remote control, and built-in Bluetooth speaker.",
    features: [
      "16 million colors with adjustable brightness",
      "Built-in Bluetooth 5.0 speaker",
      "Remote controlled with timer function",
      "10 dynamic lighting modes",
      "Covers up to 215 sq. ft.",
    ],
    specifications: [
      { name: "Dimensions", value: "5.9 × 5.9 × 6.3 inches" },
      { name: "Power", value: "USB or AC Adapter (included)" },
      { name: "Projection Area", value: "215 sq. ft." },
      { name: "Light Source", value: "LED with 50,000 hour life" },
      { name: "Speaker", value: "5W Bluetooth 5.0" },
      { name: "Remote Range", value: "Up to 32 feet" },
    ],
    images: [
      "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
      "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png",
      "/lovable-uploads/f3efe2eb-c3db-48bd-abc7-c65456fdc028.png",
    ],
    isTrending: true,
    isTopSeller: true,
    isFlashDeal: true,
    freeShipping: true,
  };

  const productInfo = product || productData;

  if (isLoading) {
    return <div className="p-12 text-center">Loading product...</div>;
  }

  if (error) {
    return (
      <div className="p-12 text-center text-red-500">
        Error loading product details
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ProductImageGallery images={productInfo.images} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {productInfo.isFlashDeal && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <Fire className="h-3.5 w-3.5 mr-1 text-red-600" /> Flash Deal
              </Badge>
            )}
            {productInfo.isTopSeller && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                <ShoppingBag className="h-3.5 w-3.5 mr-1 text-orange-600" /> Top Seller
              </Badge>
            )}
            {productInfo.freeShipping && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Truck className="h-3.5 w-3.5 mr-1 text-green-600" /> Free Shipping
              </Badge>
            )}
            {productInfo.isTrending && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <TrendingUp className="h-3.5 w-3.5 mr-1 text-purple-600" /> Trending
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex items-center space-x-1">
              <span className="text-3xl font-bold text-red-600">${productInfo.price}</span>
              <span className="text-gray-500 line-through">${productInfo.originalPrice}</span>
            </div>
            {productInfo.discount && (
              <Badge className="bg-red-500">
                {productInfo.discount}% OFF
              </Badge>
            )}
            <span className="text-gray-500 text-sm">
              <Clock className="h-4 w-4 inline" /> Limited time offer
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{productInfo.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(productInfo.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-700">{productInfo.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-700">{productInfo.reviews} Reviews</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-700">{productInfo.sold} Sold</span>
          </div>
          
          <LiveStockUpdates initialStock={productInfo.stock} highDemand={true} />
          
          <div className="my-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{productInfo.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-5">
              {productInfo.features.map((feature, index) => (
                <li key={index} className="text-gray-700 mb-1">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              {productInfo.specifications.map((spec, index) => (
                <div
                  key={index}
                  className={`flex justify-between py-1 ${
                    index !== productInfo.specifications.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <span className="text-gray-600">{spec.name}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModernBuyButton productId={productId} />
      <LivePurchaseBanner productName={productInfo.name} />
      <LiveActivityNotifications />
    </div>
  );
};

export default ProductDetail;

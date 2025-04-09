
import { useQuery } from "@tanstack/react-query";

// Mock product data - in a real app, this would come from an API call
const fetchProduct = async (id: string) => {
  // In a real app, fetch from an API
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return {
    id,
    title: "Premium Wireless Noise-Cancelling Headphones",
    price: 149.99,
    discountPrice: 99.99,
    rating: 4.5,
    reviews: 1245,
    orders: 3879,
    stock: 89,
    description: "Experience premium sound quality with our wireless noise-cancelling headphones. Features include 40-hour battery life, comfortable over-ear design, and built-in microphone for calls.",
    images: [
      "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
      "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png",
      "/lovable-uploads/f3efe2eb-c3db-48bd-abc7-c65456fdc028.png"
    ],
    features: [
      "Active Noise Cancellation",
      "40-hour Battery Life",
      "Bluetooth 5.0",
      "Built-in Microphone",
      "Foldable Design"
    ],
    specifications: {
      "Brand": "SonicWave",
      "Model": "SW-NC500",
      "Color": "Midnight Black",
      "Connectivity": "Bluetooth 5.0",
      "Battery": "40 hours",
      "Weight": "250g"
    }
  };
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

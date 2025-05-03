
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
  category: string;
  sold?: number;
}

// Sample data for demo purposes
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds",
    price: 39.99,
    discountPrice: 29.99,
    rating: 4.5,
    image: "/api/placeholder/300/300",
    isNew: true,
    category: "electronics"
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 99.99,
    discountPrice: 79.99,
    rating: 4.3,
    image: "/api/placeholder/300/300",
    category: "electronics"
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 59.99,
    discountPrice: 49.99,
    rating: 4.7,
    image: "/api/placeholder/300/300",
    category: "electronics"
  },
  {
    id: "4",
    name: "Fitness Tracker",
    price: 49.99,
    discountPrice: 39.99,
    rating: 4.2,
    image: "/api/placeholder/300/300",
    isNew: true,
    category: "electronics"
  },
  {
    id: "5",
    name: "Laptop Sleeve",
    price: 19.99,
    rating: 4.6,
    image: "/api/placeholder/300/300",
    category: "accessories"
  },
  {
    id: "6",
    name: "Wireless Charger",
    price: 29.99,
    discountPrice: 24.99,
    rating: 4.4,
    image: "/api/placeholder/300/300",
    category: "electronics"
  }
];

// Mock fetch function - this would typically be an API call
const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return sampleProducts;
};

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}


import { useQuery } from '@tanstack/react-query';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Mock data function to simulate fetching products from an API
const fetchProducts = async (): Promise<Product[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest.",
      category: "men's clothing",
      image: "https://picsum.photos/seed/product1/300/300",
      rating: {
        rate: 3.9,
        count: 120
      }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve.",
      category: "men's clothing",
      image: "https://picsum.photos/seed/product2/300/300",
      rating: {
        rate: 4.1,
        count: 259
      }
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "Great outerwear jackets for Spring/Autumn/Winter.",
      category: "men's clothing",
      image: "https://picsum.photos/seed/product3/300/300",
      rating: {
        rate: 4.7,
        count: 500
      }
    },
    {
      id: 4,
      title: "Women's Short Sleeve Boat Neck",
      price: 9.85,
      description: "95% Cotton, 5% Spandex, lightweight.",
      category: "women's clothing",
      image: "https://picsum.photos/seed/product4/300/300",
      rating: {
        rate: 4.5,
        count: 146
      }
    },
    {
      id: 5,
      title: "Women's Floppy Sun Hat",
      price: 695,
      description: "Protective sun hat for beach or daily wear",
      category: "women's clothing",
      image: "https://picsum.photos/seed/product5/300/300",
      rating: {
        rate: 4.6,
        count: 320
      }
    },
    {
      id: 6,
      title: "Solid Gold Petite Micropave",
      price: 168,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      category: "jewelery",
      image: "https://picsum.photos/seed/product6/300/300",
      rating: {
        rate: 3.9,
        count: 70
      }
    }
  ];
};

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
}

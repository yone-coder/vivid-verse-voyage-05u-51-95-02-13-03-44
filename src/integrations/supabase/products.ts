
// --- Product type definition ---
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number | null;
  category?: string;
  imageUrl?: string;
  product_images?: {
    id: string;
    src: string;
    alt?: string;
  }[];
  rating?: number;
  reviewCount?: number;
  inventory?: number;
  created_at?: string;
}

// --- Fetch all products (mock version) ---
export async function fetchAllProducts(): Promise<Product[]> {
  // Fake/mock products
  return [
    {
      id: "1",
      name: "Wireless Headphones",
      description: "Premium wireless headphones for everyday use.",
      price: 89.99,
      discount_price: 69.99,
      category: "Electronics",
      imageUrl: "https://picsum.photos/seed/headphones/300/300",
      product_images: [
        { id: "img1", src: "https://picsum.photos/seed/headphones/300/300", alt: "Wireless Headphones" }
      ],
      rating: 4.5,
      reviewCount: 110,
      inventory: 100,
      created_at: "2024-05-10T10:00:00Z",
    },
    {
      id: "2",
      name: "Smart Watch",
      description: "Track your activity and notifications.",
      price: 199.99,
      discount_price: 159.99,
      category: "Electronics",
      imageUrl: "https://picsum.photos/seed/smartwatch/300/300",
      product_images: [
        { id: "img2", src: "https://picsum.photos/seed/smartwatch/300/300", alt: "Smart Watch" }
      ],
      rating: 4.7,
      reviewCount: 80,
      inventory: 50,
      created_at: "2024-05-09T15:31:00Z",
    },
    {
      id: "3",
      name: "Running Shoes",
      description: "Lightweight running shoes for all surfaces.",
      price: 79.99,
      discount_price: null,
      category: "Sports",
      imageUrl: "https://picsum.photos/seed/shoes/300/300",
      product_images: [
        { id: "img3", src: "https://picsum.photos/seed/shoes/300/300", alt: "Running Shoes" }
      ],
      rating: 4.8,
      reviewCount: 54,
      inventory: 200,
      created_at: "2024-05-08T12:24:00Z",
    },
  ];
}

// --- Fetch products for a specific user (mock version) ---
export async function fetchUserProducts(userId: string): Promise<Product[]> {
  // Filter by userId if needed (not implemented in mock), just return all for now
  return fetchAllProducts();
}

// --- Create a product (mock version) ---
export async function createProduct(productData: Partial<Product>): Promise<Product> {
  // In a real app, send productData to supabase, but here we return a new product
  return {
    id: Math.random().toString(36).substring(2, 9),
    name: productData.name || "New Product",
    description: productData.description || "",
    price: productData.price ?? 0,
    discount_price: productData.discount_price ?? null,
    category: productData.category || "",
    imageUrl: "",
    product_images: [],
    rating: 0,
    reviewCount: 0,
    inventory: 0,
    created_at: new Date().toISOString(),
  };
}

// --- Update a product (mock version) ---
export async function updateProduct(productId: string, productData: Partial<Product>): Promise<Product> {
  // In a real app, update the product in Supabase
  // Here, just return a mock updated product
  return {
    id: productId,
    name: productData.name || "Updated Product",
    description: productData.description || "",
    price: productData.price ?? 100,
    discount_price: productData.discount_price ?? null,
    category: productData.category || "",
    imageUrl: "",
    product_images: [],
    rating: 0,
    reviewCount: 0,
    inventory: 0,
    created_at: new Date().toISOString(),
  };
}

// --- Fetch single product by ID (mock version) ---
export async function fetchProductById(productId: string): Promise<Product> {
  // In a real app, query by ID; here, return a matching mock or placeholder
  const products = await fetchAllProducts();
  return products.find((p) => p.id === productId) || products[0];
}

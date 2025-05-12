
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Edit, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchUserProducts, Product } from "@/integrations/supabase/products";
import { useToast } from "@/hooks/use-toast";

export default function ProfileProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Get the user from auth context directly
  const { toast } = useToast();
  
  const loadProducts = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userProducts = await fetchUserProducts(user.id);
      setProducts(userProducts);
      console.log("Loaded user products:", userProducts);
    } catch (error) {
      console.error("Error loading products:", error);
      toast({
        variant: "destructive",
        title: "Error loading products",
        description: "Failed to load your products. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [user]);

  const handleAddProduct = () => {
    // Implement add product functionality
    toast({
      title: "Add product",
      description: "Product creation feature coming soon!"
    });
  };

  const handleEditProduct = (id: string) => {
    // Implement edit product functionality
    toast({
      title: "Edit product",
      description: `Editing product ${id}`
    });
  };

  const handleDeleteProduct = (id: string) => {
    // Implement delete product functionality
    toast({
      title: "Delete product",
      description: `Deleting product ${id}`
    });
    
    // Mock deletion - in a real app, you would call an API
    setProducts(products.filter(product => product.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Products</h2>
        <div className="flex gap-2">
          <Button 
            onClick={loadProducts} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleAddProduct} className="flex items-center gap-1">
            <PlusCircle className="h-5 w-5" />
            Add Product
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">You haven't created any products yet.</p>
          <Button onClick={handleAddProduct} variant="outline" className="flex items-center gap-1 mx-auto">
            <PlusCircle className="h-5 w-5" />
            Create your first product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                  {product.description || "No description available."}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                    {product.discount_price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.discount_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

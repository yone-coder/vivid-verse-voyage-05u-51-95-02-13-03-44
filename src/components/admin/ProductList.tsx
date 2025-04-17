
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchAllProducts, updateProductName } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, AlertTriangle } from "lucide-react";
import ProductCard from "./ProductCard";
import { toast } from "sonner";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast: uiToast } = useToast();

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching products...");
      const data = await fetchAllProducts();
      console.log("Products fetched:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      setError("Failed to load products. Please try again.");
      uiToast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    // This would be implemented with a deleteProduct function
    toast("Product deletion is not implemented yet", {
      description: "This feature will be available soon",
    });
  };

  const handleNameUpdate = async (id: string, newName: string) => {
    try {
      await updateProductName(id, newName);
      
      // Update local state
      setProducts(products.map(product => 
        product.id === id ? { ...product, name: newName } : product
      ));
      
      toast.success("Product name updated successfully");
    } catch (error) {
      console.error("Error updating product name:", error);
      toast.error("Failed to update product name");
    }
  };

  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Management</h2>
        <Button onClick={loadProducts} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Error loading products</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Grid className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium">No products found</h3>
          {searchTerm ? (
            <p className="text-sm text-gray-500">
              No products match your search criteria
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Create your first product to get started
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={handleDelete}
              onNameUpdate={handleNameUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

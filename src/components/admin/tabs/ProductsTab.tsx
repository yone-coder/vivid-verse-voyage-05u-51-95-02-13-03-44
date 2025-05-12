
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Edit, Eye, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { fetchAllProducts, Product, updateProduct } from "@/integrations/supabase/products";

const ProductsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editableProducts, setEditableProducts] = useState<{
    id: string;
    name: string;
    isEditing: boolean;
  }[]>([]);

  // Fetch products
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: fetchAllProducts,
  });

  // Set up editable products state when products are loaded
  React.useEffect(() => {
    if (products.length > 0) {
      const initialEditableProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        isEditing: false
      }));
      setEditableProducts(initialEditableProducts);
    }
  }, [products]);

  const startEditingProductName = (productId: string) => {
    setEditableProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, isEditing: true } : p)
    );
  };

  const cancelEditingProductName = (productId: string) => {
    setEditableProducts(prev => 
      prev.map(p => {
        if (p.id === productId) {
          const originalProduct = products.find(product => product.id === productId);
          return { 
            ...p, 
            isEditing: false, 
            name: originalProduct ? originalProduct.name : p.name 
          };
        }
        return p;
      })
    );
  };

  const handleProductNameChange = (productId: string, newName: string) => {
    setEditableProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, name: newName } : p)
    );
  };

  const saveProductName = async (productId: string) => {
    try {
      const productToUpdate = editableProducts.find(p => p.id === productId);
      
      if (!productToUpdate || !productToUpdate.name.trim()) {
        toast.error("Product name cannot be empty.");
        return;
      }
      
      const newName = productToUpdate.name.trim();
      
      const updateData = await updateProduct(productId, { 
        name: newName,
      });
      
      // Check if there were no actual changes
      if (updateData && 'noChanges' in updateData && updateData.noChanges) {
        toast("The product name is already set to this value.");
        
        // Still mark as no longer editing
        setEditableProducts(prev => 
          prev.map(p => p.id === productId ? { ...p, isEditing: false } : p)
        );
        
        return;
      }
      
      setEditableProducts(prev => 
        prev.map(p => p.id === productId ? { ...p, isEditing: false } : p)
      );
      
      toast.success("Product name updated successfully");
      refetch();
      
    } catch (error) {
      console.error('Error updating product name:', error);
      toast.error("Failed to update product name. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">Active</Badge>;
      case "draft":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">Draft</Badge>;
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Transform products from the database with derived fields
  const transformedProducts = products.map((product: Product) => ({
    ...product,
    status: product.inventory && product.inventory <= 0 ? "out_of_stock" : "active",
    inventory: product.inventory || 0,
    image: product.product_images?.length > 0 
      ? product.product_images[0].src 
      : `https://api.dicebear.com/7.x/shapes/svg?seed=product${product.id}`,
    sales: 0,
    createdAt: new Date(product.created_at || "").toLocaleDateString(),
  }));

  // Filter products based on search and status filter
  const filteredProducts = transformedProducts.filter(product => {
    // Filter by status
    if (filter !== "all" && product.status !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-full bg-muted animate-pulse rounded-md"></div>
        <div className="h-64 w-full bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-red-500">Error loading products</p>
          <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search"
                placeholder="Search products..." 
                className="pl-9 w-full sm:w-[300px]" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Inventory</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Date Added</th>
                  <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const editableProduct = editableProducts.find(p => p.id === product.id);
                  
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          {editableProduct?.isEditing ? (
                            <div className="flex items-center gap-2">
                              <Input
                                value={editableProduct.name}
                                onChange={(e) => handleProductNameChange(product.id, e.target.value)}
                                className="w-44 font-medium h-8"
                              />
                              <Button 
                                size="icon" 
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => saveProductName(product.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => cancelEditingProductName(product.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium line-clamp-1">{product.name}</span>
                              <Button 
                                size="icon" 
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => startEditingProductName(product.id)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(product.status)}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        ${parseFloat(product.price.toString()).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        {product.status === "out_of_stock" ? (
                          <span className="text-red-600 font-medium">0</span>
                        ) : (
                          product.inventory
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {product.createdAt}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/product/${product.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground text-center mt-1 max-w-sm">
                {searchQuery || filter !== "all" ? 
                  "Try adjusting your filters or search terms" : 
                  "Start by adding your first product to your store"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductsTab;

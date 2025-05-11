
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchUserProducts, Product } from "@/integrations/supabase/products";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ProfileProducts = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error getting user:', error);
        return;
      }
      
      if (data?.user) {
        console.log('User found:', data.user.id);
        setUserId(data.user.id);
      } else {
        console.log('No user found');
      }
    };
    
    checkUser();
  }, []);
  
  // Fetch user's products
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['user-products', userId],
    queryFn: () => userId ? fetchUserProducts(userId) : Promise.resolve([]),
    enabled: !!userId,
  });
  
  // Handle viewing product details
  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  // Handle editing product
  const handleEditProduct = (productId: string) => {
    // Navigate to edit page or open edit modal
    toast({
      title: "Edit Product",
      description: "Edit functionality not yet implemented",
    });
  };
  
  // Handle deleting product
  const handleDeleteProduct = async (productId: string) => {
    try {
      // Confirm before deleting
      if (!window.confirm('Are you sure you want to delete this product?')) {
        return;
      }
      
      // Delete product
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) {
        throw error;
      }
      
      // Refresh products list
      refetch();
      
      toast({
        title: "Product Deleted",
        description: "Product has been successfully deleted",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center p-10">Loading your products...</div>;
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center p-10">
        <p className="text-red-500 mb-4">Failed to load products</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }
  
  if (!userId) {
    return (
      <div className="flex flex-col items-center p-10">
        <p className="mb-4">Please log in to view your products</p>
        <Button onClick={() => navigate('/auth')}>Log In</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Products</h2>
        <Button onClick={() => navigate('/admin')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              
              <CardContent>
                {product.product_images && product.product_images.length > 0 ? (
                  <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                    <img 
                      src={product.product_images[0].src} 
                      alt={product.product_images[0].alt || product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-200 h-48 mb-4 flex items-center justify-center rounded-md">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                  {product.discount_price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.discount_price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Added: {new Date(product.created_at || '').toLocaleDateString()}
                </p>
              </CardContent>
              
              <CardFooter className="pt-0 mt-auto">
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">You don't have any products yet</p>
          <Button onClick={() => navigate('/admin')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileProducts;

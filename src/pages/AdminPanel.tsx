
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit, Eye } from "lucide-react";
import { supabase, updateProduct, subscribeToProductChanges, updateProductName } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/admin/ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  product_images: ProductImage[];
  created_at: string; // Added the missing property
}

interface ProductImage {
  id: string;
  product_id: string;
  src: string;
  alt: string;
}

interface NewProduct {
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
}

interface EditableProduct {
  id: string;
  name: string;
  isEditing: boolean;
}

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [editingImage, setEditingImage] = useState<ProductImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    discount_price: null
  });
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [editableProducts, setEditableProducts] = useState<EditableProduct[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    
    const channel = subscribeToProductChanges(() => {
      console.log("Real-time update received, refreshing products");
      fetchProducts();
    });
      
    return () => {
      console.log("Cleaning up channel subscription");
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const initialEditableProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        isEditing: false
      }));
      setEditableProducts(initialEditableProducts);
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products from Supabase");
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images(*)
        `);
      
      if (error) {
        throw error;
      }
      
      console.log("Products fetched successfully:", data);
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleUploadClick = () => {
    if (!selectedProduct) return;
    setIsUploadDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!uploadFile || !selectedProduct || !imageAlt) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide both an image and alt text.",
      });
      return;
    }

    try {
      setUploading(true);
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${selectedProduct.id}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, uploadFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: dbError } = await supabase
        .from('product_images')
        .insert({
          product_id: selectedProduct.id,
          src: imageUrl,
          alt: imageAlt
        });

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      fetchProducts();
      setIsUploadDialogOpen(false);
      setUploadFile(null);
      setImageAlt("");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "There was an error uploading the image.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEditImage = (image: ProductImage) => {
    setEditingImage(image);
    setImageAlt(image.alt);
    setIsEditDialogOpen(true);
  };

  const handleUpdateImage = async () => {
    if (!editingImage || !imageAlt) return;

    try {
      const { error } = await supabase
        .from('product_images')
        .update({ alt: imageAlt })
        .eq('id', editingImage.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Image updated successfully",
      });

      fetchProducts();
      setIsEditDialogOpen(false);
      setEditingImage(null);
      setImageAlt("");
    } catch (error) {
      console.error('Error updating image:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating the image.",
      });
    }
  };

  const handleDeleteImage = async (imageId: string, imagePath: string) => {
    try {
      const url = new URL(imagePath);
      const pathname = url.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);

      const { error: dbError } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (dbError) {
        throw dbError;
      }

      try {
        await supabase.storage
          .from('product-images')
          .remove([filename]);
      } catch (storageError) {
        console.warn('Could not delete from storage:', storageError);
      }

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      fetchProducts();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "There was an error deleting the image.",
      });
    }
  };

  const handleNewProductClick = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      discount_price: null
    });
    setIsNewProductDialogOpen(true);
  };

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "price" || name === "discount_price") {
      const numValue = value === "" ? (name === "discount_price" ? null : 0) : parseFloat(value);
      setNewProduct(prev => ({ ...prev, [name]: numValue }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields and ensure price is greater than zero.",
      });
      return;
    }

    try {
      setCreatingProduct(true);
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          discount_price: newProduct.discount_price || null
        })
        .select();

      if (error) {
        throw error;
      }

      toast({
        variant: "success",
        title: "Success",
        description: "Product created successfully!",
      });

      fetchProducts();
      setIsNewProductDialogOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product. Please try again.",
      });
    } finally {
      setCreatingProduct(false);
    }
  };

  const viewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const startEditingProductName = (productId: string) => {
    console.log(`Starting edit for product: ${productId}`);
    setEditableProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, isEditing: true } : p)
    );
  };

  const cancelEditingProductName = (productId: string) => {
    console.log(`Canceling edit for product: ${productId}`);
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
    console.log(`Changing name for product ${productId} to: ${newName}`);
    setEditableProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, name: newName } : p)
    );
  };

  const saveProductName = async (productId: string) => {
    try {
      const productToUpdate = editableProducts.find(p => p.id === productId);
      
      if (!productToUpdate || !productToUpdate.name.trim()) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Product name cannot be empty.",
        });
        return;
      }
      
      const newName = productToUpdate.name.trim();
      console.log(`Saving new name for product ${productId}: ${newName}`);
      
      // Show loading toast
      toast({
        title: "Updating...",
        description: "Saving product name changes",
      });
      
      // Send the update to Supabase
      const updatedData = await updateProductName(productId, newName);
      console.log("Update successful:", updatedData);
      
      // Update local products state to reflect the change immediately
      setProducts(prev => 
        prev.map(p => {
          if (p.id === productId) {
            return {
              ...p,
              name: newName
            };
          }
          return p;
        })
      );
      
      // Create a new success toast
      toast({
        title: "Success",
        description: "Product name updated successfully",
        variant: "default",
      });
      
      // Do one final fetch to ensure we have the latest data
      fetchProducts();
      
    } catch (error) {
      console.error('Error in saveProductName function:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "An unexpected error occurred. Please try again.",
      });
      
      // Reset editing state to reflect the failure
      cancelEditingProductName(productId);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Admin Panel</h1>
        <Button onClick={handleNewProductClick}>
          <Plus className="mr-1 h-4 w-4" />
          New Product
        </Button>
      </div>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="images">Product Images</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full p-4">Loading products...</div>
            ) : (
              products.map((product) => {
                const editableProduct = editableProducts.find(p => p.id === product.id) || {
                  id: product.id,
                  name: product.name,
                  isEditing: false
                };
                
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    editableProduct={editableProduct}
                    onStartEditing={startEditingProductName}
                    onCancelEditing={cancelEditingProductName}
                    onNameChange={handleProductNameChange}
                    onSaveName={saveProductName}
                    onManageImages={setSelectedProduct}
                    onViewProduct={viewProduct}
                  />
                );
              })
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="images">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="p-4">Loading products...</div>
                  ) : (
                    <ul className="divide-y">
                      {products.map((product) => (
                        <li 
                          key={product.id}
                          className={`p-4 cursor-pointer hover:bg-slate-100 ${selectedProduct?.id === product.id ? 'bg-slate-100' : ''}`}
                          onClick={() => handleProductSelect(product)}
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate">{product.description}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{selectedProduct ? `${selectedProduct.name} Images` : 'Select a Product'}</CardTitle>
                  {selectedProduct && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => viewProduct(selectedProduct.id)}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleUploadClick}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Image
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {selectedProduct ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProduct.product_images && selectedProduct.product_images.length > 0 ? (
                        selectedProduct.product_images.map((image) => (
                          <div key={image.id} className="border rounded-md overflow-hidden">
                            <div className="relative h-40">
                              <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-2">
                              <p className="text-sm truncate">{image.alt}</p>
                              <div className="flex justify-between mt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleEditImage(image)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleDeleteImage(image.id, image.src)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          No images found for this product
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Select a product to manage its images
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Image</DialogTitle>
            <DialogDescription>
              Upload a new image for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                Select Image
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>
            <div>
              <label htmlFor="alt" className="block text-sm font-medium mb-1">
                Alt Text
              </label>
              <Input
                id="alt"
                placeholder="Image description"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                disabled={uploading}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsUploadDialogOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUploadImage}
              disabled={!uploadFile || !imageAlt || uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Update the details for this image
            </DialogDescription>
          </DialogHeader>
          {editingImage && (
            <div className="grid gap-4 py-4">
              <div className="mx-auto">
                <img 
                  src={editingImage.src} 
                  alt={editingImage.alt} 
                  className="max-h-40 object-contain"
                />
              </div>
              <div>
                <label htmlFor="edit-alt" className="block text-sm font-medium mb-1">
                  Alt Text
                </label>
                <Input
                  id="edit-alt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateImage}>
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewProductDialogOpen} onOpenChange={setIsNewProductDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
            <DialogDescription>
              Add details for your new product
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleNewProductChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Product description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.price || ""}
                  onChange={handleNewProductChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="discount_price">Discount Price ($) (Optional)</Label>
                <Input
                  id="discount_price"
                  name="discount_price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newProduct.discount_price === null ? "" : newProduct.discount_price}
                  onChange={handleNewProductChange}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsNewProductDialogOpen(false)}
              disabled={creatingProduct}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateProduct}
              disabled={creatingProduct || !newProduct.name || !newProduct.description || !newProduct.price}
            >
              {creatingProduct ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;

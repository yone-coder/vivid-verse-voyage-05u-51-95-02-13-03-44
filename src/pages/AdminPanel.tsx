
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit, Eye, X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  product_images: ProductImage[];
}

interface ProductImage {
  id: string;
  product_id: string;
  src: string;
  alt: string;
}

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [editingImage, setEditingImage] = useState<ProductImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images(*)
        `);
      
      if (error) {
        throw error;
      }
      
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
      // Upload file to Supabase Storage
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${selectedProduct.id}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, uploadFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // Add entry to product_images table
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

      // Refresh product data
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

      // Refresh product data
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
      // Extract the filename from the URL
      const url = new URL(imagePath);
      const pathname = url.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);

      // Delete from product_images table
      const { error: dbError } = await supabase
        .from('product_images')
        .delete()
        .eq('id', imageId);

      if (dbError) {
        throw dbError;
      }

      // Try to delete from storage (might fail if path is not correct)
      try {
        await supabase.storage
          .from('product-images')
          .remove([filename]);
      } catch (storageError) {
        console.warn('Could not delete from storage:', storageError);
        // Continue even if storage deletion fails
      }

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      // Refresh product data
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

  const viewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Product Images Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products List */}
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
        
        {/* Product Images */}
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

      {/* Upload Image Dialog */}
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

      {/* Edit Image Dialog */}
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
    </div>
  );
};

export default AdminPanel;

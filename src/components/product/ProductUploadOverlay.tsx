
import React, { useState } from "react";
import { X, Upload, Camera, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

interface ProductUploadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductUploadOverlay({ isOpen, onClose }: ProductUploadOverlayProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to maximum 5 images
      const newImages = [...images, ...filesArray].slice(0, 5);
      setImages(newImages);
      
      // Generate preview URLs for the images
      const newImagePreviewUrls = newImages.map(image => URL.createObjectURL(image));
      setImagePreviewUrls(newImagePreviewUrls);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImagePreviewUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(newImagePreviewUrls[index]);
    newImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(newImagePreviewUrls);
  };

  const validateForm = () => {
    if (!productName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a product name",
        variant: "destructive"
      });
      return false;
    }

    if (!productPrice.trim() || isNaN(parseFloat(productPrice))) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price",
        variant: "destructive"
      });
      return false;
    }

    if (discountPrice.trim() && isNaN(parseFloat(discountPrice))) {
      toast({
        title: "Invalid discount price",
        description: "Please enter a valid discount price or leave it empty",
        variant: "destructive"
      });
      return false;
    }

    if (images.length === 0) {
      toast({
        title: "No images",
        description: "Please upload at least one product image",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setDiscountPrice("");
    
    // Clean up image previews
    imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    setImages([]);
    setImagePreviewUrls([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      // 1. Create product entry
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          discount_price: discountPrice ? parseFloat(discountPrice) : null
        })
        .select()
        .single();
      
      if (productError) throw productError;
      
      // 2. Upload images and create product_images entries
      const imagePromises = images.map(async (file, index) => {
        const fileName = `${Date.now()}-${index}-${file.name}`;
        const fileExt = fileName.split('.').pop();
        const filePath = `${product.id}/${fileName}`;
        
        // Upload image file
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: publicURL } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        // Create product_images entry
        return supabase
          .from('product_images')
          .insert({
            product_id: product.id,
            src: publicURL.publicUrl,
            alt: productName
          });
      });
      
      await Promise.all(imagePromises);
      
      // Show success message
      toast({
        title: "Product added!",
        description: "Your product has been successfully uploaded.",
        variant: "success"
      });
      
      // Refresh products list
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      // Close the overlay and reset form
      resetForm();
      onClose();
      
    } catch (error) {
      console.error("Error uploading product:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[90vh] overflow-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Add New Product</SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Images (Max 5)</label>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <Camera className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="sr-only"
                    multiple
                  />
                </label>
              )}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Product Name</label>
              <Input
                id="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe your product..."
                className="mt-1"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="text-sm font-medium">Price</label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="price"
                    type="text"
                    inputMode="decimal"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="discount" className="text-sm font-medium">Discount Price (Optional)</label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <Input
                    id="discount"
                    type="text"
                    inputMode="decimal"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white" 
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Product
                </>
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

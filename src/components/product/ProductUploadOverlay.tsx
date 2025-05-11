import React, { useState } from "react";
import { X, Upload, Camera, Film, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ContentType = "product" | "reel" | "post";

interface ProductUploadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductUploadOverlay({ isOpen, onClose }: ProductUploadOverlayProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [contentType, setContentType] = useState<ContentType>("product");
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [reelTitle, setReelTitle] = useState("");
  const [reelDescription, setReelDescription] = useState("");
  const [reelVideo, setReelVideo] = useState<File | null>(null);
  const [reelVideoUrl, setReelVideoUrl] = useState<string>("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReelVideo(file);
      setReelVideoUrl(URL.createObjectURL(file));
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

  const validateProductForm = () => {
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

  const validateReelForm = () => {
    if (!reelTitle.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a title for your reel",
        variant: "destructive"
      });
      return false;
    }

    if (!reelVideo) {
      toast({
        title: "No video",
        description: "Please upload a video for your reel",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const validatePostForm = () => {
    if (!postTitle.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a title for your post",
        variant: "destructive"
      });
      return false;
    }

    if (!postContent.trim()) {
      toast({
        title: "Missing content",
        description: "Please enter some content for your post",
        variant: "destructive"
      });
      return false;
    }

    if (images.length === 0) {
      toast({
        title: "No images",
        description: "Please upload at least one image for your post",
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
    setReelTitle("");
    setReelDescription("");
    setReelVideo(null);
    setReelVideoUrl("");
    setPostTitle("");
    setPostContent("");
    
    // Clean up image previews
    imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    setImages([]);
    setImagePreviewUrls([]);
    
    if (reelVideoUrl) {
      URL.revokeObjectURL(reelVideoUrl);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProductForm()) {
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

  const handleSubmitReel = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateReelForm()) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      // For now, just show a toast that this functionality is coming soon
      toast({
        title: "Coming Soon!",
        description: "Reel upload functionality will be available soon.",
        variant: "default"
      });
      
      // Close the overlay and reset form
      resetForm();
      onClose();
      
    } catch (error) {
      console.error("Error uploading reel:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your reel. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePostForm()) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      // For now, just show a toast that this functionality is coming soon
      toast({
        title: "Coming Soon!",
        description: "Post upload functionality will be available soon.",
        variant: "default"
      });
      
      // Close the overlay and reset form
      resetForm();
      onClose();
      
    } catch (error) {
      console.error("Error uploading post:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh] max-h-[90vh] w-full p-0">
        <DrawerHeader className="text-left px-4">
          <DrawerTitle>Create New Content</DrawerTitle>
        </DrawerHeader>
        
        <div className="relative h-full pb-16">
          <Tabs value={contentType} onValueChange={(value) => setContentType(value as ContentType)} className="h-full">
            <TabsContent value="product" className="mt-0 h-full overflow-auto px-4 pb-4">
              <form onSubmit={handleSubmitProduct} className="space-y-6 py-2">
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
            </TabsContent>
            
            <TabsContent value="reel" className="mt-0 h-full overflow-auto px-4 pb-4">
              <form onSubmit={handleSubmitReel} className="space-y-6 py-2">
                {/* Video Upload Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reel Video</label>
                  
                  <div className="flex flex-col items-center">
                    {reelVideoUrl ? (
                      <div className="relative w-full aspect-[9/16] rounded-md overflow-hidden bg-gray-100 mb-2">
                        <video 
                          src={reelVideoUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
                          onClick={() => {
                            URL.revokeObjectURL(reelVideoUrl);
                            setReelVideo(null);
                            setReelVideoUrl("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-full aspect-[9/16] rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                        <Film className="w-12 h-12 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Upload a video</span>
                        <span className="text-xs text-gray-400 mt-1">MP4, MOV, or WebM format</span>
                        <input 
                          type="file" 
                          accept="video/mp4,video/quicktime,video/webm" 
                          onChange={handleVideoUpload} 
                          className="sr-only"
                        />
                      </label>
                    )}
                  </div>
                </div>
                
                {/* Reel Details */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="reelTitle" className="text-sm font-medium">Title</label>
                    <Input
                      id="reelTitle"
                      value={reelTitle}
                      onChange={(e) => setReelTitle(e.target.value)}
                      placeholder="Enter reel title"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="reelDescription" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="reelDescription"
                      value={reelDescription}
                      onChange={(e) => setReelDescription(e.target.value)}
                      placeholder="Add a description..."
                      className="mt-1"
                      rows={3}
                    />
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
                        Upload Reel
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="post" className="mt-0 h-full overflow-auto px-4 pb-4">
              <form onSubmit={handleSubmitPost} className="space-y-6 py-2">
                {/* Image Upload Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Post Images</label>
                  
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
                    
                    <label className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                      <Image className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Add</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="sr-only"
                        multiple
                      />
                    </label>
                  </div>
                </div>
                
                {/* Post Details */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="postTitle" className="text-sm font-medium">Title</label>
                    <Input
                      id="postTitle"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      placeholder="Enter post title"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postContent" className="text-sm font-medium">Content</label>
                    <Textarea
                      id="postContent"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Write your post content..."
                      className="mt-1"
                      rows={6}
                      required
                    />
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
                        Upload Post
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            {/* Content Type Switcher Tabs - Now fixed at the bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 z-10">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="product" className="flex items-center justify-center gap-1">
                  <Camera className="h-4 w-4" />
                  <span>Product</span>
                </TabsTrigger>
                <TabsTrigger value="reel" className="flex items-center justify-center gap-1">
                  <Film className="h-4 w-4" />
                  <span>Reel</span>
                </TabsTrigger>
                <TabsTrigger value="post" className="flex items-center justify-center gap-1">
                  <Image className="h-4 w-4" />
                  <span>Post</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

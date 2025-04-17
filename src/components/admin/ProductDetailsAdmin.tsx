
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "@/hooks/useProduct";
import { toast } from "sonner";
import { updateProduct } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X, Image as ImageIcon, ArrowLeft } from "lucide-react";

const ProductDetailsAdmin = () => {
  const { id = "" } = useParams();
  const { data: product, isLoading, refetch } = useProduct(id);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when product data loads
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        discount_price: product.discount_price?.toString() || ""
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Validate inputs
      if (!formData.name.trim()) {
        toast.error("Product name cannot be empty");
        setIsSaving(false);
        return;
      }
      
      if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        toast.error("Please enter a valid price");
        setIsSaving(false);
        return;
      }
      
      if (formData.discount_price && (isNaN(Number(formData.discount_price)) || Number(formData.discount_price) < 0)) {
        toast.error("Please enter a valid discount price");
        setIsSaving(false);
        return;
      }

      await updateProduct(id, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null
      });

      toast.success("Product details updated successfully");
      setIsEditing(false);
      refetch(); // Refresh data
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Failed to update product details");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEditing = () => {
    if (product) {
      // Reset form to original values
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        discount_price: product.discount_price?.toString() || ""
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/admin')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <h1 className="text-2xl font-bold">Product Details</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{isEditing ? 'Edit Product' : 'Product Information'}</span>
            <Button
              variant={isEditing ? "destructive" : "default"}
              size="sm"
              onClick={() => isEditing ? cancelEditing() : setIsEditing(true)}
              disabled={isSaving}
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            {isEditing ? 'Make changes to product information' : 'View and manage product details'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing || isSaving}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={!isEditing || isSaving}
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Regular Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount_price">Discount Price ($)</Label>
              <Input
                id="discount_price"
                name="discount_price"
                type="number"
                value={formData.discount_price}
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                min="0"
                step="0.01"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Label>Product Images</Label>
            {product.product_images && product.product_images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.product_images.map((image: any) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.src}
                      alt={image.alt || "Product image"}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-gray-500">No images available for this product</p>
              </div>
            )}
          </div>
        </CardContent>

        {isEditing && (
          <CardFooter>
            <Button 
              onClick={handleSave} 
              className="ml-auto" 
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full"></div>
                  Saving...
                </span>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProductDetailsAdmin;

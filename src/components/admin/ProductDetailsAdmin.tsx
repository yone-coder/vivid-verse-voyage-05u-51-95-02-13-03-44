
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/useProduct";
import { useToast } from "@/hooks/use-toast";
import { updateProduct, updateProductName } from "@/integrations/supabase/client";
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
import { Pencil, Save, X, Image as ImageIcon } from "lucide-react";

const ProductDetailsAdmin = () => {
  const { id = "" } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [discountPrice, setDiscountPrice] = useState(product?.discount_price?.toString() || "");

  // Update local state when product data loads
  React.useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || "");
      setPrice(product.price?.toString() || "");
      setDiscountPrice(product.discount_price?.toString() || "");
    }
  }, [product]);

  const handleSave = async () => {
    try {
      await updateProduct(id, {
        name,
        description,
        price: parseFloat(price),
        discount_price: discountPrice ? parseFloat(discountPrice) : null
      });

      toast({
        title: "Success",
        description: "Product details updated successfully",
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product details",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Product Details</span>
            <Button
              variant={isEditing ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
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
            Manage your product information and pricing
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isEditing}
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Regular Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={!isEditing}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price</Label>
              <Input
                id="discountPrice"
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                disabled={!isEditing}
                min="0"
                step="0.01"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-4 gap-4">
              {product.product_images?.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt || "Product image"}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        {isEditing && (
          <CardFooter>
            <Button onClick={handleSave} className="ml-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProductDetailsAdmin;

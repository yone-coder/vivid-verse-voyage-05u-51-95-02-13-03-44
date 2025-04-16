
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Check, X, Eye, Image, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  product_images: ProductImage[];
  created_at: string;
}

interface ProductImage {
  id: string;
  product_id: string;
  src: string;
  alt: string;
}

interface EditableProduct {
  id: string;
  name: string;
  isEditing: boolean;
}

interface ProductCardProps {
  product: Product;
  editableProduct: EditableProduct;
  onStartEditing: (productId: string) => void;
  onCancelEditing: (productId: string) => void;
  onNameChange: (productId: string, newName: string) => void;
  onSaveName: (productId: string) => Promise<void>;
  onManageImages: (product: Product) => void;
  onViewProduct: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  editableProduct,
  onStartEditing,
  onCancelEditing,
  onNameChange,
  onSaveName,
  onManageImages,
  onViewProduct
}) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async (productId: string) => {
    if (!editableProduct.name || editableProduct.name.trim() === '') {
      // Don't attempt to save empty names
      return;
    }
    
    try {
      setIsSaving(true);
      await onSaveName(productId);
    } catch (error) {
      console.error("Error saving product name:", error);
      // Error will be handled in the parent component
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {product.product_images && product.product_images.length > 0 ? (
          <img
            src={product.product_images[0].src}
            alt={product.product_images[0].alt}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
            <Image size={48} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <div className="text-sm text-white">
            {product.product_images?.length || 0} image{product.product_images?.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        {editableProduct.isEditing ? (
          <div className="flex items-center space-x-2">
            <Input
              value={editableProduct.name}
              onChange={(e) => onNameChange(product.id, e.target.value)}
              className="font-medium"
              autoFocus
              disabled={isSaving}
            />
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => handleSave(product.id)}
              disabled={isSaving || !editableProduct.name || editableProduct.name.trim() === ''}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin text-green-500" />
              ) : (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onCancelEditing(product.id)}
              disabled={isSaving}
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate flex-1">{product.name}</h3>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onStartEditing(product.id)}
              className="ml-2"
            >
              <Edit className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        )}
        
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description}
        </p>
        
        <div className="mt-2 text-sm flex justify-between items-center">
          <div className="font-medium">
            ${product.price.toFixed(2)}
            {product.discount_price && (
              <span className="text-gray-500 line-through ml-1">
                ${product.discount_price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            Added: {new Date(product.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full mr-1"
          onClick={() => onViewProduct(product.id)}
        >
          <Eye className="mr-1 h-3 w-3" />
          View
        </Button>
        <Button 
          variant="default" 
          size="sm"
          className="w-full ml-1"
          onClick={() => onManageImages(product)}
        >
          <Image className="mr-1 h-3 w-3" />
          Images
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

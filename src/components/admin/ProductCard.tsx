
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Check, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductImage {
  id: string;
  product_id: string;
  src: string;
  alt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  product_images: ProductImage[];
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
  onViewProduct,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async (productId: string) => {
    try {
      setIsSaving(true);
      await onSaveName(productId);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card key={product.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        {editableProduct.isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editableProduct.name}
              onChange={(e) => onNameChange(product.id, e.target.value)}
              className="font-semibold"
              disabled={isSaving}
            />
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => handleSave(product.id)}
              disabled={isSaving}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onCancelEditing(product.id)}
              disabled={isSaving}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onStartEditing(product.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
        <div className="flex items-baseline gap-2">
          <span className="font-medium">
            ${product.price.toFixed(2)}
          </span>
          {product.discount_price && (
            <span className="text-sm text-gray-500 line-through">
              ${product.discount_price.toFixed(2)}
            </span>
          )}
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            {product.product_images?.length || 0} images
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onViewProduct(product.id)}
        >
          <Eye className="mr-1 h-4 w-4" />
          View
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onManageImages(product)}
        >
          <Pencil className="mr-1 h-4 w-4" />
          Manage Images
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

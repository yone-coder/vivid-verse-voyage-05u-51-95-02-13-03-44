
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, Trash2, X } from "lucide-react";

interface ProductCardProps {
  product: any;
  onDelete: (id: string) => void;
  onNameUpdate: (id: string, newName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onNameUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(product.name || "");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameUpdate = () => {
    if (newName.trim() !== "") {
      onNameUpdate(product.id, newName);
      setIsEditing(false);
    }
  };

  const cancelEditing = () => {
    setNewName(product.name || "");
    setIsEditing(false);
  };

  if (!product) {
    return null;
  }

  // Format the created date if it exists
  const formattedDate = product.created_at 
    ? new Date(product.created_at).toLocaleDateString() 
    : "Unknown date";

  return (
    <Card>
      <CardHeader>
        {isEditing ? (
          <div className="space-y-2">
            <Input 
              value={newName} 
              onChange={handleNameChange} 
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleNameUpdate()}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleNameUpdate}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={cancelEditing}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <CardTitle>{product.name || "Unnamed Product"}</CardTitle>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
        <CardDescription>Created at: {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Price: ${product.price || "N/A"}</p>
        {product.discount_price && <p>Discount Price: ${product.discount_price}</p>}
        <p className="line-clamp-2">{product.description || "No description available"}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link 
          to={`/admin/product/${product.id}`}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          View Details
        </Link>
        <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

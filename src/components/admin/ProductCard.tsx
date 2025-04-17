import React from "react";
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
import { Trash2 } from "lucide-react";

interface ProductCardProps {
  product: any;
  onDelete: (id: string) => void;
  onNameUpdate: (id: string, newName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onNameUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(product.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameUpdate = () => {
    onNameUpdate(product.id, newName);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>Created at: {new Date(product.created_at).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Price: ${product.price}</p>
        <p>Discount Price: ${product.discount_price}</p>
        <p>{product.description}</p>
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

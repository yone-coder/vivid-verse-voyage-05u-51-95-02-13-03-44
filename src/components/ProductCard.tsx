
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
  category: string;
  sold?: number;
}

interface ProductCardProps {
  product: ProductProps;
  className?: string;
  showTitle?: boolean;
  showButton?: boolean;
}

const ProductCard = ({ product, className = "", showTitle = true, showButton = true }: ProductCardProps) => {
  const { id, name, price, discountPrice, rating, image, isNew } = product;
  const discount = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;
  
  return (
    <Card className={`overflow-hidden group border transition-all h-full ${className}`}>
      <Link to={`/product/${id}`} className="block h-full">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
          </div>
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              -{discount}%
            </Badge>
          )}
          {isNew && (
            <Badge className="absolute bottom-2 left-2 bg-green-500 hover:bg-green-600">
              New
            </Badge>
          )}
        </div>
        
        {showTitle && (
          <CardContent className="p-3">
            <h3 className="font-medium truncate">{name}</h3>
            <div className="flex justify-between items-center mt-1">
              <div className="flex items-baseline gap-1">
                {discountPrice ? (
                  <>
                    <span className="font-bold">${discountPrice}</span>
                    <span className="text-gray-400 text-sm line-through">${price}</span>
                  </>
                ) : (
                  <span className="font-bold">${price}</span>
                )}
              </div>
              {showButton && (
                <button className="text-xs py-1 px-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  Add to cart
                </button>
              )}
            </div>
          </CardContent>
        )}
      </Link>
    </Card>
  );
};

export default ProductCard;

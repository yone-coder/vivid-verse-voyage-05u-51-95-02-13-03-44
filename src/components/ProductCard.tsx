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
  compact?: boolean;
}

const ProductCard = ({
  product,
  className = "",
  showTitle = true,
  showButton = true,
  compact = false
}: ProductCardProps) => {
  const { id, name, price, discountPrice, rating, image, isNew } = product;
  const discount = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <Card className={`overflow-hidden group border h-full transition-all ${className}`}>
      <Link to={`/product/${id}`} className="block h-full">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-1.5 right-1.5">
            <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
          </div>
          {discount > 0 && (
            <Badge className="absolute top-1.5 left-1.5 bg-red-500 hover:bg-red-600 text-[10px] px-1.5 py-0.5">
              -{discount}%
            </Badge>
          )}
          {isNew && (
            <Badge className="absolute bottom-1.5 left-1.5 bg-green-500 hover:bg-green-600 text-[10px] px-1.5 py-0.5">
              New
            </Badge>
          )}
        </div>

        {showTitle && (
          <CardContent className={`flex flex-col gap-1 ${compact ? "p-2" : "p-3"}`}>
            <h3 className={`truncate ${compact ? "text-xs font-medium" : "text-sm font-semibold"}`}>
              {name}
            </h3>
            <div className="flex flex-col items-start space-y-0.5">
              <div className="flex items-center gap-1">
                {discountPrice ? (
                  <>
                    <span className={`font-semibold ${compact ? "text-sm" : "text-base"}`}>
                      ${discountPrice}
                    </span>
                    <span className={`text-gray-400 line-through ${compact ? "text-xs" : "text-sm"}`}>
                      ${price}
                    </span>
                  </>
                ) : (
                  <span className={`font-semibold ${compact ? "text-sm" : "text-base"}`}>
                    ${price}
                  </span>
                )}
              </div>
              {showButton && (
                <button className="text-xs mt-1 px-2 py-0.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
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
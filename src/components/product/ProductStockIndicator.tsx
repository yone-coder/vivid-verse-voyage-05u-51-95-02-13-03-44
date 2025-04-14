
import React from 'react';
import { AlertTriangle, Clock, Check } from 'lucide-react';

interface ProductStockIndicatorProps {
  stock: number;
  threshold?: {
    low: number;
    critical: number;
  };
}

const ProductStockIndicator: React.FC<ProductStockIndicatorProps> = ({
  stock,
  threshold = { low: 20, critical: 5 }
}) => {
  // Determine stock status
  const isLowStock = stock <= threshold.low && stock > threshold.critical;
  const isCriticalStock = stock <= threshold.critical && stock > 0;
  const isOutOfStock = stock <= 0;
  
  if (isOutOfStock) {
    return (
      <div className="flex items-center text-red-500 bg-red-50 px-3 py-1.5 rounded-md mt-2">
        <AlertTriangle size={16} className="mr-1.5" />
        <span className="text-sm font-medium">Out of Stock</span>
      </div>
    );
  }
  
  if (isCriticalStock) {
    return (
      <div className="flex items-center text-red-500 bg-red-50 px-3 py-1.5 rounded-md mt-2 animate-pulse">
        <AlertTriangle size={16} className="mr-1.5" />
        <span className="text-sm font-medium">
          Almost gone! Only {stock} {stock === 1 ? 'item' : 'items'} left
        </span>
      </div>
    );
  }
  
  if (isLowStock) {
    return (
      <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1.5 rounded-md mt-2">
        <Clock size={16} className="mr-1.5" />
        <span className="text-sm font-medium">
          Low stock - only {stock} {stock === 1 ? 'item' : 'items'} left
        </span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-md mt-2">
      <Check size={16} className="mr-1.5" />
      <span className="text-sm font-medium">In Stock</span>
    </div>
  );
};

export default ProductStockIndicator;

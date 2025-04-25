
import React from "react";
import NewQuantitySelector from "./NewQuantitySelector";
import { VariantStockInfo } from "@/hooks/useVariantStockDecay";

interface ProductQuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  price?: number;
  maxQuantity?: number;
  minQuantity?: number;
  inStock?: number;
  productName?: string;
  stockInfo?: VariantStockInfo;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  price = 0,
  maxQuantity = 10,
  minQuantity = 1,
  inStock = 999,
  productName = "item",
  stockInfo
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > quantity) {
      onIncrement();
    } else if (newQuantity < quantity) {
      onDecrement();
    }
  };

  return (
    <NewQuantitySelector
      quantity={quantity}
      onQuantityChange={handleQuantityChange}
      basePrice={price}
    />
  );
};

export default ProductQuantitySelector;

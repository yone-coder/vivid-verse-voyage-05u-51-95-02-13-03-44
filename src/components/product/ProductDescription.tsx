
import React from "react";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-700 whitespace-pre-line">{description}</p>
    </div>
  );
};

export default ProductDescription;


import React from "react";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  return (
    <div className="p-4">
      <div className="prose max-w-none">
        <p className="text-sm text-gray-700 whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default ProductDescription;

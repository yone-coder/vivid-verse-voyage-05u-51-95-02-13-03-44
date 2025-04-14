
import React from "react";

interface ProductSpecsProps {
  specs: Array<{ name: string; value: string }>;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  return (
    <div className="p-4">
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-sm font-medium text-gray-600">{spec.name}</span>
            <span className="text-sm text-gray-800">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecs;


import React from "react";

interface Spec {
  name: string;
  value: string;
}

interface ProductSpecsProps {
  specs: Spec[];
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  return (
    <div className="p-4">
      <ul className="space-y-2">
        {specs.map((spec, index) => (
          <li key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-500">{spec.name}</span>
            <span className="text-sm font-medium">{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSpecs;

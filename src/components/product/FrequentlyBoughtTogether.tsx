
import React, { useState } from 'react';
import { Check, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  selected: boolean;
}

interface FrequentlyBoughtTogetherProps {
  mainProductId: string;
  mainProductName: string;
  mainProductImage: string;
  mainProductPrice: number;
}

const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({
  mainProductId,
  mainProductName,
  mainProductImage,
  mainProductPrice
}) => {
  const { toast } = useToast();
  
  // Mock suggested products
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'p1',
      name: 'Headphone Carrying Case',
      price: 19.99,
      image: '/placeholder.svg',
      selected: true
    },
    {
      id: 'p2',
      name: 'Memory Foam Ear Tips',
      price: 12.99,
      image: '/placeholder.svg',
      selected: true
    },
    {
      id: 'p3',
      name: 'Extended Warranty',
      price: 24.99,
      image: '/placeholder.svg',
      selected: false
    }
  ]);
  
  // Include main product in calculations
  const allProducts = [
    { id: mainProductId, name: mainProductName, price: mainProductPrice, image: mainProductImage, selected: true },
    ...products
  ];
  
  const toggleProduct = (id: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, selected: !product.selected } : product
    ));
  };
  
  const selectedProducts = allProducts.filter(product => product.selected);
  const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  const individualPrice = allProducts.reduce((sum, product) => sum + product.price, 0);
  const savings = individualPrice - totalPrice;
  
  const addToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${selectedProducts.length} items added to your cart`,
    });
  };
  
  return (
    <div className="mt-6 bg-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Frequently Bought Together</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {allProducts.map((product, index) => (
              <React.Fragment key={product.id}>
                {index > 0 && <Plus size={16} className="text-gray-400 mx-1" />}
                <div className="relative group">
                  <div className={`border rounded-lg p-2 ${product.selected ? 'border-blue-500' : 'border-gray-200'}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  {product.id !== mainProductId && (
                    <button 
                      onClick={() => toggleProduct(product.id)}
                      className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                        product.selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {product.selected ? <Check size={12} /> : '+'}
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
          
          <div className="mt-4 space-y-2">
            {allProducts.map(product => (
              <div key={product.id} className="flex items-center">
                <input 
                  type="checkbox"
                  checked={product.selected}
                  onChange={() => product.id !== mainProductId && toggleProduct(product.id)}
                  disabled={product.id === mainProductId}
                  className="mr-2 h-4 w-4 text-blue-500"
                />
                <span className="text-sm flex-1">{product.name}</span>
                <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Price for all</span>
              <span className="text-sm font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="text-xs">Bundle savings</span>
                <span className="text-xs font-medium">-${savings.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={addToCart} 
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add {selectedProducts.length} to cart
          </Button>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            You can customize your selection during checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;

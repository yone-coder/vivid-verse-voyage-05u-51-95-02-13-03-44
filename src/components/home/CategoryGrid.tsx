
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Laptop, Watch, Headphones, Camera, Tv, ShoppingBag, Package } from "lucide-react";

interface Category {
  name: string;
  icon: React.ReactNode;
  count: number;
  slug: string;
}

export default function CategoryGrid() {
  const categories: Category[] = [
    { name: "Smartphones", icon: <Smartphone className="h-6 w-6" />, count: 342, slug: "smartphones" },
    { name: "Laptops", icon: <Laptop className="h-6 w-6" />, count: 157, slug: "laptops" },
    { name: "Smartwatches", icon: <Watch className="h-6 w-6" />, count: 86, slug: "smartwatches" },
    { name: "Headphones", icon: <Headphones className="h-6 w-6" />, count: 124, slug: "headphones" },
    { name: "Cameras", icon: <Camera className="h-6 w-6" />, count: 68, slug: "cameras" },
    { name: "TVs", icon: <Tv className="h-6 w-6" />, count: 93, slug: "tvs" },
    { name: "Men's Fashion", icon: <ShoppingBag className="h-6 w-6" />, count: 215, slug: "mens-fashion" },
    { name: "Women's Fashion", icon: <Package className="h-6 w-6" />, count: 347, slug: "womens-fashion" },
  ];
  
  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Shop by Category</h2>
        <p className="text-sm text-gray-500">Browse our popular categories</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.name} to={`/category/${category.slug}`}>
            <Card className="border border-gray-100 hover:border-red-200 hover:shadow-sm transition-all">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
                  {category.icon}
                </div>
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} products</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

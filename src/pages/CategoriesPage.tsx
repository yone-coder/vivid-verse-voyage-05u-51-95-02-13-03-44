
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AliExpressHeader from "@/components/home/AliExpressHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Type definitions
interface SubCategory {
  id: string;
  name: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

const CATEGORIES: Category[] = [
  {
    id: "electronics",
    name: "Electronics & Tech",
    subCategories: [
      { id: "smartphones", name: "Smartphones", imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "laptops", name: "Laptops", imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "wearables", name: "Wearables", imageUrl: "https://images.unsplash.com/photo-1544117519-cc0d19d41d09?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "cameras", name: "Cameras", imageUrl: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "audio", name: "Audio", imageUrl: "https://images.unsplash.com/photo-1546435770-a3e736ef7d65?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "accessories", name: "Accessories", imageUrl: "https://images.unsplash.com/photo-1625466991342-f4b8be236438?q=80&w=120&h=120&auto=format&fit=crop" },
    ]
  },
  {
    id: "home",
    name: "Home & Living",
    subCategories: [
      { id: "furniture", name: "Furniture", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "kitchenware", name: "Kitchenware", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745adc8b?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "bedding", name: "Bedding", imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "bathroom", name: "Bathroom", imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "decor", name: "Home Decor", imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "garden", name: "Garden", imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=120&h=120&auto=format&fit=crop" },
    ]
  },
  {
    id: "fashion",
    name: "Fashion & Accessories",
    subCategories: [
      { id: "womens", name: "Women's Clothing", imageUrl: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "mens", name: "Men's Clothing", imageUrl: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "shoes", name: "Shoes", imageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "bags", name: "Bags", imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "jewelry", name: "Jewelry", imageUrl: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "watches", name: "Watches", imageUrl: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=120&h=120&auto=format&fit=crop" },
    ]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    subCategories: [
      { id: "gaming", name: "Gaming", imageUrl: "https://images.unsplash.com/photo-1586182987320-4f17e36750df?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "music", name: "Music", imageUrl: "https://images.unsplash.com/photo-1584679109597-c656b19974c9?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "movies", name: "Movies", imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "books", name: "Books", imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "streaming", name: "Streaming", imageUrl: "https://images.unsplash.com/photo-1522869635100-e4103ad6118e?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "collectibles", name: "Collectibles", imageUrl: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?q=80&w=120&h=120&auto=format&fit=crop" },
    ]
  },
  {
    id: "kids",
    name: "Kids & Hobbies",
    subCategories: [
      { id: "toys", name: "Toys", imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "baby", name: "Baby Products", imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "kids-clothing", name: "Kids Clothing", imageUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "crafts", name: "Crafts", imageUrl: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "education", name: "Educational", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "model-kits", name: "Model Kits", imageUrl: "https://images.unsplash.com/photo-1558846466-2bac7996f2e2?q=80&w=120&h=120&auto=format&fit=crop" },
    ]
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    subCategories: [
      { id: "fitness", name: "Fitness", imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "camping", name: "Camping", imageUrl: "https://images.unsplash.com/photo-1600073956897-7b8fb012698b?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "sportswear", name: "Sportswear", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "bicycles", name: "Bicycles", imageUrl: "https://images.unsplash.com/photo-1571333250630-f0369089f11e?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "fishing", name: "Fishing", imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "team-sports", name: "Team Sports", imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=120&h=120&auto=format&fit=crop" },
    ]
  },
  {
    id: "automotive",
    name: "Automotive",
    subCategories: [
      { id: "accessories", name: "Accessories", imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "parts", name: "Car Parts", imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "tools", name: "Tools", imageUrl: "https://images.unsplash.com/photo-1580016120251-081baa401574?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "cleaning", name: "Cleaning", imageUrl: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "motorcycle", name: "Motorcycle", imageUrl: "https://images.unsplash.com/photo-1622185135505-2d795097a1b8?q=80&w=120&h=120&auto=format&fit=crop" },
      { id: "electronics", name: "Electronics", imageUrl: "https://images.unsplash.com/photo-1542300058-1e32ebe3f5e7?q=80&w=120&h=120&auto=format&fit=crop" },
    ]
  }
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].id);

  // Get the selected category's subcategories
  const subCategories = CATEGORIES.find(cat => cat.id === selectedCategory)?.subCategories || [];

  return (
    <div className="max-w-screen overflow-hidden pb-16 relative">
      {/* Header with no specific activeTabId */}
      <AliExpressHeader />
      
      <div className="pt-[80px] bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h1>
          
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left Sidebar - Category List */}
            <div className="w-full sm:w-1/4 bg-white rounded-lg shadow-sm">
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-3">All Categories</h2>
                  <Separator className="mb-3" />
                  
                  {/* Mobile View: Accordion for categories */}
                  <div className="block sm:hidden">
                    <Accordion type="single" collapsible className="w-full">
                      {CATEGORIES.map((category) => (
                        <AccordionItem key={category.id} value={category.id}>
                          <AccordionTrigger className="text-sm">{category.name}</AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-2">
                              {category.subCategories.map((subCat) => (
                                <div 
                                  key={subCat.id} 
                                  className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                                >
                                  <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img 
                                      src={subCat.imageUrl} 
                                      alt={subCat.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="text-xs mt-1 text-center">{subCat.name}</span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  
                  {/* Desktop View: Vertical list of categories */}
                  <div className="hidden sm:block">
                    <ul className="space-y-1">
                      {CATEGORIES.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() => setSelectedCategory(category.id)}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                              selectedCategory === category.id 
                                ? "bg-orange-50 text-orange-600 font-medium" 
                                : "text-gray-700 hover:bg-gray-50"
                            )}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </div>
            
            {/* Right Content - Subcategory Grid */}
            <div className="w-full sm:w-3/4 bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">
                {CATEGORIES.find(cat => cat.id === selectedCategory)?.name || "Popular Categories"}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {subCategories.map((subCategory) => (
                  <a 
                    key={subCategory.id}
                    href={`/${selectedCategory}?subcategory=${subCategory.id}`}
                    className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-gray-200">
                      <img 
                        src={subCategory.imageUrl} 
                        alt={subCategory.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm mt-2 text-center">{subCategory.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

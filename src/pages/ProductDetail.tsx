
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/useProduct";
import ProductHeader from "@/components/product/ProductHeader";
import ProductImages from "@/components/product/ProductImages";
import ProductDescription from "@/components/product/ProductDescription";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductRatings from "@/components/product/ProductRatings";
import ProductOptions from "@/components/product/ProductOptions";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id, slug } = useParams();
  const productId = id || slug;
  const { data: product, isLoading, error } = useProduct(productId);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading product",
        description: "There was an error loading the product details.",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-[400px] w-full rounded-md" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p>Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages images={product.images} />
        
        <div className="space-y-6">
          <ProductHeader 
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
            reviewCount={product.reviewCount}
            isNew={product.isNew}
            onSale={product.onSale}
          />
          
          <ProductOptions 
            colors={product.colors}
            sizes={product.sizes}
            productId={productId || ""}
          />

          <Separator className="my-6" />

          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <ProductDescription description={product.description} features={product.features} />
            </TabsContent>
            <TabsContent value="specifications">
              <ProductSpecifications specifications={product.specifications} />
            </TabsContent>
            <TabsContent value="reviews">
              <ProductRatings 
                rating={product.rating} 
                reviewCount={product.reviewCount} 
                reviews={product.reviews}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

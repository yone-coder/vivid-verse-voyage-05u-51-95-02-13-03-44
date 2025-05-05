
import React, { useEffect } from "react";
import { fetchAllProducts } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import HeroBannerSection from "@/components/home/HeroBanner";
import PageSkeleton from "@/components/skeletons/PageSkeleton";
import SuperDealsSection from "@/components/home/SuperDealsSection";
import SecondaryHeroBanner from "@/components/home/SecondaryHeroBanner";
import FlashDeals from "@/components/home/FlashDeals";
import SpaceSavingCategories from "@/components/home/SpaceSavingCategories";
import TopBrands from "@/components/home/TopBrands";
import VendorProductCarousel from "@/components/home/VendorProductCarousel";
import SecondaryFlashDeals from "@/components/home/SecondaryFlashDeals";
import BenefitsBanner from "@/components/home/BenefitsBanner";
import TopVendorsCompact from "@/components/home/TopVendorsCompact";
import ProductGrid from "@/components/home/ProductGrid";
import Newsletter from "@/components/home/Newsletter";
import LogoutButton from "@/components/auth/LogoutButton";

export default function ForYou() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="pb-16 relative">
      {/* Logout Test Button - Positioned in the top right corner */}
      <div className="absolute top-2 right-2 z-50">
        <LogoutButton />
      </div>
      
      <HeroBannerSection />
      <SuperDealsSection products={products || []} />
      <SecondaryHeroBanner />
      <FlashDeals />
      <SpaceSavingCategories />
      <TopBrands />
      <VendorProductCarousel title="Technology" products={products?.slice(0, 10) || []} />
      <SecondaryFlashDeals />
      <BenefitsBanner />
      <TopVendorsCompact />
      <ProductGrid products={products || []} />
      <Newsletter />
    </div>
  );
}

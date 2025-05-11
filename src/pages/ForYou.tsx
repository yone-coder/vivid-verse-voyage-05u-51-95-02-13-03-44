"use client";

import React from "react";
import { fetchAllProducts } from "@/integrations/supabase/products";
import { useQuery } from "@tanstack/react-query";
import HeroBannerSection from "@/components/home/HeroBanner";
import PageSkeleton from "@/components/skeletons/PageSkeleton";
import SuperDealsSection from "@/components/home/SuperDealsSection";
import SpaceSavingCategories from "@/components/home/SpaceSavingCategories";
import FlashDeals from "@/components/home/FlashDeals";
import SecondaryHeroBanner from "@/components/home/SecondaryHeroBanner";
import TranslationExample from "@/components/home/TranslationExample";
import PopularSearches from "@/components/home/PopularSearches";
import TopBrands from "@/components/home/TopBrands";
import VendorProductCarousel from "@/components/home/VendorProductCarousel";
import SecondaryFlashDeals from "@/components/home/SecondaryFlashDeals";
import BenefitsBanner from "@/components/home/BenefitsBanner";
import TopVendorsCompact from "@/components/home/TopVendorsCompact";
import ProductRecommendations from "@/components/home/ProductRecommendations";
import Newsletter from "@/components/home/Newsletter";
import LogoutButton from "@/components/auth/LogoutButton";

export default function ForYou() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="pb-16 pt-4 relative">
      {/* Positioned Logout Button */}
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>

      {/* Hero Banner - Fixed Height to Prevent Shift */}
      <section className="h-[400px] relative">
        <HeroBannerSection />
      </section>

      {/* Space Saving Categories */}
      <section>
        <SpaceSavingCategories />
      </section>

      {/* Flash Deals */}
      <section className="min-h-[300px]">
        <FlashDeals />
      </section>

      {/* Super Deals Section */}
      <section className="min-h-[300px]">
        <SuperDealsSection products={products || []} isLoading={isLoading} />
      </section>

      {/* Secondary Hero Banner */}
      <section className="h-[250px] relative">
        <SecondaryHeroBanner />
      </section>

      {/* Translation Example */}
      <section className="min-h-[150px]">
        <TranslationExample />
      </section>

      {/* Popular Searches */}
      <section className="min-h-[100px]">
        <PopularSearches />
      </section>

      {/* Top Brands */}
      <section className="min-h-[200px]">
        <TopBrands />
      </section>

      {/* Vendor Carousel - Technology */}
      <section className="min-h-[300px]">
        {/* @ts-ignore */}
        <VendorProductCarousel title="Technology" products={products?.slice(0, 10) || []} isLoading={isLoading} />
      </section>

      {/* Secondary Flash Deals */}
      <section className="min-h-[300px]">
        <SecondaryFlashDeals />
      </section>

      {/* Benefits Banner */}
      <section className="h-[200px] relative">
        <BenefitsBanner />
      </section>

      {/* Top Vendors Compact */}
      <section className="min-h-[200px]">
        <TopVendorsCompact />
      </section>

      {/* Product Recommendations */}
      <section className="bg-white min-h-[300px] mb-1">
        <ProductRecommendations products={Array.isArray(products) ? products : []} />
      </section>

      {/* Newsletter */}
      <section className="min-h-[200px]">
        <Newsletter />
      </section>
    </div>
  );
}
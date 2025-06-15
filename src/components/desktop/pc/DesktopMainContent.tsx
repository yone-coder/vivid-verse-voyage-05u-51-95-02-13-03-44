
import React from 'react';
import DesktopFlashDeals from './DesktopFlashDeals';
import DesktopSuperDeals from './DesktopSuperDeals';
import DesktopSecondaryHero from './DesktopSecondaryHero';
import DesktopProductCarousel from './DesktopProductCarousel';
import DesktopProductRecommendations from './DesktopProductRecommendations';

interface DesktopMainContentProps {
  products: any[];
}

const DesktopMainContent = ({ products }: DesktopMainContentProps) => {
  return (
    <div className="space-y-6">
      <DesktopFlashDeals />
      
      {Array.isArray(products) && products.length > 0 && (
        <DesktopSuperDeals products={products} />
      )}
      
      <DesktopSecondaryHero />
      
      {Array.isArray(products) && products.length > 0 && (
        <DesktopProductCarousel 
          title="Technology & Electronics" 
          products={products.slice(0, 12)} 
        />
      )}
      
      {Array.isArray(products) && products.length > 0 && (
        <DesktopProductCarousel 
          title="Fashion & Apparel" 
          products={products.slice(12, 24)} 
        />
      )}
      
      <div className="bg-white rounded-lg p-6">
        {Array.isArray(products) && products.length > 0 && (
          <DesktopProductRecommendations products={products} />
        )}
      </div>
    </div>
  );
};

export default DesktopMainContent;


import React from "react";
import { Shield, Truck, Clock, CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const benefits = [
  {
    id: 1,
    icon: Shield,
    title: "Buyer Protection",
    description: "Money back guarantee"
  },
  {
    id: 2,
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50"
  },
  {
    id: 3,
    icon: Clock,
    title: "Fast Delivery",
    description: "Get your items quickly"
  },
  {
    id: 4,
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple payment options"
  }
];

export default function BenefitsBanner() {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'}`}>
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <benefit.icon className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-medium">{benefit.title}</h3>
                {!isMobile && (
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

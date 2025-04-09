
import React from "react";
import { Shield, Truck, Clock, CreditCard, Star, Gift } from "lucide-react";
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
  },
  {
    id: 5,
    icon: Star,
    title: "Loyalty Rewards",
    description: "Earn points on purchases"
  },
  {
    id: 6,
    icon: Gift,
    title: "Gift Vouchers",
    description: "Special offers for members"
  }
];

export default function BenefitsBanner() {
  const isMobile = useIsMobile();
  
  return (
    <div className="py-3">
      <div className="container mx-auto px-3">
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-3 md:grid-cols-6 gap-2'}`}>
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 group"
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors">
                <benefit.icon className="h-4 w-4 text-orange-500 flex-shrink-0" />
              </div>
              <div>
                <h3 className="text-xs font-medium">{benefit.title}</h3>
                {(!isMobile || benefits.length <= 4) && (
                  <p className="text-[10px] text-gray-500">{benefit.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

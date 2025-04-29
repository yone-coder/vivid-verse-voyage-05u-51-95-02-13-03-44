
import React from 'react';
import { Award, Heart, Share2, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InfoBand = () => {
  return (
    <div className="border-t border-b border-gray-200 bg-white flex justify-between py-1.5 px-2 text-xs">
      <div className="flex items-center text-green-700">
        <Award size={12} className="mr-1" />
        <span>Authentic</span>
      </div>
      
      <div className="flex divide-x">
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs font-normal">
          <RotateCw size={12} className="mr-1" />
          <span>360°</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs font-normal">
          <Heart size={12} className="mr-1" />
          <span>Save</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs font-normal">
          <Share2 size={12} className="mr-1" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

export default InfoBand;

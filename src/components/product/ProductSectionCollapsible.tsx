
import React, { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ProductSectionCollapsibleProps {
  title: string;
  children: React.ReactNode;
  previewContent: React.ReactNode;
  defaultExpanded?: boolean;
}

const ProductSectionCollapsible = ({
  title,
  children,
  previewContent,
  defaultExpanded = false,
}: ProductSectionCollapsibleProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-t border-gray-100 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium text-base">{title}</h2>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-8 px-2 text-gray-600 hover:bg-gray-50"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronDown className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                See More <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="w-full"
      >
        {/* Preview content - only visible when collapsed */}
        {!isExpanded && (
          <div className="mb-2 text-gray-600 line-clamp-3">
            {previewContent}
          </div>
        )}
        
        <CollapsibleContent className="text-gray-700">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProductSectionCollapsible;


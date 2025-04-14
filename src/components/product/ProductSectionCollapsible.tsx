
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
      <h2 className="font-medium text-base mb-3">{title}</h2>
      
      {/* Preview content - only visible when collapsed */}
      {!isExpanded && (
        <div className="mb-2">
          {previewContent}
        </div>
      )}
      
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-gray-600 border-gray-300 hover:bg-gray-50 mt-2"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronDown className="h-4 w-4" />
              </>
            ) : (
              <>
                See More <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProductSectionCollapsible;

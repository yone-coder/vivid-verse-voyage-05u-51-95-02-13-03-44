
import React, { useState, useRef, useEffect } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      // Set max height to 50% of the content's full height
      setMaxHeight(contentRef.current.scrollHeight / 2);
    }
  }, [children]);

  return (
    <div className="border-t border-gray-100 py-4">
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="w-full"
      >
        <h2 className="font-medium text-base mb-3">{title}</h2>
        
        <div className="relative">
          {/* Preview content with dark gradient overlay - only visible when collapsed */}
          {!isExpanded && (
            <div className="relative">
              <div 
                ref={contentRef}
                className="mb-2 text-gray-600 overflow-hidden"
                style={{ maxHeight: `${maxHeight}px` }}
              >
                {previewContent}
                {/* Dark gradient overlay */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 via-black/10 to-transparent"
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.15), rgba(0,0,0,0.08) 40%, transparent)'
                  }}
                />
              </div>
            </div>
          )}
          
          <CollapsibleContent className="text-gray-700">
            {children}
          </CollapsibleContent>
          
          {/* Floating trigger button with gradient background */}
          <div className="flex justify-center relative">
            <div 
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent -mt-16"
            />
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost"
                className="relative px-6 py-2 text-gray-600 hover:text-gray-900 bg-transparent border-0 shadow-none"
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
        </div>
      </Collapsible>
    </div>
  );
};

export default ProductSectionCollapsible;

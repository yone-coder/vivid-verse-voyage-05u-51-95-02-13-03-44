
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { 
  fetchHeroBanners, 
  deleteHeroBanner, 
  updateHeroBannerPosition 
} from "@/integrations/supabase/hero";
import HeroBannerUploadDialog from "@/components/admin/dialogs/HeroBannerUploadDialog";

const HeroBannersTab: React.FC = () => {
  const [isHeroUploadDialogOpen, setIsHeroUploadDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch hero banners
  const { data: heroBanners = [], isLoading, error, refetch } = useQuery({
    queryKey: ["hero-banners"],
    queryFn: fetchHeroBanners,
  });

  const handleDeleteHeroBanner = async (id: string, imagePath: string) => {
    try {
      const url = new URL(imagePath);
      const pathname = url.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);

      // Delete from database
      await deleteHeroBanner(id);

      try {
        // Try to delete from storage
        await supabase.storage
          .from('hero-banners')
          .remove([filename]);
      } catch (storageError) {
        console.warn('Could not delete from storage:', storageError);
      }

      queryClient.invalidateQueries({ queryKey: ["hero-banners"] });
      toast.success("Hero banner deleted successfully");
    } catch (error) {
      console.error('Error deleting hero banner:', error);
      toast.error("There was an error deleting the hero banner.");
    }
  };

  const handleMoveHeroBanner = async (id: string, currentPosition: number, direction: 'up' | 'down') => {
    const sortedBanners = [...heroBanners].sort((a, b) => (a.position || 0) - (b.position || 0));
    const currentIndex = sortedBanners.findIndex(banner => banner.id === id);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= sortedBanners.length) return;
    
    const otherBanner = sortedBanners[newIndex];
    const otherPosition = otherBanner.position || 0;
    
    try {
      await Promise.all([
        updateHeroBannerPosition(id, otherPosition),
        updateHeroBannerPosition(otherBanner.id, currentPosition)
      ]);
      
      queryClient.invalidateQueries({ queryKey: ["hero-banners"] });
      toast.success("Banner position updated successfully");
    } catch (error) {
      console.error('Error updating banner position:', error);
      toast.error("There was an error updating the banner position.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-full bg-muted animate-pulse rounded-md"></div>
        <div className="h-64 w-full bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-red-500">Error loading hero banners</p>
          <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  const sortedBanners = [...heroBanners].sort((a, b) => (a.position || 0) - (b.position || 0));
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Hero Banners</h2>
            <p className="text-sm text-gray-500">Manage the banners shown in the homepage hero section</p>
          </div>
          <Button onClick={() => setIsHeroUploadDialogOpen(true)}>
            Add Banner
          </Button>
        </div>
        
        {sortedBanners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBanners.map((banner, index) => (
              <Card key={banner.id} className="overflow-hidden border-gray-200">
                <div className="aspect-[16/9] relative">
                  <img 
                    src={banner.image} 
                    alt={banner.alt} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                    Position: {banner.position || index}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-4">
                    <h3 className="font-medium text-sm truncate">{banner.alt}</h3>
                  </div>
                  <div className="flex justify-between">
                    <div className="space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMoveHeroBanner(banner.id, banner.position || 0, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4 mr-1" />
                        Move Up
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMoveHeroBanner(banner.id, banner.position || 0, 'down')}
                        disabled={index === sortedBanners.length - 1}
                      >
                        <ArrowDown className="h-4 w-4 mr-1" />
                        Move Down
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteHeroBanner(banner.id, banner.image)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-4 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No hero banners yet</h3>
              <p className="text-muted-foreground text-center mt-1 max-w-sm mb-4">
                Add some banners to display on your homepage hero slider
              </p>
              <Button onClick={() => setIsHeroUploadDialogOpen(true)}>
                Add Your First Banner
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <HeroBannerUploadDialog 
        open={isHeroUploadDialogOpen} 
        onOpenChange={setIsHeroUploadDialogOpen}
        onSuccess={() => queryClient.invalidateQueries({ queryKey: ["hero-banners"] })}
      />
    </div>
  );
};

export default HeroBannersTab;

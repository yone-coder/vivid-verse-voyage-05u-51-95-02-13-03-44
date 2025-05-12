
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createHeroBanner } from "@/integrations/supabase/hero";
import { useQuery } from "@tanstack/react-query";

interface HeroBannerUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const HeroBannerUploadDialog: React.FC<HeroBannerUploadDialogProps> = ({ 
  open, 
  onOpenChange,
  onSuccess
}) => {
  const [heroUploadFile, setHeroUploadFile] = useState<File | null>(null);
  const [heroAlt, setHeroAlt] = useState("");
  const [uploadingHero, setUploadingHero] = useState(false);

  const { data: heroBanners = [] } = useQuery({
    queryKey: ["hero-banners"],
    enabled: open, // Only fetch when the dialog is open
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setHeroUploadFile(e.target.files[0]);
    }
  };

  const handleUploadHeroBanner = async () => {
    if (!heroUploadFile || !heroAlt) {
      toast.error("Please provide both an image and alt text.");
      return;
    }

    try {
      setUploadingHero(true);
      const fileExt = heroUploadFile.name.split('.').pop();
      const fileName = `hero_banner_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('hero-banners')
        .upload(filePath, heroUploadFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('hero-banners')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // Get highest current position
      let position = 0;
      if (heroBanners && heroBanners.length > 0) {
        const maxPosition = Math.max(...heroBanners.map(banner => banner.position || 0));
        position = maxPosition + 1;
      }

      await createHeroBanner({
        image: imageUrl,
        alt: heroAlt,
        position
      });
      
      toast.success("Hero banner uploaded successfully");
      onSuccess();
      onOpenChange(false);
      setHeroUploadFile(null);
      setHeroAlt("");
    } catch (error) {
      console.error('Error uploading hero banner:', error);
      toast.error("There was an error uploading the hero banner.");
    } finally {
      setUploadingHero(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Hero Banner</DialogTitle>
          <DialogDescription>
            Upload a new image for the hero banner slider. 
            Recommended size: 1920x600 pixels or similar aspect ratio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="hero-image">Select Image (PNG, JPG, GIF)</Label>
            <Input
              id="hero-image"
              type="file"
              accept="image/*"
              onChange={handleHeroFileChange}
              disabled={uploadingHero}
            />
            {heroUploadFile && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {heroUploadFile.name}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero-alt">Alt Text</Label>
            <Input
              id="hero-alt"
              placeholder="Image description"
              value={heroAlt}
              onChange={(e) => setHeroAlt(e.target.value)}
              disabled={uploadingHero}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={uploadingHero}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUploadHeroBanner}
            disabled={!heroUploadFile || !heroAlt || uploadingHero}
          >
            {uploadingHero ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeroBannerUploadDialog;

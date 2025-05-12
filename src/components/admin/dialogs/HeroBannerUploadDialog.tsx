
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createHeroBanner } from "@/integrations/supabase/hero";
import { useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";

interface HeroBanner {
  id: string;
  image: string;
  alt: string;
  position: number;
}

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'storage-success' | 'db-success' | 'error'>('idle');

  const { data: heroBanners = [] } = useQuery<HeroBanner[]>({
    queryKey: ["hero-banners"],
    enabled: open, // Only fetch when the dialog is open
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setHeroUploadFile(file);
    
    // Create a preview URL for the selected image
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Reset upload status when selecting a new file
    setUploadStatus('idle');
  };

  const handleUploadHeroBanner = async () => {
    if (!heroUploadFile || !heroAlt) {
      toast.error("Please provide both an image and alt text.");
      return;
    }

    try {
      setUploadingHero(true);
      setUploadStatus('idle');
      
      // Create a unique filename with timestamp and original extension
      const fileExt = heroUploadFile.name.split('.').pop();
      const fileName = `hero_banner_${Date.now()}.${fileExt}`;
      const filePath = fileName; // No need for additional folder structure

      // Log upload attempt
      console.log(`Attempting to upload ${fileName} to hero-banners bucket`);

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('hero-banners')
        .upload(filePath, heroUploadFile);

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        setUploadStatus('error');
        toast.error("Error uploading image to storage.");
        return;
      }

      console.log("File uploaded successfully:", uploadData);
      setUploadStatus('storage-success');

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('hero-banners')
        .getPublicUrl(filePath);

      console.log("Generated public URL:", publicUrlData.publicUrl);

      // Get highest current position
      let position = 0;
      if (heroBanners && heroBanners.length > 0) {
        const maxPosition = Math.max(...heroBanners.map(banner => banner.position || 0));
        position = maxPosition + 1;
      }

      // Store only the filename in the database
      const bannerResult = await createHeroBanner({
        image: filePath, // Store just the filename
        alt: heroAlt,
        position
      });
      
      console.log("Banner created in database:", bannerResult);
      
      if (bannerResult) {
        setUploadStatus('db-success');
        toast.success("Hero banner uploaded successfully");
        onSuccess(); // Trigger the success callback to refresh data
        onOpenChange(false); // Close the dialog
      
        // Reset the form
        setHeroUploadFile(null);
        setHeroAlt("");
        setPreviewUrl(null);
      } else {
        toast.error("Error saving banner details to the database.");
        setUploadStatus('error');
        // Don't close dialog so user can retry database part
      }
      
    } catch (error) {
      console.error('Error uploading hero banner:', error);
      toast.error("There was an error uploading the hero banner.");
      setUploadStatus('error');
    } finally {
      setUploadingHero(false);
    }
  };
  
  // Cleanup preview URL when dialog closes
  React.useEffect(() => {
    if (!open && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setUploadStatus('idle');
    }
  }, [open, previewUrl]);
  
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
          
          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-2 border rounded-md overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {!previewUrl && (
            <div className="mt-2 border rounded-md p-8 flex items-center justify-center bg-muted">
              <div className="text-center text-muted-foreground">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">No image selected</p>
              </div>
            </div>
          )}
          
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

          {/* Fix: Changed comparison to correct syntax */}
          {uploadStatus === 'storage-success' && uploadStatus !== 'db-success' && (
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
              Image uploaded to storage, saving to database...
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className="p-2 bg-red-50 border border-red-200 rounded-md text-sm">
              Error during upload. Please try again.
            </div>
          )}
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

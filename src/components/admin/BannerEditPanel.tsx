
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { createHeroBanner } from "@/integrations/supabase/hero";
import { RefreshCw, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface BannerEditPanelProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BannerEditPanel({ onSuccess, onCancel }: BannerEditPanelProps) {
  const [newBannerFile, setNewBannerFile] = useState<File | null>(null);
  const [newBannerAlt, setNewBannerAlt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewBannerFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBannerFile) {
      toast.error("Please select an image to upload");
      return;
    }

    setIsUploading(true);
    try {
      // Check if the user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to upload banners");
      }

      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${newBannerFile.name.replace(/\s+/g, '-').toLowerCase()}`;
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('hero-banners')
        .upload(fileName, newBannerFile);

      if (storageError) {
        throw storageError;
      }

      console.log("File uploaded successfully:", storageData);

      // Get the highest position from existing banners
      const { data: existingBanners } = await supabase
        .from('hero_banners')
        .select('position')
        .order('position', { ascending: false })
        .limit(1);

      const highestPosition = existingBanners && existingBanners.length > 0 
        ? existingBanners[0].position + 1 
        : 0;

      // Add to hero_banners table
      const newBanner = await createHeroBanner({
        image: storageData.path,
        alt: newBannerAlt || 'Hero banner image',
        position: highestPosition,
      });

      if (newBanner) {
        toast.success("Banner uploaded successfully");
        onSuccess();
      } else {
        throw new Error("Failed to create banner record");
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      toast.error("Upload Failed", {
        description: error.message || "There was an error uploading your banner"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleBannerUpload} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="banner-image">Banner Image</Label>
        
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-auto rounded-md max-h-64 object-cover border border-gray-200" 
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => {
                setNewBannerFile(null);
                setPreview(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('banner-image')?.click()}>
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Click to select an image or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">Recommended size: 1920x600 pixels</p>
          </div>
        )}
        
        <Input
          id="banner-image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="banner-alt">Alt Text (Accessibility)</Label>
        <Input
          id="banner-alt"
          value={newBannerAlt}
          onChange={(e) => setNewBannerAlt(e.target.value)}
          placeholder="Describe the image for screen readers"
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!newBannerFile || isUploading}
          className="flex items-center gap-1"
        >
          {isUploading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Banner
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

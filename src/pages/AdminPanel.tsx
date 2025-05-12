
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroBanner, fetchHeroBanners, createHeroBanner, deleteHeroBanner, updateHeroBannerPosition } from "@/integrations/supabase/hero";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { PlusCircle, Upload, Trash2, X, RefreshCw, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import BannerEditPanel from "@/components/admin/BannerEditPanel";
import { toast } from "sonner";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("hero");
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        toast.error("Access Denied", {
          description: "You need to be logged in to access the admin panel."
        });
        navigate('/auth');
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Fetch hero banners
  const loadBanners = async () => {
    setIsLoadingBanners(true);
    try {
      const data = await fetchHeroBanners();
      console.log("Admin Panel: Fetched banners:", data);
      setBanners(data);
    } catch (error) {
      console.error("Error fetching hero banners:", error);
      toast.error("Error", {
        description: "Failed to load hero banners"
      });
    } finally {
      setIsLoadingBanners(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadBanners();
    }
  }, [user]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    const items = Array.from(banners);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update local state first for responsiveness
    setBanners(items);
    
    // Then update positions in the database
    try {
      for (let i = 0; i < items.length; i++) {
        await updateHeroBannerPosition(items[i].id, i);
      }
    } catch (error) {
      console.error("Failed to update banner positions:", error);
      toast.error("Error", {
        description: "Failed to save the new order"
      });
      // Reload the original order
      loadBanners();
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) {
      return;
    }

    try {
      // Delete from database
      const success = await deleteHeroBanner(id);
      
      if (success) {
        // Remove from state
        setBanners(banners.filter(banner => banner.id !== id));
        
        toast.success("Success", {
          description: "Banner deleted successfully"
        });
      } else {
        throw new Error("Failed to delete banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Error", {
        description: "Failed to delete banner"
      });
    }
  };

  // If not authenticated yet, show loading
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button onClick={loadBanners} variant="outline" className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Hero Banner Management</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Add New Banner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Hero Banner</DialogTitle>
                </DialogHeader>
                <BannerEditPanel 
                  onSuccess={() => {
                    loadBanners();
                    setIsDialogOpen(false);
                  }}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          {isLoadingBanners ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : banners.length === 0 ? (
            <Card className="bg-gray-50">
              <CardContent className="flex flex-col items-center justify-center p-12">
                <div className="text-gray-500 mb-4 text-center">
                  No hero banners found
                </div>
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-5 w-5" />
                  Add Your First Banner
                </Button>
              </CardContent>
            </Card>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="banners">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {banners.map((banner, index) => (
                      <Draggable key={banner.id} draggableId={banner.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white border rounded-lg shadow-sm overflow-hidden flex"
                          >
                            <div className="w-[150px] h-[100px] bg-gray-100 flex-shrink-0">
                              <img
                                src={banner.image}
                                alt={banner.alt}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg";
                                }}
                              />
                            </div>
                            <div className="flex flex-col justify-between p-4 flex-1">
                              <div>
                                <div className="text-sm font-semibold">Position: {banner.position}</div>
                                <div className="text-sm text-gray-500 truncate">Alt: {banner.alt}</div>
                                <div className="text-xs text-gray-400 truncate mt-1">ID: {banner.id}</div>
                              </div>
                              <div className="flex justify-end">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteBanner(banner.id)}
                                  className="flex items-center gap-1"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </TabsContent>
        
        <TabsContent value="products">
          <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
          <p className="text-gray-500">
            Product management features coming soon.
          </p>
        </TabsContent>
        
        <TabsContent value="users">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-500">
            User management features coming soon.
          </p>
        </TabsContent>
        
        <TabsContent value="settings">
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>
          <p className="text-gray-500">
            Settings features coming soon.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

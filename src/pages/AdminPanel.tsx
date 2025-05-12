
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductsTab from "@/components/admin/tabs/ProductsTab";
import ProductImagesTab from "@/components/admin/tabs/ProductImagesTab";
import HeroBannersTab from "@/components/admin/tabs/HeroBannersTab";
import CreateProductDialog from "@/components/admin/dialogs/CreateProductDialog";

const AdminPanel: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />

      {/* Main Content */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="mr-4"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          
          <Button onClick={() => setIsNewProductDialogOpen(true)}>
            Create Product
          </Button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="products" className={activeTab === "products" ? "block" : "hidden"}>
              <ProductsTab />
            </TabsContent>
            
            <TabsContent value="product-images" className={activeTab === "product-images" ? "block" : "hidden"}>
              <ProductImagesTab />
            </TabsContent>
            
            <TabsContent value="hero-banners" className={activeTab === "hero-banners" ? "block" : "hidden"}>
              <HeroBannersTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* New Product Dialog */}
      <CreateProductDialog 
        open={isNewProductDialogOpen} 
        onOpenChange={setIsNewProductDialogOpen}
      />
    </div>
  );
};

export default AdminPanel;

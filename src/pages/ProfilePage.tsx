
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, ShoppingBag, Store, Heart, Package, History, LogOut, ChevronRight, User, Star } from "lucide-react";
import ProfileOrders from "@/components/profile/ProfileOrders";
import ProfileWishlist from "@/components/profile/ProfileWishlist";
import ProfileSettings from "@/components/profile/ProfileSettings";
import ProfileProducts from "@/components/profile/ProfileProducts";
import ProfileDashboard from "@/components/profile/ProfileDashboard";
import ProfileAnalytics from "@/components/profile/ProfileAnalytics";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, signOut, session, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profileData, setProfileData] = useState<any>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/auth");
      return;
    }

    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) {
          console.error("Error fetching profile:", error);
          toast.error("Could not load profile data");
        } else {
          setProfileData(data);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfileData();
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
      console.error(error);
    }
  };

  if (isLoading || isProfileLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const userInitials = user.email ? user.email.substring(0, 2).toUpperCase() : "U";
  const userName = profileData?.username || user.email?.split("@")[0] || "User";
  
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-8 pb-20">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
        <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-white shadow-lg">
          <AvatarImage 
            src={profileData?.avatar_url || user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} 
            alt={userName}
          />
          <AvatarFallback className="text-xl bg-primary text-primary-foreground">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                Seller
              </Badge>
              {profileData?.is_verified && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <p className="text-muted-foreground mt-1">{user.email}</p>
          <p className="text-sm mt-2 max-w-md">
            {profileData?.bio || "No bio yet. Add some information about yourself in the settings."}
          </p>
        </div>
        
        <div className="flex gap-2 self-end md:self-start">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-2 items-center">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Account Settings</SheetTitle>
              </SheetHeader>
              <ProfileSettings user={user} profile={profileData} />
            </SheetContent>
          </Sheet>
          
          <Button variant="outline" size="sm" className="flex gap-2 items-center" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-xl md:text-2xl font-bold">23</p>
            <p className="text-xs md:text-sm text-muted-foreground text-center">Orders Placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <Store className="h-6 w-6 text-green-500 mb-2" />
            <p className="text-xl md:text-2xl font-bold">12</p>
            <p className="text-xs md:text-sm text-muted-foreground text-center">Products Listed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <Star className="h-6 w-6 text-amber-500 mb-2" />
            <p className="text-xl md:text-2xl font-bold">4.8</p>
            <p className="text-xs md:text-sm text-muted-foreground text-center">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <Heart className="h-6 w-6 text-red-500 mb-2" />
            <p className="text-xl md:text-2xl font-bold">56</p>
            <p className="text-xs md:text-sm text-muted-foreground text-center">Wishlist Items</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto flex flex-wrap justify-start border-b rounded-none bg-transparent mb-6 overflow-x-auto scrollbar-hide">
          <TabsTrigger value="dashboard" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none bg-transparent">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none bg-transparent">
            My Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none bg-transparent">
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none bg-transparent">
            My Products
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none bg-transparent">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <ProfileDashboard user={user} profile={profileData} />
        </TabsContent>
        
        <TabsContent value="orders">
          <ProfileOrders user={user} />
        </TabsContent>
        
        <TabsContent value="wishlist">
          <ProfileWishlist user={user} />
        </TabsContent>
        
        <TabsContent value="products">
          <ProfileProducts user={user} />
        </TabsContent>
        
        <TabsContent value="analytics">
          <ProfileAnalytics user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

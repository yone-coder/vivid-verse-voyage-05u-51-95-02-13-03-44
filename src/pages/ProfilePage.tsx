
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "@/components/auth/LogoutButton";
import ProfileDashboard from "@/components/profile/ProfileDashboard";
import ProfileOrders from "@/components/profile/ProfileOrders";
import ProfileProducts from "@/components/profile/ProfileProducts";
import ProfileWishlist from "@/components/profile/ProfileWishlist";
import ProfileSettings from "@/components/profile/ProfileSettings";
import ProfileAnalytics from "@/components/profile/ProfileAnalytics";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import {
  UserCircle,
  Package,
  ShoppingBag,
  Heart,
  Settings,
  BarChart3,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, session } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, redirect to auth page
  React.useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Loading state while checking auth
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-2xl font-semibold">Loading...</div>
          <p className="mt-4 text-gray-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const userInitials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : "US";
  const displayName = user.email
    ? user.email.split("@")[0]
    : "User";
  const memberSince = user.created_at
    ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true })
    : "recently";

  const avatarUrl = user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${userInitials}`;

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  const tabs = [
    {
      id: "dashboard",
      label: "Overview",
      icon: <UserCircle className="h-5 w-5" />,
      content: <ProfileDashboard user={user} profile={{}} />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <Package className="h-5 w-5" />,
      content: <ProfileOrders user={user} />,
    },
    {
      id: "products",
      label: "My Products",
      icon: <ShoppingBag className="h-5 w-5" />,
      content: <ProfileProducts />, // ProfileProducts already gets user from useAuth() internally
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <Heart className="h-5 w-5" />,
      content: <ProfileWishlist user={user} />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      content: <ProfileAnalytics user={user} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      content: <ProfileSettings user={user} profile={{}} />,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* User info and navigation sidebar */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow mb-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{displayName}</h2>
            <p className="text-sm text-gray-500 mb-4">Member {memberSince}</p>
            <LogoutButton />
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block bg-white rounded-lg shadow">
            <div className="p-4">
              <h3 className="font-medium mb-2">Account</h3>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center w-full px-3 py-2 text-left text-sm rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-red-50 text-red-900"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`mr-3 ${
                        activeTab === tab.id ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="md:col-span-3">
          {/* Mobile navigation */}
          <div className="md:hidden mb-6 overflow-x-auto">
            <TabsList className="flex space-x-1 w-full bg-white p-1 rounded-lg shadow">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex-1 flex items-center justify-center ${
                    activeTab === tab.id ? "bg-red-50 text-red-900" : ""
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value={activeTab} className="mt-0">
                {tabs.find((tab) => tab.id === activeTab)?.content}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

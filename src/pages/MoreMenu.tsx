
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  LogOut, 
  ShoppingBag, 
  Heart, 
  Store, 
  BarChart3, 
  HelpCircle, 
  Bell,
  CreditCard,
  Shield,
  MessageSquare 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick, badge }) => {
  return (
    <div 
      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
        {icon}
      </div>
      <span className="ml-3 flex-1">{label}</span>
      {badge !== undefined && badge > 0 && (
        <div className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </div>
      )}
      <div className="text-gray-400">
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default function MoreMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "U";
  const userName = user?.user_metadata?.username || user?.email?.split("@")[0] || "User";

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/for-you");
    } catch (error) {
      toast.error("Failed to sign out");
      console.error(error);
    }
  };

  return (
    <div className="container max-w-lg mx-auto pb-24 md:pb-8 px-4 py-6">
      {/* User Card */}
      <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/account")}>
        <CardContent className="p-4 flex items-center">
          <Avatar className="h-14 w-14 mr-4 border">
            <AvatarImage
              src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
              alt={userName}
            />
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{userName}</h2>
            <p className="text-sm text-muted-foreground">View your profile</p>
          </div>
        </CardContent>
      </Card>

      {/* Menu Sections */}
      <div className="space-y-6">
        {/* Account Section */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm px-3 text-muted-foreground">ACCOUNT</h3>
          <MenuItem 
            icon={<User className="w-5 h-5 text-blue-500" />} 
            label="Profile" 
            onClick={() => navigate("/account")}
          />
          <MenuItem 
            icon={<Settings className="w-5 h-5 text-gray-500" />} 
            label="Settings" 
            onClick={() => navigate("/account")}
          />
          <MenuItem 
            icon={<Bell className="w-5 h-5 text-red-500" />} 
            label="Notifications" 
            onClick={() => navigate("/account")}
            badge={3}
          />
        </div>

        {/* Shopping Section */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm px-3 text-muted-foreground">SHOPPING</h3>
          <MenuItem 
            icon={<ShoppingBag className="w-5 h-5 text-amber-500" />} 
            label="Orders" 
            onClick={() => navigate("/account")}
          />
          <MenuItem 
            icon={<Heart className="w-5 h-5 text-red-500" />} 
            label="Wishlist" 
            onClick={() => navigate("/wishlist")}
          />
          <MenuItem 
            icon={<CreditCard className="w-5 h-5 text-green-500" />} 
            label="Payment Methods" 
            onClick={() => {}}
          />
        </div>

        {/* Seller Section */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm px-3 text-muted-foreground">SELLER</h3>
          <MenuItem 
            icon={<Store className="w-5 h-5 text-purple-500" />} 
            label="Products" 
            onClick={() => navigate("/account")}
          />
          <MenuItem 
            icon={<BarChart3 className="w-5 h-5 text-blue-500" />} 
            label="Analytics" 
            onClick={() => navigate("/account")}
          />
        </div>

        {/* Help Section */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm px-3 text-muted-foreground">HELP</h3>
          <MenuItem 
            icon={<HelpCircle className="w-5 h-5 text-orange-500" />} 
            label="Help Center" 
            onClick={() => {}}
          />
          <MenuItem 
            icon={<MessageSquare className="w-5 h-5 text-teal-500" />} 
            label="Contact Support" 
            onClick={() => {}}
          />
          <MenuItem 
            icon={<Shield className="w-5 h-5 text-indigo-500" />} 
            label="Privacy & Terms" 
            onClick={() => {}}
          />
        </div>

        {/* Sign Out Button */}
        <div className="pt-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

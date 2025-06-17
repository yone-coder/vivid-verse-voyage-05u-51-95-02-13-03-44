
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Send, History, MapPin, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SidebarTrackTransfer from '@/components/desktop/SidebarTrackTransfer';

const menuItems = [
  {
    title: "Send Money",
    url: "/",
    icon: Send,
  },
  {
    title: "Transfer History",
    url: "/transfer-history",
    icon: History,
  },
  {
    title: "Track Transfer",
    url: "/track-transfer",
    icon: MapPin,
  },
  {
    title: "Locations",
    url: "/locations",
    icon: MapPin,
  },
  {
    title: "Account",
    url: "/account",
    icon: User,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="p-4 space-y-6">
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Track Transfer Widget */}
        <div className="mt-6">
          <SidebarTrackTransfer />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

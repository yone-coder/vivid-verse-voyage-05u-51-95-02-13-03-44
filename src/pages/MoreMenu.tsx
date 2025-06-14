import React from 'react';
import { Link } from "react-router-dom"; 
import { Card, CardContent } from "@/components/ui/card";
import {
  SendHorizonal,
  Settings,
  HelpCircle,
  Info
} from "lucide-react";

const MoreMenu = () => {
  const menuItems = [
    { 
      title: "Transfer Money", 
      icon: <SendHorizonal className="h-6 w-6" />, 
      link: "/transfer"
    },
    { 
      title: "Settings", 
      icon: <Settings className="h-6 w-6" />, 
      link: "#"
    },
    { 
      title: "Help Center", 
      icon: <HelpCircle className="h-6 w-6" />, 
      link: "#"
    },
    { 
      title: "About Us", 
      icon: <Info className="h-6 w-6" />, 
      link: "#"
    }
  ];

  return (
    <div className="container max-w-md mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">More Options</h1>
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <Link 
                to={item.link} 
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="bg-white p-3 rounded-full shadow-sm mb-2">
                  {item.icon}
                </div>
                <span className="text-center text-sm">{item.title}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoreMenu;

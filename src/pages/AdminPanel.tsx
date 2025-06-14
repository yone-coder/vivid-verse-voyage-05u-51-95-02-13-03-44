
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h1>
          <p className="text-gray-600">
            Admin functionality has been removed from this application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;

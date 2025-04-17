
import React from "react";
import ProductList from "@/components/admin/ProductList";

const AdminPanel = () => {
  console.log("AdminPanel component rendered");
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <ProductList />
    </div>
  );
};

export default AdminPanel;

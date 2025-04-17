
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "@/components/admin/ProductList";
import ProductDetailsAdmin from "@/components/admin/ProductDetailsAdmin";

const AdminPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetailsAdmin />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;

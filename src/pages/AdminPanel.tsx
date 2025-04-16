import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "@/components/admin/ProductList";
import ProductDetailsAdmin from "@/components/admin/ProductDetailsAdmin";

const AdminPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetailsAdmin />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;

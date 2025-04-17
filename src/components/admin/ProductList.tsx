
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchAllProducts, updateProduct, updateProductName } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, AlertTriangle, Plus } from "lucide-react";
import { toast } from "sonner";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Pencil, Save, X, Trash2 } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast: uiToast } = useToast();
  
  // Track which product is currently being edited
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: ""
  });

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching products...");
      const data = await fetchAllProducts();
      console.log("Products fetched:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      setError("Failed to load products. Please try again.");
      uiToast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    // This would be implemented with a deleteProduct function
    toast("Product deletion is not implemented yet", {
      description: "This feature will be available soon",
    });
  };

  const startEditing = (product: any) => {
    setEditingProduct(product.id);
    setEditFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      discount_price: product.discount_price?.toString() || ""
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveProductChanges = async (id: string) => {
    try {
      // Validate inputs
      if (!editFormData.name.trim()) {
        toast.error("Product name cannot be empty");
        return;
      }
      
      if (isNaN(Number(editFormData.price)) || Number(editFormData.price) <= 0) {
        toast.error("Please enter a valid price");
        return;
      }
      
      if (editFormData.discount_price && (isNaN(Number(editFormData.discount_price)) || Number(editFormData.discount_price) < 0)) {
        toast.error("Please enter a valid discount price");
        return;
      }

      console.log(`Saving product changes for ${id}:`, editFormData);
      
      // First update the name separately using updateProductName
      await updateProductName(id, editFormData.name);
      console.log(`Name updated successfully to: ${editFormData.name}`);
      
      // Then update the rest of the fields
      const updatedProduct = await updateProduct(id, {
        description: editFormData.description,
        price: parseFloat(editFormData.price),
        discount_price: editFormData.discount_price ? parseFloat(editFormData.discount_price) : null
      });
      
      console.log("Product updated successfully:", updatedProduct);

      // Update local state with the updated product
      setProducts(products.map(product => 
        product.id === id ? (Array.isArray(updatedProduct) ? updatedProduct[0] : updatedProduct) : product
      ));
      
      toast.success("Product updated successfully");
      setEditingProduct(null);
      
      // Refresh the products list to ensure we have the latest data
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Failed to update product");
    }
  };

  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Management</h2>
        <div className="flex gap-2">
          <Button onClick={loadProducts} variant="outline" size="sm">
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Product
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Error loading products</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Grid className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium">No products found</h3>
          {searchTerm ? (
            <p className="text-sm text-gray-500">
              No products match your search criteria
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Create your first product to get started
            </p>
          )}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  {editingProduct === product.id ? (
                    <>
                      <TableCell>
                        <Input 
                          name="name"
                          value={editFormData.name} 
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="description"
                          value={editFormData.description} 
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="price"
                          type="number"
                          value={editFormData.price} 
                          onChange={handleInputChange}
                          className="w-28"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="discount_price"
                          type="number"
                          value={editFormData.discount_price} 
                          onChange={handleInputChange}
                          placeholder="No discount"
                          className="w-28"
                        />
                      </TableCell>
                      <TableCell>
                        {product.created_at ? new Date(product.created_at).toLocaleDateString() : "Unknown"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => saveProductChanges(product.id)}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEditing}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{product.name || "Unnamed Product"}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {product.description || "No description"}
                      </TableCell>
                      <TableCell>${product.price || "N/A"}</TableCell>
                      <TableCell>
                        {product.discount_price ? `$${product.discount_price}` : "-"}
                      </TableCell>
                      <TableCell>
                        {product.created_at ? new Date(product.created_at).toLocaleDateString() : "Unknown"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" onClick={() => startEditing(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProductList;

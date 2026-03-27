import { useState } from 'react';
import { type Product, type ProductFormData } from '../../types/product';
import { toast } from 'sonner';

export const useProducts = (initialData: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialData);

  const getProductStatus = (stock: number): Product['status'] => {
    if (stock === 0) return 'out of stock';
    if (stock <= 10) return 'low stock';
    return 'in stock';
  };

  const addProduct = (data: ProductFormData) => {
    const stock = parseInt(data.stock);
    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
      price: parseFloat(data.price),
      stock,
      status: getProductStatus(stock),
    };
    setProducts((prev) => [...prev, newProduct]);
    toast.success('Product added successfully');
  };

  const updateProduct = (id: string, data: ProductFormData) => {
    const stock = parseInt(data.stock);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id 
          ? { ...p, ...data, price: parseFloat(data.price), stock, status: getProductStatus(stock) } 
          : p
      )
    );
    toast.success('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Product deleted successfully');
  };

  return { products, addProduct, updateProduct, deleteProduct };
};
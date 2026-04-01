import { useState } from 'react';
import { type Product, type ProductFormData } from '../../types/product';
import { toast } from 'sonner';

export const useProducts = (initialData: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialData);

  const getProductStatus = (stockQuantity: number): Product['status'] => {
    if (stockQuantity === 0) return 'out of stock';
    if (stockQuantity <= 10) return 'low stock';
    return 'in stock';
  };

  const addProduct = (data: ProductFormData) => {
    //const stock = parseInt(data.stock);
    const newProduct: Product = {
      ...data,
      id: Date.now().toString(),
      sellPrice: parseFloat(data.sellPrice),
      stockQuantity: 0,
      damagedQuantity: 0,
      defectiveQuantity: 0,
      //stock,
      //status: getProductStatus(stock),
      status: 'out of stock'
    };
    setProducts((prev) => [...prev, newProduct]);
    toast.success('Product added successfully');
  };

  const updateProduct = (id: string, data: ProductFormData) => {
    //const stock = parseInt(data.stock);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id 
          ? { ...p, ...data, sellPrice: parseFloat(data.sellPrice) } 
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
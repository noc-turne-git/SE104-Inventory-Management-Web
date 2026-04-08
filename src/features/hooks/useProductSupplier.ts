import { useState } from 'react';
import { toast } from 'sonner';
import { type ProductSupplier } from '../../types/product';

export const useProductSuppliers = (initialData: ProductSupplier[]) => {
  const [productSuppliers, setProductSuppliers] = useState<ProductSupplier[]>(initialData);

  const getSuppliersByProduct = (product: string) => {
    return productSuppliers.filter((sp) => sp.product === product);
  };

  const addSupplierToProduct = (newSupplier: ProductSupplier) => {
    setProductSuppliers((prev) => {
      // Kiểm tra xem supplier này đã tồn tại cho sản phẩm này chưa
      const isExisted = prev.some(
        (s) => s.supplier === newSupplier.supplier && s.product === newSupplier.product
      );

      if (isExisted) {
        toast.error("Supplier này đã tồn tại trong danh sách!");
        return prev;
      }

      return [...prev, newSupplier];
    });
    toast.success(`Đã thêm ${newSupplier.supplier}`);
  };

  const updateProductSupplier = (oldSupplier: string, product: string, newData: Partial<ProductSupplier>) => {
    setProductSuppliers((prev) =>
      prev.map((sp) =>
        sp.supplier === oldSupplier && sp.product === product
          ? { ...sp, ...newData }
          : sp
      )
    );
  };

  const toggleSupplierType = (supplier: string, product: string) => {
    setProductSuppliers((prev) =>
      prev.map((sp) =>
        sp.supplier === supplier && sp.product === product
          ? { ...sp, type: sp.type === "PRIMARY" ? "SECONDARY" : "PRIMARY" }
          : sp
      )
    );
  };

  const removeSupplierFromProduct = (supplier: string, product: string) => {
    setProductSuppliers((prev) =>
      prev.filter((sp) => !(sp.supplier === supplier && sp.product === product))
    );
    toast.error(`Removed ${supplier} from product {product}`);
  };

  return {
    productSuppliers,
    getSuppliersByProduct,
    addSupplierToProduct,
    updateProductSupplier,
    toggleSupplierType,
    removeSupplierFromProduct,
  };
};
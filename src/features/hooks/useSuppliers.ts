import { useState } from "react";
import { type Supplier } from "../../types/supplier";
import { toast } from "sonner";

export const useSuppliers = (initialData: Supplier[]) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialData);

  const addSupplier = (data: Omit<Supplier, "id">) => {
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      ...data,
    };

    setSuppliers((prev) => [...prev, newSupplier]);
    toast.success("Supplier added successfully");
  };

  const updateSupplier = (id: string, data: Omit<Supplier, "id">) => {
    setSuppliers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
    toast.success("Supplier updated successfully");
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    toast.success("Supplier deleted successfully");
  };

  return {
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  };
};
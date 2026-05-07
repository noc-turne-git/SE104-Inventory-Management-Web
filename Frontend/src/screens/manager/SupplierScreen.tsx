import { useEffect, useRef, useState } from "react";
import SupplierCard from "../../features/suppliers/SupplierCard";
import SupplierModal from "../../features/suppliers/SupplierModal";
import SearchBar from "../../components/common/searchBar";
import OpenModalButton from "../../components/common/button/ModalButton";
import { useSuppliers } from "../../hooks/useSuppliers";
import { useWarehouseContext } from "../../context/WarehouseContext";
import { type Supplier, type SupplierInput } from "../../types/supplier";

const SupplierScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const { suppliers, loading, addSupplier, updateSupplier, deleteSupplier, searchSuppliers, refetch, } = useSuppliers(warehouseId);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Supplier | null>(null);
  const hasActiveSearchRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!warehouseId) {
      hasActiveSearchRef.current = false;
      return;
    }

    const value = debouncedValue.trim();
    if (value) {
      hasActiveSearchRef.current = true;
      void searchSuppliers(value);
      return;
    }

    if (hasActiveSearchRef.current) {
      hasActiveSearchRef.current = false;
      void refetch();
    }
  }, [debouncedValue, warehouseId, refetch, searchSuppliers]);

  const handleSubmit = async (data: SupplierInput) => {
    const ok = editingItem
      ? await updateSupplier(editingItem.id, data)
      : await addSupplier(data);

    if (ok) {
      handleCloseModal();
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setShowModal(false);
  };

  if (!warehouseId) {
    return <div className="p-8 text-gray-600">Please select a warehouse</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Supplier Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your suppliers
          </p>
        </div>

        <OpenModalButton label="Add Supplier" onClick={handleOpenAddModal} />
      </div>

      <SearchBar
        label="Search supplier..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && (
        <div className="text-gray-500 mb-4">Loading suppliers...</div>
      )}

      {!loading && suppliers.length === 0 && (
        <div className="text-gray-500 mt-6">No suppliers found.</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onDelete={(id) => void deleteSupplier(id)}
            onEdit={(sup) => {
              setEditingItem(sup);
              setShowModal(true);
            }}
          />
        ))}
      </div>

      <SupplierModal
        isOpen={showModal}
        onClose={handleCloseModal}
        initialData={editingItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SupplierScreen;

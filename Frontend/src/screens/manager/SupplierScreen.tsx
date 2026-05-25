import { useState } from "react";
import SupplierCard from "../../features/suppliers/SupplierCard";
import SupplierModal from "../../features/suppliers/SupplierModal";
import SearchBar from "../../components/common/searchBar";
import OpenModalButton from "../../components/common/button/ModalButton";
import { useSuppliers } from "../../hooks/useSuppliers";
import { useWarehouseContext } from "../../context/WarehouseContext";
import { type Supplier, type SupplierInput } from "../../types/supplier";

const SupplierScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const { suppliers, loading, addSupplier, updateSupplier, deleteSupplier } = useSuppliers(warehouseId);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Supplier | null>(null);

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-900">
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
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <div className="text-gray-500 mt-6">Loading suppliers...</div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-gray-500 mt-6">No suppliers found.</div>
      )}

      {filtered.length > 0 && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {filtered.map((supplier) => (
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
      )}

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

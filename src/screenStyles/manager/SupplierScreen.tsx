import { useState } from "react";
import SupplierCard from "../../features/suppliers/SupplierCard";
import SupplierModal from "../../features/suppliers/SupplierModal";
import SearchBar from "../../components/common/searchBar";
import OpenModalButton from "../../components/common/button/ModalButton";
import { useSuppliers } from "../../features/hooks/useSuppliers";
import { MOCK_SUPPLIERS } from "../../data/MOCK_SUPPLIERS";
import { type Supplier } from "../../types/supplier";

const SupplierScreen = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } =
    useSuppliers(MOCK_SUPPLIERS);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Supplier | null>(null);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (data: Omit<Supplier, "id">) => {
    if (editingItem) {
      updateSupplier(editingItem.id, data);
    } else {
      addSupplier(data);
    }
    handleCloseModal();
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setShowModal(false);
  };

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Supplier Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your suppliers
          </p>
        </div>

        <OpenModalButton label="Add Supplier" onClick={handleOpenAddModal} />
      </div>

      {/* SEARCH */}
      <SearchBar
        label="Search supplier..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {filteredSuppliers.map((s) => (
          <SupplierCard
            key={s.id}
            supplier={s}
            onDelete={deleteSupplier}
            onEdit={(sup) => {
              setEditingItem(sup);
              setShowModal(true);
            }}
          />
        ))}
      </div>

      {/* MODAL */}
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
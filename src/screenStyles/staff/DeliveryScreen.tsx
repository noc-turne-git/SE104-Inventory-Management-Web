import { useState } from 'react';
import OpenModalButton from '../../components/common/button/ModalButton';
import SearchBar, { FilterBar } from '../../components/common/searchBar';
import { MOCK_DELIVERY } from '../../data/MOCK_DELIVERY';
import { type Delivery, type DeliveryFormData } from '../../types/note'; 
import DeliveryModal from '../../features/delivery/DeliveryModal';
import { useDeliveries } from '../../features/hooks/useDeliveries';
import { DeliveryNote } from '../../features/delivery/DeliveryNote';

const DeliveryScreen = () => {
  const { 
    deliveries, 
    addDelivery, 
    updateDelivery, 
    deleteDelivery, 
    filterDeliveries 
  } = useDeliveries();

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Delivery | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusOptions = ['all', 'new', 'in process', 'pending', 'approved', 'rejected'];

  const handleSubmit = (formData: DeliveryFormData) => {
    if (editingItem) {
      updateDelivery(editingItem.id, formData);
    } else {
      addDelivery(formData);
    }
    handleCloseModal();
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (delivery: Delivery) => {
    setEditingItem(delivery);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null); 
    setShowModal(false);
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>
          <p className="text-gray-600 mt-1">Track and manage outgoing shipments and operator assignments</p>
        </div>
        <OpenModalButton label="Create Delivery Note" onClick={handleOpenAddModal} />
      </div>
    
      {/* Search & Filter Section */}
      <div className='grid grid-cols-2 gap-4 mb-6'>
        <SearchBar 
          label="Search by ID, Destination or operator..."
          onChange={(e: any) => setSearchTerm(e.target.value)} 
        />
        <FilterBar
          select={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>
          
      {/* List Section */}
      <div className="space-y-4">
        {filterDeliveries(searchTerm, statusFilter).length > 0 ? (
          filterDeliveries(searchTerm, statusFilter).map((delivery) => (
            <DeliveryNote
              delivery={delivery}
              key={delivery.id}
              onOpenEditModal={handleOpenEditModal}
              //onDelete={() => deleteDelivery(delivery.id)}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No delivery notes found matching your criteria.</p>
          </div>
        )}
      </div>
          
      {/* Modal Section */}
      <DeliveryModal 
        isOpen={showModal} 
        onClose={handleCloseModal}
        initialData={editingItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default DeliveryScreen;
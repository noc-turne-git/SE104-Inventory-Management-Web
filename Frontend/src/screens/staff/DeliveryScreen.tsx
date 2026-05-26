import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import OpenModalButton from '../../components/common/button/ModalButton';
import SearchBar, { FilterBar } from '../../components/common/searchBar';
import { type Delivery, type DeliveryFormData } from '../../types/note'; 
import DeliveryModal from '../../features/delivery/DeliveryModal';
import { useDeliveries } from '../../hooks/useDeliveries';
import { DeliveryNote } from '../../features/delivery/DeliveryNote';
import { type Product } from '../../types/product';
import productApi from '../../api/ProductAPI';
import { useWarehouseContext } from '../../context/WarehouseContext';
import { useProducts } from '../../hooks/useProducts';
import { toast } from 'sonner';

const mapApiProductToProduct = (data: any): Product => ({
  id: String(data?.productId ?? data?.id ?? ''),
  image: data?.imageUrl ?? data?.image ?? '',
  name: data?.name ?? '',
  sku: data?.sku ?? '',
  category: data?.category ?? '',
  description: data?.description ?? '',
  sellPrice: Number(data?.sellPrice ?? 0),
  stockQuantity: Number(data?.stockQuantity ?? 0),
  defectiveQuantity: Number(data?.defectiveQuantity ?? 0),
  damagedQuantity: Number(data?.damagedQuantity ?? 0),
  status: (data?.status ?? 'undefined') as Product['status'],
});

const DeliveryScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const { 
    deliveries, 
    addDelivery, 
    updateDelivery, 
    deleteDelivery, 
    filterDeliveries 
  } = useDeliveries();
  const { products, replaceProducts } = useProducts([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Delivery | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusOptions = ['all', 'in process', 'pending', 'approved', 'rejected'];

  useEffect(() => {
    const loadProducts = async () => {
      if (!warehouseId) {
        replaceProducts([]);
        return;
      }

      try {
        const res = await productApi.getAll(warehouseId);
        replaceProducts((Array.isArray(res.data) ? res.data : []).map(mapApiProductToProduct));
      } catch (err: unknown) {
        replaceProducts([]);
        if (!isAxiosError(err)) toast.error('Failed to fetch products');
        else if (!err.response) toast.error('Cannot connect to server. Please check your network.');
        else toast.error(err.response.data?.message || 'Failed to fetch products');
      }
    };

    void loadProducts();
  }, [warehouseId, replaceProducts]);

  const handleSubmit = async (formData: DeliveryFormData) => {
    let ok = false;
    if (editingItem) {
      ok = await updateDelivery(editingItem.id, formData);
    } else {
      ok = await addDelivery(formData);
    }
    if (ok) {
      handleCloseModal();
    }
    return ok;
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
          <h1 className="text-3xl font-bold text-gray-900">Delivery Management</h1>
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
              onDelete={() => deleteDelivery(delivery.id)}
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
        products={products}
      />
    </div>
  );
}

export default DeliveryScreen;

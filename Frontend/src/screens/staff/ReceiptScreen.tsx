import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import OpenModalButton from '../../components/common/button/ModalButton';
import SearchBar, {FilterBar} from '../../components/common/searchBar';
import { type Receipt, type ReceiptFormData } from '../../types/note'; 
import ReceiptModal from '../../features/receipts/ReceiptModal';
import { useReceipts } from '../../hooks/useReceipts';
import { ReceiptNote } from '../../features/receipts/ReceiptNote';
import { type Product } from '../../types/product';
import productApi from '../../api/ProductAPI';
import { useProducts } from '../../hooks/useProducts';
import { useWarehouseContext } from '../../context/WarehouseContext';
import { useSuppliers } from '../../hooks/useSuppliers';
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

const ReceiptScreen = () => {
  const { warehouseId } = useWarehouseContext();
  const {receipts, addReceipt, updateReceipt, deleteReceipt, filterReceipts } = useReceipts();
  const { products, replaceProducts } = useProducts([]);
  const { suppliers } = useSuppliers(warehouseId);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Receipt | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusOptions = ['all', 'in process' , 'pending' ,'approved' , 'rejected'];

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

  const handleSubmit = async (formData: ReceiptFormData) => {
    let ok = false;
    if (editingItem) {
      ok = await updateReceipt(editingItem.id, formData);
    } else {
      ok = await addReceipt(formData);
    }
    if (ok) {
      handleCloseModal();
    }
    return ok;
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null); 
    setShowAddModal(false);
  };

  const handleOpenEditModal = (rec: Receipt) => {
    setShowAddModal(true);
    setEditingItem(rec);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Goods Receipt Management</h1>
          <p className="text-gray-600 mt-1">Manage incoming goods receipt notes and quality checks</p>
        </div>
        <OpenModalButton label="Add Goods Receipt" onClick={handleOpenAddModal} />
      </div>
    
      <div className='grid grid-cols-2 gap-4'>
        <SearchBar 
            label="Search Receipt Note or Supplier..."
            onChange={(e: any) => setSearchTerm(e.target.value)} 
        />
        <FilterBar
            select={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
        >
        </FilterBar>
      </div>
          
      <div className="space-y-4">
        {filterReceipts(searchTerm, statusFilter).map((rec) => (
            <ReceiptNote
                receipt={rec}
                key={rec.id}
                onOpenEditModal={handleOpenEditModal}
                onDelete={deleteReceipt}
            />
            ))
        }
      </div>
          
      <ReceiptModal 
        isOpen={showAddModal} 
        onClose={handleCloseModal}
        initialData={editingItem}
        onSubmit={handleSubmit}
        products={products}
        suppliers={suppliers}
      />
    </div>
  );
}

export default ReceiptScreen;

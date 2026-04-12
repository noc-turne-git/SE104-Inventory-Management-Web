import { useState } from 'react';
import OpenModalButton from '../../components/common/button/ModalButton';
import SearchBar, {FilterBar} from '../../components/common/searchBar';
import { MOCK_RECEIPTS } from '../../data/MOCK_RECEIPTS';
import { type Receipt, type ReceiptFormData } from '../../types/note'; 
import ReceiptModal from '../../features/receipts/ReceiptModal';
import { useReceipts } from '../../hooks/useReceipts';
import { ReceiptNote } from '../../features/receipts/ReceiptNote';

const ReceiptScreen = () => {
  const {receipts, addReceipt, updateReceipt, deleteReceipt, filterReceipts } = useReceipts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Receipt | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const statusOptions = ['all', 'new' , 'in process' , 'pending' ,'approved' , 'rejected'];

  const handleSubmit = (formData: ReceiptFormData) => {
    if (editingItem) {
      updateReceipt(editingItem.id, formData);
    } else {
      addReceipt(formData);
    }
    handleCloseModal();
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
          <h1 className="text-4xl font-bold text-gray-900">Goods Receipt Management</h1>
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
            />
            ))
        }
      </div>
          
      <ReceiptModal 
        isOpen={showAddModal} 
        onClose={handleCloseModal}
        initialData={editingItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ReceiptScreen;
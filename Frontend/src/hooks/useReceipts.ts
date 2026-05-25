import { useAuth } from '../context/AuthContext';
import { useWarehouseContext } from '../context/WarehouseContext';
import { useNotes } from '../context/NoteContext';
import { type Receipt, type ReceiptFormData } from '../types/note';

export function useReceipts() {
  const { allNotes, addNote, updateNote, deleteNote, updateStatus, getReceipts } = useNotes();

  const receipts = getReceipts();
  const {user} = useAuth();
  const { warehouseId } = useWarehouseContext();

  const filterReceipts = (searchTerm: string, statusFilter: string) => {
    return receipts.filter((receipt) => {
      const matchesSearch =
        receipt.noteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const addReceipt = async (data: ReceiptFormData) => {
    const newReceipt: Receipt = {
      ...data,
      id: Date.now().toString(),
      type: 'RECEIPT',
      operator: user?.fullName || "",
      // Format: REC-YYYYMMDD-Random
      noteNumber: `REC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
      warehouseId: warehouseId ?? 0,
    };

    return addNote(newReceipt);
  };

  const updateReceipt = async (id: string, data: Partial<ReceiptFormData>) => {
    return updateNote(id, data);
  };

  const updateReceiptStatus = async (id: string, newStatus: Receipt['status']) => {
    return updateStatus(id, newStatus);
  }

  return {
    receipts,
    filterReceipts,
    addReceipt,
    updateReceipt,
    updateReceiptStatus,
    deleteReceipt: deleteNote, // Sử dụng trực tiếp hàm xóa của Context
  };
}

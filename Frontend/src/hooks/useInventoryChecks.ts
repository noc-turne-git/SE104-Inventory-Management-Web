import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NoteContext';
import { type InventoryCheck, type InventoryCheckFormData } from '../types/note';

export function useInventoryChecks() {
  const { addNote, updateNote, deleteNote, updateStatus, getInventoryChecks } = useNotes();
  const { user } = useAuth();

  const inventoryChecks = getInventoryChecks();

  const filterInventoryChecks = (searchTerm: string, statusFilter: string) => {
    const q = searchTerm.toLowerCase();
    return inventoryChecks.filter((note) => {
      const matchesSearch =
        note.noteNumber.toLowerCase().includes(q) ||
        note.operator.toLowerCase().includes(q) ||
        note.items.some((item) => item.product.toLowerCase().includes(q));
      const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const addInventoryCheck = async (data: InventoryCheckFormData) => {
    const newInventoryCheck: InventoryCheck = {
      ...data,
      id: Date.now().toString(),
      warehouseId: '',
      type: 'INVENTORY_CHECK',
      operator: user?.userName || '',
      noteNumber: `IC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
    };
    return addNote(newInventoryCheck);
  };

  const updateInventoryCheck = async (id: string, data: Partial<InventoryCheckFormData>) => {
    return updateNote(id, data);
  };

  const approveInventoryCheck = async (id: string) => {
    return updateStatus(id, 'approved');
  };

  const rejectInventoryCheck = async (id: string, reason?: string) => {
    return updateStatus(id, 'rejected', reason);
  };

  const removeInventoryCheck = async (id: string) => {
    return deleteNote(id);
  };

  return {
    inventoryChecks,
    filterInventoryChecks,
    addInventoryCheck,
    updateInventoryCheck,
    approveInventoryCheck,
    rejectInventoryCheck,
    deleteInventoryCheck: removeInventoryCheck,
  };
}


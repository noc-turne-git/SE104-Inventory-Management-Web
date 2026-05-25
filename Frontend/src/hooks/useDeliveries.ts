import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NoteContext';
import { type Delivery, type DeliveryFormData } from '../types/note';

export function useDeliveries() {
  const { allNotes, addNote, updateNote, deleteNote, updateStatus, getDeliveries} = useNotes();

  // Lấy danh sách phiếu giao hàng từ kho tổng
  const deliveries = getDeliveries();

  const {user} = useAuth();

  // Logic lọc dữ liệu
  const filterDeliveries = (searchTerm: string, statusFilter: string) => {
    return deliveries.filter((delivery) => {
      const matchesSearch =
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.destination.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const addDelivery = async (data: DeliveryFormData) => {
    const newDelivery: Delivery = {
      ...data,
      id: Date.now().toString(),
      operator: user?.fullName || "",
      type: 'DELIVERY',
      noteNumber: `DLV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
      warehouseId: '',
    };
    return addNote(newDelivery);
  };

  const updateDelivery = async (id: string, data: Partial<DeliveryFormData>) => {
    return updateNote(id, data);
  };

  const updateDeliveryStatus = async (id: string, newStatus: Delivery['status']) => {
    return updateStatus(id, newStatus);
  };

  return {
    deliveries,
    addDelivery,
    updateDelivery,
    updateDeliveryStatus,
    filterDeliveries,
    deleteDelivery: deleteNote,
  };
}

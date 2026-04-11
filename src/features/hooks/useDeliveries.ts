import { useNotes } from '../../context/NoteContext'; // Import hook từ Context
import { type Delivery, type DeliveryFormData } from '../../types/note';

export function useDeliveries() {
  const { allNotes, addNote, updateNote, deleteNote, updateStatus, getDeliveries} = useNotes();

  // Lấy danh sách phiếu giao hàng từ kho tổng
  const deliveries = getDeliveries();

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

  const addDelivery = (data: DeliveryFormData) => {
    const newDelivery: Delivery = {
      ...data,
      id: Date.now().toString(),
      type: 'DELIVERY',
      noteNumber: `DLV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
    };
    addNote(newDelivery); // Gọi hàm của Context
  };

  const updateDelivery = (id: string, data: Partial<DeliveryFormData>) => {
    updateNote(id, data); // Gọi hàm của Context
  };

  const updateDeliveryStatus = (id: string, newStatus: Delivery['status']) => {
    updateStatus(id, newStatus); // Gọi hàm của Context
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
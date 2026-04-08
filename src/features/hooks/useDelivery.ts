import { useState } from 'react';
import { type Delivery, type DeliveryFormData } from '../../types/delivery';
import { toast } from 'sonner';


export function useDeliveries(initialData: Delivery[]) {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialData);

  const filterDeliveries = (searchTerm: string, statusFilter: string) => {
    return deliveries.filter((delivery) => {
      const matchesSearch =
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.destination.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const addDelivery = (data: DeliveryFormData) => {
    const newDelivery: Delivery = {
      ...data,
      id: Date.now.toString(),
      // Nếu ID chưa có thì tạo ID tự động: DLV-YYYYMMDD-Random
      deliveryNumber: `DLV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
    };

    setDeliveries((prev) => [newDelivery, ...prev]);
    toast.success('Đã tạo đơn giao hàng mới');
  };

  const updateDelivery = (id: string, data: Partial<DeliveryFormData>) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...data } : d))
    );
    toast.success('Đã cập nhật đơn giao hàng');
  };

  const updateDeliveryStatus = (id: string, newStatus: Delivery['status']) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    
    const statusMessages = {
      approved: 'Đơn hàng đã được phê duyệt',
      rejected: 'Đơn hàng đã bị từ chối',
      pending: 'Đang chờ kiểm duyệt',
      'in process': 'Đang trong quá trình xử lý',
      new: 'Đơn hàng mới'
    };
    
    toast.info(statusMessages[newStatus]);
  };

  const deleteDelivery = (id: string) => {
    setDeliveries((prev) => prev.filter((d) => d.id !== id));
    toast.success('Đã xóa đơn giao hàng');
  };

  return {
    deliveries,
    addDelivery,
    updateDelivery,
    updateDeliveryStatus,
    filterDeliveries,
    deleteDelivery,
  };
}
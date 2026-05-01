import axiosClient from './axiosClient';
import { type Delivery, type Receipt, type InventoryCheck, type statusNote } from '../types/note';

export interface DeliveryUpsertPayload {
  destination: string;
  items: { productId: number; quantity: number }[];
}

export interface ReceiptUpsertPayload {
  supplierId: number;
  qualityCheckStatus?: string;
  items: { productId: number; ordered: number; received: number; defective: number }[];
}

export interface InventoryCheckUpsertPayload {
  items: { productId: number; stockQuantity: number; reason: string }[];
}

const warehouseNotesApi = {
  // Delivery notes
  getMyDeliveries(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/notes/delivery-notes/mine`;
    return axiosClient.get<Delivery[]>(url);
  },
  getAllDeliveries(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/notes/delivery-notes`;
    return axiosClient.get<Delivery[]>(url);
  },
  createDelivery(warehouseId: string | number, data: DeliveryUpsertPayload) {
    const url = `/warehouses/${warehouseId}/notes/delivery-notes`;
    return axiosClient.post<Delivery>(url, {
      destination: data.destination,
      deliveryStatus: 'PENDING',
      items: data.items,
    });
  },
  updateDelivery(warehouseId: string | number, noteId: string | number, data: DeliveryUpsertPayload) {
    const url = `/warehouses/${warehouseId}/notes/delivery-notes/${noteId}`;
    return axiosClient.put(url, {
      destination: data.destination,
      deliveryStatus: 'PENDING',
      items: data.items,
    });
  },

  // Goods receipts
  getMyReceipts(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/notes/goods-receipts/mine`;
    return axiosClient.get<Receipt[]>(url);
  },
  getAllReceipts(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/notes/goods-receipts`;
    return axiosClient.get<Receipt[]>(url);
  },
  createReceipt(warehouseId: string | number, data: ReceiptUpsertPayload) {
    const url = `/warehouses/${warehouseId}/notes/goods-receipts`;
    return axiosClient.post<Receipt>(url, {
      supplierId: data.supplierId,
      qualityCheckStatus: data.qualityCheckStatus ?? 'PENDING',
      items: data.items,
    });
  },
  updateReceipt(warehouseId: string | number, noteId: string | number, data: ReceiptUpsertPayload) {
    const url = `/warehouses/${warehouseId}/notes/goods-receipts/${noteId}`;
    return axiosClient.put(url, {
      supplierId: data.supplierId,
      qualityCheckStatus: data.qualityCheckStatus ?? 'PENDING',
      items: data.items,
    });
  },

  // Inventory checks
  getMyInventoryChecks(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/notes/inventory-checks/mine`;
    return axiosClient.get<InventoryCheck[]>(url);
  },
  getAllInventoryChecks(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/notes/inventory-checks`;
    return axiosClient.get<InventoryCheck[]>(url);
  },
  createInventoryCheck(warehouseId: string | number, data: InventoryCheckUpsertPayload) {
    const url = `/warehouses/${warehouseId}/notes/inventory-checks`;
    return axiosClient.post<InventoryCheck>(url, {
      items: data.items,
    });
  },
  updateInventoryCheck(warehouseId: string | number, noteId: string | number, data: InventoryCheckUpsertPayload) {
    const url = `/warehouses/${warehouseId}/notes/inventory-checks/${noteId}`;
    return axiosClient.put(url, {
      items: data.items,
    });
  },

  // Approve / Reject (manager)
  approve(warehouseId: string | number, noteId: string | number) {
    const url = `/warehouses/${warehouseId}/notes/${noteId}/approve`;
    return axiosClient.post(url);
  },
  reject(warehouseId: string | number, noteId: string | number, reason?: string) {
    const url = `/warehouses/${warehouseId}/notes/${noteId}/reject`;
    // backend currently ignores reason; keep for forward-compat
    return axiosClient.post(url, { reason });
  },

  // Quick status update helper (optional)
  updateStatusLocalOnly(_id: string, _status: statusNote) {
    // Frontend currently manages note status in context; API call handled by approve/reject endpoints.
  },
};

export default warehouseNotesApi;


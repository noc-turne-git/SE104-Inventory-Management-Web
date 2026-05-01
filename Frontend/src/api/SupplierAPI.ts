import axiosClient from './axiosClient';
import { type Supplier } from '../types/supplier';

type SupplierUpsertPayload = Omit<Supplier, 'id'>;

const supplierApi = {
  getAll(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/suppliers`;
    return axiosClient.get(url);
  },

  getById(warehouseId: string | number, supplierId: string | number) {
    const url = `/warehouses/${warehouseId}/suppliers/${supplierId}`;
    return axiosClient.get(url);
  },

  search(warehouseId: string | number, q?: string, limit: number = 20) {
    const url = `/warehouses/${warehouseId}/suppliers/search`;
    return axiosClient.get(url, { params: { q, limit } });
  },

  create(warehouseId: string | number, data: SupplierUpsertPayload) {
    const url = `/warehouses/${warehouseId}/suppliers`;
    return axiosClient.post(url, {
      name: data.name,
      contact: data.contact,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
  },

  update(warehouseId: string | number, supplierId: string | number, data: SupplierUpsertPayload) {
    const url = `/warehouses/${warehouseId}/suppliers/${supplierId}`;
    return axiosClient.put(url, {
      name: data.name,
      contact: data.contact,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
  },

  delete(warehouseId: string | number, supplierId: string | number) {
    const url = `/warehouses/${warehouseId}/suppliers/${supplierId}`;
    return axiosClient.delete(url);
  },
};

export default supplierApi;


import { type AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';
import { type SupplierApiResponse, type SupplierInput } from '../types/supplier';

const toSupplierPayload = (data: SupplierInput) => ({
  name: data.name,
  contact: data.contact,
  email: data.email,
  phone: data.phone,
  address: data.address,
});

const supplierApi = {
  getAll(warehouseId: number) {
    const url = `/warehouses/${warehouseId}/suppliers`;
    return axiosClient.get<SupplierApiResponse[]>(url);
  },

  getById(warehouseId: number, supplierId: number) {
    const url = `/warehouses/${warehouseId}/suppliers/${supplierId}`;
    return axiosClient.get<SupplierApiResponse>(url);
  },

  search(warehouseId: number, q?: string, limit = 20, config?: AxiosRequestConfig) {
    const url = `/warehouses/${warehouseId}/suppliers/search`;
    return axiosClient.get<SupplierApiResponse[]>(url, {
      ...config,
      params: {
        ...(config?.params ?? {}),
        ...(q ? { q } : {}),
        limit,
      },
    });
  },

  create(warehouseId: number, data: SupplierInput) {
    const url = `/warehouses/${warehouseId}/suppliers`;
    return axiosClient.post<SupplierApiResponse>(url, toSupplierPayload(data));
  },

  update(warehouseId: number, supplierId: number, data: SupplierInput) {
    const url = `/warehouses/${warehouseId}/suppliers/${supplierId}`;
    return axiosClient.put<void>(url, toSupplierPayload(data));
  },

  delete(warehouseId: number, supplierId: number) {
    const url = `/warehouses/${warehouseId}/suppliers/${supplierId}`;
    return axiosClient.delete<void>(url);
  },
};

export default supplierApi;

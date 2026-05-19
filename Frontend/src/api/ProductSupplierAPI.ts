import axiosClient from './axiosClient';
import { type ProductSupplier } from '../types/product';

export interface ProductSupplierApiResponse {
  productId?: number;
  supplierId?: number;
  product?: string | null;
  supplier?: string | null;
  type?: string | null;
  price?: number | null;
}

export interface ProductSupplierUpsertPayload {
  productId: number;
  supplierId: number;
  type: ProductSupplier['type'];
  price: number;
}

const productSupplierApi = {
  getAll(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/product-suppliers`;
    return axiosClient.get<ProductSupplierApiResponse[]>(url);
  },

  getByProductId(warehouseId: string | number, productId: string | number) {
    const url = `/warehouses/${warehouseId}/product-suppliers/by-product/${productId}`;
    return axiosClient.get<ProductSupplierApiResponse[]>(url);
  },

  getBySupplierId(warehouseId: string | number, supplierId: string | number) {
    const url = `/warehouses/${warehouseId}/product-suppliers/by-supplier/${supplierId}`;
    return axiosClient.get<ProductSupplierApiResponse[]>(url);
  },

  upsert(warehouseId: string | number, data: ProductSupplierUpsertPayload) {
    const url = `/warehouses/${warehouseId}/product-suppliers`;
    return axiosClient.post<ProductSupplierApiResponse>(url, data);
  },

  delete(warehouseId: string | number, productId: string | number, supplierId: string | number) {
    const url = `/warehouses/${warehouseId}/product-suppliers/${productId}/${supplierId}`;
    return axiosClient.delete<void>(url);
  },
};

export default productSupplierApi;


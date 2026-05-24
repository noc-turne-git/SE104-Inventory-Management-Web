import axiosClient from './axiosClient';
import { type Product } from '../types/product';

const toProductFormData = (data: Product, productId: number = 0) => {
  const form = new FormData();
  form.append('productId', String(productId));
  form.append('sku', data.sku ?? '');
  form.append('imageUrl', data.image ?? '');
  if (data.imageFile) form.append('imageFile', data.imageFile);
  form.append('name', data.name ?? '');
  form.append('category', data.category ?? '');''
  form.append('description', data.description ?? '');
  form.append('sellPrice', String(data.sellPrice ?? 0));
  form.append('stockQuantity', String(data.stockQuantity ?? 0));
  form.append('defectiveQuantity', String(data.defectiveQuantity ?? 0));
  form.append('damagedQuantity', String(data.damagedQuantity ?? 0));
  form.append('status', data.status ?? 'undefined');
  return form;
};

const productApi = {
  getAll(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/products`;
    return axiosClient.get(url);
  },
  
  getById(warehouseId: string | number, id: string | number) {
    const url = `/warehouses/${warehouseId}/products/${id}`;
    return axiosClient.get(url);
  },

  search(warehouseId: string | number, q?: string, limit: number = 20) {
    const url = `/warehouses/${warehouseId}/products/search`;
    return axiosClient.get(url, { params: { q, limit } });
  },

  create(warehouseId: string | number, data: Product) {
    const url = `/warehouses/${warehouseId}/products`;
    return axiosClient.post(url, toProductFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update(warehouseId: string | number, id: string | number, data: Product) {
    const url = `/warehouses/${warehouseId}/products/${id}`;
    return axiosClient.put(url, toProductFormData(data, Number(id)), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete(warehouseId: string | number, id: string | number) {
    const url = `/warehouses/${warehouseId}/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;

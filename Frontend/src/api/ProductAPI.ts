import axiosClient from './axiosClient';
import { type Product } from '../types/product';

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
    return axiosClient.post(url, {
      productId: 0,
      sku: data.sku,
      imageUrl: data.image ?? '',
      name: data.name,
      category: data.category,
      description: data.description,
      sellPrice: data.sellPrice,
      stockQuantity: data.stockQuantity ?? 0,
      defectiveQuantity: data.defectiveQuantity ?? 0,
      damagedQuantity: data.damagedQuantity ?? 0,
      status: data.status ?? 'undefined'
    });
  },
};

export default productApi;

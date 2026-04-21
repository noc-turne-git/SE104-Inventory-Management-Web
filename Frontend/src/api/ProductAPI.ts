import axiosClient from './axiosClient';
import { type Product } from '../types/product';

const productApi = {
  getAll(params: Product) {
    const url = '/products';
    return axiosClient.get(url, { params });
  },
  
  getById(id: string) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  create(data: Product) {
    const url = '/products';
    return axiosClient.post(url, data);
  }
};

export default productApi;
import axiosClient from './axiosClient';
import { type FormCreateWarehouse, type Warehouse } from '../types/warehouse';

const warehouseApi = {
  getAll() {
    const url = '/warehouses/mine';
    return axiosClient.get(url);
  },
  
  getById(id: string) {
    const url = `/warehouses/${id}`;
    return axiosClient.get(url);
  },

  create(data: FormCreateWarehouse) {
    const url = '/warehouse/create';
    return axiosClient.post(url, data);
  }
};

export default warehouseApi;
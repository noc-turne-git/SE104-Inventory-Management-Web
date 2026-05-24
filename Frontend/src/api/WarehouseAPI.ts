import axiosClient from './axiosClient';
import { type FormCreateWarehouse } from '../types/warehouse';

const toWarehouseFormData = (data: FormCreateWarehouse) => {
  const form = new FormData();
  form.append('name', data.name ?? '');
  form.append('location', data.location ?? '');
  form.append('urlimage', data.urlimage ?? '');
  if (data.imageFile) form.append('imageFile', data.imageFile);
  return form;
};

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
    return axiosClient.post(url, toWarehouseFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update(id: string | number, data: FormCreateWarehouse) {
    const url = `/warehouses/${id}`;
    return axiosClient.put(url, toWarehouseFormData(data), {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
};

export default warehouseApi;

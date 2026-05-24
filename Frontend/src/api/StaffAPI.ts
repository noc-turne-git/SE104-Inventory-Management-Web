import axiosClient from './axiosClient';
import { type Staff } from '../types/staff';

export interface StaffUpdatePayload {
  role?: Staff['role'];
  accountStatus?: Staff['accountStatus'];
  salary?: number;
  hireDate?: string;
}

export interface StaffCreatePayload extends StaffUpdatePayload {
  email: string;
}

const staffApi = {
  getAll(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/staff`;
    return axiosClient.get<Staff[]>(url);
  },

  getById(warehouseId: string | number, userId: string | number) {
    const url = `/warehouses/${warehouseId}/staff/${userId}`;
    return axiosClient.get<Staff>(url);
  },

  update(warehouseId: string | number, userId: string | number, data: StaffUpdatePayload) {
    const url = `/warehouses/${warehouseId}/staff/${userId}`;
    return axiosClient.put(url, {
      role: data.role,
      accountStatus: data.accountStatus,
      salary: data.salary,
      hireDate: data.hireDate || undefined,
    });
  },

  create(warehouseId: string | number, data: StaffCreatePayload) {
    const url = `/warehouses/${warehouseId}/staff`;
    return axiosClient.post<Staff>(url, {
      email: data.email,
      role: data.role,
      accountStatus: data.accountStatus,
      salary: data.salary,
      hireDate: data.hireDate || undefined,
    });
  },

  delete(warehouseId: string | number, userId: string | number) {
    const url = `/warehouses/${warehouseId}/staff/${userId}`;
    return axiosClient.delete<void>(url);
  },
};

export default staffApi;


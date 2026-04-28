import axiosClient from './axiosClient';
import { type Staff } from '../types/staff';

export interface StaffUpdatePayload {
  accountStatus?: Staff['accountStatus'];
  salary?: number;
  hireDate?: string;
  roleId?: number;
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
      accountStatus: data.accountStatus,
      salary: data.salary,
      hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
      roleId: data.roleId,
    });
  },
};

export default staffApi;


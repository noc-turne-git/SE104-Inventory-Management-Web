import axiosClient from './axiosClient';
import { type ManagerDashboardData } from '../types/dashboard/manager';
import { type StaffDashboardData } from '../types/dashboard/staff';

export type ManagerDashboardParams = {
  revenueYear?: number;
  topProductsYear?: number;
  topProductsMonth?: number;
};

const dashboardApi = {
  getManager(warehouseId: number, params?: ManagerDashboardParams) {
    const url = `/warehouses/${warehouseId}/dashboard/manager`;
    return axiosClient.get<ManagerDashboardData>(url, { params });
  },

  getStaff(warehouseId: number) {
    const url = `/warehouses/${warehouseId}/dashboard/staff`;
    return axiosClient.get<StaffDashboardData>(url);
  },
};

export default dashboardApi;

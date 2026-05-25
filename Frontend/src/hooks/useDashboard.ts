import { useCallback, useEffect, useMemo, useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import dashboardApi, { type ManagerDashboardParams } from '../api/DashboardAPI';
import { useWarehouseContext } from '../context/WarehouseContext';
import { type ManagerDashboardData } from '../types/dashboard/manager';
import { type StaffDashboardData } from '../types/dashboard/staff';

const emptyManager: ManagerDashboardData = {
  stats: [],
  lowStockItems: [],
  recentActivities: [],
  productCategories: [],
  revenueByYear: [],
  topProductsByYear: [],
};

const emptyStaff: StaffDashboardData = {
  stats: [],
  lowStockItems: [],
  inventoryTrend: [],
  weeklySchedule: [],
  infractions: [],
  recentActivities: [],
  noteEntries: [],
};

export const useDashboard = (managerParams?: ManagerDashboardParams) => {
  const { warehouseId, role } = useWarehouseContext();
  const [manager, setManager] = useState<ManagerDashboardData>(emptyManager);
  const [staff, setStaff] = useState<StaffDashboardData>(emptyStaff);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    if (!warehouseId || !role) {
      setManager(emptyManager);
      setStaff(emptyStaff);
      return;
    }

    setLoading(true);
    try {
      if (role === 'owner' || role === 'manager') {
        const res = await dashboardApi.getManager(warehouseId, managerParams);
        setManager(res.data);
        setStaff(emptyStaff);
      } else if (role === 'Staff') {
        const res = await dashboardApi.getStaff(warehouseId);
        setStaff(res.data);
        setManager(emptyManager);
      }
    } catch (err: unknown) { //unknown có thể là bất cứ gì, nhưng vẫn phải chạy đc đoạn code dưới vd err: number thì err.response --> lỗi
      if (!isAxiosError(err)) {
        toast.error('Failed to load dashboard data');
      } else {
        toast.error(err.response?.data?.message || 'Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  }, [warehouseId, role, managerParams?.revenueYear, managerParams?.topProductsYear, managerParams?.topProductsMonth]);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]); 
  // khi warehouseId, role thay đổi thì fetchDashboard cũng thay đổi theo
  // useCallback để Giữ nguyên function này, đừng tạo mới lung tung (chỉ thay đổi khi thay đổi warehouseId, role) 
  // => để khi render lại useEffect không bị loop vì function mới -> effect chạy lại -> setState -> render -> function mới

  return useMemo( //useMemo: “Giữ nguyên object cũ nếu data chưa đổi”
    () => ({
      manager,
      staff,
      loading,
      refetch: fetchDashboard,
    }),
    [manager, staff, loading, fetchDashboard],
  );
};

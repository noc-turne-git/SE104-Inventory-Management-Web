import { useMemo, useState } from 'react';
import StatsCards from '../../features/dashboard/StatsCards';
import LowStockAlert from '../../features/dashboard/LowStockAlert';
import ProductCategoryChart from '../../features/dashboard/manager/ProductCategoryChart';
import RecentActivities from '../../features/dashboard/manager/RecentActivities';
import RevenueChart from '../../features/dashboard/manager/RevenueChart';
import TopProducts from '../../features/dashboard/manager/TopProducts';
import { useDashboard } from '../../hooks/useDashboard';

const DashboardManagerScreen = () => {
  const now = new Date();
  const [revenueYear, setRevenueYear] = useState(now.getFullYear());
  const [topProductsYear, setTopProductsYear] = useState(now.getFullYear());
  const [topProductsMonth, setTopProductsMonth] = useState(now.getMonth() + 1);
  const managerParams = useMemo(
    () => ({ revenueYear, topProductsYear, topProductsMonth }),
    [revenueYear, topProductsYear, topProductsMonth],
  );
  const { manager } = useDashboard(managerParams);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back, Here's what's happening today.</p>
      </div>

      <StatsCards stats={manager.stats} />

      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-7">
          <RevenueChart
            revenueByYear={manager.revenueByYear}
            selectedYear={revenueYear}
            onYearChange={setRevenueYear}
          />
        </div>
        <div className="col-span-5">
          <ProductCategoryChart categories={manager.productCategories} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <TopProducts
          topProductsByYear={manager.topProductsByYear}
          selectedYear={topProductsYear}
          selectedMonth={topProductsMonth}
          onYearChange={setTopProductsYear}
          onMonthChange={setTopProductsMonth}
        />
        <LowStockAlert items={manager.lowStockItems} />
      </div>
      <RecentActivities activities={manager.recentActivities} />
    </div>
  );
};

export default DashboardManagerScreen;

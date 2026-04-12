import React from 'react';

import StatsCards from '../../features/dashboard/StatsCards';
import RevenueChart from '../../features/dashboard/manager/RevenueChart';
import ProductCategoryChart from '../../features/dashboard/manager/ProductCategoryChart'; // Tương tự tách như trên
import TopProducts from '../../features/dashboard/manager/TopProducts';
import LowStockAlert from '../../features/dashboard/LowStockAlert'; // Tương tự tách như trên
import RecentActivities from '../../features/dashboard/manager/RecentActivities'; // Tương tự tách như trên

const DashboardManagerScreen: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Here's what's happening today.</p>
      </div>

      <StatsCards role='manager'/>

      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="col-span-3">
          <RevenueChart />
        </div>
        <div className="col-span-2">
          <ProductCategoryChart />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <TopProducts />
        <LowStockAlert />
      </div>
      <RecentActivities />
    </div>
  );
};

export default DashboardManagerScreen;
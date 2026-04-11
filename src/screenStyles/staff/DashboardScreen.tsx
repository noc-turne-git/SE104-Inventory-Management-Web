import React from 'react';
import StatsCards from '../../features/dashboard/StatsCards';
import InventoryMovement from '../../features/dashboard/staff/InventoryMovement';
import WeeklySchedule from '../../features/dashboard/staff/WeeklySchedule';
import StaffLowStock from '../../features/dashboard/LowStockAlert';
import Infractions from '../../features/dashboard/staff/Infractions';
import StaffRecentActivities from '../../features/dashboard/staff/StaffRecentActivities';
import NoteTable from '../../features/dashboard/staff/NoteView';

const DashboardStaffScreen = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, stay updated with your work and warehouse status.</p>
      </div>

      <StatsCards role='staff' />

      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="col-span-3">
          <InventoryMovement />
        </div>
        <div className="col-span-2">
          <WeeklySchedule />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <StaffLowStock />
        <NoteTable/>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Infractions />
        <StaffRecentActivities />
      </div>
    </div>
  );
}

export default DashboardStaffScreen;
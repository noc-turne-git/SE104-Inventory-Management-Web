import StatsCards from '../../features/dashboard/StatsCards';
import LowStockAlert from '../../features/dashboard/LowStockAlert';
import Infractions from '../../features/dashboard/staff/Infractions';
import InventoryMovement from '../../features/dashboard/staff/InventoryMovement';
import NoteTable from '../../features/dashboard/staff/NoteView';
import StaffRecentActivities from '../../features/dashboard/staff/StaffRecentActivities';
import WeeklySchedule from '../../features/dashboard/staff/WeeklySchedule';
import { useDashboard } from '../../hooks/useDashboard';

const DashboardStaffScreen = () => {
  const { staff } = useDashboard();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back, stay updated with your work and warehouse status.</p>
      </div>

      <StatsCards stats={staff.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3">
          <InventoryMovement data={staff.inventoryTrend} />
        </div>
        <div className="lg:col-span-2">
          <WeeklySchedule schedules={staff.weeklySchedule} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <LowStockAlert items={staff.lowStockItems} />
        <NoteTable notes={staff.noteEntries} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Infractions infractions={staff.infractions} />
        <StaffRecentActivities activities={staff.recentActivities} />
      </div>
    </div>
  );
};

export default DashboardStaffScreen;

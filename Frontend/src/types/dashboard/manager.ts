export type MonthlyData = {
  month: string;
  revenue: number;
  profit: number;
};

export type YearlyRevenueData = {
  year: number;
  data: MonthlyData[];
};

export type ProductCategory = {
  name: string;
  value: number;
  color: string;
};

export type TopProductItem = {
  product: string;
  sales: number;
  revenue: number;
  trend: 'up' | 'down';
};

export type MonthlyTopProducts = {
  month: number;
  topProducts: TopProductItem[];
};

export type YearlyTopProducts = {
  year: number;
  months: MonthlyTopProducts[];
};

export type LowStockItem = {
  id: string | number;
  name: string;
  sku: string;
  current: number;
  status: 'critical' | 'warning';
};

export type ActivityType = 'employee' | 'supplier' | 'product' | 'infraction'; // hinn icon 
export type TargetType = 'normal' | 'note';

export type RecentActivity = {
  id: string | number;
  action: string;
  actor: 'You' | string;
  time: string;
  type: ActivityType;
  targetType?: TargetType;
  target?: 'You' | string;
};

export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  tone: 'blue' | 'green' | 'red' | 'purple';
  icon: 'package' | 'dollar' | 'alert' | 'note' | 'store' | 'activity' | 'users';
};

export type ManagerDashboardData = {
  stats: DashboardStat[];
  lowStockItems: LowStockItem[];
  recentActivities: RecentActivity[];
  productCategories: ProductCategory[];
  revenueByYear: YearlyRevenueData[];
  topProductsByYear: YearlyTopProducts[];
};

type MonthlyData = {
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

type TopProductItem = {
  //id: string;
  product: string;
  sales: number;
  revenue: number;
  trend: 'up' | 'down';
};

type MonthlyTopProducts = {
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
  current: number; // Số lượng tồn kho hiện tại
  status: 'critical' | 'warning';
};

type ActivityType = 'employee' | 'supplier' | 'product' | 'infraction' ;
type TargetType = 'normal' | 'note';
export type RecentActivity = {
  id: string | number;
  action: string;
  actor: 'You' | string;
  time: string;
  type: ActivityType;
  targetType?: TargetType;
  target?: 'You' | string; // (Tùy chọn) Đối tượng bị tác động (vế sản phẩm, nhà cung cấp nào)
};
export interface InventoryTrend {
  date: string;
  inbound: number;
  outbound: number;
  stock: number;
}

export type ActivityType = 'success' | 'warning' | 'info' | 'error';

export interface RecentActivity {
  id: number;
  action: string;
  item: string;
  time: string;
  type: ActivityType;
}

export interface Infraction {
  id: number;
  reason: string;
  date: string;
  moneyPenalty: string; // Sử dụng string vì có ký tự '$'
}

export interface WorkSchedule {
  date: string;
  position: string;
  time: string;
  shift: string;
  note: string;
}
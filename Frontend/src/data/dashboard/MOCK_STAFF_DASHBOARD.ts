import { type InventoryTrend, type RecentActivity, type Infraction, type WorkSchedule } from "../../types/dashboard/staff";

export const InventoryTrendData : InventoryTrend[] = [
    { date: '01/04', inbound: 145, outbound: 98, stock: 1247 },
    { date: '02/04', inbound: 132, outbound: 115, stock: 1264 },
    { date: '03/04', inbound: 178, outbound: 102, stock: 1340 },
    { date: '04/04', inbound: 156, outbound: 134, stock: 1362 },
    { date: '05/04', inbound: 189, outbound: 145, stock: 1406 },
    { date: '06/04', inbound: 167, outbound: 128, stock: 1445 },
    { date: '07/04', inbound: 201, outbound: 156, stock: 1490 },
  ];

   export const recentActivitiesData: RecentActivity[] = [

    { id: 1, action: 'Goods receipt completed', item: 'GR-2026-0412', time: '15 min ago', type: 'success' },

    { id: 2, action: 'Low stock alert', item: 'Product #247', time: '3 hours ago', type: 'warning' },

    { id: 3, action: 'Inventory updated', item: 'Zone C', time: '4 hours ago', type: 'info' },

  ];

  export const infractionsData: Infraction[] = [
    { id: 1, reason: 'Late for shift', date: '2026-04-05', moneyPenalty: '$10' },
    { id: 2, reason: 'Safety protocol violation', date: '2026-03-28', moneyPenalty: '$25' },
   
  ];

  export const weeklyScheduleData: WorkSchedule[] = [
    { date: 'Mon, Apr 13', position: 'Warehouse Keeper', time: '08:00 - 16:00', shift: 'Shift A', note: 'Inventory audit day' },
    { date: 'Tue, Apr 14', position: 'Warehouse Keeper', time: '08:00 - 16:00', shift: 'Shift A', note: '-' },
    { date: 'Sat, Apr 11', position: 'Quality Control', time: '16:00 - 00:00', shift: 'Shift B', note: 'New shipment arrival' },
    { date: 'Thu, Apr 16', position: 'Off', time: '-', shift: '-', note: 'Weekly rest' },
    { date: 'Fri, Apr 17', position: 'Warehouse Keeper', time: '08:00 - 16:00', shift: 'Shift A', note: '-' },
    
  ];
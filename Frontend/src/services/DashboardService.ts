import { type Product } from '../types/product';
import { type Delivery, type Receipt, type WarehouseNote } from '../types/note';
import { type Shift } from '../types/shift';
import { type Staff } from '../types/staff';

import {
  type DashboardStat,
  type LowStockItem,
  type ProductCategory,
  type RecentActivity,
  type TopProductItem,
  type YearlyRevenueData,
  type YearlyTopProducts,
} from '../types/dashboard/manager';

import {
  type Infraction,
  type InventoryTrend, 
  type NoteEntry,
  type RecentActivity as StaffRecentActivity,
  type WorkSchedule,
} from '../types/dashboard/staff';


const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899'];
const LOW_STOCK_LIMIT = 15;

const getDate = (value: string) => new Date(value.replace(' ', 'T'));

const formatCurrencyShort = (value: number) => {
  if (value >= 1_000_000_000) return `${Math.round(value / 1_000_000_000)}B`;
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return `${value}`;
};

const getProductByName = (products: Product[]) => {
  return new Map(products.map((product) => [product.name, product]));
};

const getApprovedDeliveries = (deliveries: Delivery[]) => {
  return deliveries.filter((delivery) => delivery.status === 'approved');
};

export const DashboardService = {
  getManagerStats: (products: Product[], notes: WarehouseNote[], deliveries: Delivery[]): DashboardStat[] => {
    const lowStockCount = DashboardService.getLowStockAlerts(products).length;
    const pendingNotes = notes.filter((note) => note.status === 'pending').length;
    const currentYear = new Date().getFullYear();
    const revenue = DashboardService.getYearlyFinancialStats(currentYear, deliveries, products);
    const monthlyRevenue = revenue.data.reduce((total, item) => total + item.revenue, 0);

    return [
      {
        title: 'Total Products',
        value: products.length.toString(),
        change: `${products.filter((product) => product.status === 'in stock').length} in stock`,
        icon: 'package',
        tone: 'blue',
      },
      {
        title: 'Year Revenue',
        value: formatCurrencyShort(monthlyRevenue),
        change: `From approved deliveries in ${currentYear}`,
        icon: 'dollar',
        tone: 'green',
      },
      {
        title: 'Low Stock',
        value: lowStockCount.toString(),
        change: `${products.length === 0 ? 0 : Math.round((lowStockCount / products.length) * 100)}% need restocking`,
        icon: 'alert',
        tone: 'red',
      },
      {
        title: 'Pending note',
        value: pendingNotes.toString(),
        change: `${notes.length} total notes`,
        icon: 'note',
        tone: 'purple',
      },
    ];
  },

  getStaffStats: (products: Product[], notes: WarehouseNote[], staff: Staff[]): DashboardStat[] => {
    const lowStockCount = DashboardService.getLowStockAlerts(products).length;
    const approvedNotes = notes.filter((note) => note.status === 'approved').length;
    const rejectedNotes = notes.filter((note) => note.status === 'rejected').length;
    const totalStock = products.reduce((total, product) => total + product.stockQuantity, 0);
    const activeStaff = staff.filter((person) => person.accountStatus === 'Active').length;

    return [
      {
        title: 'Total Stock Items',
        value: totalStock.toString(),
        change: `${products.length} product types`,
        icon: 'store',
        tone: 'blue',
      },
      {
        title: 'Approved Notes',
        value: approvedNotes.toString(),
        change: `${notes.length} total warehouse notes`,
        icon: 'activity',
        tone: 'green',
      },
      {
        title: 'Low Stock',
        value: lowStockCount.toString(),
        change: `${lowStockCount} items need restocking`,
        icon: 'alert',
        tone: 'red',
      },
      {
        title: 'Team Active',
        value: activeStaff.toString(),
        change: `${rejectedNotes} rejected notes to recheck`,
        icon: 'users',
        tone: 'purple',
      },
    ];
  },

  getLowStockAlerts: (products: Product[]): LowStockItem[] => {
    return products
      .filter((product) => product.stockQuantity <= LOW_STOCK_LIMIT || product.status === 'low stock' || product.status === 'out of stock')
      .map((product) => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        current: product.stockQuantity,
        status: (product.stockQuantity === 0 || product.status === 'out of stock' ? 'critical' : 'warning') as LowStockItem['status'],
      }))
      .sort((a, b) => a.current - b.current);
  },

  //Hiện 7 ngày gần nhất
  getRecentActivities: (notes: WarehouseNote[], shifts: Shift[], userName: string): RecentActivity[] => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const noteActivities: RecentActivity[] = notes
    .filter(
      (note) => 
        getDate(note.dateCreated).getTime() >= sevenDaysAgo.getTime()
    )
    .map((note) => {
      const actionMap = {
        RECEIPT: `Received goods from supplier: ${(note as Receipt).supplier}`,
        DELIVERY: `Dispatched delivery to: ${(note as Delivery).destination}`,
        INVENTORY_CHECK: 'Completed stock audit',
      };

      return {
        id: note.id,
        action: actionMap[note.type],
        //actor: note.operator || 'System',
        actor:
        note.operator === userName
          ? 'You'
          : note.operator || 'System' ,
        time: note.dateCreated,
        type: note.type === 'RECEIPT' ? 'supplier' : 'product',
        targetType: 'note',
        target: note.noteNumber,
      };
    });

    const shiftActivities: RecentActivity[] = shifts
     .filter(
      (shift) =>
          shift.status === 'urgent' &&
          getDate(shift.date).getTime() >= sevenDaysAgo.getTime()
      )
      .map((shift) => ({
        id: `shift-${shift.id}`,
        // action: `${shift.status === 'urgent' ? 'Urgent' : 'Unfilled'} shift for ${shift.position}`,
        action: `Urgent shift for ${shift.position}`,
        actor: 'System',
        time: shift.date,
        type: 'employee',
        targetType: 'normal',
        target: shift.shiftType,
      }));

    return [...noteActivities, ...shiftActivities].sort(
      (a, b) => getDate(b.time).getTime() - getDate(a.time).getTime()
    );
  },

  getCategoryDistribution: (products: Product[]): ProductCategory[] => {
    const categoryMap = products.reduce<Record<string, number>>((result, product) => {
      result[product.category] = (result[product.category] || 0) + 1;
      return result;
    }, {});

    return Object.entries(categoryMap).map(([name, value], index) => ({
      name,
      value,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
  },

  // Revenue Overview
  getYearlyFinancialStats: (year: number, deliveries: Delivery[], products: Product[]): YearlyRevenueData => {
    const productMap = getProductByName(products);
    const data = MONTH_NAMES.map((month) => ({ month, revenue: 0, profit: 0 }));

    getApprovedDeliveries(deliveries).forEach((delivery) => {
      const deliveryDate = getDate(delivery.dateCreated);
      if (deliveryDate.getFullYear() !== year) return;

      delivery.items.forEach((item) => {
        const product = productMap.get(item.product);
        if (!product) return;

        const revenue = product.sellPrice * item.quantity;
        data[deliveryDate.getMonth()].revenue += revenue;
        data[deliveryDate.getMonth()].profit += revenue * 0.25;
      });
    });

    return { year, data };
  },

  getYearlyFinancialStatsList: (deliveries: Delivery[], products: Product[]): YearlyRevenueData[] => {
    const years = new Set(getApprovedDeliveries(deliveries).map((delivery) => getDate(delivery.dateCreated).getFullYear()));
    years.add(new Date().getFullYear());

    return [...years].sort((a, b) => a - b).map((year) => DashboardService.getYearlyFinancialStats(year, deliveries, products));
  },

  getTopProducts: (deliveries: Delivery[], products: Product[]): YearlyTopProducts[] => {
    const productMap = getProductByName(products);
    const salesByMonth = new Map<string, Map<string, TopProductItem>>();

    getApprovedDeliveries(deliveries).forEach((delivery) => {
      const deliveryDate = getDate(delivery.dateCreated);
      const key = `${deliveryDate.getFullYear()}-${deliveryDate.getMonth() +   1}`;
      const productSales = salesByMonth.get(key) ?? new Map<string, TopProductItem>();

      delivery.items.forEach((item) => {
        const product = productMap.get(item.product);
        if (!product) return;

        const current = productSales.get(item.product) ?? {
          product: item.product,
          sales: 0,
          revenue: 0,
          trend: 'up',
        };

        current.sales += item.quantity;
        current.revenue += item.quantity * product.sellPrice;
        productSales.set(item.product, current);
      });

      salesByMonth.set(key, productSales);
    });

    const years = new Map<number, YearlyTopProducts>();

    salesByMonth.forEach((productSales, key) => {
      const [year, month] = key.split('-').map(Number);
      const previousSales = salesByMonth.get(`${year}-${month - 1}`);
      const topProducts = [...productSales.values()]
        .map((item) => ({
          ...item,
          trend: (item.sales >= (previousSales?.get(item.product)?.sales ?? 0) ? 'up' : 'down') as TopProductItem['trend'],
        }))
        .sort((a, b) => b.revenue - a.revenue);

      const yearData = years.get(year) ?? { year, months: [] };
      yearData.months.push({ month, topProducts });
      years.set(year, yearData);
    });

    return [...years.values()]
      .map((yearData) => ({
        ...yearData,
        months: yearData.months.sort((a, b) => a.month - b.month),
      }))
      .sort((a, b) => a.year - b.year);
  },

  getInventoryTrend: (notes: WarehouseNote[], products: Product[]): InventoryTrend[] => {
    const grouped = new Map<string, InventoryTrend>();
    const totalStock = products.reduce((total, product) => total + product.stockQuantity, 0);

    notes.forEach((note) => {
      const date = getDate(note.dateCreated);
      const key = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
      const current = grouped.get(key) ?? { date: key, inbound: 0, outbound: 0, stock: totalStock };

      if (note.type === 'RECEIPT') {
        current.inbound += note.items.reduce((total, item) => total + item.received, 0);
      }

      if (note.type === 'DELIVERY') {
        current.outbound += note.items.reduce((total, item) => total + item.quantity, 0);
      }

      if (note.type === 'INVENTORY_CHECK') {
        current.stock = note.items.reduce((total, item) => total + item.stockQuantity, 0);
      }

      grouped.set(key, current);
    });

    return [...grouped.values()].sort((a, b) => {
      const [dayA, monthA] = a.date.split('/').map(Number);
      const [dayB, monthB] = b.date.split('/').map(Number);
      return monthA === monthB ? dayA - dayB : monthA - monthB;
    });
  },

  getStaffRecentActivities: (notes: WarehouseNote[], userName: string): StaffRecentActivity[] => {
    return notes
    .filter((n) => n.operator === userName)
    .map((note, index) => ({
      id: index + 1,
      action: `${note.type.replace('_', ' ')} ${note.status}`,
      item: note.noteNumber,
      time: note.dateCreated,
      type: note.status === 'approved' ? 'success' : note.status === 'rejected' ? 'error' : note.status === 'pending' ? 'warning' : 'info',
    }));
  },

  getInfractions: (staff: Staff[], userName: string): Infraction[] => {
    const staffMember = staff.find((p) => p.name === userName);
    
    if (!staffMember || !staffMember.infractions) return [];

    return staffMember.infractions
      .map((infraction, index) => ({
          id: Number(`${infraction.id}${index}`),
          //reason: `${staffMember.name}: ${infraction.reason}`,
          reason: `${infraction.reason}`,
          date: infraction.datetime.slice(0, 10),
          moneyPenalty: `$${infraction.penalty}`,
        }));
  },

  getWeeklySchedule: (shifts: Shift[], userName: string): WorkSchedule[] => {
    const now = new Date();

    // Monday
    const startOfWeek = new Date(now);
    const day = now.getDay(); // 0 = Sunday
    const diff = day === 0 ? -6 : 1 - day;

    startOfWeek.setDate(now.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // Sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return shifts
    .filter((s) => {
      const shiftDate = new Date(s.date);
      
      return (
        s.assignedTo === userName &&
        shiftDate >= startOfWeek &&
        shiftDate <= endOfWeek
      );
    })
    .map((shift) => {
      //const date = getDate(shift.date);
      const date = new Date(shift.date);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(date);

      return {
        date: formattedDate,
        position: shift.position,
        time: `${shift.startTime} - ${shift.endTime}`,
        shift: shift.shiftType,
        note: shift.notes || '-',
      };
    });
  },

  getNoteEntries: (notes: WarehouseNote[], userName: string): NoteEntry[] => {
    return notes
    .filter((n) => n.operator === userName)
    .map((note) => ({
      id: note.id,
      noteNumber: note.noteNumber,
      type: note.type === 'INVENTORY_CHECK' ? 'Inventory Check' : note.type === 'DELIVERY' ? 'Delivery Note' : 'Good Receipts',
      createdDate: note.dateCreated,
      status: note.status === 'approved' ? 'COMPLETED' : note.status === 'rejected' ? 'REJECTED' : 'PENDING',
      reason: note.reason,
    }));
  },
};

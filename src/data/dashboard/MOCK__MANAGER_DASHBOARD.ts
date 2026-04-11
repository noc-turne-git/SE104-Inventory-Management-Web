import { type YearlyRevenueData, type LowStockItem, type ProductCategory, type YearlyTopProducts, type RecentActivity} from "../../types/dashboard/manager";

export const managerRevenueData: YearlyRevenueData[] = [
  {
    year: 2024,
    data: [
      { month: 'Jan', revenue: 45000, profit: 13000 },
      { month: 'Feb', revenue: 52000, profit: 17000 },
      { month: 'Mar', revenue: 48000, profit: 15000 },
      { month: 'Apr', revenue: 61000, profit: 23000 },
      { month: 'May', revenue: 55000, profit: 19000 },
      { month: 'Jun', revenue: 67000, profit: 27000 },
      { month: 'Jul', revenue: 72000, profit: 30000 },
      { month: 'Aug', revenue: 69000, profit: 28000 },
      { month: 'Sep', revenue: 58000, profit: 21000 },
      { month: 'Oct', revenue: 63000, profit: 24000 },
      { month: 'Nov', revenue: 75000, profit: 30000 },
      { month: 'Dec', revenue: 82000, profit: 34000 },
    ]
  },
  {
    year: 2025,
    data: [
      { month: 'Jan', revenue: 50000, profit: 16000 },
      { month: 'Feb', revenue: 58000, profit: 21000 },
      { month: 'Mar', revenue: 55000, profit: 19000 },
      { month: 'Apr', revenue: 65000, profit: 25000 },
      { month: 'May', revenue: 60000, profit: 22000 },
      { month: 'Jun', revenue: 70000, profit: 28000 },
      { month: 'Jul', revenue: 78000, profit: 32000 },
      { month: 'Aug', revenue: 75000, profit: 31000 },
      { month: 'Sep', revenue: 62000, profit: 23000 },
      { month: 'Oct', revenue: 68000, profit: 27000 },
      { month: 'Nov', revenue: 80000, profit: 32000 },
      { month: 'Dec', revenue: 95000, profit: 43000 },
    ]
  },
  {
    year: 2026,
    data: [
      { month: 'Jan', revenue: 55000, profit: 19000 },
      { month: 'Feb', revenue: 62000, profit: 23000 },
      { month: 'Mar', revenue: 59000, profit: 21000 },
    ]
  }
];

export const productCategoryData: ProductCategory[] = [
  { name: "T-Shirt", value: 120, color: "#3B82F6" },
  { name: "Hoodie", value: 45, color: "#8B5CF6" },
  { name: "Jacket", value: 12, color: "#EF4444" },
  { name: "Jeans", value: 60, color: "#10B981" },
  { name: "Shirt", value: 25, color: "#F59E0B" },
  { name: "Footwear", value: 30, color: "#EC4899" },
  { name: "Shorts", value: 15, color: "#06B6D4" },
  { name: "Accessories", value: 85, color: "#6366F1" }
];

export const topProductsData: YearlyTopProducts[] = [
  {
    year: 2024,
    months: [
      {
        month: 6, // Mùa hè năm 2024
        topProducts: [
          { product: "Basic White T-Shirt", sales: 120, revenue: 23880000, trend: 'up' },
          { product: "Summer Floral Shirt", sales: 80, revenue: 26320000, trend: 'up' },
          { product: "Slim Fit Jeans", sales: 45, revenue: 22455000, trend: 'down' },
          { product: "Beige Cargo Shorts", sales: 60, revenue: 16800000, trend: 'up' },
          { product: "Leather Baseball Cap", sales: 50, revenue: 7500000, trend: 'up' },
        ]
      },
      {
        month: 12, // Mùa đông năm 2024
        topProducts: [
          { product: "Leather Biker Jacket", sales: 70, revenue: 87500000, trend: 'up' },
          { product: "Black Hoodie", sales: 150, revenue: 59850000, trend: 'up' },
          { product: "Blue Denim Jacket", sales: 90, revenue: 53910000, trend: 'up' },
          { product: "Slim Fit Jeans", sales: 85, revenue: 42415000, trend: 'up' },
          { product: "Red Canvas Sneakers", sales: 40, revenue: 34000000, trend: 'down' },
        ]
      }
    ]
  },
  {
    year: 2025,
    months: [
      {
        month: 3, // Quý 1 - 2025
        topProducts: [
          { product: "Slim Fit Jeans", sales: 130, revenue: 64870000, trend: 'up' },
          { product: "Basic White T-Shirt", sales: 200, revenue: 39800000, trend: 'up' },
          { product: "Red Canvas Sneakers", sales: 45, revenue: 38250000, trend: 'up' },
          { product: "Striped Polo Shirt", sales: 75, revenue: 26250000, trend: 'down' },
          { product: "Leather Baseball Cap", sales: 120, revenue: 18000000, trend: 'up' },
        ]
      },
      {
        month: 8, // Quý 3 - 2025
        topProducts: [
          { product: "Summer Floral Shirt", sales: 190, revenue: 62510000, trend: 'up' },
          { product: "Basic White T-Shirt", sales: 250, revenue: 49750000, trend: 'up' },
          { product: "Beige Cargo Shorts", sales: 160, revenue: 44800000, trend: 'up' },
          { product: "Red Canvas Sneakers", sales: 50, revenue: 42500000, trend: 'up' },
          { product: "Striped Polo Shirt", sales: 110, revenue: 38500000, trend: 'down' },
        ]
      }
    ]
  },
  {
    year: 2026,
    months: [
      {
        month: 1,
        topProducts: [
          { product: "Red Canvas Sneakers", sales: 110, revenue: 93500000, trend: 'up' },
          { product: "Leather Biker Jacket", sales: 40, revenue: 50000000, trend: 'down' },
          { product: "Slim Fit Jeans", sales: 95, revenue: 47405000, trend: 'up' },
          { product: "Black Hoodie", sales: 100, revenue: 39900000, trend: 'down' },
          { product: "Basic White T-Shirt", sales: 140, revenue: 27860000, trend: 'up' },
        ]
      },
      {
        month: 4, // Tháng hiện tại
        topProducts: [
          { product: "Basic White T-Shirt", sales: 310, revenue: 61690000, trend: 'up' },
          { product: "Beige Cargo Shorts", sales: 180, revenue: 50400000, trend: 'up' },
          { product: "Summer Floral Shirt", sales: 145, revenue: 47705000, trend: 'up' },
          { product: "Striped Polo Shirt", sales: 120, revenue: 42000000, trend: 'up' },
          { product: "Red Canvas Sneakers", sales: 40, revenue: 34000000, trend: 'down' },
        ]
      }
    ]
  }
];


export const lowStockItemsData: LowStockItem[] = [
  { 
    id: "10", 
    name: "Leather Biker Jacket", 
    sku: 'JAC-010', 
    current: 3, 
    status: 'critical' 
  },
  { 
    id: "11", 
    name: "Leather Biker Jacket", 
    sku: 'JAC-010', 
    current: 3, 
    status: 'critical' 
  },
  { 
    id: "7", 
    name: "Beige Cargo Shorts", 
    sku: 'SRT-007', 
    current: 12, 
    status: 'warning' 
  },
  { 
    id: "5", 
    name: "Summer Floral Shirt", 
    sku: 'SHT-005', 
    current: 15, 
    status: 'warning' 
  },
  { 
    id: "2", 
    name: "Black Hoodie", 
    sku: 'HOD-002', 
    current: 5, 
    status: 'critical' 
  },
  { 
    id: "6", 
    name: "Red Canvas Sneakers", 
    sku: 'FW-006', 
    current: 8, 
    status: 'warning' 
  }
];

export const RecentActivitiesData: RecentActivity[] = [
  // --- PRODUCT RELATED ---
  { 
    id: 1, 
    action: 'New product added', 
    target: 'Summer Floral Shirt',
    actor: 'You', 
    time: '10 mins ago', 
    type: 'product',
  },
  { 
    id: 2, 
    action: 'Low stock alert', 
    target: 'Black Hoodie (5 left)',
    actor: 'System', 
    time: '1 hour ago', 
    type: 'product',
  },

  // --- EMPLOYEE RELATED ---
  { 
    id: 3, 
    action: 'New employee onboarded', 
    target: 'Nguyen Van A (Warehouse Keeper)',
    actor: 'You', 
    time: '3 hours ago', 
    type: 'employee',
  },
  { 
    id: 4, 
    action: 'Shift schedule changed', 
    target: 'Night Shift - Zone B',
    actor: 'Minh Quân', 
    time: '5 hours ago', 
    type: 'employee',
  },
  { 
    id: 5, 
    action: 'Employee drop out', 
    target: 'Tran Thi B',
    actor: 'Human Resources', 
    time: '1 day ago', 
    type: 'employee',
  },

  // --- SUPPLIER RELATED ---
  { 
    id: 6, 
    action: 'Bulk stock imported', 
    target: 'Supplier: Fashion Global',
    actor: 'Quốc An', 
    time: '2 days ago', 
    type: 'supplier',
  },

  // --- INFRACTION RELATED ---
  { 
    id: 7, 
    action: 'Safety protocol infraction', 
    target: 'Unsecured shelf in Zone C',
    actor: 'You', 
    time: '3 days ago', 
    type: 'infraction',
  }
];
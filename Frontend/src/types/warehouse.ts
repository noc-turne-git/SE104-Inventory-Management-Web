export const WarehouseStatus = {
  LOW_STOCK: "Low Stock",
  SHIFT_VACANCY: "Shift Vacancy",
  STABLE_OPERATIONS: "Stable Operations",
  DEFECTIVE_BATCH: "Defective Batch",
} as const;

export type WarehouseStatusType = typeof WarehouseStatus[keyof typeof WarehouseStatus];

export interface Warehouse {
  warehouseId: string;
  role?: "owner" | "manager" | "staff";
  name: string;
  address?: string;
  location?: string;
  lastUpdate: string;
  status: WarehouseStatusType;
  productCount: number | string;
  imageUrl?: string;
  urlimage?: string;
}

export interface Invitation {
  id: string;
  userId: string;
  ownerId: string;
  sendTime: string;
  warehouseId: number;
  warehouseName: string;
  address: string;
  requestedRole: "owner" | "manager" | "staff";
  imageUrl?: string;
}

export interface FormCreateWarehouse {
  name: string;
  location: string;
  urlimage?: string;
  imageFile?: File | null;
}

export const WarehouseStatus = {
  LOW_STOCK: "Low Stock",
  SHIFT_VACANCY: "Shift Vacancy",
  STABLE_OPERATIONS: "Stable Operations",
  DEFECTIVE_BATCH: "Defective Batch",
} as const;

export type WarehouseStatusType = typeof WarehouseStatus[keyof typeof WarehouseStatus];

export interface Warehouse {
  warehouseId: number;
  name: string;
  location: string;
  lastUpdate?: string;
  status: WarehouseStatusType;
  productCount?: number;
  imageUrl?: string;
  role: "manager" | "staff";
}
export interface FormCreateWarehouse {
  name: string;
  location: string; // fix viết nhầm l thành L
  imageUrl?: string;
}

export interface Invitation {
  id: string;
  sendTime?: string;
  ownerId: string;
  warehouseId: number;
  warehouseName: string;
  Role: "manager" | "staff";
  imageUrl?: string;
}

export interface InvitationForm {
  InvitationId:string
}

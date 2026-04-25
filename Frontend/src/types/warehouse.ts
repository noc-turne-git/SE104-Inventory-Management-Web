export const WarehouseStatus = {
  LOW_STOCK: "Low Stock",
  SHIFT_VACANCY: "Shift Vacancy",
  STABLE_OPERATIONS: "Stable Operations",
  DEFECTIVE_BATCH: "Defective Batch",
} as const;

export type WarehouseStatusType = typeof WarehouseStatus[keyof typeof WarehouseStatus];

export interface Warehouse {
  warehouseId: string;
  name: string;
  location: string;
  lastUpdate?: string;
  status: WarehouseStatusType;
  productCount?: number;
  imageUrl?: string;
}
export interface FormCreateWarehouse {
  name: string;
  Location: string;
  imageUrl?: string;
}

export interface Invitation {
  id: string;
  sendTime?: string;
  ownerId: string;
  warehouseId: string;
  warehouseName: string;
  Role: "manager" | "staff";
  imageUrl?: string;
}

export interface InvitationForm {
  InvitationId:string
}
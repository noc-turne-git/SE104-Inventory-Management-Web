export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
}

export type SupplierInput = Omit<Supplier, "id">;

export interface SupplierApiResponse {
  id?: number;
  supplierId?: number;
  warehouseId?: number;
  name?: string | null;
  contact?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}

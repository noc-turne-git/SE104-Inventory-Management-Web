// --- Base Interface cho các thuộc tính dùng chung ---

//dùng interface thì ko đc
export type statusNote = 'new' | 'in process' | 'pending' | 'approved' | 'rejected';

interface BaseNote {
  id: string;
  noteNumber: string;
  dateCreated: string;
  status: statusNote;
  reason? : string; //khi status=rejected
  operator : string;
}

// 1. Delivery Note
export interface Delivery extends BaseNote {
  type: 'DELIVERY';
  destination: string;
  items: { product: string; quantity: number }[];
}

// 2. Inventory Check
export interface InventoryCheck extends BaseNote {
  type: 'INVENTORY_CHECK';
  items: { product: string; stockQuantity: number; reason: string }[];
}

// 3. Receipt
export interface Receipt extends BaseNote {
  type: 'RECEIPT';
  supplier: string;
  items: { product: string; ordered: number; received: number; defective: number }[];
}

// --- Union Type: Đây là chìa khóa để dùng chung trong Component ---
export type WarehouseNote = Delivery | InventoryCheck | Receipt;



//Form Data
export type InventoryCheckFormData = Omit<InventoryCheck, 'id' | 'noteNumber' | 'operator' | 'type'> & {
    
}

export type ReceiptFormData = Omit<Receipt, 'id' | 'noteNumber' | 'operator' | 'type'> & {

};

export type DeliveryFormData = Omit<Delivery, 'id' | 'noteNumber' | 'operator' | 'type'> & {

}
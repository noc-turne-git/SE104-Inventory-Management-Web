export interface InventoryCheck {
    id : string;
    inventoryCheckNumber: string; // IC-YYYYMMDD-001
    dateCreated: string;
    status: 'new' | 'in process' | 'pending' | 'approved' | 'rejected';
    items: {
        stockQuantity: number;
        product: string;
        reason: string;
    }[];
    checker: string,
};

export type InventoryCheckFormData = Omit<InventoryCheck, 'id' | 'inventoryCheckNumber' | 'checker'> & {
    
}
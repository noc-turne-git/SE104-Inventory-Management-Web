export interface Receipt {
  id: string;
  receiptNumber: string; // YYYYMMDD
  dateCreated: string;
  supplier: string;
  items: 
  { 
    product: string;
    ordered: number; 
    received: number; // received là số hàng nhập được bao gồm cả defective
    defective: number; 
   }[];
  status: 'new' | 'in process' | 'pending' | 'approved' | 'rejected';
  inspector: string; 
  //totalItems: number;
};

export type ReceiptFormData = Omit<Receipt, 'id' | 'receiptNumber'> & {

};
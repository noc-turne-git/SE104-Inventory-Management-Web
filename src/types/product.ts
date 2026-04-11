export interface Product {
  id: string;
  image?: string;
  name: string;
  sku: string;
  category: string;
  description: string;  
  sellPrice: number;
  stockQuantity: number;
  defectiveQuantity: number;
  damagedQuantity: number;
  status: 'in stock' | 'low stock' | 'out of stock' | 'undefined';
}

export type ProductFormData = Omit<Product, 'id' | 'status' | 'sellPrice' | 'stockQuantity' | 'defectiveQuantity' | 'damagedQuantity' > & {
  sellPrice: string;
  //stock: string;
};

export interface ProductSupplier {
  supplier: string;
  product: string;
  type: "PRIMARY" | "SECONDARY";
  price : number;
}
export interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  status: 'in stock' | 'low stock' | 'out of stock' | 'undefined';
}

export type ProductFormData = Omit<Product, 'id' | 'status' | 'price' | 'stock' > & {
  price: string;
  stock: string;
};
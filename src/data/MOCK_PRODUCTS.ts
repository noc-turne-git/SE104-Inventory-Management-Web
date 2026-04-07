import { type Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    name: "Basic White T-Shirt",
    sku: 'TSH-001',
    category: "T-Shirt",
    description: "Basic white cotton t-shirt, breathable and easy to style.",
    sellPrice: 199000,
    stockQuantity: 120,
    defectiveQuantity: 2,
    damagedQuantity: 1,
    status: "in stock"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    name: "Black Hoodie",
    sku: 'HOD-002',
    category: "Hoodie",
    description: "Streetwear style black hoodie, provides excellent warmth.",
    sellPrice: 399000,
    stockQuantity: 45,
    defectiveQuantity: 0,
    damagedQuantity: 0,
    status: "low stock"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    name: "Blue Denim Jacket",
    sku: 'JAC-003',
    category: "Jacket",
    description: "Classic blue denim jacket, suitable for various styles.",
    sellPrice: 599000,
    stockQuantity: 0,
    defectiveQuantity: 0,
    damagedQuantity: 0,
    status: "out of stock"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
    name: "Slim Fit Jeans",
    sku: 'JNS-004',
    category: "Jeans",
    description: "Slim fit jeans with light stretch and a modern silhouette.",
    sellPrice: 499000,
    stockQuantity: 60,
    defectiveQuantity: 5,
    damagedQuantity: 2,
    status: "in stock"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    name: "Summer Floral Shirt",
    sku: 'SHT-005',
    category: "Shirt",
    description: "Floral pattern button-down shirt with a summer vibe.",
    sellPrice: 329000,
    stockQuantity: 25,
    defectiveQuantity: 1,
    damagedQuantity: 0,
    status: "low stock"
  }
];
import { type Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    name: "Basic White T-Shirt",
    sku: '001',
    category: "T-Shirt",
    description: "Áo thun trắng basic cotton thoáng mát, dễ phối đồ.",
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
     sku: '001',
    category: "Hoodie",
    description: "Áo hoodie đen phong cách streetwear, giữ ấm tốt.",
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
    sku: '001',
    category: "Jacket",
    description: "Áo khoác denim xanh cổ điển, phù hợp nhiều phong cách.",
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
    sku: '001',
    category: "Jeans",
    description: "Quần jeans slim fit co giãn nhẹ, form ôm hiện đại.",
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
    sku: '001',
    category: "Shirt",
    description: "Áo sơ mi họa tiết hoa phong cách mùa hè.",
    sellPrice: 329000,
    stockQuantity: 25,
    defectiveQuantity: 1,
    damagedQuantity: 0,
    status: "low stock"
  }
];
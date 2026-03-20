import { type Product } from '../types/product';
export const sampleProducts: Product[] = [
  {
    id: "1",
    image: "",
    //image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    name: "Basic White T-Shirt",
    category: "T-Shirt",
    sku: "TS-001",
    description: "Áo thun trắng basic cotton thoáng mát, dễ phối đồ.",
    price: 199000,
    stock: 120,
    status: "in stock"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    name: "Black Hoodie",
    category: "Hoodie",
    sku: "HD-002",
    description: "Áo hoodie đen phong cách streetwear, giữ ấm tốt.",
    price: 399000,
    stock: 45,
    status: "low stock"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    name: "Blue Denim Jacket",
    category: "Jacket",
    sku: "JK-003",
    description: "Áo khoác denim xanh cổ điển, phù hợp nhiều phong cách.",
    price: 599000,
    stock: 0,
    status: "out of stock"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
    name: "Slim Fit Jeans",
    category: "Jeans",
    sku: "JN-004",
    description: "Quần jeans slim fit co giãn nhẹ, form ôm hiện đại.",
    price: 499000,
    stock: 60,
    status: "in stock"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    name: "Summer Floral Shirt",
    category: "Shirt",
    sku: "SH-005",
    description: "Áo sơ mi họa tiết hoa phong cách mùa hè.",
    price: 329000,
    stock: 25,
    status: "low stock"
  }
];
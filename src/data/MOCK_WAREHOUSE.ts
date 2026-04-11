import type { Warehouse, Invitation } from "../types/warehouse";
import { WarehouseStatus } from "../types/warehouse";


export const MOCK_WAREHOUSES: Warehouse[] = [
  {
    warehouseId: "wh-1",
    name: "Chicago Central Hub",
    address: "Chicago, IL",
    lastUpdate: "2h ago",
    status: WarehouseStatus.STABLE_OPERATIONS,
    productCount: 12450,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX3nPHNBY0pfSM-ABBLy1jJQz2lhUfCRSSy0LUIZHmq8ewuFMY43oFaMQ8yoaui934MJ2tLqCgQC5UvT5uDVGQ9N9yQZsgzOorhK-m2QpO-1EEJG5uAQ5-A57D370R8qSExKS8_u5Yq4EBIQdrNPge_YkmjKwlHSNVNX3OVDMpA6NWoiKI2wDm2SA9ljOQqW7Wj0RsCcc_Ff3nLA42vcQJxWaUQELhlEoELqetusYlHEqEjFpbEaPPOgNWGxYVirdpQP3IzAe_tm4",
  },
  {
    warehouseId: "wh-2",
    name: "Berlin Logistics Center",
    address: "Berlin, Germany",
    lastUpdate: "1d ago",
    status: WarehouseStatus.STABLE_OPERATIONS,
    productCount: 8902,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrhL6s3JyN0IlDZMDVsvv87rn6Gvc6065ROZQ_2LgM89LPvZtIFQElbV4kmgg9rX6IwggWqi6_MaYRRov2Kx2nrHFuUZVaaIUbJHw5EVv_KjGEFwXjfIFSq6lGLDH6ndJwlNOV0A-KhRypjY1XyiS3WSbGdD59U5ca5A7CxXZvobbSbr0CftPW7ySyZrBZiMYchZUV3g7Zby5zvHx5cPtDyvH4gRfbO14LJltt-spIleJaYnYu83oDe2vkpIRFC1CqXDzMNgNgrdY",
  },
];

export const MOCK_INVITATIONS: Invitation[] = [
  {
    id: "inv-1",
    userId: "Justin",
    ownerId: "Logistics Corp",
    sendTime: "2 days ago",
    warehouseId: "wh-3",
    warehouseName: "North Port Distribution",
    address: "North Port, FL",
    requestedRole: "manager",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD_D5DzcRzPq0kpEohioC_w30CaNwRZdyvtJ37XB2qHlg2lsh-riCWPKjNLQC27oCga4iiyrBBu1hU-NHR7d3WbWBdE1o2ygMpLwoBzBi48cM4c1z-omXVGZTS7BTQoXP2jsMUnLvIzdZLyWd0X12glNPUbHNXRRjyYetsvQwZU6c0965mtOFKI3R3hMNJvzHbjEo4bgheJd-hYOgsJ3S4oxhLiJr0Jmb4xGmH7MdmdGcOhJg0gsQKzbD8fKMYI6wJaU2ARjN35l0",
  },
  {
    id: "inv-2",
    userId: "Justin",
    ownerId: "Apex Retail",
    sendTime: "5 hours ago",
    warehouseId: "wh-4",
    warehouseName: "South Metro Hub",
    address: "South Metro, GA",
    requestedRole: "staff",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZbKKCrrTyPHXS6kWpefdhtPCnWPiYhbaTc2QMskgHMK1RQNVh0IfQMzw_uiysGF0luulxrD40PYWG4_VZ6HI7iZ92FpiahM5G0GShQh9aYWZK7_yg621Ur9jrfTO6U-_6cPAHbKifxWsQB64xVwnjxD0Z-wB-7Q1wdG4-yjDKUeaQwcrcOJkt6B9oPTtFZV4XJLc4-TdrZ5i1rTtJh6Y62VJjB_Z1zjhkbGEMY0RSCiuRAOeV_Q5nbdffjD7JiZc0vMyzZjvH0V4",
  },
];
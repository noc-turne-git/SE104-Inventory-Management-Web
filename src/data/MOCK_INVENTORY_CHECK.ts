import { type InventoryCheck } from "../types/inventory_check";

export const MOCK_INVENTORY_CHECKS: InventoryCheck[] = [
  {
    id: "1",
    inventoryCheckNumber: "IC-20260401-001",
    dateCreated: "2026-04-01 09:00",
    status: "approved",
    items: [
      {
        product: "Basic White T-Shirt",
        stockQuantity: 120,
        reason: "Monthly routine stock take"
      },
      {
        product: "Slim Fit Jeans",
        stockQuantity: 60,
        reason: "Stock discrepancy after delivery"
      }
    ],
    checker: "Robert Wilson"
  },
  {
    id: "2",
    inventoryCheckNumber: "IC-20260402-002",
    dateCreated: "2026-04-02 10:30",
    status: "in process",
    items: [
      {
        product: "Black Hoodie",
        stockQuantity: 45,
        reason: "Damage report follow-up"
      }
    ],
    checker: "Jessica Lee"
  },
  {
    id: "3",
    inventoryCheckNumber: "IC-20260403-003",
    dateCreated: "2026-04-03 13:15",
    status: "pending",
    items: [
      {
        product: "Summer Floral Shirt",
        stockQuantity: 25,
        reason: "Warehouse shelf reorganization"
      },
      {
        product: "Blue Denim Jacket",
        stockQuantity: 0,
        reason: "Confirming out of stock status"
      }
    ],
    checker: "Thomas Anderson"
  },
  {
    id: "4",
    inventoryCheckNumber: "IC-20260404-004",
    dateCreated: "2026-04-04 08:45",
    status: "new",
    items: [
      {
        product: "Slim Fit Jeans",
        stockQuantity: 58,
        reason: "End of week cycle count"
      }
    ],
    checker: "Amanda Collins"
  },
  {
    id: "5",
    inventoryCheckNumber: "IC-20260405-005",
    dateCreated: "2026-04-05 15:50",
    status: "rejected",
    items: [
      {
        product: "Basic White T-Shirt",
        stockQuantity: 115,
        reason: "Incomplete count submitted"
      }
    ],
    checker: "Christopher Moore"
  }
];
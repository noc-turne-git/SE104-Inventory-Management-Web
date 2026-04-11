import { type InventoryCheck } from "../types/note";

export const MOCK_INVENTORY_CHECKS: InventoryCheck[] = [
  {
    id: "1",
    noteNumber: "IC-20260401-001", 
    type: 'INVENTORY_CHECK',
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
    operator: "Robert Wilson"
  },
  {
    id: "2",
    noteNumber: "IC-20260402-002",
    type: 'INVENTORY_CHECK',
    dateCreated: "2026-04-02 10:30",
    status: "in process",
    items: [
      {
        product: "Black Hoodie",
        stockQuantity: 45,
        reason: "Damage report follow-up"
      }
    ],
    operator: "Jessica Lee"
  },
  {
    id: "3",
    noteNumber: "IC-20260403-003",
    type: 'INVENTORY_CHECK',
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
    operator: "Thomas Anderson"
  },
  {
    id: "4",
    noteNumber: "IC-20260404-004",
    type: 'INVENTORY_CHECK',
    dateCreated: "2026-04-04 08:45",
    status: "new",
    items: [
      {
        product: "Slim Fit Jeans",
        stockQuantity: 58,
        reason: "End of week cycle count"
      }
    ],
    operator: "Amanda Collins"
  },
  {
    id: "5",
    noteNumber: "IC-20260405-005",
    type: 'INVENTORY_CHECK',
    dateCreated: "2026-04-05 15:50",
    status: "rejected",
    items: [
      {
        product: "Basic White T-Shirt",
        stockQuantity: 115,
        reason: "Incomplete count submitted"
      }
    ],
    operator: "Christopher Moore"
  }
];
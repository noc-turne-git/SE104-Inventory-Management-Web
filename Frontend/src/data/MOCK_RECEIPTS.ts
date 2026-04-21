import { type Receipt } from '../types/note';

export const MOCK_RECEIPTS: Receipt[] = [
  {
    id: "rec-001",
    noteNumber: "GR-20260310-001",
    type: 'RECEIPT',
    dateCreated: "2026-03-10",
    supplier: "ABC Electronics Corp",
    items: [
      { product: "Dell XPS 15 Laptop", ordered: 50, received: 48, defective: 2 },
      { product: "Samsung 27\" Monitor", ordered: 30, received: 30, defective: 0 }
    ],
    status: "approved",
    operator: "Sarah Keeper"
  },
  {
    id: "rec-002",
    noteNumber: "GR-20260312-001",
    type: 'RECEIPT',
    dateCreated: "2026-03-12",
    supplier: "Fashion Guru Wholesale",
    items: [
      { product: "Basic White T-Shirt", ordered: 200, received: 195, defective: 5 },
      { product: "Slim Fit Jeans", ordered: 100, received: 98, defective: 2 }
    ],
    status: "in process",
    operator: "John Wick"
  },
  {
    id: "rec-003",
    noteNumber: "GR-20260315-001",
    type: 'RECEIPT',
    dateCreated: "2026-03-15",
    supplier: "Global Logistics Ltd",
    items: [
      { product: "Wireless Mouse", ordered: 150, received: 150, defective: 0 },
      { product: "Mechanical Keyboard", ordered: 80, received: 75, defective: 3 }
    ],
    status: "pending",
    operator: "Elena Fisher"
  },
  {
    id: "rec-004",
    noteNumber: "GR-20260315-002",
    type: 'RECEIPT',
    dateCreated: "2026-03-15",
    supplier: "Tech Gear Solutions",
    items: [
      { product: "USB-C Hub", ordered: 300, received: 290, defective: 10 }
    ],
    status: "new",
    operator: "Michael Scott"
  },
  {
    id: "rec-005",
    noteNumber: "GR-20260320-001",
    type: 'RECEIPT',
    dateCreated: "2026-03-20",
    supplier: "Premium Fabric Inc",
    items: [
      { product: "Silk Scarf", ordered: 50, received: 45, defective: 5 },
      { product: "Cotton Tote Bag", ordered: 500, received: 500, defective: 12 }
    ],
    status: "rejected",
    operator: "Sarah Keeper"
  }
];
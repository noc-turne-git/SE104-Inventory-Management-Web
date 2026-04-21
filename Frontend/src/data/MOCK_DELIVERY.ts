import { type Delivery } from "../types/note";

export const MOCK_DELIVERY: Delivery[] = [
  {
    id: "del-001",
    noteNumber: "DN-20260315-001",
    type: 'DELIVERY',
    dateCreated: "2026-03-15 08:30",
    status: "approved",
    destination: "123 Le Loi St, District 1, Ho Chi Minh City",
    items: [
      { product: "Basic White T-Shirt", quantity: 5 },
      { product: "Slim Fit Jeans", quantity: 2 }
    ],
    operator: "John Smith"
  },
  {
    id: "del-2",
    noteNumber: "DN-20260315-002",
    type: 'DELIVERY',
    dateCreated: "2026-03-15 10:15",
    status: "in process",
    destination: "456 Tran Hung Dao St, Da Nang City",
    items: [
      { product: "Black Hoodie", quantity: 10 }
    ],
    operator: "Sarah Jenkins"
  },
  {
    id: "del-3",
    noteNumber: "DN-20260315-003",
    type: 'DELIVERY',
    dateCreated: "2026-03-15 14:00",
    status: "pending",
    destination: "789 Lang St, Dong Da District, Hanoi",
    items: [
      { product: "Summer Floral Shirt", quantity: 3 },
      { product: "Basic White T-Shirt", quantity: 2 }
    ],
    operator: "Michael Brown"
  },
  {
    id: "del-4",
    noteNumber: "DN-20260315-004",
    type: 'DELIVERY',
    dateCreated: "2026-03-15 09:45",
    status: "new",
    destination: "101 Mai Chi Tho St, Thu Duc City",
    items: [
      { product: "Black Hoodie", quantity: 1 }
    ],
    operator: "David Miller"
  },
  {
    id: "del-5",
    noteNumber: "DN-20260315-005",
    type: 'DELIVERY',
    dateCreated: "2026-03-15 16:20",
    status: "rejected",
    destination: "52 Phan Chu Trinh St, Hue City",
    items: [
      { product: "Slim Fit Jeans", quantity: 4 },
      { product: "Summer Floral Shirt", quantity: 2 }
    ],
    operator: "Emily Davis"
  }
];
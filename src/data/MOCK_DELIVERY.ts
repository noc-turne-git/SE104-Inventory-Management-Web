import { type Delivery } from "../types/delivery";

export const MOCK_DELIVERY: Delivery[] = [
  {
    id: "1",
    deliveryNumber: "DN-20240320-001",
    dateCreated: new Date("2024-03-20T08:30:00"),
    status: 'approved',
    destination: "123 Le Loi St, District 1, HCMC",
    items: [
      { product: "Basic White T-Shirt", quantity: 5 },
      { product: "Slim Fit Jeans", quantity: 2 }
    ],
    picker: "Nguyễn Văn A"
  },
  {
    id: "2",
    deliveryNumber: "DN-20240321-002",
    dateCreated: new Date("2024-03-21T10:15:00"),
    status: 'in process',
    destination: "456 Tran Hung Dao St, Da Nang",
    items: [
      { product: "Black Hoodie", quantity: 10 }
    ],
    picker: "Trần Thị B"
  },
  {
    id: "3",
    deliveryNumber: "DN-20240322-003",
    dateCreated: new Date("2024-03-22T14:00:00"),
    status: 'pending',
    destination: "789 Lang St, Dong Da, Hanoi",
    items: [
      { product: "Summer Floral Shirt", quantity: 3 },
      { product: "Basic White T-Shirt", quantity: 2 }
    ],
    picker: "Lê Văn C"
  },
  {
    id: "4",
    deliveryNumber: "DN-20240323-004",
    dateCreated: new Date("2024-03-23T09:45:00"),
    status: 'new',
    destination: "101 Mai Chi Tho, Thu Duc City",
    items: [
      { product: "Black Hoodie", quantity: 1 }
    ],
    picker: "Phạm Minh D"
  },
  {
    id: "5",
    deliveryNumber: "DN-20240323-005",
    dateCreated: new Date("2024-03-23T16:20:00"),
    status: 'rejected',
    destination: "52 Phan Chu Trinh St, Hue",
    items: [
      { product: "Slim Fit Jeans", quantity: 4 },
      { product: "Summer Floral Shirt", quantity: 2 }
    ],
    picker: "Hoàng Thị E"
  }
];
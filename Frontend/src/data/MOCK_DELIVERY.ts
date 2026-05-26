import { type Delivery } from "../types/note";

export const MOCK_DELIVERY: Delivery[] = [
  // --- NĂM 2024 (Đủ từ tháng 1 đến tháng 12) ---
  {
    id: "del-24-01",
    noteNumber: "DN-20240115-001",
    type: 'DELIVERY',
    dateCreated: "2024-01-15 08:30",
    status: "approved",
    destination: "Quận 1, TP.HCM",
    items: [{ product: "Basic White T-Shirt", quantity: 10 }],
    operator: "John Smith"
  },
  {
    id: "del-24-02",
    noteNumber: "DN-20240220-001",
    type: 'DELIVERY',
    dateCreated: "2024-02-20 10:00",
    status: "approved",
    destination: "Hải Châu, Đà Nẵng",
    items: [{ product: "Black Hoodie", quantity: 5 }],
    operator: "BOB WILSON"
  },
  {
    id: "del-24-03",
    noteNumber: "DN-20240310-001",
    type: 'DELIVERY',
    dateCreated: "2024-03-10 14:45",
    status: "rejected",
    destination: "Đống Đa, Hà Nội",
    items: [{ product: "Summer Floral Shirt", quantity: 2 }],
    operator: "Michael Brown"
  },
  {
    id: "del-24-04",
    noteNumber: "DN-20240425-001",
    type: 'DELIVERY',
    dateCreated: "2024-04-25 09:15",
    status: "approved",
    destination: "Ninh Kiều, Cần Thơ",
    items: [{ product: "Slim Fit Jeans", quantity: 4 }],
    operator: "BOB WILSON"
  },
  {
    id: "del-24-05",
    noteNumber: "DN-20240512-001",
    type: 'DELIVERY',
    dateCreated: "2024-05-12 16:20",
    status: "approved",
    destination: "Vĩnh Nguyên, Nha Trang",
    items: [{ product: "Red Canvas Sneakers", quantity: 3 }],
    operator: "David Miller"
  },
  {
    id: "del-24-07",
    noteNumber: "DN-20240708-001",
    type: 'DELIVERY',
    dateCreated: "2024-07-08 11:30",
    status: "approved",
    destination: "Thủ Dầu Một, Bình Dương",
    items: [{ product: "Beige Cargo Shorts", quantity: 20 }],
    operator: "John Smith"
  },
  {
    id: "del-24-08",
    noteNumber: "DN-20240830-001",
    type: 'DELIVERY',
    dateCreated: "2024-08-30 13:00",
    status: "approved",
    destination: "Vũng Tàu",
    items: [{ product: "Leather Baseball Cap", quantity: 15 }],
    operator: "Sarah Jenkins"
  },
  {
    id: "del-24-10",
    noteNumber: "DN-20241014-001",
    type: 'DELIVERY',
    dateCreated: "2024-10-14 15:10",
    status: "approved",
    destination: "Quận 7, TP.HCM",
    items: [{ product: "Blue Denim Jacket", quantity: 7 }],
    operator: "Michael Brown"
  },
  {
    id: "del-24-11",
    noteNumber: "DN-20241122-001",
    type: 'DELIVERY',
    dateCreated: "2024-11-22 08:45",
    status: "approved",
    destination: "Hồng Bàng, Hải Phòng",
    items: [{ product: "Black Hoodie", quantity: 12 }],
    operator: "Emily Davis"
  },
  {
    id: "del-24-12",
    noteNumber: "DN-20241228-001",
    type: 'DELIVERY',
    dateCreated: "2024-12-28 17:00",
    status: "approved",
    destination: "Cầu Giấy, Hà Nội",
    items: [{ product: "Leather Biker Jacket", quantity: 5 }],
    operator: "David Miller"
  },

  // --- NĂM 2025 (Đủ các tháng tiêu biểu) ---
  {
    id: "del-25-01",
    noteNumber: "DN-20250105-001",
    type: 'DELIVERY',
    dateCreated: "2025-01-05 10:20",
    status: "approved",
    destination: "Thủ Đức, TP.HCM",
    items: [{ product: "Basic White T-Shirt", quantity: 50 }],
    operator: "John Smith"
  },
  {
    id: "del-25-02",
    noteNumber: "DN-20250214-001",
    type: 'DELIVERY',
    dateCreated: "2025-02-14 09:00",
    status: "approved",
    destination: "Đà Lạt, Lâm Đồng",
    items: [{ product: "Striped Polo Shirt", quantity: 8 }],
    operator: "Sarah Jenkins"
  },
  {
    id: "del-25-03",
    noteNumber: "DN-20250320-001",
    type: 'DELIVERY',
    dateCreated: "2025-03-20 14:00",
    status: "rejected",
    destination: "Biên Hòa, Đồng Nai",
    items: [{ product: "Slim Fit Jeans", quantity: 10 }],
    operator: "Michael Brown"
  },
  {
    id: "del-25-04",
    noteNumber: "DN-20250410-001",
    type: 'DELIVERY',
    dateCreated: "2025-04-10 11:30",
    status: "approved",
    destination: "Phan Thiết, Bình Thuận",
    items: [{ product: "Summer Floral Shirt", quantity: 15 }],
    operator: "Emily Davis"
  },
  {
    id: "del-25-05",
    noteNumber: "DN-20250525-001",
    type: 'DELIVERY',
    dateCreated: "2025-05-25 15:45",
    status: "approved",
    destination: "Quận Bình Tân, TP.HCM",
    items: [{ product: "Red Canvas Sneakers", quantity: 6 }],
    operator: "David Miller"
  },
  {
    id: "del-25-06",
    noteNumber: "DN-20250618-001",
    type: 'DELIVERY',
    dateCreated: "2025-06-18 08:00",
    status: "approved",
    destination: "Sơn Trà, Đà Nẵng",
    items: [{ product: "Beige Cargo Shorts", quantity: 30 }],
    operator: "John Smith"
  },
  {
    id: "del-25-07",
    noteNumber: "DN-20250722-001",
    type: 'DELIVERY',
    dateCreated: "2025-07-22 13:20",
    status: "approved",
    destination: "Hoàn Kiếm, Hà Nội",
    items: [{ product: "Basic White T-Shirt", quantity: 25 }],
    operator: "Sarah Jenkins"
  },
  {
    id: "del-25-08",
    noteNumber: "DN-20250812-001",
    type: 'DELIVERY',
    dateCreated: "2025-08-12 10:40",
    status: "approved",
    destination: "Bình Thủy, Cần Thơ",
    items: [{ product: "Black Hoodie", quantity: 20 }],
    operator: "Michael Brown"
  },
  {
    id: "del-25-09",
    noteNumber: "DN-20250905-001",
    type: 'DELIVERY',
    dateCreated: "2025-09-05 16:00",
    status: "approved",
    destination: "Long Xuyên, An Giang",
    items: [{ product: "Blue Denim Jacket", quantity: 4 }],
    operator: "Emily Davis"
  },
  {
    id: "del-25-10",
    noteNumber: "DN-20251030-001",
    type: 'DELIVERY',
    dateCreated: "2025-10-30 09:15",
    status: "approved",
    destination: "Quận 3, TP.HCM",
    items: [{ product: "Leather Baseball Cap", quantity: 40 }],
    operator: "David Miller"
  },
  {
    id: "del-25-11",
    noteNumber: "DN-20251111-001",
    type: 'DELIVERY',
    dateCreated: "2025-11-11 11:11",
    status: "approved",
    destination: "Thanh Xuân, Hà Nội",
    items: [{ product: "Slim Fit Jeans", quantity: 15 }],
    operator: "John Smith"
  },
  {
    id: "del-25-12",
    noteNumber: "DN-20251224-001",
    type: 'DELIVERY',
    dateCreated: "2025-12-24 14:30",
    status: "approved",
    destination: "Dĩ An, Bình Dương",
    items: [{ product: "Leather Biker Jacket", quantity: 3 }],
    operator: "Sarah Jenkins"
  },

  // --- NĂM 2026 (Đến tháng 5 hiện tại) ---
  {
    id: "del-26-01",
    noteNumber: "DN-20260110-001",
    type: 'DELIVERY',
    dateCreated: "2026-01-10 08:30",
    status: "approved",
    destination: "Lộc Thọ, Nha Trang",
    items: [{ product: "Black Hoodie", quantity: 10 }],
    operator: "Michael Brown"
  },
  {
    id: "del-26-02",
    noteNumber: "DN-20260202-001",
    type: 'DELIVERY',
    dateCreated: "2026-02-02 10:15",
    status: "approved",
    destination: "Quận 10, TP.HCM",
    items: [{ product: "Striped Polo Shirt", quantity: 5 }],
    operator: "Emily Davis"
  },
  {
    id: "del-26-03",
    noteNumber: "DN-20260315-001",
    type: 'DELIVERY',
    dateCreated: "2026-03-15 13:00",
    status: "approved",
    destination: "Ba Đình, Hà Nội",
    items: [{ product: "Blue Denim Jacket", quantity: 2 }],
    operator: "David Miller"
  },
  {
    id: "del-26-04",
    noteNumber: "DN-20260405-001",
    type: 'DELIVERY',
    dateCreated: "2026-04-05 09:45",
    status: "approved",
    destination: "Hải Châu, Đà Nẵng",
    items: [{ product: "Red Canvas Sneakers", quantity: 8 }],
    operator: "John Smith"
  },
  {
    id: "del-26-04-2",
    noteNumber: "DN-20260420-001",
    type: 'DELIVERY',
    dateCreated: "2026-04-20 15:20",
    status: "in process",
    destination: "Thủ Đức, TP.HCM",
    items: [{ product: "Summer Floral Shirt", quantity: 10 }],
    operator: "Sarah Jenkins"
  },
  {
    id: "del-26-05-1",
    noteNumber: "DN-20260502-001",
    type: 'DELIVERY',
    dateCreated: "2026-05-02 08:10",
    status: "pending",
    destination: "Quận Phú Nhuận, TP.HCM",
    items: [{ product: "Slim Fit Jeans", quantity: 3 }],
    operator: "Michael Brown"
  },
  {
    id: "del-26-05-2",
    noteNumber: "DN-20260508-001",
    type: 'DELIVERY',
    dateCreated: "2026-05-08 14:00",
    status: "new",
    destination: "Vĩnh Hải, Nha Trang",
    items: [{ product: "Basic White T-Shirt", quantity: 12 }],
    operator: "Emily Davis"
  },
  {
    id: "del-26-05-3",
    noteNumber: "DN-20260510-001",
    type: 'DELIVERY',
    dateCreated: "2026-05-10 10:30",
    status: "new",
    destination: "Dĩ An, Bình Dương",
    items: [{ product: "Leather Baseball Cap", quantity: 2 }],
    operator: "David Miller"
  }
];
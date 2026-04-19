  import { type User } from "../types/user";

  export const MOCK_USERS: User[] = [
    {
      id: 'u1',
      fullName: 'ALICE SMITH', // Viết hoa theo yêu cầu
      email: 'alice@example.com',
      dob: '1990-05-15',
      phone: '0123456789',
      address: '123 Manager St, Tech City',
      role: 'manager'
    },
    {
      id: 'u2',
      fullName: 'BOB WILSON', // Viết hoa theo yêu cầu
      email: 'bob@example.com',
      dob: '1995-10-20',
      phone: '0987654321',
      address: '456 Staff Ave, Innovation Hub',
      role: 'staff'
    }
  ];
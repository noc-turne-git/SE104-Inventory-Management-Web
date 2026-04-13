import { type Staff, type Infractions } from '../types/staff';

export const MOCK_STAFF: Staff[] = [
  {
    id: '1',
    name: 'Alice Cooper',
    email: 'alice@example.com',
    role: 'Manager',
    accountStatus: 'Active',
    salary: 65000,
    hireDate: '2023-01-15',
    dob: '1990-05-12',
    phone: '0123-456-789',
    address: '123 Maple St, Springfield',
    infractions: [
      {
        id: 'inf-1',
        datetime: '2024-03-10T08:30:00',
        reason: 'Late for shift',
        penalty: 50
      }
    ],
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'Staff',
    accountStatus: 'Active',
    salary: 45000,
    hireDate: '2023-03-20',
    dob: '1995-08-22',
    phone: '0987-654-321',
    address: '456 Oak Ave, Riverdale',
    infractions: [],
  },
  {
    id: '3',
    name: 'Carol Martinez',
    email: 'carol@example.com',
    role: 'Manager',
    accountStatus: 'Active',
    salary: 85000,
    hireDate: '2022-11-10',
    dob: '1988-12-05',
    phone: '0555-123-4567',
    infractions: [], // Ví dụ không có address vì nó là optional (?)
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Staff',
    accountStatus: 'Inactive',
    salary: 48000,
    hireDate: '2023-06-01',
    dob: '1992-02-28',
    phone: '0444-987-654',
    address: '789 Pine Rd, Lakeside',
    infractions: [
      {
        id: 'inf-2',
        datetime: '2024-01-15T10:00:00',
        reason: 'Safety protocol violation',
        penalty: 200
      }
    ],
  },
  {
    id: '5',
    name: 'Emily Nguyen',
    email: 'emily@example.com',
    role: 'Staff',
    accountStatus: 'Active',
    salary: 52000,
    hireDate: '2024-02-10',
    dob: '1998-11-15',
    phone: '0333-222-111',
    address: '321 Elm St, Hill Valley',
    infractions: [],
  },
  {
    id: '6',
    name: 'Frank Harrison',
    email: 'frank@example.com',
    role: 'Staff',
    accountStatus: 'Inactive',
    salary: 38000,
    hireDate: '2022-05-25',
    dob: '1985-04-30',
    phone: '0111-555-999',
    infractions: [],
  },
];
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
    infractions: [],
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Staff',
    accountStatus: 'Inactive',
    salary: 48000,
    hireDate: '2023-06-01',
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
    infractions: [],
  },
];
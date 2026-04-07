import { type Staff } from '../types/staff';

export const MOCK_STAFF: Staff[] = [
  {
    id: '1',
    name: 'Alice Cooper',
    email: 'alice@example.com',
    role: 'Manager',
    accountStatus: 'Active',
    availability: 'Available',
    salary: 65000,
    hireDate: '2023-01-15',
    infractions: [],
  },

  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'Staff',
    accountStatus: 'Active',
    availability: 'Busy',
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
    availability: 'On Leave',
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
    availability: 'On Leave',
    salary: 48000,
    hireDate: '2023-06-01',
    infractions: [],
  },

  {
    id: '5',
    name: 'Emily Nguyen',
    email: 'emily@example.com',
    role: 'Staff',
    accountStatus: 'Active',
    availability: 'Available',
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
    availability: 'On Leave',
    salary: 38000,
    hireDate: '2022-05-25',
    infractions: [],
  },
];
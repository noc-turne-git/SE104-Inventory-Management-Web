import { type statusNote } from '../../types/note';

export type NoteTab = statusNote | 'all';

export const noteTabs: { label: string; value: NoteTab }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'PENDING', value: 'pending' },
  { label: 'APPROVED', value: 'approved' },
  { label: 'REJECTED', value: 'rejected' },
  { label: 'IN PROCESS', value: 'in process' },
];

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-700 border border-green-200';
    case 'in process':
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-700 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

export const getNoteIconColor = (type: string): string => {
  if (type === 'INVENTORY_CHECK') return 'bg-amber-100 text-amber-600';
  if (type === 'DELIVERY') return 'bg-blue-100 text-blue-600';
  return 'bg-emerald-100 text-emerald-600';
};

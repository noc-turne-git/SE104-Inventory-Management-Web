import axiosClient from './axiosClient';
import { type Shift } from '../types/shift';

export interface ShiftUpsertPayload {
  startTime: string | Date; // ISO datetime preferred
  endTime: string | Date;   // ISO datetime preferred
  userId?: number | null;   // null = unassigned
  duty: string;
  note?: string;
}

function toIso(value: string | Date): string {
  if (value instanceof Date) return value.toISOString();
  if (value.includes('T')) return value;
  // fallback: let Date parse, but caller should provide ISO string
  return new Date(value).toISOString();
}

const shiftApi = {
  getMine(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/shifts/mine`;
    return axiosClient.get<Shift[]>(url);
  },

  getAll(warehouseId: string | number) {
    const url = `/warehouses/${warehouseId}/shifts`;
    return axiosClient.get<Shift[]>(url);
  },

  create(warehouseId: string | number, data: ShiftUpsertPayload) {
    const url = `/warehouses/${warehouseId}/shifts`;
    return axiosClient.post(url, {
      startTime: toIso(data.startTime),
      endTime: toIso(data.endTime),
      userId: data.userId ?? null,
      duty: data.duty,
      note: data.note ?? '',
    });
  },

  update(warehouseId: string | number, shiftId: string | number, data: ShiftUpsertPayload) {
    const url = `/warehouses/${warehouseId}/shifts/${shiftId}`;
    return axiosClient.put(url, {
      startTime: toIso(data.startTime),
      endTime: toIso(data.endTime),
      userId: data.userId ?? null,
      duty: data.duty,
      note: data.note ?? '',
    });
  },

  delete(warehouseId: string | number, shiftId: string | number) {
    const url = `/warehouses/${warehouseId}/shifts/${shiftId}`;
    return axiosClient.delete(url);
  },
};

export default shiftApi;

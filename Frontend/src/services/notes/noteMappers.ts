import { type Delivery, type InventoryCheck, type Receipt, type WarehouseNote } from '../../types/note';

type ApiRecord = Record<string, unknown>;

export const asRecord = (value: unknown): ApiRecord =>
  value !== null && typeof value === 'object' ? (value as ApiRecord) : {};

export const asString = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
};

export const asNumber = (value: unknown): number => Number(value ?? 0);

export const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

export const normalizeStatus = (status: string): WarehouseNote['status'] => {
  const lowered = status.trim().toLowerCase();
  if (lowered === 'approved') return 'approved';
  if (lowered === 'rejected') return 'rejected';
  if (lowered === 'in process') return 'in process';
  if (lowered === 'new') return 'new';
  return 'pending';
};

export const toDelivery = (rawValue: unknown, warehouseId?: number | string | null): Delivery => {
  const raw = asRecord(rawValue);

  return {
    id: asString(raw.id),
    warehouseId: String(warehouseId ?? ''),
    noteNumber: asString(raw.noteNumber),
    dateCreated: asString(raw.dateCreated),
    status: normalizeStatus(asString(raw.status, 'pending')),
    reason: raw.reason === undefined ? undefined : asString(raw.reason),
    operator: asString(raw.operator),
    type: 'DELIVERY',
    destination: asString(raw.destination),
    items: asArray(raw.items).map((item) => {
      const it = asRecord(item);
      return {
        product: asString(it.product),
        quantity: asNumber(it.quantity),
      };
    }),
  };
};

export const toReceipt = (rawValue: unknown, warehouseId?: number | string | null): Receipt => {
  const raw = asRecord(rawValue);

  return {
    id: asString(raw.id),
    warehouseId: String(warehouseId ?? ''),
    noteNumber: asString(raw.noteNumber),
    dateCreated: asString(raw.dateCreated),
    status: normalizeStatus(asString(raw.status, 'pending')),
    reason: raw.reason === undefined ? undefined : asString(raw.reason),
    operator: asString(raw.operator),
    type: 'RECEIPT',
    supplier: asString(raw.supplier),
    items: asArray(raw.items).map((item) => {
      const it = asRecord(item);
      return {
        product: asString(it.product),
        ordered: asNumber(it.ordered),
        received: asNumber(it.received),
        defective: asNumber(it.defective),
      };
    }),
  };
};

export const toInventoryCheck = (rawValue: unknown, warehouseId?: number | string | null): InventoryCheck => {
  const raw = asRecord(rawValue);

  return {
    id: asString(raw.id),
    warehouseId: String(warehouseId ?? ''),
    noteNumber: asString(raw.noteNumber),
    dateCreated: asString(raw.dateCreated),
    status: normalizeStatus(asString(raw.status, 'pending')),
    reason: raw.reason === undefined ? undefined : asString(raw.reason),
    operator: asString(raw.operator),
    type: 'INVENTORY_CHECK',
    items: asArray(raw.items).map((item) => {
      const it = asRecord(item);
      return {
        product: asString(it.product),
        stockQuantity: asNumber(it.stockQuantity),
        reason: asString(it.reason),
      };
    }),
  };
};

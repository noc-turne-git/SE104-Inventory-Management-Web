import productApi from '../../api/ProductAPI';
import supplierApi from '../../api/SupplierAPI';
import { asArray, asNumber, asRecord, asString } from './noteMappers';

export const getProductNameToId = async (warehouseId?: number | null) => {
  if (!warehouseId) return new Map<string, number>();

  const res = await productApi.getAll(warehouseId);
  const map = new Map<string, number>();

  for (const value of asArray(res.data)) {
    const product = asRecord(value);
    const key = asString(product.name).trim().toLowerCase();
    if (!key) continue;
    map.set(key, asNumber(product.productId ?? product.id));
  }

  return map;
};

export const getSupplierNameToId = async (warehouseId?: number | null) => {
  if (!warehouseId) return new Map<string, number>();

  const res = await supplierApi.getAll(warehouseId);
  const map = new Map<string, number>();

  for (const value of asArray(res.data)) {
    const supplier = asRecord(value);
    const key = asString(supplier.name).trim().toLowerCase();
    if (!key) continue;
    map.set(key, asNumber(supplier.supplierId ?? supplier.id));
  }

  return map;
};

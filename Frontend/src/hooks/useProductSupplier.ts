import { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import productSupplierApi, { type ProductSupplierApiResponse } from '../api/ProductSupplierAPI';
import { type ProductSupplier } from '../types/product';

const normalizeType = (type?: string | null): ProductSupplier['type'] => (
  type === 'SECONDARY' ? 'SECONDARY' : 'PRIMARY'
);

const mapApiProductSupplier = (data: ProductSupplierApiResponse): ProductSupplier => ({
  productId: Number(data.productId ?? 0),
  supplierId: Number(data.supplierId ?? 0),
  product: data.product ?? '',
  supplier: data.supplier ?? '',
  type: normalizeType(data.type),
  price: Number(data.price ?? 0),
});

const getProductSupplierErrorMessage = (err: unknown, fallback: string) => {
  if (!isAxiosError(err)) return fallback;
  if (!err.response) return 'Cannot connect to server. Please check your network.';
  return err.response.data?.message || fallback;
};

export const useProductSuppliers = (warehouseId?: number | null, productId?: string | number | null) => {
  const [productSuppliers, setProductSuppliers] = useState<ProductSupplier[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProductSuppliers = useCallback(async () => {
    if (!warehouseId || !productId) {
      setProductSuppliers([]);
      return false;
    }

    setLoading(true);
    try {
      setProductSuppliers([]);
      const res = await productSupplierApi.getByProductId(warehouseId, productId);
      setProductSuppliers((res.data || []).map(mapApiProductSupplier));
      return true;
    } catch (err: unknown) {
      setProductSuppliers([]);
      toast.error(getProductSupplierErrorMessage(err, 'Failed to fetch product suppliers'));
      return false;
    } finally {
      setLoading(false);
    }
  }, [productId, warehouseId]);

  useEffect(() => {
    void fetchProductSuppliers();
  }, [fetchProductSuppliers]);

  const upsertProductSupplier = useCallback(
    async (supplierId: number, type: ProductSupplier['type'], price: number) => {
      if (!warehouseId || !productId) {
        toast.error('Please select a warehouse and product first');
        return false;
      }

      const numericProductId = Number(productId);
      if (!Number.isInteger(numericProductId) || !Number.isInteger(supplierId)) {
        toast.error('Invalid product or supplier');
        return false;
      }

      try {
        const res = await productSupplierApi.upsert(warehouseId, {
          productId: numericProductId,
          supplierId,
          type,
          price,
        });
        const next = mapApiProductSupplier(res.data);

        setProductSuppliers((prev) => {
          const exists = prev.some((item) => item.productId === next.productId && item.supplierId === next.supplierId);
          if (!exists) return [...prev, next];
          return prev.map((item) => (
            item.productId === next.productId && item.supplierId === next.supplierId ? next : item
          ));
        });

        toast.success('Product supplier saved');
        return true;
      } catch (err: unknown) {
        toast.error(getProductSupplierErrorMessage(err, 'Failed to save product supplier'));
        return false;
      }
    },
    [productId, warehouseId],
  );

  const removeSupplierFromProduct = useCallback(
    async (supplierId: number) => {
      if (!warehouseId || !productId) {
        toast.error('Please select a warehouse and product first');
        return false;
      }

      try {
        await productSupplierApi.delete(warehouseId, productId, supplierId);
        setProductSuppliers((prev) => prev.filter((item) => item.supplierId !== supplierId));
        toast.success('Supplier removed from product');
        return true;
      } catch (err: unknown) {
        toast.error(getProductSupplierErrorMessage(err, 'Failed to remove supplier'));
        return false;
      }
    },
    [productId, warehouseId],
  );

  return {
    productSuppliers,
    loading,
    refetch: fetchProductSuppliers,
    upsertProductSupplier,
    removeSupplierFromProduct,
  };
};

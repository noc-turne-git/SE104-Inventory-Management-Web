import { useCallback, useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import supplierApi from "../api/SupplierAPI";
import { type Supplier, type SupplierApiResponse, type SupplierInput } from "../types/supplier";
import { toast } from "sonner";

const mapApiSupplierToSupplier = (data: SupplierApiResponse): Supplier => ({
  id: Number(data.supplierId ?? data.id ?? 0),
  name: data.name ?? "",
  contact: data.contact ?? "",
  email: data.email ?? "",
  phone: data.phone ?? "",
  address: data.address ?? "",
});

const keepSupplierOrder = (items: Supplier[], knownOrder: number[]) => {
  const orderMap = new Map(knownOrder.map((id, index) => [id, index]));

  return [...items].sort((a, b) => {
    const aOrder = orderMap.get(a.id);
    const bOrder = orderMap.get(b.id);

    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;
    return a.id - b.id;
  });
};

const getSupplierErrorMessage = (err: unknown, fallback: string) => {
  if (!isAxiosError(err)) return fallback;
  if (!err.response) {
    return "Cannot connect to server. Please check your network.";
  }

  return err.response.data?.message || fallback;
};

export const useSuppliers = (warehouseId?: number | null) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  const cacheRef = useRef<Record<string, Supplier[]>>({});
  const abortRef = useRef<AbortController | null>(null);
  const requestSeqRef = useRef(0);
  const fullOrderRef = useRef<number[]>([]);

  const clearCache = useCallback(() => {
    cacheRef.current = {};
  }, []);

  const nextRequestId = useCallback(() => {
    requestSeqRef.current += 1;
    return requestSeqRef.current;
  }, []);

  const fetchSuppliers = useCallback(async () => {
    abortRef.current?.abort();

    if (!warehouseId) {
      setSuppliers([]);
      setLoading(false);
      return false;
    }

    const requestId = nextRequestId();
    setLoading(true);

    try {
      setSuppliers([]);
      const res = await supplierApi.getAll(warehouseId);
      const next = (Array.isArray(res.data) ? res.data : []).map(mapApiSupplierToSupplier);

      if (requestId === requestSeqRef.current) {
        const ordered = keepSupplierOrder(next, fullOrderRef.current);
        fullOrderRef.current = ordered.map((supplier) => supplier.id);
        setSuppliers(ordered);
        cacheRef.current[""] = ordered;
      }

      return true;
    } catch (err: unknown) {
      if (requestId === requestSeqRef.current) {
        setSuppliers([]);
        toast.error(getSupplierErrorMessage(err, "Failed to fetch suppliers"));
      }
      return false;
    } finally {
      if (requestId === requestSeqRef.current) {
        setLoading(false);
      }
    }
  }, [nextRequestId, warehouseId]);

  useEffect(() => {
    clearCache();
    fullOrderRef.current = [];
    void fetchSuppliers();

    return () => {
      abortRef.current?.abort();
    };
  }, [clearCache, fetchSuppliers]);

  const searchSuppliers = useCallback(
    async (q: string) => {
      const query = q.trim();

      if (!warehouseId) {
        setSuppliers([]);
        return false;
      }

      if (!query) {
        return fetchSuppliers();
      }

      const cached = cacheRef.current[query];
      if (cached) {
        setSuppliers(cached);
        return true;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = nextRequestId();
      setLoading(true);

      try {
        const res = await supplierApi.search(warehouseId, query, 20, {
          signal: controller.signal,
        });
        const next = keepSupplierOrder(
          (Array.isArray(res.data) ? res.data : []).map(mapApiSupplierToSupplier),
          fullOrderRef.current,
        );
        cacheRef.current[query] = next;

        if (requestId === requestSeqRef.current) {
          setSuppliers(next);
        }

        return true;
      } catch (err: unknown) {
        if (isAxiosError(err) && err.code === "ERR_CANCELED") {
          return false;
        }

        if (requestId === requestSeqRef.current) {
          toast.error(getSupplierErrorMessage(err, "Failed to search suppliers"));
        }
        return false;
      } finally {
        if (requestId === requestSeqRef.current) {
          setLoading(false);
        }
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
      }
    },
    [fetchSuppliers, nextRequestId, warehouseId],
  );

  const addSupplier = useCallback(
    async (data: SupplierInput) => {
      if (!warehouseId) {
        toast.error("Please select a warehouse before adding a supplier");
        return false;
      }

      try {
        const res = await supplierApi.create(warehouseId, data);
        const created = mapApiSupplierToSupplier(res.data);

        clearCache();
        fullOrderRef.current = [...fullOrderRef.current, created.id];
        setSuppliers((prev) => [...prev, created]);
        toast.success("Supplier added successfully");
        return true;
      } catch (err: unknown) {
        toast.error(getSupplierErrorMessage(err, "Create failed"));
        return false;
      }
    },
    [clearCache, warehouseId],
  );

  const updateSupplier = useCallback(
    async (id: number, data: SupplierInput) => {
      if (!warehouseId) {
        toast.error("Please select a warehouse before updating a supplier");
        return false;
      }

      try {
        await supplierApi.update(warehouseId, id, data);

        clearCache();
        setSuppliers((prev) => prev.map((supplier) => (supplier.id === id ? { id, ...data } : supplier)));
        toast.success("Supplier updated successfully");
        return true;
      } catch (err: unknown) {
        toast.error(getSupplierErrorMessage(err, "Update failed"));
        return false;
      }
    },
    [clearCache, warehouseId],
  );

  const deleteSupplier = useCallback(
    async (id: number) => {
      if (!warehouseId) {
        toast.error("Please select a warehouse before deleting a supplier");
        return false;
      }

      try {
        await supplierApi.delete(warehouseId, id);

        clearCache();
        fullOrderRef.current = fullOrderRef.current.filter((supplierId) => supplierId !== id);
        setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
        toast.success("Supplier deleted successfully");
        return true;
      } catch (err: unknown) {
        toast.error(getSupplierErrorMessage(err, "Delete failed"));
        return false;
      }
    },
    [clearCache, warehouseId],
  );

  return {
    suppliers,
    loading,
    refetch: fetchSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
  };
};

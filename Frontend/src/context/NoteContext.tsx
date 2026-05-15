import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type WarehouseNote, type Delivery, type Receipt, type InventoryCheck } from '../types/note';
import { toast } from 'sonner';
import { useWarehouseContext } from './WarehouseContext';
import { isAxiosError } from 'axios';
import warehouseNotesApi from '../api/WarehouseNotesAPI';
import productApi from '../api/ProductAPI';
import supplierApi from '../api/SupplierAPI';

interface NoteContextType {
  allNotes: WarehouseNote[];

  addNote: (newNote: WarehouseNote) => Promise<boolean>;
  updateNote: (id: string, data: Partial<WarehouseNote>) => Promise<boolean>;
  updateStatus: (id: string, status: WarehouseNote['status'], reason? : string) => Promise<boolean>;
  deleteNote: (id: string) => Promise<boolean>;
  // Helper để lấy nhanh từng loại phiếu khi cần
  getDeliveries: () => Delivery[];
  getReceipts: () => Receipt[];
  getInventoryChecks: () => InventoryCheck[];
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

const initialData: WarehouseNote[] = [];

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allNotes, setAllNotes] = useState<WarehouseNote[]>(initialData);
  const { warehouseId, role } = useWarehouseContext();

  const getErrorMessage = (err: unknown, fallback: string) => {
    if (!isAxiosError(err)) return fallback;
    return err.response?.data?.message || fallback;
  };

  const normalizeStatus = (status: string): WarehouseNote['status'] => {
    const lowered = status.trim().toLowerCase();
    if (lowered === 'approved') return 'approved';
    if (lowered === 'rejected') return 'rejected';
    if (lowered === 'in process') return 'in process';
    if (lowered === 'new') return 'new';
    return 'pending';
  };

  const toDelivery = (raw: any): Delivery => ({
    id: String(raw.id ?? ''),
    warehouseId: String(warehouseId ?? ''),
    noteNumber: raw.noteNumber ?? '',
    dateCreated: raw.dateCreated ?? '',
    status: normalizeStatus(raw.status ?? 'pending'),
    reason: raw.reason,
    operator: raw.operator ?? '',
    type: 'DELIVERY',
    destination: raw.destination ?? '',
    items: Array.isArray(raw.items)
      ? raw.items.map((it: any) => ({
          product: it.product ?? '',
          quantity: Number(it.quantity ?? 0),
        }))
      : [],
  });

  const toReceipt = (raw: any): Receipt => ({
    id: String(raw.id ?? ''),
    warehouseId: String(warehouseId ?? ''),
    noteNumber: raw.noteNumber ?? '',
    dateCreated: raw.dateCreated ?? '',
    status: normalizeStatus(raw.status ?? 'pending'),
    reason: raw.reason,
    operator: raw.operator ?? '',
    type: 'RECEIPT',
    supplier: raw.supplier ?? '',
    items: Array.isArray(raw.items)
      ? raw.items.map((it: any) => ({
          product: it.product ?? '',
          ordered: Number(it.ordered ?? 0),
          received: Number(it.received ?? 0),
          defective: Number(it.defective ?? 0),
        }))
      : [],
  });

  const toInventoryCheck = (raw: any): InventoryCheck => ({
    id: String(raw.id ?? ''),
    warehouseId: String(warehouseId ?? ''),
    noteNumber: raw.noteNumber ?? '',
    dateCreated: raw.dateCreated ?? '',
    status: normalizeStatus(raw.status ?? 'pending'),
    reason: raw.reason,
    operator: raw.operator ?? '',
    type: 'INVENTORY_CHECK',
    items: Array.isArray(raw.items)
      ? raw.items.map((it: any) => ({
          product: it.product ?? '',
          stockQuantity: Number(it.stockQuantity ?? 0),
          reason: it.reason ?? '',
        }))
      : [],
  });

  const fetchApiNotes = async () => {
    if (!warehouseId) {
      setAllNotes(initialData);
      return;
    }

    try {
      const isStaff = role === 'staff';
      const [deliveriesRes, receiptsRes, inventoryRes] = await Promise.all([
        isStaff ? warehouseNotesApi.getMyDeliveries(warehouseId) : warehouseNotesApi.getAllDeliveries(warehouseId),
        isStaff ? warehouseNotesApi.getMyReceipts(warehouseId) : warehouseNotesApi.getAllReceipts(warehouseId),
        isStaff ? warehouseNotesApi.getMyInventoryChecks(warehouseId) : warehouseNotesApi.getAllInventoryChecks(warehouseId),
      ]);

      const deliveries = (Array.isArray(deliveriesRes.data) ? deliveriesRes.data : []).map(toDelivery);
      const receipts = (Array.isArray(receiptsRes.data) ? receiptsRes.data : []).map(toReceipt);
      const inventoryChecks = (Array.isArray(inventoryRes.data) ? inventoryRes.data : []).map(toInventoryCheck);

      setAllNotes([...deliveries, ...receipts, ...inventoryChecks]);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, 'Failed to fetch notes from server'));
    }
  };

  useEffect(() => {
    void fetchApiNotes();
  }, [warehouseId, role]);

  const getProductNameToId = async () => {
    if (!warehouseId) return new Map<string, number>();
    const res = await productApi.getAll(warehouseId);
    const map = new Map<string, number>();
    for (const p of Array.isArray(res.data) ? res.data : []) {
      const key = String(p.name ?? '').trim().toLowerCase();
      if (!key) continue;
      map.set(key, Number(p.productId ?? p.id ?? 0));
    }
    return map;
  };

  const getSupplierNameToId = async () => {
    if (!warehouseId) return new Map<string, number>();
    const res = await supplierApi.getAll(warehouseId);
    const map = new Map<string, number>();
    for (const s of Array.isArray(res.data) ? res.data : []) {
      const key = String(s.name ?? '').trim().toLowerCase();
      if (!key) continue;
      map.set(key, Number(s.supplierId ?? s.id ?? 0));
    }
    return map;
  };

  const getCurrentWarehouseNotes = () => {
    if (!warehouseId) return [];
    return allNotes.filter((n) => Number(n.warehouseId) === Number(warehouseId));
  };
  
  const addNote = async (newNote: WarehouseNote) => {
    if (!warehouseId) {
      toast.error('No warehouse selected.');
      return false;
    }

    if (newNote.type === 'DELIVERY') {
      try {
        const productMap = await getProductNameToId();
        const items = newNote.items.map((item) => {
          const id = productMap.get(item.product.trim().toLowerCase());
          if (!id) throw new Error(`Product not found: ${item.product}`);
          return { productId: id, quantity: item.quantity };
        });
        await warehouseNotesApi.createDelivery(warehouseId, {
          destination: newNote.destination,
          items,
        });
        await fetchApiNotes();
        toast.success('Successfully created DELIVERY note.');
        return true;
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, 'Failed to create delivery note'));
        return false;
      }
    }

    if (newNote.type === 'RECEIPT') {
      try {
        const [productMap, supplierMap] = await Promise.all([getProductNameToId(), getSupplierNameToId()]);
        const supplierId = supplierMap.get(newNote.supplier.trim().toLowerCase());
        if (!supplierId) {
          toast.error(`Supplier not found: ${newNote.supplier}`);
          return false;
        }
        const items = newNote.items.map((item) => {
          const id = productMap.get(item.product.trim().toLowerCase());
          if (!id) throw new Error(`Product not found: ${item.product}`);
          return {
            productId: id,
            ordered: item.ordered,
            received: item.received,
            defective: item.defective,
          };
        });
        await warehouseNotesApi.createReceipt(warehouseId, {
          supplierId,
          items,
        });
        await fetchApiNotes();
        toast.success('Successfully created RECEIPT note.');
        return true;
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, 'Failed to create receipt note'));
        return false;
      }
    }

    if (newNote.type === 'INVENTORY_CHECK') {
      try {
        const productMap = await getProductNameToId();
        const items = newNote.items.map((item) => {
          const id = productMap.get(item.product.trim().toLowerCase());
          if (!id) throw new Error(`Product not found: ${item.product}`);
          return {
            productId: id,
            stockQuantity: item.stockQuantity,
            reason: item.reason ?? '',
          };
        });
        await warehouseNotesApi.createInventoryCheck(warehouseId, { items });
        await fetchApiNotes();
        toast.success('Successfully created INVENTORY_CHECK note.');
        return true;
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, 'Failed to create inventory check note'));
        return false;
      }
    }

    const noteWithWarehouse = { ...newNote, warehouseId: String(warehouseId) };
    setAllNotes((prev) => [noteWithWarehouse, ...prev]);
    toast.success(`Successfully created ${newNote.type} note.`);
    return true;
  };

  const updateNote = async (id: string, data: Partial<WarehouseNote>) => {
    if (!warehouseId) {
      toast.error('No warehouse selected.');
      return false;
    }

    const current = allNotes.find((n) => n.id === id);
    if (!current) {
      toast.error('Note not found.');
      return false;
    }

    if (current.type === 'DELIVERY') {
      try {
        const next = { ...current, ...data } as Delivery;
        const productMap = await getProductNameToId();
        const items = next.items.map((item) => {
          const pid = productMap.get(item.product.trim().toLowerCase());
          if (!pid) throw new Error(`Product not found: ${item.product}`);
          return { productId: pid, quantity: item.quantity };
        });
        await warehouseNotesApi.updateDelivery(warehouseId, id, {
          destination: next.destination,
          items,
        });
        await fetchApiNotes();
        toast.info('Note has been updated successfully.');
        return true;
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, 'Failed to update delivery note'));
        return false;
      }
    }

    if (current.type === 'RECEIPT') {
      try {
        const next = { ...current, ...data } as Receipt;
        const [productMap, supplierMap] = await Promise.all([getProductNameToId(), getSupplierNameToId()]);
        const supplierId = supplierMap.get(next.supplier.trim().toLowerCase());
        if (!supplierId) {
          toast.error(`Supplier not found: ${next.supplier}`);
          return false;
        }
        const items = next.items.map((item) => {
          const pid = productMap.get(item.product.trim().toLowerCase());
          if (!pid) throw new Error(`Product not found: ${item.product}`);
          return {
            productId: pid,
            ordered: item.ordered,
            received: item.received,
            defective: item.defective,
          };
        });
        await warehouseNotesApi.updateReceipt(warehouseId, id, {
          supplierId,
          items,
        });
        await fetchApiNotes();
        toast.info('Note has been updated successfully.');
        return true;
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, 'Failed to update receipt note'));
        return false;
      }
    }

    if (current.type === 'INVENTORY_CHECK') {
      try {
        const next = { ...current, ...data } as InventoryCheck;
        const productMap = await getProductNameToId();
        const items = next.items.map((item) => {
          const pid = productMap.get(item.product.trim().toLowerCase());
          if (!pid) throw new Error(`Product not found: ${item.product}`);
          return {
            productId: pid,
            stockQuantity: item.stockQuantity,
            reason: item.reason ?? '',
          };
        });
        await warehouseNotesApi.updateInventoryCheck(warehouseId, id, { items });
        await fetchApiNotes();
        toast.info('Note has been updated successfully.');
        return true;
      } catch (err: unknown) {
        toast.error(getErrorMessage(err, 'Failed to update inventory check note'));
        return false;
      }
    }

    setAllNotes((prev) => prev.map((n) => (n.id === id ? ({ ...n, ...data } as WarehouseNote) : n)));
    toast.info('Note has been updated successfully.');
    return true;
  };

  const updateStatus = async (id: string, status: WarehouseNote['status'], reason?: string) => {
    if (!warehouseId) {
      toast.error('No warehouse selected.');
      return false;
    }

    try {
      if (status === 'approved') {
        await warehouseNotesApi.approve(warehouseId, id);
      } else if (status === 'rejected') {
        await warehouseNotesApi.reject(warehouseId, id, reason);
      } else {
        setAllNotes((prev) =>
          prev.map((n) => (n.id === id ? (status === 'rejected' ? { ...n, status, reason } : { ...n, status }) : n)),
        );
        return true;
      }

      await fetchApiNotes();
      const statusMap = {
        approved: { msg: 'Note approved successfully.', icon: '✅' },
        rejected: { msg: 'Note has been rejected.', icon: '❌' },
        pending: { msg: 'Note is pending approval.', icon: '⏳' },
        'in process': { msg: 'Note is being processed.', icon: '⚙️' },
        new: { msg: 'New note created.', icon: '🆕' },
      };
      toast(`${statusMap[status].icon} ${statusMap[status].msg}`);
      return true;
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, 'Failed to update note status'));
      return false;
    }
  };

  const deleteNote = async (id: string) => {
    const note = allNotes.find((n) => n.id === id);
    if (!note) return false;

    if (note.type === 'DELIVERY' || note.type === 'RECEIPT') {
      return updateStatus(id, 'rejected', 'Cancelled by user');
    }

    setAllNotes((prev) => prev.filter((n) => n.id !== id));
    toast.error('Note has been deleted.');
    return true;
  };

  // Các hàm lọc dữ liệu (Getters)
  const getDeliveries = () =>
    getCurrentWarehouseNotes().filter(n => n.type === 'DELIVERY') as Delivery[];

  const getReceipts = () =>
    getCurrentWarehouseNotes().filter(n => n.type === 'RECEIPT') as Receipt[];

  const getInventoryChecks = () =>
    getCurrentWarehouseNotes().filter(n => n.type === 'INVENTORY_CHECK') as InventoryCheck[];

  return (
    <NoteContext.Provider value={{ 
      allNotes, 
      addNote, 
      updateNote, 
      updateStatus, 
      deleteNote,
      getDeliveries,
      getReceipts,
      getInventoryChecks
    }}>
      {children}
    </NoteContext.Provider>
  );
};

// Custom hook để sử dụng trong các Component
export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("something's wrong with useNotes, maybe you are not in NoteProvider");
  }
  return context;
};

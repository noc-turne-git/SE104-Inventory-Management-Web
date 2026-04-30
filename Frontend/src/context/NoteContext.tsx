import React, { createContext, useContext, useState, type ReactNode } from 'react';
import {type WarehouseNote, type Delivery, type Receipt, type InventoryCheck } from '../types/note';
import { toast } from 'sonner';
import { useWarehouseContext } from './WarehouseContext';
import { MOCK_DELIVERY } from '../data/MOCK_DELIVERY';
import { MOCK_INVENTORY_CHECKS } from '../data/MOCK_INVENTORY_CHECK';
import { MOCK_RECEIPTS } from '../data/MOCK_RECEIPTS';

interface NoteContextType {
  allNotes: WarehouseNote[];

  addNote: (newNote: WarehouseNote) => void;
  updateNote: (id: string, data: Partial<WarehouseNote>) => void;
  updateStatus: (id: string, status: WarehouseNote['status'], reason? : string) => void;
  deleteNote: (id: string) => void;
  // Helper để lấy nhanh từng loại phiếu khi cần
  getDeliveries: () => Delivery[];
  getReceipts: () => Receipt[];
  getInventoryChecks: () => InventoryCheck[];
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

const initialData = [...MOCK_DELIVERY, ...MOCK_INVENTORY_CHECKS,...MOCK_RECEIPTS]

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allNotes, setAllNotes] = useState<WarehouseNote[]>(initialData);

  const { warehouseId } = useWarehouseContext();
  // helper filter theo warehouse
  const getCurrentWarehouseNotes = () => {
    if (!warehouseId) return [];
    return allNotes.filter(n => n.warehouseId === warehouseId);
  };
  
  // Thêm note
  const addNote = (newNote: WarehouseNote) => {
    if (!warehouseId) {
      toast.error("No warehouse selected.");
      return;
    }
    const noteWithWarehouse = {
      ...newNote,
      warehouseId,
    };

    setAllNotes(prev => [noteWithWarehouse, ...prev]);
    toast.success(`Successfully created ${newNote.type} note.`);
  };

  // Cập nhật nội dung phiếu (Dùng chung)
  const updateNote = (id: string, data: Partial<WarehouseNote>) => {
    setAllNotes((prev) =>
      (prev.map((n) => (n.id === id ? { ...n, ...data } as WarehouseNote : n))
    ));
    toast.info("Note has been updated successfully.");
  };

  // Cập nhật trạng thái (Dùng cho Approve/Reject)
    const updateStatus = (id: string, status: WarehouseNote['status'], reason? : string) => {
        setAllNotes((prev) =>
        prev.map((n) => (n.id === id ? status == 'rejected' ? {...n, status, reason} : { ...n, status } : n))
        )

        const statusMap = {
        approved: { msg: 'Note approved successfully.', icon: '✅' },
        rejected: { msg: 'Note has been rejected.', icon: '❌' },
        pending: { msg: 'Note is pending approval.', icon: '⏳' },
        'in process': { msg: 'Note is being processed.', icon: '⚙️' },
        new: { msg: 'New note created.', icon: '🆕' },
        };

        toast(`${statusMap[status].icon} ${statusMap[status].msg}`);
    };

  // Xóa phiếu
  const deleteNote = (id: string) => {
    setAllNotes((prev) => prev.filter((n) => n.id !== id));
    toast.error("Note has been deleted.");
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
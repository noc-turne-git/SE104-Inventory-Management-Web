import React, { createContext, useContext, useState, type ReactNode } from 'react';
import {type WarehouseNote, type Delivery, type Receipt, type InventoryCheck } from '../types/note';
import { toast } from 'sonner';
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

  const addNote = (newNote: WarehouseNote) => {
    setAllNotes((prev) => [newNote, ...prev]);
    toast.success(`Đã tạo phiếu ${newNote.type} thành công`);
  };

  // 2. Cập nhật nội dung phiếu (Dùng chung)
  const updateNote = (id: string, data: Partial<WarehouseNote>) => {
    setAllNotes((prev) =>
      (prev.map((n) => (n.id === id ? { ...n, ...data } as WarehouseNote : n))
    ));
    toast.info("Thông tin phiếu đã được cập nhật");
  };

  // 3. Cập nhật trạng thái (Dùng cho Approve/Reject)
    const updateStatus = (id: string, status: WarehouseNote['status'], reason? : string) => {
        setAllNotes((prev) =>
        prev.map((n) => (n.id === id ? status == 'rejected' ? {...n, status, reason} : { ...n, status } : n))
        )

        const statusMap = {
        approved: { msg: 'Đã phê duyệt phiếu', icon: '✅' },
        rejected: { msg: 'Đã từ chối phiếu', icon: '❌' },
        pending: { msg: 'Đang chờ duyệt', icon: '⏳' },
        'in process': { msg: 'Đang xử lý', icon: '⚙️' },
        new: { msg: 'Phiếu mới tạo', icon: '🆕' },
        };

        toast(`${statusMap[status].icon} ${statusMap[status].msg}`);
    };

  // 4. Xóa phiếu
  const deleteNote = (id: string) => {
    setAllNotes((prev) => prev.filter((n) => n.id !== id));
    toast.error("Đã xóa phiếu khỏi hệ thống");
  };

  // Các hàm lọc dữ liệu (Getters)
  const getDeliveries = () => allNotes.filter(n => n.type === 'DELIVERY') as Delivery[];
  const getReceipts = () => allNotes.filter(n => n.type === 'RECEIPT') as Receipt[];
  const getInventoryChecks = () => allNotes.filter(n => n.type === 'INVENTORY_CHECK') as InventoryCheck[];

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
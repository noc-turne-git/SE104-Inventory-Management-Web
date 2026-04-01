import { useState } from 'react';
import { type Receipt, type ReceiptFormData } from '../../types/receipt';
import { toast } from 'sonner';

export function useReceipts(initialData: Receipt[]) {
  const [receipts, setReceipts] = useState<Receipt[]>(initialData);

  // Hàm lọc danh sách
  const getFilteredReceipts = (searchTerm: string, statusFilter: string) => {
    return receipts.filter((receipt) => {
      const matchesSearch =
        receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  // Thêm Receipt mới
  const addReceipt = (data: ReceiptFormData) => {
    const newReceipt: Receipt = {
      ...data,
      id: Date.now().toString(),
      // Tạo receiptNumber tự động: REC-YYYYMMDD-Random
      receiptNumber: `REC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
    };

    setReceipts((prev) => [newReceipt, ...prev]);
    toast.success('Đã tạo đơn nhập hàng mới');
  };

  // Cập nhật Receipt (Ví dụ: chỉnh sửa item hoặc thông tin chung)
  const updateReceipt = (id: string, data: Partial<ReceiptFormData>) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );
    toast.success('Đã cập nhật đơn nhập hàng');
  };

  // Cập nhật trạng thái (Dùng riêng để dễ quản lý logic Approve/Reject)
  const updateReceiptStatus = (id: string, newStatus: Receipt['status']) => {
    setReceipts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    
    const statusMessages = {
      approved: 'Đơn hàng đã được phê duyệt',
      rejected: 'Đơn hàng đã bị từ chối',
      pending: 'Đang chờ kiểm duyệt',
      'in process': 'Đang xử lý',
      new: 'Mới'
    };
    
    toast.info(statusMessages[newStatus]);
  };

  // Xóa Receipt
  const deleteReceipt = (id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
    toast.success('Đã xóa đơn nhập hàng');
  };

  const filteredReceipts = (searchTerm: string, statusFilter: string) => {
    return receipts.filter(receipt => {
        const matchesSearch = receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
  }

  return {
    receipts,
    getFilteredReceipts,
    addReceipt,
    updateReceipt,
    updateReceiptStatus,
    filteredReceipts,
    deleteReceipt,
  };
}
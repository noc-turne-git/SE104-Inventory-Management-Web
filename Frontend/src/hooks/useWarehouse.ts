import { useState } from "react";
import type { Warehouse, Invitation } from "../types/warehouse";
import { toast } from "sonner"; // Giả định bạn dùng sonner như file mẫu
import { useNavigate } from "react-router-dom";

export const useWarehouse = (
  initialWarehouses: Warehouse[],
  initialInvitations: Invitation[]
) => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Mở/Đóng Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Tạo Warehouse mới
  const createWarehouse = (name: string, address: string) => {
    const newWarehouse: Warehouse = {
      warehouseId: Date.now().toString(),
      name,
      address,
      lastUpdate: 'Updated 1 minutes ago',
      status: 'Stable Operations',
      productCount: 0,
      imageUrl: '',
      // Thêm các fields mặc định khác tùy thuộc vào type Warehouse của bạn
    };

    setWarehouses((prev) => [...prev, newWarehouse]);
    closeModal();
    toast.success(`Warehouse "${name}" created successfully`);
  };

  // Chấp nhận lời mời
  const acceptInvitation = (id: string) => {
    const invitedWh = invitations.find((inv) => inv.id === id);
    
    if (invitedWh) {
      // Giả sử khi accept thì chuyển invitation đó thành warehouse (tùy logic backend)
      // Ở đây ta xóa khỏi list invitations trước
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      toast.success("Invitation accepted");
    }
  };

  // Từ chối lời mời
  const declineInvitation = (id: string) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
    toast.error("Invitation declined");
  };

  // Điều hướng/Quản lý (Logic này thường là dùng router.push)
  const manageWarehouse = (id: string) => {
   // console.log(`Navigating to warehouse: ${id}`);
    // Window.location.href = ... hoặc useHistory/useNavigate
    navigate('/app', {replace: false});
  };

  return {
    warehouses,
    invitations,
    isModalOpen,
    openModal,
    closeModal,
    createWarehouse,
    acceptInvitation,
    declineInvitation,
    manageWarehouse,
  };
};
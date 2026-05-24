import { useEffect, useState } from "react";
import type { Warehouse, Invitation } from "../types/warehouse";
import { useWarehouseContext } from "../context/WarehouseContext";
import { toast } from "sonner"; // Giả định bạn dùng sonner như file mẫu
import { useNavigate } from "react-router-dom";
import warehouseApi from "../api/WarehouseAPI"; // Giả định bạn có API này để fetch data
import invitationApi from "../api/InvitationAPI";

import { isAxiosError } from "axios";

const resolveImageUrl = (url?: string) => {
  if (!url) return "";
  if (/^(https?:|blob:|data:)/i.test(url)) return url;
  return `http://localhost:5074${url}`;
};

const mapApiWarehouse = (data: any): Warehouse => ({
  ...data,
  warehouseId: String(data?.warehouseId ?? ""),
  role: data?.role ?? "staff",
  name: data?.name ?? "",
  location: data?.location ?? data?.address ?? "",
  address: data?.address ?? data?.location ?? "",
  imageUrl: resolveImageUrl(data?.imageUrl ?? data?.urlimage),
  status: data?.status ?? "Stable Operations",
  productCount: data?.productCount ?? 0,
  lastUpdate: data?.lastUpdate ?? "",
});

export const useWarehouse = () => {
  const { setWarehouse } = useWarehouseContext();

  const [loading, setLoading] = useState(false);

  const [warehouses, setWarehouses] = useState  <Warehouse[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const response = await warehouseApi.getAll(); // Gọi API để lấy danh sách warehouses
      const items = Array.isArray(response.data) ? response.data : [];
      setWarehouses(items.map(mapApiWarehouse));
    } catch {
      toast.error("Failed to fetch warehouses");
    } finally {
      setLoading(false);
    }
  };


  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const response = await invitationApi.getAll(); // Gọi API để lấy danh sách invitations
      setInvitations(response.data || []); // Cập nhật state với dữ liệu mới
    } catch {
      toast.error("Failed to fetch invitations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true); 
      try {
        await Promise.all([
          fetchWarehouses(),
          fetchInvitations()
        ]);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);


  // Mở/Đóng Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Tạo Warehouse mới
  const createWarehouse = async (name: string, address: string, imageFile?: File | null) => {
    
    // const newWarehouse: Warehouse = {
    //   warehouseId: Date.now().toString(),
    //   name,
    //   address,
    //   lastUpdate: 'Updated 1 minutes ago',
    //   status: 'Stable Operations',
    //   productCount: 0,
    //   imageUrl: urlimage || '',
    //   // Thêm các fields mặc định khác tùy thuộc vào type Warehouse của bạn
    // };
    const form = {
      name,
      location : address,
      urlimage: '',
      imageFile: imageFile ?? null
    };
    try {
      const response = await warehouseApi.create(form);
      const getWarehouseResponse = await warehouseApi.getById(response.data.warehouseId);
      const createdWarehouse = mapApiWarehouse(getWarehouseResponse.data);
      
      setWarehouse({
        role: "manager",
        warehouseId: createdWarehouse.warehouseId,
        warehouseName: createdWarehouse.name,
      });

      setWarehouses((prev) => [...prev || [], createdWarehouse]);
      closeModal();
      toast.success(`Warehouse "${name}" created successfully`);
    } catch  {
      toast.error("Failed to create warehouse");
    }
  };

  // Chấp nhận lời mời
  const acceptInvitation = async (id: string) => {
    const invitedWh = invitations?.find((inv) => inv.id === id);
    
    if (invitedWh) {
      try{
        const form = {InvitationId:id }
        await invitationApi.accept(form);
        const wh = await warehouseApi.getById(invitedWh.warehouseId);
        const mappedWarehouse = mapApiWarehouse(wh.data);
        setWarehouse({
          role: "staff",
          warehouseId: mappedWarehouse.warehouseId,
          warehouseName: mappedWarehouse.name,
        });

        setWarehouses((prev) => [...prev || [], mappedWarehouse]); 
        
        setInvitations((prev) => (prev || []).filter((inv) => inv.id !== id));
        toast.success("Invitation accepted");
    
      }catch (err: unknown) {
            if (!isAxiosError(err)) toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
            else {
              if (!err.response) {
              // Trường hợp không có response (mất mạng, server không phản hồi)
              toast.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!");
              } else {
                // Trường hợp Server có trả về lỗi
                const status = err.response.status;
                const message = err.response.data?.message;
      
                switch (status) {
                  case 500:
                    toast.error("Lỗi hệ thống phía Server. Vui lòng thử lại sau!");
                    break;
                  default:
                    toast.error(message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
                }
              }
            }
          }
      // Giả sử khi accept thì chuyển invitation đó thành warehouse (tùy logic backend)
      // Ở đây ta xóa khỏi list invitations trước
    }
  };

  // Từ chối lời mời
  const declineInvitation = async (id: string) => {
    const invitedWh = invitations?.find((inv) => inv.id === id);
    
    if (invitedWh) {
      try{
        const form = {InvitationId:id }
        await invitationApi.reject(form);
        setInvitations((prev) => prev.filter((inv) => inv.id !== id));
        toast.error("Invitation declined");
      }catch (err: unknown) {
            if (!isAxiosError(err)) toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
            else {
              if (!err.response) {
              // Trường hợp không có response (mất mạng, server không phản hồi)
              toast.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!");
              } else {
                // Trường hợp Server có trả về lỗi
                const status = err.response.status;
                const message = err.response.data?.message;
      
                switch (status) {
                  case 500:
                    toast.error("Lỗi hệ thống phía Server. Vui lòng thử lại sau!");
                    break;
                  default:
                    toast.error(message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
                }
              }
            }
          }

      }

    
  };

  // Điều hướng/Quản lý (Logic này thường là dùng router.push)
  const updateWarehouseImage = async (id: string | number, imageFile: File) => {
    const current = warehouses.find((w) => String(w.warehouseId) === String(id));
    if (!current) return;

    try {
      const response = await warehouseApi.update(id, {
        name: current.name,
        location: current.location ?? current.address ?? "",
        urlimage: current.urlimage ?? current.imageUrl ?? "",
        imageFile,
      });
      const updatedWarehouse = mapApiWarehouse(response.data);
      setWarehouses((prev) =>
        prev.map((warehouse) =>
          String(warehouse.warehouseId) === String(id) ? { ...warehouse, ...updatedWarehouse } : warehouse
        )
      );
      toast.success("Warehouse image updated successfully");
    } catch {
      toast.error("Failed to update warehouse image");
    }
  };

  const manageWarehouse = (id: string | number) => {
   // console.log(`Navigating to warehouse: ${id}`);
    // Window.location.href = ... hoặc useHistory/useNavigate
    const wh = warehouses.find(w => String(w.warehouseId) === String(id));
    if (wh) {
      setWarehouse({
        role: wh.role,
        warehouseId: wh.warehouseId,
        warehouseName: wh.name,
      });
    }
    navigate('/app', {replace: false});
  };

  return {
    warehouses,
    loading,
    invitations,
    isModalOpen,
    openModal,
    closeModal,
    createWarehouse,
    acceptInvitation,
    declineInvitation,
    updateWarehouseImage,
    manageWarehouse,
  };
};

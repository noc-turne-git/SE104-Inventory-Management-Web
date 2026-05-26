namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
//Đây là cấu hình của AutoMapper dùng để map object tự động giữa: Entity, DTO
public interface IWarehouseService
{
    Task<int> CreateWarehouseAsync(CreateWarehouseDTO model, int userid);
    Task<WarehouseDetailDTO?> UpdateWarehouseAsync(int warehouseId, UpdateWarehouseDTO model);
    Task<bool> DeleteWarehouseAsync(int warehouseId, CancellationToken cancellationToken = default);
    Task<InviteResponseDTO> InviteStaffAsync(InviteStaffDTO model, int inviterUserId);
    //Task<bool> JoinWarehouse(JoinWarehouseDTO model, int UserId);
}

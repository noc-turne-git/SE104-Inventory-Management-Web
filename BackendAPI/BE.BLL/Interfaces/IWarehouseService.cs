namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;

public interface IWarehouseService
{
    Task<int> CreateWarehouseAsync(CreateWarehouseDTO model, int userid);
    Task<InviteResponseDTO> InviteStaffAsync(InviteStaffDTO model, int inviterUserId);
    //Task<bool> JoinWarehouse(JoinWarehouseDTO model, int UserId);
}
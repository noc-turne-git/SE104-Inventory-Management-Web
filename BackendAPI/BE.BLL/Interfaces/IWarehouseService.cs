namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;

public interface IWarehouseService
{
    Task<bool> CreateWarehouseAsync(CreateWarehouseDTO model);
    Task<bool> InviteStaffAsync(InviteStaffDTO model, int inviterUserId);
    Task<bool> JoinWarehouse(JoinWarehouseDTO model, int UserId);
}
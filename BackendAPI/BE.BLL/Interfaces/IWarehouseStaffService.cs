namespace BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.DAL.Entities;
public interface IWarehouseStaffService
{
    // Task<bool> RemoveStaffAsync(int warehouseId, int userId);
    // Task<bool> ChangeRoleAsync(int warehouseId, int userId, string newRole);
    Task<bool> AddAsync(Invitation model, int userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<WarehouseStaffSearchResultDTO>> SearchAsync(int warehouseId, string? query, int limit = 20, CancellationToken cancellationToken = default);
}

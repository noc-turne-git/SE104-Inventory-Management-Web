namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.DAL.Entities;

public interface IShiftService
{
    Task<IEnumerable<Shift>> GetMineAsync(int warehouseId, int userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Shift>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default);
    Task<Shift> CreateAsync(int warehouseId, ShiftUpsertDTO model, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int warehouseId, int shiftId, ShiftUpsertDTO model, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int warehouseId, int shiftId, CancellationToken cancellationToken = default);
}


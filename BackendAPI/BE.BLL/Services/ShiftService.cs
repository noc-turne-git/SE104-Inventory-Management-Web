namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class ShiftService : IShiftService
{
    private readonly IRepository<Shift> _shifts;

    public ShiftService(IRepository<Shift> shifts)
    {
        _shifts = shifts;
    }

    public Task<IEnumerable<Shift>> GetMineAsync(int warehouseId, int userId, CancellationToken cancellationToken = default)
        => _shifts.GetAsync(s => s.WarehouseId == warehouseId && s.UserId == userId, cancellationToken);

    public Task<IEnumerable<Shift>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default)
        => _shifts.GetAsync(s => s.WarehouseId == warehouseId, cancellationToken);

    public async Task<Shift> CreateAsync(int warehouseId, ShiftUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var entity = new Shift
        {
            WarehouseId = warehouseId,
            UserId = model.UserId,
            StartTime = model.StartTime,
            EndTime = model.EndTime,
            Duty = model.Duty,
            Note = model.Note
        };

        await _shifts.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<bool> UpdateAsync(int warehouseId, int shiftId, ShiftUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var shift = await _shifts.GetByIdAsync(shiftId, cancellationToken);
        if (shift == null || shift.WarehouseId != warehouseId) return false;

        shift.UserId = model.UserId;
        shift.StartTime = model.StartTime;
        shift.EndTime = model.EndTime;
        shift.Duty = model.Duty;
        shift.Note = model.Note;

        return await _shifts.UpdateAsync(shift, cancellationToken);
    }

    public async Task<bool> DeleteAsync(int warehouseId, int shiftId, CancellationToken cancellationToken = default)
    {
        var shift = await _shifts.GetByIdAsync(shiftId, cancellationToken);
        if (shift == null || shift.WarehouseId != warehouseId) return false;

        return await _shifts.DeleteAsync(shiftId, cancellationToken);
    }
}


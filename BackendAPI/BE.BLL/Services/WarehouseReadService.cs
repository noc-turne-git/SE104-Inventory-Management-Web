namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class WarehouseReadService : IWarehouseReadService
{
    private readonly IRepository<Warehouse> _warehouses;
    private readonly IRepository<WarehouseStaff> _warehouseStaffs;

    public WarehouseReadService(IRepository<Warehouse> warehouses, IRepository<WarehouseStaff> warehouseStaffs)
    {
        _warehouses = warehouses;
        _warehouseStaffs = warehouseStaffs;
    }

    public async Task<IReadOnlyList<WarehouseSummaryDTO>> GetMineAsync(int userId, CancellationToken cancellationToken = default)
    {
        var memberships = await _warehouseStaffs.GetAsync(ws => ws.UserId == userId, cancellationToken);
        var warehouseIds = memberships.Select(ws => ws.WarehouseId).Distinct().ToList();
        if (warehouseIds.Count == 0) return Array.Empty<WarehouseSummaryDTO>();

        var warehouses = await _warehouses.GetAsync(w => warehouseIds.Contains(w.WarehouseId), cancellationToken);

        return warehouses
            .Select(w => new WarehouseSummaryDTO
            {
                WarehouseId = w.WarehouseId,
                Name = w.Name,
                Location = w.Location
            })
            .OrderBy(w => w.Name)
            .ToList();
    }

    public async Task<WarehouseDetailDTO?> GetByIdAsync(int warehouseId, CancellationToken cancellationToken = default)
    {
        var entity = await _warehouses.GetByIdAsync(warehouseId, cancellationToken);
        if (entity == null) return null;

        return new WarehouseDetailDTO
        {
            WarehouseId = entity.WarehouseId,
            Name = entity.Name,
            Location = entity.Location,
            CreatorId = entity.CreatorId
        };
    }
}


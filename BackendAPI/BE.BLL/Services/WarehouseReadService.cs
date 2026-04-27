namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class WarehouseReadService : IWarehouseReadService
{
    private readonly IWarehouseRepository _warehouses;
    private readonly IRepository<WarehouseStaff> _warehouseStaffs;

    public WarehouseReadService(IWarehouseRepository warehouses, IRepository<WarehouseStaff> warehouseStaffs)
    {
        _warehouses = warehouses;
        _warehouseStaffs = warehouseStaffs;
    }

    public async Task<IReadOnlyList<WarehouseSummaryDTO>> GetMineAsync(int userId, CancellationToken cancellationToken = default)
    {
        var memberships = await _warehouseStaffs.GetAsync(ws => ws.UserId == userId, cancellationToken);
        var warehouseIds = memberships.Select(ws => ws.WarehouseId).Distinct().ToList();
        if (warehouseIds.Count == 0) return Array.Empty<WarehouseSummaryDTO>();

        var warehouses = (await _warehouses.GetAsync(w => warehouseIds.Contains(w.WarehouseId), cancellationToken)).ToList();
        
        // EF Core DbContext is not thread-safe; avoid running multiple queries concurrently on the same scope.
        var productCounts = new Dictionary<int, int>(warehouses.Count);
        foreach (var warehouse in warehouses)
        {
            var count = await _warehouses.GetProductCountAsync(warehouse.WarehouseId, cancellationToken);
            productCounts[warehouse.WarehouseId] = count;
        }

        return warehouses
            .Select(w => new WarehouseSummaryDTO
            {
                WarehouseId = w.WarehouseId,
                Name = w.Name,
                Location = w.Location,
                urlimage = w.urlimage,
                lastUpdate = w.UpdatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
                productCount = productCounts.TryGetValue(w.WarehouseId, out var count) ? count.ToString() : "0"
            })
            .OrderBy(w => w.Name)
            .ToList();
    }

    public async Task<WarehouseDetailDTO?> GetByIdAsync(int warehouseId, CancellationToken cancellationToken = default)
    {
        var entity = await _warehouses.GetByIdAsync(warehouseId, cancellationToken);
        if (entity == null) return null;

        var productCount = await _warehouses.GetProductCountAsync(warehouseId, cancellationToken);

        return new WarehouseDetailDTO
        {
            WarehouseId = entity.WarehouseId,
            Name = entity.Name,
            Location = entity.Location,
            CreatorId = entity.CreatorId,
            urlimage = entity.urlimage,
            lastUpdate = entity.UpdatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
            productCount = productCount.ToString()
        };
    }
}


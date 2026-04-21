namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;

public interface IWarehouseReadService
{
    Task<IReadOnlyList<WarehouseSummaryDTO>> GetMineAsync(int userId, CancellationToken cancellationToken = default);
    Task<WarehouseDetailDTO?> GetByIdAsync(int warehouseId, CancellationToken cancellationToken = default);
}


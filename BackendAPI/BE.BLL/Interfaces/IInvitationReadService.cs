namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;

public interface IInvitationReadService
{
    Task<IReadOnlyList<WarehouseInvitationDTO>> GetByWarehouseAsync(int warehouseId, CancellationToken cancellationToken = default);
}


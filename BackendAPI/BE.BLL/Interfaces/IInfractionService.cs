namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.DAL.Entities;

public interface IInfractionService
{
    Task<IEnumerable<InfractionTicket>> GetMineAsync(int warehouseId, int userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<InfractionTicket>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default);
    Task<InfractionTicket> CreateAsync(int warehouseId, InfractionUpsertDTO model, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int warehouseId, int infractionId, InfractionUpsertDTO model, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int warehouseId, int infractionId, CancellationToken cancellationToken = default);
}


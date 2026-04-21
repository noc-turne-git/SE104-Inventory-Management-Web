namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class InfractionService : IInfractionService
{
    private readonly IRepository<InfractionTicket> _infractions;

    public InfractionService(IRepository<InfractionTicket> infractions)
    {
        _infractions = infractions;
    }

    public Task<IEnumerable<InfractionTicket>> GetMineAsync(int warehouseId, int userId, CancellationToken cancellationToken = default)
        => _infractions.GetAsync(i => i.WarehouseId == warehouseId && i.UserId == userId, cancellationToken);

    public Task<IEnumerable<InfractionTicket>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default)
        => _infractions.GetAsync(i => i.WarehouseId == warehouseId, cancellationToken);

    public async Task<InfractionTicket> CreateAsync(int warehouseId, InfractionUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var entity = new InfractionTicket
        {
            WarehouseId = warehouseId,
            UserId = model.UserId,
            Date = model.Date,
            Description = model.Description,
            Penalty = model.Penalty
        };

        await _infractions.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<bool> UpdateAsync(int warehouseId, int infractionId, InfractionUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var ticket = await _infractions.GetByIdAsync(infractionId, cancellationToken);
        if (ticket == null || ticket.WarehouseId != warehouseId) return false;

        ticket.UserId = model.UserId;
        ticket.Date = model.Date;
        ticket.Description = model.Description;
        ticket.Penalty = model.Penalty;

        return await _infractions.UpdateAsync(ticket, cancellationToken);
    }

    public async Task<bool> DeleteAsync(int warehouseId, int infractionId, CancellationToken cancellationToken = default)
    {
        var ticket = await _infractions.GetByIdAsync(infractionId, cancellationToken);
        if (ticket == null || ticket.WarehouseId != warehouseId) return false;

        return await _infractions.DeleteAsync(infractionId, cancellationToken);
    }
}


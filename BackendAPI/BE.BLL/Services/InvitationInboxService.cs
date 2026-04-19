namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class InvitationInboxService : IInvitationInboxService
{
    private readonly IRepository<Invitation> _invitations;
    private readonly IRepository<Warehouse> _warehouses;
    private readonly IRepository<User> _users;

    public InvitationInboxService(
        IRepository<Invitation> invitations,
        IRepository<Warehouse> warehouses,
        IRepository<User> users)
    {
        _invitations = invitations;
        _warehouses = warehouses;
        _users = users;
    }

    public async Task<IReadOnlyList<ReceivedInvitationDTO>> GetReceivedAsync(int userId, CancellationToken cancellationToken = default)
    {
        var invitations = await _invitations.GetAsync(i => i.InvitedUserId == userId, cancellationToken);
        if (!invitations.Any()) return Array.Empty<ReceivedInvitationDTO>();

        var warehouseIds = invitations.Select(i => i.WarehouseId).Distinct().ToList();
        var inviterIds = invitations.Select(i => i.InviterUserId).Distinct().ToList();

        var warehouses = await _warehouses.GetAsync(w => warehouseIds.Contains(w.WarehouseId), cancellationToken);
        var warehouseById = warehouses.ToDictionary(w => w.WarehouseId);

        var inviters = await _users.GetAsync(u => inviterIds.Contains(u.UserId), cancellationToken);
        var inviterById = inviters.ToDictionary(u => u.UserId);

        return invitations
            .Select(i =>
            {
                warehouseById.TryGetValue(i.WarehouseId, out var warehouse);
                inviterById.TryGetValue(i.InviterUserId, out var inviter);

                return new ReceivedInvitationDTO
                {
                    InvitationId = i.InvitationId,
                    WarehouseId = i.WarehouseId,
                    WarehouseName = warehouse?.Name ?? string.Empty,
                    WarehouseLocation = warehouse?.Location ?? string.Empty,
                    InviterUserId = i.InviterUserId,
                    InviterFullName = inviter?.FullName ?? string.Empty,
                    Role = i.Role,
                    Status = i.Status,
                    CreatedAt = i.CreatedAt
                };
            })
            .OrderByDescending(i => i.CreatedAt)
            .ToList();
    }
}


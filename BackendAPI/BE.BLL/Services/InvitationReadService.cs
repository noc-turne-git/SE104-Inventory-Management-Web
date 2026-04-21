namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class InvitationReadService : IInvitationReadService
{
    private readonly IRepository<Invitation> _invitations;
    private readonly IRepository<User> _users;

    public InvitationReadService(IRepository<Invitation> invitations, IRepository<User> users)
    {
        _invitations = invitations;
        _users = users;
    }

    public async Task<IReadOnlyList<WarehouseInvitationDTO>> GetByWarehouseAsync(int warehouseId, CancellationToken cancellationToken = default)
    {
        var invitations = await _invitations.GetAsync(i => i.WarehouseId == warehouseId, cancellationToken);
        var invitedUserIds = invitations.Select(i => i.InvitedUserId).Distinct().ToList();
        var inviterUserIds = invitations.Select(i => i.InviterUserId).Distinct().ToList();

        var userIds = invitedUserIds.Concat(inviterUserIds).Distinct().ToList();
        var users = userIds.Count == 0
            ? Array.Empty<User>()
            : await _users.GetAsync(u => userIds.Contains(u.UserId), cancellationToken);

        var userById = users.ToDictionary(u => u.UserId);

        return invitations
            .Select(i =>
            {
                userById.TryGetValue(i.InvitedUserId, out var invitedUser);
                userById.TryGetValue(i.InviterUserId, out var inviterUser);

                return new WarehouseInvitationDTO
                {
                    InvitationId = i.InvitationId,
                    WarehouseId = i.WarehouseId,
                    InvitedUserId = i.InvitedUserId,
                    InvitedFullName = invitedUser?.FullName ?? string.Empty,
                    InvitedEmail = invitedUser?.Email ?? string.Empty,
                    InviterUserId = i.InviterUserId,
                    InviterFullName = inviterUser?.FullName ?? string.Empty,
                    Role = i.Role,
                    Status = i.Status,
                    CreatedAt = i.CreatedAt
                };
            })
            .OrderByDescending(i => i.CreatedAt)
            .ToList();
    }
}


namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class InvitationInboxService : IInvitationInboxService
{
    private readonly IRepository<Invitation> _invitations;
    private readonly IRepository<Warehouse> _warehouses;
    private readonly IRepository<User> _users;
    
    private readonly IRepository<WarehouseStaff> _warehouseStaffRepository;
    private readonly IWarehouseStaffService _warehouseStaffService;

    public InvitationInboxService(
        IRepository<Invitation> invitations,
        IRepository<Warehouse> warehouses,
        IRepository<User> users,
        IRepository<WarehouseStaff> warehouseStaffRepository
        , IWarehouseStaffService warehouseStaffService)
    {
        _invitations = invitations;
        _warehouses = warehouses;
        _users = users;
        _warehouseStaffRepository =warehouseStaffRepository;
        _warehouseStaffService = warehouseStaffService;
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
            .Where(i=> i.Status == StatusCode.PENDING)
            .Select(i =>
            {
                warehouseById.TryGetValue(i.WarehouseId, out var warehouse);
                inviterById.TryGetValue(i.InviterUserId, out var inviter);

                return new ReceivedInvitationDTO
                {
                    id = i.InvitationId,
                    WarehouseId = i.WarehouseId,
                    WarehouseName = warehouse?.Name ?? string.Empty,
                    WarehouseLocation = warehouse?.Location ?? string.Empty,
                    InviterUserId = i.InviterUserId,
                    InviterFullName = inviter?.FullName ?? string.Empty,
                    Role = i.Role,
                    Status = i.Status,
                    sendTime = i.CreatedAt
                };
            })
            .OrderByDescending(i => i.sendTime)
            .ToList();
    }

    public async Task<bool> RejectAsync(int inviId, CancellationToken cancellationToken = default)
    {
        var invitations=await  _invitations.GetAsync(i=> i.InvitationId==inviId,cancellationToken);
        if (!invitations.Any()) return false;
        var invitation = invitations.FirstOrDefault();
        invitation.Status=StatusCode.REJECTED;
        return await _invitations.UpdateAsync(invitation);
    }

    public async Task<bool> AcceptAsync(int inviId,int userid, CancellationToken cancellationToken = default)
    {
        try
        {
            var invitations=await  _invitations.GetAsync(i=> i.InvitationId==inviId,cancellationToken);
            if (!invitations.Any()) return false;
            var invitation = invitations.FirstOrDefault();

            var user = await _users.GetByIdAsync(userid);
            if (user == null )  return false;

            
            if (user != null)
            {
                var existingStaff = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == invitation.WarehouseId && ws.UserId == user.UserId);
                if (existingStaff.Any()) return await Task.FromResult(false); // User is already staff
            }
            
            var res = await _warehouseStaffService.AddAsync(invitation, userid);
            Console.WriteLine($"rolestaff: {invitation.Role}");
            Console.WriteLine($"them staff vao ware house thanhcong? {res}");  
            if (!res) return false;
            invitation.Status=StatusCode.APPROVED;
            
            return await _invitations.UpdateAsync(invitation);
          
        }
        catch
        {
            return false;
        }
        
    }
}


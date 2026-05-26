namespace BackendAPI.BE.BLL.Services;
using AutoMapper;
using BackendAPI.BE.API.DTO;    
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.EntityFrameworkCore;
public class WarehouseService : IWarehouseService
{
    private readonly AppDbContext _context;
    private readonly IRepository<Warehouse> _warehouseRepository;
    private readonly IRepository<WarehouseStaff> _warehouseStaffRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly IRepository<Invitation> _invitationRepository;
    private readonly IWarehouseStaffService _warehouseStaffService;
    //private readonly IRepository<InviteToken> _inviteTokenRepository;

    public WarehouseService(AppDbContext context, IRepository<Warehouse> warehouseRepository, IRepository<WarehouseStaff> warehouseStaffRepository
    , IUserRepository userRepository, IMapper mapper, IEmailService emailService
    /*, IRepository<InviteToken> inviteTokenRepository*/, IRepository<Invitation> invitationRepository
    ,IWarehouseStaffService warehouseStaffService)
    {
        _context = context;
        _warehouseRepository = warehouseRepository;
        _warehouseStaffRepository = warehouseStaffRepository;
        _userRepository = userRepository;
        _mapper = mapper;
        _emailService = emailService;
        _invitationRepository = invitationRepository;
        _warehouseStaffService = warehouseStaffService;
       // _inviteTokenRepository=inviteTokenRepository;
    }

    public async Task<int> CreateWarehouseAsync(CreateWarehouseDTO model, int userid)
    {
        

        var warehouse = _mapper.Map<Warehouse>(model);
        warehouse.urlimage = model.urlimage;
        warehouse.CreatedAt = DateTime.UtcNow;
        warehouse.UpdatedAt = DateTime.UtcNow;
        warehouse.CreatorId = userid;
        warehouse = await _warehouseRepository.AddAsync(warehouse);
        var staff = new WarehouseStaff
        {
            WarehouseId = warehouse.WarehouseId,
            UserId = userid,
            RoleId = 1 // Assuming 1 is the role ID for the creator/owner
        };
        await _warehouseStaffRepository.AddAsync(staff);

        return warehouse.WarehouseId;
    }

    public async Task<WarehouseDetailDTO?> UpdateWarehouseAsync(int warehouseId, UpdateWarehouseDTO model)
    {
        var warehouse = await _warehouseRepository.GetByIdAsync(warehouseId);
        if (warehouse == null) return null;

        warehouse.Name = model.Name;
        warehouse.Location = model.Location;
        warehouse.urlimage = model.urlimage ?? warehouse.urlimage;
        warehouse.UpdatedAt = DateTime.UtcNow;

        var ok = await _warehouseRepository.UpdateAsync(warehouse);
        if (!ok) return null;

        return new WarehouseDetailDTO
        {
            WarehouseId = warehouse.WarehouseId,
            Name = warehouse.Name,
            Location = warehouse.Location,
            CreatorId = warehouse.CreatorId,
            urlimage = warehouse.urlimage,
            lastUpdate = warehouse.UpdatedAt.ToString("yyyy-MM-dd HH:mm:ss")
        };
    }

    public async Task<bool> DeleteWarehouseAsync(int warehouseId, CancellationToken cancellationToken = default)
    {
        var exists = await _context.Warehouses.AnyAsync(w => w.WarehouseId == warehouseId, cancellationToken);
        if (!exists) return false;

        await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        var noteIds = await _context.Notes
            .Where(n => n.WarehouseId == warehouseId)
            .Select(n => n.NoteId)
            .ToListAsync(cancellationToken);

        var productIds = await _context.Products
            .Where(p => p.WarehouseId == warehouseId)
            .Select(p => p.ProductId)
            .ToListAsync(cancellationToken);

        var supplierIds = await _context.Suppliers
            .Where(s => s.WarehouseId == warehouseId)
            .Select(s => s.SupplierId)
            .ToListAsync(cancellationToken);

        await _context.damageItems
            .Where(item => noteIds.Contains(item.NoteId) || productIds.Contains(item.ProductId))
            .ExecuteDeleteAsync(cancellationToken);
        await _context.receiptItems
            .Where(item => noteIds.Contains(item.NoteId) || productIds.Contains(item.ProductId))
            .ExecuteDeleteAsync(cancellationToken);
        await _context.deliveryItems
            .Where(item => noteIds.Contains(item.NoteId) || productIds.Contains(item.ProductId))
            .ExecuteDeleteAsync(cancellationToken);
        await _context.inventoryCheckItems
            .Where(item => noteIds.Contains(item.NoteId) || productIds.Contains(item.ProductId))
            .ExecuteDeleteAsync(cancellationToken);

        await _context.ProductSuppliers
            .Where(ps => productIds.Contains(ps.ProductId) || supplierIds.Contains(ps.SupplierId))
            .ExecuteDeleteAsync(cancellationToken);
        await _context.Notes
            .Where(n => n.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);
        await _context.InfractionTickets
            .Where(i => i.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);
        await _context.Invitations
            .Where(i => i.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);
        await _context.Shifts
            .Where(s => s.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);
        await _context.WarehouseStaffs
            .Where(ws => ws.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);
        await _context.Products
            .Where(p => p.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);
        await _context.Suppliers
            .Where(s => s.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);

        var deleted = await _context.Warehouses
            .Where(w => w.WarehouseId == warehouseId)
            .ExecuteDeleteAsync(cancellationToken);

        await transaction.CommitAsync(cancellationToken);
        return deleted > 0;
    }

    public async Task<InviteResponseDTO> InviteStaffAsync(InviteStaffDTO model, int inviterUserId)
    {
        var user = await _userRepository.GetByEmailAsync(model.Email);
        var warehouse = await _warehouseRepository.GetByIdAsync(model.WarehouseId);
        if (warehouse == null) return null; // Warehouse does not exist
        
        if (user == null) return null; // User does not exist

        var existingStaff = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == model.WarehouseId && ws.UserId == user.UserId);
        //var invitations = await _cacheService.GetAsync<Invitation>($"invitations:warehouse:{model.WarehouseId}:user:{user.UserId}");
        var existingInvitation = await _invitationRepository.GetAsync(i => i.WarehouseId == model.WarehouseId && i.InvitedUserId == user.UserId);
        if (existingInvitation.Any()) return null; // Invitation already exists
        
        if (existingStaff.Any()) return null; // User is already staff
        
        var invitation = new Invitation
        {
            WarehouseId = model.WarehouseId,
            InvitedUserId = user.UserId,
            InviterUserId = inviterUserId,
            Role = model.Role,
            CreatedAt = DateTime.UtcNow,
            Status = StatusCode.PENDING
        };
        invitation =await _invitationRepository.AddAsync(invitation);

        var invitationR = new InviteResponseDTO
        {
            id = invitation.InvitationId,
            sendTime = invitation.CreatedAt.ToString(),
            ownerID = warehouse.CreatorId.ToString(),
            warehouseId = warehouse.WarehouseId,
            warehouseName = warehouse.Name,
            role = invitation.Role
            //imageUrl = warehouse.image
        };
        return invitationR;
    }

    // public async Task<bool> JoinWarehouse(JoinWarehouseDTO model, int userId)
    // {
    //      var user = await _userRepository.GetByIdAsync(userId);
    //      if (user == null )  return false;

        
    //     if (user != null)
    //     {
    //          var existingStaff = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == model.WarehouseId && ws.UserId == user.UserId);
    //         if (existingStaff.Any()) return await Task.FromResult(false); // User is already staff
    //     }
        
    //     await _warehouseStaffService.AddAsync(model, userId);        

    //      var invitations = await _invitationRepository.GetAsync(i => i.WarehouseId == model.WarehouseId && i.InvitedUserId == user.UserId);
    //      var invitation = invitations.FirstOrDefault();
    //      if (invitation != null)
    //      {
    //         await _invitationRepository.DeleteAsync(invitation.InvitationId);
    //      }
    //      return true;
    // }

}

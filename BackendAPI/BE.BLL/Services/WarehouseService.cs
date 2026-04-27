namespace BackendAPI.BE.BLL.Services;
using AutoMapper;
using BackendAPI.BE.API.DTO;    
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
public class WarehouseService : IWarehouseService
{
    private readonly IRepository<Warehouse> _warehouseRepository;
    private readonly IRepository<WarehouseStaff> _warehouseStaffRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly IRepository<Invitation> _invitationRepository;
    private readonly IWarehouseStaffService _warehouseStaffService;
    //private readonly IRepository<InviteToken> _inviteTokenRepository;

    public WarehouseService(IRepository<Warehouse> warehouseRepository, IRepository<WarehouseStaff> warehouseStaffRepository
    , IUserRepository userRepository, IMapper mapper, IEmailService emailService
    /*, IRepository<InviteToken> inviteTokenRepository*/, IRepository<Invitation> invitationRepository
    ,IWarehouseStaffService warehouseStaffService)
    {
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

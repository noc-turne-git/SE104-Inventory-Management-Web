namespace BackendAPI.BE.BLL.Services;
using AutoMapper;
using BackendAPI.BE.API.DTO;    
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.BLL.Interfaces;
public class WarehouseService : IWarehouseService
{
    private readonly IRepository<Warehouse> _warehouseRepository;
    private readonly IRepository<WarehouseStaff> _warehouseStaffRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;

    public WarehouseService(IRepository<Warehouse> warehouseRepository, IRepository<WarehouseStaff> warehouseStaffRepository
    , IUserRepository userRepository, IMapper mapper, IEmailService emailService)
    {
        _warehouseRepository = warehouseRepository;
        _warehouseStaffRepository = warehouseStaffRepository;
        _userRepository = userRepository;
        _mapper = mapper;
        _emailService = emailService;
    }

    public async Task<bool> CreateWarehouseAsync(CreateWarehouseDTO model)
    {
        var warehouse = _mapper.Map<Warehouse>(model);
        await _warehouseRepository.AddAsync(warehouse);
        var staff = new WarehouseStaff
        {
            WarehouseId = warehouse.WarehouseId,
            UserId = model.CreatorId,
            Role = "Manager"
        };
        await _warehouseStaffRepository.AddAsync(staff);

        return await Task.FromResult(true);
    }

    public async Task<bool> InviteStaffAsync(InviteStaffDTO model)
    {
        var user = await _userRepository.GetByEmailAsync(model.Email);
        var warehouse = await _warehouseRepository.GetByIdAsync(model.WarehouseId);
        if (warehouse == null) return await Task.FromResult(false); // Warehouse does not exist
        
        if (user != null)
        {
            var existingStaff = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == model.WarehouseId && ws.UserId == user.UserId);
            if (existingStaff != null) return await Task.FromResult(false); // User is already staff
        }

        await _emailService.SendInvitationEmailAsync(model.Email, warehouse.Name);

        return await Task.FromResult(true);
    }

}
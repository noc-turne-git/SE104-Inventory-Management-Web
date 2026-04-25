namespace BackendAPI.BE.BLL.Services;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class WarehouseStaffService : IWarehouseStaffService
{
    private readonly IRepository<WarehouseStaff> _warehouseStaffRepository;
    private readonly IRepository<Role> _roleRepository;
    private readonly IRepository<User> _userRepository;


    public WarehouseStaffService(
        IRepository<WarehouseStaff> warehouseStaffRepository,
        IRepository<Role> roleRepository,
        IRepository<User> userRepository)
    {
        _warehouseStaffRepository = warehouseStaffRepository;
        _roleRepository = roleRepository;
        _userRepository = userRepository;
    }

    public async Task<bool> AddAsync(Invitation model, int userId, CancellationToken cancellationToken = default)
    {
        var rolename= model.Role.ToUpper();
        var roleEntitys = await _roleRepository.GetAsync(r => r.RoleName == rolename, cancellationToken);
        
        var roleEntity = roleEntitys.FirstOrDefault();
        Console.Write($"role: {roleEntity.RoleName}");
        if (roleEntity == null)
        {
            
            // throw new InvalidOperationException("Role not found");
            return false;
        }

        var entity = new WarehouseStaff
        {
            UserId = userId,
            WarehouseId = model.WarehouseId,
            RoleId = roleEntity.RoleId
        };

        var warehouseStaff=await _warehouseStaffRepository.AddAsync(entity, cancellationToken);
        if (warehouseStaff == null)
        {
            return false;
        }
        return true;
    }

    public async Task<IEnumerable<WarehouseStaffSearchResultDTO>> SearchAsync(int warehouseId, string? query, int limit = 20, CancellationToken cancellationToken = default)
    {
        limit = Math.Clamp(limit, 1, 100);
        query = query?.Trim();

        var roles = await _roleRepository.GetAllAsync(cancellationToken);
        var roleNameById = roles.ToDictionary(r => r.RoleId, r => r.RoleName);

        if (string.IsNullOrWhiteSpace(query))
        {
            var warehouseStaffs = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == warehouseId, cancellationToken);
            var userIds = warehouseStaffs.Select(ws => ws.UserId).Distinct().ToList();

            if (userIds.Count == 0) return Array.Empty<WarehouseStaffSearchResultDTO>();

            var users = await _userRepository.GetAsync(u => userIds.Contains(u.UserId), cancellationToken);
            var userById = users.ToDictionary(u => u.UserId);

            return warehouseStaffs
                .Select(ws =>
                {
                    userById.TryGetValue(ws.UserId, out var user);
                    roleNameById.TryGetValue(ws.RoleId, out var roleName);
                    return new WarehouseStaffSearchResultDTO
                    {
                        UserId = ws.UserId,
                        FullName = user?.FullName ?? string.Empty,
                        Email = user?.Email ?? string.Empty,
                        Phone = user?.Phone ?? string.Empty,
                        RoleId = ws.RoleId,
                        RoleName = roleName ?? string.Empty
                    };
                })
                .OrderBy(r => r.FullName)
                .ThenBy(r => r.Email)
                .Take(limit);
        }

        var matchedUsers = await _userRepository.GetAsync(
            u => u.FullName.Contains(query) || u.Email.Contains(query) || u.Phone.Contains(query),
            cancellationToken);

        var matchedUserIds = matchedUsers.Select(u => u.UserId).Distinct().ToList();
        if (matchedUserIds.Count == 0) return Array.Empty<WarehouseStaffSearchResultDTO>();

        var staffs = await _warehouseStaffRepository.GetAsync(
            ws => ws.WarehouseId == warehouseId && matchedUserIds.Contains(ws.UserId),
            cancellationToken);

        var matchedUserById = matchedUsers.ToDictionary(u => u.UserId);

        return staffs
            .Select(ws =>
            {
                matchedUserById.TryGetValue(ws.UserId, out var user);
                roleNameById.TryGetValue(ws.RoleId, out var roleName);
                return new WarehouseStaffSearchResultDTO
                {
                    UserId = ws.UserId,
                    FullName = user?.FullName ?? string.Empty,
                    Email = user?.Email ?? string.Empty,
                    Phone = user?.Phone ?? string.Empty,
                    RoleId = ws.RoleId,
                    RoleName = roleName ?? string.Empty
                };
            })
            .OrderBy(r => r.FullName)
            .ThenBy(r => r.Email)
            .Take(limit);
    }
}

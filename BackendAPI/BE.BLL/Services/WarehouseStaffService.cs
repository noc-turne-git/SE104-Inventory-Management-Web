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
    private readonly IRepository<InfractionTicket> _infractionRepository;


    public WarehouseStaffService(
        IRepository<WarehouseStaff> warehouseStaffRepository,
        IRepository<Role> roleRepository,
        IRepository<User> userRepository,
        IRepository<InfractionTicket> infractionRepository)
    {
        _warehouseStaffRepository = warehouseStaffRepository;
        _roleRepository = roleRepository;
        _userRepository = userRepository;
        _infractionRepository = infractionRepository;
    }

    public async Task<bool> AddAsync(Invitation model, int userId, CancellationToken cancellationToken = default)
    {
        var roleEntity = await ResolveAssignableRoleAsync(model.Role, cancellationToken);
        if (roleEntity == null)
        {
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

    public async Task<IEnumerable<WarehouseStaffDetailDTO>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default)
    {
        var warehouseStaffs = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == warehouseId, cancellationToken);
        if (!warehouseStaffs.Any()) return Array.Empty<WarehouseStaffDetailDTO>();

        var userIds = warehouseStaffs.Select(ws => ws.UserId).Distinct().ToList();
        var users = await _userRepository.GetAsync(u => userIds.Contains(u.UserId), cancellationToken);
        var userById = users.ToDictionary(u => u.UserId);

        var roles = await _roleRepository.GetAllAsync(cancellationToken);
        var roleNameById = roles.ToDictionary(r => r.RoleId, r => r.RoleName);

        var infractions = await _infractionRepository.GetAsync(t => t.WarehouseId == warehouseId && userIds.Contains(t.UserId), cancellationToken);
        var infractionsByUserId = infractions
            .GroupBy(i => i.UserId)
            .ToDictionary(g => g.Key, g => g.OrderByDescending(x => x.Date).ToList());

        return warehouseStaffs
            .Select(ws => MapDetail(ws, userById, roleNameById, infractionsByUserId))
            .OrderBy(s => s.Name)
            .ThenBy(s => s.Email);
    }

    public async Task<WarehouseStaffDetailDTO?> GetByUserIdAsync(int warehouseId, int userId, CancellationToken cancellationToken = default)
    {
        var warehouseStaffs = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == warehouseId && ws.UserId == userId, cancellationToken);
        var wsEntity = warehouseStaffs.FirstOrDefault();
        if (wsEntity == null) return null;

        var user = await _userRepository.GetByIdAsync(userId, cancellationToken);
        if (user == null) return null;

        var roles = await _roleRepository.GetAllAsync(cancellationToken);
        var roleNameById = roles.ToDictionary(r => r.RoleId, r => r.RoleName);

        var infractions = await _infractionRepository.GetAsync(t => t.WarehouseId == warehouseId && t.UserId == userId, cancellationToken);
        var infractionsByUserId = new Dictionary<int, List<InfractionTicket>> { [userId] = infractions.OrderByDescending(i => i.Date).ToList() };

        return MapDetail(wsEntity, new Dictionary<int, User> { [userId] = user }, roleNameById, infractionsByUserId);
    }

    public async Task<WarehouseStaffDetailDTO?> CreateAsync(int warehouseId, WarehouseStaffCreateDTO model, CancellationToken cancellationToken = default)
    {
        var email = model.Email.Trim();
        if (string.IsNullOrWhiteSpace(email)) return null;

        var users = await _userRepository.GetAsync(u => u.Email == email, cancellationToken);
        var user = users.FirstOrDefault();
        if (user == null) return null;

        var existingStaff = await _warehouseStaffRepository.GetAsync(
            ws => ws.WarehouseId == warehouseId && ws.UserId == user.UserId,
            cancellationToken);
        if (existingStaff.Any()) return null;

        var role = await ResolveAssignableRoleAsync(model.Role, cancellationToken);
        if (role == null) return null;

        var entity = new WarehouseStaff
        {
            WarehouseId = warehouseId,
            UserId = user.UserId,
            RoleId = role.RoleId,
            AccountStatus = string.IsNullOrWhiteSpace(model.AccountStatus) ? "Active" : model.AccountStatus,
            Salary = model.Salary ?? 0,
            HireDate = model.HireDate ?? DateTime.UtcNow
        };

        await _warehouseStaffRepository.AddAsync(entity, cancellationToken);
        return await GetByUserIdAsync(warehouseId, user.UserId, cancellationToken);
    }

    public async Task<bool> UpdateAsync(int warehouseId, int userId, WarehouseStaffUpdateDTO model, CancellationToken cancellationToken = default)
    {
        var matches = await _warehouseStaffRepository.GetAsync(ws => ws.WarehouseId == warehouseId && ws.UserId == userId, cancellationToken);
        var entity = matches.FirstOrDefault();
        if (entity == null) return false;

        if (model.AccountStatus != null) entity.AccountStatus = model.AccountStatus;
        if (model.Salary.HasValue) entity.Salary = model.Salary.Value;
        if (model.HireDate.HasValue) entity.HireDate = model.HireDate.Value;
        if (!string.IsNullOrWhiteSpace(model.Role) && entity.RoleId != 1)
        {
            var role = await ResolveAssignableRoleAsync(model.Role, cancellationToken);
            if (role == null) return false;
            entity.RoleId = role.RoleId;
        }

        return await _warehouseStaffRepository.UpdateAsync(entity, cancellationToken);
    }

    public async Task<bool> DeleteAsync(int warehouseId, int userId, CancellationToken cancellationToken = default)
    {
        var entity = await _warehouseStaffRepository.GetByIdAsync(warehouseId, userId, cancellationToken);
        if (entity == null || entity.RoleId == 1) return false;

        await _warehouseStaffRepository.DeleteAsync(warehouseId, userId, cancellationToken);
        return true;
    }

    private async Task<Role?> ResolveAssignableRoleAsync(string? role, CancellationToken cancellationToken)
    {
        var roleName = string.IsNullOrWhiteSpace(role) ? "STAFF" : role.Trim().ToUpperInvariant();
        if (roleName == "OWNER") return null;
        if (roleName != "MANAGER" && roleName != "STAFF") return null;

        var roles = await _roleRepository.GetAsync(r => r.RoleName == roleName, cancellationToken);
        return roles.FirstOrDefault();
    }

    private static WarehouseStaffDetailDTO MapDetail(
        WarehouseStaff ws,
        Dictionary<int, User> userById,
        Dictionary<int, string> roleNameById,
        Dictionary<int, List<InfractionTicket>> infractionsByUserId)
    {
        userById.TryGetValue(ws.UserId, out var user);
        roleNameById.TryGetValue(ws.RoleId, out var roleNameRaw);
        infractionsByUserId.TryGetValue(ws.UserId, out var infractions);

        var role = string.Equals(roleNameRaw, "MANAGER", StringComparison.OrdinalIgnoreCase)
                   || string.Equals(roleNameRaw, "OWNER", StringComparison.OrdinalIgnoreCase)
            ? "Manager"
            : "Staff";

        return new WarehouseStaffDetailDTO
        {
            Id = ws.UserId.ToString(),
            Name = user?.FullName ?? string.Empty,
            Email = user?.Email ?? string.Empty,
            Role = role,
            AccountStatus = ws.AccountStatus,
            Salary = ws.Salary,
            HireDate = ws.HireDate == default ? string.Empty : ws.HireDate.ToString("yyyy-MM-dd"),
            Dob = user == null ? null : user.Dob.ToString("yyyy-MM-dd"),
            Phone = user?.Phone,
            Address = user?.Address,
            Infractions = (infractions ?? new List<InfractionTicket>())
                .Select(i => new StaffInfractionDTO
                {
                    Id = i.InfractionTicketId.ToString(),
                    Datetime = i.Date.ToString("O"),
                    Reason = i.Description,
                    Penalty = i.Penalty
                })
                .ToList()
        };
    }
}

namespace BackendAPI.Infrastructure.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BackendAPI.BE.DAL.Data;

public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
{
    private readonly AppDbContext _db; // Inject DbContext của nhóm vào đây
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PermissionHandler(AppDbContext db, IHttpContextAccessor httpContextAccessor)
    {
        _db = db;
        _httpContextAccessor = httpContextAccessor;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
    {
        //[cite_start]// 1. Lấy UserId từ JWT (đã được xác thực) [cite: 94]
        var userId = int.Parse(context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        // 2. Lấy WarehouseId từ Route (ví dụ: api/warehouses/{warehouseId}/products)
        var routeData = _httpContextAccessor.HttpContext.GetRouteData();
        var warehouseId = int.Parse(routeData.Values["warehouseId"]?.ToString());

        // 3. Query DB để kiểm tra quyền
        // Kiểm tra xem User có Role nào tại Warehouse này mà có chứa PermissionCode tương ứng không
        var hasPermission = await (from uwr in _db.WarehouseStaffs
                                   join rp in _db.RolePermissions on uwr.RoleId equals rp.RoleId
                                   join p in _db.Permissions on rp.PermissionId equals p.PermissionId
                                   //join r in _db.Roles on uwr.RoleId equals r.RoleId
                                   where uwr.UserId == userId 
                                      && uwr.WarehouseId == warehouseId 
                                      && p.PermissionCode == requirement.Permission
                                   select rp).AnyAsync();

        if (hasPermission)
        {
            context.Succeed(requirement); // Cho phép đi tiếp
        }
        else
        {
            context.Fail(); // Trả về 403 Forbidden 
        }
    }
}
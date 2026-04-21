namespace BackendAPI.Infrastructure.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Constants;

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
        if (!int.TryParse(context.User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
        {
            context.Fail();
            return;
        }

        // 2. Lấy WarehouseId từ Route (ví dụ: api/warehouses/{warehouseId}/products)
        var routeData = _httpContextAccessor.HttpContext?.GetRouteData();
        var warehouseIdRaw = routeData?.Values["warehouseId"]?.ToString();

        // Một số permission không gắn với 1 warehouse cụ thể (vd: liệt kê các warehouse mà user là thành viên).
        // Trong trường hợp route không có {warehouseId}, chỉ cho phép các policy dạng "global" được xử lý ở đây.
        if (!int.TryParse(warehouseIdRaw, out var warehouseId))
        {
            if (requirement.Permission != PermissionCode.WAREHOUSE_VIEW)
            {
                context.Fail();
                return;
            }

            var hasAnyWarehousePermission = await (from uwr in _db.WarehouseStaffs
                                                  join rp in _db.RolePermissions on uwr.RoleId equals rp.RoleId
                                                  join p in _db.Permissions on rp.PermissionId equals p.PermissionId
                                                  where uwr.UserId == userId
                                                        && p.PermissionCode == requirement.Permission
                                                  select rp).AnyAsync();

            if (hasAnyWarehousePermission) context.Succeed(requirement);
            else context.Fail();

            return;
        }

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

namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/dashboard")]
public class WarehouseDashboardController : ControllerBase
{
    private readonly IDashboardService _dashboard;

    public WarehouseDashboardController(IDashboardService dashboard)
    {
        _dashboard = dashboard;
    }

    [HttpGet("manager")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_ALL)]
    public async Task<IActionResult> GetManagerDashboard(
        int warehouseId,
        [FromQuery] int? revenueYear,
        [FromQuery] int? topProductsYear,
        [FromQuery] int? topProductsMonth,
        CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var data = await _dashboard.GetManagerDashboardAsync(
            warehouseId,
            userId,
            revenueYear,
            topProductsYear,
            topProductsMonth,
            cancellationToken);
        return Ok(data);
    }

    [HttpGet("staff")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_OWN)]
    public async Task<IActionResult> GetStaffDashboard(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var data = await _dashboard.GetStaffDashboardAsync(warehouseId, userId, cancellationToken);
        return Ok(data);
    }
}

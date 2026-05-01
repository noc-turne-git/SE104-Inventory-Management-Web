namespace BackendAPI.BE.API.Controllers;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/staff")]
public class WarehouseStaffController : ControllerBase
{
    private readonly IWarehouseStaffService _staffs;

    public WarehouseStaffController(IWarehouseStaffService staffs)
    {
        _staffs = staffs;
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.STAFF_VIEW)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _staffs.GetAllAsync(warehouseId, cancellationToken);
        return Ok(items);
    }

    [HttpGet("{userId:int}")]
    [Authorize(Policy = PermissionCode.STAFF_VIEW)]
    public async Task<IActionResult> GetByUserId(int warehouseId, int userId, CancellationToken cancellationToken)
    {
        var item = await _staffs.GetByUserIdAsync(warehouseId, userId, cancellationToken);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPut("{userId:int}")]
    [Authorize(Policy = PermissionCode.STAFF_MANAGE)]
    public async Task<IActionResult> Update(int warehouseId, int userId, WarehouseStaffUpdateDTO model, CancellationToken cancellationToken)
    {
        var ok = await _staffs.UpdateAsync(warehouseId, userId, model, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }
}


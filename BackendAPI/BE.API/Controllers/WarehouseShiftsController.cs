namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/shifts")]
public class WarehouseShiftsController : ControllerBase
{
    private readonly IShiftService _shifts;

    public WarehouseShiftsController(IShiftService shifts)
    {
        _shifts = shifts;
    }

    [HttpGet("mine")]
    [Authorize(Policy = PermissionCode.SHIFT_VIEW)]
    public async Task<IActionResult> GetMine(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = await _shifts.GetMineAsync(warehouseId, userId, cancellationToken);
        return Ok(items);
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _shifts.GetAllAsync(warehouseId, cancellationToken);
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> Create(int warehouseId, ShiftUpsertDTO model, CancellationToken cancellationToken)
    {
        var entity = await _shifts.CreateAsync(warehouseId, model, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { warehouseId }, entity);
    }

    [HttpPut("{shiftId:int}")]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> Update(int warehouseId, int shiftId, ShiftUpsertDTO model, CancellationToken cancellationToken)
    {
        var ok = await _shifts.UpdateAsync(warehouseId, shiftId, model, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }

    [HttpDelete("{shiftId:int}")]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> Delete(int warehouseId, int shiftId, CancellationToken cancellationToken)
    {
        var ok = await _shifts.DeleteAsync(warehouseId, shiftId, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }
}

namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/infractions")]
public class WarehouseInfractionsController : ControllerBase
{
    private readonly IInfractionService _infractions;

    public WarehouseInfractionsController(IInfractionService infractions)
    {
        _infractions = infractions;
    }

    [HttpGet("mine")]
    [Authorize(Policy = PermissionCode.INFRACTION_VIEW)]
    public async Task<IActionResult> GetMine(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = await _infractions.GetMineAsync(warehouseId, userId, cancellationToken);
        return Ok(items);
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.INFRACTION_MANAGE)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _infractions.GetAllAsync(warehouseId, cancellationToken);
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = PermissionCode.INFRACTION_MANAGE)]
    public async Task<IActionResult> Create(int warehouseId, InfractionUpsertDTO model, CancellationToken cancellationToken)
    {
        var entity = await _infractions.CreateAsync(warehouseId, model, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { warehouseId }, entity);
    }

    [HttpPut("{infractionId:int}")]
    [Authorize(Policy = PermissionCode.INFRACTION_MANAGE)]
    public async Task<IActionResult> Update(int warehouseId, int infractionId, InfractionUpsertDTO model, CancellationToken cancellationToken)
    {
        var ok = await _infractions.UpdateAsync(warehouseId, infractionId, model, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }

    [HttpDelete("{infractionId:int}")]
    [Authorize(Policy = PermissionCode.INFRACTION_MANAGE)]
    public async Task<IActionResult> Delete(int warehouseId, int infractionId, CancellationToken cancellationToken)
    {
        var ok = await _infractions.DeleteAsync(warehouseId, infractionId, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }
}

namespace BackendAPI.BE.API.Controllers;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/suppliers")]
public class WarehouseSuppliersController : ControllerBase
{
    private readonly ISupplierService _suppliers;

    public WarehouseSuppliersController(ISupplierService suppliers)
    {
        _suppliers = suppliers;
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.SUPPLIER_VIEW)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _suppliers.GetAllAsync(warehouseId, cancellationToken);
        return Ok(items);
    }

    [HttpGet("{supplierId:int}")]
    [Authorize(Policy = PermissionCode.SUPPLIER_VIEW)]
    public async Task<IActionResult> GetById(int warehouseId, int supplierId, CancellationToken cancellationToken)
    {
        var supplier = await _suppliers.GetByIdAsync(warehouseId, supplierId, cancellationToken);
        if (supplier == null) return NotFound();
        return Ok(supplier);
    }

    [HttpGet("search")]
    [Authorize(Policy = PermissionCode.SUPPLIER_VIEW)]
    public async Task<IActionResult> Search(
        int warehouseId,
        [FromQuery] string? q,
        [FromQuery] int limit = 20,
        CancellationToken cancellationToken = default)
    {
        var items = await _suppliers.SearchAsync(warehouseId, q, limit, cancellationToken);
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = PermissionCode.SUPPLIER_MANAGE)]
    public async Task<IActionResult> Create(int warehouseId, SupplierUpsertDTO model, CancellationToken cancellationToken)
    {
        var entity = await _suppliers.CreateAsync(warehouseId, model, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { warehouseId, supplierId = entity.SupplierId }, entity);
    }

    [HttpPut("{supplierId:int}")]
    [Authorize(Policy = PermissionCode.SUPPLIER_MANAGE)]
    public async Task<IActionResult> Update(int warehouseId, int supplierId, SupplierUpsertDTO model, CancellationToken cancellationToken)
    {
        var ok = await _suppliers.UpdateAsync(warehouseId, supplierId, model, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }

    [HttpDelete("{supplierId:int}")]
    [Authorize(Policy = PermissionCode.SUPPLIER_MANAGE)]
    public async Task<IActionResult> Delete(int warehouseId, int supplierId, CancellationToken cancellationToken)
    {
        var ok = await _suppliers.DeleteAsync(warehouseId, supplierId, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }
}

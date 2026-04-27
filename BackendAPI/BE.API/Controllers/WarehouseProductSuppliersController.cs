namespace BackendAPI.BE.API.Controllers;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/product-suppliers")]
public class WarehouseProductSuppliersController : ControllerBase
{
    private readonly IProductSupplierService _productSuppliers;

    public WarehouseProductSuppliersController(IProductSupplierService productSuppliers)
    {
        _productSuppliers = productSuppliers;
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _productSuppliers.GetAllAsync(warehouseId, cancellationToken);
        return Ok(items);
    }

    [HttpGet("by-product/{productId:int}")]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> GetByProductId(int warehouseId, int productId, CancellationToken cancellationToken)
    {
        var items = await _productSuppliers.GetByProductIdAsync(warehouseId, productId, cancellationToken);
        return Ok(items);
    }

    [HttpGet("by-supplier/{supplierId:int}")]
    [Authorize(Policy = PermissionCode.SUPPLIER_VIEW)]
    public async Task<IActionResult> GetBySupplierId(int warehouseId, int supplierId, CancellationToken cancellationToken)
    {
        var items = await _productSuppliers.GetBySupplierIdAsync(warehouseId, supplierId, cancellationToken);
        return Ok(items);
    }

    [HttpGet("{productId:int}/{supplierId:int}")]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> GetById(int warehouseId, int productId, int supplierId, CancellationToken cancellationToken)
    {
        var item = await _productSuppliers.GetByIdAsync(warehouseId, productId, supplierId, cancellationToken);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = PermissionCode.PRODUCT_ADD)]
    public async Task<IActionResult> Upsert(int warehouseId, ProductSupplierUpsertDTO model, CancellationToken cancellationToken)
    {
        var item = await _productSuppliers.UpsertAsync(warehouseId, model, cancellationToken);
        return Ok(item);
    }

    [HttpDelete("{productId:int}/{supplierId:int}")]
    [Authorize(Policy = PermissionCode.PRODUCT_DELETE)]
    public async Task<IActionResult> Delete(int warehouseId, int productId, int supplierId, CancellationToken cancellationToken)
    {
        var ok = await _productSuppliers.DeleteAsync(warehouseId, productId, supplierId, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }
}


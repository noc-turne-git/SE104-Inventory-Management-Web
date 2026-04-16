namespace BackendAPI.BE.API.Controllers;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/products")]
public class WarehouseProductsController : ControllerBase
{
    private readonly IProductService _products;

    public WarehouseProductsController(IProductService products)
    {
        _products = products;
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _products.GetAllByWarehouseAsync(warehouseId, cancellationToken);
        return Ok(items);
    }

    [HttpGet("{productId:int}")]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> GetById(int warehouseId, int productId, CancellationToken cancellationToken)
    {
        var product = await _products.GetByIdAsync(warehouseId, productId, cancellationToken);
        if (product == null) return NotFound();

        return Ok(product);
    }

    [HttpGet("search")]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> Search(
        int warehouseId,
        [FromQuery] string? q,
        [FromQuery] int limit = 20,
        CancellationToken cancellationToken = default)
    {
        var items = await _products.SearchAsync(warehouseId, q, limit, cancellationToken);
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = PermissionCode.PRODUCT_ADD)]
    public async Task<IActionResult> Create(int warehouseId, ProductDTO model, CancellationToken cancellationToken)
    {
        var entity = await _products.CreateAsync(warehouseId, model, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { warehouseId, productId = entity.ProductId }, entity);
    }

    [HttpDelete("{productId:int}")]
    [Authorize(Policy = PermissionCode.PRODUCT_DELETE)]
    public async Task<IActionResult> Delete(int warehouseId, int productId, CancellationToken cancellationToken)
    {
        var ok = await _products.DeleteAsync(warehouseId, productId, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }
}

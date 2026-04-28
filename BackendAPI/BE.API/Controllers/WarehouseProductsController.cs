namespace BackendAPI.BE.API.Controllers;

using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/products")]
public class WarehouseProductsController : ControllerBase
{
    private readonly IProductService _products;
    private readonly IMapper _mapper;

    public WarehouseProductsController(IProductService products, IMapper mapper)
    {
        _products = products;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _products.GetAllByWarehouseAsync(warehouseId, cancellationToken);
        var dtos = items.Select(Map).ToList();
        return Ok(dtos);
    }

    [HttpGet("{productId:int}")]
    [Authorize(Policy = PermissionCode.PRODUCT_VIEW)]
    public async Task<IActionResult> GetById(int warehouseId, int productId, CancellationToken cancellationToken)
    {
        var product = await _products.GetByIdAsync(warehouseId, productId, cancellationToken);
        if (product == null) return NotFound();

        return Ok(Map(product));
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
        var dtos = items.Select(Map).ToList();
        return Ok(dtos);
    }

    [HttpPost]
    [Authorize(Policy = PermissionCode.PRODUCT_ADD)]
    public async Task<IActionResult> Create(int warehouseId, ProductDTO model, CancellationToken cancellationToken)
    {
        var entity = await _products.CreateAsync(warehouseId, model, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { warehouseId, productId = entity.ProductId }, Map(entity));
    }

    [HttpDelete("{productId:int}")]
    [Authorize(Policy = PermissionCode.PRODUCT_DELETE)]
    public async Task<IActionResult> Delete(int warehouseId, int productId, CancellationToken cancellationToken)
    {
        var ok = await _products.DeleteAsync(warehouseId, productId, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }

    private ProductDTO Map(BackendAPI.BE.DAL.Entities.Product product)
    {
        var dto = _mapper.Map<ProductDTO>(product);
        dto.Status = GetStatus(dto.StockQuantity);
        return dto;
    }

    private static string GetStatus(int stockQuantity)
    {
        if (stockQuantity <= 0) return "out of stock";
        if (stockQuantity <= 20) return "low stock";
        return "in stock";
    }
}

namespace BackendAPI.BE.API.Controllers;
using BackendAPI.BE.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using BackendAPI.BE.API.DTO;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    
    public ProductController(IProductService productService)
    {
        _productService = productService;
    }
    

    
    [HttpGet("all-products")]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _productService.GetAllProductsAsync();
        return Ok(products);
    }

    [HttpPost("add-product")]
    public async Task<IActionResult> AddProduct(ProductDTO productDTO)
    {
        var result = await _productService.AddProductAsync(productDTO);
        if (!result)
            return BadRequest(new { Success = false, Message = "Failed to add product." });
        return Ok(new { Success = true, Message = "Product added successfully." });
    }
}

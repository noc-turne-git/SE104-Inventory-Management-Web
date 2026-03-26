namespace BackendAPI.BE.API.Controllers;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using BackendAPI.BE.API.DTO;
using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    
    public ProductController(IProductService productService, IHttpContextAccessor httpContextAccessor)
    {
        _productService = productService;
    }
    

    
    [HttpGet("all-products")]
    public IActionResult GetAllProducts()
    {
        
        var products = _productService.GetAllProductsAsync().Result;
        return Ok(products);
    }

    [HttpPost("add-product")]
    public IActionResult AddProduct(ProductDTO productDTO)
    {
        var result = _productService.AddProductAsync(productDTO).Result;
        if (!result)
            return BadRequest(new { Success = false, Message = "Failed to add product." });
        return Ok(new { Success = true, Message = "Product added successfully." });
    }
}

using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.BE.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class WarehouseController : ControllerBase
{
    private readonly IWarehouseService _warehouseService;
    private readonly IWarehouseStaffService _warehouseStaffs;
    private readonly IWarehouseReadService _warehouseReads;
    private readonly IWebHostEnvironment _environment;

    public WarehouseController(IWarehouseService warehouseService
    , IWarehouseStaffService warehouseStaffs
    , IWarehouseReadService warehouseReads
    , IWebHostEnvironment environment)
    {
        _warehouseService = warehouseService;
        _warehouseStaffs = warehouseStaffs;
        _warehouseReads = warehouseReads;
        _environment = environment;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateWarehouse([FromForm] CreateWarehouseDTO model)
    {
        
        var userid = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        if (model.ImageFile != null)
            model.urlimage = await SaveImageAsync(model.ImageFile, "warehouses");

        var result = await _warehouseService.CreateWarehouseAsync(model,userid);
        if (result <= 0)
            return BadRequest(new { Success = false, Message = "Failed to create warehouse." });
        return Ok(new { Success = true, Message = "Warehouse created successfully.", WarehouseId = result });
    }

    [HttpPut("/api/warehouses/{warehouseId:int}")]
    [Authorize(Policy = PermissionCode.WAREHOUSE_MANAGE)]
    public async Task<IActionResult> UpdateWarehouse(int warehouseId, [FromForm] UpdateWarehouseDTO model)
    {
        if (model.ImageFile != null)
            model.urlimage = await SaveImageAsync(model.ImageFile, "warehouses");

        var result = await _warehouseService.UpdateWarehouseAsync(warehouseId, model);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost("invite-staff")]
    public async Task<IActionResult> InviteStaff(InviteStaffDTO model)
    {
        var inviterUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _warehouseService.InviteStaffAsync(model, inviterUserId);
        if (result == null)
            return BadRequest(new { Success = false, Message = "Failed to invite staff." });
        return Ok(new { Success = true, Message = "Staff invited successfully.", result });
    }

    // [HttpPost("join")]
    // public async Task<IActionResult> joinWarehouse(JoinWarehouseDTO model)
    // {
    //     var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    //     var result = await _warehouseService.JoinWarehouse(model, userId);
    //     if (!result)
    //         return BadRequest(new { Success = false, Message = "Failed to join warehouse." });
    //     return Ok(new { Success = true, Message = "Warehouse joined successfully." });
    // }

    [HttpGet("/api/warehouses/mine")]
    public async Task<IActionResult> GetMine(CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = await _warehouseReads.GetMineAsync(userId, cancellationToken);
        return Ok(items);
    }

    [HttpGet("/api/warehouses/{warehouseId:int}")]
    public async Task<IActionResult> GetById(int warehouseId, CancellationToken cancellationToken)
    {
        var item = await _warehouseReads.GetByIdAsync(warehouseId, cancellationToken);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpGet("/api/warehouses/{warehouseId:int}/staff/search")]
    [Authorize(Policy = PermissionCode.STAFF_VIEW)] //Yêu cầu người dùng phải đăng nhập và có quyền:
    public async Task<IActionResult> SearchStaff(
        int warehouseId,
        [FromQuery] string? q,
        [FromQuery] int limit = 20,
        CancellationToken cancellationToken = default)
    {
        var items = await _warehouseStaffs.SearchAsync(warehouseId, q, limit, cancellationToken);
        return Ok(items);
    }

    private async Task<string> SaveImageAsync(IFormFile file, string folder)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(extension))
            throw new InvalidOperationException("Unsupported image type.");

        var uploadsRoot = Path.Combine(_environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot"), "uploads", folder);
        Directory.CreateDirectory(uploadsRoot);

        var fileName = $"{Guid.NewGuid():N}{extension}";
        var filePath = Path.Combine(uploadsRoot, fileName);

        await using var stream = System.IO.File.Create(filePath);
        await file.CopyToAsync(stream);

        return $"/uploads/{folder}/{fileName}";
    }
}

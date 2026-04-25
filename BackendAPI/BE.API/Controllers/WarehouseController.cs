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

    public WarehouseController(IWarehouseService warehouseService
    , IWarehouseStaffService warehouseStaffs
    , IWarehouseReadService warehouseReads)
    {
        _warehouseService = warehouseService;
        _warehouseStaffs = warehouseStaffs;
        _warehouseReads = warehouseReads;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateWarehouse(CreateWarehouseDTO model)
    {
        
        var userid = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _warehouseService.CreateWarehouseAsync(model,userid);
        if (result <= 0)
            return BadRequest(new { Success = false, Message = "Failed to create warehouse." });
        return Ok(new { Success = true, Message = "Warehouse created successfully.", WarehouseId = result });
    }

    [HttpPost("invite-staff")]
    public async Task<IActionResult> InviteStaff(InviteStaffDTO model)
    {
        var inviterUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _warehouseService.InviteStaffAsync(model, inviterUserId);
        if (!result)
            return BadRequest(new { Success = false, Message = "Failed to invite staff." });
        return Ok(new { Success = true, Message = "Staff invited successfully." });
    }

    [HttpPost("join")]
    public async Task<IActionResult> joinWarehouse(JoinWarehouseDTO model)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _warehouseService.JoinWarehouse(model, userId);
        if (!result)
            return BadRequest(new { Success = false, Message = "Failed to join warehouse." });
        return Ok(new { Success = true, Message = "Warehouse joined successfully." });
    }

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
    [Authorize(Policy = PermissionCode.STAFF_VIEW)]
    public async Task<IActionResult> SearchStaff(
        int warehouseId,
        [FromQuery] string? q,
        [FromQuery] int limit = 20,
        CancellationToken cancellationToken = default)
    {
        var items = await _warehouseStaffs.SearchAsync(warehouseId, q, limit, cancellationToken);
        return Ok(items);
    }
}

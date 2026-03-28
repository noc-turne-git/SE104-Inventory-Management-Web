using BackendAPI.BE.DAL.Interfaces;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace BackendAPI.BE.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class WarehouseController : ControllerBase
{
    private readonly WarehouseService _warehouseService;

    public WarehouseController(IMapper mapper, IRepository<Warehouse> warehouseRepository
        ,IRepository<WarehouseStaff> warehouseStaffRepository, IUserRepository userRepository, IEmailService emailService)
    {
        _warehouseService = new WarehouseService(warehouseRepository, warehouseStaffRepository, userRepository, mapper, emailService);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateWarehouse(CreateWarehouseDTO model)
    {
        var result = await _warehouseService.CreateWarehouseAsync(model);
        if (!result)
            return BadRequest(new { Success = false, Message = "Failed to create warehouse." });
        return Ok(new { Success = true, Message = "Warehouse created successfully." });
    }

    [HttpPost("invite-staff")]
    public async Task<IActionResult> InviteStaff(InviteStaffDTO model)
    {
        var result = await _warehouseService.InviteStaffAsync(model);
        if (!result)
            return BadRequest(new { Success = false, Message = "Failed to invite staff." });
        return Ok(new { Success = true, Message = "Staff invited successfully." });
    }
}
namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims;
using BackendAPI.BE.API.DTO;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/shifts")]
public class WarehouseShiftsController : ControllerBase
{
    private readonly IShiftService _shifts;
    private readonly AppDbContext _db;

    public WarehouseShiftsController(IShiftService shifts, AppDbContext db)
    {
        _shifts = shifts;
        _db = db;
    }

    [HttpGet("mine")]
    [Authorize(Policy = PermissionCode.SHIFT_VIEW)]
    public async Task<IActionResult> GetMine(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var items = await _shifts.GetMineAsync(warehouseId, userId, cancellationToken);
        var dtos = await MapAsync(items, cancellationToken);
        return Ok(dtos);
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var items = await _shifts.GetAllAsync(warehouseId, cancellationToken);
        var dtos = await MapAsync(items, cancellationToken);
        return Ok(dtos);
    }

    [HttpPost]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> Create(int warehouseId, ShiftUpsertDTO model, CancellationToken cancellationToken)
    {
        var entity = await _shifts.CreateAsync(warehouseId, model, cancellationToken);
        var dtos = await MapAsync(new[] { entity }, cancellationToken);
        return CreatedAtAction(nameof(GetAll), new { warehouseId }, dtos.First());
    }

    [HttpPut("{shiftId:int}")]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> Update(int warehouseId, int shiftId, ShiftUpsertDTO model, CancellationToken cancellationToken)
    {
        var ok = await _shifts.UpdateAsync(warehouseId, shiftId, model, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }

    [HttpDelete("{shiftId:int}")]
    [Authorize(Policy = PermissionCode.SHIFT_MANAGE)]
    public async Task<IActionResult> Delete(int warehouseId, int shiftId, CancellationToken cancellationToken)
    {
        var ok = await _shifts.DeleteAsync(warehouseId, shiftId, cancellationToken);
        if (!ok) return NotFound();
        return NoContent();
    }

    private async Task<List<ShiftViewDTO>> MapAsync(IEnumerable<BackendAPI.BE.DAL.Entities.Shift> items, CancellationToken cancellationToken)
    {
        var list = items.ToList();
        var userIds = list.Where(s => s.UserId.HasValue).Select(s => s.UserId!.Value).Distinct().ToList();
        var users = userIds.Count == 0
            ? new Dictionary<int, BackendAPI.BE.DAL.Entities.User>()
            : await _db.Users.Where(u => userIds.Contains(u.UserId)).ToDictionaryAsync(u => u.UserId, cancellationToken);

        var now = DateTime.UtcNow;

        return list.Select(s =>
        {
            string? assignedTo = null;
            if (s.UserId.HasValue && users.TryGetValue(s.UserId.Value, out var user)) assignedTo = user.FullName;

            var status = assignedTo != null ? "filled" : "empty";
            if (assignedTo == null && s.StartTime >= now && s.StartTime <= now.AddDays(1)) status = "urgent";

            return new ShiftViewDTO
            {
                Id = s.ShiftId.ToString(),
                Date = s.StartTime.ToString("yyyy-MM-dd"),
                StartTime = s.StartTime.ToString("HH:mm"),
                EndTime = s.EndTime.ToString("HH:mm"),
                Position = s.Duty,
                AssignedTo = assignedTo,
                Status = status,
                ShiftType = GetShiftType(s.StartTime),
                Notes = string.IsNullOrWhiteSpace(s.Note) ? null : s.Note
            };
        }).ToList();
    }

    private static string GetShiftType(DateTime startUtc)
    {
        var hour = startUtc.Hour;
        if (hour >= 6 && hour < 14) return "Morning";
        if (hour >= 14 && hour < 22) return "Afternoon";
        return "Night";
    }
}

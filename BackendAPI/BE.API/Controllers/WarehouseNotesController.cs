namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims;
using BackendAPI.BE.API.DTO.Notes;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/notes")]
public class WarehouseNotesController : ControllerBase
{
    private readonly INoteService _notes;

    public WarehouseNotesController(INoteService notes)
    {
        _notes = notes;
    }

    [HttpGet("mine")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW)]
    public async Task<IActionResult> GetMine(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var notes = await _notes.GetMineAsync(warehouseId, userId, cancellationToken);
        return Ok(notes.OrderByDescending(n => n.Date));
    }

    [HttpGet]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_ALL)]
    public async Task<IActionResult> GetAll(int warehouseId, CancellationToken cancellationToken)
    {
        var notes = await _notes.GetAllAsync(warehouseId, cancellationToken);
        return Ok(notes.OrderByDescending(n => n.Date));
    }

    [HttpPost("goods-receipts")]
    [Authorize(Policy = PermissionCode.NOTE_CREATE)]
    public async Task<IActionResult> CreateGoodsReceipt(int warehouseId, GoodsReceiptUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var entity = await _notes.CreateGoodsReceiptAsync(warehouseId, userId, model, cancellationToken);
        return CreatedAtAction(nameof(GetMine), new { warehouseId }, entity);
    }

    [HttpPost("delivery-notes")]
    [Authorize(Policy = PermissionCode.NOTE_CREATE)]
    public async Task<IActionResult> CreateDeliveryNote(int warehouseId, DeliveryNoteUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var entity = await _notes.CreateDeliveryNoteAsync(warehouseId, userId, model, cancellationToken);
        return CreatedAtAction(nameof(GetMine), new { warehouseId }, entity);
    }

    [HttpPost("damage-notes")]
    [Authorize(Policy = PermissionCode.NOTE_CREATE)]
    public async Task<IActionResult> CreateDamageNote(int warehouseId, DamageNoteUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var entity = await _notes.CreateDamageNoteAsync(warehouseId, userId, model, cancellationToken);
        return CreatedAtAction(nameof(GetMine), new { warehouseId }, entity);
    }

    [HttpPut("goods-receipts/{noteId:int}")]
    [Authorize(Policy = PermissionCode.NOTE_EDIT)]
    public async Task<IActionResult> UpdateGoodsReceipt(int warehouseId, int noteId, GoodsReceiptUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _notes.UpdateGoodsReceiptAsync(warehouseId, noteId, userId, model, cancellationToken);
        return result switch
        {
            NoteEditResult.NotFound => NotFound(),
            NoteEditResult.Forbidden => Forbid(),
            NoteEditResult.NotPending => BadRequest(new { Message = "Only pending notes can be edited." }),
            _ => NoContent()
        };
    }

    [HttpPut("delivery-notes/{noteId:int}")]
    [Authorize(Policy = PermissionCode.NOTE_EDIT)]
    public async Task<IActionResult> UpdateDeliveryNote(int warehouseId, int noteId, DeliveryNoteUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _notes.UpdateDeliveryNoteAsync(warehouseId, noteId, userId, model, cancellationToken);
        return result switch
        {
            NoteEditResult.NotFound => NotFound(),
            NoteEditResult.Forbidden => Forbid(),
            NoteEditResult.NotPending => BadRequest(new { Message = "Only pending notes can be edited." }),
            _ => NoContent()
        };
    }

    [HttpPut("damage-notes/{noteId:int}")]
    [Authorize(Policy = PermissionCode.NOTE_EDIT)]
    public async Task<IActionResult> UpdateDamageNote(int warehouseId, int noteId, DamageNoteUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _notes.UpdateDamageNoteAsync(warehouseId, noteId, userId, model, cancellationToken);
        return result switch
        {
            NoteEditResult.NotFound => NotFound(),
            NoteEditResult.Forbidden => Forbid(),
            NoteEditResult.NotPending => BadRequest(new { Message = "Only pending notes can be edited." }),
            _ => NoContent()
        };
    }

    [HttpPost("{noteId:int}/approve")]
    [Authorize(Policy = PermissionCode.NOTE_APPROVE)]
    public async Task<IActionResult> Approve(int warehouseId, int noteId, CancellationToken cancellationToken)
    {
        var result = await _notes.ApproveAsync(warehouseId, noteId, cancellationToken);
        return result switch
        {
            NoteDecisionResult.NotFound => NotFound(),
            NoteDecisionResult.NotPending => BadRequest(new { Message = "Only pending notes can be approved." }),
            _ => Ok(new { Success = true })
        };
    }

    [HttpPost("{noteId:int}/reject")]
    [Authorize(Policy = PermissionCode.NOTE_REJECT)]
    public async Task<IActionResult> Reject(int warehouseId, int noteId, CancellationToken cancellationToken)
    {
        var result = await _notes.RejectAsync(warehouseId, noteId, cancellationToken);
        return result switch
        {
            NoteDecisionResult.NotFound => NotFound(),
            NoteDecisionResult.NotPending => BadRequest(new { Message = "Only pending notes can be rejected." }),
            _ => Ok(new { Success = true })
        };
    }
}

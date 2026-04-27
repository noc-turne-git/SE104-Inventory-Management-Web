namespace BackendAPI.BE.API.Controllers;

using System.Security.Claims;
using BackendAPI.BE.API.DTO.Notes;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Data;
using BackendAPI.BE.DAL.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[ApiController]
[Route("api/warehouses/{warehouseId:int}/notes")]
public class WarehouseNotesController : ControllerBase
{
    private readonly INoteService _notes;
    private readonly AppDbContext _db;

    public WarehouseNotesController(INoteService notes, AppDbContext db)
    {
        _notes = notes;
        _db = db;
    }

    [HttpGet("mine")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_OWN)]
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

    [HttpGet("delivery-notes/mine")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_OWN)]
    public async Task<IActionResult> GetMyDeliveryNotes(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var notes = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.DeliveryNote>()
            .Include(n => n.User)
            .Include(n => n.DeliveryItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId && n.UserId == userId)
            .OrderByDescending(n => n.Date)
            .ToListAsync(cancellationToken);

        return Ok(notes.Select(MapDelivery));
    }

    [HttpGet("delivery-notes")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_ALL)]
    public async Task<IActionResult> GetAllDeliveryNotes(int warehouseId, CancellationToken cancellationToken)
    {
        var notes = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.DeliveryNote>()
            .Include(n => n.User)
            .Include(n => n.DeliveryItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId)
            .OrderByDescending(n => n.Date)
            .ToListAsync(cancellationToken);

        return Ok(notes.Select(MapDelivery));
    }

    [HttpGet("goods-receipts/mine")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_OWN)]
    public async Task<IActionResult> GetMyGoodsReceipts(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var notes = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.GoodsReceipt>()
            .Include(n => n.User)
            .Include(n => n.Supplier)
            .Include(n => n.ReceiptItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId && n.UserId == userId)
            .OrderByDescending(n => n.Date)
            .ToListAsync(cancellationToken);

        return Ok(notes.Select(MapGoodsReceipt));
    }

    [HttpGet("goods-receipts")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_ALL)]
    public async Task<IActionResult> GetAllGoodsReceipts(int warehouseId, CancellationToken cancellationToken)
    {
        var notes = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.GoodsReceipt>()
            .Include(n => n.User)
            .Include(n => n.Supplier)
            .Include(n => n.ReceiptItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId)
            .OrderByDescending(n => n.Date)
            .ToListAsync(cancellationToken);

        return Ok(notes.Select(MapGoodsReceipt));
    }

    [HttpGet("inventory-checks/mine")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_OWN)]
    public async Task<IActionResult> GetMyInventoryChecks(int warehouseId, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var notes = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.InventoryCheckNote>()
            .Include(n => n.User)
            .Include(n => n.InventoryCheckItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId && n.UserId == userId)
            .OrderByDescending(n => n.Date)
            .ToListAsync(cancellationToken);

        return Ok(notes.Select(MapInventoryCheck));
    }

    [HttpGet("inventory-checks")]
    [Authorize(Policy = PermissionCode.NOTE_VIEW_ALL)]
    public async Task<IActionResult> GetAllInventoryChecks(int warehouseId, CancellationToken cancellationToken)
    {
        var notes = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.InventoryCheckNote>()
            .Include(n => n.User)
            .Include(n => n.InventoryCheckItems)
            .ThenInclude(i => i.Product)
            .Where(n => n.WarehouseId == warehouseId)
            .OrderByDescending(n => n.Date)
            .ToListAsync(cancellationToken);

        return Ok(notes.Select(MapInventoryCheck));
    }

    [HttpPost("goods-receipts")]
    [Authorize(Policy = PermissionCode.NOTE_CREATE)]
    public async Task<IActionResult> CreateGoodsReceipt(int warehouseId, GoodsReceiptUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var entity = await _notes.CreateGoodsReceiptAsync(warehouseId, userId, model, cancellationToken);
        var created = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.GoodsReceipt>()
            .Include(n => n.User)
            .Include(n => n.Supplier)
            .Include(n => n.ReceiptItems)
            .ThenInclude(i => i.Product)
            .FirstAsync(n => n.NoteId == entity.NoteId, cancellationToken);

        return CreatedAtAction(nameof(GetMyGoodsReceipts), new { warehouseId }, MapGoodsReceipt(created));
    }

    [HttpPost("delivery-notes")]
    [Authorize(Policy = PermissionCode.NOTE_CREATE)]
    public async Task<IActionResult> CreateDeliveryNote(int warehouseId, DeliveryNoteUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var entity = await _notes.CreateDeliveryNoteAsync(warehouseId, userId, model, cancellationToken);

        var created = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.DeliveryNote>()
            .Include(n => n.User)
            .Include(n => n.DeliveryItems)
            .ThenInclude(i => i.Product)
            .FirstAsync(n => n.NoteId == entity.NoteId, cancellationToken);

        return CreatedAtAction(nameof(GetMyDeliveryNotes), new { warehouseId }, MapDelivery(created));
    }

    [HttpPost("damage-notes")]
    [Authorize(Policy = PermissionCode.NOTE_CREATE)]
    public async Task<IActionResult> CreateDamageNote(int warehouseId, DamageNoteUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var entity = await _notes.CreateDamageNoteAsync(warehouseId, userId, model, cancellationToken);
        return CreatedAtAction(nameof(GetMine), new { warehouseId }, entity);
    }

    [HttpPost("inventory-checks")]
    [Authorize(Policy = PermissionCode.NOTE_CREATE)]
    public async Task<IActionResult> CreateInventoryCheck(int warehouseId, InventoryCheckUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var entity = await _notes.CreateInventoryCheckAsync(warehouseId, userId, model, cancellationToken);

        var created = await _db.Notes
            .AsNoTracking()
            .OfType<BackendAPI.BE.DAL.Entities.InventoryCheckNote>()
            .Include(n => n.User)
            .Include(n => n.InventoryCheckItems)
            .ThenInclude(i => i.Product)
            .FirstAsync(n => n.NoteId == entity.NoteId, cancellationToken);

        return CreatedAtAction(nameof(GetMyInventoryChecks), new { warehouseId }, MapInventoryCheck(created));
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

    [HttpPut("inventory-checks/{noteId:int}")]
    [Authorize(Policy = PermissionCode.NOTE_EDIT)]
    public async Task<IActionResult> UpdateInventoryCheck(int warehouseId, int noteId, InventoryCheckUpsertDTO model, CancellationToken cancellationToken)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _notes.UpdateInventoryCheckAsync(warehouseId, noteId, userId, model, cancellationToken);
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

    private static string MapStatus(string status)
    {
        if (string.Equals(status, "PENDING", StringComparison.OrdinalIgnoreCase)) return "pending";
        if (string.Equals(status, "APPROVED", StringComparison.OrdinalIgnoreCase)) return "approved";
        if (string.Equals(status, "REJECTED", StringComparison.OrdinalIgnoreCase)) return "rejected";
        return status.Trim().ToLowerInvariant();
    }

    private static string BuildNoteNumber(string prefix, DateTime dateUtc, int noteId)
        => $"{prefix}-{dateUtc:yyyyMMdd}-{noteId:D3}";

    private static DeliveryNoteViewDTO MapDelivery(BackendAPI.BE.DAL.Entities.DeliveryNote note) => new()
    {
        Id = note.NoteId.ToString(),
        NoteNumber = BuildNoteNumber("DN", note.Date, note.NoteId),
        DateCreated = note.Date.ToString("yyyy-MM-dd HH:mm"),
        Status = MapStatus(note.Status),
        Operator = note.User.FullName,
        Destination = note.Destination,
        Items = note.DeliveryItems.Select(i => new DeliveryNoteViewItemDTO
        {
            Product = i.Product.Name,
            Quantity = i.Quantity
        }).ToList()
    };

    private static GoodsReceiptViewDTO MapGoodsReceipt(BackendAPI.BE.DAL.Entities.GoodsReceipt note) => new()
    {
        Id = note.NoteId.ToString(),
        NoteNumber = BuildNoteNumber("GR", note.Date, note.NoteId),
        DateCreated = note.Date.ToString("yyyy-MM-dd HH:mm"),
        Status = MapStatus(note.Status),
        Operator = note.User.FullName,
        Supplier = note.Supplier.Name,
        Items = note.ReceiptItems.Select(i => new GoodsReceiptViewItemDTO
        {
            Product = i.Product.Name,
            Ordered = i.OrderedQuantity,
            Received = i.Quantity,
            Defective = i.DefectiveQuantity
        }).ToList()
    };

    private static InventoryCheckViewDTO MapInventoryCheck(BackendAPI.BE.DAL.Entities.InventoryCheckNote note) => new()
    {
        Id = note.NoteId.ToString(),
        NoteNumber = BuildNoteNumber("IC", note.Date, note.NoteId),
        DateCreated = note.Date.ToString("yyyy-MM-dd HH:mm"),
        Status = MapStatus(note.Status),
        Operator = note.User.FullName,
        Items = note.InventoryCheckItems.Select(i => new InventoryCheckViewItemDTO
        {
            Product = i.Product.Name,
            StockQuantity = i.StockQuantity,
            Reason = i.Reason
        }).ToList()
    };
}

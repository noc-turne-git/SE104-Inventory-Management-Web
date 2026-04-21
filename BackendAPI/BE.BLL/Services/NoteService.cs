namespace BackendAPI.BE.BLL.Services;

using BackendAPI.BE.API.DTO.Notes;
using BackendAPI.BE.BLL.Interfaces;
using BackendAPI.BE.DAL.Constants;
using BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.DAL.Interfaces;

public class NoteService : INoteService
{
    private readonly IRepository<Note> _notes;
    private readonly IRepository<ReceiptItem> _receiptItems;
    private readonly IRepository<DeliveryItem> _deliveryItems;
    private readonly IRepository<DamageItem> _damageItems;
    private readonly IRepository<Product> _products;

    public NoteService(
        IRepository<Note> notes,
        IRepository<ReceiptItem> receiptItems,
        IRepository<DeliveryItem> deliveryItems,
        IRepository<DamageItem> damageItems,
        IRepository<Product> products)
    {
        _notes = notes;
        _receiptItems = receiptItems;
        _deliveryItems = deliveryItems;
        _damageItems = damageItems;
        _products = products;
    }

    public Task<IEnumerable<Note>> GetMineAsync(int warehouseId, int userId, CancellationToken cancellationToken = default)
        => _notes.GetAsync(n => n.WarehouseId == warehouseId && n.UserId == userId, cancellationToken);

    public Task<IEnumerable<Note>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default)
        => _notes.GetAsync(n => n.WarehouseId == warehouseId, cancellationToken);

    public async Task<GoodsReceipt> CreateGoodsReceiptAsync(int warehouseId, int userId, GoodsReceiptUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var entity = new GoodsReceipt
        {
            WarehouseId = warehouseId,
            UserId = userId,
            Date = DateTime.UtcNow,
            type = "GoodsReceipt",
            Status = StatusCode.PENDING,
            SupplierId = model.SupplierId,
            qualityCheckStatus = model.QualityCheckStatus,
            StockQuantity = model.StockQuantity,
            DefectiveQuantity = model.DefectiveQuantity
        };

        await _notes.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<DeliveryNote> CreateDeliveryNoteAsync(int warehouseId, int userId, DeliveryNoteUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var entity = new DeliveryNote
        {
            WarehouseId = warehouseId,
            UserId = userId,
            Date = DateTime.UtcNow,
            type = "DeliveryNote",
            Destination = model.Destination,
            Status = model.DeliveryStatus
        };

        ((Note)entity).Status = StatusCode.PENDING;
        await _notes.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<DamageNote> CreateDamageNoteAsync(int warehouseId, int userId, DamageNoteUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var entity = new DamageNote
        {
            WarehouseId = warehouseId,
            UserId = userId,
            Date = DateTime.UtcNow,
            type = "DamageNote",
            Status = StatusCode.PENDING,
            Description = model.Description
        };

        await _notes.AddAsync(entity, cancellationToken);
        return entity;
    }

    public async Task<NoteEditResult> UpdateGoodsReceiptAsync(int warehouseId, int noteId, int userId, GoodsReceiptUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var note = await _notes.GetByIdAsync(noteId, cancellationToken);
        if (note == null || note.WarehouseId != warehouseId) return NoteEditResult.NotFound;
        if (note.UserId != userId) return NoteEditResult.Forbidden;
        if (note.Status != StatusCode.PENDING) return NoteEditResult.NotPending;

        if (note is not GoodsReceipt entity) return NoteEditResult.NotFound;

        entity.SupplierId = model.SupplierId;
        entity.qualityCheckStatus = model.QualityCheckStatus;
        entity.StockQuantity = model.StockQuantity;
        entity.DefectiveQuantity = model.DefectiveQuantity;

        await _notes.UpdateAsync(entity, cancellationToken);
        return NoteEditResult.Updated;
    }

    public async Task<NoteEditResult> UpdateDeliveryNoteAsync(int warehouseId, int noteId, int userId, DeliveryNoteUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var note = await _notes.GetByIdAsync(noteId, cancellationToken);
        if (note == null || note.WarehouseId != warehouseId) return NoteEditResult.NotFound;
        if (note.UserId != userId) return NoteEditResult.Forbidden;
        if (note.Status != StatusCode.PENDING) return NoteEditResult.NotPending;

        if (note is not DeliveryNote entity) return NoteEditResult.NotFound;

        entity.Destination = model.Destination;
        entity.Status = model.DeliveryStatus;

        await _notes.UpdateAsync(entity, cancellationToken);
        return NoteEditResult.Updated;
    }

    public async Task<NoteEditResult> UpdateDamageNoteAsync(int warehouseId, int noteId, int userId, DamageNoteUpsertDTO model, CancellationToken cancellationToken = default)
    {
        var note = await _notes.GetByIdAsync(noteId, cancellationToken);
        if (note == null || note.WarehouseId != warehouseId) return NoteEditResult.NotFound;
        if (note.UserId != userId) return NoteEditResult.Forbidden;
        if (note.Status != StatusCode.PENDING) return NoteEditResult.NotPending;

        if (note is not DamageNote entity) return NoteEditResult.NotFound;

        entity.Description = model.Description;

        await _notes.UpdateAsync(entity, cancellationToken);
        return NoteEditResult.Updated;
    }

    public async Task<NoteDecisionResult> ApproveAsync(int warehouseId, int noteId, CancellationToken cancellationToken = default)
    {
        var note = await _notes.GetByIdAsync(noteId, cancellationToken);
        if (note == null || note.WarehouseId != warehouseId) return NoteDecisionResult.NotFound;
        if (note.Status != StatusCode.PENDING) return NoteDecisionResult.NotPending;

        note.Status = StatusCode.APPROVED;
        await _notes.UpdateAsync(note, cancellationToken);

        if (note is GoodsReceipt)
        {
            var items = await _receiptItems.GetAsync(i => i.NoteId == noteId, cancellationToken);
            foreach (var item in items)
            {
                var product = await _products.GetByIdAsync(item.ProductId, cancellationToken);
                if (product == null || product.WarehouseId != warehouseId) continue;
                product.StockQuantity += item.Quantity;
                await _products.UpdateAsync(product, cancellationToken);
            }
        }
        else if (note is DeliveryNote)
        {
            var items = await _deliveryItems.GetAsync(i => i.NoteId == noteId, cancellationToken);
            foreach (var item in items)
            {
                var product = await _products.GetByIdAsync(item.ProductId, cancellationToken);
                if (product == null || product.WarehouseId != warehouseId) continue;
                product.StockQuantity = Math.Max(0, product.StockQuantity - item.Quantity);
                await _products.UpdateAsync(product, cancellationToken);
            }
        }
        else if (note is DamageNote)
        {
            var items = await _damageItems.GetAsync(i => i.NoteId == noteId, cancellationToken);
            foreach (var item in items)
            {
                var product = await _products.GetByIdAsync(item.ProductId, cancellationToken);
                if (product == null || product.WarehouseId != warehouseId) continue;

                product.StockQuantity = Math.Max(0, product.StockQuantity - item.Quantity);
                product.DamagedQuantity += item.Quantity;
                await _products.UpdateAsync(product, cancellationToken);
            }
        }

        return NoteDecisionResult.Succeeded;
    }

    public async Task<NoteDecisionResult> RejectAsync(int warehouseId, int noteId, CancellationToken cancellationToken = default)
    {
        var note = await _notes.GetByIdAsync(noteId, cancellationToken);
        if (note == null || note.WarehouseId != warehouseId) return NoteDecisionResult.NotFound;
        if (note.Status != StatusCode.PENDING) return NoteDecisionResult.NotPending;

        note.Status = StatusCode.REJECTED;
        await _notes.UpdateAsync(note, cancellationToken);
        return NoteDecisionResult.Succeeded;
    }
}


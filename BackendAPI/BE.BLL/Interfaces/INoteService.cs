namespace BackendAPI.BE.BLL.Interfaces;

using BackendAPI.BE.API.DTO.Notes;
using BackendAPI.BE.DAL.Entities;

public enum NoteEditResult
{
    Updated,
    NotFound,
    Forbidden,
    NotPending
}

public enum NoteDecisionResult
{
    Succeeded,
    NotFound,
    NotPending
}

public interface INoteService
{
    Task<IEnumerable<Note>> GetMineAsync(int warehouseId, int userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Note>> GetAllAsync(int warehouseId, CancellationToken cancellationToken = default);

    Task<GoodsReceipt> CreateGoodsReceiptAsync(int warehouseId, int userId, GoodsReceiptUpsertDTO model, CancellationToken cancellationToken = default);
    Task<DeliveryNote> CreateDeliveryNoteAsync(int warehouseId, int userId, DeliveryNoteUpsertDTO model, CancellationToken cancellationToken = default);
    Task<DamageNote> CreateDamageNoteAsync(int warehouseId, int userId, DamageNoteUpsertDTO model, CancellationToken cancellationToken = default);
    Task<InventoryCheckNote> CreateInventoryCheckAsync(int warehouseId, int userId, InventoryCheckUpsertDTO model, CancellationToken cancellationToken = default);

    Task<NoteEditResult> UpdateGoodsReceiptAsync(int warehouseId, int noteId, int userId, GoodsReceiptUpsertDTO model, CancellationToken cancellationToken = default);
    Task<NoteEditResult> UpdateDeliveryNoteAsync(int warehouseId, int noteId, int userId, DeliveryNoteUpsertDTO model, CancellationToken cancellationToken = default);
    Task<NoteEditResult> UpdateDamageNoteAsync(int warehouseId, int noteId, int userId, DamageNoteUpsertDTO model, CancellationToken cancellationToken = default);
    Task<NoteEditResult> UpdateInventoryCheckAsync(int warehouseId, int noteId, int userId, InventoryCheckUpsertDTO model, CancellationToken cancellationToken = default);

    Task<NoteDecisionResult> ApproveAsync(int warehouseId, int noteId, CancellationToken cancellationToken = default);
    Task<NoteDecisionResult> RejectAsync(int warehouseId, int noteId, CancellationToken cancellationToken = default);
}


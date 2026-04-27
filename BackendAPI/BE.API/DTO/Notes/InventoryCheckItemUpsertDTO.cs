namespace BackendAPI.BE.API.DTO.Notes;

public class InventoryCheckItemUpsertDTO
{
    public int ProductId { get; set; }
    public int StockQuantity { get; set; }
    public string Reason { get; set; } = string.Empty;
}


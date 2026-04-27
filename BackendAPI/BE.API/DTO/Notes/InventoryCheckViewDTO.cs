namespace BackendAPI.BE.API.DTO.Notes;

public class InventoryCheckViewDTO
{
    public string Id { get; set; } = string.Empty;
    public string NoteNumber { get; set; } = string.Empty;
    public string Type { get; set; } = "INVENTORY_CHECK";
    public string DateCreated { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public string? Reason { get; set; }
    public string Operator { get; set; } = string.Empty;
    public List<InventoryCheckViewItemDTO> Items { get; set; } = new();
}

public class InventoryCheckViewItemDTO
{
    public string Product { get; set; } = string.Empty;
    public int StockQuantity { get; set; }
    public string Reason { get; set; } = string.Empty;
}


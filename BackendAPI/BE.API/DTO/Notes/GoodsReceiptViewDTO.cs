namespace BackendAPI.BE.API.DTO.Notes;

public class GoodsReceiptViewDTO
{
    public string Id { get; set; } = string.Empty;
    public string NoteNumber { get; set; } = string.Empty;
    public string Type { get; set; } = "RECEIPT";
    public string DateCreated { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public string? Reason { get; set; }
    public string Operator { get; set; } = string.Empty;
    public string Supplier { get; set; } = string.Empty;
    public List<GoodsReceiptViewItemDTO> Items { get; set; } = new();
}

public class GoodsReceiptViewItemDTO
{
    public string Product { get; set; } = string.Empty;
    public int Ordered { get; set; }
    public int Received { get; set; }
    public int Defective { get; set; }
}


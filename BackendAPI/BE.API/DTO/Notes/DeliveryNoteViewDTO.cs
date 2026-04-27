namespace BackendAPI.BE.API.DTO.Notes;

public class DeliveryNoteViewDTO
{
    public string Id { get; set; } = string.Empty;
    public string NoteNumber { get; set; } = string.Empty;
    public string Type { get; set; } = "DELIVERY";
    public string DateCreated { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public string? Reason { get; set; }
    public string Operator { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public List<DeliveryNoteViewItemDTO> Items { get; set; } = new();
}

public class DeliveryNoteViewItemDTO
{
    public string Product { get; set; } = string.Empty;
    public int Quantity { get; set; }
}


namespace BackendAPI.BE.API.DTO.Notes;

public class DeliveryNoteUpsertDTO
{
    public string Destination { get; set; } = string.Empty;
    public string DeliveryStatus { get; set; } = string.Empty;
    public List<DeliveryNoteItemUpsertDTO> Items { get; set; } = new();
}


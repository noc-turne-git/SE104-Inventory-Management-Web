namespace BackendAPI.BE.API.DTO.Notes;

public class InventoryCheckUpsertDTO
{
    public string Status { get; set; } = "PENDING";
    public List<InventoryCheckItemUpsertDTO> Items { get; set; } = new();
}


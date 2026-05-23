namespace BackendAPI.BE.API.DTO.Notes;

public class InventoryCheckUpsertDTO
{
    public string Status { get; set; } = string.Empty;
    public List<InventoryCheckItemUpsertDTO> Items { get; set; } = new();
}


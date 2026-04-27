namespace BackendAPI.BE.API.DTO.Notes;

public class InventoryCheckUpsertDTO
{
    public List<InventoryCheckItemUpsertDTO> Items { get; set; } = new();
}


namespace BackendAPI.BE.API.DTO;

public class WarehouseDetailDTO
{
    public int WarehouseId { get; set; }
    public string Name { get; set; } = string.Empty;
    //public string 
    public string Location { get; set; } = string.Empty;
    public int CreatorId { get; set; }
    public string? urlimage { get; set; } = null!;
    public string? lastUpdate { get; set; } = null!;
    public string? productCount { get; set; } = null!;
}


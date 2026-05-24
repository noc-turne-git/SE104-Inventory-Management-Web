namespace BackendAPI.BE.API.DTO;

public class UpdateWarehouseDTO
{
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? urlimage { get; set; }
    public IFormFile? ImageFile { get; set; }
}

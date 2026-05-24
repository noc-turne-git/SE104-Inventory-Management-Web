namespace BackendAPI.BE.API.DTO;
public class CreateWarehouseDTO
{
    public string Name { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string? urlimage { get; set; }
    public IFormFile? ImageFile { get; set; }
    //public int CreatorId { get; set; }
}

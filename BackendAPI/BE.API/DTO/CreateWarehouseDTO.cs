namespace BackendAPI.BE.API.DTO;
public class CreateWarehouseDTO
{
    public string Name { get; set; } = null!;
    public string Location { get; set; } = null!;
    public int CreatorId { get; set; }
}
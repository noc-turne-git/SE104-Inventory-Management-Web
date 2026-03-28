
namespace BackendAPI.BE.DAL.Entities;

public class WarehouseStaff
{
    public int WarehouseId { get; set; }
    public int UserId { get; set; }
    public string Role { get; set; } = string.Empty;
    
    // Navigation properties
    public Warehouse Warehouse { get; set; } = null!;
    public User User { get; set; } = null!;
}
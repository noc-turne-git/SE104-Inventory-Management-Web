
using BackendAPI.BE.BLL.Interfaces;

namespace BackendAPI.BE.DAL.Entities;

public class WarehouseStaff:IEntity
{
    public int WarehouseId { get; set; }
    public int UserId { get; set; }
    public int RoleId { get; set; } 
    public string getKey() => $"{WarehouseId}:{UserId}";

    // Navigation properties
    public Warehouse Warehouse { get; set; } = null!;
    public User User { get; set; } = null!;
}
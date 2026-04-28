
using BackendAPI.BE.BLL.Interfaces;

namespace BackendAPI.BE.DAL.Entities;

public class WarehouseStaff:IEntity
{
    public int WarehouseId { get; set; }
    public int UserId { get; set; }
    public int RoleId { get; set; } 
    public decimal Salary { get; set; }
    public DateTime HireDate { get; set; }
    public string AccountStatus { get; set; } = "Active";
    public string getKey() => $"{WarehouseId}:{UserId}";

    // Navigation properties
    public Warehouse Warehouse { get; set; } = null!;
    public User User { get; set; } = null!;
    public Role Role{get; set; } = null!;
}

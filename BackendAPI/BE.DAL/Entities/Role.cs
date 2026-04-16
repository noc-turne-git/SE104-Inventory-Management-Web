namespace BackendAPI.BE.DAL.Entities;
using BackendAPI.BE.BLL.Interfaces;

public class Role : IEntity
{
    public int RoleId { get; set; }
    public string RoleName { get; set; } = string.Empty;
    
    // Navigation properties
    public ICollection<WarehouseStaff> WarehouseStaffs { get; set; }
    public ICollection<RolePermission> RolePermissions { get; set; }
    public string getKey() => RoleId.ToString();
}